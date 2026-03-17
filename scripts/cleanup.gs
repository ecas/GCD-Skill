/**
 * cleanup.gs
 * Resets the demo environment by removing all provisioned resources.
 *
 * Reads the manifest persisted by orchestrator.gs and trashes/deletes:
 * - Gmail labels (and removes from threads)
 * - Drive files (Docs, Sheets, Forms)
 * - Drive folders (entire folder tree)
 * - Calendar events
 * - Chat spaces (via REST API)
 *
 * Design principles:
 * - Idempotent: safe to run multiple times — skips already-deleted resources
 * - Non-destructive on unknown items: only deletes resources recorded in manifest
 * - Graceful: logs each deletion; continues on errors
 *
 * Usage:
 *   1. Set CUSTOMER_KEY Script Property (same as provisioning)
 *   2. Run cleanupDemoEnvironment() from the Apps Script editor
 *   3. Review logs for any manual cleanup items
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Removes all provisioned demo resources for the configured customer.
 * Run this from the Apps Script editor UI.
 */
function cleanupDemoEnvironment() {
  const props = PropertiesService.getScriptProperties();
  const customerKey = props.getProperty('CUSTOMER_KEY');

  if (!customerKey) {
    throw new Error(
      'CUSTOMER_KEY Script Property is not set. ' +
      'Go to Project Settings > Script Properties and add CUSTOMER_KEY.'
    );
  }

  const manifest = loadManifest(customerKey);

  if (!manifest) {
    Logger.log(`No manifest found for customer key "${customerKey}". Nothing to clean up.`);
    Logger.log('If you ran provisioning, check that persistState() was called successfully.');
    return;
  }

  Logger.log(`Starting cleanup for: ${customerKey}`);
  Logger.log(`Manifest contains:`);
  Logger.log(`  Gmail labels: ${manifest.gmailLabelIds.length}`);
  Logger.log(`  Drive folders: ${manifest.driveFolderIds.length}`);
  Logger.log(`  Drive files: ${manifest.driveFileIds.length}`);
  Logger.log(`  Calendar events: ${manifest.calendarEventIds.length}`);
  Logger.log(`  Chat spaces: ${manifest.chatSpaceNames.length}`);

  // Execute cleanup steps in reverse order (least dangerous first)
  deleteCalendarEvents(manifest.calendarEventIds);
  deleteDriveFiles(manifest.driveFileIds);
  deleteDriveFolders(manifest.driveFolderIds);
  deleteGmailLabels(manifest.gmailLabelIds);
  deleteChatSpaces(manifest.chatSpaceNames);

  // Clear the manifest after successful cleanup
  clearManifest(customerKey);

  Logger.log('Cleanup complete.');
}

/**
 * Performs a dry run of cleanup — logs what would be deleted without deleting.
 * Useful for reviewing before committing to cleanup.
 */
function dryRunCleanup() {
  const props = PropertiesService.getScriptProperties();
  const customerKey = props.getProperty('CUSTOMER_KEY');

  if (!customerKey) {
    Logger.log('CUSTOMER_KEY not set.');
    return;
  }

  const manifest = loadManifest(customerKey);

  if (!manifest) {
    Logger.log(`No manifest found for "${customerKey}".`);
    return;
  }

  Logger.log('=== DRY RUN — Nothing will be deleted ===');
  Logger.log(`Customer: ${customerKey}`);

  Logger.log('\nGmail Labels to delete:');
  manifest.gmailLabelIds.forEach(l => Logger.log(`  - ${l}`));

  Logger.log('\nDrive Files to trash:');
  manifest.driveFileIds.forEach(id => {
    try {
      const file = DriveApp.getFileById(id);
      Logger.log(`  - ${file.getName()} (${id})`);
    } catch (e) {
      Logger.log(`  - [NOT FOUND] ${id}`);
    }
  });

  Logger.log('\nDrive Folders to trash:');
  manifest.driveFolderIds.forEach(id => {
    try {
      const folder = DriveApp.getFolderById(id);
      Logger.log(`  - ${folder.getName()} (${id})`);
    } catch (e) {
      Logger.log(`  - [NOT FOUND] ${id}`);
    }
  });

  Logger.log('\nCalendar Events to delete:');
  manifest.calendarEventIds.forEach(id => Logger.log(`  - ${id}`));

  Logger.log('\nChat Spaces to delete:');
  manifest.chatSpaceNames.forEach(n => Logger.log(`  - ${n}`));

  Logger.log('\n=== End dry run ===');
}


