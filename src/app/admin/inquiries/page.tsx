"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash, RefreshCw, LockKeyhole, Eye, EyeOff, User, Mail, Phone, MessageSquare, Package, Clock, ShieldCheck, ChevronLeft, CheckCircle, Archive, AlertCircle } from "lucide-react"
import { fetchAllInquiries, deleteInquiry, checkAdminPassword, updateInquiryStatus } from "../actions"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function InquiriesAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inquiries, setInquiries] = useState<any[]>([])
  const [activeInquiry, setActiveInquiry] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("New")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const valid = await checkAdminPassword(password)
    if (valid) {
      setIsAuthenticated(true)
      loadInquiries()
    } else {
      alert("Invalid password. Please try again.")
    }
    setLoading(false)
  }

  const loadInquiries = async () => {
    setLoading(true)
    const res = await fetchAllInquiries()
    if (res.success) setInquiries(res.inquiries || [])
    else console.error(res.error)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return
    const res = await deleteInquiry(id)
    if (res.success) {
        if (activeInquiry?.id === id) setActiveInquiry(null)
        loadInquiries()
    }
    else alert(res.error)
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    const res = await updateInquiryStatus(id, status)
    if (res.success) {
        if (activeInquiry?.id === id) setActiveInquiry({...activeInquiry, status})
        loadInquiries()
    } else alert(res.error)
  }

  // Filter inquiries by tab
  const filteredInquiries = inquiries.filter(inq => {
      const status = inq.status || "New";
      if (activeTab === "New") return status === "New";
      if (activeTab === "Contacted") return status === "Contacted";
      if (activeTab === "Archived") return status === "Archived";
      return true;
  });

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Contacted': return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-1.5"><CheckCircle className="w-2.5 h-2.5" /> Contacted</span>;
          case 'Archived': return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200 flex items-center gap-1.5"><Archive className="w-2.5 h-2.5" /> Archived</span>;
          default: return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5"><AlertCircle className="w-2.5 h-2.5" /> New Lead</span>;
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 bg-white p-10 rounded-[4rem] shadow-xl w-full max-w-md border border-slate-100"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 mx-auto text-[#003366]">
            <ShieldCheck size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-center text-slate-900 mb-2 uppercase tracking-widest">Inquiry CRM</h2>
          <p className="text-sm text-slate-500 text-center font-medium mb-10">Manage distribution leads & bulk inquiries.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Admin Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-5 pr-14 py-5 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-3xl outline-none focus:bg-white focus:ring-4 focus:ring-[#003366]/5 transition-all text-center tracking-widest"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#003366] text-white py-5 font-black rounded-3xl hover:bg-slate-900 transition-all uppercase tracking-widest text-xs shadow-xl shadow-blue-900/10 active:scale-[0.98]">
              {loading ? "Verifying..." : "Enter Workspace"}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-32 bg-[#f8fafc] min-h-screen relative font-sans">
      <div className="absolute inset-0 z-0 h-[400px] w-full bg-slate-100 opacity-30 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
           <div>
             <div className="flex items-center gap-3 mb-3">
               <span className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em]">Pipeline Management</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Inquiry <span className="text-[#003366]">Leads</span></h1>
           </div>
           
           <div className="flex items-center gap-3 w-full md:w-auto">
             <button onClick={loadInquiries} className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-[#003366] transition-all shadow-sm active:scale-95">
               <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
             </button>
             <div className="bg-white border border-slate-200 p-1 rounded-2xl flex-1 md:flex-none flex items-center shadow-sm">
                {["New", "Contacted", "Archived"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                      activeTab === tab ? "bg-[#003366] text-white shadow-lg" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                    )}
                  >
                    {tab}
                    <span className={cn(
                        "ml-2 px-1.5 py-0.5 rounded-md text-[8px]",
                        activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                    )}>
                        {inquiries.filter(i => (i.status || "New") === tab).length}
                    </span>
                  </button>
                ))}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Leads List */}
            <div className="lg:col-span-5 space-y-4 max-h-[75vh] overflow-y-auto pr-3 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {filteredInquiries.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center"
                        >
                            <MessageSquare className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No {activeTab} Records Found</p>
                        </motion.div>
                    ) : (
                        filteredInquiries.map((inq) => (
                            <motion.div
                                key={inq.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => setActiveInquiry(inq)}
                                className={cn(
                                    "p-8 rounded-[2.5rem] border cursor-pointer transition-all duration-300 relative group",
                                    activeInquiry?.id === inq.id 
                                    ? 'bg-[#003366] border-[#003366] shadow-[0_20px_50px_rgba(0,51,102,0.15)] ring-4 ring-blue-900/5' 
                                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl shadow-sm'
                                )}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <h3 className={cn("font-black uppercase tracking-tight text-xl leading-none", activeInquiry?.id === inq.id ? 'text-white' : 'text-slate-900')}>{inq.name}</h3>
                                        <p className={cn("text-[11px] font-bold tracking-wider", activeInquiry?.id === inq.id ? 'text-white/40' : 'text-slate-400')}>{new Date(inq.created_at).toLocaleString()}</p>
                                    </div>
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        (inq.status || "New") === "New" ? "bg-blue-500 animate-pulse" : "bg-slate-300"
                                    )} />
                                </div>
                                <div className="flex items-center gap-2">
                                   {getStatusBadge(inq.status || "New")}
                                </div>

                                <div className={cn(
                                    "mt-6 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                                    activeInquiry?.id === inq.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )}>
                                    {(inq.status || "New") !== "Contacted" && (
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusUpdate(inq.id, "Contacted") }} className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md">Success</button>
                                    )}
                                    {(inq.status || "New") !== "Archived" && (
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusUpdate(inq.id, "Archived") }} className="px-4 py-2 bg-slate-400 text-white rounded-full hover:bg-slate-500 shadow-md">Archive</button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Content Detail Panel */}
            <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                    {activeInquiry ? (
                        <motion.div
                            key={activeInquiry.id}
                            initial={{ opacity: 0, x: 20, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.98 }}
                            className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col sticky top-24"
                        >
                            <div className="bg-[#003366] p-10 md:p-14 text-white relative">
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                   <MessageSquare className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-white/30 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Official Inquiry</span>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-none">{activeInquiry.name}</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <Link href={`mailto:${activeInquiry.email}`} className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
                                           <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                              <Mail className="w-5 h-5 text-blue-300" />
                                           </div>
                                           <div className="flex-1 overflow-hidden">
                                              <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Email Hub</p>
                                              <p className="text-sm font-bold truncate">{activeInquiry.email}</p>
                                           </div>
                                       </Link>
                                       <Link href={`tel:${activeInquiry.phone}`} className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
                                           <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                              <Phone className="w-5 h-5 text-blue-300" />
                                           </div>
                                           <div>
                                              <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Direct Voice</p>
                                              <p className="text-sm font-bold">{activeInquiry.phone}</p>
                                           </div>
                                       </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-10 md:p-14 flex-1">
                                <div className="mb-12">
                                    <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                        <div className="w-6 h-0.5 bg-[#003366]/20" /> Requirements Narrative
                                    </h4>
                                    <div className="bg-slate-50 p-8 rounded-[2rem] text-slate-800 font-medium text-lg leading-relaxed border border-slate-100 shadow-inner">
                                        "{activeInquiry.message || 'No additional details provided.'}"
                                    </div>
                                </div>

                                {activeInquiry.product_ids && (
                                    <div>
                                        <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                            <div className="w-6 h-0.5 bg-[#003366]/20" /> Items of Interest
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {activeInquiry.product_ids.split(',').map((pid: string) => (
                                                <div key={pid} className="px-5 py-3 bg-white text-[#003366] rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 hover:border-blue-300 transition-colors">
                                                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                                                       <Package className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span className="text-[11px] font-black tracking-widest uppercase">ID: {pid.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-10 md:p-14 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                       <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Logged On</span>
                                       <span className="text-slate-900 font-bold text-xs">{new Date(activeInquiry.created_at).toLocaleString()}</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200" />
                                    <div>
                                       {getStatusBadge(activeInquiry.status || "New")}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    {(activeInquiry.status || "New") !== "Archived" && (
                                        <button
                                            onClick={() => handleStatusUpdate(activeInquiry.id, "Archived")}
                                            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-500 rounded-full border border-slate-200 hover:bg-slate-100 transition-all text-[11px] font-black uppercase tracking-widest shadow-sm"
                                        >
                                            <Archive className="w-4 h-4" /> Move to Archive
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(activeInquiry.id)}
                                        className="p-4 bg-white text-rose-500 rounded-2xl border border-slate-200 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm"
                                        title="Delete Permanently"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full min-h-[600px] bg-slate-100/50 backdrop-blur-sm rounded-[3.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-20 sticky top-24">
                            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-sm mb-8 border border-slate-100">
                                <SearchLeadIcon className="w-12 h-12 text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-4">Pipeline Explorer</h3>
                            <p className="text-sm text-slate-400 font-medium max-w-sm leading-relaxed">
                                Please select a customer record from your pipeline on the left to review their detailed export requirements and contact information.
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  )
}

function SearchLeadIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <circle cx="19" cy="11" r="2" />
            <path d="M19 8v1" />
            <path d="M19 13v1" />
        </svg>
    )
}
