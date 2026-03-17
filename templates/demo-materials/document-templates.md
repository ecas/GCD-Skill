# Demo Material Template: Google Docs Document Templates
# Purpose: Demonstrates Google Docs creation, formatting, and collaboration
# Parameters: {company}, {department}, {person}, {date}
# All content is fictional.

---

## Document 1: Project Charter

**Document title:** {project_name} — Project Charter v1.0

**Formatting:** H1 for title, H2 for sections, H3 for subsections, tables, normal text

---

```
PROJECT CHARTER
[H1] {project_name}

Version: 1.0 | Status: DRAFT | Last Updated: {date}
Owner: {manager} | Sponsor: {cto_name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[H2] 1. Executive Summary

{project_name} is a strategic initiative to modernise the {department} technology stack
and migrate core workloads to Google Cloud Platform. The project will deliver a scalable,
secure, and cost-efficient infrastructure foundation for {company}'s growth through 2028.

Estimated duration: {duration} months
Estimated investment: €{budget}
Expected ROI: {roi}% over 3 years

[H2] 2. Problem Statement

[H3] 2.1 Current State

The current {department} infrastructure presents the following challenges:
• Hardware refresh cycle creates €{amount} capex event every 3 years
• Manual provisioning processes average {n} hours per new deployment
• Disaster recovery RTO of {n} hours does not meet business requirements
• Limited observability across fragmented monitoring tools

[H3] 2.2 Business Impact

These limitations result in:
• €{amount}/year in avoidable operational costs
• {n}% developer time spent on infrastructure management vs. product delivery
• Inability to scale infrastructure within single-day windows during peak periods

[H2] 3. Project Objectives

| Objective | Success Metric | Target |
|-----------|---------------|--------|
| Reduce infrastructure cost | Monthly cloud spend vs. current baseline | -30% |
| Improve deployment speed | Time from commit to production | < 15 minutes |
| Achieve DR target | Recovery Time Objective | < 1 hour |
| Improve observability | Mean Time to Detect (MTTD) | < 5 minutes |
| Enable AI capability | First AI use case in production | Q3 2026 |

[H2] 4. Scope

[H3] 4.1 In Scope

• Migration of {n} production workloads from on-premises to GCP
• Network connectivity setup (Cloud Interconnect / VPN)
• Security baseline: IAM, VPC, logging, SCC enablement
• Google Workspace migration for {department} ({n} seats)
• Data platform foundation: BigQuery + Cloud Storage

[H3] 4.2 Out of Scope

• SAP migration (separate workstream — see Project Charter {sap_project})
• Legacy mainframe workloads (assessed as too complex for Phase 1)
• End-user device management (separate IT project)

[H2] 5. Stakeholders

| Name | Role | Responsibility | Engagement Level |
|------|------|---------------|-----------------|
| {cto_name} | Executive Sponsor | Strategic decisions, budget approval | Informed monthly |
| {manager} | Project Owner | Day-to-day decisions, escalations | Active daily |
| {person} | Technical Lead | Architecture, implementation | Active daily |
| {ciso_name} | Security | Security architecture approval | Consulted weekly |
| {cfo_name} | Finance | Budget oversight | Informed monthly |
| {vendor_name} | Implementation Partner | Delivery execution | Active daily |

[H2] 6. Timeline

[H3] 6.1 Phase Summary

Phase 0 — Assessment: {date} → {date + 6 weeks}
Phase 1 — Foundation: {date + 6 weeks} → {date + 16 weeks}
Phase 2 — Migration: {date + 16 weeks} → {date + 36 weeks}
Phase 3 — Optimize: {date + 36 weeks} → Ongoing

[H3] 6.2 Key Milestones

| Milestone | Target Date | Owner |
|-----------|------------|-------|
| Architecture review approved | {date + 4 weeks} | {person} |
| Network connectivity live | {date + 8 weeks} | {person} |
| First 10 workloads migrated | {date + 20 weeks} | {vendor_name} |
| Workspace migration complete | {date + 24 weeks} | IT Team |
| Full production cutover | {date + 36 weeks} | {manager} |

[H2] 7. Budget

| Category | Q1 | Q2 | Q3 | Total |
|----------|----|----|-----|-------|
| Infrastructure (GCP) | €{n} | €{n} | €{n} | €{n} |
| Professional services | €{n} | €{n} | — | €{n} |
| Training & enablement | €{n} | — | — | €{n} |
| Contingency (15%) | €{n} | €{n} | €{n} | €{n} |
| **Total** | | | | **€{total}** |

[H2] 8. Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Migration timeline overrun | Medium | High | Buffer built into Phase 2; weekly governance |
| Data migration data loss | Low | Critical | Full backup + validation before each cutover |
| Team capacity constraints | Medium | Medium | Vendor provides additional resources if needed |
| Security finding delaying cutover | Medium | High | Security review in parallel, not sequential |

[H2] 9. Approval

| Name | Role | Signature | Date |
|------|------|-----------|------|
| {cto_name} | Executive Sponsor | ______________ | |
| {manager} | Project Owner | ______________ | |
| {cfo_name} | Finance | ______________ | |
```

