import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const COMPANY = "Talk to Me Data"
const EFFECTIVE_DATE = "July 23, 2026"
const CONTACT_EMAIL = "nas@talktomedata.com"
const LEGAL_ENTITY = "MATUTTO FZ-LLC"
// TODO (legal): fill in the governing law / arbitration forum / seat before publishing.
// Left as visible placeholders for now (jurisdiction intentionally not stated yet).
const GOVERNING_LAW = "[GOVERNING LAW — TO BE CONFIRMED]"
const ARBITRATION_FORUM = "[ARBITRATION FORUM — TO BE CONFIRMED]"
const ARBITRATION_SEAT = "[SEAT OF ARBITRATION — TO BE CONFIRMED]"

export const metadata: Metadata = {
  title: "Terms of Service | Talk to Me Data",
  description:
    "The Terms of Service governing access to and use of Talk to Me Data's website, AI agents, automation, and related services.",
  alternates: { canonical: "https://talktomedata.com/terms-of-service" },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">Last updated: {EFFECTIVE_DATE}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">

                {/* Important notice */}
                <section className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
                  <h2 className="text-xl font-bold mb-3">Important Notice — Please Read Carefully</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These Terms of Service (the &quot;Terms&quot;) are a binding legal agreement. By accessing or using the
                    Services, you accept all of these Terms. They contain provisions that significantly affect your legal
                    rights, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      a <strong>binding individual arbitration</strong> requirement and a <strong>waiver of class
                      actions and jury trials</strong> (see &quot;Dispute Resolution&quot;);
                    </li>
                    <li>
                      broad <strong>disclaimers of warranties</strong> and a <strong>cap on our total liability</strong>
                      {" "}(see &quot;Disclaimers&quot; and &quot;Limitation of Liability&quot;);
                    </li>
                    <li>
                      your obligation to <strong>indemnify and defend us</strong>, and your <strong>assumption of all
                      risk</strong> arising from your use of the Services and any AI-generated output;
                    </li>
                    <li>
                      a <strong>shortened time limit</strong> within which claims must be brought.
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    If you do not agree to these Terms, you must not access or use the Services. Nothing in these Terms
                    excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or
                    condition, that applicable law says cannot be excluded, restricted, or modified.
                  </p>
                </section>

                {/* 1. Agreement */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Agreement to These Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    These Terms govern your access to and use of the websites, applications, application programming
                    interfaces, AI agents, automations, integrations, content, and other products and services made
                    available by {LEGAL_ENTITY} and its affiliates (collectively, &quot;{COMPANY},&quot; &quot;we,&quot;
                    &quot;us,&quot; or &quot;our&quot;) (collectively, the &quot;Services&quot;). By accessing, browsing,
                    registering for, or using the Services in any manner, or by clicking to accept these Terms where that
                    option is made available, you (&quot;you,&quot; &quot;your,&quot; the &quot;Customer,&quot; or the
                    &quot;User&quot;) agree to be bound by these Terms and by all policies, guidelines, and documents
                    incorporated by reference, including our Privacy Policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms apply to the fullest extent permitted by applicable law in every jurisdiction from which
                    you access or use the Services, including without limitation the United States, the United Kingdom,
                    the European Economic Area, the United Arab Emirates, and the wider Middle East. If any additional
                    order form, statement of work, subscription plan, or written agreement is executed between you and us,
                    it forms part of these Terms; in the event of a conflict, the more specific executed document controls
                    for the subject matter it addresses, and these Terms otherwise apply.
                  </p>
                </section>

                {/* 2. Definitions */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>&quot;AI Output&quot;</strong> means any content, text, code, classification, ranking, recommendation, message, or other result generated, drafted, suggested, or produced by or through the Services, including by any AI agent, model, or automation.</li>
                    <li><strong>&quot;Customer Data&quot;</strong> means any data, content, materials, credentials, prompts, instructions, URLs, files, or information that you or your end users submit to, connect to, or process through the Services.</li>
                    <li><strong>&quot;Third-Party Services&quot;</strong> means any third-party product, platform, model provider, API, integration, or service that interoperates with, is accessed through, or is used to deliver the Services.</li>
                    <li><strong>&quot;Applicable Law&quot;</strong> means all laws, regulations, and rules applicable to a party.</li>
                    <li><strong>&quot;including&quot;</strong> means &quot;including without limitation,&quot; and lists are illustrative and non-exhaustive.</li>
                  </ul>
                </section>

                {/* 3. Description of Services */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Description of the Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {COMPANY} designs, builds, hosts, and operates AI agents and automations and provides related
                    analysis, advisory, and software services, which may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>building, configuring, deploying, hosting, and maintaining AI agents and automated workflows;</li>
                    <li>customer support, lead generation and qualification, booking and scheduling, invoice and document processing, data entry and reporting, social media, SEO/GEO, and similar automations;</li>
                    <li>website, conversion, SEO, UX, messaging, and performance analysis and recommendations;</li>
                    <li>integrations with Third-Party Services and connectors selected or approved by you.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    The Services are provided for business and professional use. The specific scope, features, models,
                    integrations, and availability of the Services may be added to, changed, limited, suspended, or
                    discontinued by us at any time, with or without notice, in our sole discretion, to the maximum extent
                    permitted by Applicable Law.
                  </p>
                </section>

                {/* 4. AI Output */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Artificial Intelligence — No Reliance</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You understand and expressly acknowledge that the Services rely on artificial intelligence, machine
                    learning, probabilistic models, and Third-Party Services, and that AI Output:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>may be inaccurate, incomplete, outdated, biased, offensive, or otherwise wrong, and may &quot;hallucinate&quot; or fabricate information;</li>
                    <li>is generated automatically, is not reviewed by us for accuracy, legality, or fitness, and does not represent our advice, opinion, endorsement, or a statement of fact;</li>
                    <li>must be independently reviewed, verified, and approved by you and by a suitably qualified human before it is relied upon, published, sent to any third party, or used to make any decision.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    The Services and all AI Output are provided for informational purposes only and do not constitute
                    legal, financial, tax, accounting, medical, employment, or other professional advice. You are solely
                    and exclusively responsible for any use of, reliance on, decision made from, or communication of AI
                    Output, and for all resulting outcomes. To the maximum extent permitted by Applicable Law, you assume
                    all risk arising from AI Output and its use.
                  </p>
                </section>

                {/* 5. Eligibility & Accounts */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Eligibility, Authority, and Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    By using the Services, you represent and warrant that you are at least 18 years old (or the age of
                    majority in your jurisdiction), have the legal capacity and, where you act on behalf of an entity, the
                    authority to bind that entity to these Terms, and are not barred from using the Services under any
                    Applicable Law. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>providing accurate, current, and complete information and keeping it up to date;</li>
                    <li>maintaining the confidentiality and security of your account credentials and any connected accounts, keys, or tokens;</li>
                    <li>all activities, instructions, and transactions that occur under your account or through your integrations, whether or not authorized by you;</li>
                    <li>promptly notifying us of any suspected unauthorized access or security incident.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We may refuse, suspend, or terminate any account and may reclaim any identifier at our sole discretion,
                    to the maximum extent permitted by Applicable Law.
                  </p>
                </section>

                {/* 6. Customer responsibilities */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">6. Customer Responsibilities, Warranties, and Assumption of Risk</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You bear sole responsibility for your business, your use of the Services, your Customer Data, your
                    configurations and instructions, your end users and customers, and all results and consequences of the
                    foregoing. To the maximum extent permitted by Applicable Law, you represent, warrant, and covenant that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>you have all rights, consents, licenses, and lawful bases necessary to submit and process the Customer Data and to connect any Third-Party Services, including all data-protection consents and notices required for any personal data;</li>
                    <li>your use of the Services, the Customer Data, and the AI Output complies with all Applicable Laws, including data protection, privacy, marketing, consumer protection, advertising, intellectual property, export, sanctions, and anti-spam laws;</li>
                    <li>you are responsible for reviewing, testing, monitoring, and approving all AI agents, automations, and AI Output before and during use, and for implementing appropriate human oversight, backups, and safeguards;</li>
                    <li>you will not use the Services in any high-risk context where failure, error, or inaccuracy could lead to death, personal injury, or environmental, financial, or property damage, and you assume all risk if you do;</li>
                    <li>you are solely responsible for all communications, transactions, decisions, and content produced, sent, or actioned by or through your agents, including to and with your own customers and third parties.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You knowingly and voluntarily assume all risks associated with your access to and use of the Services
                    and the AI Output, whether known or unknown.
                  </p>
                </section>

                {/* 7. Customer data & data protection */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Customer Data, Licenses, and Data Protection</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    As between the parties, you retain all ownership rights in your Customer Data. You grant us and our
                    subprocessors a worldwide, non-exclusive, royalty-free license to host, copy, transmit, display,
                    process, and otherwise use the Customer Data and derived data to provide, secure, maintain, and improve
                    the Services and to comply with law. You are responsible for the accuracy, quality, legality, and
                    backup of your Customer Data.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Where we process personal data on your behalf, we act as processor and you act as controller (as those
                    terms are used under the EU/UK GDPR and comparable laws), and such processing is governed by our Data
                    Processing Addendum, which is incorporated by reference and available on request. You are solely
                    responsible, as controller, for the lawfulness of the personal data you provide and instruct us to
                    process. Our collection and use of information is further described in our Privacy Policy.
                  </p>
                </section>

                {/* 8. Third-party */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Third-Party Services and Integrations</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Services may rely on, link to, or interoperate with Third-Party Services (for example, AI model
                    providers, cloud hosting, messaging platforms, spreadsheets, CRMs, and payment processors). We do not
                    control and are not responsible or liable for Third-Party Services, their availability, changes,
                    pricing, terms, acts, omissions, or content, and your use of them is at your own risk and subject to
                    their own terms. Any suspension, deprecation, rate-limiting, or failure of a Third-Party Service is not
                    our responsibility, and we may modify or remove integrations at any time.
                  </p>
                </section>

                {/* 9. Acceptable use */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">9. Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">You agree not to, and not to permit anyone to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>violate any Applicable Law or third-party right, or use the Services for any unlawful, harmful, deceptive, fraudulent, or infringing purpose;</li>
                    <li>generate, send, or facilitate spam, unsolicited communications, malware, or unlawful, harassing, defamatory, or harmful content;</li>
                    <li>attempt to gain unauthorized access to, probe, scan, disrupt, overload, or interfere with the Services or related systems, or circumvent any security or usage limit;</li>
                    <li>reverse engineer, decompile, disassemble, scrape, or attempt to derive source code, models, or trade secrets, except to the extent this restriction is prohibited by Applicable Law;</li>
                    <li>use the Services to build a competing product, or resell, sublicense, or provide the Services to third parties except as expressly authorized;</li>
                    <li>use the Services on websites, data, or accounts you do not own or lack authorization to use;</li>
                    <li>use output to train a competing AI model, or misrepresent AI Output as human-generated where prohibited.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We may investigate and take any action we deem appropriate, including suspension or termination and
                    cooperation with authorities, for any actual or suspected violation.
                  </p>
                </section>

                {/* 10. Fees */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">10. Fees, Billing, Taxes, and Renewals</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You agree to pay all fees for the Services in accordance with the applicable plan, order form, or quote, in advance and in the currency stated.</li>
                    <li>Unless required by Applicable Law, all fees are non-cancellable and <strong>non-refundable</strong>, and payments are not contingent on any future functionality or output.</li>
                    <li>Fees are exclusive of taxes, duties, and levies, which are your responsibility; where we are required to collect them, they will be added to your invoice.</li>
                    <li>Subscriptions <strong>automatically renew</strong> for successive periods at the then-current rates unless cancelled before the renewal date; you authorize recurring charges to your payment method.</li>
                    <li>We may change pricing prospectively; late or failed payments may result in suspension, and you are responsible for costs of collection.</li>
                    <li>Payments are processed by third-party processors, and you are responsible for the accuracy of the payment information you provide.</li>
                  </ul>
                </section>

                {/* 11. IP */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The Services, including all software, models, prompts, workflows, designs, content, and documentation,
                    and all intellectual property rights therein, are and remain the exclusive property of {COMPANY} and
                    its licensors, and are protected by copyright, trademark, patent, trade secret, and other laws. Subject
                    to your compliance with these Terms and payment of applicable fees, we grant you a limited,
                    non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Services
                    for your internal business purposes during your subscription term. All rights not expressly granted are
                    reserved.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Feedback.</strong> If you provide suggestions, ideas, or feedback, you grant us a perpetual,
                    irrevocable, worldwide, royalty-free license to use and exploit them without restriction or
                    compensation.
                  </p>
                </section>

                {/* 12. Confidentiality */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">12. Confidentiality</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Each party may access the other&apos;s confidential information. The receiving party will use it only to
                    perform under these Terms, protect it with reasonable care, and not disclose it except to personnel and
                    advisers who need to know and are bound by confidentiality. This section does not apply to information
                    that is public, independently developed, or rightfully received from a third party, and does not
                    prevent disclosure required by law.
                  </p>
                </section>

                {/* 13. Availability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">13. Availability, Changes, and Beta Features</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We do not warrant that the Services will be uninterrupted, timely, secure, error-free, or that results
                    or AI Output will be accurate or reliable. We may modify, update, suspend, throttle, or discontinue any
                    part of the Services, and may perform maintenance, at any time. Any pre-release, trial, or &quot;beta&quot;
                    features are provided &quot;as is,&quot; may be changed or withdrawn, and are used at your own risk.
                  </p>
                </section>

                {/* 14. Termination */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">14. Suspension and Termination</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We may suspend or terminate your access to all or part of the Services immediately, with or without
                    notice, for any reason or no reason, including any actual or suspected breach of these Terms, risk to
                    the Services or others, non-payment, or as required by law. You may stop using the Services and cancel
                    in accordance with your plan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon termination, your license and right to use the Services cease immediately. We may delete Customer
                    Data after termination, and you are responsible for exporting it beforehand. All provisions that by
                    their nature should survive termination will survive, including Sections on AI Output, Customer
                    Responsibilities, Intellectual Property, Fees, Disclaimers, Limitation of Liability, Indemnification,
                    Release, Dispute Resolution, and these general provisions.
                  </p>
                </section>

                {/* 15. Disclaimers */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">15. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES, ALL AI OUTPUT, AND ALL RELATED
                    MATERIALS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITH ALL FAULTS AND WITHOUT
                    WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING ANY IMPLIED
                    WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE,
                    TITLE, ACCURACY, AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF
                    TRADE.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    WE DO NOT WARRANT THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, THAT AI OUTPUT WILL BE ACCURATE,
                    LAWFUL, OR FIT FOR ANY PURPOSE, OR THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. SOME
                    JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT
                    APPLY TO YOU; IN THAT CASE, SUCH WARRANTIES ARE LIMITED TO THE MINIMUM SCOPE AND DURATION REQUIRED BY
                    APPLICABLE LAW.
                  </p>
                </section>

                {/* 16. Limitation of liability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">16. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL {COMPANY.toUpperCase()}, ITS
                    AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS, LICENSORS, OR
                    SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
                    DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, GOODWILL, BUSINESS, ANTICIPATED SAVINGS, DATA, OR USE,
                    OR FOR BUSINESS INTERRUPTION OR THE COST OF SUBSTITUTE SERVICES, ARISING OUT OF OR RELATED TO THE
                    SERVICES, THE AI OUTPUT, OR THESE TERMS, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT
                    LIABILITY, OR OTHERWISE, AND WHETHER OR NOT WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING
                    OUT OF OR RELATED TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNTS
                    YOU ACTUALLY PAID TO US FOR THE SERVICES IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING
                    RISE TO THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (US$100). THESE LIMITATIONS ARE AN ESSENTIAL BASIS
                    OF THE BARGAIN AND APPLY EVEN IF A REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Nothing in these Terms limits or excludes liability that cannot be limited or excluded under Applicable
                    Law, such as, in certain jurisdictions, liability for death or personal injury caused by negligence,
                    for fraud or fraudulent misrepresentation, or for a party&apos;s gross negligence or wilful misconduct.
                    Where liability cannot lawfully be excluded but may be limited, our liability is limited to the maximum
                    extent permitted by Applicable Law. Some jurisdictions do not allow certain limitations, so parts of
                    this section may not apply to you.
                  </p>
                </section>

                {/* 17. Indemnification */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">17. Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by Applicable Law, you will defend, indemnify, and hold harmless
                    {" "}{COMPANY} and its affiliates and their respective officers, directors, employees, contractors,
                    agents, licensors, and suppliers (the &quot;Indemnified Parties&quot;) from and against any and all
                    claims, demands, actions, investigations, liabilities, damages, penalties, fines, losses, costs, and
                    expenses (including reasonable legal fees) arising out of or related to: (a) your access to or use of
                    the Services; (b) your Customer Data or Third-Party Services; (c) any AI Output you use, publish,
                    transmit, or rely upon; (d) your products, services, or communications, including to your own
                    customers and end users; (e) your violation of these Terms or any Applicable Law or third-party right;
                    or (f) your negligence or misconduct. We may, at our option, control the defense of any matter subject
                    to indemnification, and you will cooperate; you will not settle any matter in a way that imposes any
                    obligation or admission on an Indemnified Party without our prior written consent.
                  </p>
                </section>

                {/* 18. Release & covenant not to sue */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">18. Release and Covenant Not to Sue</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To the maximum extent permitted by Applicable Law, you release and forever discharge the Indemnified
                    Parties from any and all claims, damages, and disputes arising out of or related to the Services or the
                    acts or omissions of any third party, and you agree not to bring, assert, or participate in any claim
                    against the Indemnified Parties except strictly in accordance with the &quot;Dispute Resolution&quot;
                    section below. Any claim brought other than as permitted by these Terms may be dismissed, and you agree
                    to be responsible for the resulting costs to the maximum extent permitted by Applicable Law.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you are a California resident, you waive California Civil Code Section 1542, which states: &quot;A
                    general release does not extend to claims that the creditor or releasing party does not know or suspect
                    to exist in his or her favor at the time of executing the release, and that, if known by him or her,
                    would have materially affected his or her settlement with the debtor or released party.&quot; You waive
                    any comparable provision of any other jurisdiction to the extent permitted by law.
                  </p>
                </section>

                {/* 19. Time limit */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">19. Time Limitation on Claims</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by Applicable Law, any claim or cause of action arising out of or
                    related to the Services or these Terms must be commenced within twelve (12) months after the claim or
                    cause of action arose; otherwise, it is permanently barred. Where such a limitation is not permitted,
                    the shortest period permitted by Applicable Law applies.
                  </p>
                </section>

                {/* 20. Force majeure */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">20. Force Majeure</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We will not be liable for any delay or failure to perform resulting from causes beyond our reasonable
                    control, including acts of God, natural disasters, epidemics or pandemics, war, terrorism, civil
                    unrest, government action, sanctions, labor disputes, internet or utility failures, cyber-attacks, or
                    the failure, change, or unavailability of any Third-Party Service, model provider, or hosting provider.
                  </p>
                </section>

                {/* 21. Dispute resolution */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">21. Governing Law and Dispute Resolution</h2>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Governing Law</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms and any dispute arising out of or related to them or the Services are governed by the laws
                    of {GOVERNING_LAW}, without regard to conflict-of-laws principles, and excluding the United Nations
                    Convention on Contracts for the International Sale of Goods, except where mandatory local consumer-
                    protection law of your place of residence requires otherwise.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Binding Arbitration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Except as set out below, any dispute, controversy, or claim arising out of or in connection with the
                    Services or these Terms, including their existence, validity, interpretation, performance, breach, or
                    termination, will be finally and exclusively resolved by binding arbitration administered by
                    {" "}{ARBITRATION_FORUM} under its rules then in force, which rules are deemed incorporated by
                    reference. The seat of arbitration will be {ARBITRATION_SEAT}; the tribunal will consist of one
                    arbitrator; and the language will be English. Judgment on the award may be entered in any court of
                    competent jurisdiction.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Class Action and Jury Trial Waiver</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by Applicable Law, all disputes will be conducted only on an
                    individual basis and not as a plaintiff or class member in any purported class, consolidated,
                    representative, or collective proceeding, and the arbitrator may not consolidate more than one
                    person&apos;s claims. TO THE EXTENT ANY DISPUTE PROCEEDS IN COURT, EACH PARTY WAIVES ANY RIGHT TO A
                    JURY TRIAL. If this class-action waiver is found unenforceable as to a particular claim, that claim
                    (and only that claim) will be severed and may proceed in court.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Exceptions and Injunctive Relief</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Either party may bring an action in a court of competent jurisdiction solely to seek injunctive or
                    equitable relief to protect its intellectual property or confidential information, or to collect
                    amounts due. Nothing in this section prevents you from bringing an issue to the attention of a
                    government authority, or deprives you of any right to a mandatory forum or remedy that Applicable Law
                    provides and that cannot be waived.
                  </p>
                </section>

                {/* 22. Regional */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">22. Region-Specific Provisions</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The following provisions apply where you access or use the Services from the relevant region and, to
                    the extent of any conflict with the rest of these Terms, control for that region.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">United States</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Federal Arbitration Act governs the interpretation and enforcement of the arbitration provisions.
                    The Services are a &quot;commercial item&quot; and any U.S. government use is subject to restricted
                    rights. You represent that you are not on any U.S. sanctions list and are not located in an embargoed
                    territory. Consumer protections that cannot be waived under the law of your state of residence remain
                    available to you.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">European Economic Area, United Kingdom, and Switzerland</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Nothing in these Terms affects your mandatory statutory rights as a consumer that cannot be excluded or
                    limited by contract, and no term applies to the extent it is an &quot;unfair term&quot; under
                    Applicable Law. If you are a consumer, you may rely on the mandatory consumer-protection laws of your
                    country of residence, and you may be entitled to bring proceedings in your local courts. Where the
                    GDPR or UK GDPR applies, our Data Processing Addendum and Privacy Policy govern personal-data
                    processing. Limitations of liability in these Terms do not exclude or limit liability for death or
                    personal injury caused by negligence, for fraud, or for any other liability that cannot lawfully be
                    excluded.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">United Arab Emirates and the Middle East</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Where you access the Services from the UAE or another Middle East jurisdiction, you agree that the
                    governing law and arbitration provisions above apply to the maximum extent permitted, and that where
                    mandatory local law (including applicable consumer-protection, e-commerce, and public-order rules)
                    requires, such local law applies to that extent only. You are responsible for ensuring that your use
                    of the Services and any AI Output complies with local content, cultural, licensing, and regulatory
                    requirements in your jurisdiction.
                  </p>
                </section>

                {/* 23. Export & sanctions */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">23. Export Controls and Sanctions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You must comply with all applicable export, re-export, and sanctions laws and regulations. You
                    represent that you are not located in, and will not use the Services in or for the benefit of, any
                    country or party subject to comprehensive sanctions or embargoes, and that you are not a restricted or
                    denied party. You are responsible for any breach of this section.
                  </p>
                </section>

                {/* 24. General */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">24. General Provisions</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Changes to the Terms.</strong> We may modify these Terms at any time. Material changes will be notified by posting the updated Terms with a new &quot;Last updated&quot; date or by other reasonable means. Your continued use after changes take effect constitutes acceptance, to the extent permitted by Applicable Law.</li>
                    <li><strong>Assignment.</strong> You may not assign or transfer these Terms without our prior written consent; we may assign them freely, including in connection with a merger, acquisition, or sale of assets.</li>
                    <li><strong>Notices.</strong> We may provide notices by email, through the Services, or by posting on our website; you consent to receiving communications electronically.</li>
                    <li><strong>No waiver.</strong> Our failure to enforce any provision is not a waiver, and no waiver is effective unless in writing.</li>
                    <li><strong>Severability.</strong> If any provision is held invalid or unenforceable, it will be modified to the minimum extent necessary or severed, and the remaining provisions will remain in full force and effect.</li>
                    <li><strong>Entire agreement.</strong> These Terms, together with any order form, our Privacy Policy, and documents incorporated by reference, are the entire agreement between you and us regarding the Services and supersede all prior understandings.</li>
                    <li><strong>No third-party beneficiaries.</strong> Except for the Indemnified Parties, there are no third-party beneficiaries to these Terms.</li>
                    <li><strong>Independent contractors.</strong> The parties are independent contractors; these Terms create no agency, partnership, or joint venture.</li>
                    <li><strong>Survival and headings.</strong> Provisions that should survive termination will survive. Headings are for convenience only. In the event of any conflict between translations, the English version controls to the extent permitted by Applicable Law.</li>
                  </ul>
                </section>

                {/* 25. Contact */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">25. Contact</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Questions about these Terms may be directed to:
                  </p>
                  <div className="bg-muted/30 rounded-lg p-6 space-y-2">
                    <p className="font-semibold">{COMPANY}</p>
                    <p className="text-muted-foreground">Email: {CONTACT_EMAIL}</p>
                    <p className="text-muted-foreground">Website: https://talktomedata.com</p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
