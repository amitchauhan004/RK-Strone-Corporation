import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const StoneTempleJaipur = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="Stone Temple Jaipur | Custom Mandir Craftsmanship by RK Stone Corporation"
        description="Order custom stone temples in Jaipur crafted by skilled artisans. Makrana marble and sandstone mandirs, ghar mandir, outdoor mandir, and heritage temple work."
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Stone Temple Jaipur | Custom Mandir Craftsmanship",
          "author": {
            "@type": "Organization",
            "name": "RK Stone Corporation"
          },
          "about": ["Stone Temple", "Mandir", "Marble Temple", "Sandstone Temple", "Jaipur"],
          "mainEntityOfPage": typeof window !== 'undefined' ? window.location.href : undefined
        }}
      />
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Stone Temple Jaipur</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">Custom marble and sandstone mandirs handcrafted in Jaipur. From compact ghar mandir to grand outdoor and heritage temple projects, we design, carve, and install with devotion and precision.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Custom Designs</h2>
            <p className="text-foreground">Choose pillars, shikhara, jaali, lighting, and deity niches. We provide drawings and 3D previews before carving so you get exactly what you visualise.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Premium Materials</h2>
            <p className="text-foreground">Makrana marble for pristine white temples and Rajasthan sandstone for warm, heritage aesthetics. We source graded blocks to ensure durability and finish.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">End-to-End Execution</h2>
            <p className="text-foreground">Design, carving, transport, installation, and aftercare guidance handled by our expert team for residences, farmhouses, and public spaces.</p>
          </Card>
        </section>

        <section className="prose prose-neutral max-w-none mb-12">
          <h2>Why Jaipur Chooses RK Stone Corporation For Temples</h2>
          <p>Jaipur is celebrated for its stone craft lineage. Our workshop continues this legacy with a production system that blends old-world hand carving and modern precision tools. Every corner joint, moulding profile, and motif is engineered for long-term stability and spiritual presence.</p>
          <h3>Temple Types We Make</h3>
          <ul>
            <li>Home Mandir and Pooja Units (wall-mounted and floor-standing)</li>
            <li>Outdoor Stone Temples for gardens and terraces</li>
            <li>Heritage-style Mandirs with chhatris, ghummats, and carved columns</li>
            <li>Custom Deity Temples: Ram Darbar, Shiv Parivar, Radha Krishna, Laxmi Narayan</li>
          </ul>
          <h3>Specification Options</h3>
          <p>Pick size, stone type, finish (honed, mirror polish, antique), jaali patterns, step designs, prabhavali styles, and lighting provision. We also accommodate vastu, orientation, and storage needs.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4">Explore Related Products</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop?category=stone-temple"><Button variant="outline">Stone Temples</Button></Link>
            <Link to="/shop?category=stone-carving"><Button variant="outline">Stone Carving</Button></Link>
            <Link to="/shop?category=heritage-haveli"><Button variant="outline">Heritage Elements</Button></Link>
            <Link to="/shop?category=chhatri"><Button variant="outline">Chhatri</Button></Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">FAQs</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How long does a custom temple take?</h3>
              <p>Small ghar mandirs take 10–15 days; larger outdoor or heritage temples take 30–60 days depending on design complexity and stone selection.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Do you provide delivery and installation outside Jaipur?</h3>
              <p>Yes. We ship pan-India and deploy experienced installers. Packaging is reinforced for safe transit.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can you match an existing design from a photo?</h3>
              <p>Absolutely. Share references and dimensions; we’ll provide drawings for approval and then hand-carve to match details closely.</p>
            </Card>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact"><Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Discuss Your Temple Project</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default StoneTempleJaipur;


