# GCP Sales Enablement Skill — User Guide

**For Google Cloud sellers, account managers, and customer engineers.**

---

## What This Skill Does

This skill is your AI-powered sales assistant for Google Cloud and Google Workspace. Tell it who you are meeting with and what you need, and it handles the rest — researching the company, mapping their challenges to GCP solutions, building pitch materials, and generating complete demo environments. You do not need to be technical to use it. Speak to it the way you would speak to a very well-prepared colleague.

---

## Getting Started

### Install for Claude Code

1. Open your terminal.
2. Navigate to your skills directory:
   ```
   cd ~/.claude/skills
   ```
3. Clone the skill:
   ```
   git clone https://github.com/your-org/gcd-skill.git gcp-sales-enablement
   ```
4. In Claude Code, run:
   ```
   /skills load gcp-sales-enablement
   ```

### Install for Gemini CLI

1. Clone the skill to your Gemini skills folder:
   ```
   git clone https://github.com/your-org/gcd-skill.git ~/.gemini/skills/gcp-sales-enablement
   ```
2. Add to your Gemini CLI config (`~/.gemini/config.yaml`):
   ```yaml
   skills:
     - path: ~/.gemini/skills/gcp-sales-enablement
   ```
3. Restart Gemini CLI.

### Install for Google Antigravity

1. Open your Antigravity workspace.
2. Go to **Settings > Skills > Add Skill**.
3. Paste the repository URL: `https://github.com/your-org/gcd-skill`
4. Click **Install**. The skill activates immediately.

### Try This Right Now

Once installed, paste this into your chat:

```
Research Orlen for Google Cloud — I have a first meeting with their IT Director next week.
```

The skill will research the company, identify GCP opportunities, and give you a structured account profile with solution recommendations — in about 60 seconds.

---

## Mode 1: Research a Customer

### When to Use It

Use this mode before any customer interaction where you need to understand the company:

- Preparing for a first discovery call
- Getting ready for a Quarterly Business Review (QBR)
- Taking over a new account and needing to get up to speed fast
- Responding to an inbound lead you know nothing about yet
- Building context before writing a cold outreach email

### What to Say — 10 Example Prompts

**1. Standard first-meeting prep**
```
Research Poczta Polska for Google Cloud opportunities
```
Gets you: company overview, headcount, estimated IT spend, known pain points, and top GCP product recommendations.

**2. Focused on a specific topic**
```
What do we know about KGHM? Focus on their AI readiness
```
Directs the research toward AI/ML maturity signals — recent data initiatives, digital transformation news, technology partnerships.

**3. Meeting with a specific executive**
```
Analyze PKO Bank Polski — I have a meeting with their CISO next week
```
Tailors the output to security and compliance topics relevant to a CISO: DORA, NIS2, Chronicle, Security Command Center.

**4. Competitive displacement**
```
Research Allegro — they're on AWS, considering GCP for data analytics
```
Frames the profile around AWS-to-GCP migration angles, BigQuery vs Redshift positioning, and switching cost analysis.

**5. Workspace-focused account**
```
Profile Zabka for Google Workspace — 10,000 employees, retail
```
Focuses on collaboration and productivity needs, M365 or on-prem email signals, and Workspace ROI angles for large retail workforces.

**6. Sector mapping (no specific company)**
```
What GCP products fit the Polish government sector?
```
Returns a sector overview: public cloud procurement rules, JST requirements, Sovereign Cloud options, and top use cases.

**7. Regulatory compliance mapping**
```
Map NIS2 compliance requirements for a Polish energy company
```
Maps the NIS2 directive to specific GCP security and infrastructure controls, with gaps and recommended products.

**8. Industry-specific AI use cases**
```
Research Carrefour Poland — focus on retail AI use cases
```
Returns retail-specific AI opportunities: demand forecasting, personalization, supply chain optimization, and relevant Vertex AI products.

**9. Quick company snapshot**
```
Intel on CD Projekt RED — gaming, 1200 employees
```
Fast profile: company size, known cloud signals, relevant GCP products for gaming and media.

**10. Urgent meeting prep**
```
Quick profile of Orlen for a first meeting tomorrow
```
Prioritizes speed: short summary, top 3 GCP angles, and 5 discovery questions to ask in the meeting.

### What You Get Back

Every research output includes:

