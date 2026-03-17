# Objection Library

last_verified: 2026-03-17

---

## How to Use This Library

Each objection entry follows a consistent structure:
- **Objection** — the exact or near-exact phrase customers use
- **Context** — who typically raises this and when
- **Response** — conversational counter (read it aloud; it should not sound like a script)
- **Supporting Evidence** — data points and proof to reinforce
- **Follow-up Question** — to advance the conversation

Never recite these verbatim. Use them as mental scaffolding.

---

## Objection 1: "We're already on Microsoft — it's everywhere."

**Context:** Most common objection from IT decision-makers and department heads at the start of any conversation. Often said as a conversation-stopper, not a real objection.

**Response:** That's where most of our largest enterprise customers started — deeply embedded in Microsoft. The question we always ask is: are you satisfied, or are you just familiar? There's a difference. Most organisations we work with never did a proper total cost analysis including Copilot add-ons, Intune, Purview, and the E3/E5 uplift. When they do, the number is usually a shock. We're not asking you to rip anything out today — we're asking whether you know what you're actually paying and what you're getting for it.

**Supporting Evidence:**
- Average enterprise on M365 E3 + Copilot: $66/user/month. Workspace Enterprise Standard with Gemini: $23/user/month.
- Forrester TEI for Google Workspace: 334% ROI, $4.6M NPV for a composite 5,000-user organisation.
- Migration tooling (Migrate for Google Workspace) is free and handles Gmail, Drive, Calendar data.

**Follow-up Question:** "When did you last benchmark your Microsoft spend against what you'd pay elsewhere for equivalent functionality?"

---

## Objection 2: "Google isn't enterprise-ready."

**Context:** Raised by CTOs or IT architects who associate Google with consumer products. Common in regulated industries. Less frequent than it was five years ago, but still surfaces.

**Response:** I hear that a lot from teams who haven't looked at the enterprise portfolio recently. Google Cloud is used by HSBC, Airbus, Deutsche Bank, Toyota, Carrefour, and the US Department of Defense. Google Workspace has over 10 million business customers including 60% of Fortune 500 companies. The product has 99.9% uptime SLAs, dedicated enterprise support tiers, and Mandiant — the world's leading incident response firm — is a Google company. What specifically makes you feel it's not enterprise-grade? I'd rather address the concrete concern than the general perception.

**Supporting Evidence:**
- Google Workspace: 3+ billion users, 10M+ business and education customers.
- Google Cloud: Used by all 20 of the world's largest banks (at some level).
- Mandiant: Investigates more nation-state breaches than any other firm.
- Compliance certifications: ISO 27001, SOC 1/2/3, FedRAMP High, PCI DSS, HIPAA, GDPR.

**Follow-up Question:** "Which specific capability or certification are you most concerned about? Let's look at it directly."

---

## Objection 3: "We're worried about the CLOUD Act and US data sovereignty."

**Context:** European enterprises (especially German, French, Polish, Dutch). Compliance teams, DPOs, legal counsel. Raised during security/compliance deep dives.

**Response:** This is a legitimate concern and I respect that you're asking about it. The CLOUD Act does allow US authorities to request data from US-based cloud providers — and that applies equally to Microsoft Azure, AWS, and Google Cloud. The question is not which vendor avoids US jurisdiction, because none of them can. The question is which vendor has the strongest contractual protections, the most transparent challenge process, and the most granular data residency controls. Google has committed to challenging overbroad government requests, publishes a Transparency Report, offers Data Regions (EU data stored and processed in EU), and operates under the EU Cloud Code of Conduct. We can walk through the GDPR compliance documentation in detail.

**Supporting Evidence:**
- Google Workspace Data Regions: data-at-rest stored in user-selected region (EU or US).
- Google Cloud Data Boundary for EU: processing of certain data within EU.
- Google Transparency Report: published quarterly, includes all government data requests.
- Microsoft and AWS have identical CLOUD Act exposure — this is a US law issue, not a Google issue.
- Google is a signatory of the EU Cloud Code of Conduct (CISPE-aligned).

**Follow-up Question:** "Would it help to involve your DPO in a technical session where we go through the GDPR Data Processing Amendment and data residency controls in detail?"

---

## Objection 4: "AWS has more services than GCP."

