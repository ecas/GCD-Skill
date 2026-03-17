# Pitch Deck Template: ROI & Business Case
# Audience: CFO, VP Finance, Procurement Director, CPO
# Length: 8–10 slides | Target duration: 30–40 minutes
# Use when: Budget approval stage, procurement evaluation, internal business case support

---

## Slide 1 — Title

**Headline:** The Business Case for Google Cloud at {Company}

| Element | Content |
|---------|---------|
| Subtitle | Financial Analysis & Total Value of Ownership |
| Prepared for | {CFO Name}, {Title} — {Company} |
| Prepared by | {AE Name}, Google Cloud |
| Date | {Month} {Year} |
| Confidential | This document contains commercial estimates for discussion purposes only |

**Speaker notes:**
> Lead with the CFO's frame: "This conversation is about financial outcomes, not technology. I want to show you the business case in terms your finance team will recognize." Establish that all numbers are ranges derived from industry benchmarks and will be refined with their actual cost data.

**Timing:** 1 minute

---

## Slide 2 — Business Case in 60 Seconds

**Headline:** The Summary Before the Detail

**Key findings:**

| Metric | Value |
|--------|-------|
| Current annual IT spend (estimated) | {$X}M / year |
| Projected 3-year spend on current path | {$X}M |
| Projected 3-year spend on GCP | {$X}M |
| **3-year net savings** | **{$X}M ({X}%)** |
| Expected payback period | {N} months |
| 3-year ROI | {X}% |
| NPV at {X}% discount rate | {$X}M |

**Caveat banner:** "All figures are benchmark estimates. A validated business case requires your actual cost data. Google will provide a detailed cost modeling engagement at no charge."

**Speaker notes:**
> CFOs see executive summaries first. Put the conclusion up front. They will ask "how did you get there?" — that's what slides 3–8 are for. If they challenge the numbers immediately, say: "These are ranges based on companies of similar scale in your industry. Let me show you the assumptions — and more importantly, let me show you how we can validate against your actual numbers."

**Timing:** 3 minutes

---

## Slide 3 — Current State Costs

**Headline:** What You're Spending Today — and the Trend

**Cost breakdown (populate with discovery data or industry benchmarks; flag estimated items):**

| Cost Category | Annual Amount | Source / Confidence |
|---------------|---------------|-------------------|
| Infrastructure hardware (servers, storage, networking) | {$X}K | {Estimated / Confirmed} |
| Co-location / data center facility | {$X}K | {Estimated / Confirmed} |
| Existing cloud spend ({AWS/Azure/current}) | {$X}K | {Estimated / Confirmed} |
| Software licenses ({OS, middleware, productivity}) | {$X}K | {Estimated / Confirmed} |
| IT operations headcount (infra, ops, helpdesk) | {$X}K | {Estimated / Confirmed} |
| Security tooling (endpoint, SIEM, compliance) | {$X}K | {Estimated / Confirmed} |
| Network connectivity (WAN, MPLS, VPN) | {$X}K | {Estimated / Confirmed} |
| Backup, DR, and business continuity | {$X}K | {Estimated / Confirmed} |
| **Total current annual IT spend** | **{$X}M** | |

**3-year cost trajectory (if no change):**
- Year 1: {$X}M | Year 2: {$X}M (+{X}% hardware refresh / license escalation) | Year 3: {$X}M

**Hidden costs (often excluded from IT budgets):**
- Developer productivity lost to infrastructure management: {$X}K (estimated)
- Security incident cost exposure: {$X}K expected annual value
- Opportunity cost of delayed product releases: [Qualitative — to quantify in deep-dive]

**Speaker notes:**
> The most important thing on this slide is the trend line. IT costs on legacy infrastructure rarely go flat — they compound. Hardware refreshes, license escalations, and increasing security requirements all push costs up. Show the 3-year projection without change — it makes the ROI case feel urgent.

**Timing:** 5 minutes

---

## Slide 4 — TCO Comparison

**Headline:** Total Cost of Ownership — Google Cloud vs. Status Quo

**3-Year TCO Model:**

| Category | Current Path (3 yr) | GCP Path (3 yr) | Difference |
|----------|--------------------|-----------------|-----------:|
| Infrastructure / compute | {$X}M | {$X}M | -{$X}M |
| Storage | {$X}M | {$X}M | -{$X}M |
| Networking (egress, WAN) | {$X}M | {$X}M | -{$X}M |
| Software licenses | {$X}M | {$X}M | -{$X}M |
| IT operations labor | {$X}M | {$X}M | -{$X}M |
| Security tooling | {$X}M | {$X}M | -{$X}M |
| Migration investment (one-time) | — | {$X}M | +{$X}M |
| **Total 3-year TCO** | **{$X}M** | **{$X}M** | **-{$X}M ({X}%)** |

**GCP cost optimization levers applied:**
- Committed Use Discounts (CUDs): Assumed {X}% of compute on 1-year CUD
- Sustained Use Discounts: Automatic for qualifying workloads
- Rightsizing: {X}% reduction vs. current over-provisioning baseline

