# GCP & Google Workspace Product Taxonomy
# Organized by Business Problem

last_verified: 2026-03-17

---

## 1. Communication & Collaboration

### Gmail
- **Description:** Cloud-native business email with 99.9% uptime SLA, AI-powered spam filtering, and integrated search.
- **Business Problem:** Replace aging Exchange/Lotus Notes infrastructure; eliminate on-prem mail server costs and maintenance.
- **Best Industry Fit:** Professional Services, Retail, Education
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** No client-side patching required; AI-powered spam blocks 99.9%+ of threats at no extra cost vs Exchange Online's add-on security tiers.
- **List Price:** Included in all Google Workspace plans (see plan pricing below).

---

### Google Meet
- **Description:** Encrypted video conferencing with AI noise cancellation, live captions, and breakout rooms — built into Workspace.
- **Business Problem:** Reduce reliance on expensive standalone video platforms (Zoom, Webex); improve hybrid meeting quality.
- **Best Industry Fit:** Financial Services, Healthcare, Education
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** No client download for guests; AI-generated meeting summaries (Gemini add-on); tightly integrated with Calendar and Chat.

---

### Google Chat
- **Description:** Team messaging with Spaces, direct messages, and integrated bots/app integrations.
- **Business Problem:** Replace Slack or Teams for internal collaboration; reduce context-switching between tools.
- **Best Industry Fit:** Technology, Retail, Media
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Native Gemini AI assistance in chat threads; included in Workspace at no extra cost vs Slack's separate licensing.

---

### Google Calendar
- **Description:** Shared scheduling, room booking, and resource management integrated with Meet and Gmail.
- **Business Problem:** Eliminate scheduling conflicts; automate room/resource booking for hybrid workforces.
- **Best Industry Fit:** Professional Services, Healthcare, Finance
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Smart scheduling with AI availability suggestions; deep integration with Meet for one-click join.

---

### Google Workspace Plans

| Plan | Price (per user/month, annual) | Key Features |
|------|-------------------------------|--------------|
| Business Starter | $7 | Gmail, Meet (100p), 30 GB pooled storage, Chat |
| Business Standard | $14 | 2 TB pooled, Meet recording, noise cancellation |
| Business Plus | $22 | 5 TB pooled, eDiscovery, audit, Meet attendance |
| Enterprise Standard | Custom pricing | Unlimited storage, DLP, SIEM integration, 1,000-person Meet |
| Enterprise Plus | Custom pricing | Enterprise data regions, advanced compliance, S/MIME |
| Frontline Starter | $2 | Deskless workers; mobile-first; 2 GB storage |
| Frontline Standard | $5 | Frontline + advanced security, AppSheet |

> Note: Business plans are capped at 300 users. Enterprise plans require direct sales engagement.

---

## 2. Data & Analytics

### BigQuery
- **Description:** Serverless, petabyte-scale data warehouse with built-in ML, geospatial analysis, and real-time analytics.
- **Business Problem:** Eliminate DWH scaling pain; end slow query performance on legacy Teradata/Netezza/Redshift clusters.
- **Best Industry Fit:** Retail, Financial Services, Media & Entertainment
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Serverless — no cluster management; columnar storage separates compute from storage; BigQuery ML lets analysts build models without moving data to a separate platform. Cheaper than Redshift at scale due to on-demand pricing and storage separation.
- **List Price:** Storage from $0.02/GB/month (active); On-demand queries $6.25/TB processed; Flat-rate capacity editions from $1,700/month (100 slots).

---

### Looker
- **Description:** Enterprise BI and data analytics platform with LookML semantic layer and embedded analytics capability.
- **Business Problem:** Eliminate inconsistent metrics across teams; build a single source of truth for business KPIs.
- **Best Industry Fit:** Financial Services, Healthcare, Retail
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** LookML semantic layer enforces consistent metric definitions across all reports; embeddable analytics for ISVs. Unlike Power BI/Tableau, metrics are defined once and reused everywhere.
- **List Price:** Custom (contact sales); Looker Studio (free version) available for lighter use cases.

