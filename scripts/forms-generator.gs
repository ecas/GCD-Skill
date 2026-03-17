/**
 * forms-generator.gs
 * Creates Google Forms with various field types for demo environments.
 *
 * Demonstrates: multiple choice, scale ratings, text, checkboxes, date,
 * section headers, and required/optional field patterns.
 *
 * Called by orchestrator.gs. Can also be run standalone.
 */


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo Google Forms for a customer config.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function createForms(config, state) {
  const forms = buildFormDefinitions(config);
  log(state, 'INFO', `Forms: Creating ${forms.length} forms`);

  forms.forEach((formDef, index) => {
    try {
      log(state, 'INFO', `Forms: ${index + 1}/${forms.length} — "${formDef.title}"`);
      const form = buildForm(config, formDef, state);
      if (form) {
        state.manifest.driveFileIds.push(form.getId());
        if (formDef.targetFolder) {
          moveFileToFolder(
            DriveApp.getFileById(form.getId()),
            formDef.targetFolder,
            state
          );
        }
      }
      Utilities.sleep(300);
    } catch (err) {
      log(state, 'ERROR', `Forms: Failed "${formDef.title}": ${err.message}`);
    }
  });

  persistState(state);
}


// ─────────────────────────────────────────────────────────────────────────────
// FORM DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all form definitions for the customer config.
 *
 * @param {Object} config
 * @returns {Object[]}
 */
