import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    These Terms of Service ("Terms") govern your access to and use of Talk to me Data's website, products, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you do not agree to these Terms, you may not access or use the Services.
                  </p>
                </section>

                {/* Services Description */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Description of Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Talk to me Data provides AI-powered website analysis services, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>SEO analysis and optimization recommendations</li>
                    <li>UX and usability audits</li>
                    <li>Website messaging and copywriting reviews</li>
                    <li>Performance and speed optimization insights</li>
                    <li>Mobile responsiveness analysis</li>
                    <li>Website structure and navigation evaluation</li>
                  </ul>
                </section>

                {/* Account Registration */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To access certain features of our Services, you may be required to create an account. When you create an account, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept all responsibility for all activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or misleading.
                  </p>
                </section>

                {/* Acceptable Use */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You agree not to use the Services to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the intellectual property rights of others</li>
                    <li>Transmit any harmful, threatening, abusive, or defamatory content</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use automated systems (bots, scrapers) without our written permission</li>
                    <li>Analyze websites you do not own or have permission to analyze</li>
                    <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                    <li>Resell or redistribute the Services without authorization</li>
                  </ul>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Our Intellectual Property</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The Services, including all content, features, and functionality, are owned by Talk to me Data and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Your Content</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you submit website URLs or other content to our Services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You retain all ownership rights to your content</li>
                    <li>You grant us a license to use, store, and process your content solely to provide the Services</li>
                    <li>You represent that you have the right to submit the content and grant us this license</li>
                  </ul>
                </section>

                {/* Subscription and Payment */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Subscription and Payment Terms</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Pricing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our pricing is available on our pricing page. We reserve the right to modify our prices at any time. Price changes will not affect existing subscriptions until renewal.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Billing</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Subscriptions are billed in advance on a monthly or annual basis</li>
                    <li>Payment is due immediately upon subscription</li>
                    <li>We use third-party payment processors to handle payment transactions</li>
                    <li>All fees are non-refundable except as required by law or as explicitly stated in these Terms</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Automatic Renewal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. You can cancel your subscription at any time through your account settings.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Free Trial</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may offer a free trial for certain subscription plans. If you do not cancel before the trial period ends, you will be automatically charged for the subscription.
                  </p>
                </section>

                {/* Cancellation and Refunds */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Cancellation and Refunds</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You may cancel your subscription at any time. Upon cancellation:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You will retain access to paid features until the end of your current billing period</li>
                    <li>No refunds will be provided for partial months or unused portions of annual subscriptions</li>
                    <li>We reserve the right to offer refunds on a case-by-case basis at our sole discretion</li>
                  </ul>
                </section>

                {/* Service Availability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Service Availability and Modifications</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We strive to provide reliable service, but we do not guarantee that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                    <li>The results obtained from using the Services will be accurate or reliable</li>
                    <li>Any errors in the Services will be corrected</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We reserve the right to modify, suspend, or discontinue any part of the Services at any time with or without notice.
                  </p>
                </section>

                {/* Disclaimer of Warranties */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                    <li>Warranties that the Services will meet your requirements</li>
                    <li>Warranties regarding the accuracy or reliability of any information obtained through the Services</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    The analyses and recommendations provided by our Services are for informational purposes only and should not be considered as professional advice. You should consult with appropriate professionals before making decisions based on our Services.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, TALK TO ME DATA SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or use</li>
                    <li>Cost of procurement of substitute goods or services</li>
                    <li>Any damages arising from your use or inability to use the Services</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                  </p>
                </section>

                {/* Indemnification */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify, defend, and hold harmless Talk to me Data and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
                  </p>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Termination</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon termination, your right to use the Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Governing Law and Dispute Resolution</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization], except that either party may seek injunctive relief in court for violations of intellectual property rights.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or through a notice on our website. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.
                  </p>
                </section>

                {/* Severability */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Severability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.
                  </p>
                </section>

                {/* Entire Agreement */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Entire Agreement</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and Talk to me Data regarding the Services and supersede all prior agreements and understandings.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-muted/30 rounded-lg p-6 space-y-2">
                    <p className="font-semibold">Talk to me Data</p>
                    <p className="text-muted-foreground">Email: nas@talktomedata.com</p>
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