**Context:** Technical architects and developers who have evaluated cloud services breadth. Usually raised during platform selection discussions.

**Response:** AWS does have more total services — somewhere over 200 at last count. But breadth isn't the same as relevance. Most enterprises actively use 15–25 AWS services, and Google has full parity on every service that matters at scale. Where Google wins on depth rather than breadth: BigQuery has no equivalent in the market. Vertex AI is the most integrated MLOps platform available. GKE invented Kubernetes. Cloud Run is the simplest path to serverless containers. And Google's network — the same backbone that serves Search and YouTube — gives you latency and reliability that AWS's network cannot match on inter-region traffic. Ask yourself: which services do you actually use, and which of those does Google not have?

**Supporting Evidence:**
- GCP has 150+ products across compute, storage, data, AI, networking, security.
- BigQuery Omni allows querying data in AWS S3 without moving it — GCP can extend into AWS.
- Gartner Magic Quadrant: GCP is a Leader in Cloud AI Developer Services and Cloud Database Management.
- GKE Autopilot has no AWS equivalent.

**Follow-up Question:** "If you mapped out your current AWS usage, which 10 services do you rely on most? I'd like to show you our depth in each of those specific areas."

---

## Objection 5: "Our developers know AWS — retraining is expensive."

**Context:** Engineering managers and CTOs evaluating migration. Often comes after initial cost conversation where GCP looks attractive financially.

**Response:** That's a real cost and I won't pretend otherwise. Developer familiarity has genuine value. But let's size it accurately. Most modern cloud skills — containers, Kubernetes, Terraform, CI/CD, SQL — are transferable. The AWS-specific knowledge (CloudFormation, IAM syntax quirks, service naming conventions) is a few weeks of adjustment, not a multi-month retraining programme. Google provides free training through Google Cloud Skills Boost, partner-led bootcamps, and cloud-native tools like Cloud Code that integrate directly into VS Code and JetBrains. The bigger question is: how long does it take to recoup retraining costs against the pricing and productivity savings?

**Supporting Evidence:**
- Google Cloud Skills Boost: free and paid training paths, recognised certifications.
- Cloud Code: VS Code and JetBrains extensions — familiar environment, no new tools.
- Kubernetes: if devs know EKS, GKE is immediately familiar (Google invented it).
- Forrester study: developer productivity increases of 15–25% reported for teams moving to GKE Autopilot and Cloud Run.

**Follow-up Question:** "What does your current developer onboarding look like for AWS? We can map out a comparable GCP path and get you a realistic retraining cost estimate."

---

## Objection 6: "Google cancels products — we can't build on something that disappears."

**Context:** Very common. Technical and business stakeholders alike. Often referenced alongside Google Reader, Stadia, Inbox. Persistent reputation issue.

**Response:** That reputation comes mostly from free consumer products — Reader, Inbox, Stadia — not from enterprise infrastructure products. Google has never shut down a Google Cloud service that enterprise customers were paying for. The lifecycle is different: Google Cloud services undergo a formal deprecation policy with minimum 12-month notice, API compatibility guarantees, and migration paths. BigQuery has been available since 2012. GKE since 2015. Cloud SQL since 2011. The real question is whether any cloud vendor guarantees product permanence — and the answer is none of them do. What matters is the deprecation process and the contractual SLAs when you're paying for something.

**Supporting Evidence:**
- Google Cloud Deprecation Policy: minimum 12 months notice for GA products.
- Google has committed to maintaining GKE, BigQuery, Cloud Storage, and Workspace as long-term strategic products (CEO-level public commitments).
- AWS has also sunset services (SimpleDB, Elastic Transcoder, Data Pipeline).
- Google Workspace has been continuously running since Google Apps for Business in 2006.

**Follow-up Question:** "Are there specific GCP products you'd want to build on where I can show you the product roadmap and Google's public commitments?"

---

## Objection 7: "Migration is too risky — our last migration was a disaster."

**Context:** IT decision-makers who have lived through painful ERP or on-prem migrations. Particularly common in mid-market. Surfaces after initial interest is established.

