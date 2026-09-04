import React from 'react';
import { Product } from '../types';
import { MessageCircle, Eye, Check } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onQuickWhatsApp,
}) => {
  const discountPercent = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <article
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-slate-100">
            {product.category}
          </span>
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Gender Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.gender}
          </span>
        </div>

        {/* Quick View overlay prompt */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye size={14} /> Quick View
          </span>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title & Color */}
        <div className="mb-2">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-400 mb-0.5">
            <span>Color: {product.color}</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-0.5">
              <Check size={11} /> In Stock
            </span>
          </div>
          <h3 
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 cursor-pointer"
            onClick={() => onViewDetails(product)}
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.desc}
        </p>

        {/* Available Sizes Tag Chips */}
        <div className="mb-3.5">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
            UK/India Sizes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(product);
                }}
                className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 px-2 py-0.5 rounded border border-slate-200/60 transition-colors cursor-pointer"
                title={`Select size ${s} and view details`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black text-slate-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp && product.mrp > product.price && (
            <>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-extrabold text-emerald-600">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            id={`btn-view-details-${product.id}`}
            type="button"
            onClick={() => onViewDetails(product)}
            className="relative overflow-hidden w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye size={15} />
            <span>Details</span>
          </button>

          <button
            id={`btn-whatsapp-card-${product.id}`}
            type="button"
            onClick={() => onQuickWhatsApp(product)}
            className="relative overflow-hidden w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Ask availability on WhatsApp"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
};