---

### Looker Studio
- **Description:** Free, self-service BI and dashboard tool (formerly Data Studio) with native GCP connectors.
- **Business Problem:** Democratize reporting for teams without budget for enterprise BI licensing.
- **Best Industry Fit:** SMB, Marketing teams across all verticals
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Free tier is genuinely full-featured; connects natively to BigQuery, Google Ads, GA4, Sheets.
- **List Price:** Free. Looker Studio Pro: $9/user/month.

---

### Dataflow
- **Description:** Fully managed Apache Beam service for batch and streaming data pipelines.
- **Business Problem:** Ingest and transform large-scale event and log data in real time without managing Spark/Flink clusters.
- **Best Industry Fit:** Financial Services, Telecom, Retail
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Auto-scaling, no cluster management vs Spark on EMR; unified batch + streaming model reduces code duplication.
- **List Price:** From $0.056/vCPU/hour + $0.003741/GB/hour memory (varies by region).

---

### Dataproc
- **Description:** Managed Spark and Hadoop service for existing big data workloads.
- **Business Problem:** Migrate on-prem Hadoop clusters to the cloud without rewriting pipelines.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Cluster spins up in ~90 seconds vs 20+ minutes on-prem; can shut down after job completes (pay-per-use); native BigQuery connector.
- **List Price:** Dataproc premium: ~$0.048/vCPU/hour on top of underlying VM cost.

---

### Pub/Sub
- **Description:** Asynchronous, scalable messaging service for event-driven architectures and streaming ingestion.
- **Business Problem:** Decouple producers and consumers of real-time event data; replace on-prem Kafka with managed service.
- **Best Industry Fit:** Telecom, IoT/Manufacturing, Financial Services
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Global message delivery with no ops overhead; integrates natively with Dataflow and BigQuery for end-to-end streaming.
- **List Price:** First 10 GB/month free; $0.04/GB thereafter.

---

### Cloud Composer
- **Description:** Managed Apache Airflow service for orchestrating complex data pipelines and workflows.
- **Business Problem:** Replace cron jobs and fragile custom schedulers with auditable, observable workflow orchestration.
- **Best Industry Fit:** Financial Services, Healthcare, Media
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Fully managed Airflow — no version patching; deep GCP operator library for BigQuery, Dataflow, Dataproc.
- **List Price:** From ~$0.29/hour per Composer environment (small).

---

### Dataform
- **Description:** SQL-based data transformation tool for building, testing, and documenting BigQuery pipelines (ELT).
- **Business Problem:** Bring software engineering practices (version control, testing, documentation) to SQL transformations.
- **Best Industry Fit:** Data-intensive verticals: Retail, Finance, Media
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Native BigQuery integration; free within BigQuery vs dbt Cloud licensing fees.
- **List Price:** Included with BigQuery.

---

### Analytics Hub
- **Description:** Data exchange platform for sharing BigQuery datasets within and across organizations.
- **Business Problem:** Monetize or share data assets securely without copying data; access third-party datasets.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Enterprise
- **Key Differentiator:** Zero-copy data sharing — subscriber queries live in publisher's storage; governance stays with publisher.
- **List Price:** Custom / based on BigQuery consumption.

---

### BigQuery ML
- **Description:** Run ML model training and inference directly in BigQuery using SQL syntax.
- **Business Problem:** Enable data analysts to build predictive models without learning Python/ML frameworks.
- **Best Industry Fit:** Retail, Financial Services, Telecom
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** No data movement required; analysts use SQL they already know; dramatically reduces time-to-model vs full MLOps pipelines.
- **List Price:** Included in BigQuery; model training charged per TB processed.

---

## 3. AI & Machine Learning

