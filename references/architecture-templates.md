# GCP Architecture Templates for Sales
# Text descriptions for AI-assisted pitch support

last_verified: 2026-03-17

---

## How to Use This File

These are text-based architecture descriptions, not diagrams. They are designed for:
1. Explaining architectures to customers verbally in discovery and demos
2. Feeding into AI tools to generate customized architecture documents
3. Helping non-technical sellers explain what a solution looks like end to end

Each template includes: overview, component list, data flow, key design decisions, and common customer questions.

---

## Architecture 1: Modern Data Platform

**Use Case:** Replace legacy data warehouse with a cloud-native analytics platform. Suitable for customers migrating from Teradata, Netezza, on-prem Hadoop, or Redshift.

**Overview:**
A three-layer platform: raw data storage, transformation, and serving. Raw data lands in Cloud Storage, is transformed by Dataflow pipelines, and serves analytics queries from BigQuery. Looker sits on top as the semantic and BI layer.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Ingestion | Cloud Storage | Raw data landing zone (data lake) |
| Ingestion | Pub/Sub | Real-time event ingestion |
| Ingestion | Datastream | Change data capture from operational databases |
| Processing | Dataflow | Batch and streaming data transformation (Apache Beam) |
| Processing | Dataform | SQL-based ELT transformations with version control |
| Processing | Cloud Composer | Pipeline orchestration (managed Apache Airflow) |
| Storage | BigQuery | Petabyte-scale analytical data warehouse |
| Governance | Dataplex | Data governance, quality, and metadata management |
| Serving | Looker | Semantic layer, governed metrics, enterprise BI |
| Serving | Looker Studio | Self-service dashboards for business users |
| Serving | BigQuery ML | In-database ML for analysts |

**Data Flow:**
1. Source systems (ERP, CRM, transactional databases, SaaS apps, IoT) write to Cloud Storage or Pub/Sub.
2. Dataflow jobs consume from Pub/Sub (real-time) or Cloud Storage (batch) and apply transformations.
3. Transformed data lands in BigQuery in a structured staging schema.
4. Dataform runs SQL transformations to build the curated data marts.
5. Cloud Composer orchestrates pipeline scheduling and dependencies.
6. Looker connects to BigQuery via LookML semantic layer.
7. Business users access dashboards via Looker or Looker Studio.

**Key Design Decisions:**
- Storage and compute are fully separated — cost scales independently.
- All raw data is retained in Cloud Storage (data lake pattern) before transformation, enabling reprocessing.
- LookML in Looker enforces consistent metric definitions — "revenue" means the same thing in every report.
- Dataplex auto-discovers and classifies sensitive data for governance.

**Common Customer Questions:**
- "How does this compare to Databricks?" — Databricks is strong for Python-heavy ML workloads; this pattern is stronger for SQL-native analytics and Google's AI/ML integration.
- "Do we have to use Looker?" — No. Any BI tool with a BigQuery connector works (Tableau, Power BI). Looker adds the semantic layer governance.
- "How do we get data in if our source systems are on-prem?" — Cloud Interconnect or VPN + Datastream for CDC, or batch exports to Cloud Storage.

---

## Architecture 2: RAG AI Application (Retrieval-Augmented Generation)

**Use Case:** Build a custom AI assistant or knowledge base application grounded on enterprise documents. Common use cases: internal employee Q&A, customer support bot, document search.

**Overview:**
Documents are chunked, embedded (converted to vectors), and stored in a vector database. When a user asks a question, the query is embedded, semantically similar document chunks are retrieved, and Gemini generates an answer grounded on those specific chunks.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Data Preparation | Cloud Storage | Source document storage (PDFs, DOCX, HTML) |
| Data Preparation | Document AI | Extract structured text from complex documents |
| Embedding | Vertex AI (text-embedding model) | Convert text chunks to vector embeddings |
| Vector Storage | AlloyDB with pgvector | Store embeddings + metadata with full SQL access |
| Retrieval | AlloyDB ANN (approximate nearest neighbor) | Sub-100ms semantic similarity search |
| Generation | Gemini (via Vertex AI) | Generate grounded answers from retrieved context |
| Orchestration | Vertex AI Agent Builder | Manages RAG pipeline, chunking, retrieval, grounding |
| Application | Cloud Run | Serve the chat/search interface |
| Monitoring | Vertex AI Model Monitoring | Track answer quality, latency, and model drift |

