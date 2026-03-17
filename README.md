# GCP Sales Enablement Skill

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Claude%20Code%20%7C%20Gemini%20CLI%20%7C%20Antigravity-4285F4?logo=google-cloud)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)

An AI-powered skill that helps Google Cloud sellers prepare for enterprise customer engagements — from initial company research through competitive positioning and live demo provisioning. Load it into Claude Code, Gemini CLI, or Google Antigravity and go from a company name to a complete pitch package in minutes, covering 9 industry verticals, 5 pitch deck templates, and competitive battlecards against AWS, Azure, and Microsoft 365.

---

## Features

- **3 skill modes** — Research, Pitch, and Demo, each with dedicated agent flows
- **9 industry vertical playbooks** — Healthcare, Financial Services, Retail, Manufacturing, Government, Telecom & Media, Energy & Utilities, Education, and Transport & Logistics
- **5 pitch deck templates** — Executive alignment, discovery follow-up, proof-of-value, competitive displacement, and renewal/expansion
- **Competitive battlecards** — Structured positioning versus AWS, Azure, and Microsoft 365 across price, compliance, AI, and ecosystem dimensions
- **Demo environment provisioning** — Apps Script config that bootstraps a realistic Google Workspace demo tenant in under 10 minutes
- **Bilingual output** — English by default; switches to Polish automatically when the customer is Polish or the user writes in Polish
- **Multi-platform** — Runs on Claude Code (recommended), Gemini CLI, and Google Antigravity with platform-specific adapters

---

## Quick Start

### Claude Code (recommended)

```bash
git clone https://github.com/kacperptasinski/gcp-sales-enablement-skill.git ~/.claude/skills/gcp-sales-enablement
```

The skill is auto-discovered by Claude Code. Invoke it from any session:

```
Use the gcp-sales-enablement skill to research NovaTech Logistics.
```

### Gemini CLI

Copy `SKILL.md` content as your system prompt before starting a session:

```bash
gemini --system-prompt "$(cat ~/.claude/skills/gcp-sales-enablement/SKILL.md)"
```

### Google Antigravity

Load `SKILL.md` as the agent context document in your Antigravity workspace. Reference files in the `references/` directory are loaded progressively by the skill — make all files accessible to the agent.

---

## Usage Examples

### Research a company for GCP opportunities

```
Research NovaTech Logistics for GCP opportunities.
```

The skill runs OSINT on NovaTech Logistics (a fictional 12,000-employee European logistics company), maps their pain points to GCP products, and produces a structured account profile with solution recommendations — including route optimisation via BigQuery ML, fleet telematics pipelines on Pub/Sub and Dataflow, and a compliance mapping against NIS2.

### Build a pitch deck

```
Build a pitch deck for a 5,000-person retail company targeting their CTO.
```

Produces persona-targeted slide content with speaker notes, a business case narrative with indicative ROI ranges, and a competitive displacement section positioning GCP against their current AWS environment.

### Create demo materials

```
Create Google Workspace demo materials for a Polish logistics company.
```

Outputs a full demo package in Polish: sample data (fictional), an Apps Script provisioning config for the demo tenant, a presenter guide with timed talking points, and a leave-behind summary document.

---

## Skill Modes

| Mode | Trigger Phrases | What It Produces |
|------|----------------|------------------|
| **Mode 1 — Research & Solution Mapping** | "research", "analyze", "profile", "what GCP fits", "compliance mapping", "GDPR", "NIS2", company name alone | Account profile, technology stack hypothesis, pain-to-product mapping, data confidence rating |
| **Mode 2 — Pitch & Value Proposition** | "pitch", "deck", "slides", "value prop", "business case", "ROI", "vs AWS", "vs Azure", "vs Microsoft" | Slide content by section, speaker notes, competitive positioning, objection handlers, business case narrative |
| **Mode 3 — Demo Materials & Environment** | "demo", "walkthrough", "environment", "Apps Script", "trainer guide", "show me", "rehearsal" | Demo content (fictional data), Apps Script provisioning config, presenter script, follow-up assets |

