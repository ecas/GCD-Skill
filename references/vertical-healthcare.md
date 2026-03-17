# Vertical Playbook: Healthcare & Life Sciences

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

Healthcare is the most data-rich and most data-siloed industry simultaneously. A single patient's journey generates data across hospitals, GPs, pharmacies, insurance systems, wearables, and research databases — yet most healthcare providers cannot assemble a complete patient record in real time. The pandemic exposed this fragility at scale. Post-COVID, healthcare systems globally are under pressure to do more with less: treat more patients, reduce administrative burden on clinicians, and deliver care remotely — all while patient data security becomes a board-level concern.

**The "why now":** AI-assisted diagnosis and clinical decision support are moving from research to production. The first AI-powered diagnostic tools (radiology AI, pathology AI) are receiving regulatory approval (FDA 510(k), CE mark). Healthcare systems that don't build the data infrastructure now will be buying AI tools built on someone else's data.

---

## 2. Top Pain Points

1. **Clinical burnout from administrative work** — Clinicians spend 30–50% of their time on documentation, billing codes, and administrative tasks rather than patient care
2. **Fragmented patient records** — EHR systems (Epic, Cerner, Meditech) don't talk to each other; GP, hospital, and pharmacy records are separate
3. **Delayed diagnosis** — Imaging backlogs (radiology, pathology) create diagnostic delays of days to weeks; AI can triage in seconds
4. **Research data silos** — Clinical trial data, genomics data, and real-world evidence sit in separate repositories that can't be easily joined
5. **Telemedicine infrastructure** — COVID-driven telehealth adoption is now expected; legacy systems weren't built for it
6. **Supply chain fragility** — COVID exposed pharmaceutical supply chain concentration; hospitals now need real-time inventory visibility
7. **Revenue cycle complexity** — Prior authorisations, claim denials, and coding errors cost hospitals 3–5% of revenue
8. **Security of patient data** — Ransomware attacks on hospitals are increasing; patient data is the highest-value target after financial data

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Clinical documentation | Vertex AI + Medical summarisation models, Workspace + Gemini | AI ambient documentation; Gemini writes the clinical note |
| Fragmented records | Cloud Healthcare API (FHIR/HL7 v2/DICOM), Healthcare Data Engine | Native healthcare standards support; no custom translation layer |
| Imaging AI | Cloud Healthcare API (DICOM), Vertex AI, Medical Imaging Suite | Pre-trained medical imaging models; DICOM-native storage |
| Research data | BigQuery, Vertex AI Workbench, AlloyDB | Petabyte-scale genomics; TCGA, UK Biobank integration patterns |
| Telemedicine | Workspace (Meet), Cloud Healthcare API, Firebase | HIPAA-compliant video; integrates with EHR workflow |
| Supply chain | BigQuery + Supply Chain Twin, Apigee | Real-time inventory across locations; API integration with suppliers |
| Revenue cycle | Document AI, Vertex AI | Automate prior auth; reduce claim denial rate |
| Security | Chronicle SIEM, BeyondCorp, Sensitive Data Protection | Ransomware detection; zero-trust; PHI discovery and masking |

**Key differentiator: Cloud Healthcare API.** Google is the only hyperscaler with a purpose-built healthcare data layer that understands FHIR R4, HL7 v2, and DICOM natively. This eliminates the "translation layer" problem that kills healthcare data projects.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €500K–€10M for regional health systems; €10M–€100M for national health programs |
| Sales cycle | 18–30 months; security reviews and HIPAA/GDPR assessments add 6–12 months |
| Decision makers | CIO/CITO (technical), CMO/CMIO (clinical), CFO (budget), Data Protection Officer (compliance) |
| Budget owner | IT capital budget + government health ministry grants + research funding (Horizon Europe) |
| Influencers | Epic, Cerner, Meditech (EHR vendors — build the GCP partnership story); Deloitte, Accenture (system integrators) |
| Key differentiator in win | Healthcare-specific compliance readiness (HIPAA BAA, GDPR Article 28) and Cloud Healthcare API |
| Key blocker | Clinical champion required; CISO security review; DPO approval |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| HIPAA (US) | PHI protection; Business Associate Agreement required | Google offers HIPAA BAA for covered services; Sensitive Data Protection for PHI discovery |
| GDPR/RODO (EU) | Patient data as special category; explicit consent; right to erasure | EU data regions; special category data processing agreements; deletion APIs |
| EHDS (European Health Data Space) | Cross-border health data sharing (regulation in force 2025+) | Cloud Healthcare API FHIR R4 enables EHDS-compliant data exchange |
| MDR (EU Medical Device Regulation) | AI diagnostic tools classified as medical devices | Google's AI solutions are infrastructure; customer responsibility for MDR of applications built on GCP |
| ISO 27799 | Health informatics security standard | GCP ISO 27001/27799 certifications |
| NIS2 | Hospitals are critical infrastructure under NIS2 | Chronicle SIEM; Security Command Center; incident response |
| DICOM / HL7 FHIR | Interoperability standards for medical imaging and records | Native support in Cloud Healthcare API — not a bolt-on |

**EHDS is the 2025–2026 opportunity.** The European Health Data Space regulation requires member states to enable health data sharing for research, public health, and innovation. GCP's FHIR-native infrastructure is the technical foundation. Every national health system in the EU will need to evaluate their data architecture against EHDS requirements.

---

## 6. Top 3 Use Cases