**Speaker notes:**
> The TCO table is the centerpiece of this meeting. Walk through each row. For rows where you have confirmed data, say so. For estimates, flag them explicitly — CFOs will not trust a business case that mixes fact and fiction without labeling them. The migration investment is a one-time cost in year 1; show it prominently, not hidden.

**Timing:** 8 minutes

---

## Slide 5 — Savings Breakdown

**Headline:** Where the Savings Come From

**Infrastructure savings:**
- Compute: {X}% reduction from right-sizing + CUDs vs. capex hardware
- Storage: {X}% reduction from GCS tiered storage vs. on-prem SAN
- Network: {X}% reduction by eliminating {MPLS / WAN} legs for cloud-to-cloud traffic
- Hardware refresh avoidance: {$X}M — next refresh cycle {Year}

**License savings:**
- {Product license 1}: {$X}K/year — replaced by GCP native service
- {Product license 2}: {$X}K/year — replaced or renegotiated
- Microsoft 365 → Google Workspace: {$X}K/year delta (if applicable)

**Operations savings:**
- Automation of {X} hours/week of manual infrastructure tasks × {FTE cost}
- Elimination of {N} FTE positions reclassified to higher-value work
- Support contract consolidation: {$X}K/year

**Security savings:**
- Tool consolidation: {N} security tools eliminated, saving {$X}K/year
- Incident response time: {X}% reduction (validated by SCC + Chronicle automation)
- Avoided breach cost: {$X}M expected annual value (based on industry breach cost data)

**Speaker notes:**
> Each savings category should have a source. "Infrastructure savings are based on comparable migrations at {reference company type} — Google has public benchmark data we can share." Avoid presenting vague percentages without connecting them to a dollar figure. CFOs think in dollars.

**Timing:** 5 minutes

---

## Slide 6 — Productivity Gains

**Headline:** The Savings You Don't See in the Infrastructure Budget

**Developer productivity (sourced: IDC / Forrester Google-commissioned studies — cite):**
- Gemini Code Assist: {X}% reduction in time-to-code for new features
- GKE vs. self-managed Kubernetes: {X} hours/sprint saved per developer
- Cloud Build CI/CD: {X}% faster deployment pipelines
- **Value: {$X}K/year** (based on {N} developers × {$X} blended hourly cost)

**IT operations productivity:**
- Automated provisioning: {X} hours saved per new deployment
- Unified monitoring: {X} hours saved per week vs. multi-tool monitoring
- Self-service infrastructure: {N}% reduction in IT helpdesk tickets
- **Value: {$X}K/year** (based on {N} FTE IT staff)

**End-user productivity (if Workspace migration included):**
- Google Meet vs. {incumbent}: {X} minutes saved per meeting (fewer connectivity issues)
- Gemini in Workspace: {X}% time reduction on document drafting, email, summarization
- Collaboration reduction in tool-switching overhead: {X} min/person/day
- **Value: {$X}K/year** (based on {N} employees × {$X} blended cost)

**Total productivity gains (3-year):** {$X}M

**Speaker notes:**
> Productivity gains are harder to put in the budget but real. CFOs may discount them — acknowledge that: "We don't include productivity in the hard savings column, but even at 50 cents on the dollar, this is material." Use the IDC study numbers as external validation, not Google claims.

**Timing:** 5 minutes

---

## Slide 7 — Risk Reduction

**Headline:** The Risks You're Carrying Today — and What They Cost If They Materialise

**Risk 1: Security breach**
- Current exposure: {Describe current security posture gap}
- Cost if realized: {$X}M (source: IBM Cost of Data Breach Report {year} — {industry} average)
- GCP mitigation: {Specific control — e.g., SCC + BeyondCorp}
- Residual risk: Significantly reduced — quantified reduction [cite]

**Risk 2: Compliance failure**
- Regulation: {GDPR / NIS2 / industry-specific}
- Penalty exposure: {$X}M (cite regulatory maximum — e.g., "4% of global annual turnover under GDPR")
- Current compliance posture: {Gap identified in research}
- GCP mitigation: Assured Workloads + pre-built compliance controls

**Risk 3: Business continuity**
- Current RTO/RPO: {Estimated from their current setup}
- Cost of downtime: {$X}K/hour (industry average or their estimate)
- GCP mitigation: Multi-region deployment, 99.99% SLA for critical services
- Annual avoided outage cost (at current MTTR): {$X}K

**Risk 4: Technology obsolescence**
- Current refresh cycle: {N}-year capex cycle
- Cost of falling behind: {Competitive or operational impact}
- GCP mitigation: Evergreen platform — always on latest infrastructure

**Speaker notes:**
> Risk is often the most compelling section for CFOs because it's about avoiding catastrophic loss, not just optimizing cost. Present each risk as a probability-weighted expected cost. If they push back on the numbers, agree to model their actual risk appetite in the detailed business case.

