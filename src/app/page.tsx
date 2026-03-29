"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, TrendingUp, ShieldCheck, Factory, Play, PackageSearch, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y = useSpring(yRange, { stiffness: 100, damping: 30 });

  // Mouse tilt effect for cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Advanced Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 z-10">
        
        {/* Soft floating background light flares */}
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
           className="absolute inset-0 z-0 bg-transparent flex items-center justify-center pointer-events-none gap-8 overflow-hidden"
        >
          <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="w-[40vw] h-[40vw] max-w-[600px] rounded-full bg-blue-300/30 blur-[120px]" 
          />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], y: [0, -50, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="w-[30vw] h-[30vw] max-w-[500px] rounded-full bg-amber-200/40 blur-[100px]" 
          />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-200/50 bg-white/70 backdrop-blur-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:bg-white transition-all duration-300 mb-8 cursor-pointer group"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003366] opacity-30"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#003366]"></span>
              </span>
              <span className="text-[#003366] font-bold text-xs tracking-[0.2em] uppercase">
                Premium Trade & Export
              </span>
              <ChevronRight className="w-3 h-3 text-[#003366] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </motion.div>

            <motion.div
               className="overflow-hidden pb-2"
            >
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black mb-8 leading-[0.95] tracking-tighter text-slate-900 uppercase"
              >
                Global Confectionery <br />
                <span className="relative inline-block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003366] via-blue-700 to-blue-400 pb-2">
                    Manufacturing
                  </span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 right-0 h-[6px] bg-amber-400 rounded-full origin-left"
                  ></motion.div>
                </span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-600 mb-12 font-medium leading-relaxed max-w-2xl mx-auto tracking-wide"
            >
              Tree India is an internationally recognized exporter and manufacturer of premium biscuits, candies, and confections. Supplying wholesale and B2B markets globally with unyielding consistency.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full"
            >
              <Link
                href="/products"
                className="relative inline-flex h-16 w-full sm:w-auto overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 shadow-2xl group"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2e8f0_0%,#003366_50%,#e2e8f0_100%)] opacity-80" />
                <span className="inline-flex h-full w-full sm:px-12 cursor-pointer items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#003366] transition-all group-hover:bg-slate-50 gap-3">
                  <PackageSearch className="w-5 h-5" /> View Catalogue
                </span>
              </Link>
              
              <Link
                href="/contact"
                className="group relative h-16 w-full sm:w-auto flex items-center justify-center px-10 bg-transparent border-2 border-slate-200 hover:border-slate-300 rounded-full text-slate-700 text-sm font-black uppercase tracking-[0.15em] transition-all shadow-sm hover:shadow-md hover:bg-white"
              >
                <span className="relative z-10 flex items-center gap-3">
                  B2B Trade Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Advanced Aceternity Bento Grid for Highlights */}
      <section className="relative z-20 pb-32 pt-10 mx-4 sm:mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
             className="md:col-span-2 bg-white border border-slate-200/60 rounded-[2rem] p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                 <Globe className="w-64 h-64 text-[#003366]" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-10 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                    <Globe className="w-8 h-8 text-[#003366]" />
                 </div>
                 <h3 className="text-4xl font-black text-slate-900 mb-3 uppercase tracking-tighter">15+ Markets</h3>
                 <p className="text-lg font-bold text-slate-500 tracking-wide">Global Distribution Network</p>
                 <p className="mt-4 text-slate-400 text-sm font-medium max-w-sm">Shipping high-volume containers to continents seamlessly with full regulatory compliance.</p>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
             className="bg-[#003366] text-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgba(0,51,102,0.2)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
           >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-400/30 transition-colors"></div>
              <div className="relative z-10 flex flex-col items-center text-center justify-center h-full">
                 <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                    <ShieldCheck className="w-8 h-8 text-amber-400" />
                 </div>
                 <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">ISO Certified</h3>
                 <span className="text-sm font-bold text-blue-200 uppercase tracking-widest">Quality Assurance</span>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
             className="bg-white border border-slate-200/60 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-[#003366]/30 transition-all duration-500"
           >
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Factory className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Large Scale</h3>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Manufacturing</span>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
             className="md:col-span-2 bg-slate-50 border border-slate-200/60 rounded-[2rem] p-10 shadow-inner relative overflow-hidden group hover:bg-white transition-all duration-500"
           >
              <div className="flex md:flex-row flex-col justify-between items-start md:items-center h-full gap-8">
                <div>
                   <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:border-amber-400 transition-colors">
                      <TrendingUp className="w-6 h-6 text-amber-500" />
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">B2B Trade Focus</h3>
                   <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Bulk Supply Specialists</span>
                </div>
                <div className="w-full md:w-auto">
                   <Link href="/about" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-white border border-slate-200 rounded-full text-slate-800 font-bold text-sm tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-colors shadow-sm">
                      Learn More
                   </Link>
                </div>
              </div>
           </motion.div>

        </div>
      </section>

      {/* About Overview - Complex Image Reveal */}
      <section className="py-32 relative z-10 bg-white border-y border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 hidden lg:block border-l border-slate-100"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1 relative group"
            >
               <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200/40 to-blue-200/40 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <div className="relative rounded-[2.5rem] bg-white p-3 shadow-2xl ring-1 ring-slate-200/50 transform group-hover:-translate-y-2 transition-transform duration-700">
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 tracking-widest uppercase">Export Ready</span>
                 </div>
                 <img src="/DJ American Biscuits Markup.png" alt="Tree India Production" className="w-full h-auto object-cover rounded-[2rem] bg-slate-50 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.02]" />
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 lg:pl-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-8">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="text-amber-700 font-extrabold text-[10px] tracking-[0.2em] uppercase">Company Profile</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tighter uppercase">
                Excellence in <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-blue-600">Global Trade.</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 tracking-wide">
                With a proven track record, Tree India operates as a manufacturing centerpiece for bulk confectionery orders. We maintain strict compliance with international food regulations while securing highly efficient dispatch networks.
              </p>

              <div className="space-y-5 mb-12">
                {[
                  "Industrial-scale production capacity.",
                  "Export-grade moisture resistant packaging.",
                  "Efficient maritime and air logistics support.",
                  "Long-term contractual manufacturing."
                ].map((item, idx) => (
                  <motion.div 
                     initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + (idx * 0.1) }}
                     key={idx} className="flex items-center text-slate-800 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[#003366]/20 transition-all font-bold tracking-wide text-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mr-4" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#003366] text-white font-bold uppercase tracking-[0.15em] text-xs hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out skew-x-12"></span>
                Corporate Identity 
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Featured Products Section with 3D Hover & Spotlight */}
      <section className="py-32 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#003366] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">Product Lines</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">Flagship Exports</h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-[#003366] font-black text-sm uppercase tracking-widest hover:text-blue-700 transition-colors group">
               View All Products <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Baba Lollipops", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png", color: "from-blue-100/50" },
              { title: "American Biscuits", category: "Biscuits", image: "/DJ American Biscuits Markup.png", color: "from-amber-100/50" },
              { title: "Fruit Candies", category: "Bubble Gum", image: "/DJ Gum Pops Markup.png", color: "from-rose-100/50" },
              { title: "Choco Eclairs", category: "Toffees", image: "/DJ Choco Eclairs Jar Markup.png", color: "from-amber-800/10" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="h-full"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href="/products" className="block group h-full">
                  <div className={`relative bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden transition-all duration-500 p-8 flex flex-col items-center justify-between h-full group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-gradient-to-b ${item.color} to-white`}>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-slate-400">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>

                    <div className="h-48 w-full mb-10 relative flex items-center justify-center p-2">
                      <motion.img 
                        animate={hoveredCard === idx ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        src={item.image} alt={item.title} className="max-h-full max-w-full object-contain filter drop-shadow-xl mix-blend-multiply z-10" 
                      />
                    </div>
                    <div className="w-full text-center relative z-10">
                      <span className="inline-block px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm text-[10px] sm:text-xs font-black text-slate-500 tracking-[0.2em] uppercase mb-4">{item.category}</span>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#003366] transition-colors">{item.title}</h4>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
             <Link href="/products" className="inline-flex items-center justify-center px-10 py-5 bg-[#003366] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-all shadow-[0_10px_30px_rgba(0,51,102,0.2)]">
               Access Full Catalogue
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
