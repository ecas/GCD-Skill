# Vertical Playbook: Education

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

Education is a market where Google has a dominant position at the K-12 level (Google for Education / Chromebook / Workspace for Education) that it has not fully translated into higher education and research computing. The opportunity in higher education is large: university research labs are generating petabytes of data (genomics, climate models, physics simulations) and need HPC/AI infrastructure at cloud scale. At the K-12 level, the Workspace for Education footprint creates an upsell path to Google Cloud for data analytics and AI-powered learning tools.

**The "why now":** Generative AI has made AI in education politically unavoidable. Every school board and university senate is debating AI policy. Google is uniquely positioned as the company that both students and teachers already use, offering an AI-first collaboration platform (Workspace + Gemini) alongside the technical infrastructure for AI research.

---

## 2. Top Pain Points

**K-12:**
1. **Administrative burden on teachers** — Teachers spend 40–60% of their time on non-teaching tasks (marking, reporting, communication, planning)
2. **Digital equity gaps** — Students without home devices/broadband fall behind; school-issued Chromebooks address hardware, but data infrastructure lags
3. **Student data fragmentation** — SIS (Student Information Systems), LMS (Canvas, Moodle), assessment platforms, and safeguarding systems don't share data
4. **Safeguarding & digital safety** — Identifying at-risk students from behavioural signals before crises occur
5. **Staff retention** — Teacher burnout; AI tools that reduce admin can retain teachers

**Higher Education & Research:**
1. **Research computing capacity** — HPC clusters are expensive to maintain; burst capacity for large simulations is needed on demand
2. **Research data management** — Petabytes of research data with no long-term archival strategy; grant compliance requires data sharing
3. **International research collaboration** — Data sovereignty barriers prevent cross-border research data sharing
4. **Student success analytics** — Early identification of students at risk of dropping out; intervention before the crisis point
5. **Legacy ERP/SIS modernisation** — Banner, PeopleSoft, SAP Student running on on-premises infrastructure

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Teacher admin burden | Workspace for Education + Gemini | AI drafts communications, marks assignments, generates reports |
| Digital equity | Chromebook + Workspace EDU | Industry-leading total cost of ownership; offline mode |
| Student data | BigQuery + Looker | Unified data from SIS, LMS, assessment — standard analytics |
| Safeguarding | Vault (Workspace) + BeyondCorp | Content scanning; access controls; audit trails |
| Research computing | HPC on GCP (MPI workloads), TPUs, GPUs (A100, H100) | Scale to thousands of cores on demand; pay per simulation |
| Research data | Google Cloud Storage + BigQuery + AlloyDB | Petabyte-scale archival; open data sharing via BigQuery public datasets |
| Student success | BigQuery ML, Looker | Early warning models from attendance, grades, engagement signals |
| ERP modernisation | AlloyDB, Cloud SQL, Database Migration Service | Migration from Oracle/PostgreSQL to managed cloud databases |

**Key differentiator: TPU/GPU access.** For AI research labs, Google's TPUs (Tensor Processing Units) are available nowhere else. If a university's AI research group is serious about training large models, GCP is the only cloud with TPU access.

---

## 4. Typical Deal Profile

**K-12:**
| Dimension | Details |
|----------|---------|
| Deal size | €50K–€2M (district-wide Workspace + GCP) |
| Sales cycle | 6–18 months; budget cycles tied to academic year |
| Decision makers | Superintendent/CIO, Head of Digital Learning, CFO |
| Budget source | Government grants (EU Digital Education Action Plan), CapEx IT budget |

**Higher Education:**
| Dimension | Details |
|----------|---------|
| Deal size | €500K–€20M+ (research computing + analytics) |
| Sales cycle | 12–24 months; research compute often starts as self-serve |
| Decision makers | CIO/CTO, VP Research, Provost, individual PI (Principal Investigators) |
| Budget source | Research grants, IT capital budget, central analytics budget |
| Entry point | Research computing (TPU/GPU access) or student analytics |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| GDPR/RODO | Student data as personal data; age restrictions (under-16 enhanced protection) | Workspace for Education privacy commitments; no advertising to students; GDPR-compliant DPA |
| FERPA (US) | Student educational records protection | Google's FERPA agreements for US institutions |
| COPPA (US) | Under-13 online services protection | Google for Education compliant product policies |
| EU Digital Education Action Plan | Cross-EU education data interoperability | Open standards approach; data portability |
| Open Science mandate (EU Horizon) | Research data must be open access where possible | BigQuery public datasets; Google Scholar integration |
| Research data management (grant requirements) | FAIR data principles (Findable, Accessible, Interoperable, Reusable) | Cloud Storage + BigQuery for FAIR-compliant research data management |

---

## 6. Top 3 Use Cases

