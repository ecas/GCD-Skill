# Demo Material Template: Google Calendar Event Templates
# Purpose: Demonstrates Calendar creation, Meet link generation, room booking, color coding
# Parameters: {company}, {department}, {person}, {date}, {domain}
# All content is fictional.

---

## Usage Instructions

Each event template specifies:
- **Title** — Event name as it appears on calendar
- **Type** — Calendar event type for color coding
- **Duration** — Default length
- **Attendees** — Role-based (map to your demo employee list)
- **Location** — Google Meet (auto-generated) or physical room
- **Description** — Pre-filled event body
- **Color code** — Google Calendar color (Tomato/Flamingo/Tangerine/Banana/Sage/Basil/Peacock/Blueberry/Lavender/Grape/Graphite)
- **Recurrence** — If repeating

---

## Event 1: Company All-Hands

**Title:** {company} All-Hands — {month} {year}
**Type:** Company-wide meeting
**Duration:** 60 minutes
**Attendees:** all@{domain} (entire company)
**Location:** Google Meet — auto-generated link | Physical: Main Conference Room / HQ Auditorium
**Color:** Tomato (red — high visibility)
**Recurrence:** Monthly, last Thursday 14:00–15:00

**Description:**
```
{company} Monthly All-Hands

Agenda:
• CEO update — company performance & priorities (15 min)
• Department highlights — {department heads} (20 min)
• Customer spotlight / wins (10 min)
• Open Q&A (15 min)

Format: Hybrid — {office_location} + Google Meet
Slides: [Link to this month's All-Hands deck in Google Slides]
Q&A: Submit questions in advance via this form: [Google Form link]
Recording: This meeting will be recorded and posted to the #all-hands Chat space

Please join 2 minutes early to minimize late starts.
```

---

## Event 2: Weekly 1:1

**Title:** 1:1 — {manager} / {person}
**Type:** Regular 1:1
**Duration:** 30 minutes
**Attendees:** {manager}@{domain}, {person}@{domain}
**Location:** Google Meet — auto-generated link
**Color:** Peacock (teal)
**Recurrence:** Weekly, every Tuesday 10:00–10:30

**Description:**
```
Weekly 1:1 — {manager} + {person}

Running notes doc: [Shared Google Doc link — both can edit]

Typical agenda (owner drives):
• What I'm focused on this week
• Blockers I need help with
• Career / development topics
• Feedback in both directions

This calendar invite has a standing doc. Please add agenda items before the meeting.
Cancel if you have nothing — don't waste each other's time.
```

---

## Event 3: Project Kickoff Meeting

**Title:** Kickoff: {project_name} — Phase 1
**Type:** Project meeting
**Duration:** 90 minutes
**Attendees:** {project_team} — {manager}@{domain}, {person}@{domain}, {tech_lead}@{domain}, {vendor_contact}@{vendor_domain}
**Location:** Google Meet + {large_meeting_room} (hybrid)
**Color:** Basil (dark green)
**Recurrence:** One-time

**Description:**
```
Project Kickoff: {project_name} — Phase 1

Welcome to the official start of {project_name}!

Agenda:
09:00 — Welcome & introductions (10 min)
09:10 — Project overview & charter walkthrough (20 min)
09:30 — Roles, responsibilities & RACI matrix (15 min)
09:45 — Technical architecture overview (20 min)
10:05 — Timeline & milestones (15 min)
10:20 — Risk register walkthrough (10 min)
10:30 — Open questions & next steps (15 min)
10:45 — Close

Pre-reading (required):
• Project Charter v1.0: [Google Doc link]
• Architecture Overview: [Google Slides link]

Post-meeting:
• Action items will be captured in the project space
• First status meeting: {date + 1 week}, same time

Questions? Contact {manager}@{domain}
```

---

## Event 4: Security Review Board

**Title:** Security Review — {project_name} Architecture Sign-Off
**Type:** Governance / Review
**Duration:** 60 minutes
**Attendees:** {ciso}@{domain}, {security_architect}@{domain}, {tech_lead}@{domain}, {manager}@{domain}
**Location:** Google Meet
**Color:** Tomato (red — governance)
**Recurrence:** As needed — project-triggered