### Vertex AI
- **Description:** Unified ML platform for training, deploying, and managing custom models with MLOps capabilities.
- **Business Problem:** Standardize the model lifecycle across data science teams; reduce time from experiment to production.
- **Best Industry Fit:** Financial Services, Healthcare, Retail
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Single platform covers data labeling, training, experiment tracking, model registry, deployment, and monitoring vs fragmented AWS SageMaker experience.
- **List Price:** Charged per compute/storage used during training and serving; prediction from $0.0000025/node-hour (varies widely).

---

### Gemini API (Google AI Studio / Vertex AI)
- **Description:** Access Google's Gemini multimodal models (text, image, audio, video, code) via API for custom application development.
- **Business Problem:** Build generative AI features into products without training foundation models from scratch.
- **Best Industry Fit:** Technology, Financial Services, Retail
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Gemini 1.5 Pro offers 1M token context window (largest commercially available); native multimodal — single model handles text/image/audio/video.
- **List Price:** Gemini 1.5 Flash: $0.075/1M input tokens; Gemini 1.5 Pro: $1.25–$2.50/1M input tokens (varies by context length).

---

### Gemini for Google Workspace
- **Description:** AI assistant integrated into Gmail, Docs, Sheets, Slides, and Meet for productivity augmentation.
- **Business Problem:** Reduce time spent on routine writing, summarization, and data analysis tasks.
- **Best Industry Fit:** Professional Services, Financial Services, any knowledge-worker-heavy organization
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Grounded in company's own Google Workspace data (Drive, Gmail) for contextual assistance vs generic Copilot responses.
- **List Price:** Gemini Business add-on: $20/user/month; Gemini Enterprise: $30/user/month (also available bundled in Workspace Enterprise plans).

---

### Document AI
- **Description:** Managed service for parsing, classifying, and extracting structured data from documents (PDFs, forms, invoices).
- **Business Problem:** Automate manual document processing workflows; reduce data entry errors and processing costs.
- **Best Industry Fit:** Financial Services, Healthcare, Government, Insurance
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Pre-trained parsers for 50+ document types (W2, invoices, contracts, medical records); no ML expertise required.
- **List Price:** From $0.65/1,000 pages (general processor); specialized parsers priced separately.

---

### Customer Communications AI (CCAI)
- **Description:** Suite of AI tools for contact centers: Dialogflow CX (virtual agents), CCAI Insights (analytics), Agent Assist.
- **Business Problem:** Deflect routine calls to AI; reduce average handle time; improve agent effectiveness.
- **Best Industry Fit:** Retail, Financial Services, Telecom, Healthcare
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Dialogflow CX handles complex multi-turn conversations; CCAI Insights surfaces real-time guidance to human agents during live calls.
- **List Price:** Dialogflow CX from $0.007/text request; Agent Assist $0.06/min; CCAI Insights from $0.0475/min.

---

### Recommendations AI
- **Description:** Managed personalization service for product and content recommendations.
- **Business Problem:** Increase conversion rates and basket size with ML-driven personalization without building recommendation models in-house.
- **Best Industry Fit:** Retail, Media & Entertainment, E-commerce
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Powers Google.com shopping recommendations; same model available to customers. No ML expertise required.
- **List Price:** $0.27/1,000 prediction requests (after free tier).

---

### Translation API
- **Description:** Neural machine translation for 100+ languages, available as REST API.
- **Business Problem:** Localize content and customer communications at scale without human translation cost.
- **Best Industry Fit:** Retail, Media, Government
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Supports glossaries for domain-specific terminology; AutoML Translation for custom fine-tuning.
- **List Price:** $20/1M characters.

---

### Vision AI
- **Description:** Pre-trained image analysis API for label detection, OCR, face detection, object localization, and explicit content filtering.
- **Business Problem:** Automate image tagging, content moderation, and visual quality inspection.
- **Best Industry Fit:** Retail, Media, Manufacturing
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Single API covers 10+ vision features; AutoML Vision allows custom model training with small labeled datasets.
- **List Price:** From $1.50/1,000 images (label detection); first 1,000 units/month free.