**Data Flow:**
1. Documents uploaded to Cloud Storage (or synced from Google Drive, SharePoint, intranet).
2. Document AI extracts clean text from PDFs and complex formats.
3. Text is chunked (typically 256–1,024 tokens per chunk with overlap).
4. Vertex AI embedding model converts each chunk to a high-dimensional vector.
5. Vectors stored in AlloyDB pgvector alongside the original text chunk and metadata (source, date, department).
6. User submits a query via the application.
7. Query is embedded using the same model.
8. AlloyDB ANN search retrieves the top-K most similar chunks.
9. Retrieved chunks + original query are sent to Gemini as context.
10. Gemini generates an answer, citing the source documents.
11. Answer displayed to user with source attribution.

**Key Design Decisions:**
- AlloyDB preferred over standalone vector databases (Pinecone, Qdrant) because it combines vectors with full relational data — filter by department, document date, access level using SQL.
- Vertex AI Agent Builder handles orchestration so developers focus on application logic.
- Source attribution is critical for enterprise trust — every answer references which document it came from.
- Data never leaves GCP — no documents sent to external LLM APIs.

**Common Customer Questions:**
- "Can this hallucinate?" — Reduced significantly because Gemini is instructed to answer only from the retrieved context. But not zero — human review for high-stakes decisions recommended.
- "What document types does it support?" — PDFs, DOCX, HTML, TXT, and more with Document AI parsers.
- "How do we keep it up to date as documents change?" — Incremental pipeline: when a document is updated, its chunks are re-embedded and the old vectors replaced.

---

## Architecture 3: Contact Center AI

**Use Case:** Modernize a traditional contact center with AI virtual agents, real-time agent assistance, and post-call analytics. Works alongside existing CCaaS platforms (Genesys, Cisco, Five9, Avaya).

**Overview:**
A virtual agent handles routine contacts autonomously. For escalated contacts, human agents receive real-time guidance. All contacts are transcribed and analyzed for insights.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Virtual Agent | Dialogflow CX | Conversational AI for voice and chat |
| Telephony | CCAI Platform (or partner CCaaS) | Call routing, telephony integration |
| Agent Assist | CCAI Agent Assist | Real-time knowledge cards, suggested responses |
| Analytics | CCAI Insights | Post-call topic modeling, sentiment, QA scoring |
| Transcription | Speech-to-Text | Real-time and batch call transcription |
| Data | BigQuery | Contact analytics warehouse |
| Reporting | Looker Studio | Supervisor dashboards |
| Integration | Pub/Sub | Real-time event streaming from contact center |

**Data Flow:**

*Automated (Virtual Agent) Track:*
1. Customer calls/chats in.
2. CCAI Platform routes to Dialogflow CX virtual agent.
3. Dialogflow CX handles the conversation (multiple intents, slot filling, fulfillment via webhooks to backend systems).
4. If resolved: contact closed; interaction logged to BigQuery.
5. If not resolved or customer requests human: escalation with full conversation context handed to agent.

*Human + AI Assist Track:*
1. Call connects to human agent.
2. Speech-to-Text transcribes the call in real time.
3. Agent Assist analyzes transcript and surfaces knowledge articles, suggested responses, and next-best-action.
4. Agent handles the contact with AI assistance.
5. Post-call: CCAI Insights processes full transcript for topics, sentiment, compliance phrases.

**Key Design Decisions:**
- Dialogflow CX is used (not ES) for complex multi-turn conversations — state machine-based flow control.
- Webhook integrations allow Dialogflow to look up order status, account info, and take actions in real time.
- CCAI Insights provides QA auto-scoring — no need to sample 5% of calls manually.
- BigQuery serves as the single analytics store — combine CRM, ACD, and CCAI data.

**Common Customer Questions:**
- "Do we have to replace our existing phone system?" — No. CCAI integrates with existing CCaaS platforms via SIPREC or native connectors.
- "What languages does Dialogflow CX support?" — 50+ languages for text; 30+ for voice (varies by STT language support).
- "How do we train the virtual agent?" — Start with call transcripts to identify top intents; use them to build initial flows.

