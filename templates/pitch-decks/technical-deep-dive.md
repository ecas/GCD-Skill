# Pitch Deck Template: Technical Deep Dive
# Audience: CTO, VP Engineering, Enterprise Architect, Infrastructure Lead, Security Architect
# Length: 15–20 slides | Target duration: 60–90 minutes
# Use when: Technical discovery follow-up, architecture review, POC scoping session

---

## Slide 1 — Title

**Headline:** Google Cloud Technical Review — {Company}

| Element | Content |
|---------|---------|
| Subtitle | Architecture, Security & Migration Deep Dive |
| Date | {Month} {Year} |
| Presenter | {CE Name}, Customer Engineer, Google Cloud |
| Supporting | {AE Name}, Account Executive |

**Speaker notes:**
> Introduce your technical role clearly. Establish credibility briefly: "I work with about a dozen companies like yours on architecture decisions — my job today is to understand your environment and show you where GCP can genuinely help." Set expectations: "This is a working session. Stop me any time."

**Timing:** 2 minutes

---

## Slide 2 — Technical Agenda

**Headline:** What We'll Cover — and What We Want to Learn

| # | Topic | Format | Time |
|---|-------|--------|------|
| 1 | Your current architecture | You present / we listen | 15 min |
| 2 | Technical pain points | Discussion | 10 min |
| 3 | GCP architecture overview | We present | 10 min |
| 4 | Product deep-dives relevant to your stack | We present + Q&A | 20 min |
| 5 | Security & compliance architecture | Discussion | 10 min |
| 6 | Migration methodology | We present | 10 min |
| 7 | Developer & admin experience | Demo/walkthrough | 10 min |
| 8 | POC proposal & success criteria | Joint | 10 min |

**Speaker notes:**
> Ask them to walk you through their current architecture first — this tells you more than any research. Listen for: bottlenecks, manual processes, security gaps, and where they're already thinking about change. Take notes. Everything in this session should feed your POC proposal at the end.

**Timing:** 1 minute

---

## Slide 3 — Current Architecture

**Headline:** Tell Us Where You Are Today — We'll Map From There

**Framework for their walkthrough (pre-fill what you know; let them correct):**

| Layer | Current State (Pre-filled from research) | To Confirm |
|-------|------------------------------------------|-----------|
| Compute | {e.g., On-prem VMware / AWS EC2 / Azure VMs} | Actual count, versions |
| Storage | {e.g., NAS + S3 / on-prem SAN} | Capacity, growth rate |
| Networking | {e.g., MPLS + VPN / SD-WAN} | Topology, egress costs |
| Data & Analytics | {e.g., SQL Server / Oracle / Redshift} | Query volumes, data sizes |
| Applications | {e.g., Monolith / SAP / custom Java} | Critical path, dependencies |
| Identity & Access | {e.g., Active Directory / Okta} | SSO scope, MFA coverage |
| Security tooling | {e.g., {Vendor} SIEM, {Vendor} endpoint} | Coverage gaps |
| Collaboration | {e.g., Microsoft 365 / on-prem Exchange} | Seat count, license spend |

**Speaker notes:**
> Do NOT just read this table back to them. Use it as a conversation prompt. "From our research, we believe you're running VMware on-prem for compute — is that still accurate?" Corrections here are gold — update your notes in real time. The goal of this slide is to make them feel heard, not to demonstrate what you already know.

**Timing:** 15 minutes (them talking, you listening)

---

## Slide 4 — Technical Pain Points

**Headline:** Where the Architecture Is Creating Friction

**Structure (populate from discovery + research):**

| Pain | Symptom | Technical Root Cause | Priority |
|------|---------|---------------------|---------|
| {Pain 1} | {Observable symptom} | {Underlying technical cause} | High / Med / Low |
| {Pain 2} | {Observable symptom} | {Underlying technical cause} | High / Med / Low |
| {Pain 3} | {Observable symptom} | {Underlying technical cause} | High / Med / Low |
| {Pain 4} | {Observable symptom} | {Underlying technical cause} | High / Med / Low |
| {Pain 5} | {Observable symptom} | {Underlying technical cause} | High / Med / Low |