### Use Case 1: AI Teaching Assistant (Workspace + Gemini for Education)
**Problem:** A secondary school teacher with 30 students per class, 5 classes per day. Marks 150 essays per week. Writes 600 parent updates per term. Plans 25 lessons per week. Is burning out.
**Solution:** Gemini integrated into Google Classroom — AI drafts assignment feedback based on rubric; AI suggests differentiated lesson plans; AI generates parent communication drafts; AI summarises student progress for teacher review.
**Business Value:** Reclaim 2–3 hours per teacher per day for actual teaching; reduce administrative burden driving burnout and attrition (replacing a teacher costs £15–25K); measurable impact on teacher satisfaction and retention.
**Sensitivity note:** Position as AI-assisted, not AI-replacing. The teacher reviews and approves everything. This framing is essential for teacher union and parental acceptance.

### Use Case 2: Research Computing Platform (HPC on GCP + TPUs)
**Problem:** A university's computational biology department is running climate models that take 6 weeks on their on-premises cluster. The cluster costs €2M to run per year, is underutilised 70% of the time, and has a 3-month wait for large jobs.
**Solution:** Migrate HPC workloads to GCP using preemptible A2 (A100) GPU instances. Slurm on GKE for workload management. Archive raw data to Cloud Storage. BigQuery for results analytics. For AI research: TPU v4 pods for model training.
**Business Value:** 6-week simulation → 4-day simulation (15x faster); cost per simulation run reduced 40% (no idle infrastructure cost); researchers no longer queue — burst capacity available immediately; 3-year cluster refresh cycle eliminated.
**References:** CERN OpenLab on GCP; UK Met Office climate modelling.

### Use Case 3: Student Success Early Warning System
**Problem:** A university loses 15% of first-year students to dropout. Each dropout costs the institution €8,000–€15,000 in lost fees plus the social cost to the student. Interventions work — but only if the student is identified early.
**Solution:** BigQuery integrates signals from LMS (login frequency, submission timing, grades), library systems (research tool access), accommodation (meal plan usage), and financial systems → Vertex AI ML model predicts dropout risk → Looker dashboard surfaces at-risk students to pastoral tutors → intervention is offered within 2 weeks of risk signal.
**Business Value:** 30–40% reduction in first-year dropout (industry benchmark from similar deployments); measurable ROI within first academic year; pastoral staff use their time on highest-need students.
**Privacy note:** Requires careful data governance design and student consent framework. DPO engagement from day one.

---

## 7. Killer Demo Scenario

**"The Teacher's Friday Afternoon" — Gemini in Google Classroom**

1. Show a teacher's Google Classroom view: 150 essay submissions waiting to be marked
2. Open one essay: Gemini provides draft feedback aligned to the marking rubric in 10 seconds
3. Teacher edits the draft feedback (adds a personal note), approves — 30 seconds total per student
4. Show the class progress dashboard: Gemini has identified 3 students whose performance is declining and drafted a parent communication for each
5. Teacher approves with one click — communication sent
6. Total time for what normally takes 4 hours: 45 minutes

Why this works: every teacher in the room recognises this Friday afternoon feeling. The demo is emotionally grounded. The productivity gain is undeniable. The "teacher still controls everything" framing addresses the "AI replacing teachers" anxiety.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| Microsoft (M365 Education + Azure) | Teams for Education footprint; Azure for research; Copilot | Google Workspace's deep integration with Classroom; Chromebook total cost of ownership advantage; GCP TPU access for AI research (unique differentiator); Google's education-specific AI safety commitments |
| Canvas / Instructure | LMS market leader | GCP as infrastructure for Canvas; BigQuery connector for Canvas analytics data |
| Blackboard / Anthology | Legacy LMS incumbent in UK/EU higher education | Migration path from Blackboard to Canvas/Moodle on GCP; position as infrastructure, not LMS replacement |
| AWS (for research computing) | Research computing market share; AWS research credits | GCP's TPU advantage; BigQuery vs Redshift for research analytics; Google research partnerships (DeepMind, Brain) give academic credibility |

---

## 9. Macro Trends

1. **EU Digital Education Action Plan (2021–2027)** — €2.1B allocated to digital education transformation; creates grant funding for technology procurement
2. **Generative AI policy debates** — Every institution is writing AI policy; Google's position as a trusted AI provider with transparent governance (Gemini for Workspace with privacy commitments) is an advantage in this debate
3. **Open Science mandate** — EU Horizon Europe requires research data to be FAIR (open where possible); BigQuery public datasets infrastructure is aligned
4. **Demographic pressure on universities** — Falling domestic student numbers in many EU countries; institutions competing harder for international students → personalisation and student experience investment
5. **Research computing at scale** — AI research is now GPU-limited, not human-limited; university AI departments are directly bottlenecked by compute access
6. **EdTech consolidation** — Post-COVID EdTech boom has consolidated; surviving EdTech companies are building on cloud infrastructure — partnership opportunity

---

## 10. Discovery Questions

1. "How many hours per week does a typical teacher in your school spend on marking and administrative tasks — and do you have a target for reducing that?"
2. "What's your first-year student retention rate, and how early in the academic year can you currently identify students who are struggling?"
3. "For your research computing users — what's the typical wait time for a large job, and what happens to those researchers' productivity while they wait?"
4. "How are you thinking about your AI policy for students and staff — and is Google's approach to responsible AI in Workspace part of that conversation?"
5. "When GDPR applies to your student data, does your current setup give you confidence about where that data lives and who can access it?"
