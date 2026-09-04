import React, { useEffect } from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { SIZE_CHART } from '../data/storeData';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="size-chart-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-chart-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl z-10 p-6 sm:p-7 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Ruler size={20} />
            </div>
            <div>
              <h2 id="size-chart-title" className="text-xl font-black text-slate-900">
                UK / India Footwear Size Chart
              </h2>
              <p className="text-xs text-slate-500 font-medium">Standard Indian market sizing reference</p>
            </div>
          </div>

          <button
            id="close-size-chart-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200">
                <th className="py-2.5 px-3">UK / India</th>
                <th className="py-2.5 px-3">EU Size</th>
                <th className="py-2.5 px-3">US Size</th>
                <th className="py-2.5 px-3">Foot Length</th>
                <th className="py-2.5 px-3">Standard For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {SIZE_CHART.map((row) => (
                <tr key={row.uk} className="hover:bg-indigo-50/40 transition-colors">
                  <td className="py-2 px-3 font-extrabold text-indigo-600">{row.uk}</td>
                  <td className="py-2 px-3">{row.eu}</td>
                  <td className="py-2 px-3">{row.us}</td>
                  <td className="py-2 px-3 text-slate-500">{row.cm}</td>
                  <td className="py-2 px-3">
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      {row.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="mt-5 p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
          <Info size={16} className="shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Pro Tip:</strong> Indian footwear sizes follow the UK sizing standard. If you are in between sizes, we recommend picking the larger size or visiting our Main Market shop for a custom fitting.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