---

## Document 2: Security Policy

**Document title:** {company} Cloud Security Policy — Version 2.1

---

```
[H1] Cloud Security Policy

Classification: INTERNAL | Version: 2.1 | Effective: {date}
Owner: {ciso_name}, CISO | Review cycle: Annual

[H2] 1. Purpose and Scope

This policy establishes security requirements for all {company} cloud environments,
including Google Cloud Platform workloads, Google Workspace, and third-party SaaS
applications integrated with company systems.

Scope: All employees, contractors, and third parties with access to {company}
cloud resources.

[H2] 2. Access Control

[H3] 2.1 Identity and Authentication

• All cloud resource access requires corporate Google identity ({domain} account)
• Multi-factor authentication (MFA) is mandatory for all accounts — no exceptions
• Hardware security keys (FIDO2) required for privileged access roles
• Shared accounts are prohibited. Service-to-service access uses service accounts only.
• Inactive accounts are automatically deprovisioned after 90 days

[H3] 2.2 Least Privilege

• All IAM roles must follow least privilege principle
• Privileged roles (Owner, Editor) may not be assigned to individuals
• Role assignments require manager approval and are reviewed quarterly
• Service account keys are prohibited — use Workload Identity Federation

[H2] 3. Data Classification and Handling

| Classification | Definition | Examples | Cloud Storage Requirements |
|---------------|-----------|---------|---------------------------|
| Public | Approved for public release | Marketing content | Standard |
| Internal | For company use only | Policies, reports | Encrypted at rest |
| Confidential | Sensitive business data | Financial records, contracts | CMEK required |
| Restricted | Regulatory / personal data | GDPR personal data, health | Restricted access + CMEK + audit logging |

[H2] 4. Network Security

• All inter-service communication must use TLS 1.2 minimum (TLS 1.3 preferred)
• Public internet access for compute resources requires Security review approval
• VPC Service Controls required for workloads handling Restricted data
• Cloud Armor WAF required for all customer-facing endpoints

[H2] 5. Incident Response

[H3] 5.1 Severity Classification

| Severity | Criteria | Response Time | Escalation |
|----------|---------|--------------|-----------|
| P1 — Critical | Data breach, production down, ransomware | 15 minutes | CISO + CTO immediately |
| P2 — High | Security finding, degraded service | 1 hour | Security team + manager |
| P3 — Medium | Vulnerability discovered, policy violation | 4 hours | Security team |
| P4 — Low | Advisory, non-urgent finding | 24 hours | Standard ticket |

[H3] 5.2 Reporting

All security incidents must be reported to security@{domain} immediately upon discovery.
Employees must not attempt to investigate or remediate P1/P2 incidents independently.

[H2] 6. Compliance

{company} cloud environments must comply with:
• GDPR / RODO — personal data handling and data subject rights
• NIS2 — incident reporting obligations within 24 hours (initial) / 72 hours (full)
• ISO 27001 — information security management (certification target: Q4 2026)
• {Industry-specific regulation} — {specific requirement}

[H2] 7. Audit and Review

• Cloud access logs retained for 12 months minimum (6 years for audit evidence)
• Quarterly access review for all privileged roles
• Annual penetration test of production environment
• Monthly Security Command Center findings review
```

