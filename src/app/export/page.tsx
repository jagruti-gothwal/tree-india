"use client";
import { Globe2, FileText, Truck, Network, ShieldCheck, Factory, Clock, PackageCheck, Handshake, Map, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Export() {
  const { t, isRTL } = useLanguage();

  const offerings = [
    { name: t("exportOffering1Title"), desc: t("exportOffering1Desc"), icon: PackageCheck },
    { name: t("exportOffering2Title"), desc: t("exportOffering2Desc"), icon: FileText },
    { name: t("exportOffering3Title"), desc: t("exportOffering3Desc"), icon: Truck },
    { name: t("exportOffering4Title"), desc: t("exportOffering4Desc"), icon: Network },
  ];

  const whyWorkWithUs = [
    { title: t("exportWhy1Title"), desc: t("exportWhy1Desc"), icon: ShieldCheck },
    { title: t("exportWhy2Title"), desc: t("exportWhy2Desc"), icon: Factory },
    { title: t("exportWhy3Title"), desc: t("exportWhy3Desc"), icon: Clock },
    { title: t("exportWhy4Title"), desc: t("exportWhy4Desc"), icon: PackageCheck },
    { title: t("exportWhy5Title"), desc: t("exportWhy5Desc"), icon: Handshake },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Header Section */}
      <section className="relative bg-slate-900 border-b-8 border-amber-500 py-32 overflow-hidden mb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase flex justify-center items-center gap-4 mb-6">
             <span className="w-12 h-px bg-amber-500 block"></span>
             {t("exportCapabilities")}
             <span className="w-12 h-px bg-amber-500 block"></span>
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white heading-font tracking-tight uppercase leading-tight drop-shadow-lg">
            {t("exportDeskTitle")}
          </h1>
          <p className="mt-8 text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            {t("exportDeskDesc")}
          </p>

          <Link 
            href="/Tree%20India%20Catalogue%20Compressed.pdf"
            target="_blank"
            className="inline-flex items-center gap-4 bg-amber-500 text-slate-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all transform hover:-translate-y-1.5 shadow-2xl shadow-amber-500/20"
          >
            <Download className="w-5 h-5" />
            {t("navDownload")}
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Offerings & Strength */}
          <div className="lg:col-span-7">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">{t("exportCoreCompetencies")}</span>
            <h2 className={cn(
              "text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-12 pl-6 leading-none",
              isRTL ? "border-r-4 border-amber-500 pr-6 pl-0" : "border-l-4 border-amber-500"
            )}>
              {t("exportOfferingsTitle")}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {offerings.map((offer, i) => {
                const Icon = offer.icon;
                return (
                  <div key={i} className={cn(
                    "bg-white border hover:border-slate-300 transition-colors shadow-sm p-8 flex flex-col group",
                    isRTL ? "items-end text-right" : "items-start"
                  )}>
                    <div className="w-12 h-12 bg-slate-900 text-amber-500 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform origin-left">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide leading-snug mb-3">{offer.name}</h3>
                    <p className="text-sm text-slate-500 font-light">{offer.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className={cn(
              "bg-slate-900 text-white p-12 shadow-xl relative overflow-hidden group",
              isRTL ? "border-r-8 border-amber-500" : "border-l-8 border-amber-500"
            )}>
               <div className="absolute top-0 right-0 w-48 h-48 bg-slate-800 rounded-full translate-x-16 -translate-y-16 opacity-30"></div>
               <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-6 flex items-center gap-3">
                 <ShieldCheck className="text-amber-500 w-8 h-8" />
                 {t("exportStrengthTitle")}
               </h3>
               <p className="text-slate-300 font-light leading-relaxed text-lg">
                 {t("exportStrengthDesc")}
               </p>
            </div>
          </div>

          {/* Right Column: Why Work With Us */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">{t("exportAdvantageSub")}</span>
              <h2 className={cn(
                "text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-10 pl-6 leading-none",
                isRTL ? "border-r-4 border-amber-500 pr-6 pl-0" : "border-l-4 border-amber-500"
              )}>
                {t("exportWhyWorkTitle")}
              </h2>
              <div className="space-y-4">
                {whyWorkWithUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={cn(
                      "flex items-start bg-white p-6 border border-slate-100 hover:border-amber-500 shadow-sm transition-all group",
                      isRTL && "flex-row-reverse text-right"
                    )}>
                      <div className={cn(
                        "shrink-0 mt-1 text-slate-300 group-hover:text-amber-500 transition-colors",
                        isRTL ? "ml-6" : "mr-6"
                      )}>
                         <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Presence */}
      <section className="relative mt-32 py-32 bg-slate-900 overflow-hidden">
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5">
            <Map className="w-full h-full text-white transform scale-150" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-6 block">{t("exportFootprint")}</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white heading-font uppercase tracking-tight leading-tight mb-6">
              {t("exportReachTitle")}
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-10"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-16">
              {t("exportReachDesc")}
            </p>

            <div className="bg-slate-800 border border-slate-700 p-16 shadow-2xl max-w-4xl mx-auto relative group">
               <div className={cn(
                 "absolute top-0 w-2 h-full bg-amber-500",
                 isRTL ? "right-0" : "left-0"
               )}></div>
               <Globe2 className="w-24 h-24 text-amber-500 mx-auto mb-8 animate-[spin_10s_linear_infinite] opacity-80" />
               <p className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">{t("exportHubTitle")}</p>
               <p className="text-lg text-slate-400 font-light max-w-lg mx-auto leading-relaxed">
                 {t("exportHubDesc")}
               </p>
            </div>
         </div>
      </section>

    </div>
  );
}
