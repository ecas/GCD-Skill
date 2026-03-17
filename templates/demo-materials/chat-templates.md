# Demo Material Template: Google Chat Space Templates
# Purpose: Demonstrates Chat spaces, threads, file sharing, and collaboration patterns
# Parameters: {company}, {department}, {person}, {domain}
# All content is fictional.

---

## Usage Instructions

Each space template specifies:
- **Space name** — Display name in Google Chat
- **Description** — Space description shown to members
- **Type** — SPACE (named, persistent) or GROUP_CHAT
- **Members** — Role-based member list (map to demo employees)
- **Sample messages** — Seeded conversation threads showing realistic use

---

## Space 1: Project Space

**Space name:** `proj-{project_name}`
**Description:** "{project_name} — workstream coordination, decisions, and updates"
**Type:** SPACE
**Members:** Project team — {manager}, {tech_lead}, {person}, {vendor_contact}, {cto}

**Sample messages:**

---

**[{manager}] — {date} 09:14**
Good morning team. Quick status update before our standup:

Phase 1 network setup is complete — Cloud Interconnect is live between Warsaw DC and europe-west1. Latency looking good at 4ms avg.

Today's focus:
• {tech_lead} → GKE cluster provisioning
• {person} → IAM baseline setup, service account audit
• {vendor_contact} → First app container build

Blockers? Reply here or raise in standup at 09:30.

---

**[{tech_lead}] — {date} 09:22**
GKE cluster provisioning started. Autopilot mode, as per ADR-003.

One issue: the subnet CIDR we planned overlaps with the existing on-prem /18 block. I've flagged it with {network_engineer}. Proposing we shift to 10.2.0.0/16 instead.

@{manager} do you have the updated network diagram handy? Sharing the ADR doc now for reference.

[Attachment: ADR-003-networking.gdoc]

---

**[{manager}] — {date} 09:25**
Yes — updated diagram in the Drive folder: [link]

Good catch on the CIDR conflict. Using 10.2.0.0/16 is fine, align with {network_engineer} and update the diagram by EOD. I'll note it in the change log.

---

**[{person}] — {date} 10:45**
IAM audit complete. Found 23 service accounts with Owner role — clearly a legacy issue. I've created a remediation list in the tracker.

Proposing we use Workload Identity Federation for all new service accounts going forward — avoids key management entirely. ADR worth writing?

---

**[{tech_lead}] — {date} 10:52**
100% agree on WIF. Write the ADR — I'll review today.

Also @{vendor_contact} — can you confirm your service accounts are using short-lived credentials? We need that locked before the security review.

---

**[{vendor_contact}] — {date} 11:03**
Confirmed — we're using WIF for all build pipelines. Zero key files in our config. Will add confirmation to the security evidence pack.

---

**[{manager}] — {date} 16:00**
End of day update:
✅ Network connectivity — COMPLETE
✅ GKE cluster — PROVISIONED (Autopilot)
🔄 IAM baseline — In progress ({person}, 80% done)
🔄 First app container — build succeeded, deployment tomorrow

Good progress. See everyone at standup tomorrow.

---

## Space 2: Security Operations Space

**Space name:** `security-ops`
**Description:** "Security alerts, incident coordination, vulnerability tracking, and policy Q&A"
**Type:** SPACE
**Members:** {ciso}, {security_architect}, {sec_ops_1}, {sec_ops_2}, {it_manager}

**Sample messages:**

---

**[security-bot] — {date} 03:17** *(automated)*
🔴 ALERT: Security Command Center — Critical Finding

Finding: Publicly exposed storage bucket
Resource: gs://novatech-temp-uploads
Severity: CRITICAL
Rule: PUBLIC_BUCKET_ACL

Auto-ticket created: SEC-2026-0891
Assigned to: On-call security engineer

---

**[{sec_ops_1}] — {date} 03:24**
On it. Investigating.

---

**[{sec_ops_1}] — {date} 03:31**
Root cause: bucket was created by a developer for a temp file transfer and ACL was not reset after use.

