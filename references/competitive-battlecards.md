# Competitive Battlecards

last_verified: 2026-03-17

---

## Google Workspace vs Microsoft 365

### Feature Comparison Table

| Capability | Google Workspace | Microsoft 365 |
|---|---|---|
| Email | Gmail (web-first, 15–5TB storage per user) | Outlook (desktop + web, 50GB–unlimited) |
| Documents | Google Docs/Sheets/Slides (real-time, browser-native) | Word/Excel/PowerPoint (desktop-primary, web improving) |
| Meetings | Google Meet (built-in recording, transcription, noise cancellation) | Microsoft Teams (heavier client, more telephony features) |
| Chat | Google Chat (Spaces, threaded) | Teams chat (unified with meetings) |
| Storage | Google Drive (pooled org storage) | OneDrive + SharePoint (per-user + site collections) |
| Admin | Single Admin Console (one pane for all products) | Multiple admin centers (M365, Azure AD, Intune, Security, Compliance, Exchange, Teams...) |
| AI | Gemini included in Business Standard+ and Enterprise tiers | Microsoft 365 Copilot: $30/user/month add-on (requires E3 or E5 base) |
| Security | Built-in Vault, DLP, Context-Aware Access, BeyondCorp — all tiers | Tiered: basic in Business, advanced Defender + Purview require E3/E5 |
| Endpoint mgmt | Google Endpoint Management (agentless for mobile/ChromeOS) | Intune (requires licensing add-on for lower tiers) |
| Search | Cloud Search / Gemini across all content | Microsoft Search (improving but inconsistent cross-app) |
| Forms / surveys | Google Forms (free, included) | Microsoft Forms (included but feature-limited) |
| Video recording | Meet recordings to Drive (Business Standard+) | Teams recording to OneDrive/Stream |
| Offline access | Drive offline mode (Chrome extension) | Office desktop apps (full offline) |

### Pricing Comparison (per user per month, annual commitment, public list prices)

| Tier | Google Workspace | Microsoft 365 |
|---|---|---|
| Entry business | Business Starter: $7 (30GB pooled) | M365 Business Basic: $6 (1TB OneDrive) |
| Mid-tier | Business Standard: $14 (2TB pooled, Meet recording, Gemini) | M365 Business Standard: $12.50 |
| Upper business | Business Plus: $22 (5TB, Vault, advanced audit) | M365 Business Premium: $22 |
| Enterprise base | Enterprise Standard: $23 (unlimited storage, enhanced security) | M365 E3: $36 |
| Enterprise top | Enterprise Plus: $28 (Enterprise Standard + advanced security) | M365 E5: $57 |
| Frontline workers | Frontline Starter: $2 / Frontline Standard: $5 | M365 F1: $2.25 / M365 F3: $8 |
| Essentials (no Gmail) | Workspace Essentials Starter: $0 (just Meet/Chat/Drive) | Teams Essentials: $4 |

Notes:
- Google AI (Gemini) is included in Business Standard ($14) and above. No extra line item.
- Microsoft 365 Copilot costs $30/user/month on top of any M365 plan. Requires E3 ($36) minimum for most features, making the effective all-in cost $66/user for E3+Copilot vs $23/user for Google Workspace Enterprise Standard with Gemini included.

### AI Comparison

| Dimension | Google Gemini (Workspace) | Microsoft 365 Copilot |
|---|---|---|
| Cost | Included in Business Standard ($14+) | $30/user/month add-on |
| Prerequisite | None beyond Business Standard | Requires M365 E3 ($36) or E5 ($57) |
| Total cost example (enterprise AI) | Workspace Enterprise Standard: $23/user | M365 E3 + Copilot: $66/user |
| Integration depth | Gemini in Gmail, Docs, Sheets, Slides, Meet, Drive, Admin | Copilot in Word, Excel, Teams, Outlook, PowerPoint |
| Grounding | Google Search + internal Drive content | Microsoft Graph (internal content only, no live web in most contexts) |
| Model | Gemini 1.5 Pro / Ultra depending on tier | GPT-4o (Azure OpenAI dependency) |
| Agent capabilities | Gemini gems, NotebookLM integration | Copilot Studio (extra licensing) |
| Mobile | Full Gemini on Android and iOS | Copilot mobile (improving) |

Key message: Google includes AI at no extra cost. A 1,000-user enterprise switching from M365 E3+Copilot to Google Workspace Enterprise Standard saves approximately $43/user/month = $516,000/year while getting equivalent or superior AI functionality.

### Security Comparison