---

## Document 3: Meeting Notes

**Document title:** Meeting Notes — {meeting_title} — {date}

---

```
[H1] Meeting Notes

Meeting: {meeting_title}
Date: {date} | Time: {time} | Duration: {duration}
Location: Google Meet | Recording: [Link if recorded]

[H2] Attendees

Present: {person1}, {person2}, {person3}, {person4}
Apologies: {person5}
Facilitator: {facilitator}
Notes: {note_taker}

[H2] Agenda

1. Review of previous action items
2. {Agenda item 1}
3. {Agenda item 2}
4. {Agenda item 3}
5. AOB

[H2] Discussion Summary

[H3] 1. Previous Action Items Review

| Action | Owner | Status | Notes |
|--------|-------|--------|-------|
| {action from last meeting} | {person} | ✅ Complete | Delivered {date} |
| {action from last meeting} | {person} | 🔄 In Progress | On track for {date} |
| {action from last meeting} | {person} | ❌ Overdue | New deadline: {date} |

[H3] 2. {Agenda Item 1}

Summary of discussion:
{Summary of what was discussed, decisions reached, key points raised}

Decision: {Decision text — what was decided and by whom}

[H3] 3. {Agenda Item 2}

Summary of discussion:
{Summary}

Decision: {Decision or outcome}
Open question: {Any unresolved question — owner to investigate}

[H3] 4. {Agenda Item 3}

Summary of discussion:
{Summary}

No decision required — informational item.

[H2] Action Items

| # | Action | Owner | Due Date | Priority |
|---|--------|-------|---------|---------|
| 1 | {action} | {person} | {date} | High |
| 2 | {action} | {person} | {date} | Medium |
| 3 | {action} | {person} | {date} | Low |

[H2] Next Meeting

Date: {next_meeting_date} | Time: {time}
Agenda items to carry forward: {list}
```

---

## Document 4: HR Onboarding Guide

**Document title:** Welcome to {company} — Your First 90 Days Guide

---

```
[H1] Welcome to {company}!

We're so glad you're here. This guide will help you hit the ground running
and feel at home in your first 90 days.

Your manager: {manager}
Your HR partner: {hr_contact}
IT support: it-help@{domain} or the #it-help Chat space

[H2] Day 1 Checklist

☐ Collect your laptop from IT (ask at reception for {it_contact})
☐ Sign in to your Google account: {new_hire}@{domain}
☐ Complete 2-factor authentication setup (follow IT guide in Drive)
☐ Join your team's Google Chat space: #{department}
☐ Introduce yourself in #introductions
☐ Review your calendar — Day 1 sessions are already booked
☐ Complete mandatory security training (link in Onboarding Drive folder)

[H2] Week 1: Getting Oriented

Key meetings your manager has arranged:
• Welcome 1:1 with {manager}: {date}, 10:30
• Team lunch: {date}, 12:30 — {location}
• IT & tools walkthrough: {date}, 14:00
• Company overview with CEO: {date}, 15:30

Tools you'll use:
| Tool | Purpose | How to access |
|------|---------|--------------|
| Gmail | Email | Already in your browser |
| Google Chat | Instant messaging | Chat.google.com |
| Google Drive | File storage | Drive.google.com |
| Google Meet | Video calls | Meet.google.com |
| Google Calendar | Scheduling | Calendar.google.com |
| {Internal tool} | {Purpose} | {URL} — ask {person} for access |

[H2] First 30 Days: Learning the Business

Goals for your first month:
1. Meet every member of your immediate team (1:1 coffees — self-schedule via Calendar)
2. Complete the {department} onboarding learning path in Google Classroom
3. Shadow {person} for a day to understand the {key process}
4. Draft your 90-day plan with your manager by Day 30

[H2] Days 31–90: Contributing

By Day 90, we expect you will:
• Be fully productive in your role
• Have completed all mandatory training
• Have completed your first independent project or deliverable
• Have your 6-month goals set in your performance profile

[H2] Who to Ask About What

| Topic | Contact | Channel |
|-------|---------|---------|
| IT issues | {it_contact} | #it-help or it-help@{domain} |
| HR questions | {hr_contact} | #hr-questions or hr@{domain} |
| Expenses & finance | {finance_contact} | expenses@{domain} |
| Building access | Office manager | {contact} |
| {Department-specific} | {person} | #{department} Chat space |
```

