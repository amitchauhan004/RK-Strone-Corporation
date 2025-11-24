import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import ImageGallery from "@/components/product/ImageGallery";
import Reviews from "@/components/product/Reviews";
import InquiryForm from "@/components/product/InquiryForm";
import ShareButtons from "@/components/product/ShareButtons";
import VariantsSelector from "@/components/product/VariantsSelector";
import SpecsTable from "@/components/product/SpecsTable";
import Seo from "@/components/Seo";
const API_URL = import.meta.env.VITE_API_URL || 'https://rk-strone-corporation.vercel.app';

interface Product {
  _id?: string;
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch related products
  const fetchRelatedProducts = async (currentProduct: Product) => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const allProducts = await res.json();
      const related = allProducts
        .filter((p: any) => 
          p.category === currentProduct.category && p._id !== currentProduct._id
        )
        .slice(0, 4) // Get up to 4 related products
        .map((p: any) => ({
          ...p,
          id: p._id,
          _id: p._id // Keep both id and _id
        }));
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setProduct(null); // Reset product when ID changes
    setRelatedProducts([]); // Reset related products
    
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        const productData = { 
          ...data, 
          id: data._id,
          _id: data._id  // Keep both id and _id
        };
        // default selected variant if available
        if (productData.variants && productData.variants.length) {
          setSelectedVariant(productData.variants[0]);
        } else {
          setSelectedVariant(null);
        }
        setProduct(productData);
        setNotFound(false);
        fetchRelatedProducts(productData);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-24 flex justify-center items-center">Loading...</div>;
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Product Not Found
          </h1>
          <Link to="/shop" className="inline-block">
            <Button>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Images and derived data
  const images = (product as any).images && (product as any).images.length ? (product as any).images : [product.image];
  // Utility for image URL - handle both S3 and local URLs
  const imageUrl = images[0];

  const getVariantPrice = (base: number, variant: any) => {
    if (!variant) return base;
    if (typeof variant.price === 'number') return variant.price;
    const mod = typeof variant.priceModifier === 'number' ? variant.priceModifier : 0;
    return base + mod;
  };

  const displayPrice = getVariantPrice(product.price, selectedVariant);
  const parsePositive = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const customArea = useCustomSize ? parsePositive(customWidth) * parsePositive(customHeight) : 0;
  const computedPrice = useCustomSize ? (customArea * getVariantPrice(product.price, selectedVariant || null)) : displayPrice;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title={`${product.name} | RK Stone Corporation`}
        description={product.description}
        image={imageUrl}
        type="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": images,
          "description": product.description,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": "RK Stone Corporation"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": (useCustomSize ? computedPrice : displayPrice) || product.price,
            "availability": "https://schema.org/InStock",
            "url": typeof window !== 'undefined' ? window.location.href : undefined
          }
        }}
      />
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-muted-foreground hover:text-accent transition-smooth"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <ImageGallery images={images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              <h1 className="text-4xl font-heading font-bold mb-2">
                {product.name}
              </h1>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">
                  ₹{(useCustomSize ? computedPrice : displayPrice)?.toLocaleString?.() ?? (useCustomSize ? computedPrice : displayPrice)}
                </span>
                <span className="text-muted-foreground">{useCustomSize ? `${customArea || 0} sq. ft.` : 'per sq. ft.'}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants selector (if provided in product data) */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <VariantsSelector
                  variants={(product as any).variants}
                  onChange={(variantId) => {
                    const v = (product as any).variants?.find((x: any) => x.id === variantId || x._id === variantId);
                    if (v) setSelectedVariant(v);
                  }}
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={useCustomSize} onChange={e => setUseCustomSize(e.target.checked)} className="w-4 h-4" />
                  <span>Custom size</span>
                </label>
              </div>

              {useCustomSize && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="text-sm block mb-1">Width (ft)</label>
                    <input value={customWidth} onChange={e => setCustomWidth(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="e.g. 10" />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Height (ft)</label>
                    <input value={customHeight} onChange={e => setCustomHeight(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="e.g. 2" />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Area</label>
                    <div className="px-3 py-2 border rounded-md">{customArea ? `${customArea} sq. ft.` : '—'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications table */}
            <SpecsTable specs={(product as any).specs || (product as any).dimensions} />

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => {
                  const priceToUse = useCustomSize ? computedPrice : displayPrice;
                  const sizeLabel = useCustomSize ? ` ${parsePositive(customWidth)}x${parsePositive(customHeight)} ft (${customArea} sq.ft.)` : (selectedVariant ? ` (${selectedVariant.name})` : '');
                  const cartProduct = {
                    id: product.id + (useCustomSize ? `::custom_${parsePositive(customWidth)}x${parsePositive(customHeight)}` : (selectedVariant ? `::${selectedVariant.id || selectedVariant._id}` : '')),
                    name: product.name + sizeLabel,
                    price: priceToUse,
                    image: product.image,
                    category: product.category,
                    description: product.description,
                  };
                  addToCart(cartProduct as any);
                }}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={useCustomSize && customArea <= 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const whatsappNumber = "919414784562";
                  const message = encodeURIComponent(
                    `Hi! I'm interested in ${product.name}. Can you provide a quote?`
                  );
                  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
                }}
                className="flex-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
            </div>

            {/* Share buttons */}
            <ShareButtons url={window.location.href} title={product.name} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct._id} 
                  to={`/product/${relatedProduct._id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-accent">
                        ₹{relatedProduct.price?.toLocaleString() ?? relatedProduct.price}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews and Inquiry */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Reviews productId={product.id ?? product._id} />
          </div>
          <div>
            <InquiryForm productId={product._id ?? product.id} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
