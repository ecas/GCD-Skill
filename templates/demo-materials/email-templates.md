# Demo Material Template: Email Scenarios
# Purpose: Gmail demo population — realistic business email threads
# Parameters: {company}, {department}, {person}, {domain}
# All content is fictional. Use fictional company names and domains only.

---

## Usage Instructions

Replace parameters before running the Apps Script generator:
- `{company}` — Company name (e.g., "NovaTech Logistics")
- `{department}` — Department name (e.g., "Operations", "Finance", "IT")
- `{domain}` — Email domain (e.g., "novatech.example")
- `{person}` — Named employee (e.g., "Anna Kowalski")
- `{manager}` — Manager name (e.g., "Marcin Wiśniewski")
- `{date}` — Formatted date (e.g., "March 17, 2026")

---

## Scenario 1: Project Kickoff

**Thread subject:** Project Kickoff: {company} Digital Transformation Initiative — Phase 1

**Email 1 (Sender: {manager}, To: project-team@{domain}, CC: cto@{domain})**
```
Hi team,

I'm excited to officially kick off Phase 1 of our Digital Transformation Initiative.

This first phase will focus on migrating our core infrastructure and enabling the data platform that will underpin our analytics roadmap for 2026–2027.

Key dates:
- Kickoff workshop: {date + 3 days}
- Architecture review: {date + 2 weeks}
- Phase 1 go-live: {date + 12 weeks}

Please review the attached project charter before our workshop. I've shared it in the Project Team space — you should already have access.

{manager}
Head of IT, {company}
```

**Email 2 (Reply from {person}, To: {manager})**
```
Hi {manager},

Thanks for the update. I've reviewed the charter and have a few questions about the network topology assumptions in section 3.2.

Can we add 30 minutes to the kickoff workshop agenda to walk through the connectivity design? I want to make sure we're aligned before we finalize the IP addressing scheme.

Also — should we loop in the security team for the architecture review, or is that a separate stream?

{person}
Senior Infrastructure Engineer, {company}
```

**Email 3 (Reply from {manager})**
```
{person},

Good catch. Yes — let's add 30 minutes for network topology. I'll update the agenda.

Security review will run in parallel — {security_lead} will join from week 3 onward. I'll add them to the project space.

See everyone at the workshop.

{manager}
```

**Label:** `Projects/{company} DT Initiative`
**Scenario purpose:** Shows project management email patterns, Google Chat space integration, attachment workflows

---

## Scenario 2: Security Audit Results

**Thread subject:** ACTION REQUIRED: Q1 Security Audit Findings — {company} {department}

**Email 1 (Sender: security@{domain}, To: {manager}, CC: ciso@{domain})**
```
Hi {manager},

Please find attached the Q1 2026 Security Audit report for the {department} environment.

Summary of findings:

🔴 Critical (2): Must be remediated within 14 days
  - CVE-2026-0391: Unpatched OS on 3 production hosts
  - Excessive IAM permissions on service accounts (15 accounts affected)

🟡 High (5): Must be remediated within 30 days
  - TLS 1.0/1.1 still enabled on legacy API endpoints
  - 4 additional findings — see attached report

🟢 Medium/Low (12): Remediation plan required within 90 days

Please acknowledge receipt and provide a remediation plan within 5 business days.

Security Operations Team
{company}
```

**Email 2 (Reply from {manager}, To: security@{domain})**
```
Acknowledged. I've briefed the team.

For the two critical findings:
- CVE-2026-0391: Patch window scheduled for this Saturday 02:00–05:00. Change request submitted.
- IAM permissions: {person} is auditing all service accounts today. We expect to have excess permissions revoked by EOD Friday.

I'll send the full remediation plan by {date + 3 days}.

{manager}
```

**Email 3 (Reply from security@{domain})**
```
Thank you for the quick response.

Please copy security@{domain} on the change request so we can verify the patch and update the finding status.

For the IAM audit — please use the attached IAM Least Privilege Checklist to ensure consistent coverage.

{security_contact}
Security Operations
```

