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
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 font-sans overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-[#014995] via-[#3b0764] to-[#ff5c8a] border-b-[12px] border-[#ffd93d] py-40 overflow-visible mb-32 z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
        {/* Candy Aesthetic Background Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-300/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm mb-10 group">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd93d] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffd93d]"></span>
             </span>
             <span className="text-white font-black text-[11px] tracking-[0.3em] uppercase">{t("exportCapabilities")}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white heading-font tracking-tighter uppercase leading-[0.85] drop-shadow-2xl mb-8">
            {t("exportDeskTitle")}
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-100 max-w-4xl mx-auto leading-relaxed font-bold tracking-wider mb-14 drop-shadow-sm uppercase">
            {t("exportDeskDesc")}
          </p>

          <Link 
            href="/Tree%20India%20Catalogue%20Compressed.pdf"
            target="_blank"
            className="inline-flex items-center gap-4 bg-[#ffd93d] text-[#014995] px-12 py-6 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,217,61,0.3)]"
          >
            <Download className="w-6 h-6" strokeWidth={3} />
            {t("navDownload")}
          </Link>
        </div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-[-1] translate-y-[99%]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-[101%] h-[80px] block">
            <path fill="#f8fafc" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Offerings & Strength */}
          <div className="lg:col-span-7">
            <span className="text-[#ff5c8a] font-black tracking-[0.3em] text-[11px] uppercase mb-4 block inline-flex items-center gap-3 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">{t("exportCoreCompetencies")}</span>
            <h2 className={cn(
              "text-5xl md:text-6xl font-black text-[#014995] uppercase tracking-tighter mb-12 heading-font leading-[0.9]",
              isRTL ? "text-right" : "text-left"
            )}>
              {t("exportOfferingsTitle")}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {offerings.map((offer, i) => {
                const Icon = offer.icon;
                return (
                  <div key={i} className={cn(
                    "bg-white border-2 border-transparent hover:border-pink-200 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,92,138,0.1)] transition-all shadow-sm rounded-[2rem] p-10 flex flex-col group",
                    isRTL ? "items-end text-right" : "items-start"
                  )}>
                    <div className="w-16 h-16 bg-[#fff5f0] text-[#ff5c8a] rounded-2xl mb-8 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff5c8a] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-black text-[#014995] uppercase tracking-tighter leading-snug mb-4 heading-font">{offer.name}</h3>
                    <p className="text-[14px] font-bold text-slate-500 uppercase tracking-widest">{offer.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className={cn(
              "bg-[#014995] text-white p-12 lg:p-16 rounded-[3rem] shadow-[0_20px_40px_rgba(1,73,149,0.3)] relative overflow-hidden group border-4 border-white",
              isRTL ? "" : ""
            )}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full translate-x-16 -translate-y-16 blur-3xl pointer-events-none"></div>
               <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 heading-font">
                 <ShieldCheck className="text-[#ffd93d] w-10 h-10" strokeWidth={3} />
                 {t("exportStrengthTitle")}
               </h3>
               <p className="text-blue-100 font-bold leading-relaxed text-lg uppercase tracking-wider">
                 {t("exportStrengthDesc")}
               </p>
            </div>
          </div>

          {/* Right Column: Why Work With Us */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <span className="text-[#ff5c8a] font-black tracking-[0.3em] text-[11px] uppercase mb-4 block inline-flex items-center gap-3 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">{t("exportAdvantageSub")}</span>
              <h2 className={cn(
                "text-5xl md:text-6xl font-black text-[#014995] uppercase tracking-tighter mb-12 heading-font leading-[0.9]",
                isRTL ? "text-right" : "text-left"
              )}>
                {t("exportWhyWorkTitle")}
              </h2>
              <div className="space-y-4">
                {whyWorkWithUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={cn(
                      "flex items-start bg-white p-6 md:p-8 rounded-[2rem] border-2 border-transparent hover:border-[#ffd93d] hover:shadow-[0_20px_40px_rgba(255,217,61,0.15)] shadow-sm transition-all group hover:-translate-y-1 mb-4",
                      isRTL && "flex-row-reverse text-right"
                    )}>
                      <div className={cn(
                        "shrink-0 mt-1 w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-[#ffd93d] group-hover:text-white transition-colors",
                        isRTL ? "ml-6" : "mr-6"
                      )}>
                         <Icon className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-[#014995] uppercase tracking-tighter leading-none mb-3 heading-font">{item.title}</h4>
                        <p className="text-[12px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
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
      <section className="relative mt-32 py-40 bg-gradient-to-br from-[#014995] via-[#2e1065] to-[#ff5c8a] overflow-visible z-10 border-t-[12px] border-[#ffd93d]">
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 mix-blend-overlay">
            <Map className="w-full h-full text-white transform scale-150" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-black tracking-[0.3em] text-[11px] uppercase mb-8 shadow-xl">
               <span className="w-2 h-2 bg-[#ffd93d] rounded-full animate-ping"></span>
               {t("exportFootprint")}
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-white heading-font uppercase tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl">
              {t("exportReachTitle")}
            </h2>
            <div className="w-32 h-2 bg-[#ffd93d] rounded-full mx-auto mb-10 shadow-[0_0_20px_rgba(255,217,61,0.5)]"></div>
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed font-bold uppercase tracking-wider mb-20 drop-shadow-sm">
              {t("exportReachDesc")}
            </p>

            <div className="bg-white/10 backdrop-blur-xl border-4 border-white/20 p-16 md:p-20 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] max-w-4xl mx-auto relative group hover:-translate-y-2 transition-transform duration-500">
               <div className={cn(
                 "absolute top-0 w-full h-2 bg-[#ffd93d] left-0 rounded-t-[2.5rem]",
               )}></div>
               <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#ffd93d] to-[#ff9800] rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500">
                  <Globe2 className="w-16 h-16 text-[#014995]" strokeWidth={2.5} />
               </div>
               <p className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter heading-font">{t("exportHubTitle")}</p>
               <p className="text-lg text-blue-100 font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                 {t("exportHubDesc")}
               </p>
            </div>
         </div>
      </section>

    </div>
  );
}