---

## Architecture 4: Zero Trust Enterprise

**Use Case:** Replace perimeter-based security (VPN + firewall) with identity and device-based Zero Trust access. Based on Google's own BeyondCorp implementation.

**Overview:**
All access requests are evaluated based on user identity, device posture, and context — not network location. There is no concept of a trusted internal network. Every request is authenticated and authorized regardless of origin.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Identity | Cloud Identity or Workspace | Authoritative user directory and IdP |
| Device | Endpoint Verification | Check device OS version, patch level, disk encryption, certificate |
| Access Proxy | BeyondCorp Enterprise (IAP) | Enforce access policy at the application level |
| Policy Engine | Access Context Manager | Define access levels (trusted vs. untrusted device/network) |
| Apps | Internal apps, SaaS, GCP services | Protected resources |
| Monitoring | SCC | Security event monitoring |
| Audit | Cloud Audit Logs | Immutable access logs |
| SSO | Cloud Identity / third-party IdP | Single sign-on across all applications |

**Data Flow:**
1. User attempts to access an internal application from any network.
2. Request hits the Identity-Aware Proxy (IAP) — the application is never directly accessible from the internet.
3. IAP evaluates: Is the user authenticated? Does their access context level meet the policy for this app?
4. Access context check: What device is the user on? Is it managed? Up to date? Encrypted?
5. If policy satisfied: request proxied through to the application.
6. If not: access denied with explanation (e.g., "This app requires a managed device — please enroll your device").
7. All access events logged to Cloud Audit Logs and forwarded to SCC.

**Key Design Decisions:**
- Applications are never exposed directly to the internet — IAP is the only entry point.
- Device certificate from Google Certificate Authority (or existing PKI) proves device identity.
- Access levels are tiered: "corpnet" level requires managed device + corporate network; "remote" level requires managed device only.
- BYOD support: personal devices can get lower access level (e.g., access to collaboration tools but not financial systems).

**Common Customer Questions:**
- "What do we do about legacy apps that don't support modern auth?" — IAP can proxy HTTP/TCP apps including SSH/RDP without app modification.
- "Do we need to replace our existing IdP (Azure AD, Okta)?" — No. BeyondCorp integrates with existing SAML/OIDC IdPs.
- "What about on-prem apps?" — IAP connector allows BeyondCorp to protect on-prem web apps as well.

---

## Architecture 5: Real-Time Event Processing

**Use Case:** Ingest, process, and act on high-volume event streams in near-real-time. Common for fraud detection, IoT monitoring, operational dashboards, and clickstream analytics.

**Overview:**
Events from diverse sources are ingested via Pub/Sub, processed by Dataflow streaming pipelines that apply business logic and enrichment, and written to BigQuery for analytics. Alerts triggered in near-real-time for anomalous events.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Ingestion | Pub/Sub | Durable message queue; decouples producers and consumers |
| Processing | Dataflow (streaming) | Apply business logic, aggregations, windowing, enrichment |
| State | Bigtable | Low-latency key-value store for enrichment lookups (customer profiles, fraud rules) |
| Storage | BigQuery (streaming inserts) | Near-real-time queryable analytics table |
| Alerting | Cloud Functions | Triggered by Pub/Sub when anomaly detected |
| Notifications | Pub/Sub + Cloud Run | Route alerts to email, SMS, PagerDuty |
| Dashboards | Looker Studio (real-time mode) | Live operational dashboards |
| Batch Analytics | BigQuery scheduled queries | Aggregate reports, ML feature generation |

**Data Flow:**
1. Events published to Pub/Sub topics (IoT devices, web events, transaction systems, log aggregators).
2. Dataflow streaming job subscribes to Pub/Sub.
3. For each event: parse, validate, enrich (lookup customer profile from Bigtable), apply windowed aggregations.
4. Processed events written to BigQuery via streaming inserts (available for query within seconds).
5. Anomaly detection logic in Dataflow — if threshold exceeded (e.g., 3 failed transactions in 60 seconds), publish to alert topic.
6. Cloud Function subscribes to alert topic, evaluates severity, triggers notifications.
7. Looker Studio dashboards query BigQuery with auto-refresh for near-real-time monitoring.

