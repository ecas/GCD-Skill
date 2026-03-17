# GCP Sales Enablement — Solution Patterns
# 18 Named Patterns for Seller Reference

last_verified: 2026-03-17

---

## How to Use This File

Each pattern maps customer language (trigger signals) to a defined solution motion. Use these patterns to:
1. Qualify opportunities during discovery
2. Position the right product combination
3. Set realistic timelines and value expectations

---

## Pattern 1: Legacy Email → Google Workspace Migration

**Description:** Move a customer from on-premises Exchange, Lotus Notes, or aging hosted email to Google Workspace.

**Trigger Signals:**
- "Our Exchange Server is end-of-life next year"
- "We're spending too much on Outlook/Exchange licensing"
- "IT is tired of managing email servers"
- "We need better mobile email support for our field staff"
- "Our email goes down too often"

**Products Involved:**
- Google Workspace (Business Standard / Enterprise Standard)
- Google Vault (eDiscovery and archiving)
- Cloud Identity (for external users needing SSO without full Workspace)
- Gemini for Workspace (upsell)

**Typical Timeline:** 4–12 weeks depending on mailbox count and data migration complexity.
- <1,000 users: 4–6 weeks
- 1,000–10,000 users: 8–12 weeks
- 10,000+ users: 12–20 weeks (phased)

**Business Value Metrics:**
- 40–60% reduction in email infrastructure cost (eliminate on-prem servers, patching, backup)
- 99.9% uptime SLA (vs typical 99.5% or lower for on-prem)
- 30–50% reduction in email-related IT support tickets
- $0 client-side patching overhead

**Best Verticals:**
- Professional Services (law firms, accounting)
- Retail (distributed workforce)
- Education
- Government (G-Suite for Government versions)

**Qualification Questions:**
- How many mailboxes? Current platform?
- Are you under a Microsoft EA that covers Exchange? When does it renew?
- Do you have compliance/archiving requirements (HIPAA, SEC, FINRA)?
- Do you need to migrate email archives?

---

## Pattern 2: On-Prem Data Warehouse → BigQuery Modernization

**Description:** Replace an aging on-premises or cloud DWH (Teradata, Netezza, Redshift, Greenplum, Vertica) with BigQuery.

**Trigger Signals:**
- "Our data warehouse can't keep up with query volumes"
- "We're spending $X million/year on Teradata licenses"
- "Analysts wait hours for reports to run"
- "We want to bring more data in but storage is too expensive"
- "Our DWH team is understaffed and burned out managing the platform"
- "We want to do ML on our warehouse data but can't"

**Products Involved:**
- BigQuery (core)
- Cloud Storage (raw/lake layer)
- Dataflow (ingestion pipelines)
- Looker or Looker Studio (BI layer)
- BigQuery ML (ML on data)
- Dataform (transformations)
- Dataplex (data governance)

**Typical Timeline:**
- Proof of Concept: 2–4 weeks
- Initial migration (2–3 key datasets): 2–3 months
- Full migration: 6–18 months (depending on source complexity)

**Business Value Metrics:**
- 50–80% DWH infrastructure cost reduction (serverless — no idle cluster costs)
- Query performance improvement: 5–100x for complex analytical queries
- Storage cost reduction: 60–80% vs Teradata/Netezza on-prem
- Time-to-insight reduction: analysts self-serve instead of waiting for DBA queue

**Best Verticals:**
- Retail (customer analytics, inventory)
- Financial Services (risk, fraud, regulatory reporting)
- Media & Entertainment (audience analytics)
- Telecom (network analytics, churn)

**Qualification Questions:**
- What DWH platform are they on? License renewal date?
- How many TB of data? How many active users querying?
- What BI tools are they using today?
- Do they have data engineering team capacity for migration?

---

## Pattern 3: Custom AI with Vertex AI + Gemini

**Description:** Help a customer build a custom generative AI or ML application using Google's AI platform.

**Trigger Signals:**
- "We want to build a chatbot that knows our products/policies"
- "We're exploring AI but don't want to be locked into OpenAI"
- "We want to use AI to analyze our own internal data"
- "Our data science team wants a better platform than SageMaker"
- "We need to generate personalized content at scale"
- "We want to build an AI assistant for our employees"

