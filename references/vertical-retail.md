# Vertical Playbook: Retail & E-commerce

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

Retail is the vertical where Google's consumer-side intelligence (Search, Maps, Shopping, YouTube) creates a uniquely differentiated position versus AWS and Azure. Google understands consumer intent signals at a scale no other cloud provider can match. The industry is bifurcating: pure-play e-commerce players (who are digitally native) vs. omnichannel traditional retailers trying to match them. Both need real-time analytics, personalisation at scale, and supply chain resilience. The post-COVID inventory crisis taught every retailer that demand forecasting is a strategic capability, not a reporting function.

**The "why now":** Generative AI is reshaping product discovery. Google's Shopping Graph (world's largest product catalogue knowledge graph) and Vertex AI Search for Retail give traditional retailers access to the search and recommendation technology that Google has used internally for decades. This is a genuine competitive advantage over AWS.

---

## 2. Top Pain Points

1. **Inaccurate demand forecasting** — Overstock and stockouts are existential; retailers often operate on 2–3% net margins; a 1% improvement in forecast accuracy is worth millions
2. **Poor personalisation** — Generic recommendations drive 3–5% click-through; personalised recommendations drive 15–30%; most retailers can't do the latter at scale
3. **Site search failure** — 30% of e-commerce visitors use site search; 80% abandon the site if search returns irrelevant results; most retailers have terrible search
4. **Supply chain visibility** — "Where is my inventory right now?" is often unanswerable in real time across a distributed warehouse network
5. **Returns management** — E-commerce returns run 15–35%; reverse logistics is the most inefficient part of the operation
6. **Omnichannel data fragmentation** — Online and in-store customer journeys are not connected; loyalty programme data is stale
7. **Seasonal peak infrastructure** — Black Friday/Christmas spikes 10–20x baseline; over-provisioning for peaks wastes money; under-provisioning loses sales
8. **Fraud & payment abandonment** — Cart abandonment at payment step averages 25%; friction from fraud checks makes it worse

---

## 3. Relevant Google Products

| Pain Point | Google Product | Why It Wins |
|-----------|---------------|-------------|
| Demand forecasting | BigQuery ML, Vertex AI, Cortex Framework (Retail) | Pre-built demand forecasting pipeline with SAP integration; training on years of historical data |
| Personalisation | Vertex AI Search for Retail (formerly Recommendations AI) | Same engine that powers Google Shopping; tested on billions of queries |
| Site search | Vertex AI Search for Retail | Natural language search; semantic understanding; handles misspellings and synonyms |
| Supply chain | BigQuery + Supply Chain Twin, Looker | Real-time inventory visibility dashboard; what-if simulation |
| Omnichannel analytics | BigQuery + GA4 + Looker | GA4 is the stitching layer between online and offline signals |
| Peak scaling | Cloud Run, GKE Autopilot, Cloud CDN | Auto-scale to 20x baseline in minutes; pay only for what you use |
| Fraud | reCAPTCHA Enterprise, Vertex AI | Same fraud models Google uses for Google Pay |
| Returns | Document AI, Vertex AI | Automated return processing; fraud detection in returns |

**Unique Google advantage: Shopping Graph + Consumer Intent.** Google's Shopping Graph contains 35+ billion product listings. Retailers using Vertex AI Search for Retail benefit from this training data — their search quality improves immediately without training on their own data alone.

---

## 4. Typical Deal Profile

| Dimension | Details |
|----------|---------|
| Deal size | €200K–€5M for mid-market; €5M–€50M for Tier 1 retailers |
| Sales cycle | 6–18 months; faster for specific point solutions (search, personalisation) |
| Decision makers | CTO/VP Engineering (platform), CDO/Head of Analytics (data), CMO (customer experience), COO (supply chain) |
| Budget owner | Technology + Marketing (personalisation); Supply Chain (inventory); Digital Commerce (e-commerce) |
| Entry point | Site search or personalisation is fastest time-to-value; demand forecasting is largest deal |
| Key differentiator | Google's consumer intelligence assets; Cortex Framework retail templates |

---

## 5. Compliance Landscape

| Regulation | Requirement | Google's Response |
|-----------|------------|-------------------|
| GDPR/RODO | Customer data processing; cookie consent; data portability | GA4 consent mode; Sensitive Data Protection; EU data regions |
| PCI-DSS | Cardholder data protection | PCI-DSS certified services; tokenisation; Sensitive Data Protection |
| ePrivacy Directive | Cookie consent; tracking | GA4's privacy-preserving measurement; Topics API (Privacy Sandbox) |
| Consumer rights (EU) | Right to explanation for automated decisions (price discrimination, targeting) | Vertex AI Explainable AI for recommendation explanations |
| WEEE / Extended Producer Responsibility | Product lifecycle tracking | Not a primary GCP play; reference if relevant |

---

## 6. Top 3 Use Cases

### Use Case 1: AI-Powered Site Search & Discovery
**Problem:** A fashion retailer with 500,000 SKUs. Customer searches "blue casual dress for summer wedding" — search returns results for "blue dress" sorted by price, missing the semantic intent entirely. 70% of customers who use search leave without buying.
**Solution:** Vertex AI Search for Retail replaces keyword-based search engine. Semantic understanding of natural language queries. Visual search (upload a photo, find similar items). Personalisation layer adjusts ranking based on individual purchase history. A/B testing built in.
**Business Value:** 30–40% improvement in search-to-purchase conversion; 15–25% increase in add-to-cart rate from recommendations; measurable revenue uplift in 60–90 days.
**Implementation speed:** 6–8 weeks to production if the product catalogue is in a standard format.

