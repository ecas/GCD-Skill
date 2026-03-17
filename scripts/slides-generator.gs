/**
 * slides-generator.gs
 * GCP Sales Enablement — Google Slides Generator
 *
 * Creates a branded Google Cloud pitch deck in your Drive.
 *
 * Standalone usage (copy-paste to script.google.com):
 *   1. Open https://script.google.com and create a new project.
 *   2. Paste this entire file.
 *   3. Edit DECK_CONFIG below with your customer details.
 *   4. Run createPitchDeck() from the Run menu.
 *   5. Find the presentation in your Google Drive root.
 *
 * Orchestrator usage:
 *   Called automatically by orchestrator.gs when a config is provisioned.
 *   Pass a standard customer config object to createSlides(config, state).
 *
 * Supported slide types:
 *   title | agenda | pain-points | solution-map | comparison-table |
 *   customer-proof | roi-snapshot | timeline | architecture |
 *   next-steps | section-divider | text
 */


// ─────────────────────────────────────────────────────────────────────────────
// DECK CONFIG — edit this block before running createPitchDeck()
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Edit DECK_CONFIG to customise the generated presentation.
 * Each entry in `slides` maps to a slide type with its own data shape.
 * Detailed field documentation is provided inline below.
 */
const DECK_CONFIG = {

  // ── Identity ────────────────────────────────────────────────────────────────
  companyName: 'NovaTech Logistics',
  industry:    'Transport & Logistics',
  presenter:   'Kacper Ptasinski',
  date:        '2026-03-24',
  language:    'en',   // reserved — future i18n support

  // ── Branding ────────────────────────────────────────────────────────────────
  // Override the default Google Cloud brand palette if needed.
  // Colors use standard hex strings.
  colors: {
    gcBlue:      '#4285F4',
    gcGreen:     '#34A853',
    gcYellow:    '#FBBC04',
    gcRed:       '#EA4335',
    navyDark:    '#1A237E',
    navyMid:     '#1565C0',
    white:       '#FFFFFF',
    lightGrey:   '#F8F9FA',
    midGrey:     '#E8EAED',
    darkGrey:    '#3C4043',
    textPrimary: '#202124',
    textMuted:   '#5F6368',
  },

  // ── Slide Definitions ───────────────────────────────────────────────────────
  slides: [

    // ── 1. Title ──────────────────────────────────────────────────────────────
    {
      type: 'title',
      // headline    — large primary text, defaults to companyName if omitted
      // subtitle    — secondary line below headline
      // notes       — speaker notes added to this slide
      headline: 'NovaTech Logistics',
      subtitle: 'Google Cloud — Executive Overview',
      notes: 'Welcome and introductions. Confirm agenda with the room. Note any priorities raised before starting.',
    },

    // ── 2. Agenda ─────────────────────────────────────────────────────────────
    {
      type: 'agenda',
      headline: 'Today\'s Agenda',
      // items: array of { label, duration }
      items: [
        { label: 'NovaTech — Where We Are Today',            duration: '5 min'  },
        { label: 'Key Challenges & Priorities for 2026',     duration: '10 min' },
        { label: 'Google Cloud — How We Address Each One',   duration: '15 min' },
        { label: 'Customer Proof Points',                    duration: '10 min' },
        { label: 'Commercial Summary & ROI',                 duration: '10 min' },
        { label: 'Proposed Next Steps',                      duration: '5 min'  },
        { label: 'Q&A',                                      duration: 'Open'   },
      ],
      notes: 'Walk through agenda. Ask if anything needs to be added or re-ordered.',
    },

    // ── 3. Section Divider — Challenges ───────────────────────────────────────
    {
      type: 'section-divider',
      // bgColor     — background fill hex; defaults to gcBlue
      // label       — small category text above the title (optional)
      // title       — main large text
      // subtitle    — smaller line below title (optional)
      bgColor:  '#1A237E',
      label:    'Part 1',
      title:    'Key Challenges',
      subtitle: 'Understanding where NovaTech is today',
      notes:    'Transition slide. Pause for any questions before moving forward.',
    },

    // ── 4. Pain Points ────────────────────────────────────────────────────────
    {
      type: 'pain-points',
      headline: 'NovaTech\'s Top Infrastructure Challenges',
      // items: array of { title, description, source }
      // source  — optional citation (analyst report, Gartner, interview note, etc.)
      items: [
        {
          title:       'Fragmented On-Prem Infrastructure',
          description: 'Three separate data centre contracts expiring in Q3 2026, forcing a consolidation decision. Estimated migration cost €1.2M if deferred to 2027.',
          source:      'NovaTech IT Audit, Jan 2026',
        },
        {
          title:       'Slow Time-to-Market for New Services',
          description: 'Releasing a new carrier integration takes 6–8 weeks due to manual provisioning pipelines and no staging environment parity.',
          source:      'CTO Interview, Feb 2026',
        },
        {
          title:       'Compliance & Data Residency Pressure',
          description: 'Incoming EU data-sovereignty requirements demand documented data residency by H2 2026. Current AWS environment spans US-EAST-1.',
          source:      'CISO Risk Register, Q4 2025',
        },
      ],
      notes: 'Validate each pain point with the room before moving on. Ask: "Is this still accurate?" Adjust emphasis based on who is in the room — CTO vs. CFO will weight these differently.',
    },

    // ── 5. Section Divider — Solution ─────────────────────────────────────────
    {
      type: 'section-divider',
      bgColor:  '#1565C0',
      label:    'Part 2',
      title:    'The Google Cloud Solution',
      subtitle: 'Mapped directly to your challenges',
      notes:    'Transition slide.',
    },

    // ── 6. Solution Map ───────────────────────────────────────────────────────
    {
      type: 'solution-map',
      headline: 'Challenge → Solution → Outcome',
      // rows: array of { challenge, solution, outcome }
      rows: [
        {
          challenge: 'Fragmented on-prem infra & lease deadlines',
          solution:  'Google Cloud Migration Factory + Migrate for Compute Engine',
          outcome:   '30–40% infra cost reduction; exit all 3 DCs on schedule',
        },
        {
          challenge: 'Slow carrier integration releases (6–8 wks)',
          solution:  'Cloud Build CI/CD + GKE Autopilot + Cloud Deploy',
          outcome:   'Target release cycle < 5 days with zero-touch promotion',
        },
        {
          challenge: 'EU data residency compliance gap',
          solution:  'europe-west1 (Belgium) region + Assured Workloads',
          outcome:   'Documented sovereignty posture ready for DPA audit by Q3 2026',
        },
      ],
      notes: 'Emphasise that every row maps back to a pain point the customer confirmed. This is not a product demo — it\'s a response to their stated priorities.',
    },

    // ── 7. Architecture ───────────────────────────────────────────────────────
    {
      type: 'architecture',
      headline: 'Proposed High-Level Architecture',
      // layers: array of { label, items[] }
      // Rendered top-to-bottom as coloured bands.
      layers: [
        {
          label: 'Users & Partners',
          items: ['NovaTech Staff', 'Carrier APIs', 'Customer Portal'],
        },
        {
          label: 'Edge & Security',
          items: ['Cloud Armor', 'Cloud CDN', 'Identity-Aware Proxy'],
        },
        {
          label: 'Application Tier (GKE Autopilot)',
          items: ['Order Service', 'Tracking Service', 'Integration Hub'],
        },
        {
          label: 'Data & Analytics',
          items: ['Cloud SQL (PostgreSQL)', 'BigQuery', 'Pub/Sub'],
        },
        {
          label: 'Operations',
          items: ['Cloud Monitoring', 'Cloud Logging', 'Security Command Center'],
        },
      ],
      notes: 'This is indicative, not prescriptive. The architecture team will refine during discovery. Key point: all layers are within europe-west1 unless explicitly noted.',
    },

    // ── 8. Comparison Table ───────────────────────────────────────────────────
    {
      type: 'comparison-table',
      headline: 'Why Google Cloud vs. Alternatives',
      // headers: column header labels (first column is row label)
      // rows: array of arrays matching headers length
      headers: ['Criterion', 'AWS', 'Azure', 'Google Cloud'],
      rows: [
        ['EU Data Residency',        'Multi-region only',    'Available (Germany)', 'Assured Workloads — europe-west1'],
        ['Kubernetes Expertise',     'EKS — managed',        'AKS — managed',       'GKE — invented Kubernetes'],
        ['Migration Support',        'MAP Programme',        'Azure Migrate',        'Migration Factory + funded PSO'],
        ['Network Egress Cost',      'Standard pricing',     'Standard pricing',     'Committed use: up to 50% lower'],
        ['Data Analytics',           'Redshift',             'Synapse',              'BigQuery — serverless, built-in'],
        ['Existing Relationship',    'Primary vendor',       'None',                 'Strategic partnership proposed'],
      ],
      notes: 'Do not volunteer competitive comparisons unless asked. If the customer raises AWS or Azure directly, use this slide. Focus on the Google Cloud column — lead with strengths, not competitor weaknesses.',
    },

    // ── 9. Customer Proof ─────────────────────────────────────────────────────
    {
      type: 'customer-proof',
      headline: 'Customers Like You, Already on Google Cloud',
      // stories: array of { company, industry, metric, quote }
      // metric  — the headline number/stat to highlight in large text
      // quote   — optional short pull quote
      stories: [
        {
          company:  'DB Schenker',
          industry: 'Global Freight & Logistics',
          metric:   '40% faster release cycles',
          quote:    'GKE Autopilot removed the cluster management burden entirely — our teams ship, not operate.',
        },
        {
          company:  'DHL Supply Chain',
          industry: 'Warehousing & Distribution',
          metric:   '€28M annual infra savings',
          quote:    'Moving to BigQuery eliminated our data warehouse licences overnight.',
        },
        {
          company:  'Maersk',
          industry: 'Ocean & Multimodal Freight',
          metric:   '99.99% uptime SLA',
          quote:    'Cloud Spanner gave us the global consistency our tracking platform needed at scale.',
        },
      ],
      notes: 'These are real public case studies. Links: cloud.google.com/customers. If the customer asks for a reference call, route through your PAM — do not promise directly.',
    },

    // ── 10. ROI Snapshot ──────────────────────────────────────────────────────
    {
      type: 'roi-snapshot',
      headline: 'Indicative 3-Year ROI — NovaTech',
      // metrics: array of { label, value, sublabel, highlight }
      // highlight — true renders the value in gcGreen; false/omit uses default
      metrics: [
        { label: 'Infrastructure Cost Reduction', value: '€1.8M',  sublabel: 'over 3 years vs. DC renewal',     highlight: true  },
        { label: 'Developer Velocity Gain',        value: '2.4×',   sublabel: 'release frequency improvement',  highlight: true  },
        { label: 'Migration Investment',           value: '€420K',  sublabel: 'one-time (PSO + licences)',       highlight: false },
        { label: 'Payback Period',                 value: '8 mo.',  sublabel: 'from first workload migration',   highlight: true  },
        { label: 'Compliance Readiness',           value: 'Q3 \'26', sublabel: 'DPA audit-ready target date',   highlight: false },
        { label: 'Google Funding Available',       value: '€80K',   sublabel: 'Migration Factory credits',      highlight: true  },
      ],
      disclaimer: 'ROI estimates based on similar logistics customers and publicly available benchmarks. Formal business case subject to discovery workshop.',
      notes: 'Stress that these are directional estimates, not contractual commitments. Offer to run a formal TCO workshop with the Migration Factory team.',
    },

    // ── 11. Timeline ──────────────────────────────────────────────────────────
    {
      type: 'timeline',
      headline: 'Proposed Engagement Timeline',
      // phases: array of { label, period, bullets[] }
      phases: [
        {
          label:  'Phase 1 — Foundation',
          period: 'Apr – Jun 2026',
          bullets: [
            'Discovery & architecture workshop',
            'Landing zone deployment (europe-west1)',
            'Migrate first non-critical workload',
            'Identity & access baseline (Cloud Identity)',
          ],
        },
        {
          label:  'Phase 2 — Migration',
          period: 'Jul – Oct 2026',
          bullets: [
            'DC-1 workloads migrated',
            'GKE Autopilot for all containerised services',
            'Cloud SQL replacing on-prem PostgreSQL',
            'DC-2 & DC-3 exit confirmed',
          ],
        },
        {
          label:  'Phase 3 — Optimise',
          period: 'Nov 2026 – Q1 2027',
          bullets: [
            'BigQuery analytics platform live',
            'Committed Use Discounts applied',
            'Security Command Center active',
            'Steady-state FinOps cadence',
          ],
        },
      ],
      notes: 'Timeline is indicative. Actual phases depend on discovery findings. DC lease expiry in Q3 2026 creates a hard constraint on Phase 2.',
    },

    // ── 12. Next Steps ────────────────────────────────────────────────────────
    {
      type: 'next-steps',
      headline: 'Proposed Next Steps',
      // actions: array of { action, owner, date }
      actions: [
        { action: 'Schedule Discovery Workshop (½ day)', owner: 'NovaTech CTO + Google Cloud PSO', date: 'By 31 Mar 2026' },
        { action: 'Share NovaTech IT Audit (Jan 2026)',  owner: 'Anna Kowalski',                   date: 'By 28 Mar 2026' },
        { action: 'Send Migration Factory overview deck', owner: 'Google Cloud AE',               date: '25 Mar 2026'    },
        { action: 'Confirm commercial framework (MoU)',  owner: 'Joanna Nowak (CFO) + Google',    date: 'By 4 Apr 2026'  },
        { action: 'Reference call — DB Schenker',        owner: 'Google Cloud PAM',               date: 'TBD'            },
      ],
      notes: 'End the meeting by reading each action aloud and confirming the owner accepts it. Offer to send the deck and action list by end of day.',
    },

  ], // end slides

}; // end DECK_CONFIG


// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ENTRY POINTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standalone entry point.
 * Run this function from the Apps Script editor to generate the deck.
 * The presentation is saved to Google Drive root and a link is logged.
 */
function createPitchDeck() {
  console.log('Slides Generator — starting');
  console.log(`Customer: ${DECK_CONFIG.companyName}`);

  try {
    const url = buildPresentation_(DECK_CONFIG, null);
    console.log('');
    console.log('Done! Open your presentation:');
    console.log(url);
  } catch (err) {
    console.error(`createPitchDeck failed: ${err.message}`);
    console.error(err.stack);
    throw err;
  }
}

/**
 * Orchestrator entry point.
 * Called by orchestrator.gs with a standard customer config and state object.
 *
 * @param {Object} config  - Customer config from getConfig()
 * @param {Object} state   - Provisioning state from orchestrator
 */
function createSlides(config, state) {
  const logFn = (typeof log === 'function') ? log : (s, l, m) => console.log(`[${l}] ${m}`);
  logFn(state, 'INFO', 'Slides: Starting pitch deck generation');

  try {
    const deckConfig = buildDeckConfigFromCustomerConfig_(config);
    const url        = buildPresentation_(deckConfig, state);
    logFn(state, 'INFO', `Slides: Created presentation — ${url}`);
  } catch (err) {
    logFn(state, 'ERROR', `Slides: Failed — ${err.message}`);
    throw err;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// CORE BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates the full Google Slides presentation from a deck config object.
 * Returns the presentation URL.
 *
 * @param {Object}      deckConfig
 * @param {Object|null} state       - Orchestrator state (null when standalone)
 * @returns {string} Presentation URL
 * @private
 */
function buildPresentation_(deckConfig, state) {
  const C      = mergeColors_(deckConfig.colors || {});
  const title  = `${deckConfig.companyName} — Google Cloud Executive Overview — ${deckConfig.date}`;

  // Create presentation
  const presentation = SlidesApp.create(title);
  const presentationId = presentation.getId();

  console.log(`  Created presentation: ${title}`);
  console.log(`  Presentation ID: ${presentationId}`);

  // Register file ID in orchestrator state if provided
  if (state && state.manifest && Array.isArray(state.manifest.driveFileIds)) {
    state.manifest.driveFileIds.push(presentationId);
  }

  // Remove the default blank slide Apps Script creates
  const defaultSlide = presentation.getSlides()[0];
  if (defaultSlide) {
    defaultSlide.remove();
  }

  // Build each slide
  deckConfig.slides.forEach((slideDef, index) => {
    console.log(`  Slide ${index + 1}/${deckConfig.slides.length}: [${slideDef.type}]`);
    try {
      buildSlide_(presentation, slideDef, deckConfig, C, index + 1);
    } catch (err) {
      console.error(`  ERROR on slide ${index + 1} (${slideDef.type}): ${err.message}`);
      // Insert an error placeholder slide rather than aborting the whole run
      buildErrorSlide_(presentation, slideDef.type, err.message, C);
    }
    Utilities.sleep(200); // respect API rate limits
  });

  return presentation.getUrl();
}

/**
 * Routes a slide definition to the correct builder function.
 *
 * @private
 */
function buildSlide_(presentation, slideDef, deckConfig, C, slideNumber) {
  const handlers = {
    'title':            buildTitleSlide_,
    'agenda':           buildAgendaSlide_,
    'pain-points':      buildPainPointsSlide_,
    'solution-map':     buildSolutionMapSlide_,
    'comparison-table': buildComparisonTableSlide_,
    'customer-proof':   buildCustomerProofSlide_,
    'roi-snapshot':     buildRoiSnapshotSlide_,
    'timeline':         buildTimelineSlide_,
    'architecture':     buildArchitectureSlide_,
    'next-steps':       buildNextStepsSlide_,
    'section-divider':  buildSectionDividerSlide_,
    'text':             buildTextSlide_,
  };

  const handler = handlers[slideDef.type];
  if (!handler) {
    throw new Error(`Unknown slide type: "${slideDef.type}"`);
  }

  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  handler(slide, slideDef, deckConfig, C);
  addBrandedFooter_(slide, deckConfig, C, slideNumber);

  if (slideDef.notes) {
    slide.getNotesPage().getSpeakerNotesShape().getText().setText(slideDef.notes);
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// SLIDE TYPE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

// ── Title Slide ──────────────────────────────────────────────────────────────

/**
 * Dark navy background, centred headline, subtitle, presenter + date strip.
 * @private
 */
function buildTitleSlide_(slide, def, deckConfig, C) {
  // Background
  slide.getBackground().setSolidFill(C.navyDark);

  // Google Cloud wordmark bar (colour bar at top)
  const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(0), px_(0), px_(720), px_(6));
  bar.getFill().setSolidFill(C.gcBlue);
  bar.getBorder().setTransparent();

  // Four-colour accent dots (Google logo hint)
  const dotY  = 110;
  const dotSz = 14;
  const dots  = [C.gcBlue, C.gcRed, C.gcYellow, C.gcGreen];
  dots.forEach((color, i) => {
    const d = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(60 + i * 22), px_(dotY), px_(dotSz), px_(dotSz));
    d.getFill().setSolidFill(color);
    d.getBorder().setTransparent();
  });

  // "Google Cloud" label
  const gcLabel = slide.insertTextBox('Google Cloud', px_(60), px_(108), px_(220), px_(22));
  styleText_(gcLabel, { fontSize: 13, bold: false, color: '#8AB4F8', fontFamily: 'Google Sans' });

  // Divider line
  const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(60), px_(145), px_(600), px_(2));
  line.getFill().setSolidFill('#3D5AFE');
  line.getBorder().setTransparent();

  // Headline
  const headline = def.headline || deckConfig.companyName;
  const h = slide.insertTextBox(headline, px_(60), px_(165), px_(600), px_(90));
  styleText_(h, { fontSize: 44, bold: true, color: C.white, fontFamily: 'Google Sans' });
  h.getText().getParagraphs()[0].getRange().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);

  // Subtitle
  if (def.subtitle) {
    const s = slide.insertTextBox(def.subtitle, px_(60), px_(262), px_(600), px_(40));
    styleText_(s, { fontSize: 22, bold: false, color: '#8AB4F8', fontFamily: 'Google Sans' });
  }

  // Bottom strip
  const strip = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(0), px_(340), px_(720), px_(65));
  strip.getFill().setSolidFill('#0D1B6E');
  strip.getBorder().setTransparent();

  // Presenter + date
  const meta = `${deckConfig.presenter}  ·  ${deckConfig.date}  ·  ${deckConfig.industry}`;
  const m = slide.insertTextBox(meta, px_(60), px_(353), px_(600), px_(28));
  styleText_(m, { fontSize: 13, bold: false, color: '#B0BEC5', fontFamily: 'Google Sans' });
}


