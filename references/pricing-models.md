# Pricing Models Reference

last_verified: 2026-03-17

---

## Important Disclaimer

All prices below are US public list prices (USD). Actual customer pricing varies by:
- Region (EU prices may differ slightly)
- Volume (negotiated discounts available)
- Committed spend agreements (Flex Agreements, CUDs)
- Currency (EUR/PLN invoicing available via resellers)
- Reseller margin structure

Always verify current prices at cloud.google.com/pricing and workspace.google.com/pricing before quoting. These are directional reference numbers, not quotes.

---

## Google Workspace: Tier Pricing

### Business Tiers (1–300 users maximum)

| Tier | Price/User/Month (annual) | Storage | Key Inclusions |
|---|---|---|---|
| Business Starter | $7.20 | 30 GB pooled per user | Gmail, Docs, Drive, Calendar, Meet (100 participants), Chat |
| Business Standard | $14.40 | 2 TB pooled per user | + Meet recording, noise cancellation, Gemini in Workspace, AppSheet Core |
| Business Plus | $21.60 | 5 TB pooled per user | + Vault (eDiscovery/archiving), advanced audit, Meet 500 participants |

Note: "Pooled" storage means the organisation shares a total pool. 100 users on Business Standard get 200 TB total shared. No per-user quotas.

### Enterprise Tiers (no user cap)

| Tier | Price/User/Month (annual) | Storage | Key Inclusions |
|---|---|---|---|
| Enterprise Starter | ~$10 (contact Google for pricing) | 1 TB pooled | Entry enterprise features |
| Enterprise Standard | $23.00 | 5 TB pooled | + Enhanced security, DLP, Data Regions, Meet 500 participants, recording |
| Enterprise Plus | $28.00 | 5 TB pooled | + Enterprise Standard + advanced security (DLP rules, advanced audit) |

Note: Enterprise pricing is often negotiated. The $23/$28 are list prices; multi-thousand-user enterprises receive discounts. Contact account team.

### Frontline Worker Tiers

| Tier | Price/User/Month | Designed For |
|---|---|---|
| Frontline Starter | $2.00 | Shift workers, deskless employees (Chat, Drive, Calendar, Meet) |
| Frontline Standard | $5.00 | + additional storage, advanced device management |

### Workspace Essentials (no Gmail, for existing email customers)

| Tier | Price/User/Month | Designed For |
|---|---|---|
| Essentials Starter | $0 (free) | Just Meet + Chat + Drive (limited) — for companies that want to add Meet without switching email |
| Workspace Essentials | ~$10 (contact for pricing) | Meet, Chat, Drive, Docs — no Gmail or Vault |

Use case: Companies on M365 who want Google Meet quality without full migration. Good land-and-expand motion.

---

## Gemini for Workspace: What's Included vs Add-On

### Included in Workspace Licences (no extra charge)

| Workspace Tier | Gemini Features Included |
|---|---|
| Business Starter ($7.20) | None (Gemini not included) |
| Business Standard ($14.40) | Gemini in Gmail (draft, summarise), Gemini in Docs (help me write), Gemini in Sheets (formula suggestions), Gemini in Meet (notes, summaries) |
| Business Plus ($21.60) | Same as Business Standard |
| Enterprise Standard ($23) | Gemini in all Workspace apps + Gemini Advanced capabilities + NotebookLM Enterprise |
| Enterprise Plus ($28) | Full Gemini Enterprise capabilities |

### Gemini Add-Ons (separate licensing, for orgs on tiers without Gemini)

| Product | Price/User/Month | For |
|---|---|---|
| Gemini Business | $20 | Adds Gemini to Business Starter; includes Gemini in Gmail/Docs/Meet |
| Gemini Enterprise | $30 | Adds full Gemini to any tier; includes advanced features, Gemini in Meet with translations |

Key competitive message: Microsoft 365 Copilot costs $30/user/month as an add-on on top of any M365 plan. Google Workspace Business Standard ($14.40) includes Gemini at no extra charge. Even adding Gemini Business ($20) to Business Starter brings total to $27.20 — still under M365 Business Standard + Copilot ($12.50 + $30 = $42.50).

---

## GCP: Consumption Model (Pay-As-You-Go)

