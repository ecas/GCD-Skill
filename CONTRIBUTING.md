# Contributing to GCP Sales Enablement Skill

Thank you for contributing. This skill improves when industry knowledge, competitive positioning, and objection handling stay current. All contributions are welcome — from a single corrected pricing figure to a full new vertical playbook.

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold it.

---

## PR Process

1. Fork the repository
2. Create a branch from `main` with a descriptive name:
   - New playbook: `feat/vertical-agriculture`
   - Battlecard update: `update/battlecard-aws-2026-q2`
   - Bug or accuracy fix: `fix/pricing-bigquery-on-demand`
3. Make your changes
4. Open a pull request against `main` with:
   - A one-line title describing the change
   - A short description of what you changed and why
   - A `last_verified: YYYY-MM-DD` date for any factual claims you added or updated
   - Links to source documentation for any claims that are not common knowledge
5. A maintainer will review and merge or request changes

---

## Adding a New Industry Playbook

1. Copy an existing vertical file as your starting template:

   ```bash
   cp references/vertical-retail.md references/vertical-agriculture.md
   ```

2. Fill in all required sections in order. Do not leave placeholder text — if a section genuinely does not apply to the vertical, write a brief explanation of why.

   Required sections:
   - Market Context (macro picture, "why now" forcing function)
   - Top Pain Points (5–8 numbered, specific to the vertical)
   - Relevant Google Products (mapped to each pain point)
   - Typical Deal Profile (deal size range, sales cycle length, common stakeholders)
   - Compliance Landscape (regulations that affect cloud decisions in this vertical)
   - Top 3 Use Cases (with GCP architecture outline and example business outcome)
   - Killer Demo Scenario (one scenario that reliably impresses technical buyers)
   - Competitive Landscape (who is typically incumbent and why customers switch)
   - Macro Trends (3–5 trends that create urgency for cloud adoption)
   - Discovery Questions (10+ questions a seller can use in a first meeting)

3. Add the routing rule to `SKILL.md` under the "Reference File Routing" table so the skill loads the new file automatically.

4. Add a row to the Industry Verticals table in `README.md`.

5. Open a PR with the title: `feat(vertical): add [industry] playbook`

---

## Updating Competitive Battlecards

Edit `references/competitive-battlecards.md`.

- Add or update claims in the existing structure (one card per competitor: AWS, Azure, M365)
- Every claim must have a `last_verified: YYYY-MM-DD` annotation
- Link to the public source in a comment or footnote — do not rely on memory
- Avoid FUD. Do not make claims that cannot be supported by public documentation
- If a competitor has closed a gap that was previously a GCP advantage, update or remove that claim honestly

---

## Adding Objection Handlers

Edit `references/objection-library.md`. Use the existing four-column format:

```
| Objection | Root Cause | Suggested Response | Supporting Evidence |
```

- Write the objection as a seller hears it in the field, not in sanitised form
- Identify the root cause (fear of lock-in, prior bad experience, budget constraint, etc.)
- Keep the suggested response conversational, not a script to be read verbatim
- Add a `last_verified` date at the row level if the response depends on current pricing or features

---

## Updating Pricing

Edit `references/pricing-models.md`.

- Always update the `last_verified: YYYY-MM-DD` date at the top of the file when you make changes
- Do not include internal Google pricing, negotiated discounts, or deal terms of any kind
- Reference the public Google Cloud pricing calculator or published price lists only
- If a pricing model has changed fundamentally (e.g., a product moved from per-core to per-vCPU billing), note the change date and the old model briefly so sellers can explain changes to customers with existing contracts

---

## Updating Templates

Pitch deck templates live in `templates/`. Each template is a markdown file with slide-by-slide structure.

- Keep template sections general enough to work across industries
- Industry-specific content belongs in vertical playbooks, not templates
- If you add a new template, register it in `SKILL.md` under "Reference File Routing" and document it in `README.md`

---

## Updating the Apps Script Provisioner

`scripts/workspace-demo-provisioner.gs` must only use fictional data. Do not commit scripts that contain real customer names, real email addresses, or real company data of any kind.

Test changes against a personal or partner demo GCP project before opening a PR. Include the Workspace edition and Apps Script runtime version you tested against in the PR description.

---

## What Not to Contribute

- Internal Google pricing, discounts, or deal terms
- References to internal Google tools, systems, or processes
- Real customer names, case studies, or data (use fictional examples only)
- Claims about competitor products that are speculative or unverifiable
- Content generated entirely by AI without human review for accuracy
