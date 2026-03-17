/**
 * gmail-populator.gs
 * Creates realistic email threads in Gmail for demo environments.
 *
 * Features:
 * - Sends emails using GmailApp (appears in sent/inbox)
 * - Applies labels automatically
 * - Supports branded HTML templates
 * - Simulates multi-sender display names
 * - Creates threaded conversations (reply-to-message-id)
 *
 * Called by orchestrator.gs as part of the provisioning pipeline.
 * Can also be run standalone: populateGmail(getConfig('novatech'), initState(...))
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo email threads for a customer config.
 * Reads scenario definitions and sends each email in order.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function populateGmail(config, state) {
  const scenarios = buildEmailScenarios(config);
  log(state, 'INFO', `Gmail: Creating ${scenarios.length} email scenarios`);

  scenarios.forEach((scenario, index) => {
    try {
      log(state, 'INFO', `Gmail: Scenario ${index + 1}/${scenarios.length} — "${scenario.subject}"`);
      createEmailThread(config, state, scenario);
      Utilities.sleep(300); // Avoid rate limiting
    } catch (err) {
      log(state, 'ERROR', `Gmail: Failed on scenario "${scenario.subject}": ${err.message}`);
    }
  });
}


// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds all email scenarios for the given config.
 * Each scenario is an array of messages forming a thread.
 *
 * @param {Object} config
 * @returns {Object[]} Array of scenario objects
 */