// ── Agenda Slide ─────────────────────────────────────────────────────────────

/** @private */
function buildAgendaSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Agenda', C);

  const items = def.items || [];
  const startY = 105;
  const rowH   = 37;

  items.forEach((item, i) => {
    const y = startY + i * rowH;

    // Number badge
    const badge = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(42), px_(y + 2), px_(24), px_(24));
    badge.getFill().setSolidFill(C.gcBlue);
    badge.getBorder().setTransparent();
    const num = slide.insertTextBox(String(i + 1), px_(42), px_(y + 2), px_(24), px_(24));
    styleText_(num, { fontSize: 11, bold: true, color: C.white, fontFamily: 'Google Sans', align: 'CENTER' });

    // Label
    const label = slide.insertTextBox(item.label, px_(78), px_(y), px_(490), px_(28));
    styleText_(label, { fontSize: 15, bold: i === 0, color: C.textPrimary, fontFamily: 'Google Sans' });

    // Duration
    const dur = slide.insertTextBox(item.duration || '', px_(580), px_(y), px_(100), px_(28));
    styleText_(dur, { fontSize: 13, bold: false, color: C.gcBlue, fontFamily: 'Google Sans', align: 'RIGHT' });

    // Light separator (skip last)
    if (i < items.length - 1) {
      const sep = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(42), px_(y + rowH - 2), px_(638), px_(1));
      sep.getFill().setSolidFill(C.midGrey);
      sep.getBorder().setTransparent();
    }
  });
}


