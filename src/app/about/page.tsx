import { Target, Eye, ShieldCheck, HeartHandshake, FileCheck, Anchor, Handshake, Award, Activity, Globe } from "lucide-react";

export default function AboutUs() {
  const values = [
    { name: "Uncompromising Quality", icon: ShieldCheck, desc: "Adherence to international food safety and manufacturing standards." },
    { name: "Global Satisfaction", icon: HeartHandshake, desc: "Exceeding expectations for international clients and distributors." },
    { name: "Absolute Transparency", icon: FileCheck, desc: "Clear, honest, and documented B2B export practices." },
    { name: "Supply Reliability", icon: Anchor, desc: "Consistent bulk supply and synchronized timely deliveries." },
    { name: "Sustainable Partnerships", icon: Handshake, desc: "Forging lasting, mutually beneficial business relationships." },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-4 flex justify-center items-center gap-4">
             <span className="w-8 h-0.5 bg-amber-600 block"></span>
             Corporate Identity
             <span className="w-8 h-0.5 bg-amber-600 block"></span>
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-slate-900 heading-font uppercase tracking-tight leading-tight">
            Delivering Excellence <br className="hidden md:block"/> Worldwide
          </h1>
          <p className="mt-6 text-xl text-slate-600 leading-relaxed font-light">
            Tree India is a premier export-oriented enterprise dedicated to supplying high-grade commercial food products, specializing in biscuits and confectionery, to international markets.
          </p>
        </div>

        {/* Hero Image/Banner placeholder style */}
        <div className="w-full h-80 bg-slate-900 mb-20 relative flex flex-col items-center justify-center overflow-hidden border border-slate-700 shadow-2xl">
          <div className="absolute inset-0 bg-slate-800 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
          <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Tree India Corporate" className="h-32 relative z-10 bg-white p-4 drop-shadow-2xl" />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white p-12 border border-slate-200 shadow-sm hover:border-amber-500 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-amber-50 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                To engineer a seamless export infrastructure that provides affordable, premium-grade food products globally, while cementing long-term B2B alliances secured by trust and performance.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-12 border border-slate-700 shadow-xl hover:border-amber-500 transition-colors group relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full translate-x-16 -translate-y-16 group-hover:bg-amber-900/50 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-amber-500 flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6 uppercase tracking-tight">Our Vision</h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                To solidify Tree India's position as a globally renowned name in the commercial export sector by consistently delivering unparalleled supply chain value, quality assurance, and market innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <span className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-4">
             Corporate Principles
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-12">Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-8 border hover:border-slate-300 transition-colors shadow-sm flex flex-col group">
                  <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform origin-left">
                    <Icon className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase leading-snug">{val.name}</h3>
                  <div className="w-8 h-0.5 bg-slate-200 mb-4 group-hover:bg-amber-500 transition-colors"></div>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