### Use Case 2: Real-Time Demand Forecasting & Inventory Optimisation
**Problem:** A grocery retailer orders 30 days out. Demand spikes (weather, events, social media trends) invalidate forecasts daily. Result: €50M in annual write-off for perishables + €30M in lost sales from stockouts.
**Solution:** BigQuery ingests POS data, online order data, external signals (weather, local events, Google Trends) in real time → Vertex AI demand forecasting model produces SKU/location/day predictions → Looker dashboard gives category managers actionable signals → Automated replenishment triggers integrate with ERP via Apigee.
**Business Value:** 15–25% reduction in waste; 10–15% reduction in stockouts; €5–20M annual benefit for a mid-size grocery chain.

### Use Case 3: Unified Customer 360 for Omnichannel Personalisation
**Problem:** A customer buys trainers in-store on Monday, then visits the website and sees an ad for trainers. The retailer's online and offline data are disconnected; the marketing team is wasting money on customers who already bought.
**Solution:** GA4 + BigQuery + Looker to create a unified customer identity (probabilistic matching of loyalty card, email, device ID). Feed into Vertex AI to segment customers by lifetime value, churn risk, and next-best-product predictions. Activate via Google Ads Customer Match for suppression and lookalike audiences.
**Business Value:** 20–30% reduction in wasted ad spend; 15–20% improvement in email campaign revenue; reduced churn among high-LTV customers.

---

## 7. Killer Demo Scenario

**"The Black Friday Stress Test" — Cloud Run + Vertex AI + BigQuery Real-Time**

1. Show a live e-commerce site (or realistic mock) — baseline traffic, 1,000 transactions/minute
2. Trigger a traffic spike: traffic jumps 15x (simulating Black Friday)
3. Show Cloud Run auto-scaling: instances spin up in 30 seconds; zero dropped requests
4. Simultaneously show the Vertex AI recommendations engine personalising in real time
5. Show BigQuery real-time analytics: revenue per minute, top products, conversion rate — all live, sub-second latency
6. Then show the cost: during the spike, cost scales proportionally. After the spike: cost drops back to baseline within minutes. "Compare this to your on-prem approach where you provisioned for peak 365 days a year."

Why this works: every retail CTO has a Black Friday horror story. The demo proves the scaling claim isn't theoretical. The cost angle lands with the CFO.

---

## 8. Competitive Landscape

| Competitor | Strength | Google Counter |
|-----------|---------|----------------|
| AWS | Market share; Personalize, Forecast services | Google's consumer intelligence advantage: Shopping Graph, Search training data. AWS Personalize is generic ML; Google Recommendations AI is trained on Google Shopping signals. |
| Salesforce Commerce Cloud | CRM integration; retail-specific features | GCP as data infrastructure under Salesforce; BigQuery Salesforce connector; Vertex AI enhancing Salesforce Einstein |
| Adobe (Experience Cloud) | Marketing stack integration | GCP as data infrastructure; GA4 + BigQuery replacing Adobe Analytics for many customers |
| SAP (SAP S/4HANA, SAP CAR) | ERP/inventory incumbent | Cortex Framework for Retail provides pre-built SAP-to-BigQuery integration; sell GCP alongside SAP, not instead of it |
| Snowflake | Data cloud for retail analytics | BigQuery: serverless, built-in ML, streaming, Google AI integration. Retail media use case (advertising analytics) is a BigQuery strength vs. Snowflake |

---

## 9. Macro Trends

1. **Retail media networks** — Retailers monetising their customer data and ad inventory (Tesco Media, Carrefour Links, Walmart Connect). Google's advertising measurement and analytics infrastructure is the natural backend. Multi-billion dollar opportunity.
2. **Generative AI in product content** — Generating product descriptions, images, size guides at scale. Vertex AI + Imagen = content factory. Reduces agency cost by 60–80%.
3. **Social commerce** — TikTok Shop, Instagram Shopping; YouTube Shopping. Google's ecosystem is a natural fit; BigQuery + GA4 measures cross-channel attribution.
4. **Supply chain regionalisation** — Post-COVID/geopolitical reshoring; regional supplier networks replace global. Real-time supply chain visibility becomes competitive advantage.
5. **Sustainability reporting** — CSRD (Corporate Sustainability Reporting Directive) requires detailed supply chain emissions data from 2025. BigQuery as the sustainability data backbone.
6. **Unified commerce** — Physical + digital convergence; stores as fulfilment centres, showrooms, and experience hubs. Real-time inventory and experience personalisation are the technical requirements.

---

## 10. Discovery Questions

1. "What's your current site search satisfaction rate — do you track what percentage of searches end in a purchase vs. an exit?"
2. "How much inventory did you write off last year due to poor demand forecasting — and what percentage was perishable or seasonal?"
3. "During your last peak season, did you have any customer-facing failures due to traffic spikes — and how much did that cost you?"
4. "If I asked your CMO how much of their digital ad spend goes to customers who already bought from you in the last 30 days, what would they say?"
5. "How connected are your online and in-store data today — if a customer buys in-store, does your online recommendation engine know about it?"
