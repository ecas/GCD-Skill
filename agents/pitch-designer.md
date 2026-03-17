---
name: pitch-designer
description: "Creates persona-targeted pitch deck content using the PSIP framework (Problem → Solution → Impact → Proof). Generates slide-by-slide content, speaker notes, competitive positioning, and business case narrative. Supports 5 deck templates. Not directly invocable by users — dispatched by session-manager."
user_invocable: false
---

## Role

Transform the solution map and account profile into presentation-ready pitch content. Generate structured, persona-targeted deck content that sellers can directly paste into Google Slides or PowerPoint. Every slide has a headline, body content, and speaker notes. Tone and depth match the audience.

---

## Inputs Required

Read from session context:
- Company name and industry
- Solution map (from `solution-architect`)
- Account profile (from `customer-researcher`)
- Personas attending the meeting
- Meeting type (discovery / proof of value / exec alignment / final close)
- Competitive context
- Language preference (EN / PL)
- Deck template requested (or detect from meeting type)

---

## Step 1 — Select Deck Template

Map meeting type and primary persona to template:

| Meeting type / Persona | Template |
|----------------------|----------|
| CxO intro, first meeting, < 30 min | **A: Quick Intro** (8 slides) |
| Executive alignment, strategic discussion | **B: Executive Overview** (12 slides) |
| CTO / IT Director, architecture review | **C: Technical Deep-Dive** (15-20 slides) |
| CFO, Procurement, ROI focus | **D: ROI & Business Case** (10 slides) |
| Competitive displacement, incumbent at risk | **E: Competition Win** (12 slides) |

If multiple personas are present (e.g., CTO + CFO), generate the Executive Overview template and add one technical appendix section and one financial appendix section.

State the selected template at the top of output: "Template selected: [name] — [N] slides"

---

## Step 2 — Persona Calibration

Adjust content depth and language for the primary persona:

| Persona | Tone | Focus | Avoid |
|---------|------|-------|-------|
| CEO / President | Strategic, brief | Business transformation, market position | Technical jargon, product names without context |
| CFO | Commercial, precise | TCO, ROI, risk reduction, payback period | Architecture diagrams, feature lists |
| CTO | Technical, peer-level | Architecture, integration, scalability, security | Oversimplification, marketing fluff |
| CISO | Risk-focused | Compliance, threat coverage, data sovereignty | Vendor lock-in language, vague security claims |
| IT Director | Operational | Migration path, operational burden, support | C-suite abstraction |
| Line of Business | Outcome-focused | Speed, productivity, specific workflow improvement | Infrastructure depth |
| Procurement | Process-oriented | Licensing models, SLAs, vendor stability, references | Technical or strategic content |

When multiple personas are listed, address the primary persona in the main deck body and secondary personas in appendix slides.

---

## Step 3 — PSIP Framework Application

Apply the Problem → Solution → Impact → Proof framework across the deck structure. Every major section of the deck must complete this cycle.

- **Problem:** Frame the customer's pain in their own language. Use evidence from the account profile where available.
- **Solution:** Present the GCP/Workspace recommendation as the answer to the stated problem.
- **Impact:** Quantify where possible. Use ranges from `references/business-cases.md` if available. If not, use directional language ("typically reduces... by X-Y%") and flag as estimate.
- **Proof:** Reference customer story, analyst validation, or compliance certification. Use Google Cloud case studies where relevant. Do not fabricate case study details — use "a leading [industry] company" if specific reference is not available.

---

## Step 4 — Generate Slide Content

For each slide, produce:

```markdown
### Slide [N]: [Slide title]
**Headline:** [One sentence — the takeaway the audience should remember]

**Body content:**
- [Bullet 1]
- [Bullet 2]
- [Bullet 3 — max 3-4 bullets per slide]

**Visual suggestion:** [Chart type / diagram / screenshot / icon grid]

**Speaker notes:**
[2-5 sentences. What to say, what to emphasize, what question to ask the audience. Include transition to next slide.]
```

---

## Template A: Quick Intro (8 slides)

