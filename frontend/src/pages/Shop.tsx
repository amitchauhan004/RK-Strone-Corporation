import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const customCategories = [
  { id: 'animals', name: 'Animals' },
  { id: 'chhatri', name: 'Chhatri' },
  { id: 'dhaulpur-stone', name: 'Dhaulpur Stone' },
  { id: 'garden-fountain', name: 'Garden Fountain' },
  { id: 'garden-ornaments', name: 'Garden Ornaments' },
  { id: 'gate', name: 'Gate' },
  { id: 'gwalior-stone', name: 'Gwalior Stone' },
  { id: 'heritage-haveli', name: 'Heritage Haveli' },
  { id: 'jodhpur-stone', name: 'Jodhpur Stone' },
  { id: 'pink-sand-stone', name: 'Pink Sand Stone' },
  { id: 'red-stone', name: 'Red Stone' },
  { id: 'stone-carving', name: 'Stone Carving' },
  { id: 'stone-temple', name: 'Stone Temple' },
  { id: 'wall-panel', name: 'Wall Panel' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // NEW: products from API
  const [products, setProducts] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'https://rk-strone-corporation.vercel.app';
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    let matchesPrice = true;
    if (priceRange === "low") {
      matchesPrice = product.price < 5000;
    } else if (priceRange === "mid") {
      matchesPrice = product.price >= 5000 && product.price < 15000;
    } else if (priceRange === "high") {
      matchesPrice = product.price >= 15000;
    }
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Seo
        title="Shop Natural Stones in Jaipur | Stone Temples, CNC Jalis, Nameplates"
        description="Explore RK Stone Corporation's collection: stone temples, CNC jalis, nameplates, sandstone, marble, and more. Browse by category, price, and popularity."
        type="website"
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground">
            Browse Our Premium Selection Of Natural Stones
          </p>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <Card className="p-6 sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4">
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-3 block">
                  Category
                </Label>
                <div className="space-y-3">
                  {customCategories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <label
                        htmlFor={category.id}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">
                  Price Range
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="price-all"
                      checked={priceRange === "all"}
                      onCheckedChange={() => setPriceRange("all")}
                    />
                    <label
                      htmlFor="price-all"
                      className="ml-2 text-sm cursor-pointer"
                    >
                      All Prices
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="price-low"
                      checked={priceRange === "low"}
                      onCheckedChange={() => setPriceRange("low")}
                    />
                    <label
                      htmlFor="price-low"
                      className="ml-2 text-sm cursor-pointer"
                    >
                      Under ₹5,000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="price-mid"
                      checked={priceRange === "mid"}
                      onCheckedChange={() => setPriceRange("mid")}
                    />
                    <label
                      htmlFor="price-mid"
                      className="ml-2 text-sm cursor-pointer"
                    >
                      ₹5,000 - ₹15,000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="price-high"
                      checked={priceRange === "high"}
                      onCheckedChange={() => setPriceRange("high")}
                    />
                    <label
                      htmlFor="price-high"
                      className="ml-2 text-sm cursor-pointer"
                    >
                      Above ₹15,000
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {sortedProducts.length} of {products.length} products
            </p>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <Card
                    key={product._id || product.id}
                    className="overflow-hidden hover:shadow-medium transition-smooth group animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link to={`/product/${product._id || product.id}`}>
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image}
                          alt={`${product.name} in ${product.category} category`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/product/${product._id || product.id}`}>
                        <h3 className="font-heading font-semibold text-lg mb-2 hover:text-accent transition-smooth">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-accent">
                          ₹{product.price?.toLocaleString?.() ?? product.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
