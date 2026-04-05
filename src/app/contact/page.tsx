"use client";
import { useState, Suspense } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, Building2, ArrowRight } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

function ContactForm() {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const productIds = searchParams.get("items") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    formData.append("product_ids", productIds);

    const result = await submitInquiry(formData);

    if (!result.success) {
      console.error(result.error);
      setErrorMessage(result.error || "Unknown server error");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 lg:p-14 rounded-[3rem] border-4 border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_60px_rgba(255,92,138,0.1)] transition-all duration-500 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full translate-x-1/3 -translate-y-1/3 z-0 group-hover:bg-pink-100 transition-colors duration-500"></div>
      
      {status === "success" ? (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center z-20 text-center p-12 border-4 border-[#ff5c8a] rounded-[2.5rem]">
            <div className="w-24 h-24 bg-[#ffd93d] rounded-[2rem] flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(255,217,61,0.4)]">
               <Send className="w-10 h-10 text-[#014995]" strokeWidth={2.5} />
            </div>
            <h3 className="text-4xl font-black text-[#014995] mb-4 uppercase tracking-tighter heading-font">{t("contactSuccessTitle")}</h3>
            <p className="text-slate-500 font-bold text-lg mb-10 max-w-sm mx-auto leading-relaxed">
              {t("contactSuccessDesc")}
            </p>
            <button 
              onClick={() => setStatus("idle")} 
              className="px-10 py-5 bg-[#ff5c8a] hover:bg-[#e11d48] text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {t("contactNewInquiry")}
            </button>
        </div>
      ) : null}

      {status === "error" ? (
         <div className="absolute inset-x-0 top-0 p-4 bg-red-100 border-b border-red-200 text-red-700 text-sm font-bold text-center z-20 mt-0">
            {t("contactErrorTitle") || "Submission failed"}: {errorMessage}
            <button onClick={() => setStatus("idle")} className="ml-4 underline">Dismiss</button>
         </div>
      ): null}

      <form onSubmit={handleSubmit} className={cn("space-y-8 relative z-10", isRTL && "text-right")}>
        {productIds && (
          <div className="p-6 mb-8 bg-amber-50 border-2 border-[#ffd93d] rounded-3xl text-sm font-bold shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[11px] block mb-1 text-amber-600 font-black">{"Attached for Bulk Inquiry:"}</span>
              <span className="text-lg text-amber-900">{productIds.split(",").length} {t("productSelectedCount")}</span>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
               <span className="text-[#ff5c8a] font-black">{productIds.split(",").length}</span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="block text-xs font-black text-[#014995] uppercase tracking-widest mb-3 ml-2">{t("contactLabelName")}</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-[#ff5c8a] outline-none transition-all text-[#014995] font-bold"
              placeholder=""
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-xs font-black text-[#014995] uppercase tracking-widest mb-3 ml-2">{t("contactLabelEmail")}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-[#ff5c8a] outline-none transition-all text-[#014995] font-bold"
              placeholder=""
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-xs font-black text-[#014995] uppercase tracking-widest mb-3 ml-2">{t("contactLabelPhone")}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-[#ff5c8a] outline-none transition-all text-[#014995] font-bold"
            placeholder=""
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-xs font-black text-[#014995] uppercase tracking-widest mb-3 ml-2">{t("contactLabelMessage")}</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-[#ff5c8a] outline-none transition-all text-[#014995] font-bold resize-none shadow-inner"
            placeholder=""
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#014995] hover:bg-[#3b0764] text-white py-6 rounded-full font-black uppercase tracking-widest text-[14px] transition-all shadow-[0_20px_40px_rgba(1,73,149,0.3)] hover:shadow-xl hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-4 disabled:opacity-75 disabled:scale-100 mt-4"
        >
          {status === "submitting" ? t("contactSubmitting") : t("contactLabelSubmit")}
          <ArrowRight className={cn("w-6 h-6", isRTL && "rotate-180")} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}

export default function ContactUs() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="pt-40 pb-32 min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff5f0] to-[#fffdec]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-pink-300/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-pink-200 bg-pink-50 shadow-sm mb-8 group">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5c8a]"></span>
             </span>
             <span className="text-[#ff5c8a] font-black text-[11px] tracking-[0.3em] uppercase">{t("contactCorporateComm")}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#014995] heading-font uppercase tracking-tighter leading-[0.9] md:leading-[0.85] drop-shadow-sm">
            {t("contactTitle1")} <br className="md:hidden"/><span className="text-[#ff5c8a]">{t("contactTitle2")}</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-500 font-bold uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#014995] font-black tracking-[0.2em] text-[11px] uppercase border border-blue-100 mb-4 shadow-sm max-w-max">{t("contactOfficialChannels")}</span>
            <h2 className={cn(
              "text-5xl md:text-6xl font-black text-[#ff5c8a] uppercase tracking-tighter mb-10 heading-font leading-[0.9]",
              isRTL ? "text-right" : "text-left"
            )}>
              {t("contactHeadquarters")}
            </h2>

            <div className="bg-white border-2 border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_60px_rgba(255,92,138,0.1)] hover:border-pink-200 transition-all duration-500 p-8 md:p-10 rounded-[3rem] group relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-pink-100 transition-colors duration-500"></div>
              
              <ul className="space-y-10 relative z-10">
                
                <li className={cn("flex items-start group/item", isRTL && "flex-row-reverse text-right")}>
                  <div className="w-14 h-14 rounded-2xl bg-[#fff5f0] flex items-center justify-center shrink-0 text-[#ff5c8a] group-hover/item:bg-[#ff5c8a] group-hover/item:text-white transition-colors shadow-sm">
                    <Building2 className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className={cn(isRTL ? "mr-6" : "ml-6")}>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{t("contactAddrTitle")}</h4>
                    <p className="text-xl text-[#014995] font-black leading-tight uppercase tracking-wide heading-font group-hover/item:text-[#ff5c8a] transition-colors">
                      Ahmedabad,<br /> Gujarat, India
                    </p>
                  </div>
                </li>
                
                <li className={cn("flex items-start group/item", isRTL && "flex-row-reverse text-right")}>
                  <div className="w-14 h-14 rounded-2xl bg-[#fff5f0] flex items-center justify-center shrink-0 text-[#ff5c8a] group-hover/item:bg-[#ff5c8a] group-hover/item:text-white transition-colors shadow-sm">
                    <Phone className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className={cn(isRTL ? "mr-6" : "ml-6")}>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{t("contactPhoneTitle")}</h4>
                    <p className="text-xl text-[#014995] font-black leading-tight tracking-wide heading-font group-hover/item:text-[#ff5c8a] transition-colors" dir="ltr">+91 94084 36732</p>
                  </div>
                </li>
                
                <li className={cn("flex items-start group/item", isRTL && "flex-row-reverse text-right")}>
                  <div className="w-14 h-14 rounded-2xl bg-[#fff5f0] flex items-center justify-center shrink-0 text-[#ff5c8a] group-hover/item:bg-[#ff5c8a] group-hover/item:text-white transition-colors shadow-sm">
                    <Mail className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className={cn(isRTL ? "mr-6" : "ml-6")}>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{t("contactMailTitle")}</h4>
                    <a href="mailto:tree.india@yahoo.com" className="text-xl text-[#014995] font-black uppercase tracking-widest hover:text-[#ff5c8a] transition-colors heading-font overflow-hidden text-clip w-full block">
                      tree.india@y<wbr/>ahoo.com
                    </a>
                  </div>
                </li>

                <li className={cn("flex items-start group/item", isRTL && "flex-row-reverse text-right")}>
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 text-[#25D366] group-hover/item:bg-[#25D366] group-hover/item:text-white transition-colors shadow-sm border border-green-100">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div className={cn(isRTL ? "mr-6" : "ml-6")}>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{t("contactWhatsAppTitle")}</h4>
                    <a href="https://wa.me/919408436732" target="_blank" rel="noopener noreferrer" className="text-xl text-slate-700 font-black uppercase tracking-wider hover:text-[#25D366] block transition-colors heading-font">
                      WhatsApp Commercial
                    </a>
                  </div>
                </li>

              </ul>
            </div>
            
            <div className={cn("mt-8 p-8 md:p-10 bg-gradient-to-br from-[#014995] to-[#2e1065] rounded-[2rem] shadow-[0_20px_40px_rgba(1,73,149,0.3)] border-4 border-white", isRTL ? "text-right" : "")}>
              <p className="text-blue-100 font-bold leading-relaxed uppercase tracking-widest">
                <span className="font-black text-[#ffd93d] uppercase tracking-[0.3em] text-[12px] block mb-3">{t("contactNoticeTitle")}</span>
                {t("contactNoticeDesc")}
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form Wrapper */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-[#ff5c8a] font-black tracking-[0.2em] text-[11px] uppercase border border-pink-100 mb-4 shadow-sm">{t("contactFormSub")}</span>
            <h2 className={cn(
              "text-5xl md:text-6xl font-black text-[#014995] uppercase tracking-tighter mb-10 heading-font leading-[0.9]",
              isRTL ? "text-right" : "text-left"
            )}>
              {t("contactFormTitle")}
            </h2>
            <div className="relative">
               <Suspense fallback={<div className="p-10 bg-white rounded-[3rem] animate-pulse h-[600px]"></div>}>
                  <ContactForm />
               </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
