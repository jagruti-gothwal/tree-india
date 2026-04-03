"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X, Download, ChevronRight, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const languages = [
    { code: "EN", name: "English" },
    { code: "PT", name: "Portuguese" },
    { code: "FR", name: "French" },
    { code: "ES", name: "Spanish" },
    { code: "AR", name: "Arabic" },
  ];

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const navLinks = [
    { name: t("navHome"), href: "/" },
    { name: t("navAbout"), href: "/about" },
    { name: t("navProducts"), href: "/products" },
    { name: t("navExport"), href: "/export" },
    { name: t("navInquiry"), href: "/contact" },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full max-w-7xl fixed top-4 md:top-6 inset-x-4 md:mx-auto border shadow-sm border-white/40 rounded-full bg-white/40 backdrop-blur-2xl z-[5000] px-8 py-3.5 items-center justify-between transition-all"
        )}
      >
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative overflow-hidden rounded-2xl p-1 bg-white group-hover:scale-110 transition-transform">
             <img src="/transparent/TREE-INDIA-LOGO-CDR.png" alt="Tree India" className="h-10 w-auto object-contain" />
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-2 flex-grow justify-center px-4">
          {navLinks.map((navItem, idx: number) => {
            const isActive = pathname === navItem.href;
            return (
              <Link
                key={`link=${idx}`}
                href={navItem.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative items-center flex text-[13px] font-black px-6 py-2.5 rounded-full transition-all duration-300 uppercase tracking-widest",
                  isActive ? "text-white bg-[#014995]" : "text-[#014995] hover:text-[#01356d]"
                )}
              >
                <span className="relative z-10 hidden sm:block">{navItem.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Language Selector (Playful) */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-colors text-[#014995] font-black text-[12px] uppercase tracking-wider"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", langOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-4 right-0 bg-white border-none rounded-[2rem] shadow-2xl p-2 min-w-[180px] z-[6000]"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={cn(
                        "w-full text-left px-5 py-3 text-[12px] font-black uppercase tracking-widest rounded-2xl transition-all",
                        language === l.code ? "bg-[#014995] text-white" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link href="/contact" className="hidden sm:flex items-center gap-2 bg-[#014995] text-white text-[12px] font-black px-8 py-3 rounded-full hover:bg-[#01356d] transition-all hover:scale-105 active:scale-95 shadow-lg uppercase tracking-widest">
            {t("navQuote")}
          </Link>
          
          <button 
            className="lg:hidden p-2.5 text-[#014995] ml-1 rounded-full bg-white/40 border border-white/40 hover:bg-white/60 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-24 z-[4999] bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-3xl shadow-2xl overflow-hidden lg:hidden p-5"
            key="mobile-menu"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={`mobile-link-${idx}`}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-5 py-4 text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-between group transition-colors",
                        isActive ? "bg-[#014995] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {link.name}
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform group-hover:translate-x-1",
                        isActive ? "text-white opacity-100" : "text-slate-400 opacity-0 group-hover:opacity-100"
                      )} />
                    </Link>
                  </motion.div>
                )
              })}
              <div className="h-px bg-slate-100 my-4" />
              <Link
                href="/Tree%20India%20Catalogue%20Compressed.pdf"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="px-5 py-4 text-sm font-black uppercase tracking-widest text-[#003366] flex items-center justify-center gap-3 bg-blue-50/50 hover:bg-blue-100 rounded-2xl transition-colors border border-blue-100"
              >
                <Download className="w-4 h-4" />
                {t("navDownload")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

