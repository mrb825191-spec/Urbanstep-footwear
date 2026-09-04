import React from 'react';
import { FootwearCategory } from '../types';
import { User, Users, Baby, Activity, Coffee, Briefcase, Sun, Home, Layers } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: FootwearCategory;
  onSelectCategory: (category: FootwearCategory) => void;
  categoryCounts: Record<string, number>;
}

interface CategoryItem {
  id: FootwearCategory;
  name: string;
  icon: React.ReactNode;
  subtitle: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: CategoryItem[] = [
    { id: 'All', name: 'All Pairs', icon: <Layers size={18} />, subtitle: 'Full collection' },
    { id: 'Men', name: 'Men', icon: <User size={18} />, subtitle: 'Formal & casual' },
    { id: 'Women', name: 'Women', icon: <Users size={18} />, subtitle: 'Heels, flats & more' },
    { id: 'Kids', name: 'Kids', icon: <Baby size={18} />, subtitle: 'School & sports' },
    { id: 'Sports', name: 'Sports', icon: <Activity size={18} />, subtitle: 'Gym & running' },
    { id: 'Casual', name: 'Casual', icon: <Coffee size={18} />, subtitle: 'Sneakers & slides' },
    { id: 'Formal', name: 'Formal', icon: <Briefcase size={18} />, subtitle: 'Oxfords & loafers' },
    { id: 'Sandals', name: 'Sandals', icon: <Sun size={18} />, subtitle: 'Summer & daily' },
    { id: 'Slippers', name: 'Slippers', icon: <Home size={18} />, subtitle: 'Home comfort' },
  ];

  return (
    <section id="categories" className="py-12 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
              Find Your Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Browse by Style & Gender
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-0 font-medium">
            Handpicked quality designs ready in our Main Market shop
          </p>
        </div>

        {/* Categories Grid / Horizontal Scroll for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id.toLowerCase()}`}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  const shopEl = document.getElementById('shop');
                  if (shopEl) {
                    shopEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-600 ring-offset-2'
                    : 'bg-white text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-900 border border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </div>

                <div>
                  <span className="font-extrabold text-sm block leading-tight">
                    {cat.name}
                  </span>
                  <span
                    className={`text-[10px] line-clamp-1 mt-0.5 ${
                      isSelected ? 'text-indigo-100' : 'text-slate-400'
                    }`}
                  >
                    {cat.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
