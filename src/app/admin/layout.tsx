"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, MessageSquare, ChevronLeft, ShieldCheck, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // We don't want the layout to show if the user isn't authenticated yet.
  // The individual pages handle their own auth state, but we can detect 
  // if they are on a subpage that typically requires auth.

  const navItems = [
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Admin Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-white border-b border-slate-200 z-[6000] flex items-center justify-between px-8 md:px-12 backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-6">
           <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#003366] rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-blue-900/10 group-hover:scale-105 transition-transform">
                <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <span className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-900 hidden md:block group-hover:text-[#003366]">Admin Workspace</span>
           </Link>

           <div className="w-px h-8 bg-slate-200 hidden md:block" />

           <div className="flex items-center gap-2">
              {navItems.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all overflow-hidden items-center flex gap-2.5",
                        isActive ? "text-white" : "text-slate-400 hover:text-[#003366] hover:bg-slate-50"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      {isActive && (
                         <motion.div 
                           layoutId="admin-nav-active"
                           className="absolute inset-0 bg-[#003366] -z-10 shadow-lg shadow-blue-900/10"
                         />
                      )}
                    </Link>
                 )
              })}
           </div>
        </div>

        <div className="flex items-center gap-4">
           <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest hidden sm:flex">
             <LogOut className="w-3.5 h-3.5" /> Log Out
           </Link>
           <div className="px-5 py-2.5 bg-blue-50 text-[#003366] rounded-2xl flex items-center gap-2 border border-blue-100">
             <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
             <span className="text-[10px] font-black uppercase tracking-widest">Authorized Access</span>
           </div>
        </div>
      </nav>

      {/* Main Admin Content */}
      <main className="">
        {children}
      </main>
    </div>
  )
}