---

### Speech-to-Text / Text-to-Speech
- **Description:** Convert audio to text (STT) and text to natural-sounding speech (TTS) with support for 125+ languages.
- **Business Problem:** Transcribe customer calls, power voice bots, generate audio for accessibility.
- **Best Industry Fit:** Telecom, Financial Services, Healthcare
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Medical Speech-to-Text model specifically trained on clinical vocabulary for healthcare use cases.
- **List Price:** STT: $0.006/min (standard); $0.009/min (enhanced). TTS: $4/1M characters (WaveNet voices).

---

### AutoML
- **Description:** Train high-quality custom ML models with minimal ML expertise using tabular, image, text, and video data.
- **Business Problem:** Give business teams ability to build custom models without dedicated data science headcount.
- **Best Industry Fit:** Retail, Healthcare, Financial Services
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Automated feature engineering and hyperparameter tuning; produces models competitive with hand-built solutions for common use cases.
- **List Price:** Varies by modality; AutoML Tables from $19.32/hour (training).

---

### Vertex AI Search
- **Description:** Managed enterprise search and discovery service powered by Google's search technology and generative AI.
- **Business Problem:** Replace inaccurate keyword search on internal knowledge bases, intranets, and product catalogs with AI-powered semantic search.
- **Best Industry Fit:** Retail, Healthcare, Government
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Built on same infrastructure as Google Search; grounded answers with citations from enterprise content.
- **List Price:** From $2.50/1,000 search queries.

---

### NotebookLM
- **Description:** AI-powered research and note-taking tool that lets users ground Gemini on their own documents.
- **Business Problem:** Accelerate research, RFP responses, and content creation by grounding AI on specific source documents.
- **Best Industry Fit:** Professional Services, Government, Education
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Hallucination-resistant because responses are strictly grounded in user-uploaded sources; available as NotebookLM Enterprise with organizational controls.
- **List Price:** NotebookLM Enterprise pricing: custom (part of Workspace add-on portfolio).

---

## 4. Infrastructure & Compute

### Compute Engine
- **Description:** IaaS virtual machines on Google's global infrastructure with custom machine types and preemptible options.
- **Business Problem:** Lift-and-shift on-prem workloads to the cloud; eliminate data center capital expenditure.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Custom machine types avoid paying for over-provisioned fixed SKUs; sustained use discounts apply automatically (no reservation required).
- **List Price:** n2-standard-4 (4 vCPU, 16 GB): ~$0.194/hour on-demand; ~$0.048/hour spot.

---

### Google Kubernetes Engine (GKE)
- **Description:** Managed Kubernetes service with Autopilot mode, integrated security, and multi-cluster management.
- **Business Problem:** Containerize and orchestrate microservices without managing Kubernetes control planes.
- **Best Industry Fit:** Technology, Financial Services, Retail
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Autopilot mode fully manages node provisioning; GKE Enterprise (formerly Anthos) enables multi-cloud/on-prem fleet management. More opinionated than EKS — less operational overhead.
- **List Price:** GKE Standard: $0.10/cluster/hour (management fee) + node VM costs. Autopilot: priced per pod resource request.

---

### Cloud Run
- **Description:** Fully managed serverless container platform — bring any container, no infrastructure management.
- **Business Problem:** Deploy containerized applications without managing servers or Kubernetes clusters.
- **Best Industry Fit:** Technology/SaaS, Retail, any org modernizing from VMs to containers
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Scales to zero (no idle cost); any language/runtime in a container; faster path to serverless than Lambda (which requires code restructuring).
- **List Price:** First 2M requests/month free; $0.40/million requests; $0.00002400/vCPU-second.

---