function buildEmailScenarios(config) {
  const c = config;
  const anchor = getDemoDate(c, 0);

  const manager  = getEmployeeByRole(c, 'manager');
  const techLead = getEmployeeByRole(c, 'tech_lead');
  const security = getEmployeeByRole(c, 'security');
  const cfo      = getEmployeeByRole(c, 'cfo');
  const cto      = getEmployeeByRole(c, 'cto');
  const ciso     = getEmployeeByRole(c, 'ciso');
  const ops      = getEmployeeByRole(c, 'ops');

  const mgrName  = getFullName(manager);
  const tlName   = getFullName(techLead);
  const secName  = getFullName(security);
  const cfoName  = getFullName(cfo);
  const ctoName  = getFullName(cto);
  const cisoName = getFullName(ciso);

  const project = c.projects[0];

  return [

    // ── Scenario 1: Project Kickoff ──────────────────────────────────────────
    {
      subject: `Project Kickoff: ${c.companyName} ${project.name} — Phase 1`,
      label: `Projects/${project.nameShort}`,
      messages: [
        {
          from: `${mgrName} <${manager.email}>`,
          to: `it-team@${c.domain}`,
          cc: `${cto.email}`,
          body: buildEmailBody({
            senderName: mgrName,
            greeting: 'Hi team,',
            paragraphs: [
              `I'm excited to officially kick off Phase 1 of the ${project.name}.`,
              `This first phase focuses on migrating our core infrastructure and enabling the data platform for our 2026–2027 analytics roadmap.`,
              `Key dates:<br>• Kickoff workshop: <strong>${formatDemoDate(getDemoDate(c, 3), 'long')}</strong><br>• Architecture review: ${formatDemoDate(getDemoDate(c, 14), 'long')}<br>• Phase 1 go-live: ${formatDemoDate(getDemoDate(c, 84), 'long')}`,
              `Please review the attached project charter before the workshop. I've shared it in the Project Team Chat space.`,
            ],
            closing: mgrName,
            closingTitle: `Head of IT, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -5),
        },
        {
          from: `${tlName} <${techLead.email}>`,
          to: `${manager.email}`,
          body: buildEmailBody({
            senderName: tlName,
            greeting: `Hi ${manager.firstName},`,
            paragraphs: [
              `Thanks for the update. I've reviewed the charter and have a few questions about the network topology assumptions in section 3.2.`,
              `Can we add 30 minutes to the kickoff workshop agenda to walk through the connectivity design? I want to make sure we're aligned before we finalise the IP addressing scheme.`,
              `Also — should we loop in the security team for the architecture review, or is that a separate stream?`,
            ],
            closing: tlName,
            closingTitle: `Senior Infrastructure Engineer, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -4),
        },
        {
          from: `${mgrName} <${manager.email}>`,
          to: `${techLead.email}`,
          body: buildEmailBody({
            senderName: mgrName,
            greeting: `${manager.firstName},`,
            paragraphs: [
              `Good catch. Yes — let's add 30 minutes for network topology. I'll update the agenda.`,
              `Security review will run in parallel — ${cisoName} will join from week 3 onward. I'll add them to the project space.`,
              `See everyone at the workshop.`,
            ],
            closing: mgrName,
            closingTitle: `Head of IT, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -4),
        },
      ],
    },

    // ── Scenario 2: Security Audit Results ──────────────────────────────────
    {
      subject: `ACTION REQUIRED: Q1 Security Audit Findings — ${c.companyName} IT`,
      label: 'Security/Audits',
      messages: [
        {
          from: `Security Operations <security@${c.domain}>`,
          to: `${manager.email}`,
          cc: `${ciso.email}`,
          body: buildEmailBody({
            senderName: 'Security Operations Team',
            greeting: `Hi ${manager.firstName},`,
            paragraphs: [
              `Please find attached the Q1 2026 Security Audit report for the IT environment.`,
              `<strong>Summary of findings:</strong><br><span style="color:#cc0000">🔴 Critical (2):</span> Must be remediated within 14 days<br>• CVE-2026-0391: Unpatched OS on 3 production hosts<br>• Excessive IAM permissions on service accounts (15 accounts)<br><br><span style="color:#856404">🟡 High (5):</span> Remediation within 30 days — see attached report`,
              `Please acknowledge receipt and provide a remediation plan within 5 business days.`,
            ],
            closing: 'Security Operations Team',
            closingTitle: c.companyName,
            brandColor: '#CC0000',
          }),
          sentDate: getDemoDate(c, -7),
        },
        {
          from: `${mgrName} <${manager.email}>`,
          to: `security@${c.domain}`,
          body: buildEmailBody({
            senderName: mgrName,
            greeting: 'Acknowledged. I\'ve briefed the team.',
            paragraphs: [
              `For the two critical findings:<br>• CVE-2026-0391: Patch window scheduled this Saturday 02:00–05:00. Change request submitted.<br>• IAM permissions: ${tlName} is auditing all service accounts today. We expect excess permissions revoked by EOD Friday.`,
              `I'll send the full remediation plan by ${formatDemoDate(getDemoDate(c, -4), 'long')}.`,
            ],
            closing: mgrName,
            closingTitle: `Head of IT, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -7),
        },
      ],
    },

    // ── Scenario 3: Budget Approval ──────────────────────────────────────────
    {
      subject: `APPROVAL NEEDED: Q2 2026 Infrastructure Budget — IT`,
      label: 'Finance/Budget-Approvals',
      messages: [
        {
          from: `${mgrName} <${manager.email}>`,
          to: `${cfo.email}`,
          cc: `${cto.email}`,
          body: buildEmailBody({
            senderName: mgrName,
            greeting: `Hi ${cfo.firstName},`,
            paragraphs: [
              `Please find attached the Q2 2026 budget request for IT infrastructure.`,
              `<strong>Summary:</strong><br>• Requested amount: €480,000<br>• Primary items: Cloud infrastructure (70%), security tooling (20%), training (10%)<br>• Business case: Projected 3-year ROI of 180%`,
              `This is time-sensitive. We need approval by ${formatDemoDate(getDemoDate(c, 5), 'long')} to qualify for committed-use discount pricing.`,
            ],
            closing: mgrName,
            closingTitle: `Head of IT, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -3),
        },
        {
          from: `${cfoName} <${cfo.email}>`,
          to: `${manager.email}`,
          body: buildEmailBody({
            senderName: cfoName,
            greeting: `${manager.firstName},`,
            paragraphs: [
              `I've reviewed the business case. A few questions before I can approve:`,
              `1. The €480K in year 1 includes migration costs — is that all one-time, or does any recur?<br>2. The ROI assumes 40% infrastructure cost reduction — what's the reference for that?<br>3. Do we have a fallback if the committed-use discount window passes?`,
              `Please address these and resubmit by ${formatDemoDate(getDemoDate(c, 2), 'long')}.`,
            ],
            closing: cfoName,
            closingTitle: `CFO, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -2),
        },
      ],
    },

    // ── Scenario 4: Onboarding Welcome ──────────────────────────────────────
    {
      subject: `Welcome to ${c.companyName}! Your First Week Guide`,
      label: 'HR/Onboarding',
      messages: [
        {
          from: `HR Team <hr@${c.domain}>`,
          to: `new.hire@${c.domain}`,
          body: buildEmailBody({
            senderName: 'HR Team',
            greeting: 'Welcome to the team!',
            paragraphs: [
              `We're thrilled to have you joining the IT team.`,
              `<strong>Day 1 schedule:</strong><br>• 09:00 — Office arrival / IT setup<br>• 10:30 — Welcome coffee with ${mgrName}<br>• 14:00 — Company overview (Google Meet link in your calendar)`,
              `<strong>Before Day 1:</strong><br>☐ Complete security training (link in Drive folder — 45 min)<br>☐ Set up Google Authenticator for 2FA<br>☐ Review the Employee Handbook`,
              `We're really glad you're here!`,
            ],
            closing: 'People Operations',
            closingTitle: c.companyName,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -10),
        },
      ],
    },

    // ── Scenario 5: Quarterly Report ─────────────────────────────────────────
    {
      subject: `${c.companyName} IT — Q1 2026 Quarterly Report`,
      label: 'Reports/Quarterly',
      messages: [
        {
          from: `${mgrName} <${manager.email}>`,
          to: `cxo-group@${c.domain}`,
          body: buildEmailBody({
            senderName: mgrName,
            greeting: 'Leadership team,',
            paragraphs: [
              `Please find attached the IT Q1 2026 Quarterly Report.`,
              `<strong>Executive summary:</strong><br>✅ SLA compliance: 99.7% (target: 99.5%)<br>✅ Infrastructure cost per transaction: €0.0023 (−12% vs Q4 2025)<br>✅ Incidents: 3 P2, 0 P1 (vs 1 P1, 5 P2 in Q4 2025)`,
              `<strong>Q2 priorities:</strong><br>1. Complete Phase 2 migration by ${formatDemoDate(getDemoDate(c, 60), 'long')}<br>2. Achieve security score target ahead of NIS2 audit<br>3. Launch internal developer portal`,
              `Full report in the attached Google Slides.`,
            ],
            closing: mgrName,
            closingTitle: `Head of IT, ${c.companyName}`,
            brandColor: c.brandColor,
          }),
          sentDate: getDemoDate(c, -1),
        },
      ],
    },

  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// EMAIL THREAD CREATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a single email thread from a scenario definition.
 * First message is sent fresh; subsequent messages are sent as replies.
 *
 * @param {Object} config
 * @param {Object} state
 * @param {Object} scenario
 */