// ── Pain Points Slide ────────────────────────────────────────────────────────

/** @private */
function buildPainPointsSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.lightGrey);
  addSlideHeadline_(slide, def.headline || 'Key Challenges', C);

  const items = (def.items || []).slice(0, 3);
  const boxW  = 196;
  const boxH  = 210;
  const gapX  = 18;
  const startX = 42;
  const startY = 105;

  items.forEach((item, i) => {
    const x = startX + i * (boxW + gapX);

    // Card background
    const card = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x), px_(startY), px_(boxW), px_(boxH));
    card.getFill().setSolidFill(C.white);
    card.getBorder().getLineFill().setSolidFill(C.midGrey);

    // Number circle (red)
    const cx = x + 14;
    const cy = startY + 14;
    const circle = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(cx), px_(cy), px_(26), px_(26));
    circle.getFill().setSolidFill(C.gcRed);
    circle.getBorder().setTransparent();
    const num = slide.insertTextBox(String(i + 1), px_(cx), px_(cy), px_(26), px_(26));
    styleText_(num, { fontSize: 13, bold: true, color: C.white, fontFamily: 'Google Sans', align: 'CENTER' });

    // Pain point title
    const t = slide.insertTextBox(item.title || '', px_(x + 8), px_(startY + 48), px_(boxW - 16), px_(36));
    styleText_(t, { fontSize: 13, bold: true, color: C.textPrimary, fontFamily: 'Google Sans' });
    t.getText().getParagraphs()[0].getRange().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);

    // Description
    const d = slide.insertTextBox(item.description || '', px_(x + 8), px_(startY + 88), px_(boxW - 16), px_(90));
    styleText_(d, { fontSize: 11, bold: false, color: C.darkGrey, fontFamily: 'Google Sans' });
    d.setContentAlignment(SlidesApp.ContentAlignment.TOP);

    // Source
    if (item.source) {
      const src = slide.insertTextBox(`Source: ${item.source}`, px_(x + 8), px_(startY + 185), px_(boxW - 16), px_(18));
      styleText_(src, { fontSize: 9, bold: false, color: C.textMuted, fontFamily: 'Google Sans' });
    }
  });
}


// ── Solution Map Slide ───────────────────────────────────────────────────────