| Feature | Google Workspace | Microsoft 365 |
|---|---|---|
| Zero Trust architecture | BeyondCorp built-in (context-aware access on all tiers) | Conditional Access (requires Azure AD P1 = E3 minimum) |
| DLP | Included in Business Standard+ | Requires M365 E3 Compliance add-on or E5 |
| eDiscovery / Vault | Vault included in Business Plus+ | Microsoft Purview (requires E3 or compliance add-on) |
| Threat protection | Gmail Advanced Phishing, anti-malware, sandbox scanning | Defender for Office 365 Plan 1 in E3, Plan 2 in E5 |
| SIEM integration | Chronicle SIEM (separate product, deeply integrated) | Microsoft Sentinel (separate product) |
| Endpoint management | Agentless for ChromeOS; policy-based for Android/iOS | Intune (separate licensing below E3) |
| Data residency | Data Regions add-on (EU, US selectable) | Advanced Data Residency requires E3 minimum |
| Audit logs | 6-month standard; 1-year with Vault | 90-day default; 1-year requires E3 |

Key message: Google's security model is architecturally zero-trust from the ground up (BeyondCorp is Google's internal system, productised for customers). Microsoft's security is comprehensive but requires multiple separate admin consoles and higher-tier licenses to match Google's baseline.

### Admin Experience

| Dimension | Google Workspace | Microsoft 365 |
|---|---|---|
| Primary console | admin.google.com — single URL | M365 Admin Center |
| User lifecycle | One console (create, license, suspend, wipe) | Azure AD + M365 Admin Center |
| Mobile policy | Endpoint Management within Admin Console | Intune (separate portal) |
| Email config | Gmail settings within Admin Console | Exchange Admin Center (separate) |
| Security policy | Security section of Admin Console | Microsoft Defender portal + Purview + Azure AD |
| Compliance | Within Admin Console + Vault | Microsoft Purview Compliance portal |
| IT admin learning curve | One product to master | 6–8 separate admin surfaces with overlapping responsibilities |
| Group management | Google Groups (Admin Console) | Azure AD Groups + Distribution Lists + M365 Groups + Teams |

Key message: Google has one admin console. Microsoft has eight. This is not a minor UX difference — it directly drives IT headcount requirements and mean-time-to-resolve for incidents.

### Key Win Arguments

1. AI is included. No $30/user Copilot add-on. Every user gets Gemini at no extra cost from Business Standard upward.
2. One admin console. Reduce IT operational overhead. Single source of truth for users, devices, security, compliance.
3. Real-time collaboration without conflicts. Google Docs has no "someone else is editing" lock-outs — multiple cursors, simultaneous edits, always in sync.
4. Security-by-default. BeyondCorp zero trust is not an upsell. DLP, Vault, context-aware access are included at lower price points than Microsoft equivalents.
5. TCO advantage. At enterprise scale with AI, Google is typically 40–60% less expensive than M365 E3/E5 + Copilot when all licenses are counted.
6. No client maintenance. Gmail and Google Docs run in the browser. No desktop app deployment, patching, or compatibility issues.
7. Storage is pooled. Organisation shares a storage pool — no user hitting quota while others have empty OneDrive. Eliminates helpdesk calls about storage.

---

## GCP vs AWS

### Core Capability Comparison

