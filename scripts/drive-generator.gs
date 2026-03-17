/**
 * drive-generator.gs
 * Creates the customer folder hierarchy in Google Drive.
 *
 * Builds a nested folder tree matching the customer's org structure.
 * Folder IDs are stored in state.manifest for cleanup.
 *
 * Called by orchestrator.gs as part of the provisioning pipeline.
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates the full Drive folder hierarchy for a customer config.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function createDriveFolders(config, state) {
  log(state, 'INFO', `Drive: Creating folder hierarchy for ${config.companyName}`);

  const rootFolders = config.folderStructure || [];

  rootFolders.forEach(folderDef => {
    try {
      const rootFolder = createFolderTree(folderDef, null, state);
      // Store the top-level folder ID in state for cleanup
      if (rootFolder) {
        log(state, 'INFO', `Drive: Root folder created — "${folderDef.name}" (${rootFolder.getId()})`);
      }
    } catch (err) {
      log(state, 'ERROR', `Drive: Failed creating root "${folderDef.name}": ${err.message}`);
    }
  });

  persistState(state);
  log(state, 'INFO', `Drive: Created ${state.manifest.driveFolderIds.length} folders`);
}


// ─────────────────────────────────────────────────────────────────────────────
// FOLDER TREE CREATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recursively creates a folder tree.
 * If a folder with the same name already exists under the parent, reuses it.
 *
 * @param {Object} folderDef   - Folder definition {name, children}
 * @param {Folder|null} parent - Parent folder, or null for My Drive root
 * @param {Object} state       - Provisioning state
 * @returns {Folder} The created or found folder
 */
function createFolderTree(folderDef, parent, state) {
  const folder = getOrCreateFolder(folderDef.name, parent, state);

  if (folderDef.children && folderDef.children.length > 0) {
    folderDef.children.forEach(child => {
      try {
        createFolderTree(child, folder, state);
        Utilities.sleep(50); // Avoid Drive API rate limits
      } catch (err) {
        log(state, 'WARN', `Drive: Could not create subfolder "${child.name}": ${err.message}`);
      }
    });
  }

  return folder;
}

/**
 * Gets an existing folder by name under the given parent,
 * or creates it if it doesn't exist.
 *
 * @param {string} name       - Folder name
 * @param {Folder|null} parent - Parent folder or null for root
 * @param {Object} state
 * @returns {Folder}
 */
function getOrCreateFolder(name, parent, state) {
  // Search for existing folder with this name under the parent
  let iter;
  if (parent) {
    iter = parent.getFoldersByName(name);
  } else {
    iter = DriveApp.getFoldersByName(name);
  }

  if (iter.hasNext()) {
    const existing = iter.next();
    log(state, 'INFO', `Drive: Reusing existing folder — "${name}"`);
    state.manifest.driveFolderIds.push(existing.getId());
    return existing;
  }

  // Create new folder
  let newFolder;
  if (parent) {
    newFolder = parent.createFolder(name);
  } else {
    newFolder = DriveApp.createFolder(name);
  }

  state.manifest.driveFolderIds.push(newFolder.getId());
  log(state, 'INFO', `Drive: Created folder — "${name}" (${newFolder.getId()})`);
  return newFolder;
}


// ─────────────────────────────────────────────────────────────────────────────
// FOLDER LOOKUP UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Finds a folder by name in the state manifest (by searching Drive by ID).
 * Used by document-generator and spreadsheet-generator to file documents
 * into the correct folder.
 *
 * @param {string} folderName - Exact folder name to find
 * @returns {Folder|null}
 */
function findFolder(folderName) {
  const iter = DriveApp.getFoldersByName(folderName);
  return iter.hasNext() ? iter.next() : null;
}

/**
 * Moves a Drive file into a named folder.
 * Removes the file from its current parents to avoid duplicates.
 *
 * @param {File} file
 * @param {string} targetFolderName - Target folder display name
 * @param {Object} state
 */
function moveFileToFolder(file, targetFolderName, state) {
  const targetFolder = findFolder(targetFolderName);

  if (!targetFolder) {
    log(state, 'WARN', `Drive: Target folder "${targetFolderName}" not found — file left in root`);
    return;
  }

  // Move the file
  file.moveTo(targetFolder);
  log(state, 'INFO', `Drive: Moved "${file.getName()}" to "${targetFolderName}"`);
}

/**
 * Creates a shortcut to a file in a target folder.
 * Useful for placing a document in multiple logical locations.
 *
 * @param {File} file
 * @param {string} targetFolderName
 * @param {Object} state
 */
function createShortcutInFolder(file, targetFolderName, state) {
  const targetFolder = findFolder(targetFolderName);

  if (!targetFolder) {
    log(state, 'WARN', `Drive: Target folder "${targetFolderName}" not found — shortcut not created`);
    return;
  }

  try {
    DriveApp.createShortcut(file.getId()).moveTo(targetFolder);
    log(state, 'INFO', `Drive: Created shortcut for "${file.getName()}" in "${targetFolderName}"`);
  } catch (err) {
    log(state, 'WARN', `Drive: Could not create shortcut for "${file.getName()}": ${err.message}`);
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// FOLDER STRUCTURE VISUALIZER (DEBUGGING)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Logs the created folder structure to the Apps Script Logger.
 * Run manually for debugging after provisioning.
 *
 * @param {string} rootFolderName - Name of the top-level folder to inspect
 * @param {number} [depth=0] - Current recursion depth (for indentation)
 */
function logFolderStructure(rootFolderName, depth) {
  depth = depth || 0;
  const indent = '  '.repeat(depth);

  const iter = DriveApp.getFoldersByName(rootFolderName);
  if (!iter.hasNext()) {
    Logger.log(`${indent}[NOT FOUND] ${rootFolderName}`);
    return;
  }

  const folder = iter.next();
  Logger.log(`${indent}📁 ${folder.getName()} (${folder.getId()})`);

  const subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    const sub = subfolders.next();
    Logger.log(`${'  '.repeat(depth + 1)}📁 ${sub.getName()} (${sub.getId()})`);

    const subsub = sub.getFolders();
    while (subsub.hasNext()) {
      const ss = subsub.next();
      Logger.log(`${'  '.repeat(depth + 2)}📁 ${ss.getName()} (${ss.getId()})`);
    }
  }
}