### Cloud Functions
- **Description:** Event-driven serverless functions (FaaS) for lightweight backend logic triggered by HTTP, Pub/Sub, or GCP events.
- **Business Problem:** Execute small units of code in response to events without provisioning servers.
- **Best Industry Fit:** Retail (event processing), Technology, IoT
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Tightly integrated with GCP event sources (Cloud Storage, Pub/Sub, Firestore); Cloud Functions 2nd gen runs on Cloud Run infrastructure.
- **List Price:** First 2M invocations/month free; $0.40/million invocations thereafter.

---

### App Engine
- **Description:** Fully managed PaaS for web applications in standard (Node, Python, Java, Go, PHP, Ruby) or flexible runtimes.
- **Business Problem:** Deploy web apps without infrastructure management; legacy GCP entry point for web workloads.
- **Best Industry Fit:** SMB web applications, internal tools
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Mature platform with automatic scaling; most new greenfield apps now prefer Cloud Run for more flexibility.
- **List Price:** Standard: from $0.05/hour per instance; Flexible: VM pricing.

---

### Bare Metal Solution
- **Description:** Dedicated bare-metal servers in Google data centers for Oracle and SAP workloads requiring hardware-level control.
- **Business Problem:** Run Oracle Database and SAP HANA on certified hardware without virtualization — meeting licensing and certification requirements.
- **Best Industry Fit:** Financial Services, Manufacturing, Retail (large SAP/Oracle shops)
- **Customer Size:** Enterprise
- **Key Differentiator:** Oracle-certified hardware in Google's network; low-latency connection to GCP services for analytics offloading. Eliminates need for separate Oracle-certified colocation facility.
- **List Price:** Custom pricing; typically multi-year commitment.

---

## 5. Storage & Databases

