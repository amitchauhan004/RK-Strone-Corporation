import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const SandstoneSupplierJaipur = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="Sandstone Supplier Jaipur | Dholpur & Gwalior Stone by RK Stone"
        description="Buy sandstone in Jaipur: Dholpur, Gwalior, Jodhpur varieties for cladding, flooring, landscape, and heritage works. Cut-to-size, finishes, and delivery available."
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Sandstone Supplier Jaipur | Dholpur & Gwalior Stone",
          "author": {"@type": "Organization", "name": "RK Stone Corporation"},
          "about": ["Sandstone", "Dholpur Stone", "Gwalior Stone", "Jaipur"],
          "mainEntityOfPage": typeof window !== 'undefined' ? window.location.href : undefined
        }}
      />
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Sandstone Supplier Jaipur</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">Project-ready sandstone sourced from Rajasthan quarries. Cut-to-size slabs, steps, wall cladding, jalis, and landscape elements delivered with consistent quality and finish.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Popular Stones</h2>
            <p className="text-foreground">Dholpur (Beige/Red), Gwalior (Mint/Yellow), Jodhpur Sandstone, and custom selections for special projects.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Applications</h2>
            <p className="text-foreground">Facade cladding, elevation features, paving, coping, steps, pergolas, gazebos, fountains, and boundary walls.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-semibold mb-2">Finishes</h2>
            <p className="text-foreground">Natural, honed, sandblasted, bush-hammered, antique, edges chamfered or bullnose on request.</p>
          </Card>
        </section>

        <section className="prose prose-neutral max-w-none mb-12">
          <h2>Quality & Production</h2>
          <p>We inspect blocks for density and color uniformity, calibrate thickness for easy installation, and pack with corner protection. Large orders are scheduled to maintain lot consistency across phases.</p>
          <h3>Sizing & Logistics</h3>
          <p>Standard tiles, large-format slabs, and custom dimensions available. We assist with quantity take-offs and provide lead times aligned with site progress to avoid stacking and damages.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4">Explore Related Products</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop?category=dhaulpur-stone"><Button variant="outline">Dholpur Stone</Button></Link>
            <Link to="/shop?category=gwalior-stone"><Button variant="outline">Gwalior Stone</Button></Link>
            <Link to="/shop?category=wall-panel"><Button variant="outline">Cladding Panels</Button></Link>
            <Link to="/shop?category=garden-ornaments"><Button variant="outline">Garden Ornaments</Button></Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">FAQs</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Do you provide cut-to-size and edge finishing?</h3>
              <p>Yes. We cut to drawings and finish edges as specified—chamfered, half bullnose, or full bullnose for steps and coping.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What is the typical lead time?</h3>
              <p>Most sandstone orders ship within 7–15 days depending on finish and quantity. Large facade orders may take longer.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can you color-match across phases?</h3>
              <p>We reserve matching lots for multi-phase deliveries to maintain visual consistency.</p>
            </Card>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact"><Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Sandstone Quote</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default SandstoneSupplierJaipur;


