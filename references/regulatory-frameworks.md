# Regulatory Frameworks: GCP Compliance Reference

## Table of Contents
1. GDPR (EU) — General Data Protection Regulation
2. RODO (Poland) — Polish GDPR Implementation
3. NIS2 Directive
4. DORA — Digital Operational Resilience Act (Financial)
5. HIPAA (US) — Healthcare
6. PCI-DSS — Payment Card Industry
7. SOX — Sarbanes-Oxley
8. CSRD — Corporate Sustainability Reporting Directive
9. EU AI Act
10. Data Residency Options on GCP
11. Quick Reference: Regulation × Industry Matrix

---

## 1. GDPR (EU) — General Data Protection Regulation

**Effective:** May 2018
**Applies to:** Any organisation processing EU personal data, regardless of where the organisation is based
**Key requirements:**
- Lawful basis for processing (consent, legitimate interest, contract, etc.)
- Data minimisation and purpose limitation
- Right to erasure, right to access, data portability
- Privacy by design and by default
- DPA (Data Processing Agreement) with all processors
- Cross-border transfer restrictions (SCCs, Adequacy Decisions, BCRs)
- Breach notification within 72 hours to supervisory authority
- DPIA required for high-risk processing

**Google's response:**
| Requirement | GCP Solution |
|------------|-------------|
| Data residency | EU regions (Frankfurt, Netherlands, Belgium, Poland*); region-locked resources |
| DPA | Google Cloud Data Processing Addendum (standard); GDPR-compliant |
| Right to erasure | Deletion APIs; Cloud DLP for PII discovery and deletion |
| Privacy by design | Organisational hierarchy of controls; least-privilege IAM |
| PII discovery | Sensitive Data Protection (Cloud DLP) — scans storage, databases, BigQuery |
| Breach detection | Chronicle SIEM; Security Command Center alerts |
| SCCs | Google provides Standard Contractual Clauses for cross-border transfers |
| Cross-border transfer | Data Transfer Impact Assessment (DTIA) available from Google |

*Poland (Warsaw) region: verify current availability — announced as priority market.

**What to tell the customer:** Google is GDPR-compliant as a data processor. The customer is the data controller — they must ensure their use of GCP services complies with GDPR. Google provides the tools; the customer must use them correctly.

---

## 2. RODO (Poland) — Polish GDPR Implementation

**Full name:** Rozporządzenie Ogólne o Ochronie Danych (Polish: "General Data Protection Regulation")
**In effect:** Polish implementation of GDPR; same fundamental requirements
**Supervisory authority:** UODO (Urząd Ochrony Danych Osobowych — Personal Data Protection Office)
**Specifics:**
- RODO is GDPR applied in Poland — same rules, Polish legal language
- UODO has issued sector-specific guidance for healthcare, education, and public administration
- Under-16 data requires parental consent for digital services
- Employment data has specific requirements (consent vs. legitimate interest)

**Google's response for Polish customers:**
- Polish-language Data Processing Addendum available
- Polish-language DPA for government sector
- Engagement with UODO on Google Cloud compliance positioning
- Data residency in EU (Frankfurt/Netherlands pending Warsaw region)

**Practical note for sellers:** Polish public sector customers are often confused about RODO vs. GDPR. Clarify: they're the same regulation. Polish implementations may have specific national guidance from UODO that applies in addition to GDPR. Always recommend the customer engage their DPO.

---

## 3. NIS2 Directive (EU) — Network and Information Security

**Effective:** EU member states must transpose by October 2024; enforcement from October 2024
**Applies to:** Essential entities (energy, transport, banking, health, water, digital infrastructure) and Important entities (postal, waste, food, manufacturing, chemicals, research, digital providers)
**Key requirements:**
- Cybersecurity risk management (governance, policies, incident response)
- Supply chain security assessment
- Incident reporting: 24-hour initial notification, 72-hour detailed report, 1-month final report
- Business continuity planning
- Encryption and key management
- Multi-factor authentication and access controls
- Vulnerability management and patching