**Key Design Decisions:**
- Pub/Sub provides durability and backpressure — producers never lose messages if Dataflow is slow.
- Bigtable used for enrichment lookups (not BigQuery) because Bigtable handles sub-10ms point lookups at scale.
- Windowed aggregations: event time (not processing time) windows handle out-of-order events correctly.
- BigQuery streaming inserts enable seconds-level latency for analytics; batch loads used for cost optimization of non-urgent data.

**Common Customer Questions:**
- "How is this different from Kafka?" — Pub/Sub is a managed alternative to Kafka. If they already have Kafka, Pub/Sub Kafka shim or Dataflow Kafka connector preserves their investment.
- "What's the latency?" — End-to-end latency (event → BigQuery queryable): typically 30–90 seconds. For alerting: 1–10 seconds.

---

## Architecture 6: SAP on GCP

**Use Case:** Host SAP HANA and SAP application servers on Google Cloud with low-latency connectivity to other GCP services for extended analytics and AI capabilities.

**Overview:**
SAP HANA runs on certified Bare Metal Solution hardware in Google data centers. Application servers run on Compute Engine. A dedicated high-bandwidth internal connection links Bare Metal to GCP services. BigQuery provides extended analytical capabilities beyond what HANA can handle economically.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| SAP HANA | Bare Metal Solution | SAP HANA-certified hardware (TDI validated) |
| App Servers | Compute Engine | SAP application servers (ASCS, PAS, AAS) |
| Connectivity | Cloud Interconnect (Dedicated) | On-prem to GCP; low-latency BMS to GCP network |
| Storage | Persistent Disk / Filestore | SAP application data, shared file systems |
| Backup | Cloud Storage | SAP HANA backups (Backint integration) |
| Analytics Offload | BigQuery | Extended analytics beyond HANA's economic range |
| Integration | Cloud Dataflow | SAP data extraction pipelines to BigQuery |
| AI/ML | Vertex AI | Build models on SAP data (demand forecasting, anomaly detection) |
| Monitoring | Cloud Monitoring + Ops Agent | Unified monitoring of SAP application and infrastructure health |
| Disaster Recovery | Cloud Storage + secondary BMS region | HANA System Replication to DR site |

**Data Flow:**

*Operational SAP:*
1. Users access SAP via SAP GUI or Fiori (HTTPS through Cloud Load Balancing and Cloud Armor WAF).
2. Application servers on Compute Engine process requests.
3. HANA on Bare Metal handles transactional reads/writes.
4. HANA backups written to Cloud Storage via Backint for GCP (Certified).

*Analytics Offload to BigQuery:*
1. SAP BW/4HANA or custom ABAP extractors push delta data to Cloud Storage.
2. Dataflow or Cloud Composer pipeline transforms and loads into BigQuery.
3. Analysts query BigQuery for large-scale analytics without impacting SAP production.
4. Vertex AI models trained on SAP data (purchase history, inventory, financial data).
5. Model predictions optionally written back to SAP via BTP or API.

**Key Design Decisions:**
- Bare Metal Solution is required for HANA production — VMware-based hosting does not meet SAP's TDI certification for HANA production.
- Internal network between Bare Metal and GCP is Google's private network — not the public internet — so BigQuery connectivity is low-latency.
- Cloud Storage Backint integration is SAP-certified and replaces expensive tape or SAN backup infrastructure.
- HANA System Replication (HSR) across Bare Metal nodes provides HA; DR to second Bare Metal region.

**Common Customer Questions:**
- "What about SAP BTP (Business Technology Platform)?" — BTP services can run on GCP. GCP is an underlying IaaS option for some BTP services.
- "We're doing an S/4HANA greenfield — do we still need Bare Metal?" — Yes, for production HANA. Pre-prod/dev/QA can run on certified Compute Engine VM shapes.

---

## Architecture 7: Multi-Cloud Kubernetes (GKE Enterprise / Anthos)

**Use Case:** Manage Kubernetes workloads consistently across GCP, AWS, Azure, and/or on-prem data centers from a single control plane.

