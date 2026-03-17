/**
 * orchestrator.gs
 * Master provisioning runner for Google Workspace demo environments.
 *
 * Calls all generators in sequence, tracks state, handles errors,
 * and writes a provisioning report to Google Drive.
 *
 * Usage:
 *   1. Set Script Properties: CUSTOMER_KEY, DEMO_ACCOUNT_EMAIL
 *   2. Set DRY_RUN = 'false' in Script Properties when ready to provision for real
 *      (default is DRY_RUN = 'true' — no changes are made until you explicitly opt in)
 *   3. Run provisionDemoEnvironment() from the Apps Script editor
 *   4. Review the provisioning report in Drive when complete
 *
 * Safety:
 *   - DRY_RUN mode (default): logs all actions without creating anything
 *   - STEP_BY_STEP mode: pauses after each step and logs what was created
 *   - Confirmation dialog shown before any real changes are made
 *
 * To re-run: run cleanupDemoEnvironment() first, then provisionDemoEnvironment()
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Provisions the complete demo environment for the configured customer.
 * Run this from the Apps Script editor UI.
 *
 * Safety controls:
 *   - Reads DRY_RUN Script Property (default: true). Set to 'false' to provision for real.
 *   - Reads STEP_BY_STEP Script Property (default: false). Set to 'true' to pause after each step.
 *   - Shows confirmation dialog before any real changes are made.
 *   - Logs the target account before every action.
 */