**Description:**
```
Security Architecture Review: {project_name}

Purpose: Review and approve the security architecture for {project_name} prior to
Phase 1 production deployment.

Agenda:
• Architecture overview (10 min) — presented by {tech_lead}
• Threat model walkthrough (15 min)
• IAM & access control design (10 min)
• Data classification & handling (10 min)
• Compliance mapping ({regulation}) (10 min)
• Open questions & approval decision (5 min)

Required pre-reading:
• Security Architecture Document: [Google Doc link]
• Threat Model: [Google Doc link]
• Compliance Matrix: [Google Sheets link]

Outcomes:
☐ Approved — proceed to production
☐ Conditionally approved — remediation items must be resolved before go-live
☐ Rejected — re-architecture required

Approval recorded in: Security Review Register (Google Sheet)
```

---

## Event 5: External Customer Meeting

**Title:** {company} × {customer_company} — Quarterly Business Review
**Type:** External meeting
**Duration:** 90 minutes
**Attendees:** {manager}@{domain}, {account_manager}@{domain}, {customer_contact}@{customer_domain}
**Location:** Google Meet | Optional physical: {customer_office} or {company_office}
**Color:** Flamingo (pink — external)
**Recurrence:** Quarterly

**Description:**
```
Quarterly Business Review: {company} × {customer_company}

Agenda:
1. Welcome & introductions (5 min)
2. Q{n} performance review — {customer_company} (20 min)
3. Support & service feedback (15 min)
4. Roadmap preview — {company} Q{n+1} (20 min)
5. Joint priorities for next quarter (20 min)
6. AOB & close (10 min)

Materials:
• QBR deck (sent in advance): [Google Slides link]
• Account health dashboard: [Looker Studio link]

Meeting etiquette:
• Recording: Will be offered — customer confirmation required
• Follow-up: Action items sent within 24 hours

For {company} attendees: Internal prep call at {date}, {time - 30 min}
```

---

## Event 6: Training Session

**Title:** Training: Google Workspace Essentials — Cohort {n}
**Type:** Training / L&D
**Duration:** 90 minutes
**Attendees:** {training_participants} (list from HR system)
**Location:** Google Meet
**Color:** Banana (yellow — learning)
**Recurrence:** One-time per cohort; series of 3 cohorts

**Description:**
```
Google Workspace Essentials Training

Cohort {n} of 3 | {n} participants

What you'll learn today:
• Gmail: Labels, filters, smart replies, Gemini drafting
• Google Drive: Folder structure, sharing permissions, version history
• Google Docs: Collaboration, comments, suggestion mode
• Google Meet: Controls, recording, breakout rooms, transcription
• Google Chat: Spaces, threads, huddles, file sharing

Format: Interactive — bring questions and real use cases
Materials: All exercises use your live {company} environment
Recording: Posted to the #workspace-training space after the session

No experience required. All levels welcome.

Facilitator: {trainer_name} | Support: {it_contact}
```

---

## Event 7: Quarterly Business Review (Internal)

**Title:** {department} QBR — Q{n} {year}
**Type:** Internal review
**Duration:** 120 minutes
**Attendees:** {department_leadership}@{domain}, {ceo}@{domain}, {cfo}@{domain}, {cto}@{domain}
**Location:** Google Meet + {boardroom}
**Color:** Grape (purple — strategic)
**Recurrence:** Quarterly

**Description:**
```
{department} Quarterly Business Review — Q{n} {year}

Presenter: {manager}
Audience: Leadership team

Format:
• 60 minutes: Presentation (no interruptions — questions held to end)
• 30 minutes: Q&A and discussion
• 30 minutes: Priority-setting for Q{n+1}

Pre-read (mandatory before the meeting):
• QBR Report: [Google Doc link]
• KPI Dashboard: [Looker Studio link]
• Budget Variance Report: [Google Sheets link]

Please review these before the meeting — we will not recap slides in the room.
Come ready to discuss and decide.

DRI for this meeting: {manager}
```