function createEmailThread(config, state, scenario) {
  let threadId = null;

  scenario.messages.forEach((msg, index) => {
    const options = {
      htmlBody: msg.body,
      name: extractDisplayName(msg.from),
    };

    if (msg.cc) options.cc = msg.cc;
    if (msg.bcc) options.bcc = msg.bcc;

    // For replies, include In-Reply-To header to form a thread
    // Note: GmailApp.sendEmail doesn't support raw headers, so we use
    // the subject threading (Gmail threads by subject by default)
    const subject = index === 0
      ? scenario.subject
      : `Re: ${scenario.subject}`;

    GmailApp.sendEmail(msg.to, subject, '', options);
  });

  // Apply label to the thread
  if (scenario.label) {
    applyLabelToThread(scenario.subject, scenario.label);
  }
}

/**
 * Applies a Gmail label to the most recent thread matching a subject.
 *
 * @param {string} subject - Subject line to search for
 * @param {string} labelPath - Label path, e.g. 'Projects/DT Initiative'
 */
function applyLabelToThread(subject, labelPath) {
  Utilities.sleep(1500); // Allow message to index

  const label = GmailApp.getUserLabelByName(labelPath);
  if (!label) {
    Logger.log(`Label not found: ${labelPath} — skipping label apply`);
    return;
  }

  const threads = GmailApp.search(`subject:"${subject}" in:sent`, 0, 1);
  if (threads.length > 0) {
    label.addToThread(threads[0]);
  }
}

