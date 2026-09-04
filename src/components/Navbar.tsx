import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

interface NavbarProps {
  onOpenWhatsAppGeneral: () => void;
  onOpenSizeChart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsAppGeneral, onOpenSizeChart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      id="main-navigation" 
      className={`sticky top-0 z-40 w-full bg-white border-b border-slate-200 py-3.5 transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            id="mobile-menu-toggle-btn"
            type="button"
            className="relative overflow-hidden cursor-pointer lg:hidden p-2 -ml-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={24} />
          </button>
          
          <a href="#" className="flex items-center gap-2.5 group" id="brand-logo-link">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <ShoppingBag size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                URBAN<span className="text-indigo-600">STEP</span>
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Footwear • {STORE_CONFIG.city}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600" aria-label="Main Navigation">
          <a href="#" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Home</a>
          <a href="#categories" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Categories</a>
          <a href="#shop" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Shop Catalogue</a>
          <a href="#why-us" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Why Us</a>
          <a href="#reviews" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Reviews</a>
          <a href="#contact" className="relative overflow-hidden hover:text-indigo-600 transition-colors py-1 px-1 rounded-md">Store Location</a>
          <button 
            type="button"
            onClick={onOpenSizeChart}
            className="relative overflow-hidden cursor-pointer text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-bold px-2.5 py-1 rounded-full transition-colors"
          >
            Size Guide
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a 
            id="nav-call-btn"
            href={`tel:${STORE_CONFIG.phone}`}
            className="relative overflow-hidden cursor-pointer hidden sm:inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-slate-200/70"
            title="Call our store directly"
          >
            <Phone size={15} className="text-indigo-600" />
            <span>Call Store</span>
          </a>

          <button 
            id="nav-whatsapp-btn"
            type="button"
            onClick={onOpenWhatsAppGeneral}
            className="relative overflow-hidden cursor-pointer inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-emerald-600/20"
          >
            <MessageCircle size={16} />
            <span>WhatsApp Us</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={closeMenu} 
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div 
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-left duration-200"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <ShoppingBag size={18} />
                </div>
                <span className="text-lg font-extrabold text-slate-900">UrbanStep</span>
              </div>
              <button 
                id="close-mobile-menu-btn"
                type="button"
                onClick={closeMenu}
                className="relative overflow-hidden cursor-pointer p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 font-semibold text-slate-700">
              <a 
                href="#" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Home
              </a>
              <a 
                href="#categories" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Browse Categories
              </a>
              <a 
                href="#shop" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Footwear Catalogue
              </a>
              <a 
                href="#why-us" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Why Shop With Us
              </a>
              <a 
                href="#reviews" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Customer Reviews
              </a>
              <a 
                href="#contact" 
                onClick={closeMenu}
                className="relative overflow-hidden px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                Store Location & Hours
              </a>
              <button 
                type="button"
                onClick={() => { closeMenu(); onOpenSizeChart(); }}
                className="relative overflow-hidden cursor-pointer text-left px-3 py-2.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors flex items-center justify-between"
              >
                <span>UK/India Size Guide</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded font-bold">Chart</span>
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin size={14} className="shrink-0 text-indigo-600 mt-0.5" />
                <span>{STORE_CONFIG.address}, {STORE_CONFIG.city}</span>
              </div>

              <a 
                href={`tel:${STORE_CONFIG.phone}`}
                className="relative overflow-hidden cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone size={16} />
                <span>Call {STORE_CONFIG.phone}</span>
              </a>

              <button 
                type="button"
                onClick={() => { closeMenu(); onOpenWhatsAppGeneral(); }}
                className="relative overflow-hidden cursor-pointer flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageCircle size={18} />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