When the request is ambiguous, the skill asks: "Should I start with research, build pitch materials, or prepare demo content?"

---

## Architecture

```
gcp-sales-enablement/
├── SKILL.md                        # Entry point — skill definition, mode detection, routing logic
├── agents/
│   ├── session-manager.md          # Initialises sessions, routes modes, manages state handoffs
│   ├── customer-researcher.md      # OSINT and account profiling
│   ├── solution-architect.md       # Pain-to-product mapping, solution design, compliance mapping
│   ├── pitch-designer.md           # Pitch deck content, speaker notes, business case narrative
│   └── demo-engineer.md            # Demo packages, Apps Script configs, presenter guides
├── references/
│   ├── vertical-healthcare.md      # Healthcare vertical playbook
│   ├── vertical-financial-services.md
│   ├── vertical-retail.md
│   ├── vertical-manufacturing.md
│   ├── vertical-government.md
│   ├── vertical-telecom-media.md
│   ├── vertical-energy.md
│   ├── vertical-education.md
│   ├── vertical-transport-logistics.md
│   ├── data-ai-module.md           # AI/ML and data analytics reference (Vertex AI, BigQuery, Gemini)
│   ├── regulatory-frameworks.md    # GDPR, RODO, NIS2, DORA, HIPAA, PCI-DSS, SOX
│   ├── competitive-battlecards.md  # vs AWS, Azure, Microsoft 365
│   ├── objection-library.md        # 20 objection handlers with suggested responses
│   ├── pricing-models.md           # GCP and Workspace commercial models (last_verified: 2026-Q1)
│   └── business-cases.md           # ROI frameworks and business case templates
├── templates/
│   ├── pitch-executive-alignment.md
│   ├── pitch-discovery-followup.md
│   ├── pitch-proof-of-value.md
│   ├── pitch-competitive-displacement.md
│   └── pitch-renewal-expansion.md
├── scripts/
│   └── workspace-demo-provisioner.gs  # Apps Script for demo tenant setup
├── platform-adapters/
│   ├── gemini-cli-adapter.md       # Gemini CLI system prompt adapter
│   └── antigravity-adapter.md      # Google Antigravity agent config
├── examples/
│   └── novatech-logistics-sample-output.md  # Full sample output for a fictional logistics customer
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

Reference files are loaded progressively — only the files relevant to the current mode and industry are loaded per session. Files marked in `SKILL.md` as `(generated)` may not yet exist; the skill uses embedded knowledge and flags the gap transparently.

---

## Industry Verticals

| Vertical | Playbook File | Focus Areas |
|----------|--------------|-------------|
| Healthcare | `vertical-healthcare.md` | Patient data platforms, AI diagnostics, HIPAA/MDR compliance, clinical workflow automation |
| Financial Services | `vertical-financial-services.md` | Core banking modernisation, fraud detection, DORA compliance, real-time payments infrastructure |
| Retail & E-commerce | `vertical-retail.md` | Demand forecasting, personalisation at scale, omnichannel inventory, Google Ads integration |
| Manufacturing | `vertical-manufacturing.md` | Industry 4.0, predictive maintenance, digital twin, supply chain visibility |
| Government & Public Sector | `vertical-government.md` | Sovereign cloud, data residency, e-government platforms, NIS2/RODO, public procurement rules |
| Telecom & Media | `vertical-telecom-media.md` | 5G data pipelines, content recommendation, ad monetisation, BSS/OSS modernisation |
| Energy & Utilities | `vertical-energy.md` | Smart grid analytics, carbon tracking, SCADA data integration, energy trading platforms |
| Education & EdTech | `vertical-education.md` | Google Workspace for Education, LMS integration, student outcome analytics, campus security |
| Transport & Logistics | `vertical-transport-logistics.md` | Route optimisation, fleet telematics, last-mile analytics, postal digitalisation |

---

## Agent Roster

| Agent | Role | Invocable by User |
|-------|------|-------------------|
| `session-manager` | Parses intent, collects inputs, routes modes, manages cross-session continuity | No — spawned by skill |
| `customer-researcher` | OSINT, account profiling, technology stack hypothesis, confidence rating | No — spawned by session-manager |
| `solution-architect` | Maps pain points to GCP/Workspace products, designs reference architecture, maps regulatory compliance | No — spawned by session-manager |
| `pitch-designer` | Generates pitch deck content by persona, speaker notes, competitive positioning, objection handlers | No — spawned by session-manager |
| `demo-engineer` | Produces demo materials, Apps Script provisioning configs, presenter scripts, follow-up assets | No — spawned by session-manager |

Agents run sequentially by default. `customer-researcher` and initial input processing run in parallel. `pitch-designer` and `demo-engineer` can run in parallel once `solution-architect` completes.

---

## Demo Environment

The `scripts/workspace-demo-provisioner.gs` Apps Script creates a fully configured Google Workspace demo tenant using only fictional data. On execution it:

1. Creates a set of fictional user accounts and organisational units matching the customer's company structure
2. Populates Google Drive with sample documents, spreadsheets, and presentations relevant to the customer's industry
3. Configures Gmail labels, filters, and sample email threads that mirror realistic business workflows
4. Sets up a Meet calendar with demo session placeholders

Run it from Google Apps Script editor against your demo GCP project. The script is parameterised — pass the customer's industry vertical and company size tier to generate appropriately scaled content.

No real customer data is ever used. All names, figures, and documents in the demo environment are fictional.

---

## Contributing

Contributions are welcome. The most useful contributions are new industry playbooks, updated competitive battlecards, and additional objection handlers.

### Adding a new industry playbook

1. Copy an existing vertical file (e.g., `references/vertical-retail.md`) as your starting template
2. Fill in all sections: Market Context, Top Pain Points, Relevant Google Products, Typical Deal Profile, Compliance Landscape, Top 3 Use Cases, Killer Demo Scenario, Competitive Landscape, Macro Trends, Discovery Questions
3. Add a row to the Industry Verticals table in this README
4. Add the routing rule to `SKILL.md` under "Reference File Routing"
5. Open a PR with the description: `feat(vertical): add [industry] playbook`

### Updating competitive battlecards

Edit `references/competitive-battlecards.md`. Add `last_verified: YYYY-MM-DD` to each claim you update. Avoid FUD — all claims must be factual and sourced.

### Adding objection handlers

Edit `references/objection-library.md`. Use the existing format: `Objection | Root Cause | Response | Supporting Evidence`. Add a `last_verified` date.

### Updating pricing

Edit `references/pricing-models.md`. Always update the `last_verified` date at the top of the file. Do not include internal Google discounts or deal terms.

### PR process

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-change-description`
3. Make your changes
4. Open a pull request with a clear description of what changed and why
5. Reference any Google Cloud documentation you used as source

