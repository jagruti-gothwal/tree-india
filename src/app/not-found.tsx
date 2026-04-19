"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Candy, Ghost } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Sweet Elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: (i * 5) - 50 + "%", 
              y: (i * 3) - 50 + "%",
              rotate: 0 
            }}
            animate={{ 
              y: ["-5%", "5%"],
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 10 + (i % 5), 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute text-blue-900"
            style={{ left: (i * 7) % 100 + "%", top: (i * 11) % 100 + "%" }}
          >
            <Candy size={30 + (i % 20)} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative inline-block mb-8">
             <motion.div
               animate={{ 
                 y: [0, -15, 0],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="text-[12rem] md:text-[18rem] font-black text-[#003366] leading-none tracking-tighter select-none"
             >
               404
             </motion.div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-20 blur-xl">
               <Ghost className="w-48 h-48 text-blue-400" />
             </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6">
            Sweetness <span className="text-blue-600 underline decoration-wavy decoration-blue-200">Missing</span>!
          </h1>
          
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
            The flavor you're looking for has been moved or doesn't exist. Let's get you back to the main catalog.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-3 bg-[#003366] text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/10 hover:scale-105 active:scale-95"
            >
              <Home className="w-4 h-4" /> Go Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-600 px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:border-[#003366] hover:text-[#003366] transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 z-[-1] opacity-30 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>
    </div>
  )
}
