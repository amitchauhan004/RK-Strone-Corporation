import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Terms = () => {
  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8 text-center">
            Terms &amp; Conditions
          </h1>

          <div className="bg-card rounded-xl shadow-lg p-8">
            <ScrollArea className="h-[70vh] pr-6">
              <div className="space-y-8">
                {/* Welcome Section */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Welcome to RK Stone Corporation</h2>
                  <p className="text-muted-foreground mb-4">
                    These terms and conditions outline the rules and regulations for the use of RK Stone Corporation's website and services.
                  </p>
                  <p className="text-muted-foreground">
                    By accessing this website, we assume you accept these terms and conditions. Do not continue to use RK Stone Corporation's website if you do not agree to take all of the terms and conditions stated on this page.
                  </p>
                </section>

                <Separator />

                {/* Products & Services */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Products &amp; Services</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      All products displayed on our website are subject to availability. We reserve the right to discontinue any product at any time.
                    </p>
                    <p className="text-muted-foreground">
                      Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product without notice.
                    </p>
                    <p className="text-muted-foreground">
                      Product colors, patterns, and dimensions may vary slightly from the images shown on the website due to the natural characteristics of stone materials.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Orders & Payments */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Orders &amp; Payments</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      By placing an order, you warrant that you are legally capable of entering into binding contracts.
                    </p>
                    <p className="text-muted-foreground">
                      A minimum advance payment may be required for custom orders or large quantities. The exact amount will be communicated during the quotation process.
                    </p>
                    <p className="text-muted-foreground">
                      Orders cannot be cancelled once production has begun. Cancellation requests must be made in writing and are subject to approval.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Shipping & Delivery */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Shipping &amp; Delivery</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Delivery times are estimates and may vary based on product availability, customization requirements, and shipping destination.
                    </p>
                    <p className="text-muted-foreground">
                      Risk of loss and title for products pass to you upon delivery to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Custom Orders */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Custom Orders</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Custom orders require detailed specifications and may involve additional lead time. Final designs must be approved in writing before production begins.
                    </p>
                    <p className="text-muted-foreground">
                      Changes to custom orders may result in additional charges and extended delivery times. All changes must be approved by both parties in writing.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Intellectual Property Rights</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      All content on this website, including but not limited to text, graphics, logos, images, product designs, and software, is the property of RK Stone Corporation and is protected by intellectual property laws.
                    </p>
                    <p className="text-muted-foreground">
                      Custom design concepts and drawings created for clients remain the intellectual property of RK Stone Corporation unless otherwise agreed in writing.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Warranty & Returns */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Warranty &amp; Returns</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We guarantee our products to be free from manufacturing defects at the time of delivery. Natural variations in stone products are not considered defects.
                    </p>
                    <p className="text-muted-foreground">
                      Claims for defective products must be made within 48 hours of delivery and must include photographic evidence. Returns of custom-made items are not accepted unless defective.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Limitation of Liability</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      RK Stone Corporation shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our products or services.
                    </p>
                    <p className="text-muted-foreground">
                      Our liability for any claim arising out of or relating to these terms shall not exceed the amount paid for the product or service that is the subject of the claim.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Changes to Terms</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      We reserve the right to revise these terms at any time. By using this website, you agree to be bound by the current version of these terms and conditions.
                    </p>
                    <p className="text-muted-foreground">
                      Last updated: November 4, 2025
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about these Terms & Conditions, please contact us:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>By email: info@rkstonecorporation.com</li>
                      <li>By phone: +91 94147 84562</li>
                      <li>By visiting our office: RK Stone Corporation, Front of Surya City, Paldi Meena, Agra Road Jaipur 302031, Rajasthan</li>
                    </ul>
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

export default Terms;