**Label:** `Security/Audits/Q1-2026`
**Scenario purpose:** Shows security workflow, urgent action threading, attachment/checklist patterns

---

## Scenario 3: HR Survey Results

**Thread subject:** {company} Employee Engagement Survey — Q4 2025 Results Now Available

**Email 1 (Sender: hr@{domain}, To: all@{domain})**
```
Dear {company} team,

Thank you to everyone who participated in our Q4 2025 Employee Engagement Survey. We had a 78% response rate — our highest ever!

Key highlights:
✅ Overall engagement score: 72/100 (+4 vs Q3)
✅ "I have the tools I need to do my job well": 81% agree (+11)
✅ "I understand how my work contributes to company goals": 76% agree

Areas we're working on:
→ Cross-team collaboration (score: 61)
→ Career development clarity (score: 58)

What happens next:
- Department managers will share team-specific results by {date + 1 week}
- HR will host Town Hall Q&A: {date + 2 weeks}, 14:00 CET

Full results are available in the HR space.

HR Team
{company}
```

**Email 2 (Reply from {person}, To: hr@{domain})**
```
Thanks for sharing these results so quickly!

Really encouraged to see the "tools" score jump — I think the new platform rollout made a real difference there.

Looking forward to the Town Hall.

{person}
```

**Label:** `HR/Surveys/2025`
**Scenario purpose:** Shows all-company announcement patterns, Town Hall coordination

---

## Scenario 4: Budget Approval

**Thread subject:** APPROVAL NEEDED: Q2 2026 Infrastructure Budget — {department}

**Email 1 (Sender: {manager}, To: cfo@{domain}, CC: cto@{domain})**
```
Hi Joanna,

Please find attached the Q2 2026 budget request for {department} infrastructure.

Summary:
- Requested amount: €{budget_amount}
- Primary items: Cloud infrastructure (70%), security tooling (20%), training (10%)
- Business case: See attached — projected 3-year ROI of 180%

This request is time-sensitive. We need approval by {date + 5 days} to qualify for the committed-use discount pricing for the cloud contract.

Happy to walk through the business case on a call if helpful.

{manager}
Head of {department}
```

**Email 2 (Reply from cfo@{domain}, To: {manager})**
```
{manager},

I've reviewed the business case. A few questions before I can approve:

1. The €{amount} in year 1 includes migration costs — is that all one-time, or does any of it recur?
2. The ROI assumes 40% infrastructure cost reduction — what's the reference for that assumption?
3. Do we have a fallback plan if the committed-use discount window passes?

Please address these and resubmit by {date + 3 days}.

Joanna Nowak
CFO, {company}
```

**Email 3 (Reply from {manager})**
```
Joanna,

Thank you for the review. Responses inline:

1. The €{amount} is 100% one-time migration cost. Recurring cost from Year 2 is €{lower_amount}/year.
2. The 40% reduction is based on [Gartner cloud cost benchmark 2025] + our own Stratozone assessment. I'll attach the detailed breakdown.
3. Fallback: We can still proceed without the discount window, but the payback period extends from 14 to 19 months. Still positive ROI, just slower.

Updated business case attached.

{manager}
```

**Label:** `Finance/Budget-Approvals/Q2-2026`
**Scenario purpose:** Shows finance approval chain, multi-turn business correspondence

---

## Scenario 5: External Partner

**Thread subject:** Partnership Inquiry — {company} × Vertex Systems Integration

**Email 1 (Sender: partnerships@vertexsystems.example, To: partnerships@{domain})**
```
Dear {company} team,

My name is Krzysztof Dąbrowski from Vertex Systems. We're a certified Google Cloud Partner specializing in data platform migrations for logistics and manufacturing companies in the CEE region.

We've been following {company}'s digital transformation announcements and believe there may be a strong fit for collaboration, specifically around:

- Cloud-native data platform build (BigQuery + Dataflow)
- Integration of your SAP environment with GCP analytics layer
- Ongoing managed services post-migration

Would you be open to a 30-minute call to explore whether there's mutual value?

Best regards,
Krzysztof Dąbrowski
Head of Partnerships, Vertex Systems
krzysztof@vertexsystems.example | +48 22 555 0192
```

