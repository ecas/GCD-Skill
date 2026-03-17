# Vertical Playbook: Mining & Metals

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

Mining and metals is one of the last industries to undergo serious digital transformation — and the pressure to do so is now intense. The sector extracts copper, gold, silver, rare earths, coal, iron ore, and dozens of critical minerals that underpin the energy transition. Without copper and lithium, there are no EVs. Without rare earths, there are no wind turbines or semiconductors. Mining is, paradoxically, both the cause of the problem (fossil fuel extraction) and a prerequisite for the solution (critical minerals for clean energy).

The industry faces a structural cost problem. High-grade deposits are increasingly deep underground. Energy costs represent 20–40% of operating costs. Workforce safety incidents carry enormous financial and reputational consequences. And increasingly, regulators, investors, and customers demand verifiable ESG data — not PR statements.

**The "why now":** Three converging forces are opening the door for GCP:
1. **Deep mining economics** — As shallow deposits are exhausted, operations go deeper and more dangerous, driving automation investment
2. **Critical minerals geopolitics** — EU Critical Raw Materials Act and US IRA are pushing domestic mining investment; new mines are greenfield design-win opportunities
3. **ESG investor pressure** — Mining companies face Scope 1/2/3 scrutiny; CSRD compliance requires production-level emissions data that most operators lack

**Poland context:** KGHM Polska Miedz is one of Europe's largest copper and silver producers, operating underground mines in Legnica-Glogow Copper Belt at depths of 1,000–1,300m. KGHM is subject to Polish industrial regulations, EU CSRD, NIS2 (mining added to scope), and is a NATO-adjacent entity given copper's strategic importance.

---

## 2. Top Pain Points

1. **Underground safety and seismic risk** — Deep mining triggers seismic activity (rockbursts); real-time seismic monitoring and evacuation coordination are safety-critical; legacy systems have no AI prediction capability
2. **Predictive maintenance on heavy equipment** — Haul trucks, crushers, conveyor systems, and drilling rigs cost €5M–€30M each; unplanned failure at depth means days of downtime and safety risk; maintenance is still largely reactive
3. **Energy cost and consumption** — Underground ventilation alone can be 40–50% of a mine's electricity bill; no real-time optimisation of airflow relative to actual workforce location and air quality
4. **OT/IT convergence** — Mine control systems (SCADA, PLC, dispatch systems from Wenco, Modular Mining, Sandvik) run on closed OT networks; connecting to cloud analytics is technically and organizationally hard
5. **ESG and CSRD reporting** — Scope 1 emissions (blasting, diesel haulage, smelting), Scope 2 (electricity for ventilation and processing), and Scope 3 (downstream product use) are not tracked at the process level; CSRD reporting is increasingly mandatory
6. **NIS2 compliance** — Large mining operators are now within NIS2 scope as critical infrastructure; OT network security is immature; incident detection and response capabilities are limited
7. **Workforce knowledge loss and skills gap** — Experienced mining engineers and metallurgists are retiring; tacit knowledge about ore body behaviour, equipment quirks, and operational patterns is being lost with no structured capture
8. **Deep mining technology and remote operations** — Going deeper requires autonomous drilling, remote-operated vehicles, and real-time communication underground; connectivity below 1,000m is limited

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Underground safety / seismic | Pub/Sub + Dataflow (real-time seismic streams), Vertex AI (anomaly detection), BigQuery (seismic historian) | Millisecond-latency event processing; AI prediction of rockburst precursors from multi-sensor arrays |
| Predictive maintenance | Vertex AI (time-series anomaly detection), Pub/Sub, BigQuery, GDC Edge | Edge inference on OT network without data leaving the mine; models trained on vibration, temperature, current sensor data |
| Energy optimisation | BigQuery + Looker (energy dashboard), Vertex AI (ventilation optimisation model), Pub/Sub (sensor ingestion) | Dynamic ventilation on demand (VODS) — reduce ventilation to areas with no workers; 15–30% energy reduction |
| OT/IT convergence | Google Distributed Cloud (GDC) Edge, Pub/Sub (MQTT bridge, OPC-UA gateway) | GDC Edge runs AI and data processing on-premise in the OT environment; Pub/Sub native MQTT support |
| ESG / CSRD reporting | BigQuery (emissions data lake), Looker (CSRD-ready dashboards), Carbon Footprint API | Process-level emissions tracking; automated regulatory reporting; audit trail |
| NIS2 compliance | Chronicle SIEM (OT/IT threat detection), Security Command Center, Mandiant Threat Intelligence | OT-aware threat detection; NIS2 incident reporting workflows; vulnerability assessment |
| Workforce knowledge | Vertex AI (RAG on maintenance manuals + incident history), Gemini API, Workspace + Gemini | AI assistant that answers "what does vibration pattern X on this crusher model mean?" from historical incident data |
| Remote / autonomous operations | GDC Edge (local processing), Pub/Sub (telemetry), Vertex AI (autonomous vehicle AI) | Edge AI for autonomous haul trucks and drilling rigs; real-time telemetry processing without cloud round-trip |

