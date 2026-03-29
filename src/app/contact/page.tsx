"use client";
import { useState, Suspense } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, Building2 } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { useSearchParams } from "next/navigation";

function ContactForm() {
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
    <div className="bg-white p-10 lg:p-14 shadow-xl border border-slate-200 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32 z-0"></div>
      
      {status === "success" ? (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-20 text-center p-12 border-l-4 border-amber-500">
            <div className="w-20 h-20 bg-amber-500 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
              <Send className="w-8 h-8 text-slate-900" strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-4 uppercase tracking-widest">Trade Inquiry Secured</h3>
            <p className="text-slate-300 font-light text-lg mb-10 max-w-sm mx-auto leading-relaxed">
              Your commercial requirements have been logged in our system securely. A trade specialist will contact you shortly.
            </p>
            <button 
              onClick={() => setStatus("idle")} 
              className="px-8 py-4 bg-transparent border-2 border-amber-500 hover:bg-amber-500 hover:text-slate-900 text-amber-500 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Submit New Inquiry
            </button>
        </div>
      ) : null}

      {status === "error" ? (
         <div className="absolute inset-x-0 top-0 p-4 bg-red-100 border-b border-red-200 text-red-700 text-sm font-bold text-center z-20 mt-0">
            Failed to connect: {errorMessage}. Check Supabase configuration.
            <button onClick={() => setStatus("idle")} className="ml-4 underline">Dismiss</button>
         </div>
      ): null}

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        {productIds && (
          <div className="p-4 mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-bold shadow-sm">
            <span className="uppercase tracking-widest text-[10px] block mb-1 text-amber-600">Attached:</span>
            {productIds.split(",").length} Products selected from showcase
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Company / Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-slate-900 font-medium"
              placeholder="e.g. Acme Imports Ltd."
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Official Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-slate-900 font-medium"
              placeholder="purchasing@acme.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Direct Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-slate-900 font-medium"
            placeholder="Including Country Code"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Operational Requirements</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-slate-900 font-medium resize-none shadow-inner"
            placeholder="Specify volume requirements, product variants, required certifications, and port of destination..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 font-bold uppercase tracking-widest text-sm transition-colors border-l-4 border-amber-500 flex justify-center items-center gap-3 disabled:opacity-75"
        >
          {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default function ContactUs() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 pt-16">
          <span className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-4 flex justify-center items-center gap-4">
             <span className="w-8 h-0.5 bg-amber-600 block"></span>
             Corporate Communications
             <span className="w-8 h-0.5 bg-amber-600 block"></span>
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 heading-font uppercase tracking-tight leading-tight">
            Initiate Contact
          </h1>
          <p className="mt-8 text-xl text-slate-600 leading-relaxed font-light">
            Engage with our trade desk for global B2B inquiries, exclusive distributor partnerships, bulk product acquisitions, and logistical coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 xl:gap-16">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">Official Channels</span>
            <h2 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-10 border-l-4 border-amber-500 pl-6 leading-none">
              Headquarters
            </h2>

            <div className="bg-white border border-slate-200 shadow-sm p-8 group relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 translate-x-16 -translate-y-16 group-hover:bg-amber-50 transition-colors rounded-none"></div>
              
              <ul className="space-y-10 relative z-10 mt-6">
                
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center shrink-0 border-b-4 border-amber-500">
                    <Building2 className="text-amber-500 w-5 h-5" />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Corporate Address</h4>
                    <p className="text-slate-900 font-medium leading-relaxed uppercase tracking-wider">
                      Navi Mumbai,<br /> Maharashtra, India
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center shrink-0 border-b-4 border-amber-500">
                    <Phone className="text-amber-500 w-5 h-5" />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Global Trade Desk</h4>
                    <p className="text-slate-900 font-medium leading-relaxed tracking-wider">+91 98765 43210</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center shrink-0 border-b-4 border-amber-500">
                    <Mail className="text-amber-500 w-5 h-5" />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Inquiry</h4>
                    <a href="mailto:tree.india@yahoo.com" className="text-slate-900 font-bold tracking-wide hover:text-amber-600 transition-colors uppercase">
                      tree.india@yahoo.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center shrink-0 border-b-4 border-[#25D366]">
                    <MessageCircle className="text-[#25D366] w-5 h-5 fill-current" />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Instant Liaison</h4>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold tracking-wide hover:text-[#25D366] block transition-colors uppercase">
                      WhatsApp Commercial
                    </a>
                  </div>
                </li>

              </ul>
            </div>
            
            <div className="mt-8 p-8 bg-slate-900 border-l-4 border-amber-500 shadow-xl">
              <p className="text-white font-light leading-relaxed">
                <span className="font-bold text-amber-500 uppercase tracking-widest text-xs block mb-2">Notice</span>
                Tree India requires comprehensive operational details for accurate logistical quoting and volume pricing structures globally.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form Wrapper */}
          <div className="lg:col-span-7">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">Official Request</span>
            <h2 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-10 border-l-4 border-amber-500 pl-6 leading-none">
              Trade Inquiry
            </h2>
            <Suspense fallback={<div>Loading inquiry form...</div>}>
               <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
