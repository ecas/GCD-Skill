# Vertical Playbook: Manufacturing

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

Manufacturing is the vertical where OT (Operational Technology) meets IT — and the two have historically lived in completely separate worlds. Factory floor systems (SCADA, PLCs, MES) were never designed to talk to enterprise IT systems, let alone cloud platforms. Industry 4.0 is the forcing function: manufacturers who instrument their production lines with IoT sensors and apply AI to that data are achieving 10–15% productivity gains and 20–30% reductions in unplanned downtime. Those who don't are losing contracts to competitors who can prove lower cost-per-unit.

**The "why now":** The talent shortage in skilled manufacturing trades (machine operators, maintenance engineers) is accelerating automation investment. Simultaneously, supply chain disruptions (2020–2022) permanently elevated the priority of supply chain visibility. And ESG reporting requirements are forcing manufacturers to measure and report emissions at the production process level.

---

## 2. Top Pain Points

1. **Unplanned downtime** — Average manufacturer loses 5–20% of production time to unplanned downtime; each hour of downtime on a high-value line costs €10K–€500K
2. **Quality defects & waste** — Defect rates of 1–5% on production lines; end-of-line inspection misses root causes; rework costs are hidden
3. **Supply chain opacity** — Multi-tier supply chain; Tier 2/3 suppliers are invisible; disruptions are discovered too late
4. **Energy costs** — Energy is 15–30% of manufacturing cost; no real-time visibility into consumption by process, line, or product
5. **Legacy OT systems** — SCADA/PLC systems running Windows XP; no API access; OT/IT integration is the single hardest technical problem
6. **Workforce knowledge loss** — Senior maintenance engineers retiring; tacit knowledge about machine behaviour is disappearing
7. **Sustainability reporting** — CSRD (2025) requires Scope 1/2/3 emissions reporting; manufacturers don't have the data infrastructure
8. **Inventory optimisation** — Work-in-progress (WIP) inventory ties up capital; finished goods inventory is either too high or too low

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Unplanned downtime | Vertex AI (predictive maintenance models), IoT Core / Pub/Sub, BigQuery | Real-time sensor data → anomaly detection before failure |
| Quality defects | Vision AI (visual inspection), Vertex AI | Camera-based quality inspection at line speed; no sampling bias |
| Supply chain | BigQuery + Supply Chain Twin, Apigee | Real-time inventory and supplier data; what-if simulation |
| Energy | BigQuery + Looker, Pub/Sub (smart meters) | Energy dashboard by machine, line, product; carbon accounting |
| OT/IT integration | Google Distributed Cloud (edge), Pub/Sub | Edge processing for OT systems; no cloud dependency for safety-critical |
| Workforce knowledge | Vertex AI (knowledge extraction), Workspace + Gemini | AI assistant trained on maintenance manuals and incident history |
| Sustainability | BigQuery + Carbon Footprint tool | Scope 1/2/3 tracking; CSRD-ready reporting |
| Inventory | BigQuery ML (demand forecasting), Cortex Framework | SAP integration; WIP and finished goods optimisation |

**Key differentiator: Google Distributed Cloud (GDC).** GDC Edge allows Google AI services to run on-premises on the factory floor, behind the OT network firewall, with no data leaving the facility. This is the answer to the "we can't put factory data in the cloud" objection.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €500K–€10M for single-site pilot; €10M–€100M for enterprise rollout |
| Sales cycle | 12–24 months; OT security review and plant IT/OT team alignment add 6 months |
| Decision makers | CTO/VP Manufacturing (production), CIO (IT), COO (operations), Head of Maintenance, CSO/Sustainability officer |
| Budget owner | CapEx (OT modernisation budget) + OpEx (IT) — both must be engaged |
| Entry point | Predictive maintenance pilot on one production line; quick ROI proof |
| Critical partner | OT systems integrators (Siemens, Rockwell, Honeywell), not traditional IT SIs |
| Key blocker | OT security team (they are rightfully paranoid about connecting factory systems to cloud) |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| CSRD (EU, from 2025) | Sustainability reporting including Scope 1/2/3 emissions | BigQuery Carbon Footprint; GCP Carbon Sense |
| IEC 62443 | OT/Industrial cybersecurity standard | GDC Edge with IEC 62443-aligned network segmentation |
| ISO 50001 | Energy management | BigQuery energy analytics; Looker dashboards |
| REACH / RoHS | Chemical and material compliance in manufacturing | Not a primary GCP play; third-party integrations |
| NIS2 | Critical infrastructure (large manufacturers are in scope) | Chronicle SIEM; Security Command Center |
| TISAX (automotive) | Information security in the automotive supply chain | ISO 27001-aligned GCP; Assured Workloads for sensitive CAD/design data |

---

## 6. Top 3 Use Cases

### Use Case 1: Predictive Maintenance Platform
**Problem:** A chemical plant has 2,000 rotating machines (pumps, compressors, motors). Each year, 50 experience unexpected failures causing unplanned shutdowns. Average cost per incident: €200K in repairs + lost production. Total annual loss: €10M.
**Solution:** Pub/Sub ingests vibration, temperature, and current sensor data from IoT gateways → BigQuery stores time-series data at 10Hz frequency → Vertex AI anomaly detection model identifies pre-failure signatures 2–7 days in advance → Looker dashboard alerts maintenance team with recommended action and parts needed.
**Business Value:** Prevent 40% of unplanned failures (industry benchmark); €4M annual savings on a 10M baseline; maintenance shifts from reactive to planned; parts inventory reduced (not over-stocking "just in case").
**Proof point:** Google's internal data centre operations use the same predictive maintenance approach on cooling systems.

