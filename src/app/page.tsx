"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, PackageSearch, Truck, Award, Globe, ShoppingBag, ShieldCheck, Zap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import WorldMap from "@/components/WorldMap";
import Certificates from "@/components/Certificates";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Background product images for float effect (Subtle for Light Mode)
  const floatingProducts = [
    { src: "/BABA LOVELY POP BLUEBERRY MARKUP.png", size: "w-64 md:w-80", top: "8%", left: "2%", delay: 0, rotate: -15 },
    { src: "/DJ American Biscuits Markup.png", size: "w-72 md:w-96", top: "12%", right: "1%", delay: 2, rotate: 10 },
    { src: "/DJ Choco Eclairs Jar Markup.png", size: "w-64 md:w-80", bottom: "12%", left: "5%", delay: 4, rotate: 15 },
    { src: "/DJ Gum Pops Markup.png", size: "w-72 md:w-80", bottom: "15%", right: "8%", delay: 1, rotate: -5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 overflow-hidden relative">
      
      {/* Aceternity Spotlight (Soft Blue for Light Mode) */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-[0.4]" fill="#e0f2fe" />
      
      {/* Background Glows for Color (Soft for Light Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-amber-50 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 opacity-60"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-20 pb-20 z-10 overflow-hidden">
        
        {/* Large Floating Background Products (Highly Transparent) */}
        {floatingProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.08, 0.15, 0.08], 
              scale: 1, 
              y: [0, -40, 0],
              rotate: [p.rotate, p.rotate + 10, p.rotate]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: p.delay 
            }}
            style={{ 
              top: p.top, 
              left: p.left, 
              right: p.right, 
              bottom: p.bottom,
              position: "absolute",
              zIndex: 0
            }}
            className={`${p.size} pointer-events-none filter drop-shadow-2xl hidden lg:block`}
          >
            <img src={p.src} alt="Product" className="w-full h-auto object-contain opacity-40 grayscale-[10%]" />
          </motion.div>
        ))}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-blue-100 bg-blue-50 shadow-sm mb-10 group"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="text-[#003366] font-black text-[11px] tracking-[0.3em] uppercase">
                {t("heroTrust")}
              </span>
            </motion.div>

            <motion.div className="pb-8">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-slate-900 uppercase heading-font"
              >
                {t("heroTitle1")} <br />
                <span className="relative inline-block mt-2">
                  <span className="text-[#003366]">
                    {t("heroTitle2")}
                  </span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    className="absolute -bottom-1 left-0 right-0 h-[6px] bg-amber-400 rounded-full origin-left"
                  ></motion.div>
                </span>
              </motion.h1>
              
              <TextGenerateEffect 
                words={t("heroSubtitle")}
                className="text-lg md:text-2xl font-black text-[#003366]/80 mt-6 mb-6 tracking-[0.15em] uppercase max-w-4xl"
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-500 mb-14 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              {t("heroDesc")}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            >
              <Link
                href="/products"
                className="relative inline-flex h-16 w-full sm:w-auto overflow-hidden rounded-full p-[2px] shadow-xl group active:scale-95 transition-transform"
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#003366_0%,#3b82f6_50%,#003366_100%)] opacity-20" />
                <span className="inline-flex h-full w-full sm:px-12 cursor-pointer items-center justify-center rounded-full bg-[#003366] px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white transition-all group-hover:bg-[#002244] gap-3">
                  <PackageSearch className="w-5 h-5" /> {t("heroViewProducts")}
                </span>
              </Link>
              
              <Link
                href="/Tree%20India%20Catalogue%20Compressed.pdf"
                target="_blank"
                className="group relative h-16 w-full sm:w-auto flex items-center justify-center px-10 bg-white border-2 border-slate-200 rounded-full text-slate-700 text-[12px] font-black uppercase tracking-widest transition-all hover:border-[#003366] hover:text-[#003366] hover:shadow-lg gap-3"
              >
                <Download className="w-4 h-4 text-[#003366]" /> {t("navDownload")}
              </Link>

              <Link
                href="/contact"
                className="group relative h-16 w-full sm:w-auto flex items-center justify-center px-10 bg-white border-2 border-slate-200 rounded-full text-slate-700 text-[12px] font-black uppercase tracking-widest transition-all hover:border-[#003366] hover:text-[#003366] hover:shadow-lg"
              >
                {t("heroBulkInquiry")} <ArrowRight className={cn("w-4 h-4 ml-3 group-hover:translate-x-1.5 transition-transform", isRTL && "rotate-180")} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Bar (Bakewell Style) */}
      <section className="bg-white py-14 border-y border-slate-100 relative z-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-around items-center gap-x-16 gap-y-8">
            {[
               { icon: Globe, label: t("trustCountries") },
               { icon: ShoppingBag, label: t("trustProducts") },
               { icon: ShieldCheck, label: t("trustQuality") },
               { icon: Zap, label: t("trustLogistics") }
            ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3.5 group">
                  <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    <item.icon className="w-5 h-5 text-[#003366]" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-[#003366] transition-colors">{item.label}</span>
               </div>
            ))}
         </div>
      </section>

      {/* Certificates Section (Cefa Style) */}
      <Certificates />

      {/* Interactive World Map (Dukes Style - Open & Clean) */}
      <WorldMap />

      {/* Featured Products Grid (Dukes Style - Circular Frames) */}
      <section className="py-40 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-3xl">
              <span className="text-amber-500 font-black tracking-[0.3em] text-[11px] uppercase mb-5 block">{t("bestSellers")}</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.95] heading-font">{t("exportPortfolio1")} <br /><span className="text-[#003366]">{t("exportPortfolio2")}</span></h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-4 bg-[#003366] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-[#002244] transition-all transform hover:-translate-y-1.5 shadow-xl shadow-[#003366]/20">
               {t("exploreCatalog")} <ArrowRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: t("featured1Title"), category: t("featured1Cat"), image: "/BABA LOVELY POP BLUEBERRY MARKUP.png", color: "from-blue-50 to-white" },
              { title: t("featured2Title"), category: t("featured2Cat"), image: "/DJ American Biscuits Markup.png", color: "from-amber-50 to-white" },
              { title: t("featured3Title"), category: t("featured3Cat"), image: "/DJ Gum Pops Markup.png", color: "from-rose-50 to-white" },
              { title: t("featured4Title"), category: t("featured4Cat"), image: "/DJ Choco Eclairs Jar Markup.png", color: "from-slate-100 to-white" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredProduct(idx)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href="/products" className="block group text-center">
                  <div className={`relative aspect-square bg-gradient-to-br ${item.color} border border-slate-100 rounded-full flex items-center justify-center p-14 mb-8 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 group-hover:border-blue-100`}>
                    <motion.img 
                      animate={hoveredProduct === idx ? { y: -15, scale: 1.1, rotate: 3 } : { y: 0, scale: 1, rotate: 0 }}
                      src={item.image} alt={item.title} className="max-h-full max-w-full object-contain filter drop-shadow-2xl z-10" 
                    />
                  </div>
                  <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 tracking-widest uppercase mb-4">{item.category}</span>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#003366] transition-colors heading-font">{item.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production & Reliability (Corporate Strategy) */}
      <section className="py-40 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
               <div className="relative rounded-[4rem] bg-white p-6 shadow-3xl overflow-hidden group">
                 <img src="/DJ American Biscuits Markup Combine.png" alt="Tree India Production" className="w-full h-auto object-cover rounded-[3.5rem] bg-slate-50 group-hover:scale-105 transition-transform duration-1000" />
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#003366] font-black tracking-[0.3em] text-[11px] uppercase mb-6 block">{t("strategyExport")}</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter uppercase heading-font">
                {t("strategyTitle1")} <br /><span className="text-[#003366]">{t("strategyTitle2")}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10">
                {t("strategyDesc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {[
                  t("strategyPricing"),
                  t("strategyTesting"),
                  t("strategyLogistics"),
                  t("strategyPort")
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-[#003366]/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-black text-[10px] uppercase tracking-widest text-slate-600 group-hover:text-[#003366] transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-[#003366] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#002244] shadow-xl shadow-[#003366]/20 transition-all hover:scale-105">
                {t("strategyAbout")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
