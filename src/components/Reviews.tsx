import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { REVIEWS_DATA } from '../data/storeData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-200 text-amber-900 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <MessageSquareHeart size={14} className="text-amber-700" />
            <span>Sample Customer Feedback — Demo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600">
            Illustrative customer testimonials demonstrating how local client satisfaction and reviews will look on the live site.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Quote Icon & Star Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < rev.rating ? "#f59e0b" : "none"}
                        className={i < rev.rating ? "text-amber-500" : "text-slate-200"}
                      />
                    ))}
                  </div>
                  <Quote size={24} className="text-slate-200" />
                </div>

                {/* Comment Text */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {rev.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {rev.location}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded font-semibold">
                    {rev.date}
                  </span>
                </div>

                <div className="mt-2.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-bold">
                  <CheckCircle2 size={13} />
                  <span>Purchased: {rev.productPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice Banner */}
        <div className="mt-10 max-w-xl mx-auto text-center">
          <p className="text-xs text-slate-400 italic">
            * Note: These testimonials are simulated showcase examples created for demonstration purposes.
          </p>
        </div>
      </div>
    </section>
  );
};
