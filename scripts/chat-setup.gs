/**
 * chat-setup.gs
 * Creates Google Chat spaces via REST API and posts initial messages.
 *
 * Google Chat API requires OAuth 2.0 scopes for Chat spaces management.
 * This uses UrlFetchApp with the user's OAuth token from the Script context.
 *
 * Prerequisites:
 * - Enable Google Chat API in Google Cloud project
 * - Add Chat API scopes to appsscript.json
 * - Admin must have Chat API access enabled for the domain
 *
 * Called by orchestrator.gs. Can also be run standalone.
 */


// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CHAT_API_BASE = 'https://chat.googleapis.com/v1';


// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates all demo Chat spaces and seeds them with initial messages.
 *
 * @param {Object} config - Customer config from getConfig()
 * @param {Object} state  - Provisioning state from orchestrator
 */
function setupChatSpaces(config, state) {
  const spaces = config.chatSpaces || [];
  log(state, 'INFO', `Chat: Creating ${spaces.length} spaces`);

  spaces.forEach((spaceDef, index) => {
    try {
      log(state, 'INFO', `Chat: Space ${index + 1}/${spaces.length} — "${spaceDef.name}"`);
      const spaceName = createChatSpace(spaceDef, state);

      if (spaceName) {
        state.manifest.chatSpaceNames.push(spaceName);

        // Seed with initial messages
        const messages = buildSpaceMessages(config, spaceDef.name);
        if (messages.length > 0) {
          seedChatMessages(spaceName, messages, state);
        }
      }

      Utilities.sleep(1000); // Chat API rate limit — 1 request/second
    } catch (err) {
      log(state, 'ERROR', `Chat: Failed on space "${spaceDef.name}": ${err.message}`);
    }
  });

  persistState(state);
  log(state, 'INFO', `Chat: Created ${state.manifest.chatSpaceNames.length} spaces`);
}


// ─────────────────────────────────────────────────────────────────────────────
// SPACE CREATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a Google Chat space via the REST API.
 *
 * @param {Object} spaceDef - {name, description}
 * @param {Object} state
 * @returns {string|null} Space resource name (e.g., "spaces/XXXXXXXXX") or null on failure
 */