/** @private */
function buildSolutionMapSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Challenge → Solution → Outcome', C);

  const rows = def.rows || [];
  if (!rows.length) return;

  // Column headers
  const headers   = ['Challenge', 'Google Cloud Solution', 'Outcome'];
  const colColors = [C.gcRed, C.gcBlue, C.gcGreen];
  const colW      = [196, 220, 196];
  const startX    = 42;
  const headerY   = 104;
  const headerH   = 28;

  let xCursor = startX;
  headers.forEach((h, i) => {
    const hBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(xCursor), px_(headerY), px_(colW[i]), px_(headerH));
    hBox.getFill().setSolidFill(colColors[i]);
    hBox.getBorder().setTransparent();
    const hText = slide.insertTextBox(h, px_(xCursor + 6), px_(headerY + 4), px_(colW[i] - 12), px_(20));
    styleText_(hText, { fontSize: 12, bold: true, color: C.white, fontFamily: 'Google Sans' });
    xCursor += colW[i] + 8;
  });

  // Data rows
  const rowH   = 65;
  const startY = headerY + headerH + 4;
  const rowBg  = [C.lightGrey, C.white];

  rows.forEach((row, ri) => {
    xCursor = startX;
    const y      = startY + ri * (rowH + 4);
    const values = [row.challenge, row.solution, row.outcome];

    values.forEach((val, ci) => {
      const bg = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(xCursor), px_(y), px_(colW[ci]), px_(rowH));
      bg.getFill().setSolidFill(rowBg[ri % 2]);
      bg.getBorder().getLineFill().setSolidFill(C.midGrey);
      const t = slide.insertTextBox(val || '', px_(xCursor + 6), px_(y + 4), px_(colW[ci] - 12), px_(rowH - 8));
      styleText_(t, { fontSize: 11, bold: false, color: C.textPrimary, fontFamily: 'Google Sans' });
      t.setContentAlignment(SlidesApp.ContentAlignment.TOP);
      xCursor += colW[ci] + 8;
    });

    // Arrow between Challenge and Solution
    if (ri === 0) {
      // Already implied by column adjacency — no connector needed
    }
  });
}


// ── Comparison Table Slide ───────────────────────────────────────────────────

/** @private */
function buildComparisonTableSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Comparison', C);

  const headers = def.headers || [];
  const rows    = def.rows    || [];
  if (!headers.length) return;

  const tableX  = 42;
  const tableY  = 104;
  const tableW  = 636;
  const colW    = tableW / headers.length;
  const headerH = 30;
  const rowH    = 28;

  // Header row
  headers.forEach((h, i) => {
    const hBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
      px_(tableX + i * colW), px_(tableY), px_(colW - 1), px_(headerH));
    hBox.getFill().setSolidFill(C.navyDark);
    hBox.getBorder().setTransparent();
    const hText = slide.insertTextBox(h,
      px_(tableX + i * colW + 5), px_(tableY + 5), px_(colW - 10), px_(20));
    styleText_(hText, { fontSize: 11, bold: true, color: C.white, fontFamily: 'Google Sans' });
  });

  // Data rows — alternating fill; last column highlighted in light blue
  rows.forEach((row, ri) => {
    const y   = tableY + headerH + ri * rowH + 1;
    const bg  = ri % 2 === 0 ? C.white : C.lightGrey;

    row.forEach((cell, ci) => {
      const isHighlight = (ci === headers.length - 1); // last col = Google Cloud
      const cellBg = isHighlight ? '#E8F0FE' : bg;

      const cBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
        px_(tableX + ci * colW), px_(y), px_(colW - 1), px_(rowH - 1));
      cBox.getFill().setSolidFill(cellBg);
      cBox.getBorder().getLineFill().setSolidFill(C.midGrey);

      const cText = slide.insertTextBox(cell || '',
        px_(tableX + ci * colW + 5), px_(y + 4), px_(colW - 10), px_(rowH - 8));
      styleText_(cText, { fontSize: 10, bold: isHighlight && ci > 0, color: C.textPrimary, fontFamily: 'Google Sans' });
    });
  });
}


// ── Customer Proof Slide ─────────────────────────────────────────────────────

/** @private */
function buildCustomerProofSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.lightGrey);
  addSlideHeadline_(slide, def.headline || 'Customer Stories', C);

  const stories = (def.stories || []).slice(0, 3);
  const cardW   = 196;
  const cardH   = 210;
  const gapX    = 18;
  const startX  = 42;
  const startY  = 105;

  stories.forEach((story, i) => {
    const x = startX + i * (cardW + gapX);

    // Card
    const card = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x), px_(startY), px_(cardW), px_(cardH));
    card.getFill().setSolidFill(C.white);
    card.getBorder().getLineFill().setSolidFill(C.midGrey);

    // Accent top bar
    const accent = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x), px_(startY), px_(cardW), px_(5));
    accent.getFill().setSolidFill(C.gcBlue);
    accent.getBorder().setTransparent();

    // Company name
    const co = slide.insertTextBox(story.company || '', px_(x + 10), px_(startY + 14), px_(cardW - 20), px_(24));
    styleText_(co, { fontSize: 14, bold: true, color: C.navyDark, fontFamily: 'Google Sans' });

    // Industry
    const ind = slide.insertTextBox(story.industry || '', px_(x + 10), px_(startY + 38), px_(cardW - 20), px_(18));
    styleText_(ind, { fontSize: 10, bold: false, color: C.textMuted, fontFamily: 'Google Sans' });

    // Metric (large, green)
    const met = slide.insertTextBox(story.metric || '', px_(x + 10), px_(startY + 62), px_(cardW - 20), px_(36));
    styleText_(met, { fontSize: 18, bold: true, color: C.gcGreen, fontFamily: 'Google Sans' });

    // Divider
    const sep = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x + 10), px_(startY + 100), px_(cardW - 20), px_(1));
    sep.getFill().setSolidFill(C.midGrey);
    sep.getBorder().setTransparent();

    // Quote
    if (story.quote) {
      const q = slide.insertTextBox(`"${story.quote}"`, px_(x + 10), px_(startY + 108), px_(cardW - 20), px_(90));
      styleText_(q, { fontSize: 10, bold: false, color: C.darkGrey, fontFamily: 'Google Sans' });
      q.setContentAlignment(SlidesApp.ContentAlignment.TOP);
    }
  });
}