**Products Involved:**
- Vertex AI (training, serving, MLOps)
- Gemini API via Vertex AI (foundation model access)
- AlloyDB or Cloud Storage (data layer for RAG)
- Cloud Run (application serving)
- Vertex AI Search (semantic search component)
- Dataflow (data preprocessing)

**Typical Timeline:**
- Prototype: 2–4 weeks
- Production-ready app: 2–4 months
- Enterprise-scale rollout: 4–8 months

**Business Value Metrics:**
- 30–60% reduction in manual content creation effort
- 40–70% reduction in support ticket resolution time (AI-assisted)
- 2–4 week reduction in new employee onboarding (AI knowledge assistant)
- Measurable analyst productivity gains (hours/week saved on research)

**Best Verticals:**
- Financial Services (document analysis, research)
- Healthcare (clinical documentation, patient Q&A)
- Retail (product descriptions, customer service)
- Professional Services (contract analysis, RFP generation)

**Qualification Questions:**
- What specific use case do they want to start with?
- Where does their data live today (on-prem, other cloud)?
- Do they have a data science/ML engineering team?
- What are their data privacy/compliance constraints?

---

## Pattern 4: Contact Center Transformation (CCAI)

**Description:** Modernize a customer contact center with AI virtual agents, real-time agent assistance, and analytics.

**Trigger Signals:**
- "Our average handle time is too high"
- "We can't scale our contact center to meet seasonal demand"
- "We're spending too much on live agents for simple queries"
- "Customers complain about long wait times"
- "We want to understand what customers are calling about"
- "We're looking at a new IVR platform"

**Products Involved:**
- Dialogflow CX (virtual agent / conversational AI)
- CCAI Agent Assist (real-time guidance for human agents)
- CCAI Insights (post-call analytics, topic modeling)
- Contact Center AI Platform (managed contact center)
- Looker or BigQuery (analytics and reporting)
- Speech-to-Text (call transcription)

**Typical Timeline:**
- Virtual agent for 1 intent cluster: 4–8 weeks
- Full contact center deployment: 4–9 months
- Insights-only (no bot): 4–6 weeks

**Business Value Metrics:**
- 20–40% call deflection rate (routine queries handled by bot)
- 15–25% reduction in average handle time (Agent Assist)
- 10–20% improvement in CSAT scores
- $2–8 cost reduction per contact (vs. ~$8–15 fully-loaded human agent cost)

**Best Verticals:**
- Retail (order status, returns)
- Financial Services (account balance, fraud alerts)
- Telecom (technical support, billing)
- Healthcare (appointment scheduling, benefits)

**Qualification Questions:**
- Current call volume and contact center platform (Genesys, Cisco, Avaya, Five9)?
- What are the top 10 call intent types?
- Current handle time and CSAT baseline?
- Are they open to virtual agent or just assistance/analytics?

---

## Pattern 5: SAP on GCP

**Description:** Migrate SAP workloads (ECC, S/4HANA, BW, HANA) to Google Cloud's SAP-certified infrastructure.

**Trigger Signals:**
- "We need to migrate off SAP ECC before the 2027 end-of-maintenance deadline"
- "Our SAP system is too slow — month-end close takes too long"
- "We want to move SAP to the cloud but can't use VMs — we need certified HANA hardware"
- "We want to analyze SAP data in real time without impacting production"
- "Our on-prem SAP infrastructure is aging and expensive to maintain"

**Products Involved:**
- Bare Metal Solution (SAP HANA certified hardware)
- Compute Engine (SAP application servers)
- Cloud Interconnect (hybrid connectivity)
- Cloud Storage (backup target)
- BigQuery (SAP analytics offload — BW4SAP connector)
- Cloud Run / Vertex AI (custom process automation)

**Typical Timeline:**
- Assessment and planning: 4–8 weeks
- Infrastructure setup: 4–6 weeks
- Migration and testing: 3–6 months
- Total: 6–12 months for production cutover

**Business Value Metrics:**
- 30–50% TCO reduction vs on-prem SAP infrastructure
- 2–4x faster month-end/quarter-end batch processing
- Eliminate hardware refresh cycles ($1–5M capex avoided)
- Real-time SAP analytics via BigQuery integration

**Best Verticals:**
- Manufacturing (ERP core)
- Retail (supply chain, procurement)
- Financial Services (FI/CO workloads)
- Consumer Goods

