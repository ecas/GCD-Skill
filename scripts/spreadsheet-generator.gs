/**
 * spreadsheet-generator.gs
 * Creates Google Sheets with headers, sample data, conditional formatting,
 * formulas, and charts for demo environments.
 *
 * Called by orchestrator.gs. Can also be run standalone.
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo spreadsheets for a customer config.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function createSpreadsheets(config, state) {
  const sheets = buildSpreadsheetDefinitions(config);
  log(state, 'INFO', `Sheets: Creating ${sheets.length} spreadsheets`);

  sheets.forEach((sheetDef, index) => {
    try {
      log(state, 'INFO', `Sheets: ${index + 1}/${sheets.length} — "${sheetDef.title}"`);
      const ss = buildSpreadsheet(config, sheetDef, state);
      if (ss) {
        state.manifest.driveFileIds.push(ss.getId());
        if (sheetDef.targetFolder) {
          moveFileToFolder(
            DriveApp.getFileById(ss.getId()),
            sheetDef.targetFolder,
            state
          );
        }
      }
      Utilities.sleep(500);
    } catch (err) {
      log(state, 'ERROR', `Sheets: Failed "${sheetDef.title}": ${err.message}`);
    }
  });

  persistState(state);
}


// ─────────────────────────────────────────────────────────────────────────────
// SPREADSHEET DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all spreadsheet definitions for the customer config.
 *
 * @param {Object} config
 * @returns {Object[]}
 */
