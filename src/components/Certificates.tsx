"use client";
import React from "react";
import { motion } from "framer-motion";

const certificates = [
  { name: "FIEO", image: "/certificates/fieo.png", fallback: "FIEO" },
  { name: "APEDA", image: "/certificates/apeda.png", fallback: "APEDA" },
  { name: "GST", image: "/certificates/gst.png", fallback: "GST" },
  { name: "IEC", image: "/certificates/iec.png", fallback: "IEC" },
  { name: "FSSAI", image: "/certificates/fssai.png", fallback: "FSSAI" },
  { name: "Udyam", image: "/certificates/udyam.png", fallback: "Udyam" },
];

import { useLanguage } from "@/context/LanguageContext";

export default function Certificates() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-slate-50/50 backdrop-blur-sm overflow-hidden border-y border-slate-200/60 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-amber-500 font-black tracking-[0.4em] text-[10px] uppercase mb-5 block">{t("certTrust")}</span>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter heading-font leading-tight">
            {t("certRecognized")} <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-[#003366] to-blue-600 bg-clip-text text-transparent">
               {t("certCertified")}
            </span>
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex items-center justify-center p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 transition-colors"></div>
              <div className="text-xl md:text-2xl font-black text-slate-400 select-none tracking-[0.1em] uppercase group-hover:text-[#003366] transition-colors cursor-default heading-font relative z-10 w-full text-center">
                {cert.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
