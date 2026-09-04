import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Mail, Navigation, CheckCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeData';

interface StoreLocationProps {
  onOpenWhatsAppGeneral: () => void;
}

export const StoreLocation: React.FC<StoreLocationProps> = ({ onOpenWhatsAppGeneral }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${STORE_CONFIG.address}, ${STORE_CONFIG.landmark}, ${STORE_CONFIG.city}, ${STORE_CONFIG.state} - ${STORE_CONFIG.pincode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
            Visit & Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Store Location & Opening Hours
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600">
            Come try on your favourite styles in person. We are conveniently located in {STORE_CONFIG.city}.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Details Column */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 space-y-8">
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs border border-indigo-100">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider block">
                    Physical Store Address
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {STORE_CONFIG.address}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {STORE_CONFIG.landmark}, {STORE_CONFIG.city}, {STORE_CONFIG.state} — {STORE_CONFIG.pincode}
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <a
                      id="google-maps-directions-link"
                      href={STORE_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                    >
                      <Navigation size={13} />
                      <span>Get Directions (Google Maps)</span>
                      <ExternalLink size={12} />
                    </a>

                    <button
                      id="copy-address-btn"
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={13} className="text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <span>Copy Full Address</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Opening Hours Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-xs border border-amber-100">
                  <Clock size={24} />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
                      Shop Timings
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open Today
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Monday – Saturday</span>
                      <span className="font-bold text-slate-900">{STORE_CONFIG.openingHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Sunday</span>
                      <span className="font-bold text-slate-900">{STORE_CONFIG.openingHours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100">
                  <Phone size={24} />
                </div>
                <div className="space-y-2.5 flex-1">
                  <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">
                    Phone & WhatsApp Inquiries
                  </span>
                  <p className="text-sm text-slate-600">
                    Want to check if a particular model or size is in stock before heading out? Contact our shop manager directly:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      id="contact-call-btn"
                      href={`tel:${STORE_CONFIG.phone}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-xs"
                    >
                      <Phone size={16} />
                      <span>Call {STORE_CONFIG.phone}</span>
                    </a>

                    <button
                      id="contact-whatsapp-btn"
                      onClick={onOpenWhatsAppGeneral}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle size={17} />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Preview Column */}
            <div className="lg:col-span-5 bg-slate-200 relative min-h-[350px] lg:min-h-full flex flex-col justify-between overflow-hidden">
              {/* Simulated Map Visual Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-slate-900/95 flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-indigo-500/30 flex items-center justify-center mb-4 border-2 border-indigo-400 animate-pulse">
                  <MapPin size={32} className="text-white" />
                </div>

                <span className="text-xs font-extrabold tracking-widest uppercase text-indigo-300 mb-1">
                  Interactive Map Integration
                </span>
                <h3 className="text-xl font-black mb-2">
                  UrbanStep Store Location
                </h3>
                <p className="text-xs text-slate-300 max-w-xs mb-6 leading-relaxed">
                  In the live production version for your client, this area embeds the live Google Map iframe or Maps JavaScript API.
                </p>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-full max-w-xs text-left mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white">Main Market, Fraser Road</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Near City Centre Mall • Ample two-wheeler & car parking nearby
                  </p>
                </div>

                <a
                  id="open-google-maps-btn"
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-extrabold text-xs shadow-lg transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