**Qualification Questions:**
- SAP modules in scope (ECC, S/4, BW, GTS)?
- Current SAP HANA or traditional DB?
- On-prem or co-location today?
- Is S/4 migration in scope or cloud-lift only?
- SAP SI partner relationship?

---

## Pattern 6: Oracle DB → AlloyDB Migration

**Description:** Replace Oracle Database with AlloyDB for PostgreSQL to eliminate Oracle licensing costs while maintaining high performance.

**Trigger Signals:**
- "Our Oracle license costs are out of control"
- "We need to reduce our Oracle support costs"
- "We're looking at open-source database alternatives"
- "Our Oracle contract is coming up for renewal"
- "We want to move to PostgreSQL but need something faster"
- "We're tired of Oracle audit surprises"

**Products Involved:**
- AlloyDB for PostgreSQL (target database)
- Database Migration Service (migration tooling)
- Cloud SQL (for less demanding Oracle workloads)
- Datastream (CDC for near-zero downtime migration)
- Compute Engine (application tier)

**Typical Timeline:**
- Assessment and schema conversion: 4–8 weeks
- Migration and testing: 2–6 months (depending on PL/SQL complexity)
- Performance tuning and cutover: 2–4 weeks

**Business Value Metrics:**
- 60–80% database licensing cost reduction (vs Oracle EE + options)
- 4x faster transactional throughput vs standard PostgreSQL
- Elimination of Oracle support and audit risk
- 99.99% availability SLA with near-zero RPO

**Best Verticals:**
- Financial Services (high-performance OLTP)
- Retail (e-commerce transactions)
- Healthcare (patient data systems)

**Qualification Questions:**
- Oracle edition and options in use (EE, RAC, Partitioning, Advanced Compression)?
- Amount of PL/SQL custom code?
- Oracle support renewal date?
- Current database size and TPS (transactions per second)?

---

## Pattern 7: Security Modernization (Chronicle + SCC)

**Description:** Replace legacy SIEM (Splunk, QRadar, ArcSight) and add cloud-native threat detection.

**Trigger Signals:**
- "Our Splunk costs have become unmanageable"
- "We can't retain enough logs for compliance requirements"
- "Our SOC team is overwhelmed with alerts"
- "We had a breach/near-miss and need better detection"
- "We're migrating to GCP and need cloud-native security monitoring"
- "We're spending $X million on SIEM and it's not working"