### Cloud Storage
- **Description:** Object storage service for any volume of unstructured data (files, backups, media, data lake storage).
- **Business Problem:** Replace on-prem NAS/SAN for unstructured data; store data lake foundation for analytics pipelines.
- **Best Industry Fit:** Media, Healthcare, Financial Services
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Single global namespace with multi-region options; strong consistency by default (vs S3's eventual consistency until 2021); integrated with BigQuery as external tables.
- **List Price:** Standard: $0.020/GB/month (multi-region); Nearline: $0.010/GB; Coldline: $0.004/GB; Archive: $0.0012/GB.

---

### Cloud SQL
- **Description:** Fully managed relational database service for PostgreSQL, MySQL, and SQL Server.
- **Business Problem:** Eliminate DBA overhead for patching, backups, and HA configuration for standard relational workloads.
- **Best Industry Fit:** SMB, Web Applications, Mid-Market transactional workloads
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Automatic failover, point-in-time recovery, and maintenance window management; simpler and cheaper for standard workloads than RDS.
- **List Price:** db-n1-standard-2 (2 vCPU, 7.5 GB): ~$0.1014/hour; storage $0.17/GB/month (SSD).

---

### AlloyDB for PostgreSQL
- **Description:** PostgreSQL-compatible database with 4x faster transactional throughput and 100x faster analytical queries than standard PostgreSQL.
- **Business Problem:** Replace Oracle or high-performance PostgreSQL deployments where performance is a bottleneck; enable HTAP (hybrid transactional/analytical processing).
- **Best Industry Fit:** Financial Services, Retail, Healthcare (high-throughput OLTP)
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** ML-based auto-vacuuming and query optimizer; built-in pgvector support for RAG AI applications; 99.99% SLA with near-zero RPO.
- **List Price:** From $0.2088/vCPU/hour + $0.0884/GB/month storage.

---

### Cloud Spanner
- **Description:** Globally distributed, strongly consistent relational database with horizontal scaling.
- **Business Problem:** Eliminate database sharding complexity for globally distributed transactional applications that have outgrown single-region relational databases.
- **Best Industry Fit:** Financial Services (global payments), Gaming, Telecom
- **Customer Size:** Enterprise
- **Key Differentiator:** Only database offering SQL + ACID transactions + horizontal scale + global distribution simultaneously. No equivalent on AWS or Azure.
- **List Price:** From $0.90/node/hour (regional) + $0.30/GB/month storage.

---

### Firestore
- **Description:** Serverless NoSQL document database with real-time sync and offline support for mobile/web apps.
- **Business Problem:** Power real-time mobile and web applications without managing database infrastructure.
- **Best Industry Fit:** Mobile apps, Gaming, Retail (real-time inventory)
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** Real-time listeners push updates to clients instantly; native offline support vs DynamoDB's more complex offline handling.
- **List Price:** 1 GB storage free; $0.18/GB/month; reads $0.06/100K; writes $0.18/100K.

---

### Bigtable
- **Description:** Fully managed, petabyte-scale NoSQL wide-column database for time-series, IoT, and high-throughput workloads.
- **Business Problem:** Store and query massive volumes of time-series or IoT sensor data at millisecond latency.
- **Best Industry Fit:** Financial Services (tick data), IoT/Manufacturing, Telecom
- **Customer Size:** Enterprise
- **Key Differentiator:** Powers Google Search, Maps, and Gmail internally; HBase-compatible API for Hadoop migration; sub-10ms latency at billion-row scale.
- **List Price:** From $0.65/node/hour (SSD); storage $0.17/GB/month.

---

### Memorystore
- **Description:** Fully managed Redis and Memcached service for in-memory caching and session management.
- **Business Problem:** Add caching layer to applications to reduce database load and improve response times without managing cache infrastructure.
- **Best Industry Fit:** Retail (session caching), Gaming, Financial Services
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Fully managed — automatic failover, patching, and monitoring; Memorystore for Redis Cluster supports horizontal scaling.
- **List Price:** From $0.049/GB/hour (Redis Basic).

---

## 6. Security & Identity

### Security Command Center (SCC)
- **Description:** Centralized security and risk management platform for GCP — asset inventory, misconfiguration detection, threat detection.
- **Business Problem:** Get unified visibility into security posture across all GCP projects; detect misconfigurations before they become breaches.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Native to GCP — no agents required; SCC Premium includes Event Threat Detection (crypto mining, data exfiltration) and integrated with Chronicle for SIEM.
- **List Price:** SCC Standard: free. SCC Enterprise: custom pricing (includes Mandiant capabilities).

---

### Chronicle (Google Security Operations)
- **Description:** Cloud-native SIEM and SOAR platform built on Google's infrastructure for security operations at scale.
- **Business Problem:** Replace legacy SIEM (Splunk, IBM QRadar) with a platform that ingests and retains petabytes of logs affordably.
- **Best Industry Fit:** Financial Services, Government, Large Enterprise
- **Customer Size:** Enterprise
- **Key Differentiator:** Flat-rate pricing per employee (not per data volume) — fundamentally different pricing model from Splunk; Google-scale threat intelligence natively integrated.
- **List Price:** Custom per-employee pricing (not per GB — key differentiator).

---

### BeyondCorp Enterprise
- **Description:** Google's Zero Trust access solution — enforce access policies based on identity and device posture, not VPN.
- **Business Problem:** Eliminate VPN bottlenecks and lateral movement risk; enable secure remote work without traditional network perimeter.
- **Best Industry Fit:** Financial Services, Healthcare, Professional Services
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Built on the same Zero Trust model Google uses internally since 2011 (BeyondCorp research papers); context-aware access policies check device health, user identity, and location continuously.
- **List Price:** $6/user/month.

---

### Cloud IAM
- **Description:** Identity and Access Management for GCP resources — define who can do what on which resources.
- **Business Problem:** Enforce least-privilege access across all cloud resources; meet audit requirements for access control.
- **Best Industry Fit:** All verticals (foundational)
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Conditions support — grant access based on time, IP range, device; Workload Identity Federation eliminates long-lived service account keys.
- **List Price:** Free (included with all GCP usage).

---

### Cloud KMS
- **Description:** Managed encryption key service for CMEK (Customer-Managed Encryption Keys) across GCP services.
- **Business Problem:** Meet data sovereignty and compliance requirements by controlling your own encryption keys.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Key Access Justifications (Enterprise) — Google requests permission before accessing your keys, with audit log; Cloud HSM for FIPS 140-2 Level 3 compliance.
- **List Price:** $0.06/active key version/month; $0.03/10,000 cryptographic operations.

---

### Cloud Armor
- **Description:** DDoS protection and Web Application Firewall (WAF) for GCP workloads.
- **Business Problem:** Protect public-facing applications from DDoS attacks, SQL injection, XSS, and Layer 7 threats.
- **Best Industry Fit:** Retail (e-commerce), Financial Services, Gaming
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Google absorbs DDoS traffic at the network edge — customers are protected by Google's global infrastructure that absorbs the largest recorded DDoS attacks.
- **List Price:** Standard: free (basic DDoS). Managed Protection Plus: $3,000/month per project.

---

### VPC Service Controls
- **Description:** Security perimeters around GCP services to prevent data exfiltration even by authenticated users.
- **Business Problem:** Prevent data exfiltration from BigQuery and Cloud Storage by insider threats or compromised credentials.
- **Best Industry Fit:** Financial Services, Healthcare, Government
- **Customer Size:** Enterprise
- **Key Differentiator:** Blocks data movement to resources outside defined perimeters — addresses the "stolen valid credentials" attack vector that traditional IAM cannot prevent.
- **List Price:** Included with GCP; requires VPC network.

---

### Mandiant (Google Threat Intelligence & IR)
- **Description:** Industry-leading threat intelligence, incident response, and managed detection and response (MDR) services.
- **Business Problem:** Respond to active breaches; proactively hunt threats; enrich security operations with frontline intelligence.
- **Best Industry Fit:** Financial Services, Critical Infrastructure, Government
- **Customer Size:** Enterprise
- **Key Differentiator:** Mandiant responds to more nation-state and ransomware incidents than any other firm; intelligence feeds directly into Chronicle SIEM and SCC.
- **List Price:** Custom (retainer-based for IR; subscription for intelligence).

---

## 7. Networking

### Cloud CDN
- **Description:** Content delivery network leveraging Google's global edge points of presence for fast static and dynamic content delivery.
- **Business Problem:** Reduce latency for global users; offload origin server traffic during traffic spikes.
- **Best Industry Fit:** Retail, Media, Gaming
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Uses Google's own private global network — not leased transit; cache fill uses internal network, reducing egress costs.
- **List Price:** From $0.02/GB (cache egress, North America/Europe).

---

### Cloud Load Balancing
- **Description:** Global, software-defined load balancing with automatic scaling — no pre-warming required.
- **Business Problem:** Distribute traffic across backends globally; handle sudden traffic spikes without capacity planning.
- **Best Industry Fit:** Retail, Media, Financial Services
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Single anycast IP for global load balancing — traffic routed to nearest healthy backend; no warm-up required vs AWS ELB's scheduled scaling.
- **List Price:** From $0.008/hour per forwarding rule + $0.006/GB processed.

---

### Cloud Interconnect
- **Description:** Dedicated (10/100 Gbps) or Partner (50 Mbps–50 Gbps) private connectivity between on-prem networks and GCP.
- **Business Problem:** Replace internet-based VPN with low-latency, high-bandwidth dedicated connectivity for hybrid cloud.
- **Best Industry Fit:** Financial Services, Healthcare, Enterprise with large data transfer volumes
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Dedicated Interconnect traffic doesn't traverse the public internet; reduced egress pricing when using Interconnect.
- **List Price:** 10 Gbps Dedicated: ~$1,700/month (port fee) + per-GB transfer.

---

### Cloud VPN
- **Description:** IPsec VPN tunnels over the public internet connecting on-prem networks to GCP VPC.
- **Business Problem:** Establish secure hybrid connectivity without dedicated circuit investment; quick setup for smaller bandwidth needs.
- **Best Industry Fit:** SMB, Mid-Market, branch office connectivity
- **Customer Size:** SMB / Mid-Market
- **Key Differentiator:** HA VPN provides 99.99% SLA; simpler to configure than AWS Site-to-Site VPN for multi-region setups.
- **List Price:** $0.05/tunnel/hour + standard egress rates.

---

### Cloud DNS
- **Description:** Managed, authoritative DNS service with 100% uptime SLA hosted on Google's global Anycast network.
- **Business Problem:** Eliminate on-prem DNS infrastructure; improve DNS query latency and reliability globally.
- **Best Industry Fit:** All verticals
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** 100% availability SLA (unusual — most DNS providers offer 99.99%); DNS Security Extensions (DNSSEC) supported.
- **List Price:** $0.20/month per zone (first 25); $0.10/million queries.

---

## 8. Developer Tools & DevOps

### Cloud Build
- **Description:** Serverless CI/CD build service — build, test, and deploy container images and application artifacts.
- **Business Problem:** Eliminate Jenkins/self-hosted CI servers; automate build and test pipelines.
- **Best Industry Fit:** Technology/SaaS, Retail, Financial Services (DevOps-mature)
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** 120 free build-minutes/day; native integration with Artifact Registry and Cloud Deploy for full CI/CD pipeline.
- **List Price:** First 120 build-minutes/day free; $0.003/build-minute (n1 machine).

---

### Artifact Registry
- **Description:** Universal package repository for container images, Maven, npm, Python, and more.
- **Business Problem:** Secure, central storage for build artifacts across teams; replace Docker Hub for container images.
- **Best Industry Fit:** Technology, Financial Services
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Integrated vulnerability scanning; native IAM-based access control; supports multiple artifact formats in one registry.
- **List Price:** $0.10/GB/month storage; free egress within same region.

---

### Cloud Deploy
- **Description:** Managed continuous delivery service for automated application delivery to GKE, Cloud Run, and GKE Enterprise.
- **Business Problem:** Standardize and govern deployment pipelines with approval gates, rollback, and audit trails.
- **Best Industry Fit:** Technology, Financial Services, Healthcare (regulated deployments)
- **Customer Size:** Mid-Market / Enterprise
- **Key Differentiator:** Native Skaffold integration; built-in deployment approval flows for regulated industries; automatic rollback on failure.
- **List Price:** $0.02/deployment.

---

### Cloud Code
- **Description:** IDE plugins (VS Code, IntelliJ) for GCP development — Kubernetes YAML authoring, Cloud Run local development, API explorer.
- **Business Problem:** Reduce developer friction when writing code targeting GCP services.
- **Best Industry Fit:** Technology, any engineering-heavy team
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Run and debug Cloud Run and GKE services locally with production parity; Gemini Code Assist integration for inline AI code suggestions.
- **List Price:** Free (plugin).

---

### Gemini Code Assist (formerly Duet AI for Developers)
- **Description:** AI code completion, generation, and explanation integrated into IDEs and Cloud Shell.
- **Business Problem:** Accelerate developer productivity; reduce time writing boilerplate; assist with unfamiliar codebases.
- **Best Industry Fit:** Technology, Financial Services, any org with significant developer headcount
- **Customer Size:** SMB / Mid-Market / Enterprise
- **Key Differentiator:** Can be grounded on internal codebase (Enterprise tier) for company-specific suggestions; 100,000-file context window.
- **List Price:** Gemini Code Assist Standard: $19/user/month. Enterprise: $45/user/month.
