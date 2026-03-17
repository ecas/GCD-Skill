# Demo Material Template: Google Sheets Spreadsheet Templates
# Purpose: Demonstrates Sheets creation, formatting, formulas, conditional formatting, charts
# Parameters: {company}, {department}, {person}, {year}
# All content is fictional.

---

## Usage Instructions

Each spreadsheet template specifies:
- **File name** — Google Sheets file name
- **Sheets (tabs)** — Tab names and their purpose
- **Headers** — Column headers with data types
- **Sample data** — 5–10 example rows per sheet
- **Formulas** — Key formula examples to demonstrate Sheets capability
- **Conditional formatting** — Rules for color coding
- **Charts** — Suggested chart types

---

## Spreadsheet 1: IT Budget Tracker

**File name:** `{company} — IT Budget {year}`
**Sheets:** Summary | Cloud | Headcount | Software Licenses | Hardware | Training

---

### Sheet: Summary

**Purpose:** High-level budget vs. actual dashboard with variance tracking

| Column | Header | Format |
|--------|--------|--------|
| A | Category | Text |
| B | Annual Budget (€) | Currency, 0 decimals |
| C | Spent YTD (€) | Currency, 0 decimals |
| D | Remaining (€) | Currency, formula |
| E | % Spent | Percentage, 1 decimal |
| F | % of Total Budget | Percentage, 1 decimal |
| G | Status | Text (formula-driven) |

**Sample data:**
```
Category             | Budget    | Spent YTD | Remaining | % Spent | Status
Cloud Infrastructure | €480,000  | €187,400  | €292,600  | 39.0%   | ON TRACK
Software Licenses    | €220,000  | €198,000  | €22,000   | 90.0%   | AT RISK
Headcount (IT)       | €1,200,000| €450,000  | €750,000  | 37.5%   | ON TRACK
Hardware             | €95,000   | €82,000   | €13,000   | 86.3%   | AT RISK
Training             | €45,000   | €12,500   | €32,500   | 27.8%   | AHEAD
Consulting           | €180,000  | €67,500   | €112,500  | 37.5%   | ON TRACK
Total                | €2,220,000| €997,400  | €1,222,600| 44.9%   | ON TRACK
```

**Key formulas:**
```
D2 = =B2-C2                          // Remaining budget
E2 = =C2/B2                          // % Spent
F2 = =B2/B$8                         // % of total (row 8 = Total)
G2 = =IF(E2>0.9,"AT RISK",IF(E2>0.75,"WATCH","ON TRACK"))  // Status
```

