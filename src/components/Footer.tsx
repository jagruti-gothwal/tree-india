"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Factory } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#014995] border-none font-sans text-white relative overflow-visible">
      <div className="absolute top-0 left-0 w-full h-[150px] -translate-y-[149px] pointer-events-none">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
           <path fill="#014995" d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
      
      {/* Top Footer Banner */}
      <div className="bg-white/10 backdrop-blur-md py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
               <ShieldCheck className="w-8 h-8 text-[#014995]" strokeWidth={2.5} />
             </div>
             <div>
               <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white mb-1">{t("footerISO")}</h3>
               <p className="text-sm font-bold text-white/80">{t("footerISOList")}</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
               <Factory className="w-8 h-8 text-[#014995]" strokeWidth={2.5} />
             </div>
             <div>
               <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white mb-1">{t("footerBulk")}</h3>
               <p className="text-sm font-bold text-white/80">{t("footerBulkList")}</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 group">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
               <Globe className="w-8 h-8 text-[#014995]" strokeWidth={2.5} />
             </div>
             <div>
               <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white mb-1">{t("footerChain")}</h3>
               <p className="text-sm font-bold text-white/80">{t("footerChainList")}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-4">
            <div className="bg-white p-6 inline-block mb-10 rounded-[2.5rem] shadow-2xl">
              <img src="/transparent/TREE-INDIA-LOGO-CDR.png" alt="Tree India Logo" className="h-32 w-auto object-contain" />
            </div>
            <p className="text-[14px] text-white font-black leading-relaxed max-w-sm uppercase tracking-widest mb-6 px-4">
              {t("footerBrand")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-black mb-8 text-[12px] uppercase tracking-[0.3em] heading-font">{t("footerOrg")}</h3>
            <ul className="space-y-5">
              <li><Link href="/about" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("navAbout")}</Link></li>
              <li><Link href="/export" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("navExport")}</Link></li>
              <li><Link href="/products" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("navProducts")}</Link></li>
              <li><Link href="/contact" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("navContact")}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-black mb-8 text-[12px] uppercase tracking-[0.3em] heading-font">{t("footerCommodities")}</h3>
            <ul className="space-y-5">
              <li><Link href="/products" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("footerBiscuits")}</Link></li>
              <li><Link href="/products" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("footerCandies")}</Link></li>
              <li><Link href="/products" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("footerLollipops")}</Link></li>
              <li><Link href="/products" className="text-[11px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-widest">{t("footerGums")}</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-3">
             <h3 className="text-white font-black mb-8 text-[12px] uppercase tracking-[0.3em] heading-font">{t("footerComm")}</h3>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <MapPin className="w-5 h-5 text-white shrink-0" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest leading-loose">Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-4">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">+91 94084 36732</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-4">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a href="mailto:tree.india@yahoo.com" className="text-[11px] font-black text-white hover:underline transition-colors uppercase tracking-widest">Tree.India@yahoo.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/60 font-black tracking-[0.2em] uppercase">&copy; {new Date().getFullYear()} Tree India. Authorized Export Division.</p>
          <Link href="/admin" className="text-[10px] text-white/40 hover:text-white/80 font-black tracking-[0.2em] uppercase transition-colors">Admin Access</Link>
        </div>
      </div>
    </footer>


  );
}
