# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2026-03-17

### Added
- Mining & Metals industry vertical playbook
- OT/Industrial protocol section in integration matrix

### Fixed
- Language auto-switch rule clarified (English input = English output)
- Removed deprecated IoT Core references (replaced with Pub/Sub + GDC Edge)
- Added SOE procurement note to customer-researcher agent
- Fixed slide count inconsistency in pitch-designer agent
- Removed *(generated)* tags from SKILL.md routing table

---

## [1.0.0] - 2026-03-17

### Added

- Initial release
- 3 skill modes: Research, Pitch, Demo
- 5 core agents: session-manager, customer-researcher, solution-architect, pitch-designer, demo-engineer
- 9 industry vertical playbooks: Healthcare, Financial Services, Retail, Manufacturing, Government, Telecom & Media, Energy & Utilities, Education, Transport & Logistics
- Competitive battlecards (vs AWS, Azure, M365)
- 20 objection handlers
- 5 pitch deck templates: executive alignment, discovery follow-up, proof-of-value, competitive displacement, renewal/expansion
- Demo environment provisioning via Apps Script
- Bilingual support (English + Polish)
- Platform adapters for Gemini CLI and Google Antigravity
- Regulatory frameworks reference: GDPR, RODO, NIS2, DORA, HIPAA, PCI-DSS, SOX
- Data & AI module reference covering Vertex AI, BigQuery, Gemini, and Looker
- Soft qualification gate with three confidence tiers (High, Medium, Low)
- Cross-session continuity via session state caching
- Parallel agent execution support for pitch-designer and demo-engineer