// ── ROI Snapshot Slide ───────────────────────────────────────────────────────

/** @private */
function buildRoiSnapshotSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.navyDark);
  addSlideHeadline_(slide, def.headline || 'ROI Snapshot', C, { titleColor: C.white });

  const metrics = (def.metrics || []).slice(0, 6);
  const cols    = 3;
  const cellW   = 196;
  const cellH   = 90;
  const gapX    = 18;
  const gapY    = 14;
  const startX  = 42;
  const startY  = 110;

  metrics.forEach((m, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x   = startX + col * (cellW + gapX);
    const y   = startY + row * (cellH + gapY);

    // Cell background
    const bg = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x), px_(y), px_(cellW), px_(cellH));
    bg.getFill().setSolidFill('#1E3A6E');
    bg.getBorder().getLineFill().setSolidFill('#2979FF');

    // Big value
    const valueColor = m.highlight ? C.gcGreen : C.white;
    const val = slide.insertTextBox(m.value || '', px_(x + 10), px_(y + 10), px_(cellW - 20), px_(38));
    styleText_(val, { fontSize: 26, bold: true, color: valueColor, fontFamily: 'Google Sans' });

    // Label
    const lbl = slide.insertTextBox(m.label || '', px_(x + 10), px_(y + 48), px_(cellW - 20), px_(20));
    styleText_(lbl, { fontSize: 11, bold: true, color: C.white, fontFamily: 'Google Sans' });

    // Sublabel
    if (m.sublabel) {
      const sub = slide.insertTextBox(m.sublabel, px_(x + 10), px_(y + 66), px_(cellW - 20), px_(18));
      styleText_(sub, { fontSize: 9, bold: false, color: '#8AB4F8', fontFamily: 'Google Sans' });
    }
  });

  // Disclaimer
  if (def.disclaimer) {
    const disc = slide.insertTextBox(def.disclaimer, px_(42), px_(318), px_(636), px_(20));
    styleText_(disc, { fontSize: 8.5, bold: false, color: '#8AB4F8', fontFamily: 'Google Sans' });
  }
}


// ── Timeline Slide ───────────────────────────────────────────────────────────

/** @private */
function buildTimelineSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Timeline', C);

  const phases  = (def.phases || []).slice(0, 3);
  const phaseW  = 196;
  const gapX    = 18;
  const startX  = 42;
  const lineY   = 152;

  // Horizontal connecting line
  const lineX2 = startX + phases.length * phaseW + (phases.length - 1) * gapX;
  const hLine  = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
    px_(startX + 12), px_(lineY + 9), px_(lineX2 - startX - 24), px_(3));
  hLine.getFill().setSolidFill(C.midGrey);
  hLine.getBorder().setTransparent();

  const phaseColors = [C.gcBlue, C.gcGreen, C.gcYellow];

  phases.forEach((phase, i) => {
    const x = startX + i * (phaseW + gapX);

    // Phase dot on timeline
    const dot = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(x + phaseW / 2 - 12), px_(lineY), px_(24), px_(24));
    dot.getFill().setSolidFill(phaseColors[i] || C.gcBlue);
    dot.getBorder().setTransparent();

    // Phase label
    const labelBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(x), px_(104), px_(phaseW), px_(42));
    labelBox.getFill().setSolidFill(phaseColors[i] || C.gcBlue);
    labelBox.getBorder().setTransparent();
    const lbl = slide.insertTextBox(phase.label || '', px_(x + 6), px_(108), px_(phaseW - 12), px_(34));
    styleText_(lbl, { fontSize: 12, bold: true, color: C.white, fontFamily: 'Google Sans' });

    // Period
    const periodBox = slide.insertTextBox(phase.period || '', px_(x), px_(180), px_(phaseW), px_(18));
    styleText_(periodBox, { fontSize: 10, bold: false, color: C.textMuted, fontFamily: 'Google Sans' });

    // Bullets
    const bullets = phase.bullets || [];
    bullets.forEach((bullet, bi) => {
      const dotB = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(x + 6), px_(200 + bi * 26 + 6), px_(7), px_(7));
      dotB.getFill().setSolidFill(phaseColors[i] || C.gcBlue);
      dotB.getBorder().setTransparent();
      const bt = slide.insertTextBox(bullet, px_(x + 18), px_(200 + bi * 26), px_(phaseW - 20), px_(22));
      styleText_(bt, { fontSize: 10, bold: false, color: C.textPrimary, fontFamily: 'Google Sans' });
    });
  });
}


// ── Architecture Slide ───────────────────────────────────────────────────────

/** @private */
function buildArchitectureSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Architecture', C);

  const layers = def.layers || [];
  const layerH = 44;
  const gap    = 6;
  const startX = 42;
  const startY = 108;
  const totalW = 636;

  const layerColors = [
    '#E8F0FE', // light blue  — Users
    '#FCE8E6', // light red   — Edge / Security
    '#E6F4EA', // light green — App
    '#FEF7E0', // light amber — Data
    '#F1F3F4', // light grey  — Ops
  ];
  const labelColors = [C.gcBlue, C.gcRed, C.gcGreen, C.gcYellow, C.darkGrey];

  layers.forEach((layer, i) => {
    const y = startY + i * (layerH + gap);

    // Layer band
    const band = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(startX), px_(y), px_(totalW), px_(layerH));
    band.getFill().setSolidFill(layerColors[i] || C.lightGrey);
    band.getBorder().getLineFill().setSolidFill(C.midGrey);

    // Layer label (left side)
    const lbl = slide.insertTextBox(layer.label || '', px_(startX + 8), px_(y + 6), px_(160), px_(32));
    styleText_(lbl, { fontSize: 10, bold: true, color: labelColors[i] || C.darkGrey, fontFamily: 'Google Sans' });

    // Items (right side as chips)
    const items = layer.items || [];
    const chipW = 130;
    const chipGap = 8;
    let chipX = startX + 178;

    items.forEach((item) => {
      const chip = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, px_(chipX), px_(y + 10), px_(chipW), px_(24));
      chip.getFill().setSolidFill(C.white);
      chip.getBorder().getLineFill().setSolidFill(labelColors[i] || C.gcBlue);
      const chipText = slide.insertTextBox(item, px_(chipX + 4), px_(y + 13), px_(chipW - 8), px_(18));
      styleText_(chipText, { fontSize: 9, bold: false, color: C.textPrimary, fontFamily: 'Google Sans' });
      chipX += chipW + chipGap;
      if (chipX + chipW > startX + totalW - 10) return; // clip overflow
    });
  });
}