**Products Involved:**
- Chronicle SIEM (log ingestion, threat detection)
- Security Command Center Premium (cloud posture management)
- Mandiant Threat Intelligence (threat intel feed)
- SOAR (Chronicle's orchestration and automation)
- BeyondCorp Enterprise (access control)

**Typical Timeline:**
- Chronicle deployment and initial log sources: 4–8 weeks
- SCC enablement: 1–2 weeks (for existing GCP customers)
- Full SOC integration and rule tuning: 2–4 months

**Business Value Metrics:**
- 40–70% SIEM cost reduction vs Splunk (per-employee pricing vs per-GB)
- 12+ months log retention (vs weeks/months on Splunk due to cost)
- Detection coverage improvement: 30–50% more detections from same log volume
- MTTD (Mean Time to Detect) improvement: 60–80%

**Best Verticals:**
- Financial Services (SIEM compliance mandatory)
- Government
- Healthcare (HIPAA audit requirements)
- Critical Infrastructure

**Qualification Questions:**
- Current SIEM platform and contract renewal date?
- Current log volume (GB/day)?
- SOC team size?
- Specific compliance frameworks in scope (PCI, HIPAA, FedRAMP)?

---

## Pattern 8: Zero Trust with BeyondCorp

**Description:** Replace VPN-based remote access with context-aware Zero Trust access.

**Trigger Signals:**
- "Our VPN can't handle the load since we went remote/hybrid"
- "We had a breach that came through the VPN"
- "We're trying to adopt a Zero Trust security model"
- "Our CISO wants to eliminate implicit network trust"
- "We need contractors to access internal apps without full VPN access"
- "Employees are using personal devices and we need to enforce policies"

**Products Involved:**
- BeyondCorp Enterprise (identity and device-based access)
- Cloud Identity (IdP)
- Endpoint Verification (device posture)
- SCC (security monitoring integration)
- Chrome Enterprise (managed browser as control point)

**Typical Timeline:**
- Initial deployment (1–3 apps): 4–8 weeks
- Enterprise-wide rollout: 3–6 months

**Business Value Metrics:**
- VPN infrastructure cost eliminated (hardware, licenses, bandwidth)
- Lateral movement risk reduced by enforcing app-level access vs network access
- Contractor/third-party access without VPN provisioning overhead
- Device health enforcement without MDM replacement

**Best Verticals:**
- Financial Services
- Healthcare
- Professional Services (distributed/contractor workforce)
- Technology companies

**Qualification Questions:**
- Current remote access solution (Cisco AnyConnect, Palo Alto, Zscaler)?
- Do they have an IdP (Azure AD, Okta, Ping)?
- How many contractors/third parties need access?
- Are applications on-prem, in GCP, or multi-cloud?

---

## Pattern 9: Hadoop → Dataproc/BigQuery Migration

**Description:** Migrate on-premises Hadoop clusters (HDFS, Hive, Spark, HBase) to managed GCP equivalents.

**Trigger Signals:**
- "Our Hadoop cluster needs a hardware refresh"
- "We have too many people maintaining the Hadoop platform"
- "Our data engineering team spends more time on ops than building pipelines"
- "We want to separate storage from compute in our big data platform"
- "Our Hadoop jobs are slow and we don't know why"
- "We're considering Databricks — are there alternatives?"

**Products Involved:**
- Cloud Storage (replace HDFS)
- Dataproc (managed Spark/Hadoop — lift-and-shift)
- BigQuery (Hive replacement for SQL analytics)
- Dataflow (Spark Streaming migration to managed service)
- Bigtable (HBase migration)
- Cloud Composer (Oozie/Airflow replacement)

**Typical Timeline:**
- Assessment and migration plan: 2–4 weeks
- Storage migration (HDFS → GCS): 2–6 weeks
- Job migration and validation: 2–6 months
- Decommission on-prem: 1–3 months after validation

**Business Value Metrics:**
- 40–60% infrastructure cost reduction (eliminate Hadoop admin headcount + hardware)
- Pay-per-use Dataproc clusters vs always-on Hadoop nodes
- Separate storage from compute — each scales independently
- 90-second cluster spin-up vs days for on-prem hardware provisioning

**Best Verticals:**
- Financial Services
- Telecom
- Healthcare
- Media & Entertainment (large-scale log processing)

**Qualification Questions:**
- Hadoop distribution (Cloudera, Hortonworks, MapR, open-source)?
- Hardware refresh or lease expiration timeline?
- Key workloads: Hive/SparkSQL, Spark batch, Spark Streaming, HBase?
- Data volume in HDFS?

---

## Pattern 10: Monolith → Microservices (GKE / Cloud Run)

**Description:** Help a customer decompose a monolithic application into containerized microservices.

**Trigger Signals:**
- "Our app deploys take 4 hours and break something every time"
- "We can't scale our application horizontally — the whole thing has to scale together"
- "Our development teams are blocked on each other all the time"
- "We're planning to re-platform our application"
- "We want to move to Kubernetes but don't know where to start"
- "We want to be cloud-native"

**Products Involved:**
- GKE (Kubernetes for stateful/complex workloads)
- Cloud Run (serverless containers for stateless services)
- Cloud SQL / AlloyDB (managed databases for services)
- Pub/Sub (event-driven inter-service communication)
- Cloud Build + Cloud Deploy (CI/CD for microservices)
- Artifact Registry (container image storage)
- Cloud Load Balancing (traffic management)

**Typical Timeline:**
- Strangler fig approach (incremental): 6–18 months
- Big-bang rewrite: not recommended
- First microservice in production: 6–12 weeks

**Business Value Metrics:**
- Deploy frequency increases from weeks to multiple times per day
- Team autonomy — each team owns and deploys their service independently
- Elastic scaling — scale hot services independently without scaling entire app
- Reduced blast radius — one service failure doesn't bring down entire app

**Best Verticals:**
- Technology/SaaS (most common)
- Financial Services (payment processing services)
- Retail (order management, inventory systems)

**Qualification Questions:**
- Tech stack of the monolith (Java, .NET, Python, Ruby)?
- Team structure (1 team or multiple teams on same codebase)?
- Current deployment frequency and failure rate?
- Any regulatory constraints on containerization?

---

## Pattern 11: Document Processing (Document AI)

**Description:** Automate extraction of structured data from unstructured documents (invoices, contracts, medical records, forms).

**Trigger Signals:**
- "We have people manually entering data from invoices/forms"
- "We process thousands of documents per month and it takes too long"
- "We want to automate our AP process"
- "We need to extract information from medical records at scale"
- "Our onboarding process involves too much paper/PDF"
- "We're looking at RPA but it seems fragile"

**Products Involved:**
- Document AI (extraction — invoices, contracts, IDs, W2, medical)
- Cloud Storage (document staging)
- BigQuery (structured output storage and analysis)
- Workflow (orchestration)
- Cloud Run (custom processing logic)
- Pub/Sub (async document queue)

**Typical Timeline:**
- Pilot with one document type: 4–6 weeks
- Full production automation: 2–4 months
- Multi-document type coverage: 4–8 months

**Business Value Metrics:**
- 60–80% reduction in manual data entry headcount (or redeployment)
- 90%+ reduction in processing time (hours → minutes)
- 95%+ accuracy on structured documents (pre-trained parsers)
- Straight-through processing rate: target 70–85% (complex docs still need human review)

**Best Verticals:**
- Financial Services (invoices, loan applications, KYC)
- Healthcare (clinical notes, prior auth, claims)
- Government (permit applications, benefit forms)
- Insurance (claims, policy documents)

**Qualification Questions:**
- Document types in scope?
- Current process: manual keying, RPA, or offshore?
- Volume (documents/month)?
- Required accuracy threshold for their process?

---

## Pattern 12: Real-Time Streaming Analytics

**Description:** Build a real-time event processing pipeline from IoT devices, applications, or transactional systems to analytics dashboards.

**Trigger Signals:**
- "We need to monitor our operations in real time, not T+1"
- "We have IoT devices generating data we can't process fast enough"
- "Our fraud detection is too slow — we need real-time scoring"
- "We want to personalize our website experience in real time"
- "We have a Kafka cluster we want to get off the hardware for"

**Products Involved:**
- Pub/Sub (message ingestion)
- Dataflow (stream processing / Apache Beam)
- BigQuery (sink for analytics — streaming inserts)
- Bigtable (low-latency state store for enrichment)
- Looker Studio or Looker (real-time dashboards)
- Cloud Run or GKE (custom processing microservices)

**Typical Timeline:**
- Simple pipeline (1 source → BigQuery): 2–4 weeks
- Complex streaming pipeline with enrichment and ML scoring: 2–4 months

**Business Value Metrics:**
- Latency reduction: hours/days → seconds/milliseconds
- Fraud: 20–40% improvement in detection rate with real-time scoring
- Operations: immediate alerting on anomalies vs batch reports next morning
- Personalization: 5–15% lift in conversion with real-time behavioral targeting

**Best Verticals:**
- Financial Services (fraud, trading)
- Telecom (network monitoring)
- Retail (inventory, personalization)
- Manufacturing/IoT (equipment monitoring)

**Qualification Questions:**
- Event volume (events/second at peak)?
- Current latency tolerance vs desired latency?
- Sources (Kafka, IoT devices, application events, database CDC)?
- Real-time or near-real-time requirement (sub-second vs sub-minute)?

---

## Pattern 13: Multimodal AI Applications

**Description:** Build applications that process multiple data types (text, images, audio, video) using Gemini's native multimodal capabilities.

**Trigger Signals:**
- "We have both documents and images to analyze together"
- "We want to analyze surveillance footage for safety compliance"
- "We need to process customer feedback from calls and chat together"
- "We want to generate product descriptions from product images"
- "We're looking at computer vision but also need text understanding"

**Products Involved:**
- Gemini API (multimodal — text/image/audio/video in one model)
- Vertex AI (serving and MLOps)
- Cloud Storage (media storage)
- Video Intelligence API (video analysis)
- Vision AI (image analysis — if dedicated needed)
- Cloud Run (application layer)

**Typical Timeline:**
- Proof of concept with Gemini: 1–2 weeks
- Production application: 1–3 months

**Business Value Metrics:**
- Eliminate need for multiple specialized AI models (1 model vs 3–5)
- Reduce inference cost vs running separate vision + text models
- Use cases previously impossible (e.g., "describe this product video in the customer's language")

**Best Verticals:**
- Retail (product catalog automation)
- Manufacturing (visual quality inspection + documentation)
- Healthcare (imaging + clinical notes)
- Media (content tagging, accessibility)

**Qualification Questions:**
- What data modalities do they have?
- Current approach (multiple specialized models, human review)?
- Latency requirements (real-time vs batch)?
- Output: structured extraction or free-form generation?

---

## Pattern 14: E-Commerce Personalization

**Description:** Deploy ML-driven product recommendations and personalized search to improve conversion and average order value.

**Trigger Signals:**
- "Our product recommendations aren't very relevant"
- "Our site search doesn't return good results"
- "We want to personalize the shopping experience"
- "Our conversion rate is below industry average"
- "Customers say they can't find what they're looking for"

**Products Involved:**
- Recommendations AI (collaborative filtering recommendations)
- Vertex AI Search for Commerce (product discovery, search)
- BigQuery (customer behavioral data warehouse)
- Cloud Storage (event data)
- Tag Manager / GA4 (user event collection)
- Looker (recommendation performance analytics)

**Typical Timeline:**
- Recommendations AI integration: 4–8 weeks (requires event collection setup)
- Search integration: 4–8 weeks
- Optimization and tuning: ongoing

**Business Value Metrics:**
- 5–15% increase in conversion rate (Google internal benchmarks)
- 10–20% increase in average order value
- Measurable A/B test results typically visible in 4–8 weeks

**Best Verticals:**
- Retail / E-commerce
- Media & Entertainment (content recommendations)
- Travel (trip/hotel recommendations)

**Qualification Questions:**
- Current e-commerce platform (Shopify, Magento, custom)?
- Monthly active users and SKU count?
- Do they have user event data (clickstream, purchase history)?
- Current recommendation engine (rule-based, third-party)?

---

## Pattern 15: BI Consolidation (Looker)

**Description:** Consolidate fragmented BI tools (Power BI, Tableau, MicroStrategy, Qlik, Excel) onto a single governed semantic layer.

**Trigger Signals:**
- "Different teams have different numbers for the same metric"
- "We have 15 different BI tools and no one knows which is right"
- "Our Tableau Server license costs are too high"
- "Business users can't trust the data in dashboards"
- "We want to embed analytics in our product"

**Products Involved:**
- Looker (semantic layer + BI)
- BigQuery (data warehouse backend)
- Looker Studio (self-service, lighter use cases)
- Dataform (data transformation feeding Looker)
- Cloud SQL or AlloyDB (if Looker connects to operational DBs)

**Typical Timeline:**
- LookML semantic model for 1 data domain: 4–8 weeks
- Migration of key dashboards: 2–3 months
- Enterprise-wide adoption: 6–12 months

**Business Value Metrics:**
- Single version of truth — eliminate "which number is right" disputes
- 30–50% BI licensing cost reduction (consolidating multiple tools)
- Self-service analytics: reduce data team queue by 40–60%
- Embedded analytics capability: potential new revenue stream for ISVs

**Best Verticals:**
- Financial Services (finance consolidation)
- Retail (merchandising, supply chain)
- Healthcare (clinical + operational reporting)

**Qualification Questions:**
- Current BI portfolio (Tableau, PowerBI, MicroStrategy, etc.)?
- License renewal dates?
- Data warehouse or primary database platform?
- Do they have a dedicated BI/data team?

---

## Pattern 16: Multi-Cloud Management (GKE Enterprise / Anthos)

**Description:** Deploy a consistent Kubernetes-based platform across GCP, AWS, Azure, and/or on-prem data centers.

**Trigger Signals:**
- "We're on multiple clouds and managing them is chaos"
- "We have regulatory requirements to keep some workloads on-prem"
- "We want consistent security policies across all our environments"
- "Our Kubernetes deployments are inconsistent across teams"
- "We have an edge/telco use case that needs on-prem compute"

**Products Involved:**
- GKE Enterprise (formerly Anthos — policy, config, service mesh)
- GKE (GCP clusters)
- Anthos Service Mesh (Istio-based)
- Config Sync + Policy Controller (GitOps)
- Anthos attached clusters (manage non-GCP clusters)
- Cloud Monitoring (unified observability)

**Typical Timeline:**
- Single cluster registration and policy baseline: 2–4 weeks
- Multi-environment fleet management: 2–4 months
- Full service mesh and GitOps: 3–6 months

**Business Value Metrics:**
- Consistent policy enforcement across all clusters (compliance)
- Reduce cluster management overhead: 40–60% less ops time
- Portable workloads: move between clouds/on-prem without refactoring
- Centralized audit trail for all cluster activity

**Best Verticals:**
- Financial Services (on-prem + cloud regulatory requirement)
- Telecom (edge + core cloud)
- Government (data sovereignty requirements)
- Large Enterprise (M&A integration — heterogeneous environments)

**Qualification Questions:**
- How many Kubernetes clusters across which environments?
- Primary driver: cost, compliance, or operational efficiency?
- Do they have GitOps/IaC practices today?
- Specific compliance frameworks requiring on-prem data?

---

## Pattern 17: Developer Platform Modernization

**Description:** Build a modern internal developer platform (IDP) with CI/CD, container registry, GitOps, and cloud development environments.

**Trigger Signals:**
- "Our developers spend too much time on infrastructure, not features"
- "Our release process is slow and manual"
- "We're trying to improve developer experience"
- "We have 50 different CI/CD tools and no standardization"
- "We want to adopt platform engineering practices"
- "Developer onboarding takes weeks"

**Products Involved:**
- Cloud Build (CI)
- Cloud Deploy (CD with approval workflows)
- Artifact Registry (container and package registry)
- GKE / Cloud Run (deployment targets)
- Cloud Code + Gemini Code Assist (IDE integration)
- Cloud Workstations (cloud-based dev environments)
- Config Sync (GitOps)

**Typical Timeline:**
- First team on standardized CI/CD: 4–8 weeks
- Platform team establishes golden path: 2–4 months
- Organization-wide adoption: 6–12 months

**Business Value Metrics:**
- Deploy frequency: weekly → multiple times per day
- Lead time for changes: days → hours
- Developer onboarding: weeks → 1–2 days
- Security: consistent supply chain security (signed images, SBOM, vulnerability scanning)

**Best Verticals:**
- Technology/SaaS
- Financial Services (DevSecOps)
- Retail (e-commerce platform teams)

**Qualification Questions:**
- Current CI/CD stack (Jenkins, GitHub Actions, GitLab, Bamboo)?
- Number of developers and teams?
- Deployment target: VMs, containers, serverless?
- Is there a dedicated platform/DevOps team?

---

## Pattern 18: Data Governance & Privacy (Dataplex)

**Description:** Implement enterprise data governance, metadata management, and privacy controls across distributed data assets.

**Trigger Signals:**
- "We don't know where all our sensitive data lives"
- "We're preparing for a GDPR/CCPA audit and need to demonstrate data lineage"
- "Our data catalog is out of date and nobody trusts it"
- "We need to enforce data access policies across our data lake and warehouse"
- "We have a data mesh initiative and need federation with governance"

**Products Involved:**
- Dataplex (data governance, data mesh, metadata management)
- Cloud DLP (sensitive data discovery and masking)
- BigQuery (primary governed data asset)
- Cloud Storage (data lake governance)
- Data Catalog (metadata)
- VPC Service Controls (network-level data perimeters)
- Cloud Audit Logs (access lineage)

**Typical Timeline:**
- Sensitive data discovery scan: 1–2 weeks
- Initial governance taxonomy and policies: 4–8 weeks
- Full data mesh implementation: 4–12 months

**Business Value Metrics:**
- GDPR/CCPA compliance readiness: data subject request response time reduced from weeks to hours
- Sensitive data exposure risk reduced: know where all PII lives
- Data quality improvement: business users trust data more → less shadow IT
- Audit readiness: automated evidence collection vs manual spreadsheet processes

**Best Verticals:**
- Financial Services (BCBS 239, data lineage requirements)
- Healthcare (PHI tracking, HIPAA)
- Government (data classification requirements)
- Retail (GDPR/CCPA for customer PII)

**Qualification Questions:**
- Primary driver: compliance, trust, or cost (shadow IT reduction)?
- Current data catalog/governance tool (Collibra, Alation, Informatica)?
- Specific regulatory deadline or audit driving urgency?
- How many data domains/teams are in scope?
