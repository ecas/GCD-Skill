# Vertical Playbook: Financial Services

## Table of Contents
1. Market Context
2. Top Pain Points
3. Relevant Google Products
4. Typical Deal Profile
5. Compliance Landscape
6. Top 3 Use Cases
7. Killer Demo Scenario
8. Competitive Landscape
9. Macro Trends
10. Discovery Questions

---

## 1. Market Context

Financial services is GCP's largest and most competitive vertical. Banks, insurers, asset managers, and fintechs are under simultaneous pressure from three directions: regulators demanding more risk transparency and faster incident reporting, fintechs and neobanks eroding margins with AI-native products, and customers demanding real-time, personalised experiences. The era of batch-processing everything overnight is ending — real-time is now table stakes.

**The "why now":** Open Banking mandates (PSD2 in EU, similar globally) forced banks to become API platforms. That infrastructure investment is now the foundation for AI-powered services. Banks that didn't do PSD2 properly are now two steps behind. Google's real-time data infrastructure is uniquely positioned for this shift.

---

## 2. Top Pain Points

1. **Real-time fraud detection** — Fraud losses globally exceed $30B annually; batch-based detection is 24–72 hours too slow
2. **Regulatory reporting burden** — DORA (Digital Operational Resilience Act), Basel IV, IFRS 9/17 require complex, auditable, real-time risk calculations
3. **Legacy core banking systems** — Mainframe-based core systems (Temenos, Murex, custom COBOL) prevent agility; can't launch products in weeks
4. **Data fragmentation** — Customer 360 is impossible when mortgage data, credit card data, and investment data are in different systems with different schemas
5. **Talent competition** — Banks compete with Google, Meta, Amazon for data scientists and ML engineers; they rarely win
6. **Cloud risk concentration** — Regulators (ECB, FCA, KNF in Poland) are scrutinising over-reliance on single cloud providers
7. **Anti-money laundering (AML) efficiency** — 90%+ of AML alerts are false positives; compliance staff spend enormous effort on non-suspicious cases
8. **Customer churn** — Neobanks (Revolut, N26, Monzo) are winning younger customers with better UX; traditional banks' apps look dated

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Fraud detection | BigQuery ML, Vertex AI, Pub/Sub (real-time streams) | Sub-second scoring at scale; no separate ML infrastructure |
| Regulatory reporting | BigQuery, Dataform, Looker | Auditable lineage; SQL-based transformations that compliance teams understand |
| Legacy modernisation | Bare Metal Solution, Database Migration Service, AlloyDB | In-place migration path before re-architecture |
| Customer 360 | BigQuery + Dataplex + Cortex Framework (FSI) | Pre-built connectors for SAP, Salesforce, core banking systems |
| Talent gap | Vertex AI (AutoML, Notebooks), BigQuery ML | Data analysts can build ML models without ML engineers |
| Multi-cloud risk | Anthos (multi-cloud management) | Run on GCP + on-prem; avoid lock-in narrative |
| AML | Vertex AI + Financial Services Anti-Money Laundering AI | Purpose-built, pre-trained AML model; Google's own product for FSI |
| Customer experience | Firebase, Cloud Run, Dialogflow CX | Real-time apps; AI-powered conversational banking |

**Strategic product: Google Financial Services Anti-Money Laundering AI** — this is a purpose-built, auditable ML model that banks can deploy for AML alert triage. It typically reduces false positives by 60–80%. This is a door-opener in any bank with an AML team.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €1M–€20M initial; €5M–€100M over 5 years for Tier 1 banks |
| Sales cycle | 12–24 months (security reviews alone take 6 months) |
| Decision makers | CTO/CIO (technical), CDO/Head of Analytics (data platform), CISO (security review), CFO (TCO), Chief Risk Officer (compliance) |
| Budget owner | IT + Risk + Compliance all have separate budgets; triangulate |
| Influencers | Accenture, Deloitte, McKinsey (strategy), Capgemini, IBM (delivery) |
| Procurement pattern | Proof of Concept (90 days) → Pilot (6 months) → Scale |
| Key blocker | CISO/security review; regulatory pre-approval in some jurisdictions |

**Note on CRO:** The Chief Risk Officer is an underutilised entry point. They own the risk of both not modernising AND of cloud risk. Google's DORA-compliant architecture and multi-cloud resilience story resonates here.

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| DORA (EU, effective Jan 2025) | Digital operational resilience; ICT risk management; incident reporting within 4 hours | Assured Workloads EU, Chronicle SIEM for incident detection, BCP/DR architecture |
| GDPR/RODO | Data residency, processing agreements, right to erasure | EU data regions, DPA, deletion APIs |
| PCI-DSS v4 | Cardholder data protection, network segmentation | PCI-DSS certified GCP services; Sensitive Data Protection (DLP) |
| Basel IV / IFRS 9 | Credit risk modelling, expected credit loss calculation | BigQuery for large-scale risk calculations; Vertex AI for model governance |
| MiFID II | Trade reporting, best execution, record keeping | Chronicle for audit log retention; BigQuery for trade analytics |
| SOX (US-listed companies) | Financial reporting controls, audit trails | Cloud Audit Logs, Access Transparency, DLP |
| KNF (Poland) | Polish FSA requirements; cloud guidance circular | Engage Google's FSI compliance team; DPA tailored to KNF requirements |
| EBA Cloud Guidelines | ICT risk, concentration risk, exit strategy | Anthos for multi-cloud; contractual exit strategy documentation |