**Google's NIS2 response:**
| Requirement | GCP Solution |
|------------|-------------|
| Incident detection | Chronicle SIEM — real-time threat detection; maps to MITRE ATT&CK |
| Incident reporting | Security Command Center — automated incident classification; supports 24-hour reporting SLA |
| Vulnerability management | Security Command Center Premium — CVE scanning, patch status |
| Access controls | BeyondCorp Enterprise — zero-trust; MFA enforcement |
| Supply chain security | Binary Authorization (verify containers are from trusted sources) |
| Encryption | Customer-managed keys (CMEK); Cloud KMS; HSM options |
| Business continuity | Cloud DR (cross-region failover); GKE regional clusters |
| Governance | Resource Manager org policies; Assured Workloads |

**What's important for sellers:** NIS2 affects a much wider range of companies than NIS1. Medium and large companies in affected sectors (almost all enterprise customers in logistics, energy, healthcare, manufacturing, public sector) are now subject to mandatory cybersecurity requirements. This is a buying trigger for Chronicle SIEM and Security Command Center.

---

## 4. DORA — Digital Operational Resilience Act (Financial)

**Effective:** January 17, 2025
**Applies to:** EU financial entities (banks, insurance, investment firms, crypto-asset service providers, CCPs, payment institutions) and their critical ICT third-party service providers (including Google Cloud)
**Key requirements:**
- ICT risk management framework with board accountability
- ICT incident classification and reporting (major incidents within 4 hours, detailed report within 72 hours)
- Digital operational resilience testing (including Threat-Led Penetration Testing for significant entities)
- ICT third-party risk management — contractual requirements with cloud providers
- Concentration risk monitoring — regulators track cloud provider concentration
- Register of all ICT third-party arrangements

**Google's DORA position:**
- Google Cloud is an "ICT third-party service provider" under DORA
- Google has published DORA-compliant contract addenda for financial services customers
- Google provides the Register of ICT Activities documentation templates
- Chronicle SIEM supports DORA's 4-hour incident reporting requirement
- Assured Workloads (EU) + multi-region architecture supports ICT risk management

**Key contractual additions Google provides for DORA:**
- Exit strategy documentation (how to migrate off GCP if needed)
- Sub-processor list for the relevant GCP services
- Audit rights (limited; via third-party audit reports)
- Incident notification SLA aligned to DORA timelines

**Seller note:** DORA requires financial institutions to map ALL their cloud dependencies. Every bank should now have a cloud register. Getting onto that register early (before DORA enforcement) is the priority for GCP financial services account teams.

---

## 5. HIPAA — Health Insurance Portability and Accountability Act (US)

**Applies to:** US covered entities (healthcare providers, health plans, clearinghouses) and their business associates
**Key requirements:**
- Business Associate Agreement (BAA) required with cloud providers
- PHI (Protected Health Information) must be encrypted in transit and at rest
- Access controls and audit logs for PHI access
- Breach notification within 60 days
- Minimum necessary standard (access only to data needed for the function)

**Google's HIPAA response:**
- Google Cloud offers a HIPAA BAA for covered services (extensive list; verify current list)
- Not all GCP services are covered under HIPAA BAA — seller must check
- Sensitive Data Protection (Cloud DLP) for PHI discovery and masking
- Cloud Audit Logs for PHI access audit trail
- HIPAA-eligible services include: BigQuery, Cloud Storage, Cloud SQL, Cloud Run, Vertex AI (verify)

**EU equivalent for healthcare sellers:** There is no direct EU equivalent of HIPAA. In the EU, patient data is protected under GDPR as "special category data" requiring explicit consent and enhanced protections.

---

## 6. PCI-DSS v4 — Payment Card Industry Data Security Standard

**Current version:** PCI-DSS v4.0 (required from March 2025)
**Applies to:** Any organisation that processes, stores, or transmits payment card data
**Key requirements:**
- Network segmentation (cardholder data environment isolated)
- Encryption of cardholder data in transit and at rest
- Access controls and MFA for CDE access
- Vulnerability management and penetration testing
- Monitoring and logging of all access to cardholder data
- Security awareness training
- New in v4: customised approach (alternative controls); targeted risk analysis; multi-factor authentication everywhere