### Use Case 1: AI-Assisted Clinical Documentation
**Problem:** A hospital with 500 consultants; each spends 2 hours/day on documentation. That's 1,000 physician-hours/day — roughly 125 FTE equivalents — spent typing, not treating.
**Solution:** Ambient voice AI (Google's medical speech recognition) captures the consultation → Vertex AI generates a structured clinical note in FHIR format → clinician reviews and approves in 30 seconds → note flows into EHR.
**Business Value:** Reclaim 60–90 minutes per clinician per day; reduce burnout-related turnover (replacing a consultant costs €50–100K); improve note quality and coding accuracy (revenue impact).
**Implementation note:** This requires a clinical champion (department head or CMO) to get into production. Lead with a pilot in a single department.

### Use Case 2: Federated Research Data Platform
**Problem:** A research consortium has genomics data in 5 hospitals across 3 countries. Each hospital's DPO has blocked data movement. The study is stalled.
**Solution:** BigQuery Omni (multi-cloud, multi-region) with Confidential Computing and differential privacy techniques. Data stays in each hospital's jurisdiction; queries run across the federated dataset without moving PHI. Results return only aggregate statistics.
**Business Value:** Enable research that was legally impossible; accelerate drug discovery timelines by years; attract Horizon Europe research funding; comply with GDPR cross-border transfer restrictions.
**References:** This is the model used in several EU COVID-19 research programs.

### Use Case 3: Intelligent Medical Imaging Triage
**Problem:** Radiology backlog at a major hospital: 6-week wait for non-urgent CT scans. Radiologists are under-resourced. Urgent cases are hidden in the queue.
**Solution:** DICOM images routed through Cloud Healthcare API → Medical Imaging Suite applies AI triage model → urgent findings (pulmonary embolism, stroke signs, cancer indicators) flagged to top of radiologist queue → non-urgent studies triaged to appropriate resource.
**Business Value:** Reduce time-to-urgent-result from days to hours; radiologist throughput increases 20–30% (less time on obvious negatives); patient outcomes improve; liability risk reduces.

---

## 7. Killer Demo Scenario

**"The 30-Second Clinical Note" — Gemini + Cloud Healthcare API + Vertex AI**

1. Record a simulated doctor-patient consultation (2 minutes, use a synthetic transcript)
2. Run it through Vertex AI medical speech-to-text — show real-time transcription
3. Gemini generates a structured SOAP note (Subjective, Objective, Assessment, Plan) in FHIR R4 format
4. Show the note auto-populated in a mock EHR (use SMART on FHIR to connect to a demo Epic sandbox)
5. Bonus: show ICD-10 coding suggested automatically — revenue cycle angle

Why this works: every clinician in the room has experienced documentation hell. The demo is emotionally resonant within 30 seconds. The FHIR output format shows you understand healthcare standards, not just AI.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft Azure | Epic's Cosmos (Azure-hosted) partnership; M365 in many hospitals | Google's Cloud Healthcare API is more complete; Medical Imaging Suite; Google Research's medical AI publications; Gemini for clinical documentation is ahead of Copilot for Medicine |
| AWS HealthLake | AWS market share; HealthLake FHIR service | Google's Cloud Healthcare API: more complete HL7/DICOM support; Medical Imaging Suite has no AWS equivalent; GCP's research partnerships (NHS, Mayo Clinic) |
| Epic | Deep EHR footprint; SMART on FHIR app platform | GCP as the infrastructure UNDER Epic; not competing — partnering. Epic runs on GCP; show the partnership |
| IBM Watson Health (divested) | Legacy AI in clinical trials | Watson Health sold to Francisco Partners; Google's Vertex AI for clinical research is the credible replacement |
| Palantir | NHS Federated Data Platform (controversial) | GCP as infrastructure; position as open platform vs proprietary Palantir lock-in |

---

## 9. Macro Trends

1. **EHDS implementation (2025–2027)** — Member states must build national contact points for health data sharing; creates immediate infrastructure demand
2. **AI Act + medical AI** — AI diagnostic tools are "high-risk AI systems" under EU AI Act; require conformity assessment, logging, human oversight. GCP's AI governance tools (Vertex AI Model Registry, Explainable AI) are compliance infrastructure
3. **Genomics at scale** — Whole genome sequencing costs <$100; national genomics programs (UK Biobank, GenomeDenmark) create petabyte-scale compute demands. GCP Life Sciences API is purpose-built
4. **Remote patient monitoring** — IoT sensors, continuous glucose monitors, cardiac patches generating terabytes of time-series patient data. Bigtable/Pub/Sub architecture for health IoT
5. **Healthcare consolidation** — Hospital systems merging; each merger creates data migration and consolidation projects — immediate GCP opportunity
6. **Clinician shortage** — EU faces deficit of 1.8 million healthcare workers by 2030; AI must extend clinician capacity, not just automate admin

---

## 10. Discovery Questions

1. "What percentage of your clinicians' day is spent on documentation vs. direct patient care — and have you measured what that costs you annually?"
2. "If a researcher wanted to join your hospital's EHR data with genomics data from two partner institutions — what would happen when they tried?"
3. "When did you last have a security incident involving patient data — and how quickly were you able to contain it?"
4. "How are you thinking about EHDS compliance — do you have a plan for the cross-border health data sharing requirements?"
5. "What's your imaging backlog looking like today, and what would it mean for patient outcomes if you could get urgent findings to the top of the queue in real time?"
