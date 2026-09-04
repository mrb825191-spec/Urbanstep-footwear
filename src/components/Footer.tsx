import React from 'react';
import { ShoppingBag, Phone, MapPin, Clock, Instagram, Facebook, ArrowUp, Sparkles, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';
import { FootwearCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: FootwearCategory) => void;
  onOpenSizeChart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSizeChart }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <ShoppingBag size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                URBAN<span className="text-indigo-400">STEP</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {STORE_CONFIG.description} Bringing durable craftsmanship, trendy designs, and family-friendly footwear to {STORE_CONFIG.city}.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={STORE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Footwear Collection</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Shop With Us</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Store Location</a></li>
              <li>
                <button onClick={onOpenSizeChart} className="hover:text-white transition-colors text-left">
                  Size Guide (UK/India)
                </button>
              </li>
            </ul>
          </div>

          {/* Footwear Categories Column */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Footwear Categories
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-400">
              {(['Men', 'Women', 'Kids', 'Sports', 'Casual', 'Formal', 'Sandals', 'Slippers'] as FootwearCategory[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('shop');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    {cat} Footwear
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Hours & Address Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Store Timings & Address
            </h4>

            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Sat: {STORE_CONFIG.openingHours.weekdays}</p>
                  <p className="text-slate-400">Sun: {STORE_CONFIG.openingHours.sunday}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                <p>
                  {STORE_CONFIG.address}, {STORE_CONFIG.city}, {STORE_CONFIG.state} - {STORE_CONFIG.pincode}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone size={15} className="text-indigo-400 shrink-0" />
                <a href={`tel:${STORE_CONFIG.phone}`} className="hover:text-white font-bold transition-colors">
                  {STORE_CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Demo Project Tag Box */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
              <span className="font-extrabold text-amber-400 block mb-1 flex items-center gap-1">
                <Sparkles size={12} /> DEMO SHOWCASE
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Designed to pitch digital transformation to local retail footwear business owners.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {STORE_CONFIG.businessName}. All rights reserved. Sample Project.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