GCP's default pricing model is consumption-based:
- Pay only for what you use
- Billed per second for Compute Engine (minimum 1 minute)
- Billed per GB for storage
- Billed per TB scanned for BigQuery (on-demand)
- No commitment, no upfront payment

This model favours: development environments, variable workloads, early-stage companies, experimentation.

This model penalises: predictable production workloads running 24/7 — use CUDs for those.

---

## Sustained Use Discounts (SUDs)

Sustained Use Discounts apply automatically to Compute Engine N1 and N2 instances. No commitment or manual action required. Google calculates usage at the end of each billing month and applies discounts automatically.

### SUD Schedule for Compute Engine (N1, N2, N2D families)

| Fraction of Month VM Runs | Incremental Discount | Effective Discount vs List |
|---|---|---|
| 0–25% | 0% | 0% |
| 25–50% | 20% off | 0–20% |
| 50–75% | 40% off | 0–26.7% |
| 75–100% | 50% off | 0–30% |
| 100% (full month) | — | ~30% off list price |

Example: A VM running 100% of the month automatically costs ~30% less than the on-demand rate, with no action required.

Note: SUDs apply to N1, N2, N2D, and T2A machine families. They do NOT apply to:
- Spot VMs (separate model)
- E2 instances (have their own pricing structure)
- Preemptible VMs
- Custom machine types (calculated differently)

### SUD vs Reserved Instances (AWS comparison)

| Dimension | GCP SUD | AWS Reserved Instances |
|---|---|---|
| Commitment required | None | 1-year or 3-year |
| Upfront payment | $0 | $0, partial, or full |
| Maximum discount | ~30% automatically | Up to 72% (3-year all-upfront) |
| Flexibility | Applies to any usage mix | Locked to instance type, AZ, OS |
| Management overhead | Zero | Significant (marketplace, Savings Plans, convertible RIs) |
| Risk of over-commitment | None | Stranded capacity if workload changes |

Sales message: "You start saving on day one without doing anything. AWS requires you to predict your capacity needs 1–3 years ahead and pay upfront. GCP rewards you automatically for using the platform."

---

## Committed Use Discounts (CUDs)

CUDs are for customers who have predictable, steady-state workloads. They offer deeper savings than SUDs in exchange for a usage commitment (not a payment — you commit to using a certain number of vCPUs/memory, but you pay monthly).

### CUD Discount Levels

| Commitment Term | Discount vs On-Demand |
|---|---|
| 1-year CUD | ~37% off |
| 3-year CUD | ~55% off |

Available for:
- Compute Engine (vCPU and memory commitments)
- Cloud SQL (instance type commitments)
- Google Kubernetes Engine (node-level)

### CUD Types

**Resource-based CUDs:**
- Commit to a specific number of vCPUs and GB of memory in a region
- Most flexible — applies to any machine type that uses those resources
- Recommended for most enterprise workloads

**Spend-based CUDs:**
- Commit to a minimum monthly spend amount for specific services
- Available for Cloud Run and Cloud SQL in some cases

### CUD + SUD Stacking

CUDs and SUDs do not stack directly — if you have a CUD, you get the CUD discount. The SUD applies to usage above the committed amount. This means for baseline workloads, use CUD (better discount); for burst above CUD, SUD kicks in automatically.

### Practical Guidance

| Workload Type | Recommended Pricing |
|---|---|
| New workload, uncertain size | On-demand + SUD (automatic) |
| Dev/test environment | On-demand, consider Spot VMs |
| Steady production workload | 1-year CUD (37% off) |
| Long-term infrastructure | 3-year CUD (55% off) |
| ML training bursts | Spot/Preemptible VMs (60–91% off) |
| Data warehouse (BigQuery) | Enterprise Edition slots commitment |

---

## BigQuery Pricing

BigQuery has two distinct pricing models. Choosing the right one significantly affects total cost.

### Model 1: On-Demand (Pay Per Query)

| Resource | Price |
|---|---|
| Queries | $6.25 per TB of data scanned |
| Storage (active) | $0.02 per GB/month |
| Storage (long-term, 90+ days unchanged) | $0.01 per GB/month |
| Streaming inserts | $0.01 per 200 MB |
| Storage API reads | $1.10 per TB |

Free tier (per month):
- 10 GB of storage free
- 1 TB of queries free