- **Company snapshot** — industry, headcount estimate, revenue band, HQ location, legal entity type
- **Digital signals** — recent tech news, job postings, cloud-related announcements
- **Pain point hypothesis** — inferred challenges based on industry and company profile
- **GCP/Workspace fit** — ranked product recommendations with rationale
- **Recommended approach** — which meeting type, deck template, and narrative angle to use
- **Open questions** — what to verify in the first call
- **Confidence level** — how much of this is confirmed vs inferred

### Pro Tips

The more context you give, the better the output. Compare these two:

- "Research PKN Orlen" — good
- "Research PKN Orlen — 50,000 employees, SAP ERP, moving to hybrid cloud, meeting with Group CTO and two IT Directors, they asked specifically about AI and sustainability" — much better

You can add context you already know:
- Their current technology stack: "they're on SAP and Microsoft"
- Meeting stage: "we're at discovery / we're at proof of value / we're closing"
- What they asked about: "they mentioned data residency concerns"
- Internal intel: "our champion says the CTO wants to reduce vendor lock-in"

### Output Formats

By default, research comes back as structured text you can read in the chat.

For a formatted file:
- "Generate this as a PDF" — produces a formatted research report PDF
- "Export as PDF" — same result

> Tip: Say "generate as PPTX" or "export as PDF" for formatted file output.

---

## Mode 2: Build a Pitch

### When to Use It

Use this mode when you need actual presentation materials:

- Preparing slides for a customer presentation or executive briefing
- Building a business case to support procurement approval
- Creating a competitive response when the customer is evaluating AWS or Azure
- Writing a one-pager or executive overview to leave behind after a meeting
- Generating ROI analysis to support a renewal or expansion conversation

### What to Say — 10 Example Prompts

**1. Executive pitch for a specific deal**
```
Build a pitch deck for KGHM targeting their CTO — they need data analytics and predictive maintenance
```
Generates full deck content: title, agenda, problem statement, solution slides, architecture overview, business value, and next steps.

**2. Large workforce Workspace pitch**
```
Create an executive overview for Poczta Polska — 80,000 employees, migrating from Exchange
```
Produces an executive-level Workspace pitch focused on migration value, total cost of ownership, and collaboration benefits at scale.

**3. Competitive displacement**
```
Build a competition win deck for a bank moving from Azure to GCP
```
Structures the narrative around Azure-to-GCP migration advantages: data sovereignty, BigQuery vs Synapse, security posture comparison, Google's banking references.

**4. First meeting intro deck**
```
Create a quick intro deck for a first meeting with a retail CTO
```
Short, punchy deck: Google Cloud overview, retail-specific use cases, 3 proof points, and clear next step.

**5. Workspace ROI business case**
```
Build an ROI business case for Google Workspace — 5000 users, currently on M365 E3
```
Generates a cost comparison model, productivity improvement estimates, and TCO analysis positioned against M365.

**6. Industry solution pitch**
```
Pitch Google Cloud to a manufacturing CIO — they're on SAP, want Industry 4.0
```
Focuses on SAP-on-GCP, manufacturing AI use cases, Google's Industry 4.0 partners, and predictive maintenance examples.

**7. Security and compliance pitch**
```
Create a security-focused pitch for a CISO at a financial services company under DORA**
```
Leads with DORA compliance posture, Chronicle SIEM, Security Command Center, and Google's financial services references.

**8. Technical migration deep-dive**
```
Build a technical deep-dive deck for an AWS-to-GCP data platform migration
```
Architect-level content: migration path, BigQuery vs Redshift, networking, IAM mapping, and estimated migration timeline.

**9. Localized pitch**
```
Create a Workspace pitch for a Polish logistics company — in Polish
```
Generates the entire deck in Polish, using Polish business terminology and Polish-market references.

**10. Side-by-side comparison**
```
Build a pitch comparing Google Workspace vs M365 for a 3000-person company
```
Structured comparison deck: feature parity, differentiators, pricing bands, and migration path.

### Customization Options

You can shape the output by adding parameters to any prompt:

**Persona targeting**
```
...targeting their CFO and IT Director
```

**Competitive framing**
```
...they're evaluating Azure and staying on-prem is also on the table
```