function buildFormDefinitions(config) {
  const c = config;

  return [

    // ── Employee Engagement Survey ──────────────────────────────────────────
    {
      title: `${c.companyName} Employee Engagement Survey — Q2 2026`,
      description: `This survey takes approximately 8 minutes to complete. Your responses are anonymous.\n` +
                   `Results will be shared with the leadership team and all staff within 3 weeks.`,
      targetFolder: 'HR',
      items: [
        {
          type: 'section_header',
          title: 'Overall Experience',
          description: 'Questions about your overall experience at ' + c.companyName,
        },
        {
          type: 'scale',
          title: 'Overall, how satisfied are you working at ' + c.companyName + '?',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Very dissatisfied',
          scaleMaxLabel: 'Very satisfied',
        },
        {
          type: 'multiple_choice',
          title: 'How likely are you to recommend ' + c.companyName + ' as a great place to work?',
          required: true,
          choices: [
            'Very likely',
            'Likely',
            'Neutral',
            'Unlikely',
            'Very unlikely',
          ],
        },
        {
          type: 'section_header',
          title: 'Your Work',
          description: 'Questions about your day-to-day work experience',
        },
        {
          type: 'scale',
          title: 'I have the tools and technology I need to do my job effectively.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'scale',
          title: 'I understand how my work contributes to the company\'s goals.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'scale',
          title: 'I have the opportunity to do what I do best every day.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'section_header',
          title: 'Team & Culture',
        },
        {
          type: 'scale',
          title: 'My team collaborates effectively across departments.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'scale',
          title: 'I feel my ideas and contributions are valued.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'checkboxes',
          title: 'Which of the following best describes your current working arrangement?',
          required: true,
          choices: [
            'Fully office-based (5 days/week)',
            'Hybrid (2–3 days in office)',
            'Mostly remote (1 day or less in office)',
            'Fully remote',
          ],
        },
        {
          type: 'section_header',
          title: 'Open Feedback',
        },
        {
          type: 'paragraph',
          title: 'What is the one thing we could do to make ' + c.companyName + ' an even better place to work?',
          required: false,
        },
        {
          type: 'paragraph',
          title: 'Is there anything else you would like to share with leadership?',
          required: false,
        },
      ],
      confirmationMessage: 'Thank you for your feedback! Results will be shared company-wide within 3 weeks.',
    },

    // ── IT Onboarding Checklist Form ─────────────────────────────────────────
    {
      title: `New Employee IT Onboarding — Completion Form`,
      description: `Please complete this form once you have finished your IT onboarding checklist.\n` +
                   `This form helps IT track your setup progress and ensure nothing was missed.`,
      targetFolder: 'HR',
      items: [
        {
          type: 'text',
          title: 'Your name',
          required: true,
        },
        {
          type: 'text',
          title: 'Your Google Workspace email address',
          required: true,
        },
        {
          type: 'date',
          title: 'Your first day at ' + c.companyName,
          required: true,
        },
        {
          type: 'section_header',
          title: 'Account Setup',
          description: 'Confirm completion of each item',
        },
        {
          type: 'checkboxes',
          title: 'Which of the following have you completed? (Select all that apply)',
          required: true,
          choices: [
            'Signed in to Google Workspace account',
            'Set up 2-factor authentication (Google Authenticator or hardware key)',
            'Completed mandatory security training',
            'Joined team Chat spaces',
            'Reviewed Employee Handbook',
            'Set up Google Meet (camera and microphone tested)',
          ],
        },
        {
          type: 'section_header',
          title: 'Access & Tools',
        },
        {
          type: 'multiple_choice',
          title: 'Do you have access to all tools required for your role?',
          required: true,
          choices: [
            'Yes — all tools working',
            'Mostly — a few items pending',
            'No — I\'m missing key tools',
          ],
        },
        {
          type: 'paragraph',
          title: 'If you are missing any tools or access, please describe what is needed:',
          required: false,
        },
        {
          type: 'section_header',
          title: 'Feedback',
        },
        {
          type: 'scale',
          title: 'How smooth was your IT onboarding experience?',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Very difficult',
          scaleMaxLabel: 'Very smooth',
        },
        {
          type: 'paragraph',
          title: 'Any suggestions for improving the IT onboarding process?',
          required: false,
        },
      ],
      confirmationMessage: 'Thank you! IT will review your submission and follow up within 1 business day if any items are outstanding.',
    },

    // ── Post-Training Feedback Form ──────────────────────────────────────────
    {
      title: `Google Workspace Training — Feedback Form`,
      description: `Please take 3 minutes to give us feedback on the Google Workspace training session you attended.\n` +
                   `Your input directly shapes future sessions.`,
      targetFolder: 'HR',
      items: [
        {
          type: 'multiple_choice',
          title: 'Which training session did you attend?',
          required: true,
          choices: [
            'Session A — Morning',
            'Session B — Afternoon',
            'Session C — Polish language session',
          ],
        },
        {
          type: 'scale',
          title: 'Overall, how would you rate this training session?',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Very poor',
          scaleMaxLabel: 'Excellent',
        },
        {
          type: 'scale',
          title: 'The training was relevant to my day-to-day work.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Strongly disagree',
          scaleMaxLabel: 'Strongly agree',
        },
        {
          type: 'scale',
          title: 'I will use what I learned in this session.',
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleMinLabel: 'Very unlikely',
          scaleMaxLabel: 'Definitely',
        },
        {
          type: 'checkboxes',
          title: 'Which features are you most likely to use after this training? (Select all that apply)',
          required: true,
          choices: [
            'Gemini drafting in Gmail',
            'Gmail labels and filters',
            'Google Docs real-time collaboration',
            'Gemini writing assist in Docs',
            'Google Sheets formula generation with Gemini',
            'Google Meet transcription and summaries',
            'Google Chat spaces for project work',
            'Google Calendar smart scheduling',
          ],
        },
        {
          type: 'paragraph',
          title: 'What topic would you like covered in the next training session?',
          required: false,
        },
        {
          type: 'paragraph',
          title: 'Any other feedback for the trainer?',
          required: false,
        },
      ],
      confirmationMessage: 'Thank you for your feedback! We review all responses after each session.',
    },

  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// FORM BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a Google Form from a definition object.
 *
 * @param {Object} config
 * @param {Object} formDef
 * @param {Object} state
 * @returns {Form} Created Google Form
 */
function buildForm(config, formDef, state) {
  const form = FormApp.create(formDef.title);

  form.setDescription(formDef.description || '');
  form.setCollectEmail(true);
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage(formDef.confirmationMessage || 'Thank you for your response.');

  formDef.items.forEach(itemDef => {
    try {
      addFormItem(form, itemDef);
    } catch (err) {
      log(state, 'WARN', `Forms: Could not add item "${itemDef.title}": ${err.message}`);
    }
  });

  log(state, 'INFO', `Forms: Created — "${formDef.title}" (${form.getId()})`);
  log(state, 'INFO', `Forms: Published URL — ${form.getPublishedUrl()}`);

  return form;
}

/**
 * Adds a single item to a Google Form based on its type.
 *
 * @param {Form} form
 * @param {Object} itemDef - {type, title, required, choices, scaleMin, scaleMax, ...}
 */
function addFormItem(form, itemDef) {
  switch (itemDef.type) {

    case 'section_header':
      const pageBreak = form.addPageBreakItem();
      pageBreak.setTitle(itemDef.title);
      if (itemDef.description) pageBreak.setHelpText(itemDef.description);
      break;

    case 'text':
      const textItem = form.addTextItem();
      textItem.setTitle(itemDef.title);
      textItem.setRequired(!!itemDef.required);
      break;

    case 'paragraph':
      const paraItem = form.addParagraphTextItem();
      paraItem.setTitle(itemDef.title);
      paraItem.setRequired(!!itemDef.required);
      break;

    case 'multiple_choice':
      const mcItem = form.addMultipleChoiceItem();
      mcItem.setTitle(itemDef.title);
      mcItem.setRequired(!!itemDef.required);
      if (itemDef.choices) {
        mcItem.setChoiceValues(itemDef.choices);
      }
      break;

    case 'checkboxes':
      const cbItem = form.addCheckboxItem();
      cbItem.setTitle(itemDef.title);
      cbItem.setRequired(!!itemDef.required);
      if (itemDef.choices) {
        cbItem.setChoiceValues(itemDef.choices);
      }
      break;

    case 'scale':
      const scaleItem = form.addScaleItem();
      scaleItem.setTitle(itemDef.title);
      scaleItem.setRequired(!!itemDef.required);
      scaleItem.setBounds(
        itemDef.scaleMin || 1,
        itemDef.scaleMax || 5
      );
      if (itemDef.scaleMinLabel) scaleItem.setLabels(itemDef.scaleMinLabel, itemDef.scaleMaxLabel || '');
      break;

    case 'date':
      const dateItem = form.addDateItem();
      dateItem.setTitle(itemDef.title);
      dateItem.setRequired(!!itemDef.required);
      break;

    case 'time':
      const timeItem = form.addTimeItem();
      timeItem.setTitle(itemDef.title);
      timeItem.setRequired(!!itemDef.required);
      break;

    case 'dropdown':
      const ddItem = form.addListItem();
      ddItem.setTitle(itemDef.title);
      ddItem.setRequired(!!itemDef.required);
      if (itemDef.choices) {
        ddItem.setChoiceValues(itemDef.choices);
      }
      break;

    default:
      Logger.log(`Forms: Unknown item type "${itemDef.type}" — skipping`);
  }
}
