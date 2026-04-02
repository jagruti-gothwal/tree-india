"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, MessageSquare, ShieldCheck, ArrowRight, Settings, Users } from "lucide-react"

export default function AdminHub() {
  const cards = [
    {
      title: "Product Catalog",
      description: "Manage your confectionery inventory, update prices, and upload new product images.",
      href: "/admin/products",
      icon: Package,
      color: "blue",
      countLabel: "124+ Items"
    },
    {
      title: "Inquiry Leads",
      description: "Track bulk export requests from international clients and manage your sales pipeline.",
      href: "/admin/inquiries",
      icon: MessageSquare,
      color: "emerald",
      countLabel: "Live Leads"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#f8fafc] px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6 shadow-sm">
             <ShieldCheck className="w-3.5 h-3.5 text-[#003366]" /> Central Command
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">Admin <span className="text-[#003366]">Control</span></h1>
          <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto">Welcome back. Select a workspace to manage your global export operations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, idx) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Link href={card.href} className="group block">
                        <div className="relative bg-white h-full rounded-[3.5rem] p-12 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 text-left overflow-hidden">
                            {/* Card Background Glow */}
                            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${card.color}-500/5 blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                            
                            <div className={`w-20 h-20 rounded-3xl bg-${card.color === 'blue' ? '[#003366]' : 'emerald-600'} flex items-center justify-center text-white mb-10 shadow-xl shadow-blue-900/10 group-hover:scale-110 transition-transform duration-500`}>
                                <card.icon size={36} strokeWidth={2.5} />
                            </div>

                            <div className="flex justify-between items-center mb-4">
                               <span className={`text-[10px] font-black uppercase tracking-widest text-${card.color === 'blue' ? '[#003366]' : 'emerald-600'}`}>Workspace Module</span>
                               <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">{card.countLabel}</span>
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-[#003366] transition-colors">{card.title}</h2>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10">{card.description}</p>
                            
                            <div className="flex items-center gap-3 text-[#003366] font-black text-xs uppercase tracking-widest">
                                Enter Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>

        {/* Quick Utilities */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 flex flex-wrap justify-center gap-8 text-slate-400 font-black text-[10px] uppercase tracking-widest py-10 border-t border-slate-100"
        >
            <div className="flex items-center gap-2 hover:text-[#003366] transition-colors cursor-pointer">
                <Settings className="w-4 h-4" /> System Stats
            </div>
            <div className="flex items-center gap-2 hover:text-[#003366] transition-colors cursor-pointer">
                <Users className="w-4 h-4" /> Team Access
            </div>
        </motion.div>
      </div>
    </div>
  )
}