Best for: sporadic querying, unpredictable workloads, smaller teams. Zero idle cost.

Warning: Large scans on wide tables can be expensive if queries are not written efficiently. Encourage partitioning and clustering to reduce TB scanned.

### Model 2: BigQuery Editions (Slot-Based)

Editions pricing is for organisations with predictable, high-volume query needs. You buy processing capacity (slots) rather than paying per TB scanned.

| Edition | Slot Price (on-demand) | Features |
|---|---|---|
| Standard | $0.04/slot-hour | Core BigQuery functionality |
| Enterprise | $0.06/slot-hour | + BI Engine, CMEK, multi-region |
| Enterprise Plus | $0.10/slot-hour | + Disaster recovery, advanced admin |

Autoscaling: Editions support autoscaling slots — you set a baseline and a maximum, pay only for what's used.

Committed slots (CUD equivalent):
- 1-year commitment: ~25% discount off slot-hour price
- 3-year commitment: ~45% discount off slot-hour price

### BigQuery On-Demand vs Editions: When to Use Which

| Customer Profile | Recommended Model |
|---|---|
| <50 TB/month queries, variable usage | On-demand |
| 50–500 TB/month, relatively consistent | Editions (Standard or Enterprise) |
| >500 TB/month or mission-critical BI | Enterprise or Enterprise Plus Editions |
| Mixed workload (burst + baseline) | Editions with autoscaling |

Practical benchmark: A team scanning 100 TB/month on-demand pays $625/month. The same workload on Standard Edition with ~200 consistent slots would cost ~$290/month (200 slots × 0.04 × 730 hrs). At this scale, Editions pay off.

---

## Cloud Storage Pricing

### Storage Classes

| Class | Use Case | Storage Cost/GB/Month | Retrieval Cost |
|---|---|---|---|
| Standard | Frequently accessed, hot data | $0.020 | None |
| Nearline | Accessed < once/month | $0.010 | $0.01/GB |
| Coldline | Accessed < once/quarter | $0.004 | $0.02/GB |
| Archive | Long-term archival, accessed < once/year | $0.0012 | $0.05/GB |

Regional note: Prices above are for US regions. EU regions are slightly higher (~10–15%). Multi-region buckets (EU multi-region) are ~20% higher than single region.

### Operations Pricing (per 10,000 operations)

| Operation Type | Standard/Nearline | Coldline | Archive |
|---|---|---|---|
| Class A (write, list) | $0.05 | $0.10 | $0.50 |
| Class B (read) | $0.004 | $0.01 | $0.50 |

### Egress Pricing

| Destination | Price |
|---|---|
| Egress to internet (first 1 TB/month) | $0.08/GB |
| Egress to internet (1–10 TB/month) | $0.06/GB |
| Egress to internet (>10 TB/month) | $0.05/GB |
| Egress within same region | Free |
| Egress between GCP regions | $0.01–0.08/GB depending on regions |
| Egress to same continent | Reduced rate |

Note: Egress costs are why cloud migrations should model data transfer carefully. Organisations moving large datasets out of other clouds will face egress charges from those providers. GCP-to-GCP within region is free.

---

## Flex Agreements (Spend Commitments)

### What They Are

Flex Agreements (also called Google Cloud Flex Agreements or Google Cloud Commit) are custom commercial agreements where a customer commits to a minimum annual spend on Google Cloud in exchange for:
- Financial incentives (credits, discounts, or both)
- Dedicated account team resources
- Access to specialised support or programs
- Potential for extended payment terms

### Who Qualifies

Typically available for customers committing:
- Google Cloud: $250K+ annual spend (indicative; Google has flexibility)
- Google Workspace: typically enterprise contract terms, no hard minimum

### Structure Options

1. **Credit-based:** Google provides credits against committed spend. Credits applied to invoices.
2. **Discount-based:** Percentage discount applied to eligible services.
3. **Hybrid:** Mix of credits and discounts across product lines.

### Key Terms to Negotiate

- Eligible services (what counts toward commitment)
- Ramp provisions (year 1 vs year 2 vs year 3 of a multi-year deal)
- Overage terms (what happens if you exceed commitment)
- True-up or roll-over provisions
- Exit clauses (what happens if you are acquired or divest)

### Guidance for Sales

