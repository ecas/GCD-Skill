# Vertical Playbook: Energy & Utilities

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

The energy sector is undergoing its most fundamental transformation since electrification: the shift from centralised fossil fuel generation to distributed renewable energy. This creates an entirely new set of data and AI challenges. Traditional grid management assumed predictable, controllable generation. A grid with 40% solar and wind is inherently variable — managing it requires real-time forecasting, demand response, and edge intelligence at transformer level. Meanwhile, utilities face aging infrastructure, field workforce challenges, and the pressure of sustainability reporting.

**The "why now":** EU Green Deal and REPowerEU targets (45% renewable by 2030) are creating regulatory and investment pressure simultaneously. Every European utility is executing a grid modernisation programme. The window for technology partnerships is now, not after the infrastructure is built.

---

## 2. Top Pain Points

1. **Grid instability from renewables** — Solar and wind are intermittent; balancing a grid with high renewable penetration requires millisecond-level control systems fed by real-time AI forecasting
2. **Aging infrastructure** — 40% of EU transmission infrastructure is over 40 years old; failure is unpredictable; predictive maintenance is the only path that doesn't involve replacing everything
3. **Field workforce management** — Utilities have thousands of field technicians; scheduling, routing, and safety compliance are manual and inefficient
4. **Meter data management** — Smart meters generate billions of data points daily; most utilities can't use this data effectively for demand forecasting or customer insights
5. **Sustainability reporting** — CSRD requires Scope 1/2/3 reporting; Taxonomy Regulation requires green investment classification; data doesn't exist in required formats
6. **Customer engagement (B2C utilities)** — Energy customers are disengaged until there's a problem; competitive markets make churn an issue; time-of-use tariffs need smart home integration
7. **Cybersecurity of OT** — Energy is critical national infrastructure; SCADA/OT systems are high-value attack targets; NIS2 compliance is mandatory
8. **Hydrogen & new energy vectors** — Green hydrogen, battery storage, EV charging are new data domains with no existing management systems

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Grid management | Vertex AI (demand/generation forecasting), BigQuery (time-series), Pub/Sub | Real-time forecasting at grid scale; ML for renewable variability |
| Infrastructure maintenance | Vertex AI (predictive maintenance), Cloud IoT (sensor data) | Same approach as manufacturing; applies to substations, transformers |
| Field workforce | Google Maps Platform, AppSheet, Workspace | Field technician routing; mobile work orders; safety checklists |
| Meter data | BigQuery (time-series at scale), Pub/Sub, Bigtable | Billions of meter readings; sub-second query on years of history |
| Sustainability reporting | BigQuery + Carbon Footprint, Looker | Scope 1/2/3 data model; CSRD-ready templates |
| Customer engagement | Firebase, Dialogflow CX, BigQuery ML | Self-service app; AI chatbot for billing queries; churn prediction |
| OT security | Chronicle SIEM, Security Command Center, GDC Edge | ICS/SCADA anomaly detection; air-gapped OT option |
| EV charging management | BigQuery, Pub/Sub, Maps Platform | Fleet charging optimisation; grid impact forecasting |

**Key differentiator: Google Maps Platform + Field Operations.** No competitor can match Google Maps for field technician routing, real-time traffic, and outage visualisation. This is a genuine differentiated capability for utilities with large field workforces.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €1M–€50M for major utilities; €200K–€2M for point solutions |
| Sales cycle | 18–36 months; regulatory constraints slow procurement |
| Decision makers | CTO/CIO, CDO, Head of Grid Operations, Chief Sustainability Officer, CEO (strategic) |
| Budget owner | IT capital + Grid operations + Sustainability (separate budgets) |
| SI partners | Accenture, IBM, Wipro (traditional IT SIs) + Siemens, ABB, Schneider Electric (OT specialists) |
| Key blocker | OT security review; regulatory approval in some jurisdictions (energy is regulated) |
| Procurement | Often requires regulatory pre-approval; framework agreements with grid operators |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| NIS2 (EU) | Energy is critical infrastructure; security requirements; incident reporting | Chronicle SIEM for OT anomaly detection; GDC Edge for air-gapped OT; Security Command Center |
| CSRD | Scope 1/2/3 emissions reporting; Taxonomy alignment | BigQuery Carbon Footprint; GCP Carbon Sense; CSRD reporting templates in Looker |
| EU Taxonomy Regulation | Green investment classification; disclosure | Data infrastructure for Taxonomy alignment calculations |
| GDPR/RODO | Smart meter data is personal data; consumption patterns reveal lifestyle | EU data regions; Sensitive Data Protection; smart meter data processing agreements |
| Electricity Market Design (EU) | Real-time market participation; demand response | BigQuery for market settlement data; Pub/Sub for real-time market signals |
| IEC 61850 / IEC 62351 | Substation automation and security standards | GDC Edge with IEC 62351 network security |
| ENTSO-E standards | European grid interoperability | Pub/Sub + Apigee for ENTSO-E API integration |

---

## 6. Top 3 Use Cases

### Use Case 1: Renewable Energy Forecasting & Grid Balancing
**Problem:** A transmission system operator (TSO) manages a grid with 35% wind and solar penetration. A cloud cover forecast error translates directly into a balancing cost of €500K–€2M per event. They currently forecast 4 hours ahead; they need 48 hours.
**Solution:** Vertex AI ingests weather model data (ECMWF), satellite imagery (cloud cover), historical generation patterns, and demand signals → deep learning model produces 48-hour probabilistic wind/solar generation forecasts at the plant level → BigQuery aggregates into grid-level demand/supply balance → Looker operational dashboard for grid control room.
**Business Value:** Reduce balancing costs by 20–30% (€5–20M/year for a medium TSO); reduce curtailment of renewable energy (wasted green electricity); improve market participation (better bids into day-ahead markets).
**References:** Ørsted (wind operator), ELIA (Belgian TSO) use similar ML forecasting approaches.