**Speaker notes:**
> This slide should be partially blank going into the meeting and filled in live. Pre-populate with hypotheses from research, then validate each one. Ask: "Would you add anything to this list?" Their additions become your highest-priority items. Prioritization should come from them, not you.

**Timing:** 10 minutes

---

## Slide 5 — Industry Technology Trends

**Headline:** The Technical Patterns Emerging in {Industry} Right Now

**Trend 1: {e.g., Containerization and workload portability}**
- What's happening: [Brief description]
- Technical implication: [Architecture shift required]
- GCP relevance: [How GCP addresses this]

**Trend 2: {e.g., Real-time data processing over batch}**
- What's happening: [Brief description]
- Technical implication: [Architecture shift required]
- GCP relevance: [How GCP addresses this]

**Trend 3: {e.g., AI inference at scale — moving from experimentation to production}**
- What's happening: [Brief description]
- Technical implication: [Architecture shift required]
- GCP relevance: [How GCP addresses this]

**Trend 4: {e.g., Zero-trust network architecture replacing perimeter security}**
- What's happening: [Brief description]
- Technical implication: [Architecture shift required]
- GCP relevance: [How GCP addresses this]

**Speaker notes:**
> Keep this brief — technical audiences value depth over breadth. Pick the 2–3 trends most relevant to their pain points. Use technical language; don't over-explain fundamentals to architects. If they challenge a trend, engage — a debate here builds credibility.

**Timing:** 5 minutes

---

## Slide 6 — GCP Architecture Overview

**Headline:** Google Cloud: Infrastructure Designed at Internet Scale

**Content structure:**

**Global Infrastructure:**
- {N} regions, {N} zones, {N}+ PoPs
- Private backbone: Google's own fiber, not public internet for inter-region traffic
- Network latency advantage: [Key differentiator vs. competitor relevant to this customer]

**Core Platform Layers:**
```
┌─────────────────────────────────────────────────────┐
│  AI / ML Layer    Vertex AI | Gemini | AutoML       │
├─────────────────────────────────────────────────────┤
│  Data Layer       BigQuery | Dataflow | Pub/Sub     │
├─────────────────────────────────────────────────────┤
│  App Layer        GKE | Cloud Run | App Engine      │
├─────────────────────────────────────────────────────┤
│  Compute Layer    Compute Engine | Bare Metal       │
├─────────────────────────────────────────────────────┤
│  Storage Layer    GCS | Filestore | Persistent Disk │
├─────────────────────────────────────────────────────┤
│  Security Layer   IAM | BeyondCorp | SCC | VPC-SC   │
├─────────────────────────────────────────────────────┤
│  Network Layer    VPC | Cloud Armor | Cloud CDN      │
└─────────────────────────────────────────────────────┘
```

**Speaker notes:**
> The architecture diagram should connect to their stack. If they're on Kubernetes, GKE is the conversation. If they're heavy on data, BigQuery is the anchor. Don't try to cover every product — highlight the layers most relevant to their pain points from slide 4.

**Timing:** 10 minutes

---

## Slide 7 — Product Deep-Dive 1

**Headline:** {Product Name} — {One-Sentence Value Statement}

**Product:** {e.g., BigQuery | GKE | Vertex AI | Cloud Spanner | Apigee}

| Dimension | Detail |
|-----------|--------|
| What it is | [Technical definition — one sentence] |
| What problem it solves | [Maps to pain point from slide 4] |
| Architecture pattern | [How it fits into their stack] |
| Key differentiator vs. {competitor equivalent} | [Specific technical advantage] |
| Scale proof point | [Customer or Google internal usage stat] |
| Pricing model | [Key pricing mechanics — no specific numbers] |

**Architecture snippet / diagram:** [Insert relevant architecture showing this product in context]

**Live demo / reference:** [Link to demo or documentation]

**Speaker notes:**
> Go technical here. Architects respond to depth. If they've used the competitor equivalent, compare directly and honestly. "BigQuery vs. Redshift" or "GKE vs. EKS" are fair comparisons — acknowledge what the other does well before making your case. Credibility comes from honesty, not cheerleading.

**Timing:** Part of product deep-dives section (slides 7–8): 20 minutes total

---

## Slide 8 — Product Deep-Dive 2