**DORA is the 2025 conversation opener.** Effective January 2025, DORA requires all EU financial entities to map their ICT dependencies, test resilience, and report incidents within tight windows. Most banks are behind. Google's Chronicle + Assured Workloads combination is a credible DORA response.

---

## 6. Top 3 Use Cases

### Use Case 1: Real-Time Fraud Detection Platform
**Problem:** Card fraud and account takeover occur in milliseconds. Batch-scoring models run overnight. The fraud window is 24 hours wide.
**Solution:** Pub/Sub ingests transaction events in real time → Dataflow applies feature engineering → Vertex AI scores each transaction in <100ms → BigQuery stores decisions for model retraining → Looker monitors fraud rates by segment.
**Business Value:** Reduce fraud losses by 20–40%; reduce false positive declines (customer experience win); eliminate overnight batch job maintenance; retrain models weekly instead of quarterly.
**References:** HSBC, Deutsche Bank, ING use similar architectures.

### Use Case 2: Anti-Money Laundering Transformation
**Problem:** A bank's AML team reviews 10,000 alerts per month; 95% are false positives. Compliance cost is €5M/year in analyst hours. Regulators are asking for better detection, not just more alerts.
**Solution:** Google Financial Services AML AI replaces rule-based alert engine. Pre-trained on global transaction patterns, fine-tuned on bank's own data. Provides risk score + explanation for each alert.
**Business Value:** 60–80% reduction in false positives (industry benchmark); compliance cost reduction of €2–3M/year; better detection of actual suspicious activity; auditable AI decision trail for regulators.
**Key differentiator:** Google's AML AI is purpose-built and has regulatory acceptance precedent — competitors are selling generic ML platforms.

### Use Case 3: Customer 360 Analytics Platform
**Problem:** The mortgage team can't see that a customer also has three credit cards maxed out. The fraud team can't see that a "new" account belongs to a returning customer who closed an account last year. Risk is invisible; opportunity is invisible.
**Solution:** BigQuery as the unified data warehouse pulling from core banking, CRM, mobile app, and partner data. Cortex Framework (FSI template) provides pre-built data models. Looker for business users; Vertex AI notebooks for data scientists.
**Business Value:** Increase cross-sell revenue by 15–25% (better targeting); reduce credit risk by 10% (fuller picture at underwriting); reduce time-to-insight from 3 weeks to same-day.

---

## 7. Killer Demo Scenario

**"The €50M Fraud in 3 Clicks" — Vertex AI + BigQuery + Looker**

1. Show a stream of synthetic transactions flowing into BigQuery in real time (Pub/Sub demo)
2. Vertex AI fraud model scores each transaction — show the score updating live
3. A "suspicious" transaction pattern emerges (card testing, then large purchase) — the model flags it in <200ms
4. Looker dashboard shows: fraud ring geography, affected customers, estimated loss prevented, false positive rate
5. Bonus: open BigQuery ML notebook and show how the model retrains on new fraud patterns in 10 minutes

Why this works: it's visceral (fraud is everyone's problem), it's fast (real-time is magic after years of batch), and it's specific to their business. Bring a real fraud scenario from their public annual report and reference it.

---

## 8. Competitive Landscape

| Competitor | Their Strength | Google Counter |
|-----------|---------------|----------------|
| AWS | Largest cloud market share; mature FSI compliance | GCP's BigQuery vs Redshift: 10x faster on unstructured analytics; Google's AML AI is unique; Vertex AI vs SageMaker: more managed, less ops overhead |
| Microsoft Azure | M365 + Dynamics integration; Office familiarity | Gemini vs Copilot for Finance: GCP's AI quality; BigQuery vs Synapse; Google's open-source AI model access |
| Snowflake | Data cloud incumbent; strong in analytics | BigQuery: serverless (no cluster management); built-in ML; streaming; pricing model; BigLake for unified storage |
| IBM | Mainframe incumbent; trust in regulated industries | GCP Bare Metal + mainframe migration tools; IBM and Google have a partnership — use it |
| Palantir | AI-powered decision platforms | BigQuery + Vertex AI provides the infrastructure Palantir runs on; sell the platform, not the application layer |

---

## 9. Macro Trends

1. **DORA compliance deadline (Jan 2025)** — Every EU bank is rushing ICT risk assessment; creates immediate sales opportunity around resilience architecture
2. **GenAI in banking** — Every bank has a GenAI strategy; many have none. Gemini on Vertex AI is the productionisation path from pilot to production
3. **Embedded finance** — Banks becoming API providers; non-banks embedding financial products. Apigee as the API management backbone
4. **Basel IV capital requirements** — More sophisticated risk models needed; more compute, more data, more real-time. GCP's scale advantage is real
5. **Neobank pressure** — Revolut surpassed many traditional banks in customer count. Traditional banks' response is platform modernisation — create urgency
6. **Central Bank Digital Currencies (CBDCs)** — ECB digital euro in pilot; banks need infrastructure for programmable money. Google Research + GCP are involved in CBDC pilots

---

## 10. Discovery Questions

1. "How quickly can your fraud detection system flag a suspicious transaction today — and what happens during the gap between the transaction and the detection?"
2. "How many AML alerts does your compliance team review each month, and what percentage turn out to be genuine?"
3. "When DORA's incident reporting requirements kicked in — how confident are you in your ability to report an ICT incident accurately within 4 hours?"
4. "How long does it take your data science team to go from a new fraud pattern being identified to a new model in production?"
5. "If I asked your CDO to tell me what your most profitable customer segment is — how long would it take them to give me an answer they'd stake their reputation on?"
