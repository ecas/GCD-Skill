/**
 * orchestrator.gs
 * Master provisioning runner for Google Workspace demo environments.
 *
 * Calls all generators in sequence, tracks state, handles errors,
 * and writes a provisioning report to Google Drive.
 *
 * Usage:
 *   1. Set Script Properties: CUSTOMER_KEY, DEMO_ACCOUNT_EMAIL
 *   2. Run provisionDemoEnvironment() from the Apps Script editor
 *   3. Review the provisioning report in Drive when complete
 *
 * To re-run: run cleanupDemoEnvironment() first, then provisionDemoEnvironment()
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Provisions the complete demo environment for the configured customer.
 * Run this from the Apps Script editor UI.
 */
function provisionDemoEnvironment() {
  const props = PropertiesService.getScriptProperties();
  const customerKey = props.getProperty('CUSTOMER_KEY');

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

  const state = initState(customerKey, config.companyName);
  log(state, 'INFO', `Starting provisioning for: ${config.companyName} [${customerKey}]`);

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
    log(state, 'INFO', `─── Step: ${step.name} ───`);
    try {
      step.fn();
      state.steps[step.name] = { status: 'SUCCESS', timestamp: new Date().toISOString() };
      log(state, 'INFO', `${step.name}: SUCCESS`);
    } catch (err) {
      state.steps[step.name] = { status: 'FAILED', error: err.message, timestamp: new Date().toISOString() };
      log(state, 'ERROR', `${step.name}: FAILED — ${err.message}`);
      log(state, 'WARN', `Continuing to next step...`);
    }

    // Respect Apps Script execution time limits — pause briefly between heavy steps
    Utilities.sleep(500);
  }

  writeProvisioningReport(config, state);

  const successCount = Object.values(state.steps).filter(s => s.status === 'SUCCESS').length;
  const failCount = Object.values(state.steps).filter(s => s.status === 'FAILED').length;

  log(state, 'INFO', `Provisioning complete. ${successCount} steps succeeded, ${failCount} failed.`);
  log(state, 'INFO', `Report written to Drive. Check the provisioning report document.`);

  if (failCount > 0) {
    Logger.log('⚠️ Some steps failed. Review the provisioning report in Drive.');
  } else {
    Logger.log('✅ Full provisioning complete. Demo environment ready.');
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
 * @returns {Object} state
 */
function initState(customerKey, companyName) {
  return {
    customerKey,
    companyName,
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