**Headline:** {Product Name} — {One-Sentence Value Statement}

**Product:** {Second product relevant to their pain points}

| Dimension | Detail |
|-----------|--------|
| What it is | [Technical definition] |
| What problem it solves | [Maps to pain point from slide 4] |
| Architecture pattern | [Integration with their stack] |
| Key differentiator | [Specific technical advantage] |
| Scale proof point | [Usage stat or customer outcome] |
| Pricing model | [Key mechanics] |

**Architecture snippet / diagram:** [Insert relevant architecture]

**Speaker notes:**
> Same depth as slide 7. If time is running short, flip to the POC slide — the detailed product deep-dives can continue asynchronously in documentation you provide post-meeting. Always prioritize getting to the POC conversation.

**Timing:** See slide 7 combined timing

---

## Slide 9 — Integration Map

**Headline:** GCP Doesn't Replace Your Stack — It Integrates With It

**Integration landscape:**

| Existing System | Integration Pattern | GCP Capability | Notes |
|----------------|---------------------|---------------|-------|
| {Active Directory / Okta} | Identity federation via SAML/OIDC | Cloud Identity + Workspace | No re-provisioning required |
| {SAP / Oracle / custom ERP} | Managed connector / API gateway | Apigee / Datastream | Real-time or batch sync |
| {Existing CI/CD — Jenkins / GitLab} | Native integration or Cloud Build | Cloud Build / Cloud Deploy | Keep existing tools if preferred |
| {On-prem databases} | Database Migration Service | DMS + Datastream | Minimal downtime migration |
| {Microsoft 365} | Coexistence mode | Google Workspace + Vault | Hybrid possible |
| {Existing monitoring — Datadog / Splunk} | Log export / metrics forwarding | Cloud Logging + Pub/Sub | Existing investments preserved |

**Speaker notes:**
> The biggest technical objection in migration deals is "we'd have to rip and replace everything." This slide kills that objection. Show that GCP meets them where they are. Emphasize: Google invests heavily in integration because we know enterprises don't start from scratch.

**Timing:** 5 minutes (can be part of product deep-dive time)

---

## Slide 10 — Security Architecture

**Headline:** Security Is Designed In, Not Bolted On

**GCP Security Layers:**

```
Prevention          Detection           Response
──────────          ─────────           ────────
IAM + VPC-SC        Security Command    Cloud Armor (automated)
BeyondCorp          Center (SCC)        SOAR integrations
Org Policy          Cloud Logging       Incident playbooks
CMEK / CSEK         Threat Intelligence Assured Workloads
Binary Auth         Container Analysis  Chronicle SIEM
```

**Relevant to {Company}'s compliance requirements:**
| Regulation | GCP Control | Coverage |
|------------|------------|---------|
| {GDPR / RODO} | Assured Workloads, data residency, DPA | Full |
| {NIS2} | SCC, vulnerability management, incident response | Full |
| {ISO 27001 / SOC 2} | Compliance reports available, inheritable controls | Full |
| {Industry-specific: PCI-DSS / HIPAA / etc.} | {Specific controls} | {Coverage level} |

**Speaker notes:**
> CISOs often attend technical sessions. If your contact is security-focused, allocate more time here. Lead with: "Google Cloud is the only hyperscaler that has gone through external audits for {relevant certification}." Then connect to their specific compliance requirements identified in research.

**Timing:** 10 minutes

---

## Slide 11 — Data Residency

**Headline:** Your Data Stays Where You Need It To

