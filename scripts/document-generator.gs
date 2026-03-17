/**
 * document-generator.gs
 * Creates Google Docs from templates with proper heading hierarchy,
 * tables, and body text formatting.
 *
 * Called by orchestrator.gs. Can also be run standalone.
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo Google Docs for a customer config.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function createDocuments(config, state) {
  const docs = buildDocumentDefinitions(config);
  log(state, 'INFO', `Documents: Creating ${docs.length} Google Docs`);

  docs.forEach((docDef, index) => {
    try {
      log(state, 'INFO', `Documents: ${index + 1}/${docs.length} — "${docDef.title}"`);
      const doc = buildDocument(config, docDef, state);
      if (doc) {
        state.manifest.driveFileIds.push(doc.getId());
        if (docDef.targetFolder) {
          moveFileToFolder(
            DriveApp.getFileById(doc.getId()),
            docDef.targetFolder,
            state
          );
        }
      }
      Utilities.sleep(300);
    } catch (err) {
      log(state, 'ERROR', `Documents: Failed "${docDef.title}": ${err.message}`);
    }
  });

  persistState(state);
}


// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all document definitions for the customer config.
 *
 * @param {Object} config
 * @returns {Object[]}
 */
function buildDocumentDefinitions(config) {
  const c = config;
  const manager  = getEmployeeByRole(c, 'manager');
  const techLead = getEmployeeByRole(c, 'tech_lead');
  const cto      = getEmployeeByRole(c, 'cto');
  const cfo      = getEmployeeByRole(c, 'cfo');
  const ceo      = getEmployeeByRole(c, 'ceo');
  const project  = c.projects[0];

  return [

    // Project Charter
    {
      title: `${project.name} — Project Charter v1.0`,
      targetFolder: `${project.nameShort}`,
      sections: [
        {
          type: 'h1',
          text: `${project.name}`,
        },
        {
          type: 'meta',
          text: `Version: 1.0 | Status: DRAFT | Last Updated: ${formatDemoDate(getDemoDate(c, 0), 'long')}\nOwner: ${getFullName(manager)} | Sponsor: ${getFullName(cto)}`,
        },
        {
          type: 'h2',
          text: '1. Executive Summary',
        },
        {
          type: 'body',
          text: `${project.name} is a strategic initiative to modernise the IT technology stack and migrate core workloads to Google Cloud Platform. The project will deliver a scalable, secure, and cost-efficient infrastructure foundation for ${c.companyName}'s growth through 2028.`,
        },
        {
          type: 'body',
          text: `Estimated duration: 9 months | Estimated investment: ${project.budget} | Expected ROI: 180% over 3 years`,
        },
        {
          type: 'h2',
          text: '2. Problem Statement',
        },
        {
          type: 'h3',
          text: '2.1 Current State',
        },
        {
          type: 'bullets',
          items: [
            'Hardware refresh cycle creates significant capex events every 3 years',
            'Manual provisioning processes average 4+ hours per new deployment',
            'Disaster recovery RTO of 8+ hours does not meet business continuity requirements',
            'Limited observability across fragmented monitoring tools',
          ],
        },
        {
          type: 'h2',
          text: '3. Project Objectives',
        },
        {
          type: 'table',
          headers: ['Objective', 'Success Metric', 'Target'],
          rows: [
            ['Reduce infrastructure cost', 'Monthly cloud spend vs. baseline', '-30%'],
            ['Improve deployment speed', 'Time from commit to production', '< 15 minutes'],
            ['Achieve DR target', 'Recovery Time Objective', '< 1 hour'],
            ['Improve observability', 'Mean Time to Detect (MTTD)', '< 5 minutes'],
            ['Enable AI capability', 'First AI use case in production', 'Q3 2026'],
          ],
        },
        {
          type: 'h2',
          text: '4. Stakeholders',
        },
        {
          type: 'table',
          headers: ['Name', 'Role', 'Responsibility', 'Engagement'],
          rows: [
            [getFullName(cto), 'Executive Sponsor', 'Strategic decisions, budget approval', 'Monthly'],
            [getFullName(manager), 'Project Owner', 'Day-to-day decisions, escalations', 'Daily'],
            [getFullName(techLead), 'Technical Lead', 'Architecture, implementation', 'Daily'],
            [getFullName(cfo), 'Finance', 'Budget oversight', 'Monthly'],
          ],
        },
        {
          type: 'h2',
          text: '5. Timeline',
        },
        {
          type: 'table',
          headers: ['Phase', 'Duration', 'Key Milestone'],
          rows: [
            ['Phase 0 — Assessment', '6 weeks', 'Architecture review approved'],
            ['Phase 1 — Foundation', '10 weeks', 'Network live, first workloads migrated'],
            ['Phase 2 — Migration', '20 weeks', 'Full production cutover'],
            ['Phase 3 — Optimize', 'Ongoing', 'First AI use case in production'],
          ],
        },
      ],
    },

    // Security Policy
    {
      title: `${c.companyName} Cloud Security Policy — v2.1`,
      targetFolder: 'Security',
      sections: [
        {
          type: 'h1',
          text: 'Cloud Security Policy',
        },
        {
          type: 'meta',
          text: `Classification: INTERNAL | Version: 2.1 | Effective: ${formatDemoDate(getDemoDate(c, 0), 'long')}\nOwner: ${getFullName(getEmployeeByRole(c, 'ciso'))}, CISO | Review cycle: Annual`,
        },
        {
          type: 'h2',
          text: '1. Purpose and Scope',
        },
        {
          type: 'body',
          text: `This policy establishes security requirements for all ${c.companyName} cloud environments, including Google Cloud Platform workloads, Google Workspace, and third-party SaaS applications integrated with company systems. Scope covers all employees, contractors, and third parties with access to ${c.companyName} cloud resources.`,
        },
        {
          type: 'h2',
          text: '2. Access Control',
        },
        {
          type: 'h3',
          text: '2.1 Identity and Authentication',
        },
        {
          type: 'bullets',
          items: [
            `All cloud resource access requires corporate Google identity (${c.domain} account)`,
            'Multi-factor authentication (MFA) is mandatory for all accounts — no exceptions',
            'Hardware security keys (FIDO2) required for privileged access roles',
            'Shared accounts are prohibited. Service-to-service access uses service accounts only.',
            'Inactive accounts are automatically deprovisioned after 90 days',
          ],
        },
        {
          type: 'h2',
          text: '3. Data Classification',
        },
        {
          type: 'table',
          headers: ['Classification', 'Definition', 'Storage Requirements'],
          rows: [
            ['Public', 'Approved for public release', 'Standard'],
            ['Internal', 'For company use only', 'Encrypted at rest'],
            ['Confidential', 'Sensitive business data', 'CMEK required'],
            ['Restricted', 'Regulatory / personal data', 'Restricted access + CMEK + audit logging'],
          ],
        },
        {
          type: 'h2',
          text: '4. Incident Response Severity',
        },
        {
          type: 'table',
          headers: ['Severity', 'Criteria', 'Response Time', 'Escalation'],
          rows: [
            ['P1 — Critical', 'Data breach, production down, ransomware', '15 minutes', 'CISO + CTO immediately'],
            ['P2 — High', 'Security finding, degraded service', '1 hour', 'Security team + manager'],
            ['P3 — Medium', 'Vulnerability discovered, policy violation', '4 hours', 'Security team'],
            ['P4 — Low', 'Advisory, non-urgent finding', '24 hours', 'Standard ticket'],
          ],
        },
      ],
    },

    // Executive Memo — Budget
    {
      title: `MEMO: Q2 2026 IT Budget Request — ${formatDemoDate(getDemoDate(c, 0), 'short')}`,
      targetFolder: 'Finance',
      sections: [
        {
          type: 'h1',
          text: 'MEMORANDUM',
        },
        {
          type: 'meta',
          text: `TO: ${getFullName(cfo)}, CFO\nFROM: ${getFullName(manager)}, Head of IT\nDATE: ${formatDemoDate(getDemoDate(c, 0), 'long')}\nSUBJECT: Q2 2026 IT Infrastructure Budget Request\nCLASSIFICATION: CONFIDENTIAL`,
        },
        {
          type: 'h2',
          text: 'Purpose',
        },
        {
          type: 'body',
          text: 'This memo provides a summary of the Q2 2026 technology investment request and a recommendation for budget allocation to support the Digital Transformation Initiative Phase 1.',
        },
        {
          type: 'h2',
          text: 'Recommendation',
        },
        {
          type: 'body',
          text: `I recommend that ${c.companyName} approves €480,000 for Q2 2026 IT infrastructure investment to proceed with Google Cloud Platform migration under the committed-use discount pricing window.`,
        },
        {
          type: 'h2',
          text: 'Rationale',
        },
        {
          type: 'bullets',
          items: [
            'Projected 3-year ROI of 180% with payback period of 14 months',
            'Committed-use discount pricing window closes end of this quarter — delay increases cost',
            'Phased approach limits risk: Phase 1 delivers standalone value regardless of Phase 2 decision',
          ],
        },
        {
          type: 'h2',
          text: 'Required Action',
        },
        {
          type: 'bullets',
          items: [
            `Approve the budget request — deadline: ${formatDemoDate(getDemoDate(c, 5), 'long')}`,
            'Schedule CFO + CTO alignment call if questions remain',
          ],
        },
      ],
    },

  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a Google Doc from a document definition.
 *
 * @param {Object} config
 * @param {Object} docDef - {title, sections[]}
 * @param {Object} state
 * @returns {Document} Created Google Docs document
 */
function buildDocument(config, docDef, state) {
  const doc = DocumentApp.create(docDef.title);
  const body = doc.getBody();

  // Set default font
  body.setFontFamily('Google Sans');

  // Add a branded header line
  addBrandedHeader(body, config.companyName, config.brandColor);

  docDef.sections.forEach(section => {
    appendSection(body, section, config);
  });

  doc.saveAndClose();
  log(state, 'INFO', `Documents: Created — "${docDef.title}" (${doc.getId()})`);
  return doc;
}

/**
 * Adds a thin branded color bar and company name at the top of the document.
 *
 * @param {Body} body
 * @param {string} companyName
 * @param {string} brandColor
 */
function addBrandedHeader(body, companyName, brandColor) {
  // DocumentApp doesn't support background colors on paragraphs directly,
  // so we use a 1-row, 1-column table with background color as the header bar.
  const headerTable = body.appendTable([['']]);
  const headerCell = headerTable.getCell(0, 0);
  headerCell.setBackgroundColor(brandColor || '#1A73E8');
  headerCell.getChild(0).asText()
    .setText(companyName)
    .setForegroundColor('#FFFFFF')
    .setBold(true)
    .setFontFamily('Google Sans')
    .setFontSize(11);
  body.appendParagraph('');
}

/**
 * Appends a section to the document body based on its type.
 *
 * @param {Body} body
 * @param {Object} section - {type, text?, items?, headers?, rows?}
 * @param {Object} config
 */
function appendSection(body, section, config) {
  switch (section.type) {
    case 'h1':
      body.appendParagraph(section.text)
        .setHeading(DocumentApp.ParagraphHeading.HEADING1);
      break;

    case 'h2':
      body.appendParagraph(section.text)
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);
      break;

    case 'h3':
      body.appendParagraph(section.text)
        .setHeading(DocumentApp.ParagraphHeading.HEADING3);
      break;

    case 'body':
      body.appendParagraph(section.text)
        .setHeading(DocumentApp.ParagraphHeading.NORMAL);
      break;

    case 'meta':
      // Metadata block — styled as small grey text
      const metaPara = body.appendParagraph(section.text);
      metaPara.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      metaPara.editAsText()
        .setFontSize(9)
        .setForegroundColor('#5F6368');
      break;

    case 'bullets':
      if (section.items) {
        section.items.forEach(item => {
          body.appendListItem(item)
            .setGlyphType(DocumentApp.GlyphType.BULLET)
            .setHeading(DocumentApp.ParagraphHeading.NORMAL);
        });
      }
      break;

    case 'table':
      if (section.headers && section.rows) {
        const tableData = [section.headers, ...section.rows];
        const table = body.appendTable(tableData);

        // Bold the header row
        const headerRow = table.getRow(0);
        for (let i = 0; i < headerRow.getNumCells(); i++) {
          headerRow.getCell(i).editAsText().setBold(true);
        }
      }
      break;

    case 'divider':
      body.appendHorizontalRule();
      break;

    default:
      // Unknown type — append as plain text with warning
      body.appendParagraph(`[Unknown section type: ${section.type}]`);
  }
}