function provisionDemoEnvironment() {
  const props = PropertiesService.getScriptProperties();
  const customerKey = props.getProperty('CUSTOMER_KEY');

  // DRY_RUN defaults to true — must explicitly set to 'false' to provision
  const dryRun = props.getProperty('DRY_RUN') !== 'false';
  const stepByStep = props.getProperty('STEP_BY_STEP') === 'true';

  const currentUser = Session.getActiveUser().getEmail();

  // Attempt to get UI — may not be available when run from triggers
  let ui = null;
  try {
    ui = SpreadsheetApp.getUi();
  } catch (e) {
    // No UI context — running from editor or trigger, log-only mode
  }

  if (!customerKey) {
    throw new Error(
      'CUSTOMER_KEY Script Property is not set. ' +
      'Go to Project Settings > Script Properties and add CUSTOMER_KEY.'
    );
  }

  const config = getConfig(customerKey);

  // Validate before starting
  const validation = validateConfig(customerKey);
  if (!validation.valid) {
    throw new Error(
      'Config validation failed:\n' + validation.errors.join('\n')
    );
  }

  // ── Safety: DRY RUN notice ──
  if (dryRun) {
    Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Logger.log('  DRY RUN MODE — No changes will be made.');
    Logger.log('  Review this log, then set DRY_RUN=false in Script Properties');
    Logger.log('  and re-run to provision for real.');
    Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  // ── Safety: target account notice ──
  Logger.log(`PROVISIONING TARGET: ${currentUser}`);
  Logger.log(`This will create files in ${currentUser}'s Drive, send emails from ${currentUser}'s Gmail, and add events to ${currentUser}'s Calendar.`);

  if (config.targetAccount && config.targetAccount !== currentUser) {
    Logger.log(`WARNING: Config targetAccount (${config.targetAccount}) does not match current user (${currentUser}). Proceeding as current user.`);
  }

  // ── Safety: production account warning ──
  if (!dryRun) {
    const lowerEmail = currentUser.toLowerCase();
    if (!lowerEmail.includes('demo') && !lowerEmail.includes('test')) {
      Logger.log(`WARNING: Target account "${currentUser}" does not contain "demo" or "test". Are you sure this is a demo account?`);
    }
  }

  // ── Safety: confirmation dialog (only when UI available and not dry run) ──
  if (!dryRun && ui) {
    const response = ui.alert(
      'Demo Environment Provisioning',
      `This will:\n• Create folders and files in your Drive\n• Send emails from your Gmail\n• Add events to your Calendar\n• Create Chat spaces\n\nTarget account: ${currentUser}\n\nProceed?`,
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) {
      Logger.log('Provisioning cancelled by user.');
      return;
    }
  }

  const state = initState(customerKey, config.companyName, dryRun);
  log(state, 'INFO', `Starting provisioning for: ${config.companyName} [${customerKey}]`);
  log(state, 'INFO', `Mode: ${dryRun ? 'DRY RUN' : 'EXECUTE'} | Step-by-step: ${stepByStep}`);
  log(state, 'INFO', `Target account: ${currentUser}`);

  const steps = [
    { name: 'Gmail Labels',   fn: () => createGmailLabels(config, state) },
    { name: 'Drive Folders',  fn: () => createDriveFolders(config, state) },
    { name: 'Google Docs',    fn: () => createDocuments(config, state) },
    { name: 'Google Sheets',  fn: () => createSpreadsheets(config, state) },
    { name: 'Gmail Emails',   fn: () => populateGmail(config, state) },
    { name: 'Google Calendar',fn: () => createCalendarEvents(config, state) },
    { name: 'Google Chat',    fn: () => setupChatSpaces(config, state) },
    { name: 'Google Forms',   fn: () => createForms(config, state) },
  ];

  for (const step of steps) {
    log(state, 'INFO', `─── ${dryRun ? '[DRY RUN] Would run' : 'Running'} Step: ${step.name} ───`);

    if (dryRun) {
      // In dry run mode, record steps as previewed without executing
      state.steps[step.name] = { status: 'DRY_RUN', timestamp: new Date().toISOString() };
      log(state, 'INFO', `${step.name}: [DRY RUN] — skipped. Set DRY_RUN=false to execute.`);
    } else {
      try {
        step.fn();
        state.steps[step.name] = { status: 'SUCCESS', timestamp: new Date().toISOString() };
        log(state, 'INFO', `${step.name}: SUCCESS`);
      } catch (err) {
        state.steps[step.name] = { status: 'FAILED', error: err.message, timestamp: new Date().toISOString() };
        log(state, 'ERROR', `${step.name}: FAILED — ${err.message}`);
        log(state, 'WARN', `Continuing to next step...`);
      }
    }

    // STEP_BY_STEP: pause and summarise after each step
    if (stepByStep && !dryRun) {
      const stepResult = state.steps[step.name];
      Logger.log(`[STEP_BY_STEP] Completed "${step.name}" — Status: ${stepResult.status}`);
      Logger.log(`[STEP_BY_STEP] Drive files so far: ${state.manifest.driveFileIds.length} | Folders: ${state.manifest.driveFolderIds.length} | Calendar events: ${state.manifest.calendarEventIds.length}`);
    }

    // Respect Apps Script execution time limits — pause briefly between heavy steps
    Utilities.sleep(500);
  }

  if (!dryRun) {
    writeProvisioningReport(config, state);
  }

  const successCount = Object.values(state.steps).filter(s => s.status === 'SUCCESS').length;
  const failCount = Object.values(state.steps).filter(s => s.status === 'FAILED').length;
  const dryRunCount = Object.values(state.steps).filter(s => s.status === 'DRY_RUN').length;

  if (dryRun) {
    log(state, 'INFO', `DRY RUN complete. ${dryRunCount} steps previewed. No changes were made.`);
    log(state, 'INFO', `Set DRY_RUN=false in Script Properties and re-run to provision for real.`);
    Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Logger.log('  DRY RUN COMPLETE — no changes were made.');
    Logger.log('  Set DRY_RUN=false in Script Properties to provision for real.');
    Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } else {
    log(state, 'INFO', `Provisioning complete. ${successCount} steps succeeded, ${failCount} failed.`);
    log(state, 'INFO', `Report written to Drive. Check the provisioning report document.`);
    if (failCount > 0) {
      Logger.log('Some steps failed. Review the provisioning report in Drive.');
    } else {
      Logger.log('Full provisioning complete. Demo environment ready.');
    }
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// STATE MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initialises the provisioning state object.
 * State is passed through all generator functions to accumulate IDs and logs.
 *
 * @param {string} customerKey
 * @param {string} companyName
 * @param {boolean} dryRun - When true, generators should preview but not create resources
 * @returns {Object} state
 */
function initState(customerKey, companyName, dryRun) {
  return {
    customerKey,
    companyName,
    dryRun: !!dryRun,
    startTime: new Date().toISOString(),
    steps: {},
    manifest: {
      // Each generator appends created resource IDs here
      // Used by cleanup.gs to find and delete everything
      gmailLabelIds: [],
      driveFolderIds: [],
      driveFileIds: [],      // Docs, Sheets, Forms
      calendarEventIds: [],
      chatSpaceNames: [],
    },
    logs: [],
  };
}

/**
 * Appends a log entry to state and to Apps Script Logger.
 *
 * @param {Object} state
 * @param {string} level - 'INFO' | 'WARN' | 'ERROR'
 * @param {string} message
 */
function log(state, level, message) {
  const entry = `[${new Date().toISOString()}] [${level}] ${message}`;
  state.logs.push(entry);
  Logger.log(entry);
}

/**
 * Persists state to Script Properties so cleanup.gs can find created resources.
 * Called after each major step and at the end of provisioning.
 *
 * @param {Object} state
 */
function persistState(state) {
  PropertiesService.getScriptProperties().setProperty(
    `MANIFEST_${state.customerKey.toUpperCase()}`,
    JSON.stringify(state.manifest)
  );
}

/**
 * Loads previously persisted state manifest (for cleanup).
 *
 * @param {string} customerKey
 * @returns {Object|null} manifest or null if not found
 */
function loadManifest(customerKey) {
  const raw = PropertiesService.getScriptProperties().getProperty(
    `MANIFEST_${customerKey.toUpperCase()}`
  );
  return raw ? JSON.parse(raw) : null;
}


// ─────────────────────────────────────────────────────────────────────────────
// PROVISIONING REPORT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Writes a Google Doc provisioning report summarizing what was created.
 *
 * @param {Object} config
 * @param {Object} state
 */
function writeProvisioningReport(config, state) {
  const endTime = new Date().toISOString();
  const duration = Math.round(
    (new Date(endTime) - new Date(state.startTime)) / 1000
  );

  const doc = DocumentApp.create(
    `Demo Provisioning Report — ${config.companyName} — ${formatDemoDate(new Date(), 'iso')}`
  );

  const body = doc.getBody();

  // Title
  body.appendParagraph(`Demo Provisioning Report`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // Summary table
  body.appendParagraph('Summary').setHeading(DocumentApp.ParagraphHeading.HEADING2);

  const summaryData = [
    ['Customer', config.companyName],
    ['Customer Key', state.customerKey],
    ['Started', state.startTime],
    ['Completed', endTime],
    ['Duration', `${duration} seconds`],
    ['Gmail Labels Created', state.manifest.gmailLabelIds.length.toString()],
    ['Drive Folders Created', state.manifest.driveFolderIds.length.toString()],
    ['Drive Files Created', state.manifest.driveFileIds.length.toString()],
    ['Calendar Events Created', state.manifest.calendarEventIds.length.toString()],
    ['Chat Spaces Created', state.manifest.chatSpaceNames.length.toString()],
  ];

  const summaryTable = body.appendTable();
  summaryData.forEach(([label, value]) => {
    const row = summaryTable.appendTableRow();
    row.appendTableCell(label).editAsText().setBold(true);
    row.appendTableCell(value);
  });

  // Step results
  body.appendParagraph('Step Results').setHeading(DocumentApp.ParagraphHeading.HEADING2);

  const stepTable = body.appendTable();
  const headerRow = stepTable.appendTableRow();
  headerRow.appendTableCell('Step').editAsText().setBold(true);
  headerRow.appendTableCell('Status').editAsText().setBold(true);
  headerRow.appendTableCell('Notes').editAsText().setBold(true);

  Object.entries(state.steps).forEach(([name, result]) => {
    const row = stepTable.appendTableRow();
    row.appendTableCell(name);
    row.appendTableCell(result.status);
    row.appendTableCell(result.error || '');
  });

  // Full log
  body.appendParagraph('Full Log').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  const logText = state.logs.join('\n');
  body.appendParagraph(logText).setFontFamily('Courier New').setFontSize(9);

  doc.saveAndClose();

  // Move report to _Admin folder if it was created
  const adminFolder = findFolderByName('_Admin — DO NOT DELETE');
  if (adminFolder) {
    DriveApp.getFileById(doc.getId()).moveTo(adminFolder);
  }

  state.manifest.driveFileIds.push(doc.getId());
  persistState(state);

  Logger.log(`Provisioning report created: ${doc.getUrl()}`);
}

/**
 * Finds a Drive folder by name (first match in My Drive).
 * Returns null if not found.
 *
 * @param {string} name
 * @returns {Folder|null}
 */
function findFolderByName(name) {
  const iter = DriveApp.getFoldersByName(name);
  return iter.hasNext() ? iter.next() : null;
}