**Data residency options for {Company's country/region}:**

| Option | Description | Use case |
|--------|-------------|---------|
| Standard region | Data stored in {europe-west1} or {specified region} | Most workloads |
| Assured Workloads | Enforced residency + access controls + compliance monitoring | Regulated data |
| Sovereign Controls | Operator access restrictions, jurisdictional controls | Government / critical infrastructure |
| Google Distributed Cloud | On-premises hardware running GCP software | Air-gapped / classified |

**Your processing locations:**
- Primary: {Region — e.g., europe-west1, Warsaw}
- Failover: {Region — e.g., europe-west4, Netherlands}
- No data processed outside: {Specified geography — e.g., EEA}

**GDPR/RODO data processing:**
- Data Processing Agreement (DPA) available
- Standard Contractual Clauses (SCCs) current model
- Transfer Impact Assessment (TIA) support available

**Speaker notes:**
> Data residency is a blocker in EU deals if not addressed proactively. Lead with the answer: "Yes, your data can stay in Poland/EU, here's how." Then explain the controls. For regulated industries (healthcare, finance, government), Assured Workloads is almost always the answer.

**Timing:** Part of security section or standalone if data residency is a key concern

---

## Slide 12 — Migration Methodology

**Headline:** A Proven Migration Framework — Used in 10,000+ Cloud Migrations

**Google Migration Framework: The 4 Rs + Assessment**

```
Phase 0: Assess (4–8 weeks)
├── Discovery: CAST or Stratozone automated discovery
├── Dependency mapping: Application dependencies visualized
├── TCO analysis: Current cost vs. GCP modeled cost
└── Migration wave plan: Prioritized by risk/value

Phase 1: Pilot (6–12 weeks)
├── Lift-and-shift: First 10–20 workloads (lowest risk)
├── Network connectivity: Interconnect or VPN established
├── Security baseline: IAM, VPC, logging configured
└── Go/no-go decision: Based on pilot metrics

Phase 2: Migrate (3–12 months)
├── Wave execution: Batches of workloads per plan
├── Re-platform: Containerization where valuable
├── Data migration: DMS + Datastream for databases
└── Cutover: Per-workload cutover with rollback plan

Phase 3: Optimize (Ongoing)
├── FinOps: Committed Use Discounts, rightsizing
├── Modernization: Re-architecture for cloud-native
├── AI enablement: First ML/AI use cases in production
└── Continuous improvement: SRE practices embedded
```

**Speaker notes:**
> Technical audiences respect process. This framework reduces their perceived risk. Key message: "We've done this thousands of times. We have tooling, playbooks, and dedicated migration teams. You're not pioneering — you're following a well-lit path." The assessment phase is typically a free or low-cost starting point.

**Timing:** 10 minutes

---

## Slide 13 — Admin Experience

**Headline:** What Your IT Team Actually Lives With Day to Day

**Google Admin Console / Cloud Console highlights relevant to their pain:**

| Admin Task | Current experience with {incumbent} | GCP / Workspace experience |
|-----------|-------------------------------------|---------------------------|
| User provisioning | [Pain description from discovery] | Automated SCIM sync, bulk operations, audit trail |
| Policy management | [Pain description] | Org Policy, hierarchical inheritance |
| Security monitoring | [Pain description] | SCC unified dashboard, automated findings |
| Cost visibility | [Pain description] | Billing export to BigQuery, real-time dashboards |
| Compliance reporting | [Pain description] | Pre-built compliance dashboards, exportable evidence |

**Key admin capabilities:**
- Directory: Google Admin + Cloud Identity — SSO, MFA, endpoint management
- Fleet management: Chrome Enterprise for managed devices
- Audit: Complete audit log for all admin actions, 6-year retention

**Speaker notes:**
> This section resonates with IT directors and ops leads who are not in the CTO meeting but will influence the decision. If the CTO's team will be managing this environment, show them what their Monday morning looks like. Admin simplicity reduces TCO and is a credible differentiator.

**Timing:** Part of developer/admin experience section (slides 13–14): 10 minutes total

---

## Slide 14 — Developer Experience

**Headline:** Developers Choose GCP — Then Advocate for It Internally

**Developer capabilities relevant to their stack:**

| Developer Need | GCP Capability | Why It Matters for {Company} |
|---------------|---------------|------------------------------|
| Container platform | GKE Autopilot — fully managed Kubernetes | No node management overhead |
| Serverless | Cloud Run — any container, any language, zero config | Faster deployment cycles |
| CI/CD | Cloud Build + Cloud Deploy — native, fast | [Connect to their current CI/CD pain] |
| IDE integration | Cloud Code — VS Code / JetBrains plugins | Developers stay in their tools |
| AI coding assistant | Gemini Code Assist | [Quantified productivity improvement] |
| Databases | Cloud Spanner, Firestore, AlloyDB | [Match to their workload needs] |
| Observability | Cloud Monitoring + Trace + Profiler | Full-stack visibility in one UI |

**Speaker notes:**
> Developer experience wins grass-roots adoption. If developers love the platform, they advocate internally. Ask: "What does your current developer workflow look like from commit to production?" Then map GCP capabilities directly onto their answer. Gemini Code Assist is a strong hook — it's tangible and immediate value.

**Timing:** See slide 13 combined timing

---

## Slide 15 — AI/ML Roadmap

**Headline:** Where the Platform Is Heading — and What It Unlocks for You

**Google AI/ML capabilities — maturity ladder:**

```
Level 1 (Available Now):
├── Gemini in Workspace: AI in Docs, Sheets, Gmail, Meet
├── Vertex AI: Managed ML training and serving
└── Pre-built APIs: Vision, Speech, Translation, NL

Level 2 (Production-Ready):
├── Gemini API: Build apps on Gemini models
├── RAG Architecture: Ground Gemini on your data
└── Fine-tuning: Customize models for your domain

Level 3 (Emerging):
├── Multimodal: Text + image + video + audio processing
├── Agents: Autonomous AI workflows
└── Reasoning: Complex multi-step task automation
```

**Potential AI use cases for {Company} in {Industry}:**
- **Quick win (3–6 months):** {Specific use case — e.g., "AI-powered document processing for {their department}"}
- **Medium term (6–12 months):** {Specific use case}
- **Strategic (12+ months):** {Specific use case}

**Speaker notes:**
> Don't over-promise on AI. Architects are skeptical of hype. Anchor in what's production-ready today. The quick win use case should be specific to their industry and achievable in their current architecture. Ask: "Are you already experimenting with AI anywhere in the organization?" Their answer reveals both appetite and existing experiments you can build on.

**Timing:** 5 minutes (standalone) or integrated with product deep-dives

---

## Slide 16 — Reference Architecture

**Headline:** {Use Case} on GCP — Reference Architecture

**Architecture diagram:** [Insert architecture diagram specific to their primary use case — e.g., "E-commerce platform", "Healthcare data platform", "Manufacturing IoT pipeline"]

**Components:**
| Layer | Component | Purpose |
|-------|-----------|---------|
| Ingestion | {Pub/Sub / Cloud Storage / Datastream} | {Purpose} |
| Processing | {Dataflow / Dataproc / Cloud Functions} | {Purpose} |
| Storage | {BigQuery / Cloud SQL / Spanner} | {Purpose} |
| Serving | {Apigee / Cloud Run / GKE} | {Purpose} |
| Security | {VPC-SC / CMEK / SCC} | {Purpose} |
| Observability | {Cloud Monitoring / Logging / Trace} | {Purpose} |

**Variants considered:**
- {Alternative 1} — selected because {reason}
- {Alternative 2} — rejected because {reason}

**Speaker notes:**
> Reference architectures are one of the most credible things you can leave behind. Show that you've thought about their specific use case, not just presented a generic slide. If you have a customer who has built this architecture, reference them. Offer to share the architecture diagram as a follow-on artifact.

**Timing:** 5 minutes

---

## Slide 17 — POC Proposal

**Headline:** A Focused Proof of Concept — Real Results in {N} Weeks

**Proposed POC Scope:**

| Element | Detail |
|---------|--------|
| Use case | {Specific use case from their priority list} |
| Duration | {4–8 weeks typical} |
| Success criteria | {3–5 measurable criteria — defined jointly} |
| Required from {Company} | {Access, data sample, team time} |
| Required from Google | {CE time, credits, partner support} |
| Infrastructure | {New dedicated GCP project, isolated from production} |

**Proposed timeline:**
- Week 1: Environment setup, connectivity, baseline
- Weeks 2–{n}: Core build and testing
- Week {n}: Results review, decision meeting

**Credit availability:** Google Cloud POC credits may be available — discuss with account team.

**Speaker notes:**
> The POC should be designed to answer the customer's top technical question — not to demonstrate every Google product. A focused POC that answers "can GCP run our most critical workload faster and cheaper" is more valuable than a sprawling demo of 10 products. Get joint ownership on success criteria — if they help define them, they're committed to evaluating honestly.

**Timing:** 10 minutes

---

## Slide 18 — Technical Success Criteria

**Headline:** How We'll Know This Worked — Agreed in Advance

**Success criteria for POC (fill jointly during session):**

| Criterion | Measurement Method | Target | Weight |
|-----------|-------------------|--------|--------|
| Performance: {e.g., query response time} | {Benchmark tool} | {e.g., < 2 sec p95} | High |
| Cost: {e.g., compute cost per job} | Billing export | {e.g., ≤ current cost} | High |
| Reliability: {e.g., uptime during test} | Cloud Monitoring | {e.g., 99.9%} | High |
| Security: {e.g., all traffic encrypted, no policy violations} | SCC scan | Zero critical findings | High |
| Developer experience: {e.g., deployment time} | Cloud Deploy metrics | {e.g., < 10 min} | Medium |
| Admin overhead: {e.g., time to provision new user} | Measured task timing | {e.g., < 5 min} | Medium |

**Post-POC decision gate:**
- All High criteria met → Proceed to Phase 1 commercial proposal
- Majority met, gaps identified → Extend POC / address specific gaps
- Critical gaps remain → Root cause review, revised approach

**Speaker notes:**
> Writing these down together is a commitment device. It reduces the risk of a "yeah it worked technically but we decided not to move forward" outcome. Review these criteria at the end of the POC with the same people in the room who helped define them.

**Timing:** Part of POC discussion (slides 17–18): 10 minutes total

---

## Slide 19 — Support SLAs

**Headline:** Support That Matches Enterprise Expectations

**Google Cloud Support Tiers:**

| Tier | First Response | Coverage | Key Inclusions |
|------|---------------|---------|---------------|
| Basic | Not guaranteed | Business hours | Documentation, community |
| Standard | 4 hours (P1: 1 hour) | Business hours | Technical support, billing |
| Enhanced | 1 hour (P1: 15 min) | 24/7 for P1 | Dedicated TAM option |
| Premium | 15 min (P1) | 24/7 | Dedicated TAM, proactive monitoring, training credits |

**Recommended for {Company}:** {Enhanced / Premium} — reason: {connect to their reliability requirements}

**Partner support:**
- {Partner Name} provides Level 1 support in {language}
- Escalation path to Google Level 2/3 defined in support agreement

**Speaker notes:**
> Enterprise IT teams care deeply about support escalation paths. Find out who their current support contact is at {incumbent} and whether they're satisfied. Google Premium support with a Technical Account Manager is often a differentiator when a company has had bad support experiences elsewhere.

**Timing:** 5 minutes

---

## Slide 20 — Technical Next Steps

**Headline:** Concrete Actions to Keep Momentum

**Agreed actions from today:**

| # | Action | Owner | Target Date |
|---|--------|-------|------------|
| 1 | [e.g., Share reference architecture document] | {CE Name} | {Date + 2 days} |
| 2 | [e.g., Set up GCP trial org for POC] | {CE Name} + {Customer IT Lead} | {Date + 1 week} |
| 3 | [e.g., Schedule security architecture deep-dive] | {CE Name} + {Customer CISO} | {Date + 2 weeks} |
| 4 | [e.g., Provide access to Stratozone for discovery scan] | Google CE | {Date + 1 week} |
| 5 | [e.g., Define POC success criteria document — shared doc] | Joint | {Date + 3 days} |

**Resources to share:**
- GCP architecture decision guides: cloud.google.com/architecture
- Relevant case study: [Link or PDF]
- POC project template: [Link]

**Speaker notes:**
> Leave the room with every action item named, owned, and dated. Send a follow-up email within 24 hours with this list. The first action should happen within 48 hours to maintain momentum. If you committed to sending something, send it before end of day.

**Timing:** 5 minutes

---

## Usage Notes

- This deck is a conversation guide, not a reading script. Most content should be discussed, not read from slides.
- Slides 3–4 are the most important — if you run short on time, protect those.
- Technical audiences will ask hard questions. Prepare competitor comparison answers for GKE vs. EKS, BigQuery vs. Redshift, GCP networking vs. AWS/Azure.
- Slides can be split across two sessions (architecture/product in session 1; security/migration/POC in session 2) for complex deals.
- For Polish-language delivery: translate narrative content; technical product names and acronyms remain in English.
