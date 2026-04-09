"use client";
import { 
  Globe2, FileText, Truck, Network, ShieldCheck, Factory, 
  Clock, PackageCheck, Handshake, Map, Download, 
  ArrowRight, CheckCircle2, Award, Zap
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function Export() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef(null);

  const offerings = [
    { name: t("exportOffering1Title"), desc: t("exportOffering1Desc"), icon: PackageCheck, color: "from-blue-500 to-indigo-600" },
    { name: t("exportOffering2Title"), desc: t("exportOffering2Desc"), icon: FileText, color: "from-emerald-400 to-teal-600" },
    { name: t("exportOffering3Title"), desc: t("exportOffering3Desc"), icon: Truck, color: "from-orange-400 to-rose-500" },
  ];

  const whyWorkWithUs = [
    { title: t("exportWhy1Title"), desc: t("exportWhy1Desc"), icon: ShieldCheck },
    { title: t("exportWhy2Title"), desc: t("exportWhy2Desc"), icon: Factory },
    { title: t("exportWhy3Title"), desc: t("exportWhy3Desc"), icon: Clock },
  ];

  const howWeWork = [
    { title: t("exportHow1"), icon: Handshake },
    { title: t("exportHow2"), icon: ShieldCheck },
    { title: t("exportHow3"), icon: Network },
    { title: t("exportHow4"), icon: Clock },
  ];

  const b2bBenefits = [
    { title: t("exportBenefit1"), icon: Truck },
    { title: t("exportBenefit2"), icon: FileText },
    { title: t("exportBenefit3"), icon: PackageCheck },
    { title: t("exportBenefit4"), icon: Network },
  ];

  return (
    <div 
      className="bg-white min-h-screen pt-20 pb-0 font-sans overflow-x-hidden selection:bg-[#ffd93d] selection:text-[#014995]" 
      dir={isRTL ? "rtl" : "ltr"}
      ref={containerRef}
    >
      
      {/* Hero Section - High Fidelity Mesh Gradient */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#014995] via-[#3b0764] to-[#ff5c8a] opacity-95"></div>
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-pink-500/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
          
          {/* Animated SVG Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
             <motion.path 
               d="M0 50 Q 25 30 50 50 T 100 50" 
               stroke="white" 
               strokeWidth="0.1" 
               fill="none"
               animate={{ d: ["M0 50 Q 25 30 50 50 T 100 50", "M0 50 Q 25 70 50 50 T 100 50", "M0 50 Q 25 30 50 50 T 100 50"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl mb-12 group"
          >
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd93d] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffd93d]"></span>
             </span>
             <span className="text-white font-black text-[12px] tracking-[0.4em] uppercase">{t("exportCapabilities")}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-9xl font-black text-white heading-font tracking-tighter uppercase leading-[0.85] mb-10"
          >
            {t("exportDeskTitle").split(" ").map((word, i) => (
              <span key={i} className="block last:text-[#ffd93d]">{word}</span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide mb-16 px-4"
          >
            {t("exportDeskDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/Tree%20India%20Catalogue%20Compressed.pdf"
              target="_blank"
              className="group relative flex items-center gap-4 bg-[#ffd93d] text-[#014995] px-12 py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_50px_rgba(255,217,61,0.4)] hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <Download className="w-6 h-6" strokeWidth={3} />
              {t("navDownload")}
            </Link>
            
            <Link 
              href="/contact"
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              {t("exportContactAgent")}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements for depth */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[40%] hidden lg:block"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#ffd93d] to-orange-400 rounded-3xl rotate-12 blur-[1px] shadow-2xl flex items-center justify-center">
            <Globe2 className="w-12 h-12 text-[#014995]" />
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[8%] bottom-[30%] hidden lg:block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-[#ff5c8a] rounded-full -rotate-12 blur-[1px] shadow-2xl flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Stats / Numbers Section */}
      <section className="relative z-20 -mt-16 mb-40 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-slate-100 p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-slate-100 divide-dashed">
          {[
            { label: t("exportStatsGlobal"), val: "15+", sub: t("exportStatsCountries") },
            { label: t("exportStatsProducts"), val: "100+", sub: t("exportStatsSKUs") },
            { label: t("exportStatsExp"), val: "10+", sub: t("exportStatsYears") },
            { label: t("exportStatsSuccess"), val: "99%", sub: t("exportStatsDelivery") },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black text-[#014995] mb-2 heading-font">{stat.val}</div>
              <div className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ff5c8a]">{stat.label}</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Competencies - Grid with Asymmetric Feel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="mb-20 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-blue-50 text-[#014995] px-6 py-2 rounded-full font-black tracking-[0.3em] text-[11px] uppercase border border-blue-100 mb-6"
          >
            <Zap className="w-4 h-4 fill-current" />
            {t("exportCoreCompetencies")}
          </motion.span>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-black text-[#014995] uppercase tracking-tighter heading-font leading-none"
          >
            {t("exportOfferingsTitle")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {offerings.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -15 }}
                className="group relative bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-50 overflow-hidden"
              >
                <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-bl-full transition-transform group-hover:scale-150", offer.color)}></div>
                <div className={cn("inline-flex w-20 h-20 items-center justify-center rounded-3xl mb-10 text-white shadow-xl transition-all group-hover:rotate-6 bg-gradient-to-br", offer.color)}>
                  <Icon className="w-10 h-10" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-[#014995] uppercase tracking-tighter mb-6 heading-font leading-tight">{offer.name}</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">{offer.desc}</p>
                <div className="flex items-center gap-2 text-[#ff5c8a] font-black text-[12px] uppercase tracking-widest">
                  {t("exportLearnMore")} <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Highlight - Impactful Dark Section */}
      <section className="mb-40 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[4rem] bg-[#014995] relative overflow-hidden flex flex-col lg:flex-row items-stretch border-[12px] border-white shadow-[0_60px_100px_rgba(1,73,149,0.3)]"
        >
          <div className="flex-1 p-12 lg:p-24 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-1 bg-[#ffd93d]"></div>
              <span className="text-[#ffd93d] font-black uppercase tracking-[0.4em] text-[12px]">{t("exportStrengthTitle")}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10 heading-font leading-[0.9]">
              {t("exportBuiltFor")}
            </h2>
            <p className="text-blue-100 text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-2xl">
              {t("exportStrengthDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[t("exportQualityAssurance"), t("exportCompliance"), t("exportSecureLogistics"), t("exportSupport247")].map((item, j) => (
                <div key={j} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ffd93d] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-white group-hover:text-[#014995]" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-[13px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-indigo-900 to-[#3b0764] relative min-h-[400px]">
             <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Globe2 className="w-64 h-64 text-white/10 animate-[spin_20s_linear_infinite]" strokeWidth={1} />
             </div>
             {/* Badge Overlay */}
             <div className="absolute bottom-12 right-12 bg-white p-8 rounded-[2rem] shadow-2xl rotate-3 flex flex-col items-center">
                <Award className="w-12 h-12 text-[#ff5c8a] mb-4" />
                <span className="text-[#014995] font-black text-[11px] uppercase tracking-[0.2em] mb-1">{t("exportCertified")}</span>
                <span className="text-[#014995] font-black text-xl uppercase tracking-tighter heading-font">{t("exportGlobalExporter")}</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Advantage & Why section with Vertical flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-[#ff5c8a] font-black tracking-[0.3em] text-[11px] uppercase mb-6 block">{t("exportAdvantageSub")}</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#014995] uppercase tracking-tighter mb-12 heading-font leading-none">
              {t("exportWhyWorkTitle")}
            </h2>
            <div className="space-y-6">
              {whyWorkWithUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <div className="shrink-0 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#ff5c8a] group-hover:bg-[#ff5c8a] group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:-rotate-3">
                       <Icon className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <div className="pt-2">
                       <h4 className="text-2xl font-black text-[#014995] uppercase tracking-tighter mb-3 heading-font">{item.title}</h4>
                       <p className="text-slate-500 font-medium leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="relative pt-20 lg:pt-0">
             <div className="aspect-square bg-slate-100 rounded-[4rem] relative overflow-hidden shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
                {/* Decorative dots grid */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#014995_2px,transparent_2px)] bg-[size:30px_30px]"></div>
                
                <div className="absolute inset-12 border-4 border-dashed border-slate-200 rounded-[3rem]"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-80 h-80 border-[1px] border-slate-200 rounded-full flex items-center justify-center"
                      >
                         <div className="absolute -top-4 w-8 h-8 bg-[#ffd93d] rounded-full shadow-lg"></div>
                         <div className="absolute -bottom-4 w-8 h-8 bg-[#ff5c8a] rounded-full shadow-lg"></div>
                      </motion.div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                         <div className="w-32 h-32 bg-white rounded-full shadow-2xl border-8 border-slate-50 flex items-center justify-center mb-4">
                            <Globe2 className="w-12 h-12 text-[#014995] animate-pulse" />
                         </div>
                         <span className="font-black text-[#014995] uppercase tracking-[0.2em] text-[10px]">Tree India</span>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Floating Info card */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="absolute -right-8 bottom-8 bg-white p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-50 max-w-[240px]"
             >
                <div className="flex items-center gap-2 text-green-500 mb-2">
                   <CheckCircle2 className="w-5 h-5" />
                   <span className="font-black text-[11px] uppercase">{t("exportVerifiedAgent")}</span>
                </div>
                <p className="text-[#014995] font-bold text-sm leading-tight">{t("exportInstantQuotes")}</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work & Benefits - Side by Side Color Block */}
      <section className="bg-slate-50 py-40">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 lg:p-20 rounded-[4rem] shadow-xl border border-slate-100 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[#ff5c8a]"></div>
                <h3 className="text-4xl font-black text-[#014995] uppercase tracking-tighter mb-12 heading-font">{t("exportHowWorkTitle")}</h3>
                <div className="space-y-4">
                  {howWeWork.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="w-14 h-14 bg-pink-50 text-[#ff5c8a] rounded-2xl flex items-center justify-center shrink-0">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <span className="text-lg font-black text-[#014995] uppercase tracking-tighter heading-font">{item.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#014995] p-12 lg:p-20 rounded-[4rem] shadow-2xl text-white group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-[#ffd93d]"></div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-12 heading-font">{t("exportB2BBenefitsTitle")}</h3>
                <div className="space-y-4">
                  {b2bBenefits.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                      <div className="w-14 h-14 bg-[#ffd93d] text-[#014995] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#ffd93d]/20">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <span className="text-lg font-black text-white uppercase tracking-tighter heading-font">{item.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Global Presence Map Section */}
      <section className="relative py-40 bg-white overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner"
            >
               <Map className="w-10 h-10 text-[#014995]" strokeWidth={2} />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black text-[#014995] heading-font uppercase tracking-tighter leading-[0.85] mb-12"
            >
              {t("exportReachTitle")}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed mb-24"
            >
              {t("exportReachDesc")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[5rem] bg-gradient-to-br from-[#014995] to-[#2e1065] p-12 lg:p-24 shadow-[0_80px_150px_rgba(1,73,149,0.3)] border-[16px] border-[#f8fafc]"
            >
               <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div className="text-left">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#ffd93d] border border-white/20 font-black text-[11px] uppercase tracking-[0.2em] mb-8">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {t("exportStrategicHQ")}
                     </div>
                     <h3 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter heading-font leading-none">{t("exportHubTitle")}</h3>
                     <p className="text-xl text-blue-100 font-medium leading-relaxed mb-12">
                       {t("exportHubDesc")}
                     </p>
                     <div className="flex flex-wrap gap-4">
                        {["Port of Mundra", "Port of Mumbai", "Port of Chennai", "Delhi Logistics Hub"].map((port, i) => (
                           <span key={i} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                              {port}
                           </span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="relative aspect-square md:aspect-auto h-[400px] flex items-center justify-center">
                     <div className="relative">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }} 
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-64 h-64 bg-[#ffd93d]/20 rounded-full flex items-center justify-center"
                        >
                           <motion.div 
                             animate={{ scale: [1, 1.2, 1] }} 
                             transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                             className="w-40 h-40 bg-[#ffd93d]/40 rounded-full flex items-center justify-center"
                           >
                              <div className="w-20 h-20 bg-[#ffd93d] rounded-full shadow-[0_0_50px_rgba(255,217,61,0.5)] flex items-center justify-center">
                                 <Globe2 className="w-10 h-10 text-[#014995]" />
                              </div>
                           </motion.div>
                        </motion.div>
                        {/* Decorative floating points */}
                        {[...Array(5)].map((_, i) => (
                           <motion.div
                              key={i}
                              animate={{ 
                                x: [0, Math.cos(i) * 100, 0],
                                y: [0, Math.sin(i) * 100, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ duration: 6 + i, repeat: Infinity, delay: i }}
                              className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full"
                           />
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Call to Action - Final Impact */}
      <section className="py-40 px-4">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto bg-gradient-to-br from-[#ff5c8a] to-[#ff9800] rounded-[5rem] p-12 md:p-24 text-center shadow-[0_40px_100px_rgba(255,92,138,0.3)] relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-white/10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-twill.png')]"></div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 heading-font leading-none relative z-10">
              {t("exportReadyToExpand")}
            </h2>
            <p className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest mb-16 opacity-90 relative z-10">
              {t("exportJoinNetwork")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
               <Link 
                 href="/contact"
                 className="bg-[#014995] text-white px-16 py-8 rounded-[2rem] font-black text-[18px] uppercase tracking-widest hover:bg-[#014995]/80 transition-all hover:scale-105 shadow-2xl"
               >
                 {t("exportGetStarted")}
               </Link>
               <Link 
                 href="/products"
                 className="bg-white/20 backdrop-blur-md text-white border-4 border-white/30 px-16 py-8 rounded-[2rem] font-black text-[18px] uppercase tracking-widest hover:bg-white/30 transition-all hover:scale-105"
               >
                 {t("heroViewProducts")}
               </Link>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