// ── Next Steps Slide ─────────────────────────────────────────────────────────

/** @private */
function buildNextStepsSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || 'Next Steps', C);

  const actions = def.actions || [];
  const rowH    = 40;
  const startY  = 108;
  const colW    = [310, 206, 100];
  const startX  = 42;

  // Header
  const hLabels = ['Action', 'Owner', 'Date'];
  let xCur = startX;
  hLabels.forEach((h, i) => {
    const hb = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(xCur), px_(startY), px_(colW[i] - 2), px_(28));
    hb.getFill().setSolidFill(C.gcBlue);
    hb.getBorder().setTransparent();
    const ht = slide.insertTextBox(h, px_(xCur + 6), px_(startY + 5), px_(colW[i] - 12), px_(18));
    styleText_(ht, { fontSize: 11, bold: true, color: C.white, fontFamily: 'Google Sans' });
    xCur += colW[i] + 4;
  });

  // Rows
  const rowBg = [C.white, C.lightGrey];
  actions.forEach((action, ri) => {
    xCur = startX;
    const y      = startY + 28 + ri * rowH + 2;
    const values = [action.action, action.owner, action.date];

    values.forEach((val, ci) => {
      const rb = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(xCur), px_(y), px_(colW[ci] - 2), px_(rowH - 2));
      rb.getFill().setSolidFill(rowBg[ri % 2]);
      rb.getBorder().getLineFill().setSolidFill(C.midGrey);
      const rt = slide.insertTextBox(val || '', px_(xCur + 6), px_(y + 4), px_(colW[ci] - 12), px_(rowH - 10));
      styleText_(rt, { fontSize: 10, bold: false, color: C.textPrimary, fontFamily: 'Google Sans' });
      rt.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
      xCur += colW[ci] + 4;
    });
  });
}


// ── Section Divider Slide ────────────────────────────────────────────────────

/** @private */
function buildSectionDividerSlide_(slide, def, deckConfig, C) {
  const bg = def.bgColor || C.gcBlue;
  slide.getBackground().setSolidFill(bg);

  // Accent bar (bottom)
  const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(0), px_(369), px_(720), px_(6));
  bar.getFill().setSolidFill(C.gcGreen);
  bar.getBorder().setTransparent();

  // Decorative circle (bottom right)
  const circle = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, px_(540), px_(220), px_(200), px_(200));
  circle.getFill().setSolidFill(lightenHex_(bg));
  circle.getBorder().setTransparent();

  // Part label
  if (def.label) {
    const lbl = slide.insertTextBox(def.label.toUpperCase(), px_(80), px_(130), px_(400), px_(24));
    styleText_(lbl, { fontSize: 12, bold: false, color: 'rgba(255,255,255,0.7)', fontFamily: 'Google Sans' });
    // Note: RGBA not supported — use near-white instead
    styleText_(lbl, { fontSize: 12, bold: false, color: '#B3E5FC', fontFamily: 'Google Sans' });
  }

  // Main title
  const t = slide.insertTextBox(def.title || '', px_(80), def.label ? px_(158) : px_(145), px_(500), px_(90));
  styleText_(t, { fontSize: 40, bold: true, color: C.white, fontFamily: 'Google Sans' });

  // Subtitle
  if (def.subtitle) {
    const s = slide.insertTextBox(def.subtitle, px_(80), px_(260), px_(450), px_(36));
    styleText_(s, { fontSize: 18, bold: false, color: '#B3E5FC', fontFamily: 'Google Sans' });
  }
}


// ── Generic Text Slide ───────────────────────────────────────────────────────

/** @private */
function buildTextSlide_(slide, def, deckConfig, C) {
  slide.getBackground().setSolidFill(C.white);
  addSlideHeadline_(slide, def.headline || '', C);

  if (def.body) {
    const body = slide.insertTextBox(def.body, px_(42), px_(108), px_(636), px_(240));
    styleText_(body, { fontSize: 14, bold: false, color: C.textPrimary, fontFamily: 'Google Sans' });
    body.setContentAlignment(SlidesApp.ContentAlignment.TOP);
  }
}


// ── Error Placeholder Slide ──────────────────────────────────────────────────

/** @private */
function buildErrorSlide_(presentation, slideType, message, C) {
  const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  slide.getBackground().setSolidFill('#FCE8E6');
  const t = slide.insertTextBox(
    `Error building [${slideType}] slide:\n${message}`,
    px_(60), px_(150), px_(600), px_(100)
  );
  styleText_(t, { fontSize: 14, bold: false, color: C.gcRed, fontFamily: 'Google Sans' });
}


// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Adds a standard branded footer to a slide.
 * Footer contains: "Confidential | Google Cloud | [date]" on the left,
 * and the slide number on the right.
 *
 * @param {Slide}  slide
 * @param {Object} deckConfig
 * @param {Object} C            - Resolved color palette
 * @param {number} slideNumber
 */
function addBrandedFooter_(slide, deckConfig, C, slideNumber) {
  const footerY = 378;
  const footerH = 18;

  // Footer line
  const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(0), px_(footerY - 2), px_(720), px_(1));
  line.getFill().setSolidFill(C.midGrey);
  line.getBorder().setTransparent();

  // Footer text
  const footerText = `Confidential  |  Google Cloud  |  ${deckConfig.date}`;
  const ft = slide.insertTextBox(footerText, px_(42), px_(footerY + 1), px_(550), px_(footerH));
  styleText_(ft, { fontSize: 8, bold: false, color: C.textMuted, fontFamily: 'Google Sans' });

  // Slide number
  const sn = slide.insertTextBox(String(slideNumber), px_(660), px_(footerY + 1), px_(20), px_(footerH));
  styleText_(sn, { fontSize: 8, bold: false, color: C.textMuted, fontFamily: 'Google Sans', align: 'RIGHT' });
}

