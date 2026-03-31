"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Factory } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#001A33] border-t border-white/5 font-sans text-slate-400">
      
      {/* Top Footer Banner */}
      <div className="bg-[#00264D] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-[#003366] flex items-center justify-center border border-white/10 group-hover:border-amber-400/50 transition-colors">
               <ShieldCheck className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
             </div>
             <div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">ISO Compliant</h3>
               <p className="text-sm font-medium text-slate-300">International Quality Processing</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-[#003366] flex items-center justify-center border border-white/10 group-hover:border-amber-400/50 transition-colors">
               <Factory className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
             </div>
             <div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">Bulk Export</h3>
               <p className="text-sm font-medium text-slate-300">Volume Scale Delivery Solutions</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-[#003366] flex items-center justify-center border border-white/10 group-hover:border-amber-400/50 transition-colors">
               <Globe className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
             </div>
             <div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">Global Chain</h3>
               <p className="text-sm font-medium text-slate-300">Active Supply in 15+ Regions</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-4">
            <div className="bg-white p-4 inline-block mb-8 rounded-2xl shadow-xl">
              <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Tree India Logo" className="h-28 w-auto object-contain" />
            </div>
            <p className="text-[11px] text-slate-200 font-black leading-relaxed max-w-xs uppercase tracking-[0.2em] mb-4">
              {t("footerBrand")}
            </p>
            <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-xs uppercase tracking-widest">
              {t("footerDesc")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em] heading-font">{t("footerOrg")}</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">{t("navAbout")}</Link></li>
              <li><Link href="/export" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">{t("navExport")}</Link></li>
              <li><Link href="/products" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">{t("navCatalog")}</Link></li>
              <li><Link href="/contact" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">{t("navContact")}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em] heading-font">{t("footerCommodities")}</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Biscuits & Cookies</Link></li>
              <li><Link href="/products" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Candies & Toffees</Link></li>
              <li><Link href="/products" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Lollipops Series</Link></li>
              <li><Link href="/products" className="text-[10px] font-black text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Bubble Gum Units</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-3">
             <h3 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em] heading-font">{t("footerComm")}</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">Navi Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-4 text-amber-400 shrink-0" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-4 text-amber-400 shrink-0" />
                <a href="mailto:tree.india@yahoo.com" className="text-[10px] font-black text-slate-300 hover:text-amber-400 transition-colors uppercase tracking-widest">Tree.India@yahoo.com</a>
              </li>
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-4 text-amber-400 shrink-0" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">www.treeindia.net</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-slate-500 font-black tracking-[0.2em] uppercase">&copy; {new Date().getFullYear()} Tree India. Authorized Export Division.</p>
          <div className="flex space-x-10">
             <Link href="#" className="text-[9px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-black">{t("footerLegal")}</Link>
             <Link href="#" className="text-[9px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-black">{t("footerTerms")}</Link>
          </div>
        </div>
      </div>
    </footer>


  );
}