**Conditional formatting:**
- Column G = "AT RISK" → Red fill (#FFCCCC), red text (#CC0000)
- Column G = "WATCH" → Yellow fill (#FFF2CC), dark yellow text (#856404)
- Column G = "ON TRACK" → Green fill (#D9EAD3), dark green text (#274E13)
- Column E > 0.9 → Orange fill on the cell

**Chart:** Stacked bar chart — Budget vs. Spent by category

---

### Sheet: Cloud

**Purpose:** Monthly cloud spend by service with trend

| Column | Header | Notes |
|--------|--------|-------|
| A | Service | GCP service name |
| B | Jan | Monthly cost (€) |
| C | Feb | Monthly cost (€) |
| ... | ... | Months Jan–Dec |
| N | Annual Total | SUM formula |
| O | Budget | Annual budget for service |
| P | Variance | Actual vs. budget |
| Q | MoM Change | Month-over-month % change (current month) |

**Sample data (Q1):**
```
Service          | Jan    | Feb    | Mar    | Annual | Budget  | Variance
Compute Engine   | €18,400| €19,200| €21,000| ...    | €220,000| ...
GKE              | €24,100| €25,600| €28,000| ...    | €300,000| ...
Cloud Storage    | €4,200 | €4,100 | €4,400 | ...    | €50,000 | ...
BigQuery         | €8,900 | €9,400 | €14,200| ...    | €120,000| ...
Cloud SQL        | €6,100 | €6,100 | €6,200 | ...    | €75,000 | ...
Networking       | €3,800 | €4,100 | €4,300 | ...    | €50,000 | ...
Security         | €2,200 | €2,200 | €2,200 | ...    | €26,400 | ...
Other            | €1,200 | €1,400 | €1,600 | ...    | €18,600 | ...
TOTAL            | €68,900| €72,100| €81,900| ...    | €860,000| ...
```

**Key formulas:**
```
N2  = =SUM(B2:M2)                    // Annual total
P2  = =N2-O2                         // Variance vs. budget
Q2  = =(M2-L2)/L2                    // MoM change (M=current month, L=prior month)
```

**Chart:** Line chart — Monthly spend trend by service (last 12 months)

---

### Sheet: Headcount

**Purpose:** IT headcount tracking — headcount plan vs. actuals

| Column | Header |
|--------|--------|
| A | Role |
| B | Team |
| C | Planned FTE |
| D | Actual FTE |
| E | Open Positions |
| F | Contractor FTE |
| G | Total (incl. contractors) |
| H | Monthly Cost (€) |
| I | Annual Cost (€) |
| J | Notes |

**Sample data:**
```
Role                    | Team       | Plan | Actual | Open | Contractor | Total | Monthly | Annual
Infrastructure Engineer | Infra      | 4    | 3      | 1    | 1          | 4     | €28,000 | €336,000
Cloud Architect         | Infra      | 2    | 2      | 0    | 0          | 2     | €18,000 | €216,000
Security Engineer       | Security   | 3    | 2      | 1    | 0          | 2     | €16,000 | €192,000
DevOps Engineer         | Platform   | 3    | 3      | 0    | 1          | 4     | €28,000 | €336,000
IT Helpdesk             | Support    | 4    | 4      | 0    | 0          | 4     | €20,000 | €240,000
Data Engineer           | Data       | 2    | 1      | 1    | 1          | 2     | €16,000 | €192,000
IT Manager              | Management | 1    | 1      | 0    | 0          | 1     | €9,000  | €108,000
TOTAL                   |            | 19   | 16     | 3    | 3          | 19    |€135,000 |€1,620,000
```

---

## Spreadsheet 2: Employee Directory

**File name:** `{company} — Employee Directory (IT Demo)`
**Sheets:** All Staff | {Department} | Org Chart Helper

**Note:** Use fictional names and data only. This sheet demonstrates directory management and filtering.

---

### Sheet: All Staff

| Column | Header | Notes |
|--------|--------|-------|
| A | Employee ID | EMP-{4-digit number} |
| B | First Name | Text |
| C | Last Name | Text |
| D | Full Name | =B2&" "&C2 |
| E | Job Title | Text |
| F | Department | Text (dropdown validation) |
| G | Team | Text |
| H | Manager | Text (full name) |
| I | Email | {firstname}.{lastname}@{domain} |
| J | Phone | Text |
| K | Location | Office / Remote / Hybrid |
| L | Start Date | Date |
| M | Years at Company | =(TODAY()-L2)/365 — 1 decimal |
| N | Google Workspace License | Business Plus / Enterprise |
| O | GCP Access | Yes / No |
| P | Status | Active / On Leave / Inactive |

**Sample data (10 rows):**
```
EMP-0001 | Anna    | Kowalski   | Anna Kowalski   | Head of IT      | IT         | Management | Marcin Wiśniewski | anna.kowalski@{domain}   | +48 22 555 0101 | Warsaw Office | 2019-03-15 | 7.0  | Enterprise | Yes | Active
EMP-0002 | Piotr   | Nowak      | Piotr Nowak     | Cloud Architect | IT         | Infra      | Anna Kowalski     | piotr.nowak@{domain}     | +48 22 555 0102 | Warsaw Office | 2021-06-01 | 4.8  | Enterprise | Yes | Active
EMP-0003 | Marta   | Wiśniewska | Marta Wiśniewska| Security Eng    | IT         | Security   | Anna Kowalski     | marta.wisniewska@{domain}| +48 22 555 0103 | Remote        | 2022-09-12 | 3.5  | Enterprise | Yes | Active
EMP-0004 | Tomasz  | Jabłoński  | Tomasz Jabłoński| DevOps Engineer | IT         | Platform   | Piotr Nowak       | tomasz.jablonski@{domain}| +48 22 555 0104 | Hybrid        | 2023-01-20 | 3.2  | Business Plus | Yes | Active
EMP-0005 | Katarzyna| Wróbel    | Katarzyna Wróbel| Finance Manager | Finance    | FP&A       | Joanna Nowak      | katarzyna.wrobel@{domain}| +48 22 555 0105 | Warsaw Office | 2020-04-30 | 5.9  | Business Plus | No  | Active
EMP-0006 | Łukasz  | Kaczmarek  | Łukasz Kaczmarek| Sales Director  | Sales      | Enterprise | Marcin Wiśniewski | lukasz.kaczmarek@{domain}| +48 22 555 0106 | Warsaw Office | 2018-11-01 | 7.4  | Enterprise | No  | Active
EMP-0007 | Zofia   | Malinowska | Zofia Malinowska| HR Partner      | HR         | P&C        | Alicja Szymańska  | zofia.malinowska@{domain}| +48 22 555 0107 | Warsaw Office | 2023-07-01 | 2.7  | Business Plus | No  | Active
EMP-0008 | Rafał   | Kowalczyk  | Rafał Kowalczyk | Data Engineer   | IT         | Data       | Piotr Nowak       | rafal.kowalczyk@{domain} | +48 22 555 0108 | Remote        | 2024-02-15 | 2.1  | Enterprise | Yes | Active
EMP-0009 | Barbara | Lewandowska| Barbara Lewandowska| Ops Manager  | Operations | Logistics  | Marcin Wiśniewski | barbara.lewandowska@{domain}| +48 22 555 0109 | Warsaw Office | 2017-08-20 | 8.6  | Business Plus | No  | Active
EMP-0010 | Michał  | Wójcik     | Michał Wójcik   | IT Helpdesk     | IT         | Support    | Anna Kowalski     | michal.wojcik@{domain}   | +48 22 555 0110 | Warsaw Office | 2025-01-10 | 1.2  | Business Plus | No  | Active
```

**Key formulas:**
```
D2  = =B2&" "&C2                     // Full name concatenation
M2  = =ROUND((TODAY()-L2)/365,1)     // Years at company
```

**Conditional formatting:**
- Column P = "Inactive" → Grey fill, grey text
- Column P = "On Leave" → Yellow fill
- Column M < 1 → Light blue fill (new hire highlight)
- Column O = "Yes" → Green cell (GCP access granted)

**Filters:** Enable on all columns. Department filter most used in demo.

---

## Spreadsheet 3: Project Tracker

**File name:** `{project_name} — Project Tracker`
**Sheets:** Dashboard | Workstream A | Workstream B | Risks | Decisions | RAID Log

---

### Sheet: Dashboard

**Summary KPI row (rows 1–8, merged cells for visual):**
```
Overall Status: 🟢 ON TRACK
Phase: Phase 2 — Migration
% Complete: 42%
Days Remaining: 87
Budget Used: 38% of €{budget}
Open Risks: 3 (1 High, 2 Medium)
Open Actions: 7
Last Updated: {date}
```

**Milestone tracker:**

| Milestone | Target Date | Actual Date | Status | Owner |
|-----------|------------|-------------|--------|-------|
| Architecture approved | {date-8w} | {date-8w} | ✅ Complete | {person} |
| Network live | {date-4w} | {date-4w} | ✅ Complete | {tech_lead} |
| Security baseline | {date-2w} | {date-1w} | ✅ Complete | {security_engineer} |
| First 10 workloads | {date+2w} | — | 🔄 In Progress | {vendor} |
| Workspace migration | {date+6w} | — | ⏱ Not Started | IT Team |
| Full cutover | {date+12w} | — | ⏱ Not Started | {manager} |

**Conditional formatting for Status column:**
- "Complete" → Green fill
- "In Progress" → Blue fill
- "At Risk" → Red fill
- "Not Started" → Grey fill

---

### Sheet: Workstream A (Migration)

| Column | Header |
|--------|--------|
| A | Task ID |
| B | Task Name |
| C | Workstream |
| D | Owner |
| E | Start Date |
| F | End Date |
| G | Duration (days) |
| H | % Complete |
| I | Status |
| J | Dependencies |
| K | Notes |

**Sample data (10 rows):**
```
T-001 | Discovery scan setup      | Migration | {tech_lead}  | {date-6w} | {date-5w} | 7  | 100% | ✅ Complete | —     | Stratozone deployed
T-002 | Network architecture design| Migration | {tech_lead}  | {date-5w} | {date-4w} | 7  | 100% | ✅ Complete | T-001 | ADR-003 approved
T-003 | GKE cluster provisioning  | Migration | {tech_lead}  | {date-3w} | {date-2w} | 7  | 100% | ✅ Complete | T-002 | Autopilot mode
T-004 | IAM baseline config       | Migration | {person}     | {date-2w} | {date-1w} | 5  | 100% | ✅ Complete | T-002 | WIF for all SA
T-005 | App 1 container build     | Migration | {vendor}     | {date-1w} | {date}    | 7  | 80%  | 🔄 In Progress| T-003| ETA: {date+2d}
T-006 | App 1 staging deploy      | Migration | {vendor}     | {date+1d} | {date+3d} | 3  | 0%   | ⏱ Not Started| T-005 | —
T-007 | App 1 load testing        | Migration | {tech_lead}  | {date+4d} | {date+6d} | 3  | 0%   | ⏱ Not Started| T-006 | K6 test scripts
T-008 | App 1 prod cutover        | Migration | {manager}    | {date+2w} | {date+2w} | 1  | 0%   | ⏱ Not Started| T-007 | Change mgmt required
T-009 | App 2–5 container builds  | Migration | {vendor}     | {date+1w} | {date+2w} | 7  | 0%   | ⏱ Not Started| T-003 | Parallel to T-006
T-010 | DR configuration          | Migration | {person}     | {date+3w} | {date+4w} | 7  | 0%   | ⏱ Not Started| T-004 | RTO target: 1 hr
```

**Formulas:**
```
G2 = =F2-E2                          // Duration in days
```

---

### Sheet: RAID Log (Risks, Actions, Issues, Decisions)

**Risks tab:**

| ID | Risk Description | Probability | Impact | Score | Mitigation | Owner | Status |
|----|-----------------|------------|--------|-------|-----------|-------|--------|
| R-001 | App 3 has undocumented dependencies — migration may take longer | Medium | High | 6 | Running dependency scan this week | {tech_lead} | Open |
| R-002 | Key developer at {vendor} leaving next month | Low | High | 4 | Succession plan — request replacement | {manager} | Open |
| R-003 | SAP integration complexity underestimated | Medium | Medium | 4 | Scope SAP separately; don't block main migration | {manager} | Mitigated |

**Score = Probability × Impact (H=3, M=2, L=1; score 6+ = Red, 4-5 = Amber, 1-3 = Green)**

**Conditional formatting on Score:**
- ≥ 6 → Red fill
- 4–5 → Orange fill
- ≤ 3 → Green fill

---

## Spreadsheet 4: KPI Dashboard

**File name:** `{company} {department} — KPI Dashboard {year}`
**Sheets:** Summary | Monthly Data | Targets | Charts

---

### Sheet: Summary (current quarter snapshot)

| KPI Category | Metric | Target | Current | Prior Period | Trend | Status |
|-------------|--------|--------|---------|-------------|-------|--------|
| Reliability | Service Uptime (%) | 99.9% | 99.94% | 99.87% | ↑ | ✅ |
| Reliability | MTTR (minutes) | < 30 | 18 | 22 | ↑ | ✅ |
| Reliability | MTTD (minutes) | < 5 | 3.2 | 4.1 | ↑ | ✅ |
| Performance | API p95 latency (ms) | < 200 | 178 | 195 | ↑ | ✅ |
| Performance | Deployment frequency | Daily | 1.4/day | 0.9/day | ↑ | ✅ |
| Performance | Lead time (hours) | < 2 | 1.6 | 2.8 | ↑ | ✅ |
| Cost | Cost per transaction (€) | < 0.003 | 0.0023 | 0.0027 | ↑ | ✅ |
| Cost | Cloud cost MoM growth | < 5% | 13.6% | 4.7% | ↓ | ❌ |
| Security | Critical findings open | 0 | 0 | 0 | → | ✅ |
| Security | Patch compliance (%) | 100% | 94% | 89% | ↑ | ⚠️ |
| Team | Developer satisfaction | > 4.0/5 | 4.3 | 4.1 | ↑ | ✅ |
| Team | On-call alert volume | < 10/week | 7.2 | 11.4 | ↑ | ✅ |

**Formulas:**
```
F2  = =IF(D2>E2,"↑",IF(D2<E2,"↓","→"))   // Trend arrow (higher=better metrics)
G2  = =IF(D2>=C2,"✅",IF(D2>=C2*0.9,"⚠️","❌"))  // Status (adjust per metric direction)
```

**Conditional formatting on Status:**
- "✅" → Green fill (#D9EAD3)
- "⚠️" → Yellow fill (#FFF2CC)
- "❌" → Red fill (#FFCCCC)

---

### Sheet: Monthly Data

| Month | Uptime % | MTTR | API p95 | Deploy Freq | Cost/tx | Cloud Spend |
|-------|---------|------|---------|------------|---------|------------|
| Jan 2026 | 99.91 | 22 | 195 | 0.8 | 0.0027 | €68,900 |
| Feb 2026 | 99.87 | 28 | 199 | 0.9 | 0.0026 | €72,100 |
| Mar 2026 | 99.94 | 18 | 178 | 1.4 | 0.0023 | €81,900 |
| Apr 2026 | — | — | — | — | — | — |
| (remaining months empty — filled as year progresses) |

**Charts (in Charts sheet):**
1. Line chart — Service uptime by month (target line overlay)
2. Column chart — Cloud spend by month with budget line
3. Combo chart — API latency p50/p95/p99 by month
4. Area chart — Deployment frequency trend
5. Bullet chart (simulated) — KPI vs. target for current month