**Response:** A bad migration experience is a very rational reason to be cautious. The question is whether the migration itself was the problem or whether the tooling, planning, and vendor support were inadequate. Google has invested heavily in migration tooling precisely because we know this is the barrier. Migrate for Google Workspace handles email, calendar, and Drive data migration from Microsoft 365 with automated tooling and progress tracking. For GCP, we have a formal migration framework (ADAPT), dedicated migration specialists, and certified partners who do nothing but migrations. Most of our customers do phased migrations — pilot group, then department-by-department — so there's no big-bang cutover.

**Supporting Evidence:**
- Migrate for Google Workspace: free, handles Microsoft 365 → Workspace migration for email, calendar, contacts, Drive.
- Google Cloud Migration Framework (ADAPT): assess, plan, migrate, optimise phases.
- 24/7 support during migration windows for Enterprise tier customers.
- Reference customers available who can speak to migration experience (ask your account team).

**Follow-up Question:** "What went wrong in your last migration? Understanding that helps us design a risk mitigation plan that addresses those specific failure modes."

---

## Objection 8: "Google support is bad — we can't get a human on the phone."

**Context:** Procurement and IT operations teams. Sometimes stems from personal experience with Google's consumer support (Gmail, Google Photos), which is entirely self-service.

**Response:** Google's consumer support and Google's enterprise support are completely separate operations. Enterprise Standard and Enterprise Plus include 24/7 phone and chat support with Technical Account Managers for the largest customers. Enhanced Support includes a target 1-hour response time for P1 issues. Premium Support includes a dedicated TAM, 15-minute P1 response, and proactive health checks. I'll acknowledge that the Business Starter tier has lighter support — that's a fair trade-off at $7/user. If support SLA is a priority, it drives the decision toward the right tier, which is the honest conversation to have.

**Supporting Evidence:**
- Google Workspace Enterprise: 24/7 phone support, 1-hour P1 response target (Enhanced Support).
- Premium Support: dedicated TAM, 15-minute P1 critical response.
- Google Cloud support tiers: Basic (free), Standard, Enhanced, Premium — tiered by response time and coverage.
- Technical Account Managers available for Enterprise Plus and premium support customers.

**Follow-up Question:** "What does your current Microsoft or AWS support tier look like, and what are the SLAs you actually need? Let's compare apples to apples."

---

## Objection 9: "Our clients and partners all use Office — we need to be compatible."

**Context:** Professional services firms (law, consulting, accounting), agencies, anyone who exchanges documents externally. Common in Poland and Central Europe where Office is deeply embedded.

**Response:** This is the most practical objection we hear, and it has a practical answer. Google Workspace can export every document to .docx, .xlsx, and .pptx with one click. Google Docs opens Word files natively. Gmail handles Office attachments seamlessly. For the final version of any client-facing document, you export. For your internal collaboration — the 80% of document work that stays inside your organisation — you use real-time Google Docs and gain the collaboration benefit. Many law firms and consulting firms we work with maintain a hybrid: internal work in Google Docs, client deliverables exported as .docx. It works without friction.

**Supporting Evidence:**
- Google Docs: native .docx import/export, preserving formatting for standard documents.
- Google Sheets: .xlsx compatible, including most Excel formulas and pivot tables.
- Gmail: renders Office attachments inline; users can reply with edits without leaving Gmail.
- Limitation to acknowledge: complex Word macros or Excel VBA scripts may require review before migration.

**Follow-up Question:** "What percentage of your document collaboration is internal versus external? Let's see if a hybrid approach would work for your most complex client-facing docs."

---

## Objection 10: "It's too expensive — we got a quote and it was higher than expected."

**Context:** Procurement and CFO reviews. Often triggered by a GCP list-price quote that didn't include negotiated discounts or committed use pricing.

**Response:** List price is almost never what enterprise customers pay on GCP. Google has Committed Use Discounts (1-year at 37% off, 3-year at 55% off), Sustained Use Discounts that apply automatically to compute, Flex Agreements for larger spend commitments, and private pricing negotiations for meaningful volume. If you received a quote at list price, that's the starting point for a conversation, not the final answer. The more useful exercise is a TCO comparison — what are you currently paying across all licenses, on-prem hardware, IT headcount, and maintenance? That number is usually much larger than customers realise.

**Supporting Evidence:**
- CUD: 1-year 37% off, 3-year 55% off for Compute Engine and Cloud SQL.
- SUDs: automatic, up to 30% discount for consistent N1/N2 usage.
- Flex Agreements: custom spend commitments, typically available at $1M+ annual spend.
- Google Cloud Free Tier: 20+ products with free usage each month.
- Forrester: 334% ROI, payback period under 6 months for Workspace.