---

## Document 5: Executive Memo

**Document title:** MEMO: {subject} — {date}

---

```
[H1] MEMORANDUM

TO: {recipient_name}, {recipient_title}
FROM: {sender_name}, {sender_title}
DATE: {date}
SUBJECT: {subject}
CLASSIFICATION: CONFIDENTIAL — For Addressee Only

[H2] Purpose

This memo provides {context — e.g., "a summary of the Q1 2026 technology investment
results and a recommendation for Q2 budget allocation"}.

[H2] Background

{2–3 sentences of context. What decision or situation prompted this memo.}

[H2] Key Findings / Situation

• Finding 1: {Specific, factual statement}
• Finding 2: {Specific, factual statement}
• Finding 3: {Specific, factual statement}

Supporting data:
[Table or chart as appropriate]

[H2] Recommendation

{Sender's recommendation — stated directly:}

I recommend that {Company} {specific action} by {date}.

Rationale:
1. {Reason 1}
2. {Reason 2}
3. {Reason 3}

[H2] Required Action

☐ Approve the recommended course of action
☐ Schedule follow-up meeting: {proposed date}
☐ {Other required action}

Please respond by {date}.

---
Attachments: {list if any}
Distribution: {list if wider than addressee}
```

---

## Document 6: Architecture Decision Record (ADR)

**Document title:** ADR-{number}: {decision_title}

---

```
[H1] Architecture Decision Record

ADR-{number}: {decision_title}

Date: {date}
Status: ACCEPTED | PROPOSED | DEPRECATED
Author: {author}
Reviewers: {reviewers}

[H2] Context

{Describe the situation and forces in play. What is the problem being solved?
What constraints exist? What options were considered?}

Current state: {Brief description of current state}
Driver: {What triggered this decision — incident, new requirement, cost, compliance}

[H2] Decision

We will {specific decision}.

Specifically:
• {Implementation detail 1}
• {Implementation detail 2}
• {Implementation detail 3}

[H2] Options Considered

[H3] Option A — {Selected option name}

Description: {What this option involves}
Pros:
• {Pro 1}
• {Pro 2}
Cons:
• {Con 1}
Estimated cost: {cost}

[H3] Option B — {Alternative}

Description: {What this option involves}
Pros:
• {Pro 1}
Cons:
• {Con 1}
• {Con 2 — key reason rejected}

[H3] Option C — Status quo

Description: Do nothing; continue with current approach
Rejected because: {Reason}

[H2] Consequences

Positive:
• {Expected benefit 1}
• {Expected benefit 2}

Negative / Trade-offs:
• {Known downside 1}
• {Known downside 2}

[H2] Review Trigger

This decision should be revisited if:
• {Condition 1 — e.g., "Team size exceeds 200 engineers"}
• {Condition 2 — e.g., "Alternative technology reaches production readiness"}
• {Date — e.g., "Annual review in Q1 2027"}
```

---

## Document 7: Training Plan

