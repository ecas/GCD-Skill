# Data & AI Module — Google Cloud Sales Enablement

> **Usage:** Read this file for any query involving Google's AI/ML portfolio, Gemini, BigQuery, Vertex AI, data & analytics products, RAG architecture, AI maturity assessment, or AI-specific deal preparation. This is the fastest-growing part of Google's portfolio and the most common reason enterprises choose GCP over AWS in 2025–2026.

---

## Table of Contents

1. [AI/ML Product Portfolio for Sales](#1-aiml-product-portfolio-for-sales)
2. [AI Maturity Assessment Framework](#2-ai-maturity-assessment-framework)
3. [Industry AI Use Cases by Vertical](#3-industry-ai-use-cases-by-vertical)
4. [RAG Architecture Patterns](#4-rag-architecture-patterns)
5. [Gemini for Workspace Value Proposition](#5-gemini-for-workspace-value-proposition)
6. [Customer Pitch Example: Poczta Polska](#6-customer-pitch-example-poczta-polska)

---

## 1. AI/ML Product Portfolio for Sales

> For each product: one-sentence description, business problem solved, best industry fit, typical deal size, competitive advantage vs AWS/Azure, and a 15-minute demo scenario.

---

### BigQuery

**What it does:** Serverless, petabyte-scale SQL data warehouse that runs queries in seconds with zero infrastructure management.

**Business problem it solves:** The data warehouse is too slow, too expensive to maintain, or can't scale — analysts wait hours for reports and data teams spend their time on cluster management instead of insights.

**Best industry fit:** Retail (clickstream + inventory), Financial Services (risk analytics, regulatory reporting), Media (audience analytics, ad attribution), Gaming (player behaviour at scale).

**Typical deal size:** $200K–$5M ARR for mid-market; $1M–$20M+ for enterprise with committed-use discounts.

**Competitive advantage:**
- vs. Redshift: Serverless (no cluster sizing or vacuuming), built-in ML (BQML runs inside the warehouse), streaming ingestion included at no extra cost, flat-rate pricing option eliminates bill shock.
- vs. Snowflake: Native ML, tighter Google ecosystem integration (Google Ads, Analytics 360, Firebase), BigQuery Omni runs on AWS/Azure for multi-cloud queries, no virtual warehouse tuning.
- vs. Azure Synapse: BigQuery Omni (multi-cloud) vs. Azure-only; BQML vs. separate Azure ML product; simpler pricing model.

**15-minute demo:** Open the BigQuery console. Load a public dataset (NYC taxi rides or Google Trends). Run a query over 1 billion rows — show it returns in under 10 seconds. Then show BQML: `CREATE MODEL` to train a regression model without leaving SQL. Show the query cost estimator. Close with: "Your analysts can do this today, without a DBA, without a cluster, and without leaving their SQL editor."

---

### Vertex AI

**What it does:** Unified ML platform to build, train, tune, deploy, and monitor any ML model — from custom models to fine-tuned foundation models — in one consistent environment.

**Business problem it solves:** Data science teams waste 80% of their time on infrastructure: setting up environments, moving data, deploying models, monitoring drift. Vertex AI automates all of that so teams ship models to production faster.

**Best industry fit:** Financial Services (fraud detection, credit scoring), Healthcare (clinical NLP, imaging), Retail (personalisation, demand forecasting), any org with an existing data science team.

**Typical deal size:** $300K–$3M for platform licenses + training compute; larger for organisations replacing SageMaker at scale.

**Competitive advantage:**
- vs. SageMaker: Single unified UI/API vs. SageMaker's 30+ disconnected services; Vertex Pipelines (Kubeflow) is simpler than SageMaker Pipelines; Model Registry is first-class; Vertex AI Workbench replaces SageMaker Studio with less setup friction.
- vs. Azure ML: Tighter Google ecosystem (BigQuery as native data source, no copying); Gemini is Google's own foundation model vs. Azure wrapping OpenAI; Vertex AI Search is production-grade managed RAG.

**15-minute demo:** Open Vertex AI Workbench. Show a Jupyter notebook connecting directly to BigQuery (no data export). Train a classification model using AutoML Tables — zero code, point at a BigQuery table, click train. Switch to Model Registry, show the deployed endpoint. Hit the REST API. Show Model Monitoring — "if the data distribution changes, this alerts your team automatically."

---

### Gemini API (via Vertex AI)

**What it does:** Access to Google's Gemini family of models (Pro, Flash, Ultra) via a secure enterprise API — the same model powering Google products, running in your VPC.

**Business problem it solves:** Companies want to build AI-powered products (chatbots, summarisation, document analysis, code generation) but can't send proprietary data to OpenAI or Anthropic due to data privacy, legal, or competitive concerns.

**Best industry fit:** Financial Services (private document analysis), Healthcare (clinical summaries, prior auth), Legal (contract review), any enterprise that has said "we want ChatGPT but our lawyers said no."

**Typical deal size:** $50K–$2M in API consumption; often the entry point for a larger Vertex AI platform deal.

**Competitive advantage:**
- 1M token context window (Gemini 1.5 Pro) vs. GPT-4's 128K — processes entire legal contracts, entire codebases, hours of meeting transcripts in a single call.
- Data stays in Google's VPC; no model training on customer data (contractual guarantee).
- Grounding to Google Search: real-time web knowledge without building a RAG pipeline.
- Gemini Flash: fastest and cheapest model in class — 3–5x lower cost per token than GPT-4 Turbo at comparable quality for most tasks.
- Native multimodality: text, images, audio, video, code all in one model.

**15-minute demo:** Build a live document summariser in Vertex AI Studio (no code). Paste a 50-page regulatory document. Ask it to summarise, extract key obligations, and flag risks. Then show grounding: ask a question about today's news and show citations. Close with: "This took 10 minutes to build. Your team can have a production version in two weeks."

---

### Gemini for Workspace

**What it does:** AI assistant embedded natively across Gmail, Docs, Sheets, Slides, Meet, and Chat — drafts, summarises, generates, and analyses content inside the tools employees already use.

**Business problem it solves:** Knowledge workers spend 28% of their week managing email and 19% searching for information. Gemini compresses both — drafting emails in seconds, summarising long threads, generating first-draft documents from a prompt.

**Best industry fit:** Every knowledge-worker-heavy organisation: Financial Services (report drafting), Professional Services (proposal generation), Healthcare (administrative burden reduction), Government (document drafting).

**Typical deal size:** Add-on to Workspace Enterprise ($30/user/month or included in Enterprise Plus); at 10K users = $3.6M ARR.

**Competitive advantage:** See Section 5 for full Workspace competitive analysis vs. Microsoft Copilot.

**15-minute demo:** Live in Gmail: paste a long email thread, click "Summarise." Open Docs: prompt "Write a first draft of a project status report for a cloud migration programme." Open Sheets: type a question in natural language — "What's the trend in Q3 sales by region?" — and show it generate a chart. End in Meet: show the live captions and post-meeting summary.

---

### Document AI

**What it does:** Pre-trained and custom ML processors that extract structured data from any document type — invoices, contracts, ID documents, medical forms, tax documents — at scale.

**Business problem it solves:** Teams manually key data from paper or PDF documents into ERP/CRM systems — this is slow, error-prone, and doesn't scale. Document AI extracts structured data automatically with >95% accuracy on trained processors.

**Best industry fit:** Financial Services (loan applications, KYC, invoices), Insurance (claims processing), Healthcare (prior auth forms, medical records), Government (permit applications, identity verification), Logistics (customs documents, manifests).

**Typical deal size:** $100K–$1M for enterprise document processing at scale; often sold as part of a broader Vertex AI / data pipeline deal.

**Competitive advantage:**
- vs. AWS Textract: Google's Document AI has specialised pre-trained processors (invoices, tax forms, IDs, healthcare forms) vs. Textract's more generic OCR; human-in-the-loop review built in.
- vs. Azure Form Recognizer: Document AI has deeper vertical-specific models; tighter integration with BigQuery for downstream analytics.
- Google-specific: trained on billions of scanned documents from Google's search crawl — vastly larger training data than any competitor.

**15-minute demo:** Upload a stack of scanned invoices to Document AI. Show the structured JSON output (vendor, line items, amounts, dates) extracted automatically. Show confidence scores. Show the human review queue for low-confidence fields. Connect output to BigQuery: "Now your AP team processes 10,000 invoices per day with 2 people instead of 20."

---

### CCAI (Contact Center AI)

**What it does:** Suite of AI products for contact centres: Dialogflow CX (virtual agents), Agent Assist (real-time agent support), and CCAI Insights (conversation analytics and QA).

**Business problem it solves:** Contact centres are expensive, agents burn out on repetitive queries, wait times are long, and QA sampling is manual and slow. CCAI automates routine calls, helps agents find answers in real time, and analyses every conversation automatically.

**Best industry fit:** Telecom, Banking/Insurance, Retail, Healthcare (scheduling), Utilities.

**Typical deal size:** $200K–$5M depending on call volume; often per-conversation or per-agent pricing.

**Competitive advantage:**
- vs. Amazon Connect + Lex: Google's speech recognition (trained on 1 billion+ hours) has higher accuracy, especially for accented speech and domain-specific vocabulary.
- vs. Azure Bot Service + Cognitive Services: Dialogflow CX is a production-grade, stateful conversational AI platform; Azure's equivalent requires more custom assembly.
- CCAI Insights is unique: analyses 100% of conversations (not just sampled) for QA, compliance, and trends.
- Google owns the full speech stack: Speech-to-Text, Text-to-Speech, Dialogflow, Insights — end-to-end vs. stitched-together competitor solutions.

**15-minute demo:** Live Dialogflow CX: build a simple "check my order status" virtual agent with 3 intents in the visual builder — no code. Show it routing to a live agent with full context passed. Show Agent Assist: open a simulated call, watch it surface the right knowledge article in real time as the caller speaks. Show CCAI Insights: sentiment trends, top call reasons, CSAT prediction.

---

### Recommendations AI

**What it does:** Fully managed personalisation engine that generates real-time product, content, or next-best-action recommendations — trained on a customer's own event data.

**Business problem it solves:** Generic "bestseller" recommendations leave revenue on the table. Personalised recommendations drive 15–40% higher conversion and average order value. Building this in-house requires a significant ML team and months of work.

**Best industry fit:** E-commerce, Media/Streaming, Financial Services (next best product), Retail.

**Typical deal size:** $100K–$2M; often priced per prediction API call at scale.

**Competitive advantage:**
- vs. AWS Personalize: Recommendations AI is trained on Google's recommendation expertise (YouTube, Google Shopping handle billions of recommendations daily) — this is Google's core business.
- No ML team required: feed event data (clicks, purchases, views), choose a recommendation type, deploy via API. Production in weeks, not months.
- A/B testing and optimisation loop built in.

**15-minute demo:** Show the Recommendations AI console. Load a sample retail dataset. Show the model training without code. Deploy and call the REST API — show the personalised recommendation list vs. the generic bestseller list. Show the click-through rate improvement in the evaluation report.

---

### Translation API

**What it does:** Neural machine translation for 130+ languages, available via API or in batch mode for document translation.

**Business problem it solves:** Companies operating in multiple markets spend significant budget on manual translation or are slow to localise products, legal documents, and customer communications.

**Best industry fit:** Retail (product catalogue localisation), Financial Services (regulatory filings), Government (multilingual citizen services), Legal/Professional Services, any multinational.

**Typical deal size:** $20K–$500K in API consumption; often an add-on to broader GCP deals.

**Competitive advantage:**
- Google Translate is the world's most-used translation service, trained on vastly more data than AWS Translate or Azure Translator.
- Document Translation: translates PDFs, Word docs, and HTML while preserving formatting — AWS and Azure offer this but Google's quality is consistently ranked higher in third-party evaluations.
- Media Translation API: real-time translation for audio streams (used in Meet for live captioning across languages).

**15-minute demo:** Show the Translation API console. Translate a 50-page technical PDF and show the preserved formatting. Show the AutoML Translation capability: "You can fine-tune the model on your own domain-specific terminology — legal, medical, or technical."

---

### Vision AI

**What it does:** Pre-trained image classification, object detection, OCR, face detection, and explicit content detection via API; custom model training via AutoML Vision.

**Business problem it solves:** Manual image review (quality inspection, content moderation, document scanning) is slow, inconsistent, and doesn't scale to the millions of images modern businesses handle.

**Best industry fit:** Manufacturing (visual quality inspection), Retail (product recognition, shelf analytics), Media (content moderation), Insurance (damage assessment), Healthcare (pathology imaging), Logistics (package recognition).

**Typical deal size:** $50K–$1M API consumption; larger for custom model training.

**Competitive advantage:**
- Google's Vision AI is trained on data from Google Images (the world's largest labelled image dataset) — depth and breadth of training data is unmatched.
- Visual Inspection AI: purpose-built for manufacturing defect detection, includes the entire ML pipeline optimised for factory floor deployment.
- Vertex AI Vision: manages the full vision MLOps pipeline (data labelling, training, deployment, edge deployment) in one place.

**15-minute demo:** Upload a batch of product images to Vision AI. Show label detection, object detection, and text extraction in one call. Switch to AutoML Vision: show training a custom defect classifier with 50 labelled images. "In manufacturing, this replaces a human QA inspector working at 100ms per item."

---

### Speech-to-Text / Text-to-Speech

**What it does:** Industry-leading speech recognition (130+ languages, streaming and batch) and neural voice synthesis (WaveNet voices, custom voice cloning).

**Business problem it solves:** Call centres spend millions transcribing calls manually; IVR systems use robotic voices that frustrate customers; content creators need multilingual voiceovers.

**Best industry fit:** CCAI (integrated), Healthcare (clinical transcription), Legal (deposition/meeting transcription), Media (podcast and video captioning), Retail (voice commerce).

**Typical deal size:** $30K–$500K; usually part of a CCAI or media processing deal.

**Competitive advantage:**
- Google's speech models are trained on more data than any competitor — built from Google Assistant, YouTube, Voice Search, Meet.
- Medical Speech-to-Text: specialist model fine-tuned on medical terminology (drug names, procedures) — not available from AWS or Azure as a managed product.
- Chirp model (2024): Universal speech model, best accuracy on low-resource languages.
- Custom voice cloning: create a branded synthetic voice in hours from 10+ minutes of audio samples.

**15-minute demo:** Run a live Speech-to-Text transcription of a call recording. Show speaker diarisation (who said what). Show the medical model on a clinical note dictation — compare accuracy vs. the standard model. Show Text-to-Speech: compare WaveNet voices to the competitor robotic TTS. "Your customers notice the difference."

---

### AlloyDB

**What it does:** PostgreSQL-compatible cloud database purpose-built for demanding OLTP workloads — 4x faster transactional throughput and 100x faster analytical queries than standard PostgreSQL.

**Business problem it solves:** PostgreSQL (or Oracle/SQL Server) can't handle the transaction volume or the ad hoc analytical queries the business now requires — companies end up running a separate data warehouse, doubling their costs and complexity.

**Best industry fit:** Financial Services (high-frequency transaction processing), E-commerce (order management), SaaS companies (multi-tenant OLTP), any Oracle migration target.

**Typical deal size:** $100K–$2M ARR; deal size often driven by Oracle license elimination savings.

**Competitive advantage:**
- vs. AWS Aurora PostgreSQL: AlloyDB is 4x faster on OLTP and 100x faster on analytical queries (Google internal benchmarks). AlloyDB uses a disaggregated storage architecture (like Aurora) but adds columnar engine for analytics inside the same database.
- vs. Azure Database for PostgreSQL: AlloyDB's ML-assisted auto-vacuuming and caching outperforms at high concurrency.
- Oracle exit: AlloyDB is the most credible PostgreSQL-compatible Oracle replacement in any cloud.

**15-minute demo:** Run a TPC-C benchmark side by side (pre-computed). Show AlloyDB Omni running on-premises (for Oracle shops not ready to go full cloud). Show columnar engine: run an analytical query — "No separate DW needed for your reporting queries."

---

### Cloud Spanner

**What it does:** Globally distributed, strongly consistent relational database that scales horizontally — the only relational database in the world that combines ACID transactions with horizontal scale and 99.999% availability SLA.

**Business problem it solves:** Businesses with global operations need a database that works everywhere simultaneously (no eventual consistency), handles any transaction volume, and never goes down — Oracle RAC and sharded MySQL can't deliver all three.

**Best industry fit:** Financial Services (global payments, trading), Gaming (leaderboards, inventory), Retail (global inventory management), Telecom (subscriber data management).

**Typical deal size:** $300K–$5M ARR for mission-critical global deployments.

**Competitive advantage:**
- The only globally distributed relational database with external consistency (TrueTime). AWS DynamoDB and Azure Cosmos DB are NoSQL; Aurora Global Database has lag and failover time.
- 99.999% availability SLA = 5 minutes downtime per year maximum.
- No shard management, no read replicas to manage — scales automatically.

**15-minute demo:** Show Spanner's global topology — a table with nodes in Europe, Americas, and Asia. Run a transaction. Show that it reads from the nearest region. Show the metrics: 0 downtime in the last 12 months for a reference workload. "This is what Google built to run Google Ads — $200B in transactions per year."

---

### Dataflow

**What it does:** Fully managed Apache Beam service for building streaming and batch data pipelines — ETL, real-time analytics, and event processing at any scale.

**Business problem it solves:** Data pipelines that need to process real-time event streams (clicks, transactions, sensor data, logs) require significant infrastructure expertise to build and operate. Dataflow eliminates the cluster management and auto-scales to handle traffic spikes.

**Best industry fit:** Financial Services (real-time fraud detection, market data), Retail (real-time inventory, clickstream), Telecom (CDR processing), IoT/Manufacturing (sensor stream processing).

**Typical deal size:** $50K–$1M in compute consumption; usually part of a broader data platform deal.

**Competitive advantage:**
- vs. AWS Kinesis Data Firehose + Glue: Dataflow uses the Apache Beam unified API — same code runs batch and streaming. AWS requires different services for each.
- Auto-scaling to zero: pays only when processing. EMR and Kinesis have minimum costs.
- Dataflow Prime (2024): automatic resource optimisation and vertical scaling.

**15-minute demo:** Show a streaming pipeline reading from Pub/Sub (simulated click events), running windowed aggregations, and writing results to BigQuery in real time. Show the Dataflow monitoring UI — throughput, latency, worker count auto-scaling. "Your data is in BigQuery within 2 seconds of the event happening."

---

### Dataproc

**What it does:** Managed Apache Spark and Hadoop service — run existing Spark/Hadoop jobs on GCP with minimal code changes, with ephemeral clusters that spin up in 90 seconds.

**Business problem it solves:** On-premises Hadoop clusters are expensive to maintain, underutilised 80% of the time, and require specialist Hadoop administrators who are increasingly rare.

**Best industry fit:** Any org migrating off on-premises Hadoop/Spark (Cloudera, Hortonworks, CDH); Data Science teams running large Spark ML workloads.

**Typical deal size:** $100K–$2M migration + ongoing compute; often replaces a large Cloudera contract.

**Competitive advantage:**
- 90-second cluster startup vs. hours for on-prem provisioning — pay only for job duration.
- Dataproc Serverless: run Spark workloads without managing clusters at all.
- Native BigQuery connector: Spark jobs read from BigQuery directly without ETL.
- vs. AWS EMR: Dataproc has faster startup and is generally cheaper for intermittent batch workloads.

**15-minute demo:** Start a Dataproc cluster (show 90-second startup). Submit an existing PySpark job unchanged. Show cost comparison: "Your on-prem cluster costs X/year running 24/7. This job ran for 20 minutes and cost $4."

---

### Pub/Sub

**What it does:** Fully managed, globally distributed messaging and event streaming service — asynchronous message delivery between services at any scale.

**Business problem it solves:** Real-time systems need a reliable, scalable message bus between services and data sources. Building and operating Kafka at scale requires dedicated infrastructure teams.

**Best industry fit:** IoT (sensor data ingestion), E-commerce (order events), Financial Services (market data, trade events), any event-driven microservices architecture.

**Typical deal size:** $20K–$500K in consumption; usually an architectural component of a larger deal.

**Competitive advantage:**
- vs. AWS SQS/SNS/Kinesis: Pub/Sub is a single unified service (push/pull, streaming, messaging) vs. AWS's fragmented portfolio.
- Global by default: message published in Europe is readable in Asia in milliseconds without cross-region configuration.
- Pub/Sub Lite: 10x lower cost for high-volume, zone-local streaming (alternative to Kafka Lite).
- Dead-letter topics, message ordering, exactly-once delivery built in.

**15-minute demo:** Show Pub/Sub publishing IoT sensor events. Show a Dataflow subscriber processing the stream in real time. Show BigQuery as the sink: data landing within 2 seconds. "This is the backbone of your real-time analytics architecture."

---

### Looker

**What it does:** Enterprise BI and data platform built on LookML — a code-first semantic layer that defines metrics once and serves them consistently to every dashboard, API, and application.

**Business problem it solves:** Every team in the business has their own definition of "revenue," "active user," or "churn rate" — creating conflicting numbers that undermine trust in data and waste analyst time reconciling reports.

**Best industry fit:** Enterprises with a central data team that needs to govern metrics; companies where different business units have previously used different BI tools; organisations embedding analytics in customer-facing applications.

**Typical deal size:** $150K–$2M for Looker platform licensing (separate from GCP consumption). Often sold with BigQuery.

**Competitive advantage:**
- vs. Tableau: LookML semantic layer = metrics governed in code, version-controlled, consistent everywhere. Tableau is visualisation-first; Looker is data-model-first.
- vs. Power BI: Looker is multi-cloud, API-first, and headless (can serve metrics to any application or tool). Power BI is Microsoft-ecosystem-locked.
- Looker Studio free tier: drives wedge into accounts — offer Looker Studio for free dashboards, upsell to Looker for governed enterprise BI.
- Embedded analytics: Looker APIs allow customer-facing analytics to be embedded in SaaS products — a differentiated use case Tableau/Power BI don't serve as well.

**15-minute demo:** Show the LookML IDE: define a "customer lifetime value" metric once. Show it appearing consistently in three different dashboards. Show the Explore UI: a business user builds an ad hoc report without SQL. Show an embedded Looker dashboard inside a mock SaaS product portal.

---

### Looker Studio

**What it does:** Free, browser-based self-service dashboarding and reporting tool with 800+ data connectors.

**Business problem it solves:** Teams need quick, shareable dashboards without the cost or complexity of enterprise BI tools.

**Best industry fit:** SMBs, marketing teams, agencies, any team that needs to report on Google Analytics, Ads, Search Console, or BigQuery data quickly.

**Typical deal size:** Free (strategic entry point — leads to BigQuery and Looker deals).

**Competitive advantage:** Native connectors to all Google products (Ads, Analytics, Search Console, BigQuery) — no competitor has these integrations as cleanly. Free, no per-seat licensing.

**15-minute demo:** Connect Looker Studio to a BigQuery dataset. Build a multi-page dashboard with a chart, a scorecard, and a data table in under 5 minutes. Share the link. "This is free. Your team can have this today."

---

### Cloud Composer

**What it does:** Managed Apache Airflow for orchestrating complex data pipelines and ML workflows across GCP and external systems.

**Business problem it solves:** Data pipelines have dozens of dependencies — if one step fails or runs late, everything downstream breaks. Manual monitoring and re-triggering is fragile and unsustainable at scale.

**Best industry fit:** Enterprises with complex data engineering pipelines; organisations running ML retraining workflows; any team using Airflow on-premises.

**Typical deal size:** $30K–$300K; usually a component of a data platform deal.

**Competitive advantage:**
- vs. AWS MWAA (Managed Airflow): Cloud Composer has better GCP service integration (native operators for BigQuery, Dataflow, Vertex AI Pipelines, Dataproc).
- Composer 3 (2024): serverless execution model — no environment management, pay per task.
- When to recommend over Dataform: Composer is for orchestrating cross-system workflows (GCP + external APIs + on-prem). Dataform is for SQL transformation orchestration within BigQuery only.

**15-minute demo:** Show an Airflow DAG in Composer that: (1) ingests from a source system, (2) triggers a Dataflow job, (3) waits for BigQuery data load, (4) triggers a Vertex AI retraining pipeline, (5) sends a Slack notification. "Your entire data platform runs automatically, every morning."

---

### Dataform

**What it does:** Managed data transformation and orchestration tool (dbt-compatible) for building, testing, and documenting SQL pipelines inside BigQuery.

**Business problem it solves:** SQL transformations in BigQuery are not version-controlled, tested, or documented — nobody knows what a table means or when it was last updated. Data teams spend hours debugging upstream failures.

**Best industry fit:** Any organisation with a data engineering team building BigQuery transformations; dbt users who want a managed, Google-native alternative.

**Typical deal size:** Included with BigQuery (no separate charge) — drives BigQuery adoption and usage.

**Competitive advantage:**
- Free: included with BigQuery. dbt Cloud requires a separate $100–$500/month per user license.
- Native BigQuery integration: runs in BigQuery console, uses BigQuery identity, no separate infrastructure.
- Data lineage built in — every table shows what it depends on and what depends on it.
- `assertions` (data quality tests) built in, automatically run after each transform.

**15-minute demo:** Show a Dataform project in BigQuery Studio. Show a SQL transformation with upstream dependencies visualised as a DAG. Run the pipeline. Show a failing assertion: "This is how you catch bad data before it hits your dashboards."

---

### Analytics Hub

**What it does:** Managed data exchange platform for sharing BigQuery datasets within or across organisations — with governed access, row-level security, and usage analytics.

**Business problem it solves:** Organisations want to monetise their data or access third-party data (financial benchmarks, consumer panels, weather data, government datasets) but lack a governed, scalable way to do so.

**Best industry fit:** Financial Services (data monetisation, market data), Retail (trading partner data sharing), Healthcare (research data exchange), Government (open data publishing), any org building a data marketplace.

**Typical deal size:** $50K–$500K; often part of a broader BigQuery platform deal.

**Competitive advantage:**
- vs. AWS Data Exchange: Analytics Hub is tightly integrated with BigQuery — subscribers query data directly in BigQuery without copying it. AWS Data Exchange requires data download and ingestion.
- Google Public Data already in Analytics Hub: Google Trends, Google Ads performance, public government datasets — ready to subscribe.
- Row-level security on shared datasets: share subsets of data to specific subscribers without manual data masking.

**15-minute demo:** Show Analytics Hub marketplace. Subscribe to a public Google Trends dataset — in 30 seconds it appears as a BigQuery table. Write a query joining it to the customer's own data. "You just got access to 15 years of Google Trends data in 30 seconds, no ingestion pipeline needed."

---

### BigQuery ML (BQML)

**What it does:** Runs ML model training and inference inside BigQuery using SQL syntax — no data movement, no Python environment, no ML infrastructure required.

**Business problem it solves:** Data analysts know SQL but not Python/TensorFlow. They need to run ML on data that's already in BigQuery. Moving data to a separate ML platform is slow, expensive, and introduces governance gaps.

**Best industry fit:** Any organisation with analysts in BigQuery who want ML capabilities; Financial Services (churn prediction, credit scoring), Retail (demand forecasting), Marketing (customer segmentation).

**Typical deal size:** Included with BigQuery compute costs — BQML creates additional BigQuery consumption, driving spend.

**Competitive advantage:**
- No competitor offers in-database ML training at this level. AWS Redshift ML calls SageMaker Autopilot (external). Azure Synapse ML is separate from Synapse Analytics.
- Supports: linear/logistic regression, XGBoost, random forests, k-means, matrix factorisation, deep neural networks, AutoML, time series forecasting (ARIMA+), even Gemini/PaLM model calls.
- `ML.PREDICT` as a SQL function: "SELECT * FROM ML.PREDICT(MODEL my_churn_model, TABLE my_customers)" — every analyst can run inference.

**15-minute demo:** In the BigQuery console, run a `CREATE MODEL` statement to train a logistic regression churn prediction model on customer data. Takes 2–5 minutes. Then run `ML.EVALUATE` to show model accuracy. Run `ML.PREDICT` to score the customer table. "Your analysts just built and deployed a churn model. No Python, no infrastructure."

---

### AutoML

**What it does:** No-code/low-code custom ML model training across data types: tabular (AutoML Tables), images (AutoML Vision), text (AutoML Natural Language), video (AutoML Video), translation (AutoML Translation).

**Business problem it solves:** Companies have unique prediction problems (their industry-specific defect categories, their proprietary product taxonomy, their custom sentiment labels) that pre-trained APIs don't solve — but they don't have ML engineers to build custom models from scratch.

**Best industry fit:** Manufacturing (custom defect types), Retail (proprietary product catalogue), Healthcare (custom clinical labels), any domain expert who knows what they want to predict but can't code it.

**Typical deal size:** $50K–$500K; usually part of a Vertex AI platform deal.

**Competitive advantage:**
- Google pioneered AutoML (2017 paper). AWS SageMaker Autopilot and Azure AutoML are catching up but Google's neural architecture search is more mature.
- AutoML Tables is now part of Vertex AI — same unified platform.
- No ML expertise required: point at labelled data, define the target, click train.

**15-minute demo:** Open Vertex AI AutoML Tables. Point at a BigQuery table with customer data and a churn label. Click train. Show feature importance while it trains. Show the evaluation: "Your team labelled the data. Google trained the model. You own the model. It runs in your VPC."

---

### Vertex AI Search

**What it does:** Managed enterprise search and RAG (Retrieval-Augmented Generation) service — connects Gemini to any document corpus (PDFs, websites, BigQuery, Cloud Storage) and returns grounded, cited answers.

**Business problem it solves:** Employees can't find information across fragmented internal systems (SharePoint, Confluence, Google Drive, ERPs) and customers can't self-serve because website search returns irrelevant results. Generic keyword search fails on natural language questions.

**Best industry fit:** Any enterprise with a large knowledge base; Retail (product search); Financial Services (policy/regulatory document search); Healthcare (clinical guideline search); any customer support self-service use case.

**Typical deal size:** $100K–$2M; often positioned as the "AI search" layer on top of existing document repositories.

**Competitive advantage:**
- vs. AWS Kendra: Vertex AI Search uses Gemini for generation (not just retrieval) — answers questions, not just documents. Native multimodal (can search image content).
- vs. Azure AI Search + OpenAI: Vertex AI Search is a single managed service; Azure requires composing Azure Cognitive Search + OpenAI + custom orchestration.
- Grounding citations: every answer shows which documents it came from, with clickable links — critical for enterprise trust and compliance.
- Data connectors: native connectors to Drive, BigQuery, Cloud Storage, third-party (Confluence, Jira, Salesforce) — no custom indexing pipelines.

**15-minute demo:** Create a Vertex AI Search app in the console. Point it at a Cloud Storage bucket of PDF documentation. In 10 minutes, ask a natural language question: "What is the return policy for items purchased over 60 days ago?" Watch it return a cited answer with source documents. "Your customer service team just got an AI assistant that knows every policy document."

---

### NotebookLM

**What it does:** AI-powered research and knowledge management tool — upload documents, and Gemini builds a personalised assistant that summarises, answers questions, generates study guides, and creates audio overviews from your sources.

**Business problem it solves:** Knowledge workers spend hours manually synthesising information from multiple reports, research papers, and documents. Executives need briefings but don't have time to read everything. Research teams need to cross-reference large document sets.

**Best industry fit:** Professional Services (consulting, legal, finance), Research & Development, Sales (account briefing), any knowledge-intensive role.

**Typical deal size:** Included in Google One AI Premium ($19.99/month consumer) or Workspace Business/Enterprise (Google is integrating NotebookLM into the enterprise Workspace tier — pricing evolving). Enterprise version with data governance: check current pricing.

**Competitive advantage:**
- vs. Microsoft Copilot for M365: NotebookLM sources are explicit — you choose what the AI draws from, no hallucination from random M365 content. Citations are always shown.
- Audio overviews: NotebookLM generates podcast-style audio summaries of documents — genuinely unique, no competitor has this.
- No training on your data: documents used in a NotebookLM session are not used to train Google models (contractual guarantee for enterprise).

**15-minute demo:** Upload 5 analyst reports about a customer's industry. Ask NotebookLM: "What are the top three investment priorities in this sector?" Show it synthesising across all 5 documents with citations. Generate an Audio Overview. "Your AE can prep for any customer meeting in 15 minutes, not 3 hours."

---

## 2. AI Maturity Assessment Framework

> Use this framework in the first 30 minutes of any discovery call to quickly calibrate the customer's starting point and match the pitch to their actual readiness. Don't pitch Vertex AI fine-tuning to a Level 1 customer.

---

### Assessment Questions (ask these in order)

1. "Do you have dedicated data engineers or data scientists on staff?" (proxy for Level 2+)
2. "Are business decisions today made from dashboards or from gut feel?" (proxy for Level 1+)
3. "Has your organisation deployed any machine learning model to production — even once?" (proxy for Level 2+)
4. "Do you have automated systems that take action based on data without human approval?" (proxy for Level 3+)
5. "Is AI part of your product or service itself — something your customers experience?" (proxy for Level 4)

---

### Level 0: No AI, Manual Processes

**Profile:** Data lives in spreadsheets or paper. Reporting is monthly and manual. No BI tools. No data team. IT is a cost centre focused on keeping the lights on.

**Indicators in discovery:**
- "We use Excel for everything"
- "Our reports take two weeks to produce"
- "We don't have a data team"
- "IT is just support, not strategic"

**Google products to recommend:**
- **BigQuery** (free tier) as the data foundation — "let's get your data in one place first"
- **Looker Studio** (free) for first dashboards — instant time-to-value
- **Workspace** (if not present) — at least get collaboration and data sharing working
- **Document AI** if document processing is the pain (high ROI, low technical requirement)

**Pitch focus:** ROI and speed. This customer needs to see a working dashboard in 48 hours. Don't talk about ML. Talk about replacing Excel with something that updates automatically. First win = quick win. Use the free tier to reduce budget objections. Frame as "digital foundation" not "AI transformation."

**Typical next step:** BigQuery + Looker Studio POC with their existing data. Free. 2 weeks.

---

### Level 1: Basic Analytics (BI Dashboards)

**Profile:** Has a BI tool (Power BI, Tableau, Qlik, or Excel pivot tables). Data team of 1–5 people. Reports exist but are slow, siloed by department, or not trusted. "We have data but we can't use it."

**Indicators in discovery:**
- "We have Tableau but the data is always out of date"
- "Each department has their own definition of the metric"
- "Our reports take 24 hours to refresh"
- "We can't get all our data sources into one place"

**Google products to recommend:**
- **BigQuery** to replace or centralise the data warehouse — real-time data, no maintenance
- **Dataflow or Pub/Sub** for real-time data ingestion
- **Looker** (if >500 users or governed metrics are the pain) for a semantic layer
- **Dataform** to bring structure and testing to existing SQL transformations
- **BQML** as a bridge to ML — "your analysts can now predict, not just report"

**Pitch focus:** Data reliability and speed. The #1 complaint at Level 1 is "I don't trust the numbers." Fix that first. BigQuery's always-fresh data and Dataform's tested transformations solve data quality. Then use BQML to introduce ML without requiring new skills — "same SQL, but now it predicts."

**Competitive situation:** Often displacing Snowflake or Teradata here. Emphasise BigQuery's serverless model (no tuning), BQML as unique, and Looker Studio free as the BI entry point.

**Typical next step:** BigQuery migration assessment (free workshop). Show a BigQuery + Looker Studio demo on their data.

---

### Level 2: Predictive Analytics (ML Models)

**Profile:** Has a data science team. Has deployed at least one ML model (usually churn, fraud, or propensity). Uses Python/R. Struggles with MLOps: "we can build models but can't get them into production reliably."

**Indicators in discovery:**
- "We have data scientists but models sit in notebooks and never ship"
- "We deployed a fraud model last year but we can't retrain it automatically"
- "We're using SageMaker/Azure ML but it's complex and expensive"
- "We want to use LLMs but don't know where to start"

**Google products to recommend:**
- **Vertex AI** (full platform) for MLOps — training, registry, deployment, monitoring
- **Vertex AI Pipelines** (Kubeflow) for automated retraining
- **Gemini API via Vertex** as the LLM gateway — "your data stays here"
- **Vertex AI Model Garden** to evaluate 130+ models without infrastructure setup
- **Vertex AI Search** for the first RAG application (fast win on the LLM journey)
- **BigQuery + BQML** for analysts who want ML without Python

**Pitch focus:** MLOps and the path to LLMs. The Level 2 customer has proven they can do ML — their pain is operationalising it. Vertex AI's unified platform solves the MLOps gap. The Gemini API is the natural next step for their existing team — "you already have the data. Now add language understanding."

**Competitive situation:** Often competing with SageMaker or Azure ML. Emphasise Vertex's unified UX (not 30+ services), the Gemini advantage (1M context, Google-owned model), and data privacy (your VPC, not OpenAI's servers).

**Typical next step:** Vertex AI Jumpstart (Google-facilitated 2-week sprint to deploy their first model on Vertex). Or Gemini API POC (2-week RAG prototype on their knowledge base).

---

### Level 3: AI-Embedded Workflows (Automated Decisions)

**Profile:** AI is part of the operational workflow. Models run automatically and trigger actions without human approval for standard cases. Has dedicated ML engineering team. Spends $500K+ on ML infrastructure annually.

**Indicators in discovery:**
- "Our fraud detection model auto-declines transactions in real time"
- "We have 15+ models in production"
- "We want to move from predicting to acting — autonomous agents"
- "We're exploring generative AI for customer-facing products"
- "We want to reduce LLM costs without sacrificing quality"

**Google products to recommend:**
- **Vertex AI Agent Builder** (multi-agent orchestration with Gemini) for autonomous workflows
- **Gemini API fine-tuning** (supervised fine-tuning on proprietary data) for cost and quality
- **Vertex AI Model Monitoring** (continuous drift detection, retraining triggers)
- **CCAI** if contact centre automation is a target workflow
- **Recommendations AI** for personalisation at scale
- **BigQuery ML** for in-database scoring at very high throughput (no API call cost)
- **Analytics Hub** for data monetisation (if they have data assets to share)

**Pitch focus:** Scale, cost efficiency, and agents. Level 3 customers know what they're doing — pitch them on Google's infrastructure advantages (cost per token, latency, scale), fine-tuning to reduce costs, and agents/multi-agent systems as the next frontier. They'll ask technical questions — bring a Solutions Architect.

**Typical next step:** Architecture review and cost optimisation workshop. Vertex AI fine-tuning POC.

---

### Level 4: AI-Native Operations

**Profile:** AI is the product. The business model depends on AI. May be a tech company, a digital-native enterprise, or an established company that has fully transformed. Competitive differentiation is AI quality, speed, and cost. Likely spending $2M+ on AI infrastructure.

**Indicators in discovery:**
- "AI is our core product"
- "We're building foundation model capabilities internally"
- "Our customer experience IS the AI"
- "We need Google-scale infrastructure, not just their APIs"
- "We're evaluating whether to train our own model vs. fine-tune Gemini"

**Google products to recommend:**
- **TPU v5e/v5p** (Google's Tensor Processing Units) for training at scale — 3–5x cost advantage vs. GPU clusters for transformer training
- **Vertex AI Model Garden** for model selection and evaluation at scale
- **Gemini API + fine-tuning** for production-grade LLM serving
- **AlloyDB** with pgvector for custom vector storage in RAG architectures
- **Vertex AI Vector Search** (Matching Engine) for billion-scale semantic search
- **Spanner** for globally consistent operational data stores
- **GKE Autopilot** with GPU nodes for custom model serving
- **Cloud TPU Pods** for very large training runs

**Pitch focus:** Infrastructure partnership and ecosystem. Level 4 customers don't need to be sold on AI — they need a cloud partner that can match their ambition. Pitch Google's TPU advantage, the Google DeepMind research pipeline (they'll benefit from model improvements), and the enterprise support model (Premier Support, TAM, professional services).

**Typical next step:** Executive briefing with Google's AI leadership. Technical deep-dive with Google's AI/ML specialist team. TPU POC for training cost comparison.

---

## 3. Industry AI Use Cases by Vertical

---

### Government / Postal

| # | Use Case | Products | Business Value |
|---|----------|----------|---------------|
| 1 | **Document processing for citizen services** — Automate processing of applications, permits, ID documents | Document AI, Gemini API, Workflows | Reduce processing time from weeks to hours; reduce manual data entry staff by 60–80% |
| 2 | **Citizen services chatbot / virtual agent** — 24/7 self-service for common queries (benefits status, appointment scheduling) | Dialogflow CX, CCAI, Vertex AI Search | 30–50% call deflection; citizen satisfaction improvement; reduced call centre costs |
| 3 | **Fraud detection in benefits and procurement** — Detect anomalous payment patterns, duplicate claims, identity fraud | Vertex AI (custom fraud model), BigQuery ML, CCAI Insights | Government benefits fraud costs €50–200B annually in EU; 20–40% fraud reduction typical |
| 4 | **Logistics optimisation for postal networks** — Predict delivery volumes, optimise sorting routes, predict sorting machine failures | Vertex AI (demand forecasting), BigQuery ML, IoT + Pub/Sub + BigQuery | 5–15% reduction in delivery cost; 20–30% reduction in sort machine downtime |
| 5 | **Predictive maintenance for infrastructure** — Predict failures in vehicles, sorting equipment, IT infrastructure before they occur | Vertex AI (predictive maintenance model), IoT telemetry via Pub/Sub, BigQuery | 25–40% reduction in unplanned downtime; 15–30% maintenance cost reduction |

**Government-specific framing:** State-owned enterprises and government agencies are under political pressure to demonstrate efficiency and modernisation. Frame AI investments in terms of cost-per-citizen-interaction reduction, processing time SLAs met, and fraud losses prevented — these are metrics that can be cited in parliamentary/ministerial reports.

---

### Financial Services

| # | Use Case | Products | Business Value |
|---|----------|----------|---------------|
| 1 | **Real-time fraud detection** — Score transactions in <100ms, apply ML-based anomaly detection across card, ACH, wire | Vertex AI (real-time serving), Spanner (transaction store), Pub/Sub + Dataflow (event stream), BigQuery (analytics) | 30–50% reduction in false positives vs. rules-based systems; detect novel fraud patterns within hours |
| 2 | **Credit scoring and underwriting automation** — Augment or replace traditional scorecards with ML models trained on alternative data | Vertex AI, BQML, AlloyDB, BigQuery | 15–25% reduction in credit losses; 60–80% faster underwriting decision; expand addressable market with thin-file applicants |
| 3 | **Anti-Money Laundering (AML) AI** — Google's purpose-built AML AI product: risk scores entity networks, not just transactions | AML AI (Google's commercial product), BigQuery, Vertex AI | Google AML AI has been validated at tier-1 banks: 2–4x more SAR-filed alerts per analyst hour; 60% reduction in false positives vs. traditional transaction monitoring |
| 4 | **Customer analytics and CLV modelling** — Segment customers, predict lifetime value, identify at-risk relationships | BigQuery, BQML, Vertex AI, Looker | 10–20% improvement in retention through targeted interventions; higher marketing ROI |
| 5 | **Risk modelling and regulatory reporting** — Automate VaR calculation, stress testing, regulatory report generation (COREP, FINREP) | BigQuery (compute), Vertex AI (model hosting), Looker (regulatory dashboards), Cloud Spanner (positions store) | Reduce regulatory reporting from days to hours; reduce model risk from manual errors; enable real-time risk dashboards for treasury |

**FSI-specific framing:** In Financial Services, the conversation starts with risk reduction, not innovation. Lead with fraud loss prevention (tangible € amount) and regulatory compliance (mandatory, budget-protected). Innovation use cases (LLM for research, personalisation) follow once trust is established.

---

### Healthcare

| # | Use Case | Products | Business Value |
|---|----------|----------|---------------|
| 1 | **AI-assisted diagnostics** — Analyse medical images (X-ray, CT, pathology slides) to flag abnormalities for radiologist review | Vertex AI (custom imaging models), Vision AI, Cloud Healthcare API (DICOM/FHIR), Medical Imaging Suite | 30–50% reduction in radiologist reading time for routine screens; reduce false negative rate by 15–25%; enable screening at scale in under-resourced settings |
| 2 | **Drug discovery acceleration** — Use AlphaFold (protein structure prediction) and ML models for target identification and compound screening | Vertex AI, BigQuery (genomics), AlphaFold via Vertex Model Garden, Cloud Life Sciences | Reduce time-to-candidate from 3–4 years to 18–24 months; reduce wet lab experimental cost by 30–40% |
| 3 | **Patient flow and capacity optimisation** — Predict ED admissions, ICU demand, and surgery scheduling to optimise staffing and beds | Vertex AI (demand forecasting), BigQuery, Cloud Healthcare API (FHIR EHR integration), Looker | 15–25% reduction in ED boarding time; 10–20% improvement in OR utilisation; reduce agency nurse spend |
| 4 | **Clinical NLP and documentation** — Extract structured data from clinical notes, automate prior authorisation, generate discharge summaries | Document AI (medical), Gemini API (clinical summarisation), Healthcare NLP API, Medical Speech-to-Text | Reduce documentation time per physician by 1–2 hours/day; accelerate prior auth from 3 days to 2 hours; improve coding accuracy by 20% |
| 5 | **Medical imaging AI** — Detect and triage findings in radiology (chest X-ray, mammography, retinal imaging) at population scale | Medical Imaging Suite (Vertex AI), DICOM SOP-compliant pipeline, Cloud Healthcare API | Enable national screening programmes that would be impossible with current radiologist capacity; WHO estimates 50% shortage of radiologists in LMICs by 2030 |

**Healthcare-specific framing:** Healthcare AI decisions involve clinical, IT, legal, and C-suite stakeholders. Frame benefits in clinical outcome terms (reduced missed diagnoses, faster treatment) alongside operational efficiency. Always lead with HIPAA compliance and data residency — this is table stakes.

---

### Retail

| # | Use Case | Products | Business Value |
|---|----------|----------|---------------|
| 1 | **Personalised product recommendations** — Real-time, individual-level recommendations across web, app, email, and in-store | Recommendations AI, BigQuery (event data), Pub/Sub (real-time events), Vertex AI Feature Store | 15–35% increase in conversion rate; 10–25% increase in average order value; Forrester: median 25% revenue uplift |
| 2 | **Demand forecasting and inventory optimisation** — Predict SKU-level demand by store/channel 4–12 weeks ahead, accounting for events, weather, promotions | Vertex AI (ARIMA+/custom forecasting), BigQuery, Cloud Composer (pipeline), Looker (planner UI) | 15–30% reduction in out-of-stock events; 10–20% reduction in overstock/markdown losses; working capital improvement |
| 3 | **Supply chain resilience and optimisation** — Predict supplier disruptions, optimise routing, automate procurement | Vertex AI, BigQuery, Dataflow (real-time supply signals), Document AI (supplier invoices/POs) | 5–15% reduction in supply chain cost; 20–40% reduction in disruption response time |
| 4 | **Visual search and product discovery** — Let shoppers search by image (upload a photo, find the product) | Vision AI / Vision Product Search, Recommendations AI, Retail Search (Vertex AI Search for retail) | 2–5x higher conversion on visual discovery vs. text search; reduces "zero results" searches; differentiating mobile experience |
| 5 | **Dynamic pricing optimisation** — Adjust prices in real time based on demand signals, competitor pricing, inventory levels | Vertex AI (pricing model), BigQuery ML, Dataflow (real-time signals), Looker (pricing dashboard) | 2–8% margin improvement; reduce clearance markdown volume by 15–25%; improve promotional effectiveness |

**Retail-specific framing:** Retail CFOs respond to inventory metrics and margin improvement. Lead with demand forecasting ROI (overstock and out-of-stock costs are easily quantifiable). Recommendations AI is the fastest path to revenue impact — show the conversion uplift data.

---

### Manufacturing

| # | Use Case | Products | Business Value |
|---|----------|----------|---------------|
| 1 | **Predictive maintenance** — Analyse sensor data from machines to predict failures 24–72 hours before they occur | Vertex AI (anomaly detection/time series), Pub/Sub + Dataflow (IoT stream), BigQuery (historian), Looker (maintenance dashboard) | 25–40% reduction in unplanned downtime (downtime costs €10K–€500K/hour depending on line); 15–30% maintenance cost reduction |
| 2 | **Visual quality inspection** — Replace manual visual QA with cameras and ML defect detection on production lines | Visual Inspection AI (purpose-built Vertex AI product), Vision AI, Cloud IoT Edge | 60–90% reduction in defective products reaching customers; 30–50% reduction in QA labour; inspection speed 10–100x faster than human |
| 3 | **Supply chain optimisation and disruption prediction** — Predict component shortages, optimise supplier selection and inventory buffers | Vertex AI, BigQuery, Dataflow, Document AI (supplier documents) | 10–20% reduction in supply chain costs; 30–50% faster disruption response; improved supplier risk scoring |
| 4 | **Digital twin and process simulation** — Build a virtual model of a factory line to simulate changes before physical implementation | Vertex AI, BigQuery, Dataflow, GKE (simulation workloads), Cloud Storage (CAD/simulation data) | 20–30% reduction in new product introduction time; ability to simulate 1000 process variants virtually vs. 10 physically; energy optimisation before line changeover |
| 5 | **Energy optimisation** — Analyse energy consumption patterns by machine and shift; predict and reduce peak demand | Vertex AI (energy forecasting), BigQuery, Dataflow (meter data stream), Looker (energy dashboard) | 10–20% reduction in energy costs (energy is 5–15% of manufacturing cost); compliance with EU energy efficiency directives; ESG reporting improvement |

**Manufacturing-specific framing:** Manufacturing buyers respond to OEE (Overall Equipment Effectiveness) and per-unit cost metrics. Predictive maintenance and visual inspection have the highest ROI and fastest payback (often <12 months). Lead with a reference from the same sub-sector (automotive, food & beverage, chemicals).

---

## 4. RAG Architecture Patterns

> RAG (Retrieval-Augmented Generation) is the most common AI architecture pattern in enterprise deals today. Understanding these patterns is essential for selling Vertex AI and Gemini.

---

### What is RAG (for sellers)

RAG solves the #1 enterprise objection to LLMs: "The model doesn't know our data, and it makes things up." RAG works by: (1) indexing company documents into a vector database, (2) at query time, finding the most relevant documents for the user's question, (3) injecting those documents into the Gemini prompt, (4) Gemini generates an answer grounded in those documents with citations. The model doesn't "know" your data — it reads it in context, on demand. This means no model training is needed and data stays current.

---

### Pattern A: Vertex AI Search (Managed RAG)

**What it is:** A fully managed, no-code RAG service. Connect document sources (Cloud Storage, Drive, websites, BigQuery, third-party connectors), and Vertex AI Search handles indexing, retrieval, and Gemini-powered generation automatically.

**Architecture:**
```
[Documents: GCS / Drive / Confluence / Jira / Salesforce]
         ↓ (connector sync, no pipeline coding)
[Vertex AI Search — managed index + retrieval]
         ↓ (Gemini generation + citation)
[Answer API] → [Web app / Chat widget / CCAI / your product]
```

**When to recommend:**
- Customer wants AI search in weeks, not months
- No ML engineering team available
- Standard document types (PDFs, HTML, Drive, SharePoint)
- Use cases: employee knowledge base, customer self-service, product documentation search
- Budget: $50K–$500K; priced per query

**How to sell it:** "You do not need to write a single line of code to have a production-grade AI search engine over all your internal documents. We handle the indexing, the embeddings, the retrieval, the generation, and the citations. You connect your data sources and embed the search widget."

**Limitations:** Less control over chunking strategy, retrieval ranking customisation, or multi-step reasoning. For highly customised pipelines, use Pattern B.

---

### Pattern B: Custom RAG with AlloyDB pgvector + Gemini

**What it is:** A developer-built RAG pipeline using AlloyDB (PostgreSQL with built-in vector extension) as the vector store and Gemini API for generation. The customer's engineering team owns the pipeline.

**Architecture:**
```
[Documents: any source]
         ↓ (custom ingestion: Cloud Functions / Cloud Run)
[Embedding model: text-embedding-004 via Vertex AI]
         ↓
[AlloyDB with pgvector] ← vector store (also holds metadata, structured data)
         ↓ (cosine similarity search)
[Gemini API via Vertex AI] ← generation with retrieved chunks + system prompt
         ↓
[Application: Cloud Run / GKE]
```

**When to recommend:**
- Customer needs full control over the pipeline (custom chunking, re-ranking, hybrid search)
- They already use PostgreSQL / AlloyDB for operational data — combining vectors and structured data in one database is a significant simplification
- Complex retrieval: multi-hop reasoning, filtering by metadata, combining structured + unstructured queries
- Use cases: legal document analysis with case metadata, financial research with company data, healthcare records + clinical guidelines
- Budget: $200K–$2M (engineering time + AlloyDB + Gemini API)

**Key differentiator:** AlloyDB handles both the relational data and the vectors in one database — no separate Pinecone/Weaviate/Redis subscription. Eliminates the "two-database problem" (operational store + vector store). AlloyDB pgvector is also 10x faster than standard PostgreSQL pgvector for ANN (approximate nearest neighbour) queries.

**How to sell it:** "Your engineers write a standard PostgreSQL app. AlloyDB stores your customer records, contracts, and the vector embeddings together. One connection string. No extra infrastructure. Gemini retrieves and generates. You own and control every part of the pipeline."

---

### Pattern C: Grounding with Google Search

**What it is:** Vertex AI Gemini API can be configured to ground responses in real-time Google Search results — the model queries Google Search at response time and uses the retrieved web content as context.

**Architecture:**
```
[User query]
         ↓
[Gemini API with Search grounding enabled]
         ↓ (automatic: Google Search called, top results retrieved)
[Gemini generates answer grounded in current web results]
         ↓ (citations with URLs included in response)
[Application]
```

**When to recommend:**
- Customer needs real-time information (news, market data, competitor pricing, regulatory updates)
- The knowledge base is the public web, not internal documents
- Use cases: competitive intelligence assistant, regulatory change monitoring, market research assistant, news summarisation
- Can be combined with RAG: ground in both internal docs and the web

**Key differentiator:** No competitor offers this. AWS Bedrock cannot ground in Google Search. Azure OpenAI has Bing grounding, but Bing's search index is smaller. Google Search is the world's most comprehensive real-time web index.

**How to sell it:** "Your AI assistant knows what happened this morning. It reads the web in real time to answer questions about competitors, regulations, and markets. No stale data, no knowledge cutoff. And you get cited sources."

---

### Choosing the Right Pattern

| Scenario | Recommended pattern |
|----------|-------------------|
| Internal knowledge base, no engineering team, fast deployment | Pattern A: Vertex AI Search |
| Complex pipeline, operational data + documents, full control needed | Pattern B: AlloyDB pgvector + Gemini |
| Real-time web knowledge, competitive intelligence, news | Pattern C: Google Search Grounding |
| All three: internal docs + web + structured data | Combine A or B with C (multi-source RAG) |
| Very large scale (billions of documents, <10ms retrieval) | Vertex AI Vector Search (Matching Engine) as the vector store in a custom pipeline |

---

## 5. Gemini for Workspace Value Proposition

> The most common competitive situation: customer is on M365 and Microsoft is pitching Copilot. This section gives the seller everything needed to win — or at least to delay the M365 Copilot expansion.

---

### Product-by-Product Capabilities

**Gmail**
- Summarise long email threads with one click — critical for catching up after out-of-office
- "Help me write" / "Refine my draft" — Gemini reads the thread context and drafts a contextually relevant reply
- Smart Compose (next-word prediction, personalised to writing style)
- Smart Reply (short suggested responses, mobile-optimised)
- Email sentiment analysis and priority signals (in Enterprise tier)

**Google Docs**
- "Help me write" — generate a first draft from a prompt: "Write a proposal for a cloud migration programme for a 500-person company"
- Summarise long documents into executive briefs
- "Improve my writing," "Make it more formal," "Shorten this" — contextual refinement
- Proofread with explanation (shows why it's suggesting changes, not just autocorrect)
- Side panel chat: ask questions about the document content, get answers in context

**Google Sheets**
- "Help me analyse" — natural language data analysis: "Which product category had the highest growth in Q3?"
- Auto-generates charts, pivot tables, and FILTER/VLOOKUP formulas from natural language prompts
- "Create a formula that..." — explain what you want, get the formula with explanation
- Anomaly detection: highlight unusual data points
- Side panel: ask questions about the data ("What's the correlation between marketing spend and revenue?")

**Google Slides**
- "Create a presentation about..." — generates a full, multi-slide deck with layout, headings, and suggested image queries from a text prompt
- "Add a slide about..." — extend an existing deck contextually
- Auto-generate speaker notes for any slide
- Summarise a long deck into key messages
- Image generation: Imagen creates custom slide images from text prompts (no stock photos needed)

**Google Meet**
- Live captions in 18 languages (real-time, no post-processing delay)
- Live translation: display captions in a different language from the spoken language
- Gemini Notes: automatic meeting notes generated during the call, delivered to Calendar event after the meeting
- Meeting summary: "what was decided, what are the action items, who is responsible"
- Studio look (AI-enhanced video/audio quality in consumer-grade environments)
- Companion mode: join meeting from a second device for better hybrid collaboration

**Google Chat**
- Summarise a Chat Space conversation: "Catch me up on what happened in this channel while I was away"
- Smart Compose for Chat messages
- Gemini-powered app integrations: @Gemini in Chat can answer questions, summarise documents, or run tasks inline
- Translate messages in real time for multilingual teams

**NotebookLM (Enterprise)**
- Upload up to 50 source documents (PDFs, Docs, websites, YouTube transcripts)
- Ask questions across all sources — Gemini synthesises answers with citations
- Generate briefing documents, FAQs, timelines, and study guides from sources
- Audio Overview: generates a conversational podcast-style discussion of the source material (uniquely Google)
- Strictly grounded: all answers reference only the uploaded sources, no hallucination from training data
- Use case for sellers: upload RFP + customer annual report + competitor battle card → ask "What should I emphasise in this proposal?"

---

### Competitive Positioning: Gemini for Workspace vs. Microsoft 365 Copilot

| Dimension | Gemini for Workspace | Microsoft 365 Copilot |
|-----------|---------------------|----------------------|
| **Pricing** | Included in Workspace Enterprise Plus ($22/user/mo) OR as add-on ($24/user/mo on Business tier) | Add-on only: $30/user/month on top of M365 E3 ($36) or E5 ($57) |
| **Effective cost at scale** | Workspace Business Standard ($12) + Gemini add-on ($24) = $36 | M365 Business Premium ($22) + Copilot ($30) = $52 |
| **Model** | Gemini 1.5 Pro / Flash (Google's own, continuously updated) | GPT-4 Turbo / o1 (Microsoft-wrapped OpenAI, update cadence tied to OpenAI partnership) |
| **Context window** | 1M tokens (can process entire large documents in one call) | 128K tokens (GPT-4 Turbo limit) |
| **Grounding** | Google Search grounding available (real-time web knowledge) | Bing grounding (smaller index, no real-time Google news) |
| **Workspace integration** | Native: designed with Workspace from the start, same identity/security model | Retrofit: Copilot was added to M365 apps post-GPT-4 launch; integration depth varies by app |
| **Data residency** | Google Workspace data regions (EU, US, etc.) | M365 Copilot follows M365 data residency — check per-tenant and per-app |
| **Audio Overview (NotebookLM)** | Yes — unique to Google | Not available |
| **Image generation** | Imagen integration in Slides and Docs | Designer/DALL-E integration in some apps |
| **Code generation in Sheets** | App Script generation from natural language | VBA/Power Automate generation from natural language |
| **Meeting notes** | Gemini Notes — real-time, in-meeting | Copilot in Teams — post-meeting only (requires recording) |

**Key sales argument:** At enterprise scale, Workspace Enterprise Plus includes Gemini at $22/user/month total. Microsoft requires M365 E3 ($36) + Copilot ($30) = $66/user/month for comparable AI features. At 10,000 users, that's a $5.28M annual difference. Google wins on price at enterprise scale.

**When Microsoft wins:** Organisations deeply embedded in Office file format dependencies (Word macros, Excel VBA, Access databases), PowerPoint-heavy organisations, organisations using Dynamics 365 (tight Copilot integration), organisations where "we've always used Office" is a political barrier.

**How to create urgency:** M365 Copilot is often sold as a pilot that customers pay for before they've proven ROI. "Before you commit to $30/user/month for Copilot across your organisation, run a Gemini pilot at zero incremental cost — you're already paying for Workspace."

---

## 6. Customer Pitch Example: Poczta Polska

> Poczta Polska is Poland's state-owned postal operator: ~27,000 employees, 7,500 postal outlets, 300M+ packages/year, significant legacy IT infrastructure, and a mandate to modernise under Poland's digital transformation agenda.

---

### AI Opportunities for a Postal/Logistics Organisation

Postal and logistics companies have four core cost drivers that AI directly addresses: (1) labour cost (sorting, delivery, customer service), (2) vehicle fleet and fuel, (3) facility operations (sorting centres), and (4) customer service cost. Every major cost driver has a Google AI solution.

---

### Opportunity-to-Product Mapping

| Business Opportunity | Scale of Impact | Primary Google Products | Secondary Products |
|---------------------|----------------|------------------------|-------------------|
| **Automated document processing** (customs declarations, manifests, KYC for business customers, address correction) | Processing 300M+ packages requires millions of document reads/year — currently manual or semi-automated | Document AI (invoice processor, custom address parser), Gemini API (for complex document understanding) | Cloud Storage, Workflows, BigQuery |
| **Parcel sorting optimisation** (predict volume by sorting centre, optimise machine throughput scheduling) | Each % improvement in sorting centre utilisation = millions of PLN in energy and labour savings | Vertex AI (demand forecasting), BigQuery (historical volume data), Pub/Sub + Dataflow (real-time scanner feeds) | Looker (operations dashboard), Cloud Composer |
| **Delivery route optimisation** (dynamic routing based on parcel volume, traffic, delivery time windows) | 5% route efficiency improvement across 10,000+ postal workers = €10M+ annual savings | Vertex AI (custom routing model), Google Maps Platform (routing APIs), Pub/Sub (real-time parcel scan events) | BigQuery, Cloud Run (routing API serving) |
| **Predictive maintenance for sorting machines** (predict bearing failures, belt wear, motor anomalies) | Unplanned downtime in a sorting centre costs PLN 100K–1M per hour during peak season | Vertex AI (anomaly detection), Pub/Sub (IoT sensor streams), BigQuery (sensor historian), Looker (maintenance dashboard) | Pub/Sub + GDC Edge, Dataflow |
| **Customer service virtual agent** (track my parcel, schedule redelivery, file a complaint — in Polish) | Poczta Polska's contact centre handles millions of calls/year; 60% are routine status queries | CCAI Dialogflow CX (Polish language, with Chirp speech recognition), Agent Assist, CCAI Insights | Speech-to-Text (Polish), Text-to-Speech (Polish), BigQuery |
| **Fraud detection** (fraudulent parcel claims, identity fraud in financial services arm PKO/Pocztex) | Claims fraud costs postal operators 1–3% of revenue; financial services fraud is separately regulated | Vertex AI (fraud model), BigQuery (transaction data), BQML (in-database scoring for high throughput) | Pub/Sub + Dataflow (real-time transaction stream) |
| **Workspace + Gemini modernisation** (replace legacy email, enable AI-assisted document drafting for HQ staff) | 27,000 employees, predominantly on legacy Microsoft or on-premises — collaboration modernisation | Google Workspace Business/Enterprise, Gemini for Workspace, NotebookLM | AppSheet (no-code apps for field workers) |
| **Analytics and executive reporting** (single source of truth for operational KPIs across 7,500 outlets) | Currently fragmented reporting across business units with manual consolidation | BigQuery, Looker (governed metrics), Dataform (SQL transformations), Looker Studio (outlet-level dashboards) | Pub/Sub, Dataflow |

---

### What a Vertex AI Demo Would Look Like for Poczta Polska

**Demo title:** "Intelligent Parcel Operations — From Data to Decision in Real Time"

**Audience:** CTO, CDO, Head of Operations (15–30 minutes)

**Demo flow:**

1. **Opening (2 min):** Show a live BigQuery dashboard (Looker Studio) with today's parcel volumes by sorting centre. "This is your operations data, in real time, without any DBA or data team maintaining a warehouse."

2. **Predictive sorting volume (5 min):** Open Vertex AI. Show a demand forecasting model trained on historical sorting volume data. Show the forecast for the next 7 days by sorting centre. "This tells your Operations team on Wednesday how many sorters to schedule for Saturday — before the parcels are even booked."

3. **Document AI for customs (5 min):** Upload a stack of sample customs declaration PDFs (or manifests). Run Document AI — show structured JSON output extracted in seconds: sender, recipient, HS codes, declared value. "Your customs team currently takes 15 minutes per document. This takes 0.3 seconds."

4. **Predictive maintenance (5 min):** Show a Vertex AI anomaly detection model running against simulated vibration sensor data from a sorting machine. Show an alert: "Machine B3 bearing is showing early fatigue pattern — predicted failure in 48–72 hours." "You schedule planned maintenance. The machine doesn't fail during peak season."

5. **CCAI virtual agent (3 min, recorded demo):** Show a Polish-language "Where is my parcel?" Dialogflow CX interaction. Customer asks in Polish, the virtual agent retrieves tracking status from BigQuery, responds in Polish. "This handles 500,000 calls per year. Your agents handle the other 200,000 that actually need a human."

**Close:** "We've shown you five AI capabilities in 15 minutes. Each one independently has a payback of less than 12 months. Together, they represent a multi-year operational transformation programme. Google can start with a 4-week proof of concept on whichever of these has the highest priority for your leadership team."

---

### How to Frame ROI for a State-Owned Enterprise

State-owned enterprises (SOEs) like Poczta Polska face a different ROI conversation than private companies. Key considerations:

**Political and regulatory context:**
- SOEs in Poland are accountable to the Ministry of State Assets — investment proposals need to show public benefit, not just financial return.
- EU recovery funds (KPO — Krajowy Plan Odbudowy) fund digital transformation — frame AI investment as EU-co-funded modernisation, not a discretionary IT spend.
- Polish government has mandated digital transformation of public services — Poczta Polska's citizen-facing services (Envelo, Poczta Polska mobile) fit this narrative.

**ROI framing that works for SOE boards:**

| Frame | What to quantify | Example |
|-------|-----------------|---------|
| **Labour cost reduction** | Not headcount reduction (politically sensitive) but redeployment — "free 200 employees from data entry to customer-facing roles" | Document AI processing 2M customs forms/year at €15 labour cost each = €30M saved or redeployed |
| **Operational efficiency** | Cost per parcel delivered, cost per sorting centre operational hour | 5% efficiency improvement on PLN 2B operational cost = PLN 100M annually |
| **Incident prevention** | Cost of avoided downtime during peak season (Christmas, Black Friday) | One avoided sorting centre outage during December = PLN 10–50M |
| **Revenue protection via fraud reduction** | Claims fraud and financial services fraud (Pocztex, insurance) | 1% fraud reduction on PLN 500M financial services revenue = PLN 5M |
| **Strategic positioning** | Compete with DHL, DPD, InPost on technology — "InPost's locker network is AI-optimised; Poczta Polska can match this" | Customer satisfaction, NPS improvement, market share defence |

**What NOT to say:**
- "This will reduce headcount by X" — politically toxic for a unionised SOE.
- "ROI in year 1" — SOE procurement cycles are 18–36 months; focus on 3-year programme value.
- "Other companies are doing this" — government buyers want to know what other postal operators (Deutsche Post DHL, La Poste, An Post) are doing, not private companies.

**The narrative that lands:** "Poczta Polska is a national infrastructure asset. AI modernisation is how it remains competitive, financially self-sustaining, and able to serve Polish citizens better — funded in part by EU digital transition funds that exist precisely for this purpose."

**Reference:** Deutsche Post DHL is Google Cloud's largest logistics customer — they have deployed Vertex AI for route optimisation and predictive maintenance at scale. Use this as the reference if asked for a postal industry precedent.

---

*Last updated: 2026-03-17*
*Source: GCP Sales Enablement Skill — Data & AI Module*