**Overview:**
GKE Enterprise (formerly Anthos) provides a management plane that registers clusters across any infrastructure. Policy, configuration, and observability are managed centrally. Applications can run on any registered cluster.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Management | GKE Enterprise / Fleet | Register and manage clusters across environments |
| GCP Clusters | GKE (Standard or Autopilot) | GCP-native Kubernetes clusters |
| Other Cloud Clusters | Anthos clusters on AWS/Azure | GKE-consistent clusters in other clouds |
| On-Prem Clusters | Anthos on VMware / bare metal | On-prem Kubernetes with full fleet management |
| Config Management | Config Sync | GitOps-based policy and config distribution |
| Policy | Policy Controller (OPA/Gatekeeper) | Enforce compliance policies across all clusters |
| Service Mesh | Anthos Service Mesh (Istio) | mTLS, traffic management, observability across clusters |
| Observability | Cloud Monitoring + Logging | Unified metrics, logs, traces from all environments |
| CI/CD | Cloud Deploy | Delivery pipelines targeting multiple clusters |

**Data Flow (GitOps Config Distribution):**
1. Platform team commits policy and configuration to a Git repository.
2. Config Sync watches the repository and applies changes to all registered clusters automatically.
3. Policy Controller enforces constraints (e.g., "all containers must specify resource limits," "no privileged containers").
4. If a developer deploys a non-compliant manifest, Policy Controller blocks the deployment at admission.
5. Anthos Service Mesh injects sidecar proxies into all pods — all inter-service traffic is encrypted (mTLS) without application code changes.
6. Distributed traces from Istio sidecars flow to Cloud Trace for end-to-end request visibility.

**Key Design Decisions:**
- Single pane of glass for policy — changing a policy in Git propagates to all clusters in all clouds within minutes.
- Service mesh encryption is transparent — application developers don't need to implement TLS.
- On-prem clusters connected via Cloud Interconnect or VPN — consistent experience regardless of physical location.

**Common Customer Questions:**
- "Do we have to use GCP if we adopt GKE Enterprise?" — No. You can manage AWS EKS and Azure AKS clusters without moving workloads to GCP.
- "How is this different from OpenShift?" — Anthos is Kubernetes-native (upstream), not a fork; management plane is SaaS (no control plane to manage).

---

## Architecture 8: MLOps Pipeline (Vertex AI)

**Use Case:** Build a repeatable, automated pipeline for training, evaluating, deploying, and monitoring ML models in production.

**Overview:**
Data flows from the feature store through training pipelines to a model registry. Approved models are deployed to serving infrastructure with continuous monitoring. Pipelines are version-controlled and reproducible.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Data | BigQuery + Cloud Storage | Raw and processed training data |
| Feature Engineering | Vertex AI Feature Store | Consistent, reusable ML features shared across models |
| Experiments | Vertex AI Experiments | Track training runs, hyperparameters, metrics |
| Training | Vertex AI Training + Pipelines | Scalable distributed training; reproducible pipeline runs |
| Evaluation | Vertex AI Evaluation | Model quality metrics, fairness analysis, explanations |
| Registry | Vertex AI Model Registry | Version-controlled model store with lineage |
| Serving | Vertex AI Prediction (online + batch) | Real-time and batch inference endpoints |
| Monitoring | Vertex AI Model Monitoring | Detect data drift, prediction drift in production |
| Orchestration | Vertex AI Pipelines (Kubeflow) | Define ML pipeline as code; trigger on schedule or data arrival |
| Notebooks | Vertex AI Workbench | Managed Jupyter for experimentation |

**Data Flow:**
1. Raw data in BigQuery/Cloud Storage preprocessed into ML-ready features.
2. Features registered in Vertex AI Feature Store for reuse across multiple models.
3. Data scientists use Vertex AI Workbench (Jupyter) for exploration.
4. Training pipeline defined as code (Kubeflow Pipelines DSL).
5. Pipeline triggered (schedule, new data, or CI/CD) — Vertex AI Pipelines orchestrates all steps.
6. Training runs tracked in Vertex AI Experiments (hyperparameters, loss curves, metrics).
7. Best model automatically evaluated against promotion criteria (accuracy, latency, fairness).
8. Approved model pushed to Vertex AI Model Registry with full lineage (training data version, pipeline run ID).
9. Model deployed to Vertex AI Prediction endpoint (online) or batch prediction job.
10. Vertex AI Model Monitoring watches production predictions for feature drift; alerts ML team if drift detected.