**Email 2 (Reply from {person}, To: krzysztof@vertexsystems.example)**
```
Hi Krzysztof,

Thank you for reaching out. Your focus on SAP-GCP integration is relevant — we're actively scoping that work and could benefit from implementation expertise.

I'd like to involve our CTO in an initial conversation. Could you send over a brief overview of relevant engagements (anonymized is fine) before our call?

Best,
{person}
{Title}, {company}
```

**Label:** `External/Partners`
**Scenario purpose:** Shows external email, partner discovery, business development pattern

---

## Scenario 6: Onboarding Welcome

**Thread subject:** Welcome to {company}, {new_hire}! Your First Week Guide

**Email 1 (Sender: hr@{domain}, To: {new_hire}@{domain})**
```
Hi {new_hire},

Welcome to {company}! We're thrilled to have you joining the {department} team.

Your first week is all set up. Here's what to expect:

Day 1 ({date}):
- 09:00 — Office arrival / IT setup (meet {it_contact} at reception)
- 10:30 — Welcome coffee with {manager}
- 14:00 — Company overview session (Google Meet link in calendar)

Your Google Workspace account is ready:
- Email: {new_hire}@{domain}
- Google Drive access: Onboarding folder has been shared with you
- Google Chat: You've been added to #welcome and #{department} spaces

Action items before Day 1:
☐ Complete your security training (link in Drive folder — takes 45 min)
☐ Set up Google Authenticator for 2FA
☐ Review the Employee Handbook (shared in Drive)

We're really glad you're here!

{hr_contact}
People Operations, {company}
```

**Label:** `HR/Onboarding`
**Scenario purpose:** Shows HR workflow, structured onboarding comms, multi-checklist format

---

## Scenario 7: IT Incident

**Thread subject:** [INCIDENT-2026-0412] Production API Degradation — RESOLVED

**Email 1 (Sender: it-ops@{domain}, To: it-leads@{domain}, CC: cto@{domain}) — Initial alert**
```
INCIDENT OPEN — Severity P1
Time: {datetime}
Affected: Production API gateway — 40% error rate on /orders endpoint
Impact: ~300 requests/min failing; customer-facing order placement affected
Status: INVESTIGATING

On-call engineer: {oncall_engineer}
Bridge: [Google Meet link]
Status page: Updated

Next update: 30 minutes or on resolution
```

**Email 2 (Update — 45 minutes later)**
```
INCIDENT UPDATE — Severity P1 → P2
Time: {datetime + 45min}
Status: ROOT CAUSE IDENTIFIED

Root cause: Memory leak in orders-service v2.3.1 deployed at {time - 2 hours}
Resolution: Rollback to v2.2.9 in progress — ETA 15 minutes
Error rate: Reduced to 8% following partial mitigation

Customers affected: ~1,200 orders delayed (not lost — queued)
Next update: On resolution
```

**Email 3 (Resolution)**
```
INCIDENT RESOLVED
Time: {datetime + 1h}
Duration: 1 hour 12 minutes
Impact: 1,847 orders delayed; all successfully processed post-resolution

Root cause: Memory leak in orders-service — unbounded cache growth under high load
Immediate fix: Rollback to v2.2.9
Permanent fix: Patch in v2.3.2 — scheduled for testing this week

Post-incident review: {date + 2 days}, 11:00 — invite sent separately
PIR document: [Google Doc link]

Thank you to {oncall_engineer} and {support_engineer} for rapid response.

IT Operations
```

**Label:** `IT/Incidents/2026`
**Scenario purpose:** Shows incident management workflow, P1 escalation, structured communications

---

## Scenario 8: Quarterly Report

**Thread subject:** {company} {department} — Q1 2026 Quarterly Report