**Document title:** {training_program_name} — Training Plan {year}

---

```
[H1] Training Plan: {training_program_name}

Department: {department} | Period: {year}
Owner: {training_owner} | Approved by: {manager}

[H2] Objectives

By the end of this training program, participants will be able to:
1. {Learning objective 1 — specific, measurable}
2. {Learning objective 2}
3. {Learning objective 3}

[H2] Participants

| Name | Role | Required Modules | Target Completion |
|------|------|-----------------|-------------------|
| {person1} | {role} | All | {date} |
| {person2} | {role} | Modules 1–3 | {date} |
| {person3} | {role} | Module 4 only | {date} |

[H2] Curriculum

[H3] Module 1: {Module Name} — {n} hours

Format: {Self-paced online / Instructor-led / Workshop}
Platform: {Google Classroom / Coursera / Internal}
Prerequisites: None

Learning outcomes:
• {Outcome 1}
• {Outcome 2}

Assessment: {Quiz / Hands-on lab / None}
Certification: {Certificate name if applicable}

[H3] Module 2: {Module Name} — {n} hours

[Same structure]

[H3] Module 3: Hands-on Lab — {n} hours

Format: Google Cloud Skills Boost / Qwiklabs
Lab objectives:
• {Lab objective 1}
• {Lab objective 2}

[H2] Schedule

| Week | Activity | Format | Duration |
|------|---------|--------|---------|
| Week 1 | Module 1: {name} | Self-paced | 4 hours |
| Week 2 | Module 2: {name} | Self-paced | 4 hours |
| Week 3 | Hands-on lab | Lab environment | 6 hours |
| Week 4 | Module 3: {name} | Instructor-led | 8 hours |
| Week 5 | Assessment & certification exam | Proctored online | 2 hours |

[H2] Success Metrics

• Completion rate: Target 90% by {date}
• Assessment pass rate: Target 85% first attempt
• Certification achievement: Target {n} certifications by {date}
• Post-training survey: Target 4.0/5.0 satisfaction
```

---

## Document 8: Quarterly Report

**Document title:** {department} Quarterly Report — {quarter} {year}

---

```
[H1] {department} Quarterly Report — {quarter} {year}

Author: {manager} | Audience: Leadership Team
Period: {start_date} – {end_date}

[H2] Executive Summary

{3–4 sentences summarizing the quarter: performance against targets, key achievements,
key challenges, and outlook for next quarter.}

[H2] KPI Dashboard

| KPI | Target | Actual | Status | vs. Prior Quarter |
|-----|--------|--------|--------|------------------|
| {KPI 1} | {target} | {actual} | ✅ | +{n}% |
| {KPI 2} | {target} | {actual} | ✅ | +{n}% |
| {KPI 3} | {target} | {actual} | ⚠️ | -{n}% |
| {KPI 4} | {target} | {actual} | ❌ | -{n}% |

[H2] Highlights

[H3] What Went Well

• {Achievement 1 — specific and quantified}
• {Achievement 2 — specific and quantified}
• {Achievement 3}

[H3] Challenges

• {Challenge 1 — what happened and impact}
  → Response: {What was done about it}
• {Challenge 2}
  → Response: {What was done about it}

[H2] Financial Summary

| Category | Budget | Actual | Variance |
|----------|--------|--------|---------|
| Infrastructure | €{n} | €{n} | {±n}% |
| Headcount | €{n} | €{n} | {±n}% |
| Tools & licenses | €{n} | €{n} | {±n}% |
| **Total** | **€{n}** | **€{n}** | **{±n}%** |

[H2] {Quarter + 1} Priorities

1. {Priority 1 — specific initiative with owner and target date}
2. {Priority 2}
3. {Priority 3}

[H2] Headcount

Current team: {n} FTE ({n} permanent, {n} contractors)
Open roles: {n} — {role names}
Attrition this quarter: {n} ({n}% annualised)
New hires: {n}
```