**Key Design Decisions:**
- Feature Store eliminates "training-serving skew" — training and serving use the same feature computation logic.
- Model Registry links every deployed model to its training run, data version, and approval workflow — critical for regulated industries.
- Monitoring triggers automatic retraining pipeline when drift exceeds threshold.

**Common Customer Questions:**
- "Do we have to use Python/TensorFlow?" — No. Vertex AI supports PyTorch, scikit-learn, XGBoost, custom containers, and any framework.
- "How does this compare to SageMaker?" — Vertex AI has a more integrated UX; feature store is natively integrated vs SageMaker's separate service.

---

## Architecture 9: Security Operations Center (Chronicle SIEM + SCC + Mandiant)

**Use Case:** Build or modernize a SOC with cloud-native SIEM, automated threat detection, and integrated threat intelligence.

**Overview:**
All security telemetry from GCP, on-prem, and third-party sources is ingested into Chronicle. Security Command Center monitors the GCP environment for misconfigurations. Mandiant intelligence feeds enrich detections. SOAR automates response playbooks.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Log Ingestion | Chronicle Forwarder + Connectors | Collect logs from firewalls, endpoints, cloud, SaaS |
| SIEM | Chronicle SIEM | Petabyte-scale log storage, search, and correlation |
| Cloud Security | SCC Premium | GCP asset inventory, misconfiguration, threat detection |
| Threat Intel | Mandiant Threat Intelligence | IOC feeds, threat actor profiles, vulnerability intelligence |
| SOAR | Chronicle SOAR | Automated response playbooks |
| Endpoint | CrowdStrike / SentinelOne / Google SecOps EDR | Endpoint telemetry (via Chronicle connector) |
| Identity | Cloud Identity / Azure AD audit logs | User authentication events |
| Network | VPC Flow Logs, Cloud Firewall Logs | Network telemetry from GCP |

**Data Flow:**
1. Log sources configured to forward to Chronicle (syslog, API connectors, GCP native).
2. Chronicle normalizes logs to UDM (Unified Data Model) — standardizes format across all sources.
3. YARA-L detection rules run continuously against incoming events.
4. Mandiant IOCs automatically matched against all ingested events (retroactive matching on historical data).
5. SCC detects GCP-specific threats (crypto mining, IAM escalation, data exfiltration patterns).
6. High-confidence alerts surfaced to SOC analyst queue with full context.
7. Analyst clicks alert → Chronicle shows full attack timeline: all related events for that entity (IP, user, host) across all log sources, for the past 12 months.
8. If alert confirmed: Chronicle SOAR triggers automated playbook (isolate host, revoke credentials, create ServiceNow ticket, notify analyst).
9. Resolved case documented with evidence for compliance audit trail.

**Key Design Decisions:**
- Chronicle's pricing model (per employee, not per GB) removes the log volume trade-off. Customers ingest all logs, not a cost-constrained subset.
- 12-month hot retention by default — compare to Splunk where 30-90 days is typical due to cost.
- UDM normalization enables cross-source correlation — correlate a suspicious login (from Azure AD) with a large data download (from GCP audit logs).

**Common Customer Questions:**
- "How do we migrate from Splunk?" — Migration tooling exists; Chronicle can run in parallel while teams rebuild detection rules.
- "Does it integrate with existing ITSM (ServiceNow)?" — Yes, via Chronicle SOAR connector.
- "What about our on-prem firewall logs?" — Chronicle Forwarder is deployed on-prem to collect and forward syslog, Windows Event Logs, etc.

---

## Architecture 10: Healthcare Data Platform

**Use Case:** Build a HIPAA-compliant healthcare data platform for clinical analytics, population health management, and AI applications.