**Google's PCI-DSS response:**
| Requirement | GCP Solution |
|------------|-------------|
| Segmentation | VPC Service Controls; Private Google Access; Cloud Armor |
| Encryption | CMEK (Customer-Managed Encryption Keys); Cloud KMS |
| Access controls | IAM + BeyondCorp; MFA enforcement via Cloud Identity |
| Monitoring | Cloud Audit Logs; Security Command Center; Chronicle |
| Vulnerability management | Security Command Center Premium (CVE scanning) |
| PCI-compliant services | GCP is PCI-DSS compliant as a platform; customer builds the compliant application on top |

**Attestation:** Google Cloud's PCI-DSS compliance is attested by a Qualified Security Assessor (QSA) annually. Report on Compliance (ROC) available to customers under NDA.

---

## 7. SOX — Sarbanes-Oxley Act (US)

**Applies to:** US-listed companies and their subsidiaries worldwide; increasingly used as a benchmark by private companies
**Relevant sections for cloud:** Section 302 (CEO/CFO certification of financial reporting controls), Section 404 (management assessment of internal controls), Section 409 (real-time disclosure of material changes)
**Key IT control requirements (ITGC — IT General Controls):**
- Access management (who can access financial systems)
- Change management (audit trail of changes to financial systems)
- Computer operations (backup, recovery, incident response)
- Audit logging (immutable logs of all actions on financial data)

**Google's SOX response:**
| Control | GCP Capability |
|---------|---------------|
| Access management | Cloud Identity + IAM; Privileged Access Management; Access Transparency |
| Audit logging | Cloud Audit Logs (admin activity, data access, system events) — immutable |
| Change management | Cloud Build audit trail; Git history in Cloud Source Repositories |
| Data backup | Cloud Storage cross-region replication; automated backup policies |
| Segregation of duties | IAM roles with least privilege; VPC Service Controls |
| Third-party assurance | SOC 1 Type II (SSAE 18) audit report available — most relevant for SOX |

---

## 8. CSRD — Corporate Sustainability Reporting Directive (EU)

**Effective:** First reports for large EU companies due in 2025 (covering FY2024)
**Scope wave:**
- Wave 1 (FY2024 data): Large EU public interest entities (>500 employees)
- Wave 2 (FY2025 data): Other large EU companies
- Wave 3 (FY2026 data): Listed SMEs
**Reporting framework:** European Sustainability Reporting Standards (ESRS)
**Key data requirements:**
- Scope 1 emissions (direct, from owned sources)
- Scope 2 emissions (indirect, from purchased energy)
- Scope 3 emissions (value chain — suppliers and customers)
- Double materiality assessment (financial AND environmental impact)
- Social and governance metrics (workforce, human rights, governance)

**Google's CSRD response:**
| Requirement | GCP Solution |
|------------|-------------|
| Carbon data for own IT | GCP Carbon Footprint tool (free) — shows emissions from GCP usage |
| Scope 1/2/3 calculation | BigQuery + Looker for sustainability data modelling |
| Supply chain Scope 3 | Cortex Framework Sustainability template; API integration with supplier data |
| Carbon-free energy | Carbon-free energy percentage by region (Google publishes hourly data) |
| Assurance-ready data | BigQuery data lineage via Dataplex; audit trail for sustainability data |
| ESRS data model | GCP doesn't provide a packaged ESRS solution; partner with CSRD reporting ISVs (Workiva, IBM Envizi, SAP Sustainability) |

**Seller note:** GCP does NOT sell a packaged CSRD solution. Sell GCP as the data infrastructure layer, and recommend a CSRD-specialist ISV (Workiva, IBM Envizi, Watershed, SAP Sustainability) to sit on top.

---

## 9. EU AI Act

**Adopted:** 2024; enforcement phased 2025–2027
**Risk tiers:**
- **Unacceptable risk** (banned): social scoring, real-time biometric surveillance in public spaces
- **High risk** (strict requirements): AI in credit scoring, healthcare diagnosis, critical infrastructure, employment, education, law enforcement
- **Limited risk** (transparency): chatbots, deepfakes (must disclose AI)
- **Minimal risk** (no requirements): AI-powered spam filters, video games

