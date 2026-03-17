/**
 * calendar-populator.gs
 * Creates calendar events with attendees, Google Meet links, and color coding.
 *
 * Called by orchestrator.gs as part of the provisioning pipeline.
 * Can also be run standalone: createCalendarEvents(getConfig('novatech'), state)
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo calendar events for a customer config.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function createCalendarEvents(config, state) {
  const events = buildCalendarEvents(config);
  log(state, 'INFO', `Calendar: Creating ${events.length} events`);

  const calendar = CalendarApp.getDefaultCalendar();

  events.forEach((eventDef, index) => {
    try {
      log(state, 'INFO', `Calendar: Event ${index + 1}/${events.length} — "${eventDef.title}"`);
      const eventId = createEvent(calendar, config, eventDef);
      if (eventId) {
        state.manifest.calendarEventIds.push(eventId);
      }
      Utilities.sleep(200);
    } catch (err) {
      log(state, 'ERROR', `Calendar: Failed on "${eventDef.title}": ${err.message}`);
    }
  });

  persistState(state);
  log(state, 'INFO', `Calendar: Created ${state.manifest.calendarEventIds.length} events`);
}


// ─────────────────────────────────────────────────────────────────────────────
// EVENT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds the full list of calendar event definitions for the given config.
 *
 * @param {Object} config
 * @returns {Object[]} Array of event definition objects
 */