**Overview:**
Clinical data from EHRs (Epic, Cerner), medical devices, and payer systems is ingested, stored in FHIR format, and made available for analytics and ML applications — all within a HIPAA-compliant GCP environment.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Ingestion | Cloud Healthcare API | HL7v2, FHIR, DICOM ingestion and normalization |
| FHIR Store | Cloud Healthcare API (FHIR R4) | Managed FHIR R4 store with search and audit |
| DICOM | Cloud Healthcare API (DICOM Store) | Medical imaging storage and DICOMweb access |
| Analytics | BigQuery (Healthcare dataset) | De-identified or authorized data for analytics |
| ML | Vertex AI | Predictive models (readmission, deterioration, diagnosis) |
| De-identification | Cloud DLP + Healthcare API | Remove PHI for research use cases |
| Governance | Dataplex + Audit Logs | Data lineage, access audit, consent tracking |
| Security | VPC Service Controls + CMEK | Data perimeter + customer-managed encryption |
| Access | BeyondCorp + Cloud IAM | Role-based clinical data access |
| EHR Integration | Apigee (HL7/FHIR API gateway) | Secure API layer for EHR integration |

**Data Flow:**
1. EHR (Epic, Cerner) sends HL7v2 ADT messages to Cloud Healthcare API.
2. Healthcare API normalizes HL7v2 to FHIR resources (Patient, Encounter, Observation).
3. FHIR resources stored in managed FHIR R4 store with full audit trail.
4. DICOM images from PACS systems stored in DICOM store.
5. De-identification pipeline uses Cloud DLP + Healthcare API to remove PHI for research cohorts.
6. De-identified FHIR data exported to BigQuery for population analytics.
7. Vertex AI models trained on BigQuery data (e.g., 30-day readmission prediction).
8. Model predictions written back to FHIR (RiskAssessment resource) for clinical decision support.
9. Clinicians access via EHR integration or web app — BeyondCorp enforces device and identity policies.

**Key Design Decisions:**
- Cloud Healthcare API is HIPAA-eligible and handles HL7/FHIR/DICOM natively — no custom parsing required.
- VPC Service Controls create a data perimeter — even a compromised GCP credential cannot exfiltrate data outside the perimeter.
- CMEK with Cloud KMS gives the healthcare organization full key control — they can revoke Google's access to their data.
- Consent management: FHIR Consent resources tracked so ML pipelines respect patient consent preferences.

**Common Customer Questions:**
- "Is GCP HIPAA compliant?" — GCP offers HIPAA-eligible services under a Business Associate Agreement (BAA). The customer is responsible for their own HIPAA compliance.
- "What about FDA regulations for AI?" — Clinical decision support AI on GCP can be developed following FDA Software as a Medical Device (SaMD) guidelines. Not a GCP limitation — regulatory strategy question.

---

## Architecture 11: Retail AI (Recommendations + Search + Analytics)

**Use Case:** Deploy AI-powered personalization for e-commerce including product recommendations, intelligent search, and customer analytics.

**Overview:**
Customer behavioral data (events) feeds ML models for recommendations and search. BigQuery stores the analytics foundation. Vertex AI powers custom models. All services integrate with the e-commerce platform via APIs.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Event Collection | Google Tag Manager + Pub/Sub | Collect browse/cart/purchase events |
| Recommendations | Recommendations AI | Personalized product recommendations |
| Search | Vertex AI Search for Commerce | AI-powered product discovery and search |
| Customer Data | BigQuery | Unified customer behavioral data warehouse |
| Custom ML | Vertex AI | Custom churn, LTV, demand forecasting models |
| Personalization | Vertex AI + Gemini | Personalized email/push content generation |
| A/B Testing | Cloud Run + Firestore | Experiment management and assignment |
| Serving | Cloud Run + Cloud CDN | Low-latency recommendation serving |
| Analytics | Looker | Merchandising and personalization performance dashboards |

**Data Flow:**
1. Customer interacts with website/app — events (view, add-to-cart, purchase, search) sent to Pub/Sub via GTM.
2. Dataflow consumes event stream — formats for Recommendations AI (user events API) and BigQuery.
3. Recommendations AI ingests events continuously to improve model freshness.
4. At serve time: customer visits product page → Recommendations AI API called → personalized recommendations returned in <100ms.
5. Customer searches → Vertex AI Search for Commerce returns semantically ranked results, not keyword matched.
6. BigQuery aggregates all events: customer segments, cohort analysis, funnel analytics.
7. Vertex AI custom models trained on BigQuery: predict churn (trigger win-back campaign), forecast demand per SKU (inventory optimization).
8. Gemini generates personalized email copy per customer segment.