### Use Case 2: Smart Meter Analytics & Demand Response
**Problem:** A distribution utility has 5 million smart meters generating 96 readings per day per meter = 480 million data points daily. They currently batch-process this data overnight. They can't offer real-time consumption insights to customers, can't detect theft in real time, and can't run demand response programs.
**Solution:** Pub/Sub + Bigtable for real-time meter data ingestion → BigQuery for analytical queries (fraud detection, demand forecasting) → Vertex AI for anomaly detection (energy theft, meter fault) → Firebase app for customer consumption insights with time-of-use tariff calculator → Demand response API sends signals to smart thermostats/EV chargers.
**Business Value:** Detect energy theft in real time (1–5% of distributed electricity is stolen; €5–50M for large utility); reduce peak demand by 10–15% through demand response (defers expensive peaker plant investment); customer NPS improvement from consumption transparency.

### Use Case 3: Field Workforce Optimisation
**Problem:** A gas distribution network has 3,000 field technicians doing 1,500 planned maintenance visits and responding to 200 emergency calls per day. Scheduling is done in spreadsheets. Emergency response time averages 75 minutes against a regulatory target of 60 minutes.
**Solution:** AppSheet mobile app for technicians (work orders, safety checklists, part inventory) → Google Maps Platform for real-time routing (traffic-aware, road closure-aware) → Vertex AI job scheduling model optimises daily routes for 3,000 technicians simultaneously → BigQuery tracks SLA compliance by region and technician → emergency dispatch uses Maps real-time traffic to route nearest available technician.
**Business Value:** Reduce emergency response time to 45 minutes (SLA compliance, avoid regulatory penalties); reduce fuel cost by 15% (optimised routing); increase planned maintenance productivity by 20% (less windshield time); safety incident documentation digitised.

---

## 7. Killer Demo Scenario

**"The €2M Grid Event That Didn't Happen" — Vertex AI + Pub/Sub + Looker**

1. Show a grid control room dashboard: generation, demand, frequency — all balanced
2. Introduce a weather model showing cloud cover moving over a large solar farm
3. The AI forecast: "Solar generation will drop 40% in 90 minutes — current forecast vs. grid demand imbalance: 800MW"
4. The recommendation: activate 3 demand response assets (large industrial consumers on interruptible tariffs) — estimated cost: €150K. Alternative: emergency import from neighbouring grid — estimated cost: €2M.
5. Operator approves demand response with one click. Show the demand response signal sent to industrial consumers via API.
6. 90 minutes later: solar drops as predicted; demand response fills the gap; grid frequency stable; €1.85M saved.

Why this works: grid operators understand the €/MWh language. The demo proves the AI makes a decision a human would have needed 30 minutes to model. The €2M saving is real and specific.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft Azure | Azure Energy (IoT Hub + digital twins for energy); partnership with major utilities | GCP's Maps Platform for field operations (unique); BigQuery for meter data analytics; Vertex AI forecasting models trained on Google's weather data |
| AWS | AWS Energy (SageMaker + IoT Greengrass) | GCP's open-source BigQuery ML vs. SageMaker complexity; Maps Platform advantage; Google's weather data assets for renewable forecasting |
| OSIsoft PI (now AVEVA) | Historian database incumbent for OT time-series data | BigQuery as the modern time-series analytics layer on top of PI; not replacing PI — extending it |
| SAP (SAP IS-U) | Billing and CRM incumbent for utilities | Cortex Framework for Energy integrates SAP data into BigQuery; position as analytics layer |
| Palantir | AI-powered grid management pitch | Open platform vs. proprietary lock-in; GCP total cost of ownership; customer data control |

---

## 9. Macro Trends

1. **REPowerEU / EU Green Deal** — €300B+ in clean energy investment by 2030; every utility is executing a transformation programme; creates immediate technology demand
2. **Grid digitalisation imperative** — IEA estimates $16T in global power sector investment needed by 2040; digital infrastructure is 15–20% of that
3. **EV charging wave** — 30M EVs on EU roads by 2030; €12M charging points needed; each one is a new IoT node requiring grid integration
4. **Green hydrogen** — €2.7B in EU-funded hydrogen projects; new data domain with no legacy management systems — greenfield opportunity
5. **Carbon border adjustment mechanism (CBAM)** — EU importers must prove emissions intensity of imports from 2026; creates B2B sustainability data exchange requirements that utilities must support
6. **Energy communities & prosumers** — Citizens with solar panels, batteries, and heat pumps becoming prosumers; utility billing and grid management must handle bidirectional flows at consumer scale

---

## 10. Discovery Questions

1. "How far ahead can you currently forecast your renewable generation output — and what does a 10% forecast error cost you in balancing costs?"
2. "You have smart meters generating data on 5 million customers — what percentage of that data are you actually using for operational decisions today?"
3. "When a field technician gets an emergency call today, how long does it take them to reach the site — and what's your regulatory SLA?"
4. "How are you approaching CSRD requirements for Scope 1/2/3 reporting — do you have the infrastructure to produce that data today?"
5. "Where do you see your biggest grid reliability risks in the next 5 years — and how does the increasing share of renewables affect that?"