**Deck template**
```
...use the executive-overview template
...use the roi-business-case template
...use the competition-win template
...use the technical-deep-dive template
...use the quick-intro template
```

**Language**
```
...in Polish / po polsku
```

**Meeting stage**
```
...this is a second meeting, they've already seen the intro deck
```

### Output Formats

- "Generate as PPTX" — produces a PowerPoint file you can open and edit immediately
- "Create Google Slides" — generates an Apps Script you run in Google Workspace to create the presentation in your Drive
- "Export as PDF" — produces a formatted PDF for sharing or printing
- Default (no format specified) — structured markdown you can read and copy from

> Tip: Say "generate as PPTX" or "export as PDF" for formatted file output.

---

## Mode 3: Create Demo Materials

### When to Use It

Use this mode when you are preparing for a live product demonstration:

- Setting up a demo environment before a customer visit
- Creating realistic-looking sample data for a Workspace or GCP demo
- Building a presenter guide so you (or a colleague) can run the demo confidently
- Generating fallback content for when live demos do not cooperate
- Creating post-demo follow-up materials

### What to Say — 10 Example Prompts

**1. Full Workspace demo package**
```
Create demo materials for Google Workspace for a Polish logistics company with 5000 employees
```
Generates: sample company name, org structure, demo emails, documents, calendar events, and a presenter script — all themed around logistics.

**2. AI-focused demo environment**
```
Build a demo environment config for a healthcare company — focus on Gemini features
```
Produces: a configuration guide for a Gemini-in-Workspace demo, with healthcare-appropriate content (patient coordination, clinical summaries, etc.).

**3. Trainer guide for a mixed audience**
```
Generate a trainer guide for a 45-minute Workspace demo to IT Director and HR Director
```
Creates a minute-by-minute presenter guide with talking points tailored to both a technical and business audience in the same room.

**4. Localized demo content**
```
Create demo emails, docs, and calendar events for a retail company — in Polish
```
All demo content generated in Polish, with a Polish retail company persona, Polish names, and Polish business context.

**5. GCP data platform demo**
```
Build a full demo package for BigQuery — targeting a CTO at a bank
```
Generates: demo dataset description, query examples, dashboard mockup content, and a presenter script for a CTO audience.

**6. Automated environment provisioning**
```
Generate Apps Script to provision a demo Workspace tenant for a government agency
```
Produces a ready-to-run Apps Script that creates the demo emails, documents, calendar events, and shared drives automatically.

**7. Feature-specific demo script**
```
Create a demo narration script for Google Meet + Gemini features
```
Step-by-step narration: what to click, what to say, what to highlight, and how to handle the "what happens if the internet drops" moment.

**8. Migration demo**
```
Build demo materials showing migration from Exchange to Gmail
```
Creates a before/after narrative, a migration timeline slide, and a demo flow showing Gmail features relevant to an Exchange migrator.

**9. Complete demo logistics package**
```
Create a pre-demo checklist and fallback plan for a 60-minute presentation
```
Returns: room setup checklist, account verification steps, backup screenshot set, and a fallback talking track if the live demo fails.

**10. Post-demo follow-up**
```
Generate a post-demo follow-up email template for a manufacturing CTO
```
Produces a personalized follow-up email summarizing what was shown, addressing questions raised, and proposing clear next steps.

### What You Get

A full demo package typically includes:

- **Demo company persona** — fictional company name, industry, headcount, org chart snippet
- **Sample emails** — realistic inbox with 10-15 emails relevant to the use case
- **Sample documents** — Google Docs / Drive files with industry-appropriate content
- **Calendar content** — meetings, events, and invites that tell a story
- **Presenter guide** — minute-by-minute script with what to click and what to say
- **Pre-demo checklist** — setup steps, account verifications, backup plan
- **Post-demo follow-up template** — ready-to-send email after the session
- **Apps Script (if requested)** — automation to provision the whole environment in one click

### Output Formats

- "Generate the trainer guide as a PDF" — formatted PDF presenter guide
- "Create the demo environment using Apps Script" — runnable script for automated provisioning
- "Export the checklist as PDF" — formatted pre-demo checklist
- Default — structured markdown with all sections

> Tip: Say "generate as PPTX" or "export as PDF" for formatted file output.

---

## Quick Commands — Cheat Sheet

