import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";

const API_URL = import.meta.env.VITE_API_URL || 'https://rk-strone-corporation.vercel.app';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="Contact RK Stone Corporation | Jaipur Stone Supplier"
        description="Contact RK Stone Corporation for stone temples, CNC jalis, nameplates, sandstone, marble and custom stone projects in Jaipur. Call, email, or visit our showroom."
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "RK Stone Corporation",
          "url": typeof window !== 'undefined' ? window.location.origin : "https://rkstonecorporation.com",
          "telephone": "+91 94147 84562",
          "email": "contact@rkstonecorporation.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Front of Surya City, Paldi Meena, Agra Road",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "postalCode": "302031",
            "addressCountry": "IN"
          },
          "hasMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.88321687556189,
            "longitude": 75.90287731088574
          },
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
            ],
            "opens": "08:00",
            "closes": "19:00"
          }],
          "priceRange": "₹₹",
          "sameAs": [
            "https://www.google.com/maps/place/R+K+Stone+Carporation/"
          ]
        }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Get In Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a Question Or Ready To Start Your Project? We'd Love To Hear
            From You.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="p-6 hover:shadow-medium transition-smooth animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a
                  href="tel:+918058637318"
                  className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                >
                  +91 94147 84562
                </a>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-medium transition-smooth animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:contact@rkstonecorporation.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-smooth break-all"
                >
                  contact@rkstonecorporation.com
                </a>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-medium transition-smooth animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Jaipur, Rajasthan, India
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 animate-fade-in-up">
            <h2 className="text-2xl font-heading font-bold mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Map and Business Hours */}
          <div
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">
                Visit Our Showroom
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RK Stone Corporation Showroom Location"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Office Address</p>
                    <p className="text-sm text-muted-foreground">
                      RK Stone Corporation, Front of Surya City, Paldi Meena,
                      Agra Road Jaipur 302031, Rajasthan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Factory Address</p>
                    <p className="text-sm text-muted-foreground">
                      RK Stone Corporation, Manpur, Sikrai, Dausa
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Business Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Monday - Sunday: 8:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