/**
 * Extracts the display name from a "Name <email>" formatted string.
 * Returns the full string if not in that format.
 *
 * @param {string} from - e.g., "Anna Kowalski <anna@novatech.example>"
 * @returns {string} - e.g., "Anna Kowalski"
 */
function extractDisplayName(from) {
  const match = from.match(/^([^<]+)</);
  return match ? match[1].trim() : from;
}


// ─────────────────────────────────────────────────────────────────────────────
// HTML EMAIL TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds a branded HTML email body.
 *
 * @param {Object} opts
 * @param {string} opts.senderName
 * @param {string} opts.greeting
 * @param {string[]} opts.paragraphs
 * @param {string} opts.closing
 * @param {string} opts.closingTitle
 * @param {string} opts.brandColor - Hex color for accent bar
 * @returns {string} HTML string
 */
function buildEmailBody(opts) {
  const paragraphHtml = opts.paragraphs
    .map(p => `<p style="margin:0 0 12px 0; line-height:1.5;">${p}</p>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Google Sans, Arial, sans-serif; font-size: 14px; color: #202124; margin:0; padding:0; background:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px; margin:0 auto;">
    <tr>
      <td style="border-top: 4px solid ${opts.brandColor}; padding: 24px 32px 16px 32px;">
        <p style="margin:0 0 16px 0; font-size:14px; color:#5f6368;">${opts.greeting}</p>
        ${paragraphHtml}
        <p style="margin:24px 0 4px 0; color:#202124;">${opts.closing}</p>
        <p style="margin:0; color:#5f6368; font-size:12px;">${opts.closingTitle}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 12px 32px; border-top: 1px solid #e8eaed;">
        <p style="margin:0; font-size:11px; color:#9aa0a6;">
          This email was sent from a Google Workspace demo environment.
          All content is fictional and for demonstration purposes only.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}


// ─────────────────────────────────────────────────────────────────────────────
// LABEL MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all Gmail labels defined in config.gmailLabels.
 * Creates parent labels before child labels.
 * Skips labels that already exist.
 *
 * @param {Object} config
 * @param {Object} state
 */
function createGmailLabels(config, state) {
  const labelsToCreate = config.gmailLabels || [];

  // Sort so parent paths are created before children
  labelsToCreate.sort((a, b) => a.split('/').length - b.split('/').length);

  labelsToCreate.forEach(labelPath => {
    try {
      const existing = GmailApp.getUserLabelByName(labelPath);
      if (existing) {
        log(state, 'INFO', `Gmail Labels: Already exists — "${labelPath}"`);
        state.manifest.gmailLabelIds.push(labelPath);
        return;
      }

      GmailApp.createLabel(labelPath);
      state.manifest.gmailLabelIds.push(labelPath);
      log(state, 'INFO', `Gmail Labels: Created — "${labelPath}"`);
      Utilities.sleep(100);
    } catch (err) {
      log(state, 'WARN', `Gmail Labels: Could not create "${labelPath}": ${err.message}`);
    }
  });

  persistState(state);
}