| What you want | What to say |
|--------------|-------------|
| Quick company research | "Research [company] for GCP" |
| Full pitch deck as PPTX | "Build a pitch for [company] targeting [persona] — generate as PPTX" |
| Competitive battlecard | "Google vs AWS battlecard for [industry]" |
| Demo content in Polish | "Create demo materials for [company] in Polish" |
| Compliance mapping | "Map [regulation] requirements for [company]" |
| Trainer guide as PDF | "Create a trainer guide for [company] demo — export as PDF" |
| Handle a common objection | "How do I handle 'we're already on Microsoft'?" |
| ROI business case | "Build an ROI business case for Workspace — [X] users, currently on M365" |
| Sector overview | "What GCP products fit [industry/sector]?" |
| Post-demo follow-up email | "Generate a post-demo follow-up email for [persona] at [company]" |
| Polish language output | "...in Polish" or "...po polsku" (add to any prompt) |
| Formatted PDF report | "...export as PDF" (add to any prompt) |

---

## Advanced Usage

### Chaining Modes

You can combine all three modes in a single request. The skill runs them in sequence:

```
Research KGHM, then build a pitch targeting their CTO, then create demo materials for a 90-minute session
```

This runs the full pipeline: research → solution mapping → pitch deck → demo package. Expect a thorough output that covers the whole meeting lifecycle.

### Specifying Output Format

Add a format instruction to any prompt:

```
Build a pitch for Orlen targeting their CDO — generate as PPTX
Research Allegro for GCP — export as PDF
Create a trainer guide for a Workspace demo — export as PDF
```

Supported formats:
- **PPTX** — "generate as PPTX", "create PowerPoint", "make slides"
- **PDF** — "generate as PDF", "export as PDF", "formatted report"
- **Google Slides** — "create Google Slides", "in Google Slides" (returns Apps Script)
- **Default** — structured markdown (no instruction needed)

### Language Switching

Add language to any prompt:

```
Build a pitch for Zabka — in Polish
Create demo emails for a logistics company — po polsku
Research Orlen for Google Cloud — output in English
```

Polish mode: all generated content switches to Polish. Product names (BigQuery, Vertex AI, Gmail) stay in English. Regulatory terms use Polish equivalents (RODO instead of GDPR).

### Competitive Context

Tell the skill who you are displacing:

```
...they're evaluating Azure
...they're an AWS shop considering GCP for data
...they're on-prem and looking at their first public cloud move
...we're competing against Microsoft for this Workspace deal
```

This shapes the competitive framing, battlecard content, and objection handling throughout the output.

### Multi-Persona Meetings

When multiple stakeholders are in the room, name them:

```
Build a pitch for PKO Bank — the meeting has CTO, CFO, and IT Director
Create a trainer guide for a session with IT Director and HR Director
```

The output will include persona-specific talking points and slide annotations for each stakeholder.

---

## Troubleshooting

**"The output is too generic"**
You need more context in your prompt. Add what you already know: current tech stack, meeting stage, specific pain points the customer mentioned, or who will be in the room. The skill cannot read your CRM — tell it what you know.

**"A reference file is missing for my industry"**
Specify the closest available vertical explicitly: "use the manufacturing vertical" or "treat this as a financial services account." The skill will apply the closest match.

**"The output came back in the wrong language"**
Say it explicitly: "in English" or "in Polish" / "po polsku." Do not rely on the language of your prompt to set the output language — be explicit.

**"I need a different deck structure"**
Specify the template by name:
- `executive-overview` — short, board-level, minimal technical detail
- `technical-deep-dive` — architecture-heavy, for CTO/architect audiences
- `roi-business-case` — cost and value focused, for CFO/procurement
- `quick-intro` — 6-8 slides, first meeting, brand and product overview
- `competition-win` — displacement narrative, side-by-side comparisons

**"The research confidence is low"**
The skill will tell you when data is thin. You have three options: use what exists with gaps flagged, use industry baseline defaults, or provide the missing information yourself. Choose option C if accuracy matters for this account.

**"The Apps Script did not run"**
Check that you are running it from an account with Google Workspace admin rights, or at minimum Drive and Gmail write permissions. Scripts that create Shared Drives require admin access.

**"I need the output faster"**
Use a Quick Command from the cheat sheet above, or ask for a "quick profile" or "quick intro deck" — these are optimized for speed over depth.
