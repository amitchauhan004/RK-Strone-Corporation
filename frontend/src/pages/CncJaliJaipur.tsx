import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const CncJaliJaipur = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="CNC Jali Jaipur | Marble & Sandstone Jali Cutting by RK Stone"
        description="Order CNC-cut marble and sandstone jalis in Jaipur. Facade screens, partitions, railings, temple panels, and designer jaali patterns with precision finishing."
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "CNC Jali Jaipur | Designer Stone Screens",
          "author": {"@type": "Organization", "name": "RK Stone Corporation"},
          "about": ["CNC Jali", "Marble Jali", "Sandstone Jali", "Jaipur"],
          "mainEntityOfPage": typeof window !== 'undefined' ? window.location.href : undefined
        }}
      />
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">CNC Jali Jaipur</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">CNC-cut stone jalis for facades, balconies, stair railings, temple backdrops, and privacy partitions. Choose from our library or send your custom pattern.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Precision & Repeatability</h2>
            <p className="text-foreground">CNC cutting ensures clean curves, consistent geometry, and minimum chipping even on intricate floral and geometric motifs.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Material Options</h2>
            <p className="text-foreground">Makrana marble for crisp white patterns and sandstone for heritage tones like Dholpur, Gwalior, and Jodhpur.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Site-Friendly Panels</h2>
            <p className="text-foreground">Modular panel sizing, edge finishing, and mounting recommendations provided for easy on-site installation.</p>
          </Card>
        </section>

        <section className="prose prose-neutral max-w-none mb-12">
          <h2>Popular Applications</h2>
          <ul>
            <li>Building facade screens and sun-shading</li>
            <li>Balcony and staircase railings</li>
            <li>Temple jaalis, back panels, and prabhavali accents</li>
            <li>Room partitions and feature walls</li>
          </ul>
          <h3>Workflow</h3>
          <p>Share size and pattern, receive a drawing with kerf allowances, pick finish and edges, then we cut and deliver ready-to-install panels. We also offer on-request sealing for outdoor use.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4">Explore Related Products</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop?category=stone-carving"><Button variant="outline">Stone Carving</Button></Link>
            <Link to="/shop?category=stone-temple"><Button variant="outline">Temple Panels</Button></Link>
            <Link to="/shop?category=wall-panel"><Button variant="outline">Wall Panels</Button></Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">FAQs</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What thickness do you recommend for facade jalis?</h3>
              <p>Usually 20–30 mm depending on span and pattern. For railings, we may suggest 30 mm or laminated assemblies.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can you match an AutoCAD or image file?</h3>
              <p>Yes. We accept CAD, vector, or high-resolution images. Our team optimizes paths for clean cutting.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Do you finish and seal panels?</h3>
              <p>We offer honing, polishing, antique textures, edge rounding, and optional sealing for exterior durability.</p>
            </Card>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact"><Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Request CNC Jali Quote</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default CncJaliJaipur;