**Follow-up Question:** "Can you share the quote you received so we can review whether it reflects committed pricing and applicable discounts? And would a formal TCO analysis be useful?"

---

## Objection 11: "There's no local support in Poland — we need someone we can call."

**Context:** Polish enterprises, SMBs, and public sector. Concern about time zones, language, and on-the-ground presence.

**Response:** Google has a Warsaw office and dedicated Polish enterprise account teams. Our certified partner ecosystem in Poland includes companies like Britenet, Cloudica, T-Systems Poland, and others who provide local language support, local billing, implementation services, and on-site presence. For enterprise contracts, you get a named account manager in Warsaw. The support infrastructure is real — this is not a market where Google has a token presence. We can connect you with the Warsaw team directly.

**Supporting Evidence:**
- Google Poland office: Warsaw, ul. Emilii Plater 53.
- Google Cloud certified partners in Poland: Britenet, Cloudica, Deloitte Poland, Accenture Poland.
- Google Workspace resellers in Poland with Polish-language support and local contracts.
- Google Cloud Next Warsaw: regional event presence confirming market investment.

**Follow-up Question:** "Would it be helpful to schedule a meeting with our Warsaw account team directly? I can arrange an introduction."

---

## Objection 12: "We have security concerns — can we trust Google with our data?"

**Context:** CISOs, legal teams, regulated industries (finance, healthcare, public sector). Sometimes general; sometimes specific (encryption, access, insider threat).

**Response:** I'd want to understand which specific security concern you mean, because there are very different answers for different threat models. For data encryption: Google encrypts all data at rest and in transit by default, including encryption at the storage layer that even Google SREs cannot read. For insider threat: Customer-Managed Encryption Keys (CMEK) and Access Transparency (audit log every time a Google employee accesses your data) are available. For external attack: Google's infrastructure protects against more DDoS traffic than anyone else on the planet — we absorb it because we serve YouTube and Search. What specific threat are you most worried about?

**Supporting Evidence:**
- Google encrypts data at rest with AES-256 by default.
- CMEK: customer holds the keys; Google cannot decrypt without customer permission.
- Access Transparency: real-time log of Google administrative access to customer data.
- Access Approval: customer must explicitly approve before Google support can access data.
- Google undergoes annual SOC 2 Type II, ISO 27001, and penetration testing by third parties.
- Google's BeyondCorp model (zero trust) is industry-standard and was built for Google's own internal security.

**Follow-up Question:** "Which is your primary concern — external attackers, insider access, regulatory audit trails, or data residency? I want to give you the right answer for your actual threat model."

---

## Objection 13: "We're pursuing a multi-cloud strategy — we don't want to be all-in on one vendor."

**Context:** Enterprise architects and CTOs in larger organisations. Sometimes genuine strategy; sometimes code for "we're not ready to commit."

**Response:** Multi-cloud is a valid strategy and Google supports it better than any other vendor. BigQuery Omni lets you query data in AWS S3 and Azure ADLS without moving it — your data stays where it is, Google provides the query engine. Anthos / GKE Enterprise runs Kubernetes consistently across GCP, AWS, Azure, and on-prem from a single control plane. Google's open-source commitments (Kubernetes, Knative, Istio, Terraform providers) mean your workloads are more portable from GCP than from AWS (CloudFormation) or Azure (Bicep). If multi-cloud is your goal, GCP is actually the best platform to anchor it.

**Supporting Evidence:**
- BigQuery Omni: available for AWS (us-east-1) and Azure (eastus).
- GKE Enterprise (Anthos): multi-cloud, multi-cluster management from single console.
- Google's open-source portfolio: Kubernetes, TensorFlow, Istio, Knative, Apache Beam — all vendor-neutral.
- Google Cloud's Terraform provider is one of the most complete in the ecosystem.

**Follow-up Question:** "What does your multi-cloud architecture look like today, and which workloads are you considering placing where? I'd like to show you how GCP fits into that picture rather than replace it."

---

## Objection 14: "The board won't approve a move away from Microsoft."

**Context:** IT or finance champions who want to move but face executive resistance. Usually a proxy for "we need a better business case."