function buildCalendarEvents(config) {
  const c = config;

  const manager  = getEmployeeByRole(c, 'manager');
  const techLead = getEmployeeByRole(c, 'tech_lead');
  const security = getEmployeeByRole(c, 'security');
  const cfo      = getEmployeeByRole(c, 'cfo');
  const cto      = getEmployeeByRole(c, 'cto');
  const ciso     = getEmployeeByRole(c, 'ciso');
  const ceo      = getEmployeeByRole(c, 'ceo');
  const devops   = getEmployeeByRole(c, 'devops');

  const project = c.projects[0];

  return [

    // ── All-Hands Meeting ────────────────────────────────────────────────────
    {
      title: `${c.companyName} All-Hands — ${getMonthYear(getDemoDate(c, 14))}`,
      start: setTime(getDemoDate(c, 25), 14, 0),  // Last Thursday of the month, 14:00
      end:   setTime(getDemoDate(c, 25), 15, 0),
      color: CalendarApp.EventColor.RED,
      allDay: false,
      guests: [
        manager.email, techLead.email, cfo.email, cto.email, ceo.email,
        security.email, devops.email,
      ],
      location: 'Google Meet + HQ Main Conference Room',
      description: buildEventDescription({
        title: `${c.companyName} Monthly All-Hands`,
        agenda: [
          'CEO update — company performance & priorities (15 min)',
          'Department highlights (20 min)',
          'Customer spotlight / wins (10 min)',
          'Open Q&A (15 min)',
        ],
        links: [
          { label: 'Slides', url: 'https://slides.google.com/' },
          { label: 'Submit questions', url: 'https://forms.google.com/' },
        ],
        notes: 'Please join 2 minutes early to minimize late starts. This meeting will be recorded.',
      }),
      conferenceData: true,
    },

    // ── Weekly 1:1: Manager / Tech Lead ──────────────────────────────────────
    {
      title: `1:1 — ${manager.firstName} / ${techLead.firstName}`,
      start: setTime(getDemoDate(c, 1), 10, 0),  // Next Tuesday
      end:   setTime(getDemoDate(c, 1), 10, 30),
      color: CalendarApp.EventColor.CYAN,
      allDay: false,
      guests: [manager.email, techLead.email],
      location: 'Google Meet',
      description: buildEventDescription({
        title: `Weekly 1:1 — ${manager.firstName} + ${techLead.firstName}`,
        agenda: [
          'What I\'m focused on this week',
          'Blockers I need help with',
          'Career / development topics',
          'Feedback in both directions',
        ],
        notes: 'Running notes doc linked below. Please add agenda items before the meeting. Cancel if you have nothing.',
        links: [
          { label: 'Running notes', url: 'https://docs.google.com/' },
        ],
      }),
      recurrence: 'WEEKLY',
      conferenceData: true,
    },

    // ── Project Kickoff ──────────────────────────────────────────────────────
    {
      title: `Kickoff: ${project.name} — Phase 1`,
      start: setTime(getDemoDate(c, 3), 9, 0),
      end:   setTime(getDemoDate(c, 3), 10, 30),
      color: CalendarApp.EventColor.GREEN,
      allDay: false,
      guests: [
        manager.email, techLead.email, cto.email, security.email,
      ],
      location: 'Google Meet + Meeting Room A',
      description: buildEventDescription({
        title: `Project Kickoff: ${project.name}`,
        agenda: [
          'Welcome & introductions (10 min)',
          'Project overview & charter walkthrough (20 min)',
          'Roles, responsibilities & RACI matrix (15 min)',
          'Technical architecture overview (20 min)',
          'Timeline & milestones (15 min)',
          'Risk register walkthrough (10 min)',
          'Open questions & next steps (15 min)',
        ],
        links: [
          { label: 'Project Charter', url: 'https://docs.google.com/' },
          { label: 'Architecture Overview', url: 'https://slides.google.com/' },
        ],
        notes: `Pre-reading required. Post-meeting: action items captured in the project Chat space.`,
      }),
      conferenceData: true,
    },

    // ── Security Review Board ────────────────────────────────────────────────
    {
      title: `Security Review — ${project.name} Architecture Sign-Off`,
      start: setTime(getDemoDate(c, 14), 11, 0),
      end:   setTime(getDemoDate(c, 14), 12, 0),
      color: CalendarApp.EventColor.RED,
      allDay: false,
      guests: [ciso.email, security.email, techLead.email, manager.email],
      location: 'Google Meet',
      description: buildEventDescription({
        title: `Security Architecture Review: ${project.name}`,
        agenda: [
          'Architecture overview (10 min)',
          'Threat model walkthrough (15 min)',
          'IAM & access control design (10 min)',
          'Data classification & handling (10 min)',
          'Compliance mapping (10 min)',
          'Approval decision (5 min)',
        ],
        links: [
          { label: 'Security Architecture Doc', url: 'https://docs.google.com/' },
          { label: 'Compliance Matrix', url: 'https://sheets.google.com/' },
        ],
        notes: 'Pre-reading mandatory. Outcome: Approved / Conditionally approved / Rejected.',
      }),
      conferenceData: true,
    },

    // ── External Customer QBR ────────────────────────────────────────────────
    {
      title: `${c.companyName} × Partner QBR — Q1 2026`,
      start: setTime(getDemoDate(c, 7), 14, 0),
      end:   setTime(getDemoDate(c, 7), 15, 30),
      color: CalendarApp.EventColor.PINK,
      allDay: false,
      guests: [manager.email, cto.email],
      location: 'Google Meet',
      description: buildEventDescription({
        title: `Quarterly Business Review — Q1 2026`,
        agenda: [
          'Welcome & introductions (5 min)',
          'Q1 performance review (20 min)',
          'Support & service feedback (15 min)',
          'Roadmap preview (20 min)',
          'Joint priorities for Q2 (20 min)',
          'AOB & close (10 min)',
        ],
        links: [
          { label: 'QBR Deck', url: 'https://slides.google.com/' },
        ],
        notes: 'Internal prep call 30 min before. Recording offered — customer confirmation required.',
      }),
      conferenceData: true,
    },

    // ── Training: Google Workspace Essentials ─────────────────────────────────
    {
      title: `Training: Google Workspace Essentials — Cohort 1`,
      start: setTime(getDemoDate(c, 8), 10, 0),
      end:   setTime(getDemoDate(c, 8), 11, 30),
      color: CalendarApp.EventColor.YELLOW,
      allDay: false,
      guests: [
        manager.email, devops.email, security.email,
      ],
      location: 'Google Meet',
      description: buildEventDescription({
        title: 'Google Workspace Essentials Training — Cohort 1 of 3',
        agenda: [
          'Gmail: Labels, filters, Gemini drafting',
          'Google Drive: Sharing, version history',
          'Google Docs: Collaboration, suggestions',
          'Google Meet: Controls, recording, transcription',
          'Google Chat: Spaces, threads, huddles',
        ],
        notes: 'Interactive session. Bring your real use cases. Recording posted to #workspace-training.',
      }),
      conferenceData: true,
    },

    // ── Quarterly Business Review (Internal) ─────────────────────────────────
    {
      title: `IT QBR — Q1 2026`,
      start: setTime(getDemoDate(c, 10), 9, 0),
      end:   setTime(getDemoDate(c, 10), 11, 0),
      color: CalendarApp.EventColor.MAUVE,
      allDay: false,
      guests: [manager.email, cto.email, cfo.email, ceo.email],
      location: 'Google Meet + Boardroom',
      description: buildEventDescription({
        title: 'IT Quarterly Business Review — Q1 2026',
        agenda: [
          'Presentation: KPI review, budget, highlights (60 min)',
          'Q&A and discussion (30 min)',
          'Priority-setting for Q2 (30 min)',
        ],
        links: [
          { label: 'QBR Report', url: 'https://docs.google.com/' },
          { label: 'KPI Dashboard', url: 'https://lookerstudio.google.com/' },
        ],
        notes: 'Pre-read mandatory. Come ready to discuss and decide — slides will not be re-read in the room.',
      }),
      conferenceData: true,
    },

    // ── Daily Standup ────────────────────────────────────────────────────────
    {
      title: `IT Infrastructure Team — Daily Standup`,
      start: setTime(getDemoDate(c, 0), 9, 30),
      end:   setTime(getDemoDate(c, 0), 9, 45),
      color: CalendarApp.EventColor.SAGE,
      allDay: false,
      guests: [
        manager.email, techLead.email, devops.email, security.email,
      ],
      location: 'Google Meet (standing link)',
      description: buildEventDescription({
        title: `IT Infrastructure Daily Standup`,
        agenda: [
          'What did I complete yesterday?',
          'What am I working on today?',
          'Any blockers?',
        ],
        notes: 'Start on time. Blockers raised here; solutions discussed outside standup. Post async in #ops-it-standup if OOO.',
      }),
      recurrence: 'WEEKLY_MON_TO_FRI',
      conferenceData: true,
    },

    // ── Budget Review ────────────────────────────────────────────────────────
    {
      title: `IT Budget Review — Q2 2026 Final Sign-Off`,
      start: setTime(getDemoDate(c, 5), 15, 0),
      end:   setTime(getDemoDate(c, 5), 16, 0),
      color: CalendarApp.EventColor.GRAPHITE,
      allDay: false,
      guests: [cfo.email, manager.email, ceo.email],
      location: 'Google Meet + Finance Meeting Room',
      description: buildEventDescription({
        title: `2026 Budget Review: IT Department — Final Sign-Off`,
        agenda: [
          'Budget summary — IT Head (10 min)',
          'CFO questions & challenges (20 min)',
          'Sensitivity & scenario analysis (10 min)',
          'Approval decision (10 min)',
          'Communication plan (10 min)',
        ],
        links: [
          { label: 'Budget Proposal', url: 'https://docs.google.com/' },
          { label: 'Financial Model', url: 'https://sheets.google.com/' },
        ],
        notes: `Materials distributed 48 hours before. Approval authority: CFO up to €200K; CFO + CEO above.`,
      }),
      conferenceData: true,
    },

    // ── Customer Interview / Discovery ───────────────────────────────────────
    {
      title: `Discovery Call — Prospect Co — ${manager.firstName}`,
      start: setTime(getDemoDate(c, 2), 13, 0),
      end:   setTime(getDemoDate(c, 2), 13, 45),
      color: CalendarApp.EventColor.ORANGE,
      allDay: false,
      guests: [manager.email, cto.email],
      location: 'Google Meet',
      description: buildEventDescription({
        title: 'Discovery Call: Prospect Co',
        agenda: [
          'Current environment and priorities (15 min)',
          'Top technology pain points (15 min)',
          'Qualify fit and agree next step (15 min)',
        ],
        notes: 'Update CRM opportunity after the call. Next step options: Technical deep-dive / POC / no fit.',
      }),
      conferenceData: true,
    },

  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// EVENT CREATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a single calendar event.
 *
 * @param {CalendarApp.Calendar} calendar
 * @param {Object} config
 * @param {Object} eventDef
 * @returns {string} Event ID
 */
function createEvent(calendar, config, eventDef) {
  const options = {
    description: eventDef.description || '',
    location: eventDef.location || 'Google Meet',
    guests: (eventDef.guests || []).join(','),
    sendInvites: false, // Demo: don't send real invites
  };

  let event;

  if (eventDef.allDay) {
    event = calendar.createAllDayEvent(eventDef.title, eventDef.start, options);
  } else {
    event = calendar.createEvent(
      eventDef.title,
      eventDef.start,
      eventDef.end,
      options
    );
  }

  // Set color
  if (eventDef.color) {
    event.setColor(eventDef.color);
  }

  // Add Google Meet conference data
  if (eventDef.conferenceData) {
    // Note: CalendarApp doesn't support adding Meet links directly via Apps Script.
    // The Calendar API (via UrlFetchApp) supports conferenceDataVersion=1.
    // For simplicity in demos, add Meet URL placeholder in description.
    event.setDescription(
      event.getDescription() +
      '\n\nGoogle Meet: https://meet.google.com/ (link generated on save)'
    );
  }

  return event.getId();
}


// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sets the time on a date object without mutating the original.
 *
 * @param {Date} date
 * @param {number} hours
 * @param {number} minutes
 * @returns {Date}
 */
function setTime(date, hours, minutes) {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

/**
 * Returns "Month YYYY" string from a date.
 * @param {Date} date
 * @returns {string}
 */
function getMonthYear(date) {
  return Utilities.formatDate(date, 'Europe/Warsaw', 'MMMM yyyy');
}

/**
 * Builds a formatted Google Calendar event description.
 *
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string[]} opts.agenda
 * @param {Object[]} [opts.links] - Array of {label, url}
 * @param {string} [opts.notes]
 * @returns {string}
 */
function buildEventDescription(opts) {
  let desc = `${opts.title}\n\n`;

  if (opts.agenda && opts.agenda.length > 0) {
    desc += 'Agenda:\n';
    opts.agenda.forEach((item, i) => {
      desc += `  ${i + 1}. ${item}\n`;
    });
    desc += '\n';
  }

  if (opts.links && opts.links.length > 0) {
    desc += 'Materials:\n';
    opts.links.forEach(link => {
      desc += `  • ${link.label}: ${link.url}\n`;
    });
    desc += '\n';
  }

  if (opts.notes) {
    desc += `Notes: ${opts.notes}\n`;
  }

  return desc;
}