Actions taken:
1. Bucket ACL changed to private — DONE
2. No external access logs in the past 6 hours — confirmed no exfiltration
3. Developer notified

Closing as remediated. PIR not required for this severity given no confirmed exposure.
Adding to the next security training session as a case study.

---

**[{ciso}] — {date} 08:45**
Good catch and fast response.

Two process improvements to discuss at the weekly sync:
1. We should add an org policy to prevent public bucket creation by default
2. The temp file transfer process needs a documented procedure so engineers don't improvise

@{security_architect} can you draft the org policy config?

---

**[{security_architect}] — {date} 09:12**
Org policy draft:

```
constraint: storage.publicAccessPrevention
enforcement: enforced
```

Will test in the dev environment first. PR raised for review.

Also — I've updated the SCC notification ruleset. Critical findings will now page the on-call immediately rather than going to email only.

---

**[{sec_ops_2}] — {date} 14:30**
Weekly vulnerability scan complete. Summary:

Critical: 0 (cleared — all from last week patched)
High: 3 (new — details in SEC tracker)
Medium: 11 (7 new, 4 ongoing)

Patch window for the 3 High findings proposed for this Saturday 02:00–04:00.
@{it_manager} can you confirm the change window is available?

---

**[{it_manager}] — {date} 14:45**
Confirmed. Change request raised: CHG-2026-0342. I'll notify stakeholders.

---

## Space 3: Operations Space

**Space name:** `ops-{department}`
**Description:** "Day-to-day operational coordination for {department} — incidents, deployments, monitoring"
**Type:** SPACE
**Members:** {ops_lead}, {engineer_1}, {engineer_2}, {on_call}, {manager}

**Sample messages:**

---

**[deployment-bot] — {date} 09:00** *(automated)*
✅ DEPLOYMENT COMPLETE

Service: orders-api v2.4.1
Environment: Production (europe-west1)
Status: Healthy — 0 errors in first 5 minutes
Rollback: orders-api v2.3.9 (available for 24 hours)

Traffic: 100% on new version
Dashboard: [Cloud Monitoring link]

---

**[{engineer_1}] — {date} 09:08**
Monitoring the deployment. Response times looking normal — p50: 45ms, p99: 180ms.

One thing to keep an eye on: memory usage is slightly higher than v2.3.9 in the first 10 mins. Might just be JVM warmup. Will confirm stable in 30 min.

---

**[{ops_lead}] — {date} 09:40**
Memory stabilised at 68% — same as previous version after warmup. All green.

Deployment verified complete. Closing deployment watch.

---

**[{engineer_2}] — {date} 11:15**
Heads up — getting a spike in 429 errors from the /products endpoint. About 2% of requests.

Looking at rate limiting config — might be a client sending too many requests after the deployment. Checking now.

---

**[{engineer_2}] — {date} 11:28**
Found it. {partner_name}'s integration is hitting the endpoint in a loop due to a bug on their side. I've contacted their support team.

In the meantime, I've raised their rate limit temporarily to prevent cascading failures. Will revert once their fix is deployed.

---

**[{ops_lead}] — {date} 11:30**
Good call. Document it in the runbook — this is the second time a partner integration has caused this pattern.

Let's add a dedicated rate-limit dashboard for partner traffic in the next sprint.

---

**[{manager}] — {date} 17:00**
Weekly ops summary:
• Deployments this week: 7 (all successful)
• Incidents: 0 P1, 1 P2 (partner rate limit — resolved same day)
• Uptime: 99.94%
• On-call: No overnight pages

Good week. Thank you all.

---

## Space 4: Finance & Reporting Space

**Space name:** `finance-{department}`
**Description:** "Budget tracking, invoice approvals, expense queries, and financial reporting for {department}"
**Type:** SPACE
**Members:** {manager}, {finance_bp}, {cfo}, {department_leads}

**Sample messages:**

---

**[{finance_bp}] — {date} 09:00** *(automated report)*
📊 Monthly Cloud Cost Report — {month} {year}