**Key differentiator: Google Distributed Cloud (GDC) Edge.** Underground and remote mine sites cannot rely on cloud connectivity for safety-critical decisions. GDC Edge allows Vertex AI models and Pub/Sub data pipelines to run on-premise, on the OT network, with no data leaving the facility. This is the only credible answer to the OT security team's "we cannot put safety systems in the cloud" objection.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €1M–€5M for single-site analytics/maintenance pilot; €20M–€100M+ for enterprise rollout across all operations |
| Sales cycle | 18–36 months; OT security review, procurement tender process, and union consultation (workforce concerns about automation) add significant time |
| Decision makers | CTO/VP Technology, Head of Mining Technology, Head of Safety, CIO, CISO, CFO (OpEx savings), CSO/Sustainability Officer |
| Budget owner | Capital projects budget (CapEx) for technology infrastructure; operational budget (OpEx) for analytics and cloud services — both must be engaged |
| Entry point | Energy optimisation or predictive maintenance pilot on surface plant (lower OT risk than underground); quick ROI proof within 6–12 months |
| Critical partner | OT systems integrators (Sandvik, Epiroc, ABB, Honeywell Process Solutions, Worley), not traditional IT SIs |
| Key blocker | OT security team; union agreements (autonomous equipment displaces workers); procurement tender requirements (KGHM and other SOEs must run public tenders above threshold) |
| SOE procurement note | State-owned mining companies (KGHM in Poland, Codelco in Chile) typically use their own procurement portals in addition to or instead of national public procurement platforms. KGHM uses its own supplier portal (dostawcy.kghm.com). Check the company's own portal before relying on general procurement databases. |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| NIS2 (EU, 2024) | Large mining operators now in scope as critical infrastructure; requires risk management, incident detection, reporting within 24–72h | Chronicle SIEM for OT/IT threat detection; Security Command Center; Mandiant for incident response; NIS2-compliant incident reporting workflows |
| CSRD (EU, from 2025) | Sustainability reporting including Scope 1/2/3 emissions; mining Scope 1 includes blasting, diesel haulage, and smelting emissions | BigQuery emissions data lake; Looker CSRD dashboards; Carbon Footprint API; process-level Scope 1 tracking |
| IEC 62443 | OT/Industrial cybersecurity standard; applicable to mine SCADA and control systems | GDC Edge with IEC 62443-aligned network segmentation; Chronicle OT threat detection |
| EU AI Act | High-risk AI in safety-critical contexts (autonomous vehicles, seismic prediction used in evacuation decisions) requires conformity assessment, transparency, human oversight | Vertex AI Model Cards; Explainable AI; human-in-the-loop design for safety-critical decisions |
| EU Critical Raw Materials Act (2024) | Strategic projects for critical minerals face expedited permitting but also increased reporting obligations | Data infrastructure for regulatory reporting; BigQuery as system of record |
| ISO 14001 | Environmental management; mining companies must track environmental impact | BigQuery environmental monitoring; Looker dashboards |
| Prawo geologiczne i górnicze (Poland) | Polish geological and mining law; State Mining Authority (WUG) oversight; mandatory seismic monitoring | Real-time seismic monitoring pipeline; incident reporting infrastructure |

---

## 6. Top 3 Use Cases

### Use Case 1: Predictive Maintenance for Critical Mining Equipment
**Problem:** A copper mine operates 80 haul trucks, each worth €15M. Each year, 8 experience major drivetrain failures causing 3–5 days of downtime at the cost of €500K per incident (lost production + emergency repair). Total annual loss: €4M.
**Solution:** Pub/Sub ingests vibration, temperature, oil quality, and engine telemetry from OEM sensors (CANbus / OPC-UA gateway) → GDC Edge processes data locally and runs Vertex AI anomaly detection model → BigQuery stores the time-series historian → Looker dashboard alerts maintenance team with failure probability, recommended action, and parts needed — 7–14 days in advance.
**Business Value:** Prevent 60% of major failures (industry benchmark for AI-based maintenance); €2.4M annual savings on a €4M baseline; shift maintenance from reactive to condition-based; reduce spare parts inventory by 20%.
**Implementation note:** Start with surface haul trucks (easier OT connectivity) before moving to underground equipment.