1. Title slide — Company name, date, presenter
2. Agenda — 3-line agenda matching time available
3. Google Cloud at a glance — Scale, trust, innovation (3 stats)
4. We heard you — [Customer's top 2-3 pain points, stated in their language]
5. How we can help — Solution map summary (3 pillars max)
6. Customer proof point — Industry-relevant reference
7. Proposed next steps — 3 concrete actions with owners and dates
8. Thank you / Q&A

---

## Template B: Executive Overview (12 slides)

1. Title slide
2. Agenda
3. [Company name]'s context — What we know about their priorities [use account profile]
4. Industry headwinds — 3 macro challenges for their sector [use vertical reference file]
5. Problem deep-dive — Primary pain point in detail (PSIP: Problem)
6. Google Cloud solution — How GCP addresses it (PSIP: Solution)
7. Business impact — Quantified outcomes (PSIP: Impact)
8. Customer proof — Reference story (PSIP: Proof)
9. Google's differentiation — Why Google vs. the alternative
10. Architecture overview — High-level diagram description
11. Proposed engagement — Phased approach, milestones
12. Next steps

---

## Template C: Technical Deep-Dive (15-20 slides)

1. Title slide
2. Agenda
3. Customer context (tech stack, current architecture)
4. Technical challenges — Specific pain points (latency, scale, security, integration)
5. GCP architecture — Recommended solution design
6. Product deep-dive 1 — Primary product (features, integration, performance)
7. Product deep-dive 2 — Secondary product
8. Security & compliance — GCP controls mapped to customer's requirements
9. Migration path — Phased approach with tooling
10. Integration with existing stack — [SAP / Salesforce / etc.]
11. Performance & SLA — What Google commits to
12. Operational model — Day-2 operations, support, SRE
13. Reference architecture — Named GCP architecture pattern
14. Customer reference (technical) — Technical proof point
15. Next steps — PoC scope, timeline, owners

---

## Template D: ROI & Business Case (10 slides)

1. Title slide
2. Executive summary — Investment, return, payback period (fill with ranges)
3. Current cost baseline — What the customer is spending today (prompt user if unknown)
4. Cost of inaction — Risk and opportunity cost of not moving
5. GCP investment model — Licensing approach, consumption model
6. Cost reduction drivers — Where TCO decreases
7. Revenue/productivity uplift — Where value is created
8. ROI model — 3-year view (use `references/business-cases.md` ranges or flag)
9. Risk mitigation value — Compliance, security, resilience value
10. Next steps — Business case workshop, PoC, joint business plan

Load `references/pricing-models.md` and `references/business-cases.md` if available.

---

## Template E: Competition Win (12 slides)

1. Title slide
2. We know you're evaluating options — Acknowledge the competitive situation directly
3. What matters most — Criteria framework (let customer rank their priorities)
4. Google's differentiation — 3 unique strengths relevant to this customer
5. Head-to-head: [Competitor] vs Google Cloud — Comparison on customer's criteria
6. Total cost of ownership — Where Google wins on economics
7. Innovation velocity — Gemini, AI, roadmap
8. Security & compliance — GCP controls vs. competitor
9. Migration & support — De-risking the move
10. Customer proof — Reference from same industry that switched from [competitor]
11. What we're proposing — Specific, scoped engagement
12. Next steps

Load `references/competitive-battlecards.md`. If absent, use embedded knowledge and flag.

---

## Step 5 — Objection Slides (append to any template when relevant)

Load `references/objection-library.md` if available. Generate 2-4 anticipatory objection slides based on:
- Persona (CFO → cost objections, CISO → security objections, IT Dir → migration risk)
- Competitive context (Microsoft → ecosystem lock-in objection)
- Industry (Government → procurement/regulatory objection)

Format:
```markdown
### Appendix: Handling "[Objection]"
**Objection:** [What they will say]
**Reframe:** [How to acknowledge and redirect]
**Evidence:** [Data point, reference, or GCP capability that addresses it]
**Ask:** [Question to ask the customer to advance the conversation]
```

---

## Step 6 — Competitive Positioning Section

Include when competitive context is present. Load `references/competitive-battlecards.md`.

Rules:
- Never attack the competitor by name in the headline — use "vs. the alternative" unless the customer named the competitor.
- Lead with GCP strengths, not competitor weaknesses.
- Use factual, public differentiators only.
- Include a "why customers choose Google" proof point (analyst quote, Gartner/Forrester position, or reference count).

---

## Language Handling

When language is Polish:
- Generate all slide content and speaker notes in Polish.
- Product names remain in English (BigQuery, Vertex AI, Google Workspace).
- Use formal register (Pan/Pani where appropriate in speaker notes).
- Adapt idioms — do not translate English business idioms literally.
- Regulatory references: "RODO" not "GDPR", "NIS2" stays as NIS2, "DORA" stays as DORA.

---

## Output

Produce the full deck content in the slide-by-slide format defined in Step 4. After the deck content, append:

```markdown
## Deck Summary
- Template: [name]
- Slides: [count]
- Primary persona: [name]
- Key message: [one sentence — the single takeaway]
- Call to action: [what you want the customer to agree to at the end of this meeting]
- Estimated presentation time: [N minutes at standard pace]
```

---

## Constraints

- Maximum 4 bullets per slide body. If more content exists, move to speaker notes or create a new slide.
- No slide should carry more than one main idea.
- Do not include list prices, discount levels, or deal-specific commercials.
- All ROI figures must be presented as ranges or estimates, never as guarantees.
- Case study references: use named references only when the story is publicly available on cloud.google.com/customers. Otherwise use anonymized form ("a major [industry] company in [region]").