**Obligations for high-risk AI systems:**
- Conformity assessment before deployment
- Accuracy, robustness, cybersecurity requirements
- Transparency (explainability, documentation)
- Human oversight requirement
- Registration in EU database
- Post-market monitoring

**Google's AI Act position:**
- Google Cloud is primarily an AI infrastructure provider, not a high-risk AI system deployer
- Vertex AI provides the infrastructure for customers to build AI systems
- Vertex AI includes Explainable AI (for conformity assessment documentation)
- Model cards and model documentation support AI Act transparency requirements
- Vertex AI Model Registry provides the audit trail for model versioning
- Customers building high-risk AI on GCP are the regulated entity, not Google

**Seller note:** The AI Act creates both risk and opportunity. Risk: customers worried about regulatory exposure may slow AI adoption. Opportunity: GCP's governance tools (Explainable AI, Model Registry, Model Cards) make compliance feasible. Position GCP as "responsible AI infrastructure" that makes AI Act compliance possible.

---

## 10. Data Residency Options on GCP

Understanding data residency options is essential for government and regulated industry conversations.

### Option 1: Standard Regional Deployment
- Customer chooses EU region (Frankfurt, Netherlands, Belgium, Warsaw*)
- Data at rest stays in selected region
- Some metadata and service management data may flow to Google globally
- Appropriate for most commercial customers under GDPR

### Option 2: Assured Workloads — EU Regions
- Policy controls enforce EU-only data storage and processing
- Restricts GCP services to EU-approved services only
- Personnel access restricted to EU/EEA-based Google staff
- Appropriate for regulated industries, sensitive government data

### Option 3: Sovereign Cloud (via Partner)
- Full data sovereignty: Google operations staff cannot access customer data
- Customer holds encryption keys (CMEK with Cloud EKM — external key manager)
- Operations managed by European partner (T-Systems in Germany, Thales in France, etc.)
- Appropriate for classified government data, highly sensitive national infrastructure
- Higher cost; limited service set vs. standard GCP

### Option 4: Google Distributed Cloud (Air-Gapped)
- Google hardware + software deployed in customer's own data centre or government facility
- No connection to Google's public cloud (air-gapped option)
- Google Workspace and GCP services run fully on-premises
- Appropriate for classified/top-secret environments; critical national infrastructure
- Significant cost; deployment complexity

### Data Residency Quick Reference

| Customer Type | Recommended Option | Key Services |
|--------------|-------------------|-------------|
| Standard enterprise (EU) | Regional deployment | All GCP services |
| Regulated financial (EU) | Assured Workloads | BigQuery, Compute, GKE, Storage |
| Government (non-classified) | Assured Workloads + Sovereign Cloud consideration | Subset of GCP |
| Government (classified) | Sovereign Cloud or GDC Air-Gapped | Limited service set |
| Healthcare (EU, sensitive) | Assured Workloads | Cloud Healthcare API, BigQuery, Vertex AI |
| Polish public sector | Assured Workloads (Warsaw region) | Verify with account team |

---

## 11. Quick Reference: Regulation × Industry Matrix

| Regulation | Gov | Financial | Healthcare | Retail | Manufacturing | Education | Telecom | Energy | Transport |
|-----------|-----|-----------|-----------|--------|--------------|-----------|---------|--------|-----------|
| GDPR/RODO | ● | ● | ● | ● | ○ | ● | ● | ○ | ● |
| NIS2 | ● | ● | ● | ○ | ○ | ○ | ● | ● | ● |
| DORA | ○ | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| HIPAA | ○ | ○ | ● | ○ | ○ | ○ | ○ | ○ | ○ |
| PCI-DSS | ○ | ● | ○ | ● | ○ | ○ | ○ | ○ | ○ |
| SOX | ○ | ● | ○ | ● | ● | ○ | ● | ● | ● |
| CSRD | ● | ● | ● | ● | ● | ○ | ● | ● | ● |
| EU AI Act | ● | ● | ● | ○ | ○ | ● | ○ | ○ | ● |

● = Primary concern / high priority  ○ = Secondary / low priority
