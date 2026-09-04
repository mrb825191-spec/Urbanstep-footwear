import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, MessageCircle, Phone, Check, ShieldCheck, HelpCircle, MapPin, AlertCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeChart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenSizeChart,
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showValidationPrompt, setShowValidationPrompt] = useState<boolean>(false);

  // Reset size state whenever a new product is selected
  useEffect(() => {
    setSelectedSize(null);
    setShowValidationPrompt(false);
  }, [product]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const discountPercent = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    setShowValidationPrompt(false);
  };

  const handleWhatsAppEnquiry = () => {
    // Crucial UX check: Do not allow size-based WhatsApp enquiry from the product modal until a size is selected
    if (selectedSize === null) {
      setShowValidationPrompt(true);
      return;
    }

    const message = `Hello ${STORE_CONFIG.businessName}, I am interested in "${product.name}" in UK/India Size ${selectedSize} (Price: ₹${product.price.toLocaleString('en-IN')}). Is this size currently available in your ${STORE_CONFIG.city} store?`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="product-detail-modal" 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Floating Close Button */}
        <button
          id="close-product-modal-btn"
          type="button"
          onClick={onClose}
          className="relative overflow-hidden cursor-pointer absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image */}
          <div className="md:col-span-6 bg-slate-100 relative aspect-square sm:aspect-auto sm:min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                {product.category}
              </span>
              <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                {product.gender}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl text-xs text-slate-700 flex items-center justify-between shadow-xs">
              <span className="font-semibold flex items-center gap-1.5 text-emerald-700">
                <Check size={14} className="stroke-[3]" /> Available in-store
              </span>
              <span className="font-bold text-slate-500">Color: {product.color}</span>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Product Header */}
              <div className="mb-4">
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-1">
                  UrbanStep Collection
                </span>
                <h2 id="modal-product-title" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through font-semibold">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  About This Footwear
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.desc}
                </p>

                {/* Key features bullet tags */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <ShieldCheck size={12} className="text-indigo-600" /> {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Selector Section */}
              <div className="mb-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Select UK/India Size</span>
                    <span className="text-red-500 font-bold">*</span>
                  </h3>
                  <button
                    id="open-size-chart-from-modal-btn"
                    onClick={onOpenSizeChart}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
                  >
                    <HelpCircle size={13} />
                    <span>Size Guide</span>
                  </button>
                </div>

                {/* Size Chips */}
                <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Footwear Sizes">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        id={`size-btn-${size}`}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleSizeSelect(size)}
                        className={`relative overflow-hidden cursor-pointer w-12 h-12 rounded-xl text-sm font-extrabold flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105 ring-2 ring-indigo-600 ring-offset-2'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <span>{size}</span>
                        <span className={`text-[9px] font-semibold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          UK
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected feedback or Validation prompt */}
                {selectedSize ? (
                  <p className="mt-2.5 text-xs font-semibold text-indigo-700 flex items-center gap-1.5 animate-in fade-in">
                    <Check size={14} className="stroke-[3]" />
                    <span>Size UK {selectedSize} selected. Ready to enquire on WhatsApp.</span>
                  </p>
                ) : showValidationPrompt ? (
                  <p className="mt-2.5 text-xs font-bold text-red-600 flex items-center gap-1.5 animate-bounce">
                    <AlertCircle size={14} />
                    <span>Please select a UK/India size before enquiring.</span>
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-slate-400">
                    Click a size above to check availability in {STORE_CONFIG.city}.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {/* WhatsApp Enquiry Button with Validation State */}
              <button
                id="modal-whatsapp-enquiry-btn"
                type="button"
                onClick={handleWhatsAppEnquiry}
                className={`relative overflow-hidden cursor-pointer flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md ${
                  selectedSize !== null
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                }`}
              >
                <MessageCircle size={19} />
                <span>
                  {selectedSize !== null
                    ? `Enquire Size UK ${selectedSize} on WhatsApp`
                    : 'Select Size to Enquire on WhatsApp'}
                </span>
              </button>

              {/* Call Store option */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="modal-call-store-btn"
                  href={`tel:${STORE_CONFIG.phone}`}
                  className="relative overflow-hidden cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-colors"
                >
                  <Phone size={15} />
                  <span>Call Store</span>
                </a>

                <a
                  id="modal-directions-btn"
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-colors"
                >
                  <MapPin size={15} />
                  <span>Directions</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Store demo: No payment gateway required. Visit in-store to purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
