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
    { name: t("navContact"), href: "/contact" },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full max-w-7xl fixed top-4 md:top-6 inset-x-4 md:mx-auto border border-white/20 rounded-full bg-white/70 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] z-[5000] px-6 py-2.5 items-center justify-between transition-all"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="relative overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-[#003366]/20 to-transparent">
             <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Tree India" className="h-9 w-auto object-contain bg-white rounded-full p-1.5 shadow-sm" />
          </div>
          <span className="font-black text-[12px] text-slate-900 hidden sm:block uppercase tracking-[0.2em] group-hover:text-[#003366] transition-colors">
            Tree India
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-1 flex-grow justify-center px-4">
          {navLinks.map((navItem, idx: number) => {
            const isActive = pathname === navItem.href;
            return (
              <Link
                key={`link=${idx}`}
                href={navItem.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative items-center flex text-[12px] font-black px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-widest",
                  isActive ? "text-[#003366]" : "text-slate-500 hover:text-slate-900"
                )}
              >
                <span className="relative z-10 hidden sm:block">{navItem.name}</span>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 bg-slate-100/80 rounded-full -z-10"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && hoveredIndex !== idx && (
                  <motion.span
                    className="absolute inset-0 bg-[#003366]/5 border border-[#003366]/10 rounded-full -z-10"
                    layoutId="navbar-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-slate-100/50 transition-colors text-slate-600 font-black text-[11px] uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", langOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-3 right-0 bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl p-1.5 min-w-[150px] z-[6000]"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all",
                        language === l.code ? "bg-[#003366] text-white" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
             href="/Tree%20India%20Catalogue%20Compressed.pdf"
             target="_blank"
             className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-[#003366] px-3 py-2 text-[11px] font-black tracking-widest uppercase transition-colors group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span className="hidden xl:block">{t("navDownload")}</span>
          </Link>
          
          <Link href="/contact" className="relative group overflow-hidden rounded-full p-[1px] ml-1">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cbd5e1_0%,#003366_50%,#cbd5e1_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <span className="relative flex items-center gap-2 h-full w-full bg-[#003366] text-white text-[11px] font-black px-5 py-2.5 rounded-full transition-colors group-hover:bg-[#002244] shadow-lg shadow-[#003366]/20">
               <span className="hidden md:block tracking-widest uppercase">{t("navQuote")}</span>
               <span className="md:hidden uppercase tracking-widest">{t("navQuote")}</span>
            </span>
          </Link>
          
          <button 
            className="lg:hidden p-2 text-slate-700 ml-1 rounded-full bg-slate-50/50 border border-slate-200/50 hover:bg-white transition-colors"
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
                        isActive ? "bg-[#003366] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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

