"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, PackageSearch, Truck, Award, Globe, ShoppingBag, ShieldCheck, Zap, Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import WorldMap from "@/components/WorldMap";
import Certificates from "@/components/Certificates";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Background product images for float effect (More Colorful & Visible)
  const floatingProducts = [
    { src: "/transparent/DJ CREMO COMBINE.png", size: "w-80 md:w-[28rem]", top: "5%", left: "0%", delay: 0, rotate: -15 },
    { src: "/transparent/BABA LOVELY POP STRAWBERRY MARKUP.png", size: "w-80 md:w-[26rem]", top: "10%", right: "0%", delay: 2, rotate: 10 },
    { src: "/transparent/DJ Conico Chocolate.png", size: "w-80 md:w-[24rem]", bottom: "10%", left: "2%", delay: 4, rotate: 15 },
    { src: "/transparent/DJ CREAM COMBINE.png", size: "w-80 md:w-[28rem]", bottom: "12%", right: "2%", delay: 1, rotate: -5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden relative">

      {/* Super Candy Pro Aesthetic: Vibrant Gradients & Chunky Type */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&family=Fredoka+One&display=swap');
        .heading-font { font-family: 'Outfit', sans-serif; letter-spacing: -0.04em; }
        .wavy-divider { position: absolute; bottom: -1px; left: 0; width: 100%; line-height: 0; z-index: 40; pointer-events: none; }
        .wavy-divider svg { display: block; width: 101%; height: 120px; }
        .candy-shimmer {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer { 0% { background-position: -150% 0%; } 100% { background-position: 150% 0%; } }
      `}</style>

      {/* Cinematic Pink Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-44 z-10 overflow-visible bg-gradient-to-br from-[#ff5c8a] via-[#ff7eb3] to-[#ff5c8a]">

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-400/20 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-300/10 rounded-full blur-[150px]" />
        </div>

        {/* Floating Stars/Circles (Candy Style) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="absolute text-white/30"
              style={{
                top: `${10 + i * 15}%`,
                left: `${5 + (i % 2) * 85}%`,
                fontSize: `${20 + i * 10}px`
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        {/* Large Floating Background Products (More Visible) */}
        {floatingProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: 1,
              y: [0, -60, 0],
              rotate: [p.rotate, p.rotate + 15, p.rotate]
            }}
            transition={{
              duration: 12 + i * 3,
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
            className={`${p.size} pointer-events-none filter drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hidden lg:block`}
          >
            <Image 
              src={p.src} 
              alt="Decorative Product" 
              fill 
              priority 
              className="object-contain" 
              sizes="(max-width: 1200px) 30vw, 400px"
            />
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

            <motion.div className="pb-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.05] md:leading-[0.95] tracking-tight md:tracking-tighter uppercase heading-font drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              >
                Global <br className="md:hidden" />
                <span className="text-[#014995] bg-white px-4 md:px-6 py-1.5 md:py-2 inline-block -rotate-2 rounded-[2rem] md:rounded-3xl shadow-2xl relative translate-y-2 text-3xl sm:text-5xl md:text-7xl font-black break-words max-w-[90vw] md:max-w-none text-center leading-[1.2] md:leading-none my-2 md:my-0">Snacks & Confectionery</span><br />
                You Can Trust
              </motion.h1>

              <TextGenerateEffect
                words={t("heroSubtitle")}
                className="text-xl md:text-3xl font-black text-rose-100 mt-6 mb-10 tracking-[0.05em] uppercase max-w-4xl drop-shadow-sm"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full"
            >
              <Link
                href="/products"
                className="group relative h-24 w-full sm:w-auto flex items-center justify-center px-16 bg-[#014995] rounded-full text-white text-[18px] font-black uppercase tracking-widest transition-all hover:bg-[#01356d] hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(1,73,149,0.4)] gap-4 overflow-hidden"
              >
                <div className="candy-shimmer absolute inset-0 opacity-20 pointer-events-none"></div>
                <PackageSearch className="w-8 h-8" /> {t("heroViewProducts")}
              </Link>

              <Link
                href="/contact"
                className="group relative h-24 w-full sm:w-auto flex items-center justify-center px-16 bg-white rounded-full text-[#ff5c8a] text-[18px] font-black uppercase tracking-widest transition-all hover:bg-rose-50 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,92,138,0.2)] gap-4"
              >
                {t("heroBulkInquiry")} <ArrowRight className={cn("w-7 h-7 ml-1", isRTL && "rotate-180")} />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Wavy Divider - Moved outside content div for better alignment */}
        <div className="wavy-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#fff5f0" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Lifestyle Section (Girl Image) */}
      <section className="bg-[#fff5f0] pt-60 pb-32 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 lg:gap-32">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              {/* Soft decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#ff5c8a]/15 to-transparent rounded-full blur-[120px] -z-10"></div>

              <div className="relative w-full max-w-lg aspect-square">
                <Image
                  src="/transparent/girl.png"
                  alt="Tree India Tasty Snacks Loved by Children"
                  fill
                  className="object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Floating badge (now detached from any card) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-0 w-28 h-28 bg-[#014995] rounded-full flex items-center justify-center text-white px-4 text-center leading-tight shadow-xl z-20"
                >
                  <span className="font-black text-[12px] uppercase">Loved by Millions</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl order-1 lg:order-2"
            >

              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#014995] tracking-tighter uppercase leading-[0.9] md:leading-[0.85] mb-12 heading-font">
                <span className="text-[#ff5c8a]">Sweet</span> <br /> for all <br /> <span className="text-amber-500">Ages</span>
              </h2>

              <p className="text-lg md:text-xl text-slate-500 font-bold mb-14 leading-relaxed uppercase tracking-wider max-w-lg">
                Crafting moments of pure joy through export-quality confectionery that bridges cultures and satisfies every sweet craving. As a leading Global Confectionery Exporter, Tree India ensures that every candy, lollipop, and biscuit meets the highest international food safety and taste standards, bringing the vibrant flavors of India to the world stage.
              </p>

              <Link
                href="/about"
                className="group inline-flex items-center gap-6 bg-[#014995] text-white px-16 py-8 rounded-full font-black text-[16px] uppercase tracking-widest hover:bg-[#3b0764] transition-all hover:scale-105 shadow-[0_20px_40px_rgba(76,29,149,0.25)]"
              >
                Learn More <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar (Vibrant Amber Gradient) */}
      <section className="bg-gradient-to-br from-[#fff5f0] to-[#fffdec] py-40 border-none relative z-20 overflow-visible">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-x-20 gap-y-16">
            {[
              { icon: Globe, label: t("trustCountries"), color: "bg-blue-400 text-white shadow-blue-200" },
              { icon: ShoppingBag, label: t("trustProducts"), color: "bg-amber-400 text-white shadow-amber-200" },
              { icon: ShieldCheck, label: t("trustQuality"), color: "bg-emerald-400 text-white shadow-emerald-200" },
              { icon: Zap, label: t("trustLogistics"), color: "bg-purple-400 text-white shadow-purple-200" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                className="flex flex-col items-center gap-6 group"
              >
                <div className={`w-24 h-24 rounded-[2.5rem] ${item.color} flex items-center justify-center shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all`}>
                  <item.icon className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <span className="text-[14px] font-black uppercase tracking-widest text-slate-700">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wavy Divider to Blue-Green Gradient */}
        <div className="wavy-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#bdeeff" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* World Map Section (Blue-Cyan Gradient) */}
      <div className="bg-gradient-to-b from-[#bdeeff] to-[#e0f7ff] py-20 relative overflow-visible">
        <WorldMap />

        {/* Wavy Divider to Yellow-Orange Gradient */}
        <div className="wavy-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#ffd93d" d="M0,64L120,53.3C240,43,480,21,720,21.3C960,21,1200,43,1320,53.3L1440,64L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#ffd93d] to-[#ffc107] py-20 relative overflow-visible">
        <Certificates />
        <div className="wavy-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Featured Products Grid (High-Energy Colors) */}
      <section className="py-60 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-10">
            <div className="max-w-3xl">
              <span className="text-white px-6 py-2 bg-[#ff5c8a] rounded-full font-black tracking-widest text-[12px] uppercase mb-8 inline-block shadow-[0_10px_20px_rgba(255,92,138,0.3)]">{t("bestSellers")}</span>
              <h2 className="text-7xl md:text-9xl font-black text-[#014995] tracking-tighter uppercase leading-[0.8] heading-font">
                <span className="text-[#ff5c8a]">{t("exportPortfolio1").split(' ')[0]}</span> {t("exportPortfolio1").split(' ').slice(1).join(' ')} <br />
                <span className="text-[#014995]">{t("exportPortfolio2")}</span>
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-6 bg-[#014995] text-white px-16 py-8 rounded-full font-black text-[16px] uppercase tracking-widest hover:bg-[#01356d] transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(1,73,149,0.3)]">
              {t("exploreCatalog")} <ArrowRight className={cn("w-6 h-6", isRTL && "rotate-180")} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t("featured1Title"), category: t("featured1Cat"), image: "/WhatsApp Image 2026-04-06 at 3.54.32 PM (1).png", color: "bg-[#bdeeff] shadow-blue-100" },
              { title: t("featured2Title"), category: t("featured2Cat"), image: "/WhatsApp Image 2026-04-06 at 3.54.32 PM.png", color: "bg-[#ffd93d] shadow-amber-100" },
              { title: t("featured3Title"), category: t("featured3Cat"), image: "/WhatsApp Image 2026-04-06 at 3.54.33 PM.png", color: "bg-[#ff96bc] shadow-pink-100" },
              { title: t("featured4Title"), category: t("featured4Cat"), image: "/WhatsApp Image 2026-04-06 at 3.54.31 PM.png", color: "bg-[#cfaffc] shadow-purple-100" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotate: idx % 2 === 0 ? 5 : -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8, type: "spring" }}
                onMouseEnter={() => setHoveredProduct(idx)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href="/products" className="block group text-center">
                  <div className={`relative aspect-square ${item.color} rounded-[3rem] flex items-center justify-center p-2 mb-10 transition-all duration-500 group-hover:scale-105 shadow-2xl overflow-hidden`}>
                    <motion.div
                      animate={hoveredProduct === idx ? { y: -30, scale: 1.25, rotate: 5 } : { y: 0, scale: 1.1, rotate: 0 }}
                      className="relative w-full h-full z-10"
                    >
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]" 
                        sizes="250px"
                      />
                    </motion.div>
                  </div>
                  <span className="inline-block px-5 py-2 bg-slate-50 rounded-full text-[11px] font-black text-slate-400 tracking-widest uppercase mb-6 shadow-sm">{item.category}</span>
                  <h4 className="text-2xl font-black text-[#014995] uppercase tracking-tighter group-hover:text-[#ff5c8a] transition-colors heading-font">{item.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production & Reliability (Vibrant Deep Blue Section) */}
      <section className="py-40 relative z-10 bg-slate-50 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-pink-100 rounded-full blur-[120px] opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative aspect-[4/3] rounded-[4rem] bg-white p-6 shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden group border-8 border-white">
                <Image 
                  src="/transparent/DJ American Biscuits Markup Combine.png" 
                  alt="Tree India Production Excellence" 
                  fill 
                  className="object-cover rounded-[3.5rem] bg-slate-50 group-hover:scale-105 transition-transform duration-1000 p-8" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#014995] font-black tracking-[0.3em] text-[11px] uppercase mb-6 block drop-shadow-sm">{t("strategyExport")}</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter uppercase heading-font">
                {t("strategyTitle1")} <br /><span className="text-[#ff5c8a]">{t("strategyTitle2")}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed mb-10 max-w-lg">
                Tree India stands for consistency and reliability in every shipment. Our state-of-the-art production partners and rigorous quality control testing ensure that our premium sweets and snacks reach global markets in perfect condition. With a focus on strategic international logistics and value-driven pricing, we are your trusted partner for high-volume confectionery supply.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  { text: t("strategyPricing"), color: "text-blue-500 bg-blue-50" },
                  { text: t("strategyTesting"), color: "text-emerald-500 bg-emerald-50" },
                  { text: t("strategyLogistics"), color: "text-purple-500 bg-purple-50" },
                  { text: t("strategyPort"), color: "text-amber-500 bg-amber-50" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3.5 p-6 ${item.color.split(' ')[1]} rounded-3xl group border-none transition-all hover:scale-105 shadow-sm`}>
                    <CheckCircle2 className={`w-6 h-6 ${item.color.split(' ')[0]}`} />
                    <span className="font-black text-[10px] uppercase tracking-widest text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center justify-center h-20 px-16 rounded-full bg-[#014995] text-white font-black uppercase tracking-widest text-[13px] hover:bg-[#01356d] shadow-2xl transition-all hover:scale-105">
                {t("strategyAbout")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