**Response:** Board resistance to Microsoft usually comes from familiarity and perceived risk, not an objective analysis. The business case needs to answer two questions: what does it cost to stay, and what does it cost to move? The cost-to-stay is rarely modelled — it includes upcoming E3/E5 renewals, Copilot if Microsoft is pushing it, Intune licensing, and the hidden costs of IT complexity. We can help you build a board-ready TCO model that quantifies the current state honestly. Most boards respond to a well-constructed financial case. Boards don't actually care about Microsoft specifically — they care about risk and cost.

**Supporting Evidence:**
- Forrester TEI: 334% ROI for 5,000-user Google Workspace deployment.
- Payback period in Forrester study: under 6 months.
- Cost avoidance of Copilot: $30/user/month avoided = $360/user/year.
- Reference: ask Google account team for board-level case studies in your industry.

**Follow-up Question:** "What objection does the board have specifically — cost of migration, risk of disruption, or unfamiliarity? If we know the exact concern, we can build a deck that addresses it directly."

---

## Objection 15: "Our union or works council will push back on workforce monitoring."

**Context:** European enterprises, especially German-speaking (Betriebsrat), Dutch, Polish (Związki Zawodowe), and Scandinavian. Raised during procurement or legal review.

**Response:** This is a real process consideration in Europe and it's worth planning for. Google Workspace does not enable employee surveillance by default. Activity reports exist for admins, but they measure system usage at aggregate level, not individual keystrokes or message content. The relevant principle is: turn on only what you need, document the purpose, and get works council sign-off on the data processing agreement. Many of our European customers have completed this process — the key is engaging the works council early, not late. We can provide the data processing documentation in Polish/German/Dutch that makes this process faster.

**Supporting Evidence:**
- Google Workspace Admin Console: audit logs for security events, not surveillance of content.
- GDPR data processing agreement available from Google in all EU languages.
- Google Workspace has no built-in "employee monitoring" product — it would require third-party add-ons.
- EU customers: Works council engagement guide available from Google's compliance team.

**Follow-up Question:** "Have you mapped out which specific data processing activities would be in scope for works council review? That shapes what documentation we'd need to provide."

---

## Objection 16: "Our data must stay on-premises — we can't move to cloud."

**Context:** Public sector, financial services, defence contractors, and companies with strict data residency requirements. Sometimes a hard constraint; sometimes an assumption that hasn't been tested.

**Response:** Let's separate the actual requirement from the assumption. There are very few regulatory frameworks in Poland or the EU that absolutely prohibit cloud — most say "must be protected" or "must be within EU," which cloud can satisfy. KNF guidelines for Polish financial services, for instance, address cloud risk management but do not prohibit cloud use. For workloads that genuinely must stay on-prem, Google has Distributed Cloud (a rack you own, Google manages the software stack) and GKE on-prem options. For the rest, Google Cloud's EU data boundary and Warsaw/nearby region options often satisfy the actual requirement. What is the specific regulation or internal policy that drives the on-prem requirement?

**Supporting Evidence:**
- Google Distributed Cloud (GDC): on-premises hardware running Google Cloud software. Data never leaves your data centre.
- Google Cloud regions near Poland: europe-central2 (Warsaw), europe-west1 (Belgium), europe-west4 (Netherlands).
- KNF Cloud Guidelines: risk-based, not cloud-prohibitive. Requires risk assessment, not on-prem mandate.
- UKNF recommendation on cloud: supports cloud adoption with appropriate controls.

**Follow-up Question:** "Can you share the specific policy or regulation that requires on-prem? I want to make sure we're addressing the actual constraint and not an assumption."

---

## Objection 17: "We just renewed our Microsoft agreement — we're locked in for 2 years."

**Context:** Procurement, IT, or finance contacts who have recently signed. Common objection used to postpone conversation entirely.

**Response:** A renewal doesn't mean now is the wrong time to have this conversation — it means we have a defined window. Two years is how long it takes to run a proper pilot, build internal expertise, migrate a department or workload, and prepare a board-level case for the renewal decision. The companies that get the best outcomes from Google are the ones who started planning 18 months before their Microsoft contract ended, not 18 days. We can structure a pilot within your current Microsoft environment — run Google Workspace for one team, compare productivity, quantify the difference — so the decision at renewal is evidence-based, not a leap of faith.