**Timing:** 5 minutes

---

## Slide 8 — Investment & Payback

**Headline:** What You Invest, When You Get It Back, and the Return

**Investment profile:**

| Period | Investment | Return | Net Cash Flow |
|--------|-----------|--------|--------------|
| Year 0 (Migration) | {$X}M | — | -{$X}M |
| Year 1 | {$X}M (run rate) | {$X}M savings | +{$X}M |
| Year 2 | {$X}M (run rate) | {$X}M savings | +{$X}M |
| Year 3 | {$X}M (run rate) | {$X}M savings | +{$X}M |
| **3-Year Total** | **{$X}M** | **{$X}M** | **+{$X}M** |

**Financial metrics:**
- Payback period: {N} months from migration start
- 3-year ROI: {X}%
- NPV ({X}% discount rate): {$X}M
- IRR: {X}%

**Investment structure options:**
- Upfront commitment (best pricing): Committed Use Discounts for {X}% savings vs. on-demand
- Consumption-based: Pay as you go — higher unit cost, lower commitment risk
- Flexible commitment: {1-year / 3-year} CUDs for predictable workloads; on-demand for variable

**Speaker notes:**
> The payback chart is the most important visual in this deck. Show it as a cumulative cash flow chart if possible: negative in year 0, crossing into positive in month {N}. CFOs and procurement think in payback periods. Sub-24-month payback is typically approvable without exceptional sign-off. Over 36 months requires a strategic narrative.

**Timing:** 5 minutes

---

## Slide 9 — Sensitivity Analysis

**Headline:** What If the Assumptions Are Wrong?

**Base case vs. scenario analysis:**

| Assumption | Bear Case (-30%) | Base Case | Bull Case (+20%) |
|------------|-----------------|-----------|-----------------|
| Infrastructure savings | {$X}M | {$X}M | {$X}M |
| Productivity gains | {$X}M | {$X}M | {$X}M |
| Migration cost | {$X}M (higher) | {$X}M | {$X}M (lower) |
| **Net 3-year savings** | **{$X}M** | **{$X}M** | **{$X}M** |
| **Payback period** | **{N} months** | **{N} months** | **{N} months** |
| **ROI** | **{X}%** | **{X}%** | **{X}%** |

**Break-even analysis:**
- Migration achieves positive ROI even if savings are {X}% lower than modeled
- Investment is value-creating across all reasonable scenarios

**Key risks to the model:**
- Migration takes longer than planned: {Mitigation — phased approach limits exposure}
- Productivity gains not realized: {Mitigation — change management, adoption program}
- Cost model incorrect: {Mitigation — detailed modeling workshop before commitment}

**Speaker notes:**
> CFOs appreciate when you show the downside. It builds credibility. "Even in our bear case, where savings come in 30% below our base case, the investment pays back in {N} months." If your bear case still looks good, you've addressed the skepticism proactively. If it doesn't look good in the bear case, acknowledge it and explain why you still believe in the base case.

**Timing:** 5 minutes

---

## Slide 10 — Building Your Internal Business Case

**Headline:** We'll Help You Make the Case Internally

**What Google provides to support your internal approval:**

| Deliverable | Purpose | Timeline |
|------------|---------|---------|
| Detailed cost modeling workshop | Validate all assumptions with your actual cost data | 2–3 weeks |
| Formal TCO report (co-branded) | Internal CFO / board presentation artifact | 4 weeks |
| Executive Business Review with Google leadership | Executive credibility for internal stakeholders | By request |
| Reference customer call | Peer validation from similar organization | 2 weeks to arrange |
| Proof of Concept credits | De-risk the technical decision | Immediate |
| Customer Success Manager onboarding | Ensure realization of projected savings | On contract signature |

**Internal approval dependencies (typical):**
- IT sign-off: Technical viability (covered by technical deep-dive track)
- Security/CISO sign-off: Security architecture review (scheduled separately)
- Legal/procurement: DPA, SLAs, vendor qualification process
- Finance: This document + detailed model
- Board/exec: Executive overview deck (separate)

**Proposed next step:** Schedule cost modeling workshop with your finance and IT teams.

**Speaker notes:**
> End with an offer to help them sell internally — not a close. CFOs rarely make unilateral decisions on infrastructure. Your job is to give them the ammunition to go to their CEO, board, or procurement committee. Ask: "Who else needs to be part of the financial review?" Their answer tells you the decision-making map.

**Timing:** 3 minutes

---

## Usage Notes

- This deck must be presented with a clear disclaimer that all financial figures are estimates until validated with customer data.
- Never present specific pricing or discount levels in this deck — direct pricing discussions to a commercial proposal.
- The detailed cost modeling workshop (slide 10) is your primary next step ask — it extends the engagement and yields validated numbers.
- For Polish-language delivery: all financial terminology translated; currency may be PLN depending on context.
- Collaborate with a Google commercial architect or FinOps specialist to validate TCO models before presenting to the CFO.
