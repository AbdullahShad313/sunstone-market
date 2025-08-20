import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters, FilterOptions } from '@/components/ProductFilters';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mangoProducts } from '@/data/products';
import { Product } from '@/types/product';
import heroMangoes from '@/assets/hero-mangoes.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    varieties: [],
    priceRange: [0, 100],
    sortBy: 'popularity',
    inStockOnly: false
  });

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mangoProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.variety.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Variety filter
      if (filters.varieties.length > 0 && !filters.varieties.some(v => 
        product.variety.toLowerCase().includes(v.toLowerCase()))) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, sort by id (assuming higher id = newer)
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // Keep original order for popularity
        break;
    }

    return filtered;
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative bg-mango-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Mangoes
                <br />
                <span className="text-white/90">Delivered Fresh</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Discover the world's finest mango varieties. From the royal Alphonso to sweet Kesar, 
                experience tropical perfection delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Shop Fresh Mangoes
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Explore Products
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroMangoes}
                alt="Fresh Premium Mangoes"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Varieties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-mango-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free delivery on orders over $75</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mango-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Hand-picked, farm-fresh mangoes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mango-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Rated</h3>
              <p className="text-muted-foreground">4.8/5 average customer rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Premium Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From fresh mangoes to delicious processed products, discover our complete range
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                totalProducts={filteredProducts.length}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {searchQuery && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Search results for:</span>
                    <Badge variant="secondary">{searchQuery}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold mb-4">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      categories: [],
                      varieties: [],
                      priceRange: [0, 100],
                      sortBy: 'popularity',
                      inStockOnly: false
                    });
                  }}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