function createChatSpace(spaceDef, state) {
  const token = ScriptApp.getOAuthToken();

  const requestBody = {
    displayName: spaceDef.name,
    spaceType: 'SPACE',
    spaceDetails: {
      description: spaceDef.description || '',
      guidelines: 'Demo environment — all content is fictional.',
    },
    externalUserAllowed: false,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(`${CHAT_API_BASE}/spaces`, options);
  const responseCode = response.getResponseCode();
  const responseBody = JSON.parse(response.getContentText());

  if (responseCode === 200 || responseCode === 201) {
    log(state, 'INFO', `Chat: Created space "${spaceDef.name}" — ${responseBody.name}`);
    return responseBody.name;
  } else if (responseCode === 409) {
    // Space already exists — try to find it
    log(state, 'WARN', `Chat: Space "${spaceDef.name}" may already exist (409). Attempting lookup.`);
    return findExistingSpace(spaceDef.name, token, state);
  } else {
    log(state, 'ERROR', `Chat: API error ${responseCode} for space "${spaceDef.name}": ${JSON.stringify(responseBody)}`);
    return null;
  }
}

/**
 * Attempts to find an existing space by display name.
 *
 * @param {string} displayName
 * @param {string} token - OAuth token
 * @param {Object} state
 * @returns {string|null} Space resource name or null
 */
function findExistingSpace(displayName, token, state) {
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(`${CHAT_API_BASE}/spaces`, options);
  const body = JSON.parse(response.getContentText());

  if (body.spaces) {
    const found = body.spaces.find(s => s.displayName === displayName);
    if (found) {
      log(state, 'INFO', `Chat: Found existing space "${displayName}" — ${found.name}`);
      return found.name;
    }
  }

  log(state, 'WARN', `Chat: Could not find existing space "${displayName}"`);
  return null;
}


// ─────────────────────────────────────────────────────────────────────────────
// MESSAGE SEEDING
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Posts a series of messages to a Chat space.
 *
 * @param {string} spaceName - Space resource name (e.g., "spaces/XXXXXXXXX")
 * @param {Object[]} messages - Array of {text, sender} objects
 * @param {Object} state
 */
function seedChatMessages(spaceName, messages, state) {
  const token = ScriptApp.getOAuthToken();

  messages.forEach((msg, index) => {
    try {
      postChatMessage(spaceName, msg.text, token);
      log(state, 'INFO', `Chat: Posted message ${index + 1}/${messages.length} to ${spaceName}`);
      Utilities.sleep(500); // Rate limiting
    } catch (err) {
      log(state, 'WARN', `Chat: Failed to post message ${index + 1}: ${err.message}`);
    }
  });
}

/**
 * Posts a single message to a Chat space.
 *
 * @param {string} spaceName - Space resource name
 * @param {string} text - Message text (supports basic Chat markdown)
 * @param {string} token - OAuth token
 * @returns {Object|null} Created message object or null on failure
 */
function postChatMessage(spaceName, text, token) {
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    payload: JSON.stringify({
      text: text,
      formattedText: text,
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(
    `${CHAT_API_BASE}/${spaceName}/messages`,
    options
  );

  const responseCode = response.getResponseCode();
  if (responseCode === 200 || responseCode === 201) {
    return JSON.parse(response.getContentText());
  } else {
    Logger.log(`Chat message failed: ${responseCode} — ${response.getContentText()}`);
    return null;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// MESSAGE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns seeded messages for a given space name.
 *
 * @param {Object} config
 * @param {string} spaceName - The config space name (e.g., 'proj-dt-initiative')
 * @returns {Object[]} Array of {text} objects
 */
function buildSpaceMessages(config, spaceName) {
  const c = config;
  const manager  = getEmployeeByRole(c, 'manager');
  const techLead = getEmployeeByRole(c, 'tech_lead');
  const security = getEmployeeByRole(c, 'security');
  const project  = c.projects[0];

  const spaces = {
    'proj-dt-initiative': [
      {
        text: `*${getFullName(manager)}* — Good morning team. Quick status update before standup:\n\n` +
              `Phase 1 network setup is complete — Cloud Interconnect is live between Warsaw DC and europe-west1. Latency looking good at 4ms avg.\n\n` +
              `Today's focus:\n` +
              `• ${getFullName(techLead)} → GKE cluster provisioning\n` +
              `• ${getFullName(security)} → IAM baseline setup, service account audit\n\n` +
              `Blockers? Reply here or raise in standup at 09:30.`,
      },
      {
        text: `*${getFullName(techLead)}* — GKE cluster provisioning started. Autopilot mode, as per ADR-003.\n\n` +
              `One issue: the subnet CIDR we planned overlaps with the existing on-prem /18 block. ` +
              `Proposing we shift to 10.2.0.0/16 instead. @${manager.firstName} do you have the updated network diagram?`,
      },
      {
        text: `*${getFullName(manager)}* — Yes — updated diagram in the Drive folder. Good catch on the CIDR conflict. ` +
              `Using 10.2.0.0/16 is fine, align with the network team and update the diagram by EOD.`,
      },
      {
        text: `*${getFullName(security)}* — IAM audit complete. Found 23 service accounts with Owner role — legacy issue. ` +
              `I've created a remediation list in the tracker.\n\n` +
              `Proposing we use Workload Identity Federation for all new service accounts going forward. ADR worth writing?`,
      },
    ],

    'security-ops': [
      {
        text: `*Security Bot* 🔴 ALERT: Security Command Center — Critical Finding\n\n` +
              `*Finding:* Publicly exposed storage bucket\n` +
              `*Severity:* CRITICAL\n` +
              `*Rule:* PUBLIC_BUCKET_ACL\n\n` +
              `Auto-ticket created. Assigned to on-call security engineer.`,
      },
      {
        text: `*${getFullName(security)}* — On it. Investigating.`,
      },
      {
        text: `*${getFullName(security)}* — Root cause: bucket was created for a temp file transfer and ACL was not reset.\n\n` +
              `Actions taken:\n` +
              `1. Bucket ACL changed to private ✅\n` +
              `2. No external access logs in past 6 hours — no confirmed exfiltration\n` +
              `3. Developer notified\n\n` +
              `Closing as remediated. Adding to next security training as a case study.`,
      },
      {
        text: `*${getFullName(getEmployeeByRole(c, 'ciso'))}* — Good catch and fast response. ` +
              `Two process improvements for the weekly sync: (1) org policy to prevent public bucket creation by default, ` +
              `(2) documented procedure for temp file transfers.`,
      },
    ],

    'ops-it': [
      {
        text: `*Deployment Bot* ✅ DEPLOYMENT COMPLETE\n\n` +
              `*Service:* orders-api v2.4.1\n` +
              `*Environment:* Production (europe-west1)\n` +
              `*Status:* Healthy — 0 errors in first 5 minutes\n\n` +
              `Traffic: 100% on new version. Dashboard linked in Drive.`,
      },
      {
        text: `*${getFullName(techLead)}* — Monitoring the deployment. Response times normal — p50: 45ms, p99: 180ms. ` +
              `Memory slightly higher than previous version in first 10 min — likely JVM warmup. Will confirm stable in 30 min.`,
      },
      {
        text: `*${getFullName(techLead)}* — Memory stabilised at 68% — same as previous version after warmup. All green. Deployment watch closed.`,
      },
    ],

    'finance-it': [
      {
        text: `*Finance Bot* 📊 Monthly Cloud Cost Report — March 2026\n\n` +
              `Total spend: *€81,900* (Budget: €93,000 | Variance: -12%)\n\n` +
              `Top cost drivers:\n` +
              `1. GKE: €28,000 — 34% of total\n` +
              `2. Compute Engine: €21,000 — 26%\n` +
              `3. BigQuery: €14,200 — 17%\n\n` +
              `⚠️ BigQuery slot usage 40% above forecast — investigate before month end.`,
      },
      {
        text: `*${getFullName(manager)}* — Thanks for the report. @${techLead.firstName} — the BigQuery overage is likely from the new reporting dashboards. ` +
              `Can you check whether those queries are using reservations or on-demand slots?`,
      },
      {
        text: `*${getFullName(techLead)}* — Confirmed — dashboard queries are on on-demand. I'll migrate them to the reservation today. ` +
              `Rough estimate: will save ~€2,400/month going forward.`,
      },
    ],

    'random': [
      {
        text: `*${getFullName(getEmployeeByRole(c, 'devops'))}* — Good morning! Who's joining the coffee run at 10:00? ` +
              `Heading to that new place on Nowy Świat. They have proper espresso apparently.`,
      },
      {
        text: `*${getFullName(security)}* — Count me in! Flat white please.`,
      },
      {
        text: `*${getFullName(techLead)}* — Anyone else been using Gemini Code Assist this week? ` +
              `It just wrote an entire test suite for me while I was on a call. Genuinely impressed.`,
      },
      {
        text: `*${getFullName(manager)}* — 🎂 Today is Rafał's 2-year work anniversary! ` +
              `Thank you for everything you do. Celebrate at 17:00 in the kitchen!`,
      },
    ],
  };

  return spaces[spaceName] || [];
}
