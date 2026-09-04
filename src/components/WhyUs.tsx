import React from 'react';
import { CheckCircle2, Shield, TrendingUp, HeartHandshake, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <Shield className="text-indigo-600" size={26} />,
      title: "100% Handpicked Quality",
      desc: "Every pair is tested for sole durability, arch comfort, and long-lasting stitching before hitting our shelves.",
      badge: "Built to Last",
    },
    {
      icon: <Sparkles className="text-amber-500" size={26} />,
      title: "Fair Local Pricing",
      desc: "Get showroom quality footwear at authentic local wholesale-friendly prices with zero hidden markups.",
      badge: "Direct Value",
    },
    {
      icon: <TrendingUp className="text-emerald-600" size={26} />,
      title: "Fresh Weekly Arrivals",
      desc: "From wedding sherwani oxfords to casual daily trainers and festive ethnic flats, new designs arrive every Monday.",
      badge: "Trending Always",
    },
    {
      icon: <HeartHandshake className="text-rose-500" size={26} />,
      title: "Warm Family Hospitality",
      desc: `Serving families across ${STORE_CONFIG.city} with personalized size recommendations and honest fitting advice.`,
      badge: "Local & Trusted",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
            The UrbanStep Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Shop With Us?
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600">
            More than just a footwear store — we are your local style & comfort partners in {STORE_CONFIG.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-xs border border-slate-200/60 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-2">
                  {feature.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Verified in-store guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