**Supporting Evidence:**
- Typical migration timeline: 6–12 months for full enterprise migration.
- Pilot program: Google can provide trial Workspace licences for a pilot group.
- Cost: running a parallel pilot is low cost relative to the renewal decision it informs.
- Vendor neutrality during pilot: Microsoft and Google can coexist during transition.

**Follow-up Question:** "When does your Microsoft agreement renew? That gives us a target date to work backwards from."

---

## Objection 18: "Microsoft Copilot is better than Gemini for our use case."

**Context:** Technical and business users who have seen Copilot demos. Often raised after Microsoft has done a Copilot presentation.

**Response:** Copilot is genuinely good — I won't pretend otherwise. The relevant question is whether it's $30/user/month better than Gemini, which is included in your Workspace licence. For Microsoft-specific workflows (complex Excel models, Teams meeting summaries, Outlook email drafting) Copilot is well-integrated. But Gemini's 1-million token context window, grounding in Google Search for live information, and native integration with Google Docs, Gmail, and Meet are significant. The more important question is: what's your primary use case for AI? If it's document drafting, email, and meeting summaries — both products do that well. If it's deep research, coding, or multimodal tasks, Gemini has advantages. Let's look at your specific use case.

**Supporting Evidence:**
- Gemini 1.5 Pro: 1M token context window (longest available in enterprise products).
- Gemini grounding: can search Google Search in real time for current information; Copilot uses Microsoft Graph (internal only, no live web in standard mode).
- Pricing: Gemini included from Business Standard ($14); Copilot is $30/user add-on.
- Gemini in Google Meet: real-time translation captions in 70+ languages (Copilot in Teams has fewer languages).

**Follow-up Question:** "What specific tasks are you hoping AI will help your team with most? Let's run a side-by-side on those exact use cases."

---

## Objection 19: "There's no Polish language support in Google products."

**Context:** Polish-language users, HR teams, frontline workers, office administrators. More common in non-technical roles.

**Response:** Google Workspace has full Polish language support: Gmail, Docs, Sheets, Slides, Calendar, and Meet all run natively in Polish. Google Meet live captions support Polish. Gemini in Workspace handles Polish-language inputs effectively. Google Search is obviously native in Polish. The admin console, end-user interfaces, and support documentation are all available in Polish. If you've seen older screenshots or tried older product versions, the Polish localisation has improved significantly over the past few years. I'm happy to arrange a live demo in Polish so you can see the current state directly.

**Supporting Evidence:**
- Google Workspace interface available in Polish.
- Google Meet live captions: Polish supported.
- Gemini (Workspace): handles Polish language prompts.
- Google support for Polish enterprise customers: Polish-speaking support available in Enterprise tiers.

**Follow-up Question:** "Which specific product feature or workflow were you most concerned about in Polish? I'd like to show you the current experience."

---

## Objection 20: "We're worried about vendor lock-in with GCP."

**Context:** Enterprise architects and procurement teams. Often raised late in evaluation as a risk management concern.

**Response:** This is the most ironic objection in cloud sales, because Google has done more to prevent lock-in than any other cloud vendor. Kubernetes was open-sourced by Google — your container workloads can run on any cloud. Terraform providers for GCP are fully open. BigQuery exports to standard formats (Parquet, CSV, Avro). Cloud Storage uses standard object storage APIs. Google's commitment to open source (Kubernetes, Istio, Knative, TensorFlow, Apache Beam) is structural, not marketing. Compare that to AWS CloudFormation (proprietary) or Azure Bicep (proprietary). The vendor most concerned about your ability to leave is the one that makes leaving expensive. Google's open-source investments make workload portability real.

**Supporting Evidence:**
- Kubernetes: created and open-sourced by Google. Runs on AWS (EKS), Azure (AKS), and on-prem equally.
- Apache Beam / Cloud Dataflow: portable data pipelines.
- BigQuery: standard SQL, exports in Parquet/Avro/CSV.
- Istio / Knative: open-source, runs on any Kubernetes cluster.
- Google's data portability: Takeout equivalent for Workspace — download all data in open formats.
- AWS CloudFormation: proprietary JSON/YAML with no portability.

**Follow-up Question:** "Which specific workloads are you most concerned about portability for? Let's look at what the actual migration path would be if you needed to move in three years."