Please read `CONTRIBUTING.md` for the full contribution guide and Code of Conduct reference.

---

## Maintenance

This skill follows a quarterly update cycle:

- **Pricing and commercials** (`pricing-models.md`) — reviewed each quarter; `last_verified` date is mandatory
- **Competitive battlecards** — reviewed when major AWS/Azure/Microsoft announcements occur or quarterly, whichever comes first
- **Vertical playbooks** — reviewed annually or when a major regulatory change affects the vertical
- **Regulatory frameworks** — reviewed when new legislation comes into force (e.g., NIS2 implementing acts, DORA RTS updates)

Community PRs for accuracy corrections are merged continuously. If you spot an outdated claim, open an issue with the label `accuracy` and a link to the current source.

---

## License

Copyright 2026 Kacper Ptasinski

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.

---

## Credits

Built by [Kacper Ptasinski](https://github.com/kacperptasinski).

Powered by [Claude Code](https://claude.ai/claude-code).

Knowledge base informed by [Google Cloud official documentation](https://cloud.google.com/docs), [Google Workspace Admin Help](https://support.google.com/a), and publicly available Google Cloud architecture reference guides.

This project is not affiliated with, endorsed by, or sponsored by Google LLC. Google Cloud, Google Workspace, BigQuery, Vertex AI, and Gemini are trademarks of Google LLC.