| Domain | GCP | AWS |
|---|---|---|
| Compute (VMs) | Compute Engine (E2, N2, C2, T2A Arm) | EC2 (200+ instance types) |
| Serverless compute | Cloud Run (container-native, generous free tier), Cloud Functions | Lambda, App Runner, Fargate |
| Kubernetes | GKE (Autopilot mode, originated Kubernetes) | EKS (managed Kubernetes) |
| Managed containers | Cloud Run (fully managed) | ECS + Fargate |
| Object storage | Cloud Storage (single global namespace) | S3 |
| Block storage | Persistent Disk, Hyperdisk | EBS |
| File storage | Filestore | EFS |
| Relational DB | Cloud SQL, AlloyDB (Postgres-compatible, 4× faster) | RDS, Aurora |
| NoSQL | Firestore, Bigtable | DynamoDB, DocumentDB |
| Data warehouse | BigQuery (serverless, columnar, built-in ML) | Redshift |
| Streaming | Pub/Sub | Kinesis, MSK |
| ETL / pipelines | Dataflow (Apache Beam managed) | Glue |
| AI/ML platform | Vertex AI (unified: training, deploy, MLOps) | SageMaker + Bedrock (separate products) |
| Foundation models | Gemini 1.5 Pro/Ultra, Imagen, Chirp | Bedrock (Claude, Llama, Titan — via third parties) |
| Networking | Andromeda SDN, Premium Tier (Google's backbone) | VPC, CloudFront, Direct Connect |
| CDN | Cloud CDN | CloudFront |
| Global load balancing | Single global Anycast IP, true global LB | ALB/NLB (regional) |
| Security | Cloud Armor, Chronicle SIEM, Mandiant | AWS Shield, GuardDuty, Security Hub |
| Developer tools | Cloud Code, Cloud Build, Artifact Registry | CodeBuild, CodePipeline, ECR |
| Market share (2025 est.) | ~12% | ~32% |

### BigQuery vs Redshift — The #1 GCP Differentiator

This is the clearest head-to-head win for GCP. Lead with this against data-heavy prospects.

| Dimension | BigQuery | Redshift |
|---|---|---|
| Architecture | Serverless — no clusters to manage | Cluster-based (RA3 is semi-managed, still requires node sizing) |
| Provisioning | Zero — query immediately | Provision nodes, choose instance types, manage clusters |
| Scaling | Automatic, instant, limitless | Manual scaling (resize clusters, takes time) |
| Pricing model | On-demand ($6.25/TB scanned) or editions (slots) | Compute + storage (pay even when idle) |
| Idle cost | $0 on-demand when not querying | Pay for cluster 24/7 regardless of usage |
| ML integration | BigQuery ML (train models in SQL, no data movement) | Redshift ML (SageMaker-backed, data movement required) |
| Geospatial | BigQuery GIS (native) | Limited, via ST_ functions |
| Real-time streaming | BigQuery Streaming / Bigtable integration | Kinesis integration (separate service) |
| Federated queries | Cloud Storage, Bigtable, Drive, AlloyDB | S3, RDS via Spectrum (extra cost) |
| Omni (multi-cloud) | BigQuery Omni (query AWS S3 / Azure ADLS without moving data) | No equivalent |
| Row-level security | Native (row access policies) | Native |
| Column-level security | Native (column policies) | Limited |
| Admin overhead | Minimal — Google manages everything | Significant — patching, vacuuming, WLM tuning |
| Concurrency | Near-unlimited (serverless scales per query) | Limited by cluster size, WLM queue |
| Time travel | 7-day default, configurable | None built-in |

Pitch line: "BigQuery has no cluster. You don't pay when you're not querying. You don't spend two weeks on capacity planning. Your data engineers focus on analysis, not database administration."

Quantified example: A team running a 4-node ra3.4xlarge Redshift cluster 24/7 pays roughly $5,800/month regardless of usage. The same analytical workload in BigQuery typically costs $800–2,000/month depending on query volume. That's a $4,000–5,000/month savings per cluster.

### Vertex AI vs SageMaker/Bedrock

| Dimension | Vertex AI | SageMaker | AWS Bedrock |
|---|---|---|---|
| Purpose | Unified MLOps + model serving + Gemini access | Build/train/deploy custom ML | Access third-party foundation models |
| Foundation models | Gemini (Google's own), Llama, third-party on Model Garden | No first-party models; SageMaker JumpStart has some | Claude (Anthropic), Llama, Titan, Mistral — no AWS-first model |
| Gemini access | Native, fully integrated | Not available | Not available |
| AutoML | Vertex AutoML (tables, vision, text, video) | Autopilot | None |
| MLOps pipelines | Vertex Pipelines (Kubeflow-based) | SageMaker Pipelines | None |
| Feature Store | Vertex Feature Store | SageMaker Feature Store | None |
| Model monitoring | Vertex Model Monitoring | Model Monitor | None |
| Agent framework | Vertex AI Agent Builder | Bedrock Agents | Bedrock Agents |
| Pricing simplicity | Per-compute-hour + serving; clear cost drivers | Complex (>40 pricing dimensions in SageMaker) | Per-token (varies by model) |
| Lock-in risk | Gemini is Google-only | AWS models on JumpStart | Claude requires Anthropic deal; if Anthropic changes terms, AWS Bedrock customers are exposed |

Key message on Bedrock: AWS does not own the models on Bedrock. Their most popular model (Claude) is from Anthropic, a Google/Amazon co-invested company. If Anthropic's commercial terms change, AWS Bedrock customers have no recourse. Google owns Gemini.

### GKE vs EKS

| Dimension | GKE | EKS |
|---|---|---|
| Origin | Google invented Kubernetes and open-sourced it | AWS-built managed offering |
| Autopilot mode | GKE Autopilot — fully managed node pools, no node management | Not available |
| Upgrade experience | Auto-upgrades, surge upgrades, minimal disruption | Manual node group upgrades, more coordination required |
| Cost | No cluster management fee for Standard; $0.10/hr for Autopilot | $0.10/hr per cluster |
| Multi-cluster | Fleet management (GKE Enterprise) | EKS Anywhere + local zones |
| Service mesh | Cloud Service Mesh (managed Istio) | App Mesh (requires manual setup) |
| Default CNI | GKE dataplane v2 (eBPF-based, Google-built) | VPC CNI |
| Security posture | Workload Identity (no service account keys) | IAM roles for service accounts |
| Developer experience | Cloud Code IDE integration, one-click deploy | Requires more configuration |

### Pricing Philosophy: SUDs vs Reserved Instances

| Dimension | GCP (Sustained Use Discounts) | AWS (Reserved Instances) |
|---|---|---|
| How it works | Automatic discount based on monthly usage — no commitment required | Upfront commitment (1-year or 3-year), purchased manually per instance type and region |
| Commitment required | None | Yes — 1-year or 3-year, per instance type |
| Upfront payment | $0 | Partial or full upfront to maximise savings |
| Discount level | Up to 30% for N1/N2 (20–30% range based on usage fraction) | Up to 72% for 3-year all-upfront |
| Flexibility | Automatic, applies to any usage mix | Locked to instance type, region, OS |
| Risk of over-commitment | None | Stranded capacity if workload changes |
| Predictable workloads | CUDs (Committed Use Discounts): 1-yr 37% / 3-yr 55% | Reserved Instances: up to 72% for all-upfront 3-yr |
| Admin overhead | Zero — happens automatically | Significant: RI marketplace, Savings Plans, convertible RIs to manage |

Pitch line: "On GCP you start saving automatically from day one. On AWS you have to buy Reserved Instances upfront and pray your architecture doesn't change in the next 3 years."

### Global Infrastructure Comparison

| Dimension | GCP | AWS |
|---|---|---|
| Regions (approx 2025) | 40+ | 34+ |
| Network | Google's private global fibre backbone (same network serving Search/YouTube) | AWS global backbone |
| Premium Tier networking | Traffic stays on Google backbone end-to-end (lower latency, more predictable) | Best-effort internet routing by default |
| Standard Tier | Cheaper, uses public internet for egress | Default behavior |
| Submarine cables | Google owns/co-owns multiple (Dunant, Equiano, Firmina, Grace Hopper) | AWS leases capacity |
| CDN integration | Cloud CDN uses Google's edge POPs (200+) | CloudFront (edge locations 400+) |
| Latency advantage | Measurably lower p99 latency for global applications due to private backbone | Varies by route |

---

## GCP vs Azure

### Enterprise Integration

| Dimension | GCP | Azure |
|---|---|---|
| Active Directory | Cloud Identity (OIDC/SAML federation to any IdP) | Azure AD (native, market leader) |
| Windows workloads | Compute Engine supports Windows Server | Azure is optimised for Windows — first-class support |
| .NET / Visual Studio | Cloud Code supports VS Code; .NET on GCE/GKE | Azure DevOps, Visual Studio first-class, App Service |
| SAP | Certified SAP on GCP (Compute Engine, AlloyDB) | Azure SAP certified (RISE with SAP preferred partner) |
| Oracle | Interconnect with Oracle Cloud (OCI partnership) | Similar interconnect available |
| Hybrid cloud | Anthos / GKE Enterprise | Azure Arc |
| On-prem extension | Distributed Cloud (Edge, Hosted) | Azure Stack HCI / Azure Stack Edge |

### The Microsoft Ecosystem Lock-in Narrative

When a customer says "we're Microsoft-everything": acknowledge the integration story, then reframe.

Lock-in costs customers do not track:
- Azure egress costs: $0.087/GB egress (outbound data transfer). Once your data is in Azure, moving it costs money. This is a structural dependency.
- Azure OpenAI dependency: Azure's AI story depends entirely on the OpenAI partnership. OpenAI has competing products (ChatGPT Enterprise). This creates a structural conflict of interest. If OpenAI changes pricing or terms, Azure customers are exposed.
- Windows Server licensing: "Hybrid Benefit" pricing sounds like a discount but ties customers to Windows Server licenses.
- Azure AD / Entra ID centralisation: The more services that depend on Azure AD, the more expensive migration becomes.

Framing for CISO: Azure's security portfolio (Defender, Sentinel, Purview) is excellent but fragmented — the result of acquisitions (Nuance, RiskIQ, CloudKnox, etc.). Google's security portfolio (Chronicle, Mandiant, BeyondCorp, reCAPTCHA) is more architecturally coherent. Mandiant brings the world's deepest threat intelligence.

### Azure OpenAI Partnership Risk

Azure's most-used AI feature is powered by OpenAI — a company Microsoft does not own (49% stake, non-controlling). Risk factors:
1. OpenAI is building enterprise products that compete directly with Microsoft (ChatGPT Enterprise, OpenAI API with enterprise SLAs).
2. If OpenAI prioritises its own distribution, Microsoft's preferred access erodes.
3. Regulatory scrutiny of the Microsoft-OpenAI relationship is ongoing in EU and UK.
4. Google owns Gemini. Full stack. No commercial dependency on a third party.

---

## AI Comparison: Gemini vs Copilot vs Bedrock/SageMaker

| Dimension | Google Gemini | Microsoft Copilot | AWS Bedrock |
|---|---|---|---|
| Model ownership | Google (100% owned) | OpenAI models via partnership | Third-party models (Anthropic, Meta, etc.) |
| Workspace integration | Gemini in Gmail/Docs/Sheets/Meet (included) | M365 Copilot ($30/user add-on) | No productivity suite integration |
| Code assistant | Gemini Code Assist (IDEs + Cloud) | GitHub Copilot (separate product, $19/user) | Amazon Q (separate product) |
| Multimodal | Yes (text, image, audio, video, code) | Yes (GPT-4o based) | Varies by model |
| Long context | 1M token context window (Gemini 1.5 Pro) | 128K (GPT-4o) | Varies |
| Data grounding | Google Search + Drive + internal corpus | Microsoft Graph + SharePoint/OneDrive | Knowledge bases (RAG) |
| Agent framework | Vertex AI Agent Builder, Gemini Gems | Copilot Studio ($200+ for custom agents) | Bedrock Agents |

---

## Positioning by Persona

### CTO / VP Engineering
- Lead with: Kubernetes origin story (Google invented it), GKE Autopilot (zero node management), BigQuery (no DBA needed for data warehouse), Cloud Run (simplest path to containers).
- Avoid: Overloading with breadth. Pick 2–3 technical differentiators for their stack.
- Key question: "What does your team spend the most operational time managing today?"
- Win theme: Reduce toil. Your engineers should build product, not manage infrastructure.

### CFO / Finance
- Lead with: TCO comparison. Automatic discounts (no RI juggling), BigQuery eliminates idle cluster costs, AI included (no Copilot add-on line item), pooled storage (no per-user overages).
- Quantify: "A 500-user org on M365 E3 + Copilot pays $66/user/month = $396,000/year. Workspace Enterprise Standard is $23/user/month = $138,000/year. That's $258,000 annual savings before any infrastructure comparison."
- Avoid: Technical depth. CFOs want numbers and risk framing.
- Key question: "Has your team done a total cost analysis including all Microsoft licensing, Copilot add-ons, and Intune?"

### CISO / Security Lead
- Lead with: BeyondCorp (zero trust built-in, not an add-on), Mandiant integration (world's best threat intelligence), Chronicle SIEM (petabyte-scale), no security tiers (DLP/Vault included at lower price points than Microsoft equivalents).
- Address directly: CLOUD Act concerns (Data Regions, EU data boundary, compliance certifications), product cancellation fear (security products are not cancelled — Chronicle and Mandiant are multi-billion investments).
- Key question: "How many separate security consoles does your team log into today?"
- Win theme: Simpler architecture = smaller attack surface. Mandiant responds to more incidents than any other firm.

### End User / Department Head
- Lead with: Real-time collaboration (no version conflict, no "file locked by another user"), Gemini in Gmail/Docs (draft emails, summarise threads, generate content — no extra install), Meet quality (noise cancellation, live captions in 70+ languages), mobile-first experience.
- Avoid: Infrastructure discussion entirely. Focus on daily workflow.
- Key question: "How much time does your team spend on email and document creation daily?"
- Win theme: Work faster. Stop fighting your tools.

### IT Admin / Operations
- Lead with: Single admin console, agentless endpoint management, automatic Workspace updates (no patch cycles), Google's 99.9%+ uptime SLAs, faster password reset / account recovery flow.
- Key question: "How many helpdesk tickets per month are Microsoft licensing or Office issues?"
- Win theme: Less toil. One console. No client patching.