// ─────────────────────────────────────────────────────────────────────────────
// CLEANUP FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes calendar events by ID.
 * Skips events that are already deleted or not found.
 *
 * @param {string[]} eventIds
 */
function deleteCalendarEvents(eventIds) {
  if (!eventIds || eventIds.length === 0) {
    Logger.log('Calendar: No events to delete.');
    return;
  }

  Logger.log(`Calendar: Deleting ${eventIds.length} events...`);
  const calendar = CalendarApp.getDefaultCalendar();
  let deleted = 0;

  eventIds.forEach(eventId => {
    try {
      const event = calendar.getEventById(eventId);
      if (event) {
        event.deleteEvent();
        deleted++;
        Logger.log(`Calendar: Deleted event ${eventId}`);
      } else {
        Logger.log(`Calendar: Event ${eventId} not found (already deleted?)`);
      }
      Utilities.sleep(100);
    } catch (err) {
      Logger.log(`Calendar: Could not delete event ${eventId}: ${err.message}`);
    }
  });

  Logger.log(`Calendar: Deleted ${deleted}/${eventIds.length} events`);
}

/**
 * Trashes all Drive files recorded in the manifest.
 * Uses trash (not permanent delete) for safety.
 *
 * @param {string[]} fileIds
 */
function deleteDriveFiles(fileIds) {
  if (!fileIds || fileIds.length === 0) {
    Logger.log('Drive Files: No files to trash.');
    return;
  }

  Logger.log(`Drive Files: Trashing ${fileIds.length} files...`);
  let trashed = 0;

  fileIds.forEach(fileId => {
    try {
      const file = DriveApp.getFileById(fileId);
      file.setTrashed(true);
      trashed++;
      Logger.log(`Drive Files: Trashed "${file.getName()}" (${fileId})`);
      Utilities.sleep(50);
    } catch (err) {
      if (err.message.includes('No item with the given ID')) {
        Logger.log(`Drive Files: File ${fileId} not found (already deleted?)`);
      } else {
        Logger.log(`Drive Files: Could not trash ${fileId}: ${err.message}`);
      }
    }
  });

  Logger.log(`Drive Files: Trashed ${trashed}/${fileIds.length} files`);
}

/**
 * Trashes all Drive folders recorded in the manifest.
 * Processes in reverse order (deepest folders first) to avoid parent-before-child issues.
 *
 * @param {string[]} folderIds
 */
function deleteDriveFolders(folderIds) {
  if (!folderIds || folderIds.length === 0) {
    Logger.log('Drive Folders: No folders to trash.');
    return;
  }

  // Reverse order: deepest folders first
  const reversedIds = [...folderIds].reverse();
  Logger.log(`Drive Folders: Trashing ${reversedIds.length} folders...`);
  let trashed = 0;

  reversedIds.forEach(folderId => {
    try {
      const folder = DriveApp.getFolderById(folderId);
      folder.setTrashed(true);
      trashed++;
      Logger.log(`Drive Folders: Trashed "${folder.getName()}" (${folderId})`);
      Utilities.sleep(50);
    } catch (err) {
      if (err.message.includes('No item with the given ID')) {
        Logger.log(`Drive Folders: Folder ${folderId} not found (already deleted?)`);
      } else {
        Logger.log(`Drive Folders: Could not trash ${folderId}: ${err.message}`);
      }
    }
  });

  Logger.log(`Drive Folders: Trashed ${trashed}/${reversedIds.length} folders`);
}

/**
 * Deletes Gmail labels and removes them from all threads.
 * Processes children before parents to avoid orphaned labels.
 *
 * @param {string[]} labelPaths - Array of label path strings
 */
function deleteGmailLabels(labelPaths) {
  if (!labelPaths || labelPaths.length === 0) {
    Logger.log('Gmail Labels: No labels to delete.');
    return;
  }

  // Sort deepest (most nested) first
  const sorted = [...labelPaths].sort((a, b) => {
    return b.split('/').length - a.split('/').length;
  });

  Logger.log(`Gmail Labels: Deleting ${sorted.length} labels...`);
  let deleted = 0;

  sorted.forEach(labelPath => {
    try {
      const label = GmailApp.getUserLabelByName(labelPath);
      if (label) {
        // Remove label from all threads first
        const threads = label.getThreads(0, 100);
        if (threads.length > 0) {
          label.removeFromThreads(threads);
          Logger.log(`Gmail Labels: Removed "${labelPath}" from ${threads.length} threads`);
        }

        label.deleteLabel();
        deleted++;
        Logger.log(`Gmail Labels: Deleted label "${labelPath}"`);
      } else {
        Logger.log(`Gmail Labels: Label "${labelPath}" not found (already deleted?)`);
      }
      Utilities.sleep(100);
    } catch (err) {
      Logger.log(`Gmail Labels: Could not delete "${labelPath}": ${err.message}`);
    }
  });

  Logger.log(`Gmail Labels: Deleted ${deleted}/${sorted.length} labels`);
}