**Key Design Decisions:**
- Recommendations AI uses Google's retail-optimized ML models — same technology as Google Shopping.
- Real-time user event ingestion means recommendations reflect in-session behavior (a customer who just searched for "boots" gets boot-relevant recommendations immediately).
- A/B testing framework built on Cloud Run ensures recommendation improvements are statistically validated before full rollout.

**Common Customer Questions:**
- "How long before we see results?" — Recommendations AI needs ~30 days of user event data before model quality is meaningful. Results visible in A/B tests within 2–4 weeks of deployment.
- "Does this work with Shopify/Magento?" — Yes via event collection and API integration. No native plugin; requires development work.

---

## Architecture 12: Workspace + GCP Developer Platform

**Use Case:** Provide developers with a complete, integrated development environment using Google Workspace for collaboration and GCP for build/deploy infrastructure.

**Overview:**
Google Workspace handles communication and documentation. GCP provides the CI/CD, container, and cloud development infrastructure. Gemini AI assistance is woven throughout — in the IDE, in Chat, and in Workspace apps.

**Components:**

| Layer | Component | Role |
|-------|-----------|------|
| Communication | Google Chat | Team messaging, ChatOps (deploy notifications, alerts) |
| Documentation | Google Docs + Drive | Architecture docs, runbooks, ADRs |
| Code | GitHub / GitLab / Cloud Source Repos | Version control (GCP integrates with all three) |
| IDE | Cloud Code (VS Code / IntelliJ plugin) | GCP-aware development, local debugging |
| AI Coding | Gemini Code Assist | Inline code completion and generation |
| CI | Cloud Build | Automated build and test on git push |
| Artifact Storage | Artifact Registry | Container images + packages with vulnerability scanning |
| CD | Cloud Deploy | Promote builds through dev/staging/prod with approvals |
| Compute | GKE + Cloud Run | Deploy target for containerized applications |
| Monitoring | Cloud Monitoring + Error Reporting | Application health visibility in production |
| Cloud Dev Env | Cloud Workstations | Browser-based development environments (no local setup) |
| Secrets | Secret Manager | Centralized secrets — no hardcoded credentials |

**Data Flow (Developer Journey):**

*Development:*
1. Developer opens Cloud Workstation in browser (or uses VS Code with Cloud Code plugin).
2. Gemini Code Assist provides inline completions, explains unfamiliar APIs, generates tests.
3. Developer commits code to GitHub — Cloud Build trigger fires automatically.
4. Cloud Build builds container image, runs tests, pushes to Artifact Registry (with vulnerability scan).

*Deployment:*
1. Cloud Deploy receives new image — deploys to dev environment automatically.
2. Developer tests in dev, approves promotion to staging.
3. Staging deployment runs integration tests — QA approves promotion to production.
4. Cloud Deploy executes canary or blue/green deployment to GKE or Cloud Run.

*Operations:*
1. Cloud Monitoring generates alert → published to Pub/Sub → Cloud Run function posts to Google Chat channel.
2. On-call developer sees alert in Chat with context from Error Reporting.
3. Developer opens Cloud Shell from alert for immediate investigation.
4. Runbook in Google Docs linked from monitoring dashboard.

**Key Design Decisions:**
- Google Chat as ChatOps hub — all pipeline notifications, alerts, and deployment status flow through Chat.
- Cloud Workstations eliminate "works on my machine" — every developer uses identical, centrally managed environments.
- Gemini Code Assist Enterprise grounded on internal codebase — suggestions follow your company's coding patterns.
- Secret Manager prevents credential sprawl — no secrets in environment variables or configuration files.

**Common Customer Questions:**
- "Do developers have to give up their local IDE?" — No. Cloud Code is a plugin for VS Code and IntelliJ. Cloud Workstations are optional but popular for standardization.
- "We already use GitHub Actions — do we have to switch to Cloud Build?" — No. Cloud Deploy works with any CI system. But Cloud Build has native GCP integration and pricing advantages for GCP-heavy workloads.
