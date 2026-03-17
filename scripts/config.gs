/**
 * config.gs
 * Customer configuration system for Google Workspace demo environment provisioning.
 *
 * Usage:
 *   const config = getConfig('novatech');
 *   console.log(config.companyName); // "NovaTech Logistics"
 *
 * To add a new customer: copy the EXAMPLE_CONFIG block, rename the key,
 * and update all fields. Run validateConfig(key) before provisioning.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

const CUSTOMER_CONFIGS = {

  /**
   * EXAMPLE CONFIG — NovaTech Logistics
   * A fictional mid-size logistics company based in Warsaw, Poland.
   * Used for: demo environment development, trainer dry-runs, skill testing.
   */
  novatech: {
    // Identity
    companyName: 'NovaTech Logistics',
    companyNameShort: 'NovaTech',
    domain: 'novatech.example',
    language: 'en',           // 'en' or 'pl'
    brandColor: '#1A73E8',    // Hex — used for document header styling

    // Demo Google account credentials (set as Script Properties, not here)
    // Access via PropertiesService.getScriptProperties().getProperty('DEMO_ACCOUNT_EMAIL')

    // People — all fictional, no real PII
    employees: [
      { id: 'EMP-0001', firstName: 'Anna',      lastName: 'Kowalski',    title: 'Head of IT',            department: 'IT',         role: 'manager',   email: 'anna.kowalski@novatech.example' },
      { id: 'EMP-0002', firstName: 'Piotr',     lastName: 'Nowak',       title: 'Cloud Architect',       department: 'IT',         role: 'tech_lead', email: 'piotr.nowak@novatech.example' },
      { id: 'EMP-0003', firstName: 'Marta',     lastName: 'Wiśniewska',  title: 'Security Engineer',     department: 'IT',         role: 'security',  email: 'marta.wisniewska@novatech.example' },
      { id: 'EMP-0004', firstName: 'Tomasz',    lastName: 'Jabłoński',   title: 'DevOps Engineer',       department: 'IT',         role: 'devops',    email: 'tomasz.jablonski@novatech.example' },
      { id: 'EMP-0005', firstName: 'Katarzyna', lastName: 'Wróbel',      title: 'Finance Manager',       department: 'Finance',    role: 'finance',   email: 'katarzyna.wrobel@novatech.example' },
      { id: 'EMP-0006', firstName: 'Łukasz',    lastName: 'Kaczmarek',   title: 'Sales Director',        department: 'Sales',      role: 'sales',     email: 'lukasz.kaczmarek@novatech.example' },
      { id: 'EMP-0007', firstName: 'Zofia',     lastName: 'Malinowska',  title: 'HR Partner',            department: 'HR',         role: 'hr',        email: 'zofia.malinowska@novatech.example' },
      { id: 'EMP-0008', firstName: 'Rafał',     lastName: 'Kowalczyk',   title: 'Data Engineer',         department: 'IT',         role: 'data',      email: 'rafal.kowalczyk@novatech.example' },
      { id: 'EMP-0009', firstName: 'Barbara',   lastName: 'Lewandowska', title: 'Operations Manager',    department: 'Operations', role: 'ops',       email: 'barbara.lewandowska@novatech.example' },
      { id: 'EMP-0010', firstName: 'Michał',    lastName: 'Wójcik',      title: 'IT Helpdesk',           department: 'IT',         role: 'helpdesk',  email: 'michal.wojcik@novatech.example' },
      { id: 'EMP-0011', firstName: 'Joanna',    lastName: 'Nowak',       title: 'CFO',                   department: 'Finance',    role: 'cfo',       email: 'joanna.nowak@novatech.example' },
      { id: 'EMP-0012', firstName: 'Marcin',    lastName: 'Wiśniewski',  title: 'CEO',                   department: 'Executive',  role: 'ceo',       email: 'marcin.wisniewski@novatech.example' },
      { id: 'EMP-0013', firstName: 'Alicja',    lastName: 'Szymańska',   title: 'CTO',                   department: 'Executive',  role: 'cto',       email: 'alicja.szymanska@novatech.example' },
      { id: 'EMP-0014', firstName: 'Krzysztof', lastName: 'Dąbrowski',   title: 'CISO',                  department: 'IT',         role: 'ciso',      email: 'krzysztof.dabrowski@novatech.example' },
    ],

    // Departments
    departments: [
      'IT', 'Finance', 'Sales', 'Operations', 'HR', 'Executive', 'Legal'
    ],

    // Projects — used in email subjects, doc titles, folder names
    projects: [
      {
        key: 'DT_PHASE1',
        name: 'Digital Transformation Initiative',
        nameShort: 'DT Initiative',
        phase: 'Phase 1',
        budget: '€480,000',
        manager: 'EMP-0001',
      },
      {
        key: 'SEC_POSTURE',
        name: 'Security Posture Improvement Programme',
        nameShort: 'SecPosure',
        phase: 'Q2 2026',
        budget: '€120,000',
        manager: 'EMP-0014',
      },
    ],

    // Financial figures for demo documents (all fictional)
    financials: {
      annualRevenue: '€340M',
      employeeCount: 1200,
      itBudgetAnnual: '€2,220,000',
      cloudSpendMonthly: '€81,900',
    },

    // Drive folder structure
    folderStructure: [
      {
        name: 'NovaTech Logistics',
        children: [
          {
            name: 'IT Department',
            children: [
              { name: 'Projects', children: [
                { name: 'DT Initiative — Phase 1' },
                { name: 'Security Posture Programme' },
              ]},
              { name: 'Architecture & Design' },
              { name: 'Security' },
              { name: 'Reports' },
            ],
          },
          {
            name: 'Finance',
            children: [
              { name: 'Budgets' },
              { name: 'Reports' },
            ],
          },
          {
            name: 'HR',
            children: [
              { name: 'Onboarding' },
              { name: 'Training' },
            ],
          },
          {
            name: 'Executive',
            children: [
              { name: 'Board Materials' },
              { name: 'QBRs' },
            ],
          },
          { name: '_Admin — DO NOT DELETE' },
        ],
      },
    ],

    // Chat spaces to create
    chatSpaces: [
      { name: 'proj-dt-initiative',  description: 'DT Initiative — workstream coordination, decisions, and updates' },
      { name: 'security-ops',        description: 'Security alerts, incident coordination, vulnerability tracking' },
      { name: 'ops-it',              description: 'Day-to-day IT ops — incidents, deployments, monitoring' },
      { name: 'finance-it',          description: 'Budget tracking, invoice approvals, financial reporting for IT' },
      { name: 'random',              description: 'The non-work space — wins, recommendations, team culture' },
    ],

    // Gmail label hierarchy to create
    gmailLabels: [
      'Projects',
      'Projects/DT Initiative',
      'Projects/Security Programme',
      'Security',
      'Security/Audits',
      'Security/Incidents',
      'Finance',
      'Finance/Budget-Approvals',
      'Finance/Invoices',
      'HR',
      'HR/Onboarding',
      'HR/Surveys',
      'IT',
      'IT/Incidents',
      'IT/Training',
      'External',
      'External/Partners',
      'Reports',
      'Reports/Quarterly',
      'Sales',
      'Sales/Wins',
    ],

    // Demo date anchor — all event dates calculated relative to this
    // Set to a Monday to make calendar week views look correct
    demoDateAnchor: getDemoDateAnchor(), // Returns next Monday from today
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADD ADDITIONAL CUSTOMER CONFIGS BELOW
  // Copy the novatech block, change the key, update all fields.
  // ──────────────────────────────────────────────────────────────────────────

};


// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the configuration object for a given customer key.
 * Throws a descriptive error if the key is not found.
 *
 * @param {string} customerKey - The key identifying the customer config (e.g., 'novatech')
 * @returns {Object} Customer configuration object
 */
function getConfig(customerKey) {
  if (!customerKey || typeof customerKey !== 'string') {
    throw new Error('getConfig: customerKey must be a non-empty string.');
  }

  const key = customerKey.toLowerCase().trim();
  const config = CUSTOMER_CONFIGS[key];

  if (!config) {
    const available = Object.keys(CUSTOMER_CONFIGS).join(', ');
    throw new Error(
      `getConfig: No configuration found for key "${key}". ` +
      `Available keys: ${available}`
    );
  }

  return config;
}

/**
 * Returns all available customer config keys.
 * @returns {string[]}
 */
function listConfigs() {
  return Object.keys(CUSTOMER_CONFIGS);
}

/**
 * Validates a config object for required fields.
 * Call before running orchestrator to catch missing fields early.
 *
 * @param {string} customerKey
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateConfig(customerKey) {
  const errors = [];

  let config;
  try {
    config = getConfig(customerKey);
  } catch (e) {
    return { valid: false, errors: [e.message] };
  }

  const required = [
    'companyName', 'domain', 'language', 'brandColor',
    'employees', 'departments', 'projects',
    'folderStructure', 'chatSpaces', 'gmailLabels',
  ];

  required.forEach(field => {
    if (!config[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (config.employees && config.employees.length < 5) {
    errors.push('employees array should have at least 5 entries for a realistic demo');
  }

  if (config.language && !['en', 'pl'].includes(config.language)) {
    errors.push(`language must be "en" or "pl", got: "${config.language}"`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Returns an employee object by role key (e.g., 'manager', 'cto', 'ciso').
 * Returns the first match. Returns null if not found.
 *
 * @param {Object} config - Config object from getConfig()
 * @param {string} role - Role key to look up
 * @returns {Object|null}
 */
function getEmployeeByRole(config, role) {
  return config.employees.find(e => e.role === role) || null;
}

/**
 * Returns all employees in a given department.
 *
 * @param {Object} config
 * @param {string} department
 * @returns {Object[]}
 */
function getEmployeesByDepartment(config, department) {
  return config.employees.filter(e => e.department === department);
}

/**
 * Returns a formatted full name for an employee.
 * @param {Object} employee
 * @returns {string}
 */
function getFullName(employee) {
  return `${employee.firstName} ${employee.lastName}`;
}

/**
 * Calculates a demo date offset from the anchor date.
 * Use to generate consistent relative dates throughout demo content.
 *
 * @param {Object} config
 * @param {number} offsetDays - Positive = future, negative = past
 * @returns {Date}
 */
function getDemoDate(config, offsetDays) {
  const anchor = new Date(config.demoDateAnchor);
  anchor.setDate(anchor.getDate() + (offsetDays || 0));
  return anchor;
}

/**
 * Formats a Date object as a readable string for use in document content.
 * @param {Date} date
 * @param {string} [format='long'] - 'long' | 'short' | 'iso'
 * @returns {string}
 */
function formatDemoDate(date, format) {
  if (!date) return '';
  switch (format || 'long') {
    case 'iso':
      return Utilities.formatDate(date, 'Europe/Warsaw', 'yyyy-MM-dd');
    case 'short':
      return Utilities.formatDate(date, 'Europe/Warsaw', 'dd MMM yyyy');
    case 'long':
    default:
      return Utilities.formatDate(date, 'Europe/Warsaw', 'MMMM d, yyyy');
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the next Monday from today (or today if today is Monday).
 * Used to anchor demo calendar events on a realistic week.
 * @returns {Date}
 */
function getDemoDateAnchor() {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 1 = Monday, ...
  const daysUntilMonday = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + daysUntilMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