/**
 * Deletes Chat spaces via the REST API.
 *
 * @param {string[]} spaceNames - Array of space resource names
 */
function deleteChatSpaces(spaceNames) {
  if (!spaceNames || spaceNames.length === 0) {
    Logger.log('Chat Spaces: No spaces to delete.');
    return;
  }

  Logger.log(`Chat Spaces: Deleting ${spaceNames.length} spaces...`);
  const token = ScriptApp.getOAuthToken();
  let deleted = 0;

  spaceNames.forEach(spaceName => {
    try {
      const options = {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        muteHttpExceptions: true,
      };

      const response = UrlFetchApp.fetch(
        `${CHAT_API_BASE}/${spaceName}`,
        options
      );

      const code = response.getResponseCode();
      if (code === 200 || code === 204) {
        deleted++;
        Logger.log(`Chat Spaces: Deleted ${spaceName}`);
      } else if (code === 404) {
        Logger.log(`Chat Spaces: Space ${spaceName} not found (already deleted?)`);
      } else {
        Logger.log(`Chat Spaces: Failed to delete ${spaceName}: HTTP ${code}`);
      }

      Utilities.sleep(1000); // Chat API rate limit
    } catch (err) {
      Logger.log(`Chat Spaces: Error deleting ${spaceName}: ${err.message}`);
    }
  });

  Logger.log(`Chat Spaces: Deleted ${deleted}/${spaceNames.length} spaces`);
}


// ─────────────────────────────────────────────────────────────────────────────
// MANIFEST MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clears the persisted manifest after successful cleanup.
 * Prevents stale manifest from causing issues on next provisioning run.
 *
 * @param {string} customerKey
 */
function clearManifest(customerKey) {
  PropertiesService.getScriptProperties().deleteProperty(
    `MANIFEST_${customerKey.toUpperCase()}`
  );
  Logger.log(`Manifest cleared for customer key: ${customerKey}`);
}


// ─────────────────────────────────────────────────────────────────────────────
// NUCLEAR OPTION — USE WITH EXTREME CAUTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Trashes ALL files and folders whose name contains the demo company name.
 * WARNING: This is a broad search-and-destroy — use only in emergency.
 * Always run dryRunNuclearCleanup() first.
 *
 * @param {string} companyName - e.g., "NovaTech Logistics"
 */
function nuclearCleanup(companyName) {
  if (!companyName) {
    Logger.log('nuclearCleanup: companyName is required.');
    return;
  }

  Logger.log(`NUCLEAR CLEANUP: Searching for all items containing "${companyName}"...`);
  Logger.log('This will PERMANENTLY trash matching items. Last chance to abort.');

  // Search files
  const files = DriveApp.searchFiles(`title contains "${companyName}"`);
  let count = 0;
  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true);
    Logger.log(`Trashed file: ${file.getName()}`);
    count++;
  }

  // Search folders
  const folders = DriveApp.searchFolders(`title contains "${companyName}"`);
  while (folders.hasNext()) {
    const folder = folders.next();
    folder.setTrashed(true);
    Logger.log(`Trashed folder: ${folder.getName()}`);
    count++;
  }

  Logger.log(`Nuclear cleanup complete. Trashed ${count} items.`);
}

/**
 * Dry run version of nuclear cleanup — logs without deleting.
 * ALWAYS run this before nuclearCleanup().
 *
 * @param {string} companyName
 */
function dryRunNuclearCleanup(companyName) {
  if (!companyName) {
    Logger.log('dryRunNuclearCleanup: companyName is required.');
    return;
  }

  Logger.log(`DRY RUN NUCLEAR — Items that WOULD be trashed for "${companyName}":`);

  const files = DriveApp.searchFiles(`title contains "${companyName}"`);
  let count = 0;
  while (files.hasNext()) {
    const file = files.next();
    Logger.log(`  FILE: ${file.getName()} (${file.getId()})`);
    count++;
  }

  const folders = DriveApp.searchFolders(`title contains "${companyName}"`);
  while (folders.hasNext()) {
    const folder = folders.next();
    Logger.log(`  FOLDER: ${folder.getName()} (${folder.getId()})`);
    count++;
  }

  Logger.log(`Total: ${count} items would be trashed.`);
  Logger.log('Run nuclearCleanup("' + companyName + '") to execute.');
}