**Email 1 (Sender: {manager}, To: cxo-group@{domain})**
```
Leadership team,

Please find attached the {department} Q1 2026 Quarterly Report.

Executive summary:

Performance:
✅ SLA compliance: 99.7% (target: 99.5%)
✅ Infrastructure cost per transaction: €0.0023 (-12% vs Q4 2025)
✅ Incidents: 3 P2, 0 P1 (vs 1 P1, 5 P2 in Q4 2025)

In progress:
→ Phase 2 migration: 68% complete (on track for Q2 go-live)
→ Security posture improvement: 82/100 (target: 90 by Q3)

Headcount:
→ 2 open roles in infrastructure engineering — active hiring
→ {person} completed Google Cloud Professional Architect certification

Q2 priorities:
1. Complete Phase 2 migration by {date}
2. Achieve security score target ahead of NIS2 audit
3. Launch internal developer portal

Full report in the attached PDF and linked Google Slides.

{manager}
Head of {department}
```

**Label:** `Reports/Quarterly/2026`
**Scenario purpose:** Shows executive reporting format, KPI-driven communication

---

## Scenario 9: AI Training Invite

**Thread subject:** Invitation: Gemini in Workspace — Productivity Training Sessions

**Email 1 (Sender: it-enablement@{domain}, To: all@{domain})**
```
Hi everyone,

We're rolling out Gemini in Google Workspace across {company} and want to make sure everyone gets the most out of it.

We're hosting three 90-minute training sessions — pick the one that works for your schedule:

Session A: {date + 7 days}, 10:00–11:30 CET | Google Meet [link]
Session B: {date + 8 days}, 14:00–15:30 CET | Google Meet [link]
Session C: {date + 10 days}, 09:00–10:30 CET | Google Meet [link] (Polish language)

What you'll learn:
- Gemini in Gmail: drafting, summarizing long threads, smart replies
- Gemini in Docs: writing assistance, reformatting, translation
- Gemini in Sheets: formula generation, data analysis prompts
- Gemini in Meet: meeting summaries, action item extraction
- NotebookLM: summarizing your own documents

Prerequisites: None. Just bring your curiosity.

Sign up by replying to this email with your preferred session.

IT Enablement Team
{company}
```

**Email 2 (Reply from {person})**
```
Session B please — looking forward to it!

Quick question: will the training cover custom prompts, or is it focused on the built-in features?

{person}
```

**Email 3 (Reply from it-enablement@{domain})**
```
{person} — confirmed for Session B!

Yes, we'll cover prompt writing in the last 30 minutes — bringing your own use cases is encouraged.

See you there.
```

**Label:** `IT/Training/Gemini-Rollout`
**Scenario purpose:** Shows internal training coordination, RSVP pattern, product onboarding comms

---

## Scenario 10: Sales Win Announcement

**Thread subject:** 🏆 WIN: {company} secures {deal_name} — €{deal_value} contract

**Email 1 (Sender: {sales_manager}, To: sales-team@{domain}, CC: ceo@{domain})**
```
Team,

Huge news — we've just closed the {deal_name} contract with {customer_name}.

Deal summary:
- Value: €{deal_value} over 3 years
- Scope: Full digital transformation — infrastructure, data platform, collaboration suite
- Start date: {date + 1 month}
- Key decision-maker: {customer_contact}, CTO

This was a competitive deal against {competitor} — we won on AI capability, data platform performance, and our reference from {reference_customer}.

Massive congratulations to {person} who led this deal for 8 months without ever losing confidence.

Celebration drinks: {date + 2 days}, 17:00, {office_location}.

{sales_manager}
VP Sales, {company}
```

**Email 2 (Reply from CEO)**
```
Incredible result. This is the kind of deal that validates our strategy.

{person} — exceptional work. I'd love to hear the full story at the next all-hands.

Well done everyone.

{ceo_name}
CEO, {company}
```

**Label:** `Sales/Wins/2026`
**Scenario purpose:** Shows company-wide win announcement, celebratory tone, deal summary format
