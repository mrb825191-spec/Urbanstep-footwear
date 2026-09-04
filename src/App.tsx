import React, { useState, useMemo, useEffect } from 'react';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SizeChartModal } from './components/SizeChartModal';
import { WhyUs } from './components/WhyUs';
import { Reviews } from './components/Reviews';
import { StoreLocation } from './components/StoreLocation';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { STORE_CONFIG, PRODUCT_DATA } from './data/storeData';
import { Product, FootwearCategory, FootwearGender } from './types';
import { Search, X, Filter, ArrowUpDown, ShoppingBag, Sparkles, RefreshCw, Star } from 'lucide-react';
import { initRippleEffect } from './utils/ripple';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FootwearCategory>('All');
  const [selectedGender, setSelectedGender] = useState<FootwearGender | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);

  // Initialize global touch/click ripple animation listener
  useEffect(() => {
    const cleanupRipple = initRippleEffect();
    return cleanupRipple;
  }, []);

  // Top recommended shoe (store bestseller)
  const recommendedShoe = useMemo(() => {
    return PRODUCT_DATA.find((p) => p.isBestSeller) || PRODUCT_DATA[0];
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCT_DATA.length };
    PRODUCT_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      counts[p.gender] = (counts[p.gender] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCT_DATA.filter((p) => {
      // Category filter (CategoryNav clicks)
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category === selectedCategory ||
        p.gender === selectedCategory;

      // Gender filter
      const matchesGender =
        selectedGender === 'All' || p.gender === selectedGender;

      // Search term
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.gender.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query);

      return matchesCategory && matchesGender && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0; // 'featured' keeps curated order
    });
  }, [searchTerm, selectedCategory, selectedGender, sortBy]);

  // WhatsApp Handlers
  const handleOpenWhatsAppGeneral = () => {
    const msg = `Hello ${STORE_CONFIG.businessName}, I would like to inquire about your footwear collection and store visit in ${STORE_CONFIG.city}.`;
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleQuickWhatsApp = (product: Product) => {
    const msg = `Hello ${STORE_CONFIG.businessName}, I am interested in "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Do you currently have this pair in stock at your ${STORE_CONFIG.city} store?`;
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-950">
      {/* 1. Demo Banner */}
      <DemoBanner />

      {/* 2. Sticky Navigation */}
      <Navbar
        onOpenWhatsAppGeneral={handleOpenWhatsAppGeneral}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
      />

      {/* 3. Hero Section */}
      <Hero
        onExploreClick={() => {
          const shopEl = document.getElementById('shop');
          if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onWhatsAppClick={handleOpenWhatsAppGeneral}
        onSelectProduct={(product) => setSelectedProduct(product)}
        recommendedProduct={recommendedShoe}
      />

      {/* 4. Category Navigation */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'Men' || cat === 'Women' || cat === 'Kids') {
            setSelectedGender(cat);
          } else {
            setSelectedGender('All');
          }
        }}
        categoryCounts={categoryCounts}
      />

      {/* 5. Product Catalogue Section */}
      <main id="shop" className="py-14 sm:py-20 bg-white border-b border-slate-200/70 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest">
                  Footwear Showcase
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-500">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'pair' : 'pairs'} available
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Footwear Collection
              </h2>
            </div>

            {/* Quick in-store trial pill & Recommended Shoe quick link */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                id="shop-recommended-shoe-pill"
                type="button"
                onClick={() => setSelectedProduct(recommendedShoe)}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200/90 px-3.5 py-2 rounded-xl text-xs text-amber-900 font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Click to view our recommended shoe"
              >
                <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />
                <span>Recommended: {recommendedShoe.name}</span>
                <span className="text-indigo-600 font-bold">₹{recommendedShoe.price}</span>
              </button>

              <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs text-slate-600 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>In-person fitting at Main Market, {STORE_CONFIG.city}</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar Controls */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs mb-8 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search Bar (6 cols) */}
              <div className="sm:col-span-6 relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  id="footwear-search-input"
                  type="text"
                  placeholder="Search footwear (e.g., Oxfords, Sneakers, Heels, School)..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    id="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-md"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Filter Dropdown (3 cols) */}
              <div className="sm:col-span-3">
                <div className="relative">
                  <select
                    id="category-select-filter"
                    className="w-full py-2.5 px-3.5 bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-xs sm:text-sm font-bold text-slate-700 outline-none transition-all appearance-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as FootwearCategory)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Men">Men's Footwear</option>
                    <option value="Women">Women's Footwear</option>
                    <option value="Kids">Kids' Footwear</option>
                    <option value="Sports">Sports & Running</option>
                    <option value="Casual">Casual & Sneakers</option>
                    <option value="Formal">Formal & Office</option>
                    <option value="Sandals">Sandals</option>
                    <option value="Slippers">Home Slippers</option>
                  </select>
                  <Filter
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              {/* Price Sort Dropdown (3 cols) */}
              <div className="sm:col-span-3">
                <div className="relative">
                  <select
                    id="price-sort-select"
                    className="w-full py-2.5 px-3.5 bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-xs sm:text-sm font-bold text-slate-700 outline-none transition-all appearance-none cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'featured' | 'low' | 'high')}
                  >
                    <option value="featured">Sort: Featured Picks</option>
                    <option value="low">Price: Low to High (INR)</option>
                    <option value="high">Price: High to Low (INR)</option>
                  </select>
                  <ArrowUpDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Secondary Active Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 font-bold text-slate-600">
                <span className="text-slate-400 font-medium">Quick Filter:</span>
                {(['All', 'Men', 'Women', 'Kids'] as const).map((g) => (
                  <button
                    key={g}
                    id={`gender-filter-btn-${g.toLowerCase()}`}
                    onClick={() => {
                      setSelectedGender(g);
                      if (g !== 'All') {
                        setSelectedCategory(g);
                      }
                    }}
                    className={`px-3 py-1 rounded-full transition-all ${
                      selectedGender === g
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {(searchTerm || selectedCategory !== 'All' || selectedGender !== 'All' || sortBy !== 'featured') && (
                <button
                  id="reset-all-filters-btn"
                  onClick={handleResetFilters}
                  className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 hover:underline ml-auto"
                >
                  <RefreshCw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(prod) => setSelectedProduct(prod)}
                  onQuickWhatsApp={handleQuickWhatsApp}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 px-4 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                No matching footwear found
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                We couldn't find any footwear matching your search or filters. Try adjusting your terms.
              </p>
              <button
                id="empty-state-reset-btn"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 6. Why Shop With Us */}
      <WhyUs />

      {/* 7. Sample Customer Reviews */}
      <Reviews />

      {/* 8. Store Location & Opening Hours */}
      <StoreLocation onOpenWhatsAppGeneral={handleOpenWhatsAppGeneral} />

      {/* 9. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'Men' || cat === 'Women' || cat === 'Kids') {
            setSelectedGender(cat);
          } else {
            setSelectedGender('All');
          }
        }}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
      />

      {/* 10. Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
      />

      {/* 11. Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />

      {/* 12. Floating WhatsApp FAB */}
      <WhatsAppFab onClick={handleOpenWhatsAppGeneral} />
    </div>
  );
}
