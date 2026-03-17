# Vertical Playbook: Government & Public Sector

## Table of Contents
1. Market Context
2. Top Pain Points
3. Relevant Google Products
4. Typical Deal Profile
5. Compliance Landscape
6. Top 3 Use Cases
7. Killer Demo Scenario
8. Competitive Landscape
9. Macro Trends to Reference
10. Discovery Questions

---

## 1. Market Context

Government IT is undergoing a forced modernisation: aging legacy infrastructure (many systems are 20–40 years old), post-COVID acceleration of digital citizen services, and fiscal pressure to consolidate duplicated systems across agencies. In the EU, the push is compounded by NIS2 directives, digital sovereignty mandates, and cross-border G2G data sharing requirements. In Central/Eastern Europe (Poland, Czech Republic, Romania), large EU-funded digitalisation programs (funded through CEF Digital, Recovery and Resilience Facility) are creating multi-year procurement windows worth hundreds of millions of euros.

**The "why now" for sellers:** EU Digital Decade targets (80% of citizens using digital public services by 2030) create hard deadlines. Budget cycles are predictable — tie proposals to budget planning periods.

---

## 2. Top Pain Points (ranked by discovery frequency)

1. **Legacy system debt** — Mainframes and on-prem systems that haven't been touched in 20 years; developers who understand the systems are retiring
2. **Data silos across agencies** — Citizen data spread across 50+ systems; no single view of the citizen
3. **Security & sovereignty concerns** — Fear of foreign cloud providers accessing government data; political pressure around where data lives
4. **Slow procurement cycles** — Framework agreements take 18–36 months; sellers must engage early
5. **Talent shortage** — Public sector pays 30–50% less than private sector; can't hire cloud engineers
6. **Paper-based processes** — Forms, permits, and licenses still physical; pandemic exposed the fragility
7. **Interoperability** — G2G (government-to-government) data exchange standards lacking
8. **Citizen experience expectations** — Citizens compare government apps to Amazon/Google; satisfaction scores are politically sensitive

---

## 3. Relevant Google Products (mapped to pain points)

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Legacy modernisation | Google Kubernetes Engine, Bare Metal Solution, Mainframe migration tools | Lift-and-shift path before refactor |
| Data silos | BigQuery, Dataplex, Data Catalog, Vertex AI | Unified analytics without moving data |
| Sovereignty | Sovereign Cloud (EU regions: Frankfurt, Netherlands, Warsaw*), Assured Workloads | Data residency guarantees + regulatory controls |
| Security | Chronicle SIEM, Security Command Center, BeyondCorp Enterprise | Zero-trust aligned to NIS2 |
| Talent shortage | Google Workspace + Duet AI, Looker Studio | Productivity tools citizens staff already know |
| Paper processes | Document AI, Forms/AppSheet | Turn paper forms into structured data |
| G2G interoperability | Apigee (API management), Pub/Sub | API-first integration layer |
| Citizen experience | Firebase, App Engine, Cloud Run | Fast web/mobile apps without infrastructure management |

*Warsaw region: verify current availability with Google account team — Poland is a priority market post-2024.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €500K–€50M (national programs can exceed €100M over 5 years) |
| Sales cycle | 18–36 months from first contact to signed contract |
| Procurement | Framework agreements (e.g., PEPPOL, national e-procurement portals), competitive tenders |
| Decision makers | CIO/CDO (technical), Minister/Secretary of State (political), CFO (budget) |
| Budget owner | Central IT budget + EU structural funds (CEF, RRF) |
| Influencers | System integrators (Capgemini, Accenture, Atos, local SIs), advisory firms (Deloitte, PwC) |
| Key blocker | Procurement rules — must be on a framework or win a tender |

**SI strategy is mandatory.** No direct wins in enterprise government without a certified integrator partner. Invest in partner enablement first.

---

## 5. Compliance Landscape

| Regulation | What It Requires | Google's Response |
|-----------|-----------------|-------------------|
| GDPR (EU) | Data residency, right to erasure, DPA | EU data regions, DPA agreements, deletion tools |
| RODO (Poland) | Polish implementation of GDPR; same requirements + UODO authority | Same as GDPR; Polish-language DPA available |
| NIS2 Directive | Cybersecurity for critical infrastructure; incident reporting within 24h | Chronicle SIEM, Security Command Center, IR retainer via Google Mandiant |
| eIDAS 2.0 | Electronic identity and trust services | Cloud Identity + partner integrations |
| Public Procurement Law | Open competition, framework agreements | GCP on national procurement frameworks (varies by country) |
| Secret/Classified data | Cannot go to hyperscaler public cloud | Sovereign/on-prem options; Distributed Cloud Edge |

**Sovereign Cloud pitch:** Google's Sovereign Cloud offering (with in-country key management, no Google personnel access, EU-only data routing) directly addresses the political objection. Compare to AWS GovCloud and Azure Government.

---

## 6. Top 3 Use Cases

