"use client";
import { Target, Eye, ShieldCheck, HeartHandshake, FileCheck, Anchor, Handshake, ShieldCheck as ShieldIcon, Factory, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();

  const values = [
    { name: t("value1Name"), icon: ShieldCheck, desc: t("value1Desc") },
    { name: t("value2Name"), icon: HeartHandshake, desc: t("value2Desc") },
    { name: t("value3Name"), icon: FileCheck, desc: t("value3Desc") },
    { name: t("value4Name"), icon: Anchor, desc: t("value4Desc") },
    { name: t("value5Name"), icon: Handshake, desc: t("value5Desc") },
  ];

  return (
    <div className="pt-40 pb-32 min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff5f0] to-[#fffdec]">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-pink-300/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-pink-200 bg-pink-50 shadow-sm mb-8 group">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5c8a]"></span>
             </span>
             <span className="text-[#ff5c8a] font-black text-[11px] tracking-[0.3em] uppercase">{t("aboutCorporateIdentity")}</span>
          </div>
          <h1 className="mt-3 text-5xl md:text-7xl font-black text-[#014995] heading-font uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
            {t("aboutTitle1")} <br className="hidden md:block"/><span className="text-[#ff5c8a]">{t("aboutTitle2")}</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-500 font-bold uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
            {t("aboutHeaderDesc")}
          </p>
        </div>

        {/* Hero Image/Banner placeholder style */}
        <div className="w-full h-80 md:h-96 rounded-[3rem] mb-24 relative flex flex-col items-center justify-center overflow-hidden border-4 border-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] bg-gradient-to-br from-[#014995] via-[#2e1065] to-[#ff5c8a] group">
          <div className="absolute inset-0 bg-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse mix-blend-overlay"></div>
          <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Tree India Corporate" className="h-40 relative z-10 bg-white rounded-3xl p-4 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] border-2 border-transparent hover:border-pink-200 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_60px_rgba(255,92,138,0.1)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-pink-100 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-pink-50 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-[#ff5c8a] group-hover:text-white transition-colors text-[#ff5c8a] shadow-sm">
                <Target className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#014995] mb-6 uppercase tracking-tighter heading-font leading-none group-hover:text-[#ff5c8a] transition-colors">{t("aboutMissionTitle")}</h2>
              <p className="text-lg font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                {t("aboutMissionDesc")}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#014995] to-[#2e1065] p-12 md:p-16 rounded-[3rem] border-4 border-white shadow-[0_20px_40px_rgba(1,73,149,0.3)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden text-white flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-white/10 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-[150%] bg-gradient-to-t from-[#ff5c8a]/20 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-[1.5rem] backdrop-blur-md flex items-center justify-center mb-10 group-hover:bg-[#ffd93d] group-hover:text-[#014995] transition-colors text-[#ffd93d] shadow-lg border border-white/20">
                <Eye className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter heading-font leading-none">{t("aboutVisionTitle")}</h2>
              <p className="text-lg font-bold text-blue-100 uppercase tracking-widest leading-relaxed">
                {t("aboutVisionDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#014995] font-black tracking-[0.2em] text-[11px] uppercase border border-blue-100 mb-4 shadow-sm">
               {t("aboutValuesSub")}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-[#ff5c8a] uppercase tracking-tighter heading-font leading-none">{t("aboutValuesTitle")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-[#ffd93d] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,217,61,0.2)] flex flex-col group hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[#fff5f0] text-[#ff5c8a] rounded-[1.2rem] flex items-center justify-center mb-6 group-hover:bg-[#ffd93d] group-hover:text-[#014995] transition-colors shadow-sm">
                    <Icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black text-[#014995] mb-3 uppercase leading-tight heading-font">{val.name}</h3>
                  <div className="w-12 h-1.5 rounded-full bg-slate-100 mb-5 group-hover:bg-[#ff5c8a] transition-colors"></div>
                  <p className="text-[12px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
