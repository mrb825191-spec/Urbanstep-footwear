import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

interface WhatsAppFabProps {
  onClick: () => void;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Prompt Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-right-2 duration-300">
          <span>Need size help? Chat with us!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Dismiss message"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-fab"
        type="button"
        onClick={onClick}
        className="relative group bg-emerald-600 hover:bg-emerald-700 text-white w-14 h-14 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-400/50 cursor-pointer"
        aria-label="Chat on WhatsApp with UrbanStep Footwear"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
        <MessageCircle size={30} className="stroke-[2.2]" />
      </button>
    </div>
  );
};