### Use Case 1: Unified Citizen Data Platform
**Problem:** A citizen calls the tax authority, the social benefits office, and the health fund — each has different records, different addresses, different statuses. No agency can see the full picture.
**Google Solution:** BigQuery + Dataplex + Data Catalog to create a federated data layer (data stays in each agency's system; queries are centralised). Add Vertex AI for anomaly detection (fraud, duplicate benefits).
**Business Value:** Reduce fraud (EU estimates 3–5% of social benefit payments are fraudulent), improve case resolution time by 60%, enable cross-agency analytics without data migration risk.
**References:** Netherlands MijnOverheid, Estonia X-Road integration model.

### Use Case 2: AI-Powered Document Processing for Permits & Licenses
**Problem:** Millions of permit applications (construction, business, vehicle) still arrive on paper. Manual processing takes weeks; backlogs grow during staff shortages.
**Google Solution:** Document AI (trained on government form types) + Cloud Run for processing pipeline + Looker Studio dashboard for queue management + AppSheet for field inspector mobile app.
**Business Value:** 80% reduction in manual data entry; permit processing time from 21 days to 3 days; measurable impact on construction pipeline (politically relevant KPI).

### Use Case 3: Secure G2G API Platform
**Problem:** Agencies need to share data in real time (e.g., police checking driving licences, customs checking import permits) but each has different systems and security postures.
**Google Solution:** Apigee as the API gateway layer with BeyondCorp-style authentication, Cloud Armor for DDoS protection, and Pub/Sub for event-driven messaging.
**Business Value:** Replace point-to-point integrations (each costing €100K+ to build and maintain) with a single platform; reduce integration cost by 70%; enable new cross-agency services in weeks, not years.

---

## 7. Killer Demo Scenario

**"The Lost Citizen" — Document AI + BigQuery + Looker**

Set up a demo that shows:
1. A citizen submits a scanned PDF permit application (use a real example form from the target country)
2. Document AI extracts all fields in <3 seconds with 95%+ accuracy — show the confidence scores
3. The structured data lands in BigQuery; a Looker Studio dashboard shows the processing queue, backlog trends, and SLA compliance by permit type
4. Add Gemini: the clerk asks in natural language "how many construction permits are pending in Warsaw?" and gets an instant answer

Why this works: it's visual, it's fast, it uses a document the audience recognises, and it replaces a process they hate. The AI feels useful, not threatening. Keep the demo under 8 minutes.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft Azure (+ M365) | Existing Office/Teams footprint; strong government cloud | Google Workspace Migrate tool; highlight Gemini vs Copilot pricing/capability gap; Google's AI-first data analytics vs Azure's bolted-on approach |
| AWS GovCloud | Mature government cloud; huge partner ecosystem | Google's European data sovereignty commitment; easier ML/AI access; better pricing on BigQuery vs Redshift for analytics workloads |
| SAP (ERP incumbent) | Deep roots in HR, finance, procurement systems | GCP doesn't replace SAP — position as the analytics and AI layer on top; show SAP on GCP references |
| Oracle | Database licensing incumbent | AlloyDB as PostgreSQL-compatible migration; BigQuery replacing Oracle Data Warehouse; TCO calculator showing 3x savings |
| Local/national providers | Political "buy local" preference | Sovereign Cloud with local SI partner model; Google as infrastructure, local SIs as delivery |

---

## 9. Macro Trends to Reference in Executive Conversations

1. **EU Digital Decade 2030** — Hard targets: 80% of citizens with digital ID, 75% of enterprises using cloud/AI, 100% of public services digitally accessible. Creates budget urgency.
2. **AI Act (2025–2026 rollout)** — Government is both subject to AI Act compliance AND a buyer of AI. Google is a trusted partner because GCP's AI governance tools align with high-risk AI system requirements.
3. **Post-quantum cryptography** — NIST PQC standards finalised 2024; governments need to audit cryptographic exposure. Google has post-quantum TLS in production — one of the only hyperscalers that does.
4. **The Great Retirement of Government IT** — Baby Boomer IT staff leaving; taking institutional knowledge of legacy systems with them. Migration urgency is existential, not aspirational.
5. **Geopolitical risk & cloud concentration** — Russia/Ukraine war increased European attention to supply chain risk in cloud. Selling multi-cloud resilience with a European-sovereign option resonates.
6. **Digital Twin Cities** — Urban infrastructure simulation using IoT + AI for traffic, utilities, emergency services. Early pilots in Amsterdam, Helsinki, Warsaw.

---

## 10. Discovery Questions

1. "Which citizen-facing services are you most embarrassed about today — the ones your minister gets calls about?"
2. "How many separate systems do you currently use to manage citizen data, and do any of them talk to each other in real time?"
3. "When a security incident happens, how long does it take your team to understand what happened and contain it?"
4. "What percentage of your IT budget goes to maintaining systems older than 10 years versus building new capabilities?"
5. "Are you under any EU Recovery and Resilience Facility commitments that have digital transformation milestones with deadlines?"
