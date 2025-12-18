import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                Privacy Policy
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
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Welcome to Talk to me Data ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website talktomedata.com and use our services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information You Disclose to Us</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Register for an account</li>
                    <li>Express an interest in obtaining information about us or our products and services</li>
                    <li>Participate in activities on the website</li>
                    <li>Contact us</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    The personal information we collect may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Name and Contact Data:</strong> Your first and last name, email address, and other similar contact information</li>
                    <li><strong>Account Credentials:</strong> Passwords and similar security information used for authentication</li>
                    <li><strong>Payment Information:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number and security code</li>
                    <li><strong>Website URLs:</strong> URLs of websites you analyze using our service</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Information Automatically Collected</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We automatically collect certain information when you visit, use, or navigate the website. This information may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Log and Usage Data:</strong> Service-related, diagnostic, usage, and performance information</li>
                    <li><strong>Device Data:</strong> Information about your device, operating system, and browser</li>
                    <li><strong>Location Data:</strong> General location information based on your IP address</li>
                  </ul>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use the information we collect or receive to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Process your website analysis requests</li>
                    <li>Send you technical notices, updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Communicate with you about products, services, offers, and events</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                    <li>Detect, prevent, and address technical issues and security breaches</li>
                    <li>Improve and personalize your experience on our website</li>
                  </ul>
                </section>

                {/* Sharing Your Information */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf</li>
                    <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, or legal process</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    We do not sell your personal information to third parties.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We use cookies and similar tracking technologies to track activity on our service and store certain information. We use the following types of cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics, PostHog)</li>
                    <li><strong>Functional Cookies:</strong> Enable personalized features and remember your preferences</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                  </p>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                  </p>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                  </p>
                </section>

                {/* Your Privacy Rights */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time where we rely on consent to process your information</li>
                    <li><strong>Opt-out:</strong> Opt-out of marketing communications at any time</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    To exercise these rights, please contact us at nas@talktomedata.com
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Our website may contain links to third-party websites and uses the following third-party services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Google Analytics:</strong> For website analytics</li>
                    <li><strong>PostHog:</strong> For product analytics</li>
                    <li><strong>Vercel:</strong> For website hosting</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    These third-party services have their own privacy policies. We encourage you to review their privacy policies.
                  </p>
                </section>

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.
                  </p>
                </section>

                {/* International Data Transfers */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. By using our services, you consent to the transfer of your information to our facilities and those third parties with whom we share it as described in this privacy policy.
                  </p>
                </section>

                {/* Updates to This Policy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this privacy policy. We encourage you to review this privacy policy frequently to stay informed about how we are protecting your information.
                  </p>
                </section>

                {/* Contact Us */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you have questions or comments about this privacy policy, you may contact us at:
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