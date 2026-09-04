import React from 'react';
import { ArrowRight, MessageCircle, MapPin, CheckCircle2, ShieldCheck, Sparkles, Eye, Star } from 'lucide-react';
import { STORE_CONFIG, PRODUCT_DATA } from '../data/storeData';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onWhatsAppClick: () => void;
  onSelectProduct?: (product: Product) => void;
  recommendedProduct?: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onWhatsAppClick,
  onSelectProduct,
  recommendedProduct,
}) => {
  // Use provided recommended product or fallback to the bestseller store favorite
  const featuredShoe = recommendedProduct || PRODUCT_DATA[0];

  const handleRecommendedClick = () => {
    if (onSelectProduct && featuredShoe) {
      onSelectProduct(featuredShoe);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-white border-b border-slate-200/60 pt-6 pb-12 sm:pt-10 sm:pb-20 lg:py-20">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-70" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Clickable Recommended Shoe Header Pill */}
            <button
              type="button"
              id="hero-recommended-pill-btn"
              onClick={handleRecommendedClick}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-full text-amber-900 text-xs font-black tracking-wide transition-all shadow-xs cursor-pointer group"
              title="Click to view our recommended shoe details"
            >
              <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
              <span>Recommended Shoe: {featuredShoe.name}</span>
              <span className="text-indigo-600 font-extrabold group-hover:underline flex items-center gap-0.5">
                • View Sizes <ArrowRight size={12} />
              </span>
            </button>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Step Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                Your True Style.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {STORE_CONFIG.description} Visit our {STORE_CONFIG.city} store for comfortable fittings, durable soles, and festival-ready footwear at unbeatable local prices.
            </p>

            {/* Quick trust tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs sm:text-sm font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" /> 500+ Pairs in Stock
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-indigo-600" /> Free In-Store Fitting Trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-500" /> Instant WhatsApp Size Check
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <button 
                id="hero-shop-collection-btn"
                onClick={onExploreClick}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight size={18} />
              </button>

              <button 
                id="hero-whatsapp-btn"
                onClick={onWhatsAppClick}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Enquire on WhatsApp</span>
              </button>

              <a 
                id="hero-directions-link"
                href="#contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-xl font-bold text-base transition-all border border-slate-200/80 cursor-pointer"
              >
                <MapPin size={17} className="text-indigo-600" />
                <span>Visit Store</span>
              </a>
            </div>
          </div>

          {/* Right Visual: Clickable Featured / Recommended Shoe Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 rounded-3xl blur-xl pointer-events-none" />
              
              {/* Interactive Recommended Shoe Card */}
              <div
                id="hero-recommended-shoe"
                role="button"
                tabIndex={0}
                aria-label={`View Recommended Shoe: ${featuredShoe.name}, price ₹${featuredShoe.price}`}
                onClick={handleRecommendedClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRecommendedClick();
                  }
                }}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 transition-all duration-300 hover:shadow-indigo-500/20 select-none block"
              >
                {/* Top Badge: Recommended Shoe */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
                  <Star size={13} className="fill-slate-950 text-slate-950" />
                  <span className="uppercase tracking-wider">Recommended Shoe</span>
                </div>

                {/* Quick Hint on Top Right */}
                <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs text-indigo-700 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Eye size={13} />
                  <span>Tap to View</span>
                </div>

                {/* Footwear Image */}
                <div className="relative w-full h-80 sm:h-96 lg:h-[430px] overflow-hidden bg-slate-100">
                  <img 
                    src={featuredShoe.image} 
                    alt={featuredShoe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Floating Bottom Card: Details Preview */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between gap-3 group-hover:bg-white transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest block">
                        Staff Pick • {featuredShoe.gender}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                        {featuredShoe.category}
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {featuredShoe.name}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <span>Color: {featuredShoe.color}</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-bold">Sizes: {featuredShoe.sizes.join(', ')}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    {featuredShoe.mrp && (
                      <span className="text-xs text-slate-400 line-through block">
                        ₹{featuredShoe.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-base sm:text-lg font-black text-indigo-600 block leading-tight">
                      ₹{featuredShoe.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-600 group-hover:text-indigo-600 flex items-center justify-end gap-0.5 mt-0.5">
                      <span>Details</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini In-Store Tag Card */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white py-2 px-3.5 rounded-xl shadow-xl border border-slate-100 items-center gap-2 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-800">Shop Open Today in {STORE_CONFIG.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