function buildSpreadsheetDefinitions(config) {
  const c = config;
  const manager = getEmployeeByRole(c, 'manager');

  return [

    // ── IT Budget Tracker ────────────────────────────────────────────────────
    {
      title: `${c.companyName} — IT Budget 2026`,
      targetFolder: 'Finance',
      tabs: [
        {
          name: 'Summary',
          headers: ['Category', 'Annual Budget (€)', 'Spent YTD (€)', 'Remaining (€)', '% Spent', 'Status'],
          data: [
            ['Cloud Infrastructure', 480000, 187400, null, null, null],
            ['Software Licenses',    220000, 198000, null, null, null],
            ['Headcount (IT)',      1200000, 450000, null, null, null],
            ['Hardware',             95000,  82000, null, null, null],
            ['Training',             45000,  12500, null, null, null],
            ['Consulting',          180000,  67500, null, null, null],
          ],
          formulas: [
            // Remaining = Budget - Spent
            { col: 4, rowStart: 2, template: '=B{r}-C{r}' },
            // % Spent = Spent / Budget
            { col: 5, rowStart: 2, template: '=C{r}/B{r}' },
            // Status based on % spent
            { col: 6, rowStart: 2, template: '=IF(E{r}>0.9,"AT RISK",IF(E{r}>0.75,"WATCH","ON TRACK"))' },
          ],
          totalsRow: true,
          conditionalFormatting: [
            {
              range: 'F2:F7',
              rules: [
                { text: 'AT RISK',   bgColor: '#FFCCCC', fontColor: '#CC0000' },
                { text: 'WATCH',     bgColor: '#FFF2CC', fontColor: '#856404' },
                { text: 'ON TRACK',  bgColor: '#D9EAD3', fontColor: '#274E13' },
              ],
            },
          ],
          columnFormats: [
            { col: 2, format: '€#,##0' },
            { col: 3, format: '€#,##0' },
            { col: 4, format: '€#,##0' },
            { col: 5, format: '0.0%' },
          ],
          freezeRows: 1,
          freezeCols: 1,
        },
        {
          name: 'Cloud',
          headers: ['Service', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Annual Total', 'Budget', 'Variance'],
          data: [
            ['Compute Engine',  18400, 19200, 21000, 21500, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 220000, null],
            ['GKE',             24100, 25600, 28000, 29000, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 300000, null],
            ['Cloud Storage',    4200,  4100,  4400,  4500, 0, 0, 0, 0, 0, 0, 0, 0, 0, null,  50000, null],
            ['BigQuery',         8900,  9400, 14200, 14500, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 120000, null],
            ['Cloud SQL',        6100,  6100,  6200,  6200, 0, 0, 0, 0, 0, 0, 0, 0, 0, null,  75000, null],
            ['Networking',       3800,  4100,  4300,  4400, 0, 0, 0, 0, 0, 0, 0, 0, 0, null,  50000, null],
          ],
          formulas: [
            { col: 14, rowStart: 2, template: '=SUM(B{r}:M{r})' },
            { col: 16, rowStart: 2, template: '=N{r}-O{r}' },
          ],
          freezeRows: 1,
        },
      ],
    },

    // ── Employee Directory ──────────────────────────────────────────────────
    {
      title: `${c.companyName} — Employee Directory (IT Demo)`,
      targetFolder: 'HR',
      tabs: [
        {
          name: 'All Staff',
          headers: [
            'Employee ID', 'First Name', 'Last Name', 'Full Name', 'Job Title',
            'Department', 'Team', 'Manager', 'Email', 'Location',
            'Start Date', 'Years at Company', 'GCP Access', 'Status',
          ],
          data: c.employees.map(emp => [
            emp.id,
            emp.firstName,
            emp.lastName,
            null,  // formula: Full Name
            emp.title,
            emp.department,
            emp.role,
            '',    // manager name — would need lookup
            emp.email,
            ['manager', 'cto', 'ceo', 'cfo', 'ciso'].includes(emp.role) ? 'Warsaw Office' : 'Hybrid',
            '2022-01-01',  // placeholder start date
            null,           // formula: years at company
            ['manager', 'tech_lead', 'devops', 'data', 'cto', 'ciso', 'security'].includes(emp.role) ? 'Yes' : 'No',
            'Active',
          ]),
          formulas: [
            { col: 4, rowStart: 2, template: '=B{r}&" "&C{r}' },
            { col: 12, rowStart: 2, template: '=ROUND((TODAY()-K{r})/365,1)' },
          ],
          conditionalFormatting: [
            {
              range: 'M2:M20',
              rules: [
                { text: 'Yes', bgColor: '#D9EAD3', fontColor: '#274E13' },
              ],
            },
            {
              range: 'N2:N20',
              rules: [
                { text: 'Active',   bgColor: '#D9EAD3', fontColor: '#274E13' },
                { text: 'Inactive', bgColor: '#F3F3F3', fontColor: '#9AA0A6' },
                { text: 'On Leave', bgColor: '#FFF2CC', fontColor: '#856404' },
              ],
            },
          ],
          freezeRows: 1,
          freezeCols: 2,
          filterEnabled: true,
        },
      ],
    },

    // ── KPI Dashboard ────────────────────────────────────────────────────────
    {
      title: `${c.companyName} IT — KPI Dashboard 2026`,
      targetFolder: 'IT Department',
      tabs: [
        {
          name: 'Summary',
          headers: ['KPI Category', 'Metric', 'Target', 'Current', 'Prior Period', 'Trend', 'Status'],
          data: [
            ['Reliability', 'Service Uptime (%)',        '99.9%',    '99.94%', '99.87%', null, null],
            ['Reliability', 'MTTR (minutes)',            '< 30',     '18',     '22',     null, null],
            ['Reliability', 'MTTD (minutes)',            '< 5',      '3.2',    '4.1',    null, null],
            ['Performance', 'API p95 latency (ms)',      '< 200',    '178',    '195',    null, null],
            ['Performance', 'Deployment frequency/day',  'Daily',    '1.4',    '0.9',    null, null],
            ['Performance', 'Lead time (hours)',         '< 2',      '1.6',    '2.8',    null, null],
            ['Cost',        'Cost per transaction (€)',  '< 0.003',  '0.0023', '0.0027', null, null],
            ['Cost',        'Cloud cost MoM growth (%)', '< 5%',     '13.6%',  '4.7%',   null, null],
            ['Security',    'Critical findings open',    '0',        '0',      '0',      null, null],
            ['Security',    'Patch compliance (%)',      '100%',     '94%',    '89%',    null, null],
            ['Team',        'Developer satisfaction',    '> 4.0/5',  '4.3',    '4.1',    null, null],
            ['Team',        'On-call alert volume/week', '< 10',     '7.2',    '11.4',   null, null],
          ],
          // Trend and Status use static values here since formulas would need
          // typed comparisons that vary by metric direction
          conditionalFormatting: [
            {
              range: 'G2:G13',
              rules: [
                { text: '✅', bgColor: '#D9EAD3', fontColor: '#274E13' },
                { text: '⚠️', bgColor: '#FFF2CC', fontColor: '#856404' },
                { text: '❌', bgColor: '#FFCCCC', fontColor: '#CC0000' },
              ],
            },
          ],
          freezeRows: 1,
          freezeCols: 2,
        },
        {
          name: 'Monthly Data',
          headers: ['Month', 'Uptime %', 'MTTR min', 'API p95 ms', 'Deploy/day', 'Cost/tx €', 'Cloud Spend €'],
          data: [
            ['Jan 2026', 99.91, 22, 195, 0.8, 0.0027, 68900],
            ['Feb 2026', 99.87, 28, 199, 0.9, 0.0026, 72100],
            ['Mar 2026', 99.94, 18, 178, 1.4, 0.0023, 81900],
            ['Apr 2026', '', '', '', '', '', ''],
            ['May 2026', '', '', '', '', '', ''],
            ['Jun 2026', '', '', '', '', '', ''],
          ],
          freezeRows: 1,
        },
      ],
    },

  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// SPREADSHEET BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a Google Sheets spreadsheet from a definition object.
 *
 * @param {Object} config
 * @param {Object} sheetDef
 * @param {Object} state
 * @returns {Spreadsheet}
 */
function buildSpreadsheet(config, sheetDef, state) {
  const ss = SpreadsheetApp.create(sheetDef.title);

  // Remove the default blank sheet if we're adding named sheets
  if (sheetDef.tabs && sheetDef.tabs.length > 0) {
    const defaultSheet = ss.getSheets()[0];

    sheetDef.tabs.forEach((tabDef, index) => {
      let sheet;
      if (index === 0) {
        // Rename the default sheet
        sheet = defaultSheet;
        sheet.setName(tabDef.name);
      } else {
        sheet = ss.insertSheet(tabDef.name);
      }

      populateSheet(sheet, tabDef, state);
    });
  }

  ss.setSpreadsheetLocale('en_GB');
  SpreadsheetApp.flush();

  log(state, 'INFO', `Sheets: Created — "${sheetDef.title}" (${ss.getId()})`);
  return ss;
}

/**
 * Populates a single sheet with data, formulas, and formatting.
 *
 * @param {Sheet} sheet
 * @param {Object} tabDef
 * @param {Object} state
 */
function populateSheet(sheet, tabDef, state) {
  const headers = tabDef.headers || [];
  const data    = tabDef.data || [];

  // Write headers
  if (headers.length > 0) {
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1A73E8');
    headerRange.setFontColor('#FFFFFF');
  }

  // Write data rows
  if (data.length > 0) {
    data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== null && cell !== undefined) {
          sheet.getRange(rowIndex + 2, colIndex + 1).setValue(cell);
        }
      });
    });
  }

  // Apply formulas
  if (tabDef.formulas) {
    tabDef.formulas.forEach(formulaDef => {
      const numRows = data.length;
      for (let r = formulaDef.rowStart; r < formulaDef.rowStart + numRows; r++) {
        const formula = formulaDef.template.replace(/\{r\}/g, r);
        sheet.getRange(r, formulaDef.col).setFormula(formula);
      }
    });
  }

  // Add totals row
  if (tabDef.totalsRow && data.length > 0) {
    const totalsRowIndex = data.length + 2;
    const totalCell = sheet.getRange(totalsRowIndex, 1);
    totalCell.setValue('TOTAL').setFontWeight('bold');

    // Sum numeric columns (B and C typically)
    for (let col = 2; col <= Math.min(headers.length, 5); col++) {
      const colLetter = columnToLetter(col);
      sheet.getRange(totalsRowIndex, col).setFormula(
        `=SUM(${colLetter}2:${colLetter}${totalsRowIndex - 1})`
      );
    }

    sheet.getRange(totalsRowIndex, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#F8F9FA');
  }

  // Apply column number formats
  if (tabDef.columnFormats) {
    tabDef.columnFormats.forEach(fmt => {
      const numRows = data.length + 1;
      sheet.getRange(2, fmt.col, numRows, 1).setNumberFormat(fmt.format);
    });
  }

  // Apply conditional formatting
  if (tabDef.conditionalFormatting) {
    tabDef.conditionalFormatting.forEach(cfDef => {
      const range = sheet.getRange(cfDef.range);
      const rules = sheet.getConditionalFormatRules();

      cfDef.rules.forEach(rule => {
        const newRule = SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(rule.text)
          .setBackground(rule.bgColor)
          .setFontColor(rule.fontColor)
          .setRanges([range])
          .build();
        rules.push(newRule);
      });

      sheet.setConditionalFormatRules(rules);
    });
  }

  // Auto-resize columns
  if (headers.length > 0) {
    sheet.autoResizeColumns(1, headers.length);
  }

  // Freeze rows
  if (tabDef.freezeRows) {
    sheet.setFrozenRows(tabDef.freezeRows);
  }

  // Freeze columns
  if (tabDef.freezeCols) {
    sheet.setFrozenColumns(tabDef.freezeCols);
  }

  // Enable filter
  if (tabDef.filterEnabled && data.length > 0) {
    sheet.getRange(1, 1, data.length + 1, headers.length).createFilter();
  }

  SpreadsheetApp.flush();
}


// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converts a column number to its letter representation.
 * E.g., 1 → A, 2 → B, 27 → AA
 *
 * @param {number} columnNumber - 1-based column number
 * @returns {string} Column letter(s)
 */
function columnToLetter(columnNumber) {
  let result = '';
  let n = columnNumber;
  while (n > 0) {
    const remainder = (n - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    n = Math.floor((n - 1) / 26);
  }
  return result;
}
