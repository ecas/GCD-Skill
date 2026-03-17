# GCP Enterprise Integration Matrix
# How GCP connects with common enterprise systems

last_verified: 2026-03-17

---

## How to Use This File

Use this reference during discovery to assess integration complexity, set realistic expectations with customers, and identify hidden workstreams. Each section covers:
- What connects to what
- Integration type (Native / Partner / Custom)
- Effort level (Low / Medium / High)
- Key considerations and gotchas

**Effort Level Definitions:**
- **Low:** Standard configuration; no custom code; typically < 2 weeks
- **Medium:** Configuration + some scripting or connector setup; 2–8 weeks
- **High:** Custom development, complex schema mapping, or significant testing; 2–6 months

---

## 1. SAP (S/4HANA, ECC) ↔ GCP

### SAP Data → BigQuery

**Integration Type:** Native (SAP-certified connectors) + Partner
**Effort Level:** Medium
**Tools:**
- BigQuery Connector for SAP (Google-provided, SAP-certified ABAP add-on): Replicates data from SAP BW/4HANA or SAP Datasphere to BigQuery natively. Supported for SAP ECC 6.0+, S/4HANA on-prem and cloud.
- Google Cloud Data Fusion SAP Connector: For batch extraction using SAP BAPIs/RFCs.
- Qlik Replicate / Attunity: Partner CDC tool for SAP to BigQuery.

**Data Flow:** SAP ABAP → ABAP SDK for Google Cloud (Cloud Storage / BigQuery) → BigQuery.

**Key Considerations:**
- SAP Basis team must install the ABAP SDK for Google Cloud add-on — requires SAP BASIS knowledge and SAP Change Management process. Typically 2–4 weeks for transport approval.
- Initial full-load extraction of large SAP tables (e.g., BSEG financial postings, VBAP sales orders) can take days for large systems — plan migration window carefully.
- SAP license implications: extracting data for analytics does not typically trigger additional SAP licensing, but confirm with SAP account team.
- Delta extraction uses SAP change pointers or table triggers — need SAP ABAPer to configure.

**Common Integration Points:**
| SAP Module | Common Target | Typical Use Case |
|------------|--------------|-----------------|
| FI/CO (Finance) | BigQuery | P&L reporting, cost center analysis |
| SD (Sales) | BigQuery + Looker | Revenue analytics, order-to-cash |
| MM (Materials Mgmt) | BigQuery | Procurement analytics, inventory |
| PP (Production Planning) | Vertex AI | Demand forecasting, production optimization |
| HCM (HR) | BigQuery | Workforce analytics |

---

### SAP Application → GCP (Infrastructure)

**Integration Type:** Native
**Effort Level:** Low to Medium
**Tools:** SAP on GCP deployment guides; Bare Metal Solution for HANA; Compute Engine for app servers.

**Key Considerations:**
- Production SAP HANA requires Bare Metal Solution (not VMs) for SAP TDI certification.
- SAP application servers (dialog, batch, message) run on Compute Engine — supported VM families: n2, m2, m3.
- Cloud Interconnect is strongly recommended for production SAP — latency between BMS and on-prem end-user laptops must stay below SAP's SAPGUI response time requirements.
- SAP router/firewall rules must be replicated in GCP firewall — work closely with SAP BASIS.

---

### SAP BTP ↔ GCP

**Integration Type:** Native (SAP BTP runs on GCP as an underlying IaaS option)
**Effort Level:** Low
**Key Considerations:**
- SAP BTP (Business Technology Platform) can be provisioned on GCP datacenters.
- SAP Integration Suite (formerly CPI) on BTP can route data to GCP services via REST/HTTP connectors.
- SAP Event Mesh on BTP integrates with Google Pub/Sub for event-driven architectures.

---

## 2. Oracle (DB, EBS, Fusion) ↔ GCP

### Oracle Database → AlloyDB / Cloud SQL

**Integration Type:** Native (Database Migration Service)
**Effort Level:** High
**Tools:**
- Google Database Migration Service (DMS): Supports Oracle → AlloyDB and Oracle → Cloud SQL for PostgreSQL migrations.
- Striim: Partner tool for near-zero-downtime Oracle CDC migration.
- AWS SCT equivalent: Google does not have a Schema Conversion Tool as mature — use pgloader, ora2pg, or Striim.