/**
 * Inserts a standard slide headline.
 *
 * @param {Slide}  slide
 * @param {string} text
 * @param {Object} C
 * @param {Object} [opts]
 * @param {string} [opts.titleColor] - Override title text color
 * @private
 */
function addSlideHeadline_(slide, text, C, opts) {
  const color = (opts && opts.titleColor) ? opts.titleColor : C.textPrimary;

  const t = slide.insertTextBox(text, px_(42), px_(22), px_(636), px_(44));
  styleText_(t, { fontSize: 24, bold: true, color: color, fontFamily: 'Google Sans' });
  t.getText().getParagraphs()[0].getRange().getParagraphStyle()
    .setParagraphAlignment(SlidesApp.ParagraphAlignment.START);

  // Underline accent bar
  const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, px_(42), px_(70), px_(60), px_(4));
  bar.getFill().setSolidFill(C.gcBlue);
  bar.getBorder().setTransparent();
}

/**
 * Applies text styling to a text box shape.
 * All parameters are optional; only supplied keys are applied.
 *
 * @param {Shape}  textBox
 * @param {Object} opts
 * @param {number} [opts.fontSize]
 * @param {boolean}[opts.bold]
 * @param {string} [opts.color]       - Hex color string
 * @param {string} [opts.fontFamily]
 * @param {string} [opts.align]       - 'START' | 'CENTER' | 'END' (paragraph alignment)
 * @private
 */
function styleText_(textBox, opts) {
  try {
    const style = textBox.getText().getTextStyle();

    if (opts.fontSize    !== undefined) style.setFontSize(opts.fontSize);
    if (opts.bold        !== undefined) style.setBold(opts.bold);
    if (opts.fontFamily  !== undefined) style.setFontFamily(opts.fontFamily);
    if (opts.color       !== undefined) style.setForegroundColor(opts.color);

    if (opts.align) {
      const alignMap = {
        'START':  SlidesApp.ParagraphAlignment.START,
        'CENTER': SlidesApp.ParagraphAlignment.CENTER,
        'END':    SlidesApp.ParagraphAlignment.END,
        'RIGHT':  SlidesApp.ParagraphAlignment.END,
      };
      const paragraphAlign = alignMap[opts.align.toUpperCase()];
      if (paragraphAlign) {
        textBox.getText().getParagraphs().forEach(p => {
          p.getRange().getParagraphStyle().setParagraphAlignment(paragraphAlign);
        });
      }
    }

    // Remove default border/shadow on text boxes
    if (textBox.getBorder) {
      try { textBox.getBorder().setTransparent(); } catch (e) { /* ignore */ }
    }
  } catch (e) {
    // Non-fatal: log and continue
    console.warn(`styleText_: ${e.message}`);
  }
}

/**
 * Converts a pixel value to the EMU-based unit used by SlidesApp position/size methods.
 * SlidesApp uses points internally. 1pt = 1/72 inch; standard slide = 720×405pt (10×5.625 in).
 * This function treats input as points directly (1:1 mapping at 72dpi equivalent).
 *
 * @param {number} pts
 * @returns {number}
 * @private
 */
function px_(pts) {
  return pts;
}

/**
 * Returns a lightened version of a hex color (for decorative overlays).
 * Adds ~40 to each RGB channel, clamped to 255.
 *
 * @param {string} hex - e.g. '#1A237E'
 * @returns {string}
 * @private
 */
function lightenHex_(hex) {
  try {
    const h     = hex.replace('#', '');
    const r     = Math.min(255, parseInt(h.substring(0, 2), 16) + 40);
    const g     = Math.min(255, parseInt(h.substring(2, 4), 16) + 40);
    const b     = Math.min(255, parseInt(h.substring(4, 6), 16) + 40);
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return '#FFFFFF';
  }
}

/**
 * Merges a partial color override with the default Google Cloud brand palette.
 *
 * @param {Object} overrides - Partial color map from DECK_CONFIG.colors
 * @returns {Object} Complete color map
 * @private
 */
function mergeColors_(overrides) {
  const defaults = {
    gcBlue:      '#4285F4',
    gcGreen:     '#34A853',
    gcYellow:    '#FBBC04',
    gcRed:       '#EA4335',
    navyDark:    '#1A237E',
    navyMid:     '#1565C0',
    white:       '#FFFFFF',
    lightGrey:   '#F8F9FA',
    midGrey:     '#E8EAED',
    darkGrey:    '#3C4043',
    textPrimary: '#202124',
    textMuted:   '#5F6368',
  };
  return Object.assign({}, defaults, overrides || {});
}

/**
 * Builds a minimal DECK_CONFIG from a standard customer config object.
 * Used when called from the orchestrator.
 *
 * @param {Object} config - Customer config from getConfig()
 * @returns {Object} DECK_CONFIG-compatible object
 * @private
 */
function buildDeckConfigFromCustomerConfig_(config) {
  const ceo       = (typeof getEmployeeByRole === 'function') ? getEmployeeByRole(config, 'ceo')  : null;
  const cto       = (typeof getEmployeeByRole === 'function') ? getEmployeeByRole(config, 'cto')  : null;
  const presenter = cto
    ? `${cto.firstName} ${cto.lastName}`
    : ceo
      ? `${ceo.firstName} ${ceo.lastName}`
      : config.companyName;

  const today = (typeof Utilities !== 'undefined')
    ? Utilities.formatDate(new Date(), 'Europe/Warsaw', 'yyyy-MM-dd')
    : new Date().toISOString().substring(0, 10);

  // Build a minimal representative deck using config data
  return {
    companyName: config.companyName,
    industry:    config.industry || '',
    presenter:   presenter,
    date:        today,
    language:    config.language || 'en',
    colors:      {},
    slides: [
      {
        type:     'title',
        headline: config.companyName,
        subtitle: 'Google Cloud — Executive Overview',
        notes:    'Auto-generated by GCP Sales Enablement skill.',
      },
      {
        type:     'text',
        headline: 'About This Presentation',
        body:     `This presentation was auto-generated for ${config.companyName}.\n\nEdit slides to tailor the narrative to your customer conversation.\n\nPresenter: ${presenter}  |  Date: ${today}`,
        notes:    'Replace this slide with the full deck content.',
      },
    ],
  };
}
