"use client";
import React from "react";
import { motion } from "framer-motion";

const certificates = [
  { name: "FEIO", image: "/certificates/feio.png", fallback: "FEIO" },
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
    <section className="py-20 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">{t("certTrust")}</span>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter heading-font">{t("certRecognized")} <span className="text-[#003366]">{t("certCertified")}</span></h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center justify-center group"
            >
              <div className="text-xl md:text-2xl font-black text-slate-400 select-none tracking-[0.1em] uppercase hover:text-[#003366] transition-colors cursor-default heading-font">
                {cert.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
