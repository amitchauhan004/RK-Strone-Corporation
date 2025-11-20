import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Privacy = () => {
  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="bg-card rounded-xl shadow-lg p-8">
            <ScrollArea className="h-[70vh] pr-6">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    RK Stone Corporation ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p className="text-muted-foreground">
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                </section>

                <Separator />

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    <p className="text-muted-foreground">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Register on our website</li>
                      <li>Place an order</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us for support</li>
                      <li>Participate in surveys or promotions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6">Information may include:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Name and contact details</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information</li>
                      <li>Email communications</li>
                      <li>Order history</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* Automatically Collected Information */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Automatically Collected Information</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      When you visit our website, we automatically collect certain information about your device, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>IP address</li>
                      <li>Browser type</li>
                      <li>Operating system</li>
                      <li>Access times</li>
                      <li>Pages viewed</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">How We Use Your Information</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Process and fulfill your orders</li>
                      <li>Communicate with you about products and services</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Improve our website and services</li>
                      <li>Protect against fraud and unauthorized transactions</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* Information Sharing */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Information Sharing</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We may share your information with:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Service providers (payment processors, shipping companies)</li>
                      <li>Business partners with your consent</li>
                      <li>Legal authorities when required by law</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We implement appropriate security measures to protect your personal information, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure data storage systems</li>
                      <li>Access controls and authentication</li>
                      <li>Regular security assessments</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* Cookies */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Cookies and Tracking Technologies</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We use cookies and similar tracking technologies to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Remember your preferences</li>
                      <li>Analyze website usage</li>
                      <li>Personalize your experience</li>
                      <li>Improve our services</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Your Rights</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Withdraw consent where applicable</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                  </p>
                </section>

                <Separator />

                {/* Changes to Privacy Policy */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Changes to Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last revised" date and the updated version will be effective as soon as it is accessible.
                  </p>
                </section>

                <Separator />

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have questions about this Privacy Policy, please contact us:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>By email: info@rkstonecorporation.com</li>
                      <li>By phone: +91 94147 84562</li>
                      <li>By visiting our office: RK Stone Corporation, Front of Surya City, Paldi Meena, Agra Road Jaipur 302031, Rajasthan</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      Last revised: November 4, 2025
                    </p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;