**Migration Steps:**
1. Schema conversion (DDL) — largest effort. PL/SQL packages, triggers, functions → PL/pgSQL. Expect 20–40% of procedures to require manual rewrite.
2. Data migration using DMS continuous replication.
3. Application cutover (change JDBC connection string).

**Key Considerations:**
- Oracle-specific features with no direct PostgreSQL equivalent: sequences (pg has these), CONNECT BY hierarchical queries (use WITH RECURSIVE), Oracle-specific data types (NUMBER → NUMERIC, VARCHAR2 → VARCHAR).
- Oracle RAC (Real Application Clusters) workloads requiring write-scale-out should consider AlloyDB Cluster (AlloyDB's scale-out read architecture handles most read-heavy RAC use cases).
- Licensing impact: when you decommission Oracle, notify Oracle to avoid continued support billing.
- Oracle Audit Vault logs — if required for compliance, replicate audit table data to BigQuery before decommission.

**Effort Breakdown:**
| Task | Effort |
|------|--------|
| Schema assessment and conversion planning | 2–4 weeks |
| PL/SQL conversion and testing | 4–16 weeks (depends on code volume) |
| Data migration | 2–4 weeks |
| Application testing and performance tuning | 4–8 weeks |
| Cutover | 1 weekend |

---

### Oracle E-Business Suite (EBS) → GCP (Lift and Shift)

**Integration Type:** Native (Compute Engine)
**Effort Level:** Medium
**Key Considerations:**
- Oracle EBS is Oracle Application tier (Apache/WebLogic) + Oracle DB. Lift-and-shift: migrate Oracle DB to Compute Engine VM with Oracle DB (not AlloyDB — EBS requires Oracle DB).
- Alternatively, run on Bare Metal Solution if Oracle licenses are processor-based (BMS not subject to VMware/hypervisor multipliers — potential licensing benefit).
- Oracle EBS is officially supported on GCP (Oracle-Google partnership announced 2023).
- Post-lift: extract EBS data to BigQuery for analytics using DMS or custom JDBC extracts.

---

### Oracle Fusion (Cloud ERP) ↔ GCP

**Integration Type:** Partner / Custom
**Effort Level:** Medium
**Tools:**
- Oracle Integration Cloud (OIC): Oracle's managed integration platform. Use OIC adapters to push Fusion data to Cloud Storage or BigQuery.
- Fivetran / Stitch: SaaS connectors that pull Oracle Fusion Finance/HCM tables to BigQuery.
- Oracle Data Integrator (ODI): For bulk extraction.

**Key Considerations:**
- Oracle Fusion (SaaS) does not allow direct DB access — all integration via REST APIs or Oracle BICC (BI Cloud Connector).
- BICC (Business Intelligence Cloud Connector) extracts Fusion data to Oracle Object Storage; then transfer to GCS.
- Latency: typically T+1 (daily extracts). Near-real-time requires Oracle Fusion REST APIs + custom polling.
- Oracle licensing: Fusion itself is SaaS, no additional DB license needed for GCP analytics destination.

---

## 3. Salesforce ↔ GCP

### Salesforce Data → BigQuery

**Integration Type:** Native (Salesforce Connector for BigQuery)
**Effort Level:** Low
**Tools:**
- Salesforce Connector for BigQuery (Google-native, released 2023): Direct no-code replication of Salesforce objects to BigQuery. Available in BigQuery Studio.
- Fivetran: Most commonly used partner connector for Salesforce → BigQuery. Reliable, well-documented.
- Salesforce Data Cloud (CDP): Salesforce's own data platform can federate queries to BigQuery.

**Key Considerations:**
- Salesforce API limits: Standard Developer org: 15,000 API calls/day. Production orgs scaled by edition + user count. Large initial syncs may need to be rate-limited.
- Custom Salesforce objects are supported by Fivetran and the native connector.
- Salesforce → BigQuery is one of the most common integrations — well-tested path.
- Recommended approach: use native BigQuery connector (simplest) unless you need transformations in flight (then use Dataflow or Fivetran + dbt).

**Common Salesforce Objects to Replicate:**
| Object | Use in BigQuery |
|--------|----------------|
| Account | Customer master, segmentation |
| Opportunity | Pipeline analytics, win/loss |
| Lead | Marketing funnel analysis |
| Case | Support analytics |
| Activity | Sales activity analysis |
| Custom Objects | Domain-specific |

---

### Salesforce → Vertex AI (AI on CRM Data)

**Integration Type:** Partner / Custom
**Effort Level:** Medium
**Tools:**
- Pull Salesforce data to BigQuery (above), then train Vertex AI models on combined CRM + other data.
- Salesforce Einstein: Salesforce's native AI (does not require GCP, but GCP models can be called from Salesforce Apex via REST API).

**Key Considerations:**
- Common use case: train churn prediction model on Salesforce Opportunity + usage data in BigQuery; write predictions back to Salesforce as a custom field.
- Write-back to Salesforce via Salesforce REST API from Cloud Functions or Cloud Run.

---

### Google Workspace ↔ Salesforce

**Integration Type:** Native
**Effort Level:** Low
**Tools:**
- Salesforce for Gmail (Chrome extension): View and log Salesforce records from Gmail.
- Salesforce for Google Calendar: Sync Salesforce events to Google Calendar.
- Salesforce for Google Drive: Attach Drive files to Salesforce records.

**Key Considerations:**
- Pre-built connectors maintained by Salesforce AppExchange.
- SSO: Configure Google Workspace as SAML IdP for Salesforce — standard setup, 1–2 days.

---

## 4. ServiceNow ↔ GCP

### ServiceNow Data → BigQuery

**Integration Type:** Partner / Custom
**Effort Level:** Medium
**Tools:**
- Fivetran ServiceNow connector: Replicates ServiceNow tables to BigQuery. Supports standard tables (incident, change, problem, CMDB).
- ServiceNow IntegrationHub → Cloud Storage: Built-in HTTP steps in IntegrationHub can push records to GCS.
- JDBC / Table API export: Custom scripts using ServiceNow REST Table API.

**Key Considerations:**
- ServiceNow data latency: Fivetran sync is typically every 15–60 minutes. Real-time requires ServiceNow Business Rules to call an outbound webhook.
- CMDB (Configuration Management Database) is a high-value dataset for GCP security and cost management — map CMDB CIs to GCP resources.
- ServiceNow Table API has rate limits; large initial syncs of historical incident data should use bulk export.

---

### GCP Events → ServiceNow (ITSM)

**Integration Type:** Native / Partner
**Effort Level:** Low to Medium
**Tools:**
- Cloud Operations → ServiceNow: Cloud Monitoring alerting policies can notify PagerDuty → ServiceNow (via PagerDuty integration), or directly via webhook to ServiceNow REST API.
- Chronicle SOAR → ServiceNow: Chronicle SOAR has native ServiceNow connector — security incidents auto-create SNOW tickets.
- Google Workspace Alert Center → ServiceNow: Custom webhook forwarding.

**Key Considerations:**
- Common pattern: GCP alert → Pub/Sub → Cloud Function → ServiceNow REST API creates incident.
- ServiceNow's "Import Set" API is preferred for bulk event ingestion (handles duplicates better than direct table writes).
- ServiceNow OAuth 2.0 required for secure API access — coordinate with ServiceNow admin for client credential setup.

---

### Google Workspace ↔ ServiceNow

**Integration Type:** Partner
**Effort Level:** Low
**Tools:**
- ServiceNow Virtual Agent can embed Google CCAI (Dialogflow CX) for natural language IT support.
- SSO: Google Workspace as SAML IdP for ServiceNow — standard configuration.
- Google Chat + ServiceNow: ServiceNow ChatOps integration posts incident updates to Google Chat channels.

---

## 5. Microsoft Active Directory ↔ Google Cloud Identity

### AD → Cloud Identity (Identity Federation)

**Integration Type:** Native
**Effort Level:** Low to Medium
**Tools:**
- Google Cloud Directory Sync (GCDS): Synchronizes users, groups, and OUs from Active Directory to Google Cloud Identity/Workspace. Agent installed on-prem; pulls from AD and pushes to Google.
- Microsoft Entra ID (Azure AD) → Cloud Identity via SAML/OIDC federation: Configure Azure AD as external IdP for GCP. Users authenticate against Azure AD; GCP trusts the SAML assertion.

**Recommended Architectures:**

**Option A: GCDS Sync (Identity in Google)**
AD (on-prem) → GCDS → Google Cloud Identity → Google Workspace + GCP IAM
- Users log into Google with their AD credentials (via GCDS-synced passwords or password sync agent)
- Best for organizations moving to Google Workspace as primary productivity suite

**Option B: Azure AD as SAML IdP (Identity stays in Microsoft)**
AD → Azure AD → SAML → Cloud Identity/GCP IAM
- Users log into GCP with their Azure AD credentials
- Best for organizations keeping Microsoft as primary IdP but using GCP for workloads

**Option C: Workload Identity Federation (no user sync needed)**
- For service accounts and CI/CD pipelines, use Workload Identity Federation to grant GCP access to workloads authenticating with AD or Azure AD tokens — eliminates service account key management.

**Key Considerations:**
- GCDS sync frequency: typically every 15 minutes for user provisioning, configurable.
- Password sync: GCDS password synchronization requires an agent on every domain controller — significant security review required.
- SCIM provisioning: Azure AD can provision users to Google Workspace via SCIM 2.0 (simpler than GCDS for Azure AD customers).
- Group sync: GCP IAM can use Google Groups for access control — sync AD security groups to Google Groups via GCDS.

**Effort Breakdown:**
| Task | Effort |
|------|--------|
| GCDS installation and initial config | 1–2 days |
| AD OU structure mapping to Google | 2–5 days |
| Test user sync and password sync | 1–2 weeks |
| Production cutover | 1 day |
| Total (GCDS path) | 2–4 weeks |

---

### AD FS → Google Workspace (SSO)

**Integration Type:** Native
**Effort Level:** Low
**Tools:** Configure AD FS as SAML IdP for Google Workspace. Google Workspace admin console → Security → Authentication → SSO with third-party IdP.

**Key Considerations:**
- SSO configuration is well-documented and straightforward.
- If customers are moving from AD FS to Azure AD (Microsoft's cloud IdP), recommend Azure AD → Workspace SAML instead.
- Test with 1–2 users before org-wide rollout.

---

## 6. Microsoft SharePoint ↔ Google Drive

### SharePoint → Google Drive (Migration)

**Integration Type:** Partner
**Effort Level:** Medium to High
**Tools:**
- Google Workspace Migration for Microsoft SharePoint (GWMMS): Google-provided, free migration tool. Migrates SharePoint document libraries to Google Drive/Shared Drives.
- Cloudficient / Migrate.com / ShareGate: Third-party migration tools with better metadata preservation and scheduling.

**What Migrates:**
| SharePoint Content | Google Equivalent | Notes |
|-------------------|-------------------|-------|
| Document Libraries | Shared Drives | Files converted to Google Docs format optionally |
| Sites | (no equivalent) | Site structure becomes folder structure |
| Permissions | Drive permissions | ACLs migrated; SharePoint groups → Google Groups |
| Metadata | Limited | Custom SharePoint column metadata does NOT migrate to Drive |
| SharePoint Lists | Google Sheets | Manual work |
| SharePoint Pages/Intranet | Google Sites | Rebuild required |

**Key Considerations:**
- SharePoint permissions are complex — nested groups, broken inheritance, unique item permissions. Audit and simplify before migration.
- SharePoint custom column metadata is not supported in Google Drive — this is a common blocker for regulated industries that rely on metadata.
- File format conversion: Microsoft Office files can stay as .docx/.xlsx in Drive (recommended for migration speed) or be converted to Google Docs format.
- Migration of large document libraries (>1M files) requires multiple passes and scheduling.
- SharePoint Online → Drive: use GWMMS or third-party tool. Relatively straightforward.
- SharePoint on-prem → Drive: requires network path for migration tool to access on-prem SharePoint. More complex.

**Effort Breakdown (1,000 users, 5 TB of content):**
| Task | Effort |
|------|--------|
| Discovery and permissions audit | 2–4 weeks |
| Pilot migration (10% of content) | 1–2 weeks |
| Full migration (parallel to production) | 4–8 weeks |
| User training and adoption | 4–8 weeks (ongoing) |

---

### SharePoint → Google Drive (Co-existence / Ongoing Sync)

**Integration Type:** Partner
**Effort Level:** Medium
**Tools:**
- AODocs: Maintains compliance metadata in Google Drive that SharePoint could not.
- Cloudficient mirroring: Real-time sync between SharePoint and Drive during transition.
- Power Automate → Drive API: Keep specific libraries in sync during phased migration.

**Key Considerations:**
- Long-term co-existence adds complexity — set a migration end date.
- If SharePoint serves as an intranet/portal, consider migrating to Google Sites separately from file migration.

---

## 7. Legacy Databases (DB2, Sybase) ↔ GCP

### IBM DB2 → BigQuery / Cloud SQL

**Integration Type:** Custom
**Effort Level:** High
**Tools:**
- IBM DataStage or IBM Data Replication: Enterprise CDC tool for DB2. Can target Cloud Storage or BigQuery.
- Striim: Partner tool supporting DB2 CDC → Cloud Storage → BigQuery.
- JDBC extraction: Custom Python/Java scripts using DB2 JDBC driver to extract and load to Cloud Storage → BigQuery.
- Database Migration Service: Does NOT natively support DB2 as a source (as of 2026). Custom path required.

**Key Considerations:**
- DB2 schema features with no BigQuery equivalent: sequences, stored procedures (analytics offload only — procedures stay in DB2 app tier).
- DB2 for z/OS (mainframe DB2): significantly more complex than LUW (Linux/Unix/Windows). Requires mainframe team involvement. Typical approach: offload reporting/analytics queries to BigQuery; keep DB2 z/OS for transactional workloads.
- DB2 BLU Acceleration workloads: columnar analytics in DB2 — BigQuery is natural replacement with significantly better economics.
- Character encoding: DB2 EBCDIC (mainframe) vs ASCII — conversion required during extraction.

**Effort Breakdown:**
| Task | Effort |
|------|--------|
| Schema analysis and mapping | 3–6 weeks |
| Extraction pipeline development | 4–8 weeks |
| Data validation and reconciliation | 4–6 weeks |
| Cutover | 1–2 weeks |
| Total | 3–6 months |

---

### SAP Sybase ASE → Cloud SQL / AlloyDB

**Integration Type:** Custom / Partner
**Effort Level:** High
**Tools:**
- Sybase ASE → PostgreSQL: No native GCP DMS support. Use pgloader (open source) for schema + data migration.
- Attunity (Qlik Replicate): Partner CDC tool supporting Sybase ASE as source.
- Custom JDBC extraction to Cloud Storage + BigQuery Load.

**Key Considerations:**
- Sybase SQL dialect (Transact-SQL variant) is similar to SQL Server — many queries will work with minor modifications in PostgreSQL.
- Sybase stored procedures: T-SQL → PL/pgSQL conversion required. Significant effort for large procedure libraries.
- Sybase IQ (columnar analytics): BigQuery is the natural replacement. Sybase IQ to BigQuery migration is more straightforward than ASE due to analytics-only workload.
- Check if application uses ODBC or JDBC — updating connection strings is usually manageable; query rewriting for dialect differences is the main effort.

---

## 8. Mainframe (IBM z/OS) ↔ GCP

### Mainframe Data → BigQuery (Analytics Offload)

**Integration Type:** Partner
**Effort Level:** High
**Tools:**
- IBM InfoSphere DataStage (z/OS → Cloud Storage): Extract mainframe VSAM, DB2 for z/OS, IMS datasets to Cloud Storage via DataStage.
- Syncsort / Precisely Connect: Mainframe-native data integration products that can push data to Google Cloud Storage.
- IBM z/OS Cloud Broker: Exposes mainframe services as REST APIs that GCP services can consume.
- Striim (with IBM CDC for z/OS): Real-time DB2 for z/OS CDC to Cloud Storage/BigQuery.

**Data Sources on Mainframe:**
| Source Type | Description | Migration Complexity |
|-------------|-------------|---------------------|
| DB2 for z/OS | Relational database | High (EBCDIC, z/OS-specific SQL) |
| VSAM Files | Sequential/indexed file data | High (custom parsing) |
| IMS/TM | Hierarchical database | Very High (requires specialist) |
| COBOL data structures | Copybooks define record layouts | High (binary packed decimals) |

**Key Considerations:**
- EBCDIC → UTF-8 conversion: all mainframe data is EBCDIC encoded. Conversion tools (Precisely, Syncsort) handle this but must be validated for special characters.
- Packed decimal (COMP-3): COBOL numeric fields stored as packed binary — must be converted to standard numeric. Requires COBOL copybook definitions.
- Mainframe connect bandwidth: data extraction competes with production batch jobs. Extraction windows must be coordinated with mainframe operations team.
- RACF security: mainframe security team (RACF or Top Secret) must grant extraction job permissions. Usually requires formal change management.

---

### Mainframe Applications → GCP (Modernization)

**Integration Type:** Partner / Custom
**Effort Level:** Very High (typically 12–36 months)
**Approaches:**

**Option A: Rehosting (Lift-and-Shift)**
- Run COBOL/PL1 code on GCP using emulation: Micro Focus (now OpenText) Enterprise Server, IBM Z Development and Test Environment.
- Fastest to cloud; no application changes; maintains COBOL codebase.
- Tools: OpenText/Micro Focus COBOL runtime on Compute Engine.

**Option B: Replatforming (Convert + Run)**
- Convert COBOL to Java or C# using automated tools: Blu Age (Google-acquired, now part of GCP mainframe modernization), NTT TCS.
- Converted code runs on GCP (Cloud Run, GKE, Compute Engine).
- Blu Age (Google): Automated COBOL → Java conversion with Google support.

**Option C: Re-architecting (Rewrite)**
- Rewrite application in modern language targeting cloud-native GCP services.
- Highest risk, highest long-term value.
- Typically reserved for applications with clear bounded scope.

**Key Considerations:**
- Mainframe modernization projects have high failure rates — start with small, non-critical workload.
- Blu Age (acquired by Google 2021) is a key differentiator vs AWS/Azure for mainframe COBOL modernization.
- Existing mainframe JCL (Job Control Language) batch jobs can be converted to Cloud Composer DAGs.
- DO NOT underestimate mainframe dependency mapping — COBOL programs call other programs (CALL statements), share files (VSAM), and rely on JCL job flows. Full inventory required before any migration.

**Effort Estimate:**
| Modernization Type | Time | Risk |
|-------------------|------|------|
| Rehosting (emulation) | 6–12 months | Low–Medium |
| Replatforming (Blu Age) | 12–24 months | Medium–High |
| Re-architecting | 18–36 months | High |

---

## Integration Complexity Summary Table

| System | GCP Target | Integration Type | Effort | Key Blocker |
|--------|-----------|-----------------|--------|-------------|
| SAP ECC/S4 → Analytics | BigQuery | Native (ABAP SDK) | Medium | SAP BASIS team bandwidth |
| SAP HANA → Infrastructure | Bare Metal + CE | Native | Medium | SAP TDI certification requirements |
| Oracle DB → AlloyDB | AlloyDB | Native (DMS) | High | PL/SQL conversion effort |
| Oracle Fusion → Analytics | BigQuery | Partner (Fivetran) | Medium | BICC setup, API rate limits |
| Salesforce → Analytics | BigQuery | Native connector | Low | API limits on large initial sync |
| ServiceNow → Analytics | BigQuery | Partner (Fivetran) | Medium | Table API rate limits |
| GCP Alerts → ServiceNow | ServiceNow | Custom webhook | Low | ServiceNow OAuth setup |
| AD → Cloud Identity | Cloud Identity | Native (GCDS) | Low–Medium | Password sync security review |
| AD FS → Workspace SSO | Workspace | Native (SAML) | Low | AD FS configuration |
| SharePoint → Drive | Google Drive | Native (GWMMS) | Medium–High | Metadata not migrated, permissions complexity |
| DB2 LUW → BigQuery | BigQuery | Partner/Custom | High | No native DMS support |
| DB2 z/OS → BigQuery | BigQuery | Partner | High | EBCDIC, mainframe access |
| Sybase ASE → AlloyDB | AlloyDB | Custom | High | T-SQL dialect conversion |
| Mainframe → GCP (Rehost) | Compute Engine | Partner (Micro Focus) | High | COBOL dependency mapping |
| Mainframe → GCP (Replatform) | Cloud Run / GKE | Partner (Blu Age) | Very High | Full application portfolio analysis |
