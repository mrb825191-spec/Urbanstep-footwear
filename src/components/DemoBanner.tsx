import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

interface DemoBannerProps {
  onLearnMore?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = () => {
  return (
    <aside 
      id="demo-banner" 
      aria-label="Demo notice banner"
      className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white text-xs font-semibold py-2 px-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles size={15} className="shrink-0 animate-pulse text-amber-200" />
          <span>
            <strong className="uppercase tracking-wider font-extrabold mr-1">Demo Website • Sample Project</strong>
            — Showcase for local footwear retail stores. Products, prices & reviews are illustrative.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] bg-black/15 px-2.5 py-0.5 rounded-full shrink-0">
          <span>Client Prototype Ready</span>
        </div>
      </div>
    </aside>
  );
};