Total spend: €{amount} (Budget: €{budget_amount} | Variance: {±n}%)

Top cost drivers:
1. Compute (GKE): €{n} — {n}% of total
2. Storage (GCS + BigQuery): €{n} — {n}% of total
3. Networking (egress): €{n} — {n}% of total

Anomalies:
⚠️ BigQuery slot usage 40% above forecast — {project_name} analytics queries

Recommendation: Review BigQuery slot reservations before month end.

Full report: [Google Sheets link]

---

**[{manager}] — {date} 09:15**
Thanks for the report.

@{tech_lead} — the BigQuery overage is likely from the new reporting dashboards we built for {stakeholder}. Can you check whether those queries are using reservations or on-demand slots?

If on-demand, let's move them to our slot reservation — it'll be significantly cheaper.

---

**[{tech_lead}] — {date} 09:45**
Confirmed — the dashboard queries are on on-demand. I'll migrate them to the reservation today.

Rough estimate: this will save ~€{n}/month going forward.

---

**[{finance_bp}] — {date} 10:00**
Invoice for approval: {vendor_name} — Professional Services — {month}

Amount: €{invoice_amount}
PO reference: PO-2026-0234
Approval required from: {manager}

Please reply APPROVE or flag any discrepancy.

---

**[{manager}] — {date} 10:12**
APPROVED. Matches PO. Please process.

---

**[{finance_bp}] — {date} 14:30**
Q2 budget lock reminder: Final submissions due by {date + 3 days}.

Outstanding submissions:
• {department_1}: submitted ✅
• {department_2}: PENDING — @{lead_2} please submit
• {department_3}: submitted ✅

Template in Drive: [link]. Use the same format as Q1.

---

## Space 5: Social / Culture Space

**Space name:** `random`
**Description:** "The non-work space — team wins, fun, recommendations, birthdays, and everything else"
**Type:** SPACE
**Members:** all@{domain} (company-wide)

**Sample messages:**

---

**[{person}] — {date} 08:55**
Good morning everyone! Who's joining the coffee run at 10:00?

Heading to that new place on {street_name}. They have proper espresso apparently.

---

**[{person_2}] — {date} 09:01**
Count me in!

Can you grab me a flat white? I'll Revolut you.

---

**[{person_3}] — {date} 09:04**
Yes please — same order as {person_2}.

Also — anyone else been using Gemini Code Assist for the last week? It just wrote an entire test suite for me while I was on a call. Genuinely impressed.

---

**[{engineer_1}] — {date} 09:12**
The test suite generation is wild. I had it refactor a 400-line file while I explained what I wanted in plain English. Took 3 minutes.

Still reviewing it obviously but the first pass was solid.

---

**[hr_bot] — {date} 09:30** *(automated)*
🎂 Today is {person_4}'s work anniversary! 3 years at {company}.

Thank you {person_4} — three years of great work, patience with incidents at 2am, and always bringing cake on Fridays. We appreciate you!

---

**[{ceo}] — {date} 09:35**
Happy 3 years {person_4}! Hard to imagine the team without you. 🎉

---

**[{person}] — {date} 12:05**
Book recommendation: "The Staff Engineer's Path" by Tanya Reilly.

Reading it for the third time. Relevant for anyone navigating the IC vs. management question.

[Google Play Books / Amazon link]

---

**[{manager}] — {date} 16:45**
Friday reminder: kitchen cleanup is everyone's responsibility. Dishwasher is not self-loading. 😄

Have a great weekend everyone!

---

## Space Setup Notes for Apps Script

When creating spaces via the Chat REST API:
- `displayName` — use the space name above
- `spaceType` — use `SPACE` for named spaces
- `externalUserAllowed` — `false` for internal-only spaces, `true` for spaces with external members
- Messages are posted via `spaces.messages.create` after space creation
- Webhook messages can simulate bot/automated messages using display name override
- Space emoji: can be set via Admin Console or API (optional — adds visual differentiation)
