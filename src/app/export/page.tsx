import { Globe2, FileText, Truck, Network, ShieldCheck, Factory, Clock, PackageCheck, Handshake, Map } from "lucide-react";

export default function Export() {
  const offerings = [
    { name: "Bulk Supply of Confectionery", desc: "Reliable mass-scale manufacturing.", icon: PackageCheck },
    { name: "Export Documentation", desc: "Seamless cross-border compliance.", icon: FileText },
    { name: "Global Logistics", desc: "Efficient freight coordination.", icon: Truck },
    { name: "Strong Distributor Network", desc: "Strategic international alliances.", icon: Network },
  ];

  const whyWorkWithUs = [
    { title: "Uncompromising Quality", desc: "Globally competitive pricing and certified standards.", icon: ShieldCheck },
    { title: "Manufacturing Power", desc: "Robust manufacturing partnerships guaranteeing volume.", icon: Factory },
    { title: "On-Time Commitments", desc: "Strict adherence to dispatch and delivery schedules.", icon: Clock },
    { title: "Order Flexibility", desc: "Scalable solutions customized for B2B requirements.", icon: PackageCheck },
    { title: "Strategic Partnerships", desc: "Aiming for long-term, mutually profitable business models.", icon: Handshake },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 font-sans">
      
      {/* Header Section */}
      <section className="relative bg-slate-900 border-b-8 border-amber-500 py-32 overflow-hidden mb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase flex justify-center items-center gap-4 mb-6">
             <span className="w-12 h-px bg-amber-500 block"></span>
             Export Capabilities
             <span className="w-12 h-px bg-amber-500 block"></span>
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white heading-font tracking-tight uppercase leading-tight drop-shadow-lg">
            Global Trade Solutions
          </h1>
          <p className="mt-8 text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Leveraging robust manufacturing alliances and multi-modal logistics expertise, Tree India orchestrates flawless end-to-end export operations—from procurement to port delivery.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Offerings & Strength */}
          <div className="lg:col-span-7">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">Core Competencies</span>
            <h2 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-12 border-l-4 border-amber-500 pl-6 leading-none">
              Operational Arsenal
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {offerings.map((offer, i) => {
                const Icon = offer.icon;
                return (
                  <div key={i} className="bg-white border hover:border-slate-300 transition-colors shadow-sm p-8 flex flex-col items-start group">
                    <div className="w-12 h-12 bg-slate-900 text-amber-500 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform origin-left">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide leading-snug mb-3">{offer.name}</h3>
                    <p className="text-sm text-slate-500 font-light">{offer.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-slate-900 text-white p-12 shadow-xl border-l-8 border-amber-500 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-slate-800 rounded-full translate-x-16 -translate-y-16 opacity-30"></div>
               <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-6 flex items-center gap-3">
                 <ShieldCheck className="text-amber-500 w-8 h-8" />
                 Our Core Strength
               </h3>
               <p className="text-slate-300 font-light leading-relaxed text-lg">
                 Our foundation rests on unparalleled consistency. We meticulously navigate international compliances and synchronize schedules to ensure every container dispatched meets exact B2B specifications, solidifying Tree India as a non-negotiable asset to global distributors.
               </p>
            </div>
          </div>

          {/* Right Column: Why Work With Us */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">Added Value</span>
              <h2 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-10 border-l-4 border-amber-500 pl-6 leading-none">
                B2B Advantage
              </h2>
              <div className="space-y-4">
                {whyWorkWithUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start bg-white p-6 border border-slate-100 hover:border-amber-500 shadow-sm transition-all group">
                      <div className="shrink-0 mr-6 mt-1 text-slate-300 group-hover:text-amber-500 transition-colors">
                         <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Presence */}
      <section className="relative mt-32 py-32 bg-slate-900 overflow-hidden">
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5">
            <Map className="w-full h-full text-white transform scale-150" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-6 block">Geographic Footprint</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white heading-font uppercase tracking-tight leading-tight mb-6">
              International Reach
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-10"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-16">
              Tree India executes high-volume distributions across multiple primary trade routes, maintaining a formidable presence in pivotal African markets while aggressively pursuing expansion territories worldwide.
            </p>

            <div className="bg-slate-800 border border-slate-700 p-16 shadow-2xl max-w-4xl mx-auto relative group">
               <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
               <Globe2 className="w-24 h-24 text-amber-500 mx-auto mb-8 animate-[spin_10s_linear_infinite] opacity-80" />
               <p className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">Global Dispatch Hub</p>
               <p className="text-lg text-slate-400 font-light max-w-lg mx-auto leading-relaxed">
                 Operating from Navi Mumbai, our logistics core facilitates seamless ocean and air freight routing to over 15 targeted global economies.
               </p>
            </div>
         </div>
      </section>

    </div>
  );
}
