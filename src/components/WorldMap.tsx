"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  Sphere, 
  Graticule 
} from "react-simple-maps";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/context/LanguageContext";

// TopoJSON for high fidelity world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const pinnedCountries = [
  { name: "Nigeria", coords: [8.6753, 9.0820], yOffset: -12, anchor: "start" },
  { name: "South Africa", coords: [22.9375, -30.5595], yOffset: 12 },
  { name: "Kenya", coords: [37.9062, -0.0236], yOffset: -8, anchor: "start" },
  { name: "Ghana", coords: [-1.0232, 7.9465], yOffset: 15, anchor: "middle" },
  { name: "Egypt", coords: [30.8025, 30.0000], yOffset: -10 },
  { name: "Ivory Coast", coords: [-5.5471, 7.5399], yOffset: -12, anchor: "end" },
  { name: "Ethiopia", coords: [39.1225, 9.1450], yOffset: 12, anchor: "start" },
  { name: "UAE", coords: [54.3773, 24.4539], yOffset: -10, anchor: "start" },
  { name: "Saudi Arabia", coords: [45.0792, 23.8859], yOffset: 15, anchor: "end" },
  { name: "UK", coords: [-3.4360, 55.3781], yOffset: -10 },
  { name: "USA", coords: [-95.7129, 37.0902], yOffset: -10 },
  { name: "Brazil", coords: [-51.9253, -14.2350], yOffset: -10 },
  { name: "India (Home)", coords: [78.9629, 20.5937], isHome: true, yOffset: -15 },
];

export default function WorldMap() {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const highlights = [
    { title: t("mapHigh1Title"), desc: t("mapHigh1Desc"), focus: [20, 10] },
    { title: t("mapHigh2Title"), desc: t("mapHigh2Desc"), focus: [45, 20] },
    { title: t("mapHigh3Title"), desc: t("mapHigh3Desc"), focus: [-20, 30] }
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [highlights.length]);

  if (!mounted) return <div className="py-40 bg-white h-[801px]" />;

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left: Content Slider */}
          <div className="w-full lg:w-1/3 text-left">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#003366] rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {highlights[currentSlide].title}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1.1] heading-font">
                {t("mapTitle")} <br /><span className="text-[#003366]">{t("mapSubtitle")}</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {highlights[currentSlide].desc}
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors group"
                >
                  <ChevronLeft className={cn("w-4 h-4 text-slate-400 group-hover:text-[#003366] transition-colors", isRTL && "rotate-180")} />
                </button>
                <div className="flex gap-2">
                  {highlights.map((_, i) => (
                    <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === currentSlide ? "bg-[#003366] w-5" : "bg-slate-200")} />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % highlights.length)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors group"
                >
                  <ChevronRight className={cn("w-4 h-4 text-slate-400 group-hover:text-[#003366] transition-colors", isRTL && "rotate-180")} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Real Map using react-simple-maps */}
          <div className="w-full lg:w-2/3 h-[500px] relative cursor-grab active:cursor-grabbing bg-slate-50/50 rounded-[3rem] border border-slate-100 p-4">
            <ComposableMap
               projectionConfig={{
                 scale: 180,
               }}
               style={{ width: "100%", height: "100%" }}
            >
              <Sphere stroke="#E2E8F0" strokeWidth={0.5} id="globe-sphere" fill="transparent" />
              <Graticule stroke="#E2E8F0" strokeWidth={0.5} />
              
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#F1F5F9", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {pinnedCountries.map((country, idx) => (
                <Marker key={idx} coordinates={country.coords as [number, number]}>
                   <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + (idx * 0.05), type: "spring" }}
                   >
                    {/* Ring for Home or Active Hub */}
                    <circle 
                      r={country.isHome ? 7 : 3.5} 
                      fill={country.isHome ? "#amber-400" : "#003366"} 
                      fillOpacity={0.2}
                      className={cn(country.isHome && "animate-ping")}
                    />
                    
                    {/* Inner Dot */}
                    <circle 
                      r={country.isHome ? 3.5 : 2} 
                      fill={country.isHome ? "#F59E0B" : "#003366"} 
                    />

                    {/* Simple Tooltip on Label */}
                    <text
                      textAnchor={(country.anchor as any) || "middle"}
                      y={country.yOffset || -10}
                      x={country.anchor === "start" ? 6 : country.anchor === "end" ? -6 : 0}
                      style={{ 
                        fontFamily: "var(--font-inter)", 
                        fill: "#003366", 
                        fontSize: "7px", 
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        pointerEvents: "none",
                        opacity: 0.8
                      }}
                    >
                      {country.name}
                    </text>
                   </motion.g>
                </Marker>
              ))}
            </ComposableMap>
            
            {/* Legend / Overlay - Now more premium */}
            <div className="absolute bottom-6 right-6 text-right bg-white/70 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
               <div className="text-2xl font-black text-[#003366] uppercase tracking-tighter heading-font">{t("mapLegend")}</div>
               <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{t("mapSubLegend")}</div>
            </div>
          </div>


        </div>
      </div>
    </section>

  );
}