### Use Case 2: AI-Powered Visual Quality Inspection
**Problem:** An electronics manufacturer inspects PCBs at end of line using human inspectors. Inspection speed: 30 boards/minute. Defect detection rate: 85%. The 15% misses reach customers and generate warranty claims of €5M/year.
**Solution:** Cloud Vision AI / AutoML Vision trained on images of defective and acceptable boards → deployed to edge device (GDC Edge) on the production line → real-time inspection at 120 boards/minute with 99.5%+ detection rate → defective boards flagged before they leave the line.
**Business Value:** 97% reduction in field warranty claims (€4.8M saving); 4x inspection throughput (remove inspector bottleneck); defect root cause analysis from image data (quality improvement feedback loop).
**Implementation:** 6–8 weeks to train and deploy; requires 5,000+ labelled images of defects.

### Use Case 3: Connected Supply Chain Twin
**Problem:** An automotive parts manufacturer sources components from 200 suppliers across 15 countries. When a Tier 2 supplier in Southeast Asia has a flood, the manufacturer finds out 3 weeks later when parts fail to arrive.
**Solution:** BigQuery Supply Chain Twin integrates ERP (SAP), logistics partner APIs, and supplier self-reporting → maps the full Tier 1/2/3 supplier graph → Pub/Sub ingests real-time events (weather, port closures, supplier financial alerts) → Vertex AI risk scoring identifies suppliers at risk → Looker dashboard gives procurement team 2–4 week advance warning.
**Business Value:** Avoid production stoppages (each day of stopped production = €500K–€5M depending on line); reduce safety stock by 15–20% (€10M working capital release for large manufacturer); ESG supplier screening included.

---

## 7. Killer Demo Scenario

**"The Machine That's About to Fail" — Pub/Sub + BigQuery + Vertex AI Anomaly Detection**

1. Show a Looker dashboard: 50 machines, all green except two showing "caution" and one showing "alert"
2. Click into the alert machine: show the vibration time series — the anomaly is visible in the data, a subtle change that started 5 days ago
3. Show the Vertex AI model confidence: "89% probability of bearing failure in the next 72 hours"
4. Show the recommended action: "Replace bearing B-4472. Current stock: 3 units in warehouse A. Estimated repair time: 4 hours. Optimal window: Saturday maintenance shift."
5. Bonus: show what happens without the system — a simulated failure event, 18-hour unplanned shutdown, €300K cost. "This is what you're preventing."

Why this works: it tells a story with a clear villain (unplanned downtime) and a clear hero (the AI prediction). The numbers are specific and believable. The maintenance manager in the room immediately sees their Monday morning problem solved.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft Azure IoT | Azure Digital Twins; Siemens MindSphere on Azure | GCP Distributed Cloud Edge for OT environments; Vertex AI more advanced than Azure ML for time-series anomaly detection; Google's Vision AI for quality inspection has no Azure equivalent at the same quality |
| AWS IoT Greengrass | Mature IoT stack; SiteWise for industrial data | GCP Pub/Sub real-time throughput advantage; BigQuery for time-series analytics; GDC Edge for air-gapped OT environments |
| Siemens MindSphere | Deep OT relationships; native Siemens integration | Sell GCP as the data platform UNDER MindSphere; Siemens and Google have a partnership |
| PTC (ThingWorx) | Strong manufacturing IoT platform | Position GCP as infrastructure layer; ThingWorx can run on GCP |
| Palantir | AIP for manufacturing (recent push) | Open platform vs. proprietary Palantir; total cost of ownership; customer data control |

---

## 9. Macro Trends

1. **Industry 4.0 / 5.0 maturity** — Manufacturers moving from pilot to scale; the "connected factory" is no longer aspirational, it's a survival requirement for contract wins
2. **CSRD emissions reporting (2025)** — First wave: large EU manufacturers must report Scope 1/2/3. This requires production-process-level data infrastructure most manufacturers don't have
3. **Reshoring & nearshoring** — Geopolitical pressure moving manufacturing back to Europe/US; new greenfield factories being built with modern IT/OT from day one — design-win opportunity
4. **Generative AI for maintenance** — LLMs trained on maintenance manuals and incident history can answer "what do I do when machine X shows symptom Y?" — replaces retiring expert knowledge
5. **Digital Product Passport (EU)** — From 2026, many product categories require a digital passport tracking materials, manufacturing conditions, and recyclability. BigQuery as the data spine
6. **Energy price volatility** — European manufacturers facing 2–5x energy cost increases post-2022; energy optimisation AI delivers measurable ROI in months, not years

---

## 10. Discovery Questions

1. "How much unplanned downtime did your most critical production line experience last year — and what was the cost per hour?"
2. "When one of your Tier 2 suppliers has a problem, how many days does it typically take before it affects your production schedule?"
3. "How are you thinking about CSRD compliance — do you have production-process-level energy and emissions data today?"
4. "When a senior maintenance engineer retires, what happens to their knowledge about how specific machines behave?"
5. "How does your quality inspection process work today — and what percentage of defects make it through to the customer?"