Do not promise specific Flex Agreement terms. Flex Agreements are negotiated between the Google account team, legal, and the customer. Role as a partner or internal champion is to:
1. Establish the customer's 3-year cloud spend trajectory
2. Position Flex Agreements as a tool to reduce effective per-unit cost
3. Introduce the Google account team to manage commercial terms
4. Frame it: "If your spend is heading to $X million over 3 years, there's a structured way to get significant economics from Google in exchange for that commitment."

---

## Decision Tree: Which Pricing Model Fits Which Customer

```
START
│
├─ Is this Google Workspace?
│   ├─ < 300 users → Business Starter / Standard / Plus based on features needed
│   ├─ > 300 users OR needs advanced security → Enterprise Standard or Plus
│   ├─ Frontline workers → Frontline Starter / Standard
│   └─ Wants Meet/Chat without Gmail switch → Workspace Essentials
│
└─ Is this Google Cloud Platform?
    │
    ├─ What is the workload type?
    │   ├─ NEW / exploratory / variable
    │   │   └─ On-demand + SUDs (automatic). No commitment.
    │   │
    │   ├─ STEADY production compute (24/7 or near-24/7)
    │   │   ├─ 1-year horizon → 1-year CUD (37% off)
    │   │   └─ 3-year horizon → 3-year CUD (55% off)
    │   │
    │   ├─ ML TRAINING / batch burst
    │   │   └─ Spot VMs or Preemptible VMs (60–91% off, interruptible)
    │   │
    │   └─ DATA WAREHOUSE (BigQuery)
    │       ├─ <50 TB/month queries, variable → On-demand ($6.25/TB)
    │       ├─ >50 TB/month, consistent load → Editions + autoscaling slots
    │       └─ Mission-critical BI, high concurrency → Enterprise Plus Edition
    │
    └─ What is annual spend trajectory?
        ├─ <$250K/year → Standard list pricing, negotiate CUDs
        └─ >$250K/year → Explore Flex Agreement for additional economics
```

---

## TCO Framing Tips

When building a total cost of ownership comparison (cloud vs on-prem, or GCP vs competitor), apply these principles.

### What to Include (Customers Usually Forget)

**For on-premises comparison:**
- Hardware amortisation (3–5 year cycle)
- Power and cooling (typically $0.10–0.20/kWh × watts × 8,760 hours)
- Data centre rent or allocated facility cost
- IT administration FTE (50–80% of their time on infrastructure vs value-add)
- Hardware refresh risk (unplanned replacements)
- Business continuity / DR infrastructure (often double the cost)
- Software licences (OS, DB, monitoring, backup)
- Security tooling (on-prem SIEM, antivirus, patching)

**For Microsoft 365 comparison (see also business-cases.md):**
- Every add-on licence (Copilot, Intune, Defender, Purview, Azure AD Premium)
- IT admin time across 6–8 admin consoles
- Office desktop deployment and patching (if applicable)
- Storage overages on OneDrive or SharePoint

**For AWS comparison:**
- Reserved Instances that weren't fully utilised (stranded capacity)
- Data transfer / egress costs (AWS egress is among the most expensive)
- Management overhead for RI portfolio (Savings Plans, RI marketplace)
- Per-service monitoring tools (CloudWatch, CloudTrail, GuardDuty all add up)
- EKS node management overhead vs GKE Autopilot

### How to Frame the Comparison

1. **Always use a 3-year horizon minimum.** One-year TCO overstates migration cost relative to ongoing savings.
2. **Separate capital expenditure from operational expenditure.** Many customers have budget constraints — OpEx (cloud) vs CapEx (hardware) is often a budgeting advantage for cloud.
3. **Quantify IT admin time as money.** A senior sysadmin in Warsaw costs €70–90K fully loaded. If GCP saves 20% of their time, that's €14–18K/year in value.
4. **Include the cost of not having AI.** If Microsoft Copilot is the alternative, quantify what $30/user/month buys and compare to Gemini included.
5. **Model migration as one-time.** Do not annualise migration costs — they are a one-time investment, not an ongoing cost.
6. **Use ranges, not point estimates.** Present a conservative, base, and optimistic scenario. This shows intellectual honesty and makes the model more defensible.
7. **Anchor on customer's own numbers first.** Ask the customer for their current costs before building the model — their numbers are more credible than yours.