### Use Case 2: Ventilation on Demand (VODS) — Energy Optimisation
**Problem:** An underground mine spends €12M/year on electricity; 45% (€5.4M) is ventilation. The entire mine is ventilated continuously at full capacity regardless of where workers actually are and what activities are occurring. This is legally required without a real-time worker location system.
**Solution:** Pub/Sub ingests real-time data from: worker cap lamps with RFID/UWB positioning, gas sensors (CO, CO2, NOx), blast event schedule → Vertex AI optimisation model calculates minimum safe airflow for each zone based on actual occupancy and activity → SCADA integration adjusts fan speeds and ventilation dampers dynamically → Looker dashboard shows energy savings and safety compliance in real time.
**Business Value:** 20–35% reduction in ventilation energy (industry benchmark for VODS); €1M–€1.9M annual savings; improved safety (higher air quality where workers actually are); CSRD Scope 1 emissions reduction.
**Proof point:** Newcrest Mining (now Newmont) reported 30% ventilation energy reduction from VODS deployment.

### Use Case 3: Real-Time Seismic Risk Monitoring and Evacuation Support
**Problem:** A deep underground mine at 1,200m depth experiences 200+ seismic events per year. Current system generates alerts but cannot predict which events precede a dangerous rockburst. Mine evacuations (called to be safe) cost €100K each in lost production. One rockburst incident can cost lives and tens of millions in liability.
**Solution:** Pub/Sub ingests data from 150+ seismometer array in real time → Dataflow processes waveforms with microsecond precision → Vertex AI model (trained on 10 years of seismic + production data) identifies precursor patterns that precede dangerous events → Chronicle-connected alerting triggers evacuation protocol for specific zones only (not full mine shutdown) → BigQuery stores full seismic history for regulatory reporting to State Mining Authority.
**Business Value:** Reduce false evacuations by 60% (zone-specific rather than mine-wide); provide 15–45 minutes of warning for high-probability events; protect workforce; reduce liability exposure; demonstrate regulatory compliance to WUG (Poland) or equivalent authority.

---

## 7. Killer Demo Scenario

**"The Truck That's About to Fail — and the Mine That Saves €2M" — GDC Edge + Pub/Sub + Vertex AI + Looker**

1. Open a Looker dashboard showing the surface haul truck fleet: 80 trucks, all green — except one showing amber ("elevated risk") and one showing red ("imminent failure risk — 91% probability in next 96 hours")
2. Click into the red truck: show the multi-sensor time series — vibration signature changed 12 days ago, oil temperature rising subtly, oil quality degrading. The human eye would miss this in isolation; the model caught the pattern across all three sensors together.
3. Show the model explanation: "Differential pinion bearing wear pattern — matches 14 historical failures in training set. Recommended action: inspect and replace differential bearing assembly. Estimated repair time: 18 hours. Current stock: 2 bearing sets in mine workshop."
4. Toggle to the "What if we had missed this?" simulation: show an unplanned failure at shift change — 4-day downtime, €500K cost, safety incident risk if failure happens underground.
5. Show the scheduled maintenance work order (integrated with ServiceNow/SAP PM): automatically created for Saturday maintenance window.
6. Bonus: show the Scope 1 emissions impact — "This truck running inefficiently due to mechanical wear used 12% more diesel in the last 30 days. Fixing this reduces monthly Scope 1 emissions by X tonnes CO2e."

