import { Card } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { Award, Target, Heart } from "lucide-react";
import aboutImage from "@/assets/logo.png";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="About RK Stone Corporation | Stone Temples & Natural Stones Jaipur"
        description="Learn about RK Stone Corporation – Jaipur-based specialists in stone temples, CNC jalis, nameplates, sandstone, marble, and custom stone craftsmanship."
        type="website"
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About RK Stone Corporation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            On Presentation of Natural Stone Handicraft Creations
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-heading font-bold">Our Story</h2>
            <p className="text-foreground leading-relaxed">
              Founded in Jaipur, Rajasthan, <strong>RK Stone Corporation</strong> is a
              renowned name in the natural stone industry. What began as a small family
              workshop has grown into a leading manufacturer and supplier of
              handcrafted stone creations across India. For over a decade, we’ve been
              turning raw stones into timeless works of art that reflect tradition,
              devotion, and durability.
            </p>
            <p className="text-foreground leading-relaxed">
              We specialize in crafting <strong>Stone Temples, Fountains, Garden Gazebos,
              Home Elevation Articles, Handicraft Decor, Dholpur and Gwalior Stones,</strong>
              along with premium <strong>Makrana Marble</strong> products. Our workshop also
              manufactures all types of <strong>Sandstone slabs and custom stone designs</strong>
              tailored to client requirements.
            </p>
            <p className="text-foreground leading-relaxed">
              Every stone is sourced from Rajasthan’s finest quarries and shaped by
              skilled artisans using both traditional techniques and modern tools.
              From precision cutting to detailed carving, we ensure quality that stands
              the test of time delivering beauty that lasts for generations.
            </p>
          </div>

          <div className="relative h-[400px] lg:h-auto rounded-lg overflow-hidden shadow-medium animate-fade-in-up">
            <img
              src={aboutImage}
              alt="RK Stone Corporation stone workshop in Jaipur"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 animate-fade-in">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-medium transition-smooth animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Quality First
              </h3>
              <p className="text-muted-foreground">
                Every block of stone is hand selected and inspected to meet our
                uncompromising standards of strength, beauty, and finish.
              </p>
            </Card>

            <Card
              className="p-8 text-center hover:shadow-medium transition-smooth animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Skilled Craftsmanship
              </h3>
              <p className="text-muted-foreground">
                Our artisans blend heritage artistry with modern tools to craft
                temples, nameplates, and structures that embody devotion and design.
              </p>
            </Card>

            <Card
              className="p-8 text-center hover:shadow-medium transition-smooth animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Customer Commitment
              </h3>
              <p className="text-muted-foreground">
                We value long term relationships and deliver custom solutions that
                match your vision, space, and spiritual essence perfectly.
              </p>
            </Card>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-none animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              To preserve and promote India’s stone artistry by delivering
              exceptional quality and timeless craftsmanship. Our mission is to
              transform homes, temples, and public spaces with creations that
              combine tradition, innovation, and beauty all carved from nature’s
              finest stones.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