---

## Event 8: Daily Standup

**Title:** {team_name} Daily Standup
**Type:** Team sync
**Duration:** 15 minutes
**Attendees:** {team_members}@{domain}
**Location:** Google Meet — permanent link (same link every day)
**Color:** Sage (green — team)
**Recurrence:** Monday–Friday, 09:30–09:45 (skip public holidays)

**Description:**
```
{team_name} Daily Standup

Format: Each person answers three questions (90 seconds each):
1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers?

Rules:
• Start on time — latecomers catch up asynchronously
• Blockers are raised here; solutions are discussed outside standup
• Skip the call, post async in #{team_name}-standup if you're OOO

Notes: Bot posts standup summary to #{team_name}-standup after the call
Sprint board: [Google Sheets / Jira link]
```

---

## Event 9: Customer Interview / Discovery

**Title:** Discovery Call — {prospect_company} — {contact_name}
**Type:** Sales / Customer Research
**Duration:** 45 minutes
**Attendees:** {ae}@{domain}, {ce}@{domain}, {prospect_contact}@{prospect_domain}
**Location:** Google Meet
**Color:** Tangerine (orange — sales/opportunity)
**Recurrence:** One-time

**Description:**
```
Discovery Call: {prospect_company}

Contact: {contact_name}, {contact_title}
Account owner: {ae_name}
Customer engineer: {ce_name}

Our objectives for this call:
1. Understand {prospect_company}'s current environment and priorities
2. Identify top 2–3 technology pain points
3. Qualify fit for Google Cloud / Workspace
4. Agree next step (if fit confirmed)

Questions we plan to explore:
• What does your current infrastructure look like?
• What are your top technology priorities for the next 12 months?
• What's driving those priorities?
• Are you currently evaluating any cloud providers?
• Who else is involved in technology decisions?

Internal prep: AE to share research brief before the call
CRM: Update Salesforce / CRM opportunity after the call
Next step options: Technical deep-dive / executive intro / POC / no fit
```

---

## Event 10: Budget Review

**Title:** {year} Budget Review — {department} — Final Sign-Off
**Type:** Finance / Governance
**Duration:** 60 minutes
**Attendees:** {cfo}@{domain}, {manager}@{domain}, {ceo}@{domain}
**Location:** Google Meet + {finance_meeting_room}
**Color:** Graphite (grey — finance/governance)
**Recurrence:** Annual + ad-hoc for significant changes

**Description:**
```
{year} Budget Review: {department}

Purpose: Final review and approval of {department} budget for {year}

Agenda:
• Budget summary — {manager} (10 min)
• CFO questions & challenges (20 min)
• Sensitivity & scenario analysis (10 min)
• Approval decision (10 min)
• Communication plan (10 min)

Required materials (distributed 48 hours before meeting):
• Budget Proposal: [Google Doc link]
• Financial Model: [Google Sheets link]
• Prior year actual vs. budget variance: [Google Sheets link]
• Business case for key investments: [Google Slides link]

Approval authority:
• Up to €{threshold}: CFO approval
• Above €{threshold}: CFO + CEO approval required
• Board approval trigger: Capital expenditure above €{board_threshold}

Decision will be recorded in the Budget Approval Register and communicated
to the {department} team by {date + 2 days}.
```

---

## Color Coding Reference for Demo

| Color | Use Case |
|-------|---------|
| Tomato (red) | All-hands, governance, security reviews |
| Flamingo (pink) | External meetings, customer-facing |
| Tangerine (orange) | Sales, commercial, opportunity-related |
| Banana (yellow) | Training, learning & development |
| Sage (light green) | Team standups, regular syncs |
| Basil (dark green) | Project meetings, delivery milestones |
| Peacock (teal) | 1:1 meetings, personal |
| Blueberry (dark blue) | Executive, strategic |
| Lavender (light purple) | HR, people ops |
| Grape (purple) | QBRs, quarterly planning |
| Graphite (grey) | Finance, budget, contracts |