Why this works: the audience (Head of Mining Technology, Head of Maintenance, CFO) sees immediate ROI in language they understand. The safety angle resonates with every mining executive. The ESG angle lands with the sustainability officer and CFO who is preparing CSRD reporting.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft Azure IoT / Azure Digital Twins | Azure Digital Twins for mine modelling; strong Microsoft 365 footprint in mining HQ offices | GDC Edge has better OT story for underground/remote sites; Vertex AI time-series anomaly detection outperforms Azure ML for sensor data at scale; BigQuery vs Azure Synapse — better real-time analytics |
| Siemens MindSphere / Siemens Xcelerator | Deep OT relationships; native Siemens PLC/SCADA integration; long history in mining automation | Sell GCP as the data analytics layer under MindSphere; Google and Siemens have a partnership — MindSphere can run on GCP. GCP handles the AI/ML and BI layer that MindSphere lacks. |
| SAP BTP (Asset Intelligence Network) | Strong SAP integration for maintenance (PM module); existing SAP footprint in large miners | Complementary — BigQuery Connector for SAP bridges SAP PM data to GCP analytics. Position as the AI layer on top of SAP, not a replacement. |
| ABB Ability / ABB Process Portal | Deep mining automation expertise; ventilation and process control integration | ABB and Google have explored partnerships; position GCP Pub/Sub as the data backbone for ABB telemetry. ABB systems become data sources for GCP analytics. |
| Palantir AIP for Mining | AI platform push into resources sector; Glencore and Rio Tinto case studies | Open platform vs. proprietary Palantir; customer data sovereignty; total cost of ownership (Palantir licensing is high); GCP is the infrastructure Palantir often runs on. |
| OSIsoft (now AVEVA PI System) | Dominant time-series historian for process industries and mining | Pub/Sub + BigQuery as the modern replacement for PI System; migration path from PI to BigQuery; position as the analytics destination for PI data via connector. |

---

## 9. Macro Trends

1. **Critical minerals demand surge** — The energy transition requires 3–6x more copper, rare earths, and lithium by 2040 (IEA projections). This drives new mine development and expansion of existing operations — greenfield design-win opportunities for GCP.
2. **Autonomous mining acceleration** — Major miners (BHP, Rio Tinto, Vale) have deployed autonomous haul truck fleets at surface operations; underground autonomous drilling is next. Every autonomous vehicle generates terabytes of telemetry — AI and data infrastructure is the critical enabler.
3. **Decarbonisation of mining** — Mining accounts for ~4–7% of global energy consumption. Investors and downstream customers (EV manufacturers) are demanding low-carbon supply chains. Ventilation optimisation, electric equipment, and Scope 1/2/3 reporting are all data infrastructure plays.
4. **Deep mining technology** — As shallow deposits are depleted, mines go deeper (2,000m+). At depth, automation replaces human presence due to safety and logistics constraints. Real-time data connectivity underground is a solved problem with modern fibre and 5G/WiFi6 underground networks.
5. **Industry 4.0 adoption in mining** — Mining is 5–10 years behind discrete manufacturing in digitalisation. The gap is closing rapidly. First movers in AI-driven operations are achieving 15–25% cost reductions that create competitive advantage in commodity markets.
6. **ESG investor screening** — Institutional investors (BlackRock, Vanguard) apply ESG screens to mining portfolios. Companies that cannot demonstrate verified emissions data and safety records face higher cost of capital. CSRD compliance is not optional for EU-listed miners.

---

## 10. Discovery Questions

1. "What's your current unplanned downtime rate on your critical haul truck or underground equipment fleet — and what does an hour of downtime on your most expensive piece of equipment cost you?"
2. "How are you managing ventilation underground today — is it based on schedule and headcount estimates, or do you have real-time worker location data feeding your fan control system?"
3. "When we look at your CSRD obligations, do you currently have the infrastructure to report Scope 1 emissions at the production process level — not just the corporate total?"
4. "With NIS2 now applying to large mining operations, how mature is your OT security posture — do you have visibility into what's happening on your SCADA and mine control systems from a cybersecurity perspective?"
5. "When your most experienced mining engineer or metallurgist retires, what's your plan for preserving 30 years of knowledge about how this ore body and these machines actually behave?"

---

## Reference Companies

| Company | Country | Relevance |
|---------|---------|-----------|
| KGHM Polska Miedz | Poland | Europe's largest copper/silver producer; underground mines at 1,000–1,300m in the Legnica-Glogow Copper Belt; ~35,000 employees; NIS2 critical infrastructure; SOE (Polish State holds 31.8% stake); uses own procurement portal |
| BHP | Australia / Global | World's largest miner; autonomous haul trucks at Pilbara iron ore; significant GCP and data modernisation investment; good reference for autonomous operations |
| Rio Tinto | UK/Australia | Automated mining pioneer (AutoHaul driverless train, autonomous trucks); significant cloud and AI investment; good reference for scale and autonomous operations |
| Vale | Brazil | World's largest iron ore producer; significant digitalisation investment; GCP customer for some workloads; useful reference for Latin American context |
| Anglo American | UK / Global | FutureSmart Mining programme — explicit Industry 4.0 / AI strategy; good reference for holistic digital transformation in mining |
