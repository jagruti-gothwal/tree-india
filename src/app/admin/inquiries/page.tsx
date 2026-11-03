"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trash, RefreshCw, Eye, EyeOff, Mail, Phone, MessageSquare, 
  Package, Clock, ShieldCheck, CheckCircle, Archive, AlertCircle, 
  LayoutGrid, Table as TableIcon, Kanban as KanbanIcon, Search, 
  Download, ExternalLink, X, ArrowRight, User
} from "lucide-react"
import { fetchAllInquiries, deleteInquiry, checkAdminPassword, updateInquiryStatus } from "../actions"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_ids: string;
  status: string;
  created_at: string;
}

const normalizeStatus = (status?: string): "New" | "Contacted" | "Archived" => {
  if (!status) return "New";
  const s = status.trim().toLowerCase();
  if (s === "contacted") return "Contacted";
  if (s === "archived") return "Archived";
  return "New";
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleString();
  } catch {
    return dateStr;
  }
};

const formatShortDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export default function InquiriesAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null)
  const [modalInquiry, setModalInquiry] = useState<Inquiry | null>(null)
  const [activeTab, setActiveTab] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"cards" | "table" | "kanban">("cards")
  const [searchQuery, setSearchQuery] = useState("")

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
    if (res.success) {
      const list = res.inquiries || []
      setInquiries(list)
      if (list.length > 0 && !activeInquiry) {
        setActiveInquiry(list[0])
      }
    } else {
      console.error(res.error)
      alert("Database Error: " + res.error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return
    const res = await deleteInquiry(id)
    if (res.success) {
      if (activeInquiry?.id === id) setActiveInquiry(null)
      if (modalInquiry?.id === id) setModalInquiry(null)
      loadInquiries()
    } else {
      alert(res.error)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    const res = await updateInquiryStatus(id, status)
    if (res.success) {
      if (activeInquiry?.id === id) setActiveInquiry({ ...activeInquiry, status })
      if (modalInquiry?.id === id) setModalInquiry({ ...modalInquiry, status })
      loadInquiries()
    } else {
      alert(res.error)
    }
  }

  const exportToCSV = () => {
    if (inquiries.length === 0) {
      alert("No inquiry records to export.")
      return
    }
    const headers = ["ID", "Name", "Email", "Phone", "Status", "Date", "Message", "Product IDs"]
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${(i.name || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.phone || "").replace(/"/g, '""')}"`,
      `"${normalizeStatus(i.status)}"`,
      `"${formatDate(i.created_at)}"`,
      `"${(i.message || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(i.product_ids || "").replace(/"/g, '""')}"`
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `TreeIndia_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter inquiries by search and tab
  const searchedInquiries = useMemo(() => {
    if (!searchQuery.trim()) return inquiries
    const q = searchQuery.toLowerCase()
    return inquiries.filter(inq => 
      (inq.name && inq.name.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.message && inq.message.toLowerCase().includes(q)) ||
      (inq.product_ids && inq.product_ids.toLowerCase().includes(q))
    )
  }, [inquiries, searchQuery])

  const filteredInquiries = useMemo(() => {
    if (activeTab === "All") return searchedInquiries
    return searchedInquiries.filter((inq) => normalizeStatus(inq.status) === activeTab)
  }, [searchedInquiries, activeTab])

  // Counts for tabs/badges
  const counts = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter(i => normalizeStatus(i.status) === "New").length,
      contacted: inquiries.filter(i => normalizeStatus(i.status) === "Contacted").length,
      archived: inquiries.filter(i => normalizeStatus(i.status) === "Archived").length
    }
  }, [inquiries])

  const getStatusBadge = (status?: string) => {
    switch (normalizeStatus(status)) {
      case 'Contacted': 
        return (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200 flex items-center gap-1.5 shadow-xs">
            <CheckCircle className="w-2.5 h-2.5" /> Contacted
          </span>
        );
      case 'Archived': 
        return (
          <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200 flex items-center gap-1.5 shadow-xs">
            <Archive className="w-2.5 h-2.5" /> Archived
          </span>
        );
      default: 
        return (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-200 flex items-center gap-1.5 shadow-xs">
            <AlertCircle className="w-2.5 h-2.5" /> New Lead
          </span>
        );
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 bg-white p-10 rounded-[3rem] shadow-xl w-full max-w-md border border-slate-100"
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
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
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
    <div className="pt-8 pb-32 bg-[#f8fafc] min-h-screen relative font-sans">
      <div className="absolute inset-0 z-0 h-[400px] w-full bg-slate-100 opacity-30 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Header & Metrics */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Pipeline CRM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Inquiry <span className="text-[#003366]">Leads</span>
            </h1>
          </div>
          
          {/* View Mode Switcher + Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* View Switcher */}
            <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex items-center shadow-sm">
              <button
                onClick={() => setViewMode("cards")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all",
                  viewMode === "cards" 
                    ? "bg-[#003366] text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
                title="Split Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all",
                  viewMode === "table" 
                    ? "bg-[#003366] text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
                title="Table Spreadsheet View"
              >
                <TableIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>

              <button
                onClick={() => setViewMode("kanban")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all",
                  viewMode === "kanban" 
                    ? "bg-[#003366] text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
                title="Kanban Board View"
              >
                <KanbanIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Kanban</span>
              </button>
            </div>

            <button 
              onClick={exportToCSV}
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-[#003366] hover:border-blue-200 transition-all shadow-sm active:scale-95 flex items-center gap-2 text-xs font-bold"
              title="Export to CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button 
              onClick={loadInquiries} 
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-[#003366] hover:border-blue-200 transition-all shadow-sm active:scale-95"
              title="Refresh Data"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Total Inquiries</span>
            <p className="text-3xl font-black text-slate-900 leading-none">{counts.total}</p>
          </div>
          <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-1">New Leads</span>
            <p className="text-3xl font-black text-[#003366] leading-none">{counts.new}</p>
          </div>
          <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-1">Contacted</span>
            <p className="text-3xl font-black text-emerald-700 leading-none">{counts.contacted}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Archived</span>
            <p className="text-3xl font-black text-slate-600 leading-none">{counts.archived}</p>
          </div>
        </div>

        {/* Search & Filter Bar (Used in Cards & Table views) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search company, name, email, phone..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/5 transition-all shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Tabs (Cards & Table) */}
          {viewMode !== "kanban" && (
            <div className="bg-white border border-slate-200 p-1 rounded-2xl flex items-center shadow-xs w-full sm:w-auto overflow-x-auto">
              {["All", "New", "Contacted", "Archived"].map((tab) => {
                const count = tab === "All" 
                  ? counts.total 
                  : tab === "New" 
                    ? counts.new 
                    : tab === "Contacted" 
                      ? counts.contacted 
                      : counts.archived
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap",
                      activeTab === tab 
                        ? "bg-[#003366] text-white shadow-md" 
                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    {tab}
                    <span className={cn(
                      "ml-2 px-1.5 py-0.5 rounded-md text-[8px]",
                      activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* VIEW 1: CARDS (SPLIT) VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Leads List Left */}
            <div className="lg:col-span-5 space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredInquiries.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-center p-8"
                  >
                    <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No {activeTab} Records Found</p>
                    {searchQuery && (
                      <p className="text-[11px] text-slate-400 mt-2">Try clearing your search query "{searchQuery}"</p>
                    )}
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
                        "p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 relative group",
                        activeInquiry?.id === inq.id 
                          ? 'bg-[#003366] border-[#003366] shadow-[0_20px_50px_rgba(0,51,102,0.15)] ring-4 ring-blue-900/5 text-white' 
                          : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg shadow-xs'
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <h3 className={cn("font-black uppercase tracking-tight text-lg leading-tight", activeInquiry?.id === inq.id ? 'text-white' : 'text-slate-900')}>
                            {inq.name}
                          </h3>
                          <p className={cn("text-[10px] font-bold tracking-wider", activeInquiry?.id === inq.id ? 'text-white/50' : 'text-slate-400')}>
                            {formatDate(inq.created_at)}
                          </p>
                        </div>
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full shrink-0",
                          normalizeStatus(inq.status) === "New" ? "bg-blue-500 animate-pulse" : normalizeStatus(inq.status) === "Contacted" ? "bg-emerald-400" : "bg-slate-300"
                        )} />
                      </div>

                      <p className={cn("text-xs line-clamp-2 mb-4 leading-relaxed", activeInquiry?.id === inq.id ? 'text-white/80' : 'text-slate-600')}>
                        {inq.message || "No narrative details provided."}
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100/10">
                        {getStatusBadge(inq.status)}

                        <div className="flex items-center gap-1.5">
                          {normalizeStatus(inq.status) !== "Contacted" && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(inq.id, "Contacted") }} 
                              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider transition-colors shadow-xs"
                            >
                              Contacted
                            </button>
                          )}
                          {normalizeStatus(inq.status) !== "Archived" && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(inq.id, "Archived") }} 
                              className="px-3 py-1 bg-slate-400 hover:bg-slate-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider transition-colors shadow-xs"
                            >
                              Archive
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Content Detail Panel Right */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {activeInquiry ? (
                  <motion.div
                    key={activeInquiry.id}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden min-h-[550px] flex flex-col sticky top-28"
                  >
                    <div className="bg-[#003366] p-8 md:p-10 text-white relative">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <MessageSquare className="w-28 h-28" />
                      </div>
                      <div className="relative z-10">
                        <span className="text-white/40 font-black tracking-[0.3em] text-[10px] uppercase mb-2 block">Direct Customer Lead</span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 leading-tight">{activeInquiry.name}</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a 
                            href={`mailto:${activeInquiry.email}`} 
                            className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                              <Mail className="w-4 h-4 text-blue-200" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Email Address</p>
                              <p className="text-xs font-bold truncate text-white">{activeInquiry.email || "N/A"}</p>
                            </div>
                          </a>

                          <a 
                            href={`tel:${activeInquiry.phone}`} 
                            className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                              <Phone className="w-4 h-4 text-blue-200" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Telephone Call</p>
                              <p className="text-xs font-bold truncate text-white">{activeInquiry.phone || "N/A"}</p>
                            </div>
                          </a>
                        </div>

                        {activeInquiry.phone && (
                          <div className="mt-3">
                            <a 
                              href={`https://wa.me/${activeInquiry.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-200 rounded-xl border border-[#25D366]/30 text-xs font-bold transition-colors"
                            >
                              <span>Chat on WhatsApp</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-10 flex-1">
                      <div className="mb-8">
                        <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                          <div className="w-4 h-0.5 bg-[#003366]/30" /> Requirements Narrative
                        </h4>
                        <div className="bg-slate-50 p-6 rounded-2xl text-slate-800 font-medium text-base leading-relaxed border border-slate-100 shadow-inner whitespace-pre-wrap">
                          "{activeInquiry.message || 'No additional details provided.'}"
                        </div>
                      </div>

                      {activeInquiry.product_ids && (
                        <div>
                          <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                            <div className="w-4 h-0.5 bg-[#003366]/30" /> Inquired Products
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeInquiry.product_ids.split(',').map((pid: string) => (
                              <div key={pid} className="px-4 py-2 bg-white text-[#003366] rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                                <Package className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-[10px] font-black tracking-widest uppercase">ID: {pid.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Received</span>
                          <span className="text-slate-900 font-bold text-xs">{formatDate(activeInquiry.created_at)}</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          {getStatusBadge(activeInquiry.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {normalizeStatus(activeInquiry.status) !== "Contacted" && (
                          <button
                            onClick={() => handleStatusUpdate(activeInquiry.id, "Contacted")}
                            className="px-4 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-[10px] font-black uppercase tracking-wider transition-colors shadow-xs"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {normalizeStatus(activeInquiry.status) !== "Archived" && (
                          <button
                            onClick={() => handleStatusUpdate(activeInquiry.id, "Archived")}
                            className="px-4 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                          >
                            <Archive className="w-3.5 h-3.5" /> Archive
                          </button>
                        )}
                        {normalizeStatus(activeInquiry.status) === "Archived" && (
                          <button
                            onClick={() => handleStatusUpdate(activeInquiry.id, "New")}
                            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl border border-blue-200 text-[10px] font-black uppercase tracking-wider transition-colors shadow-xs"
                          >
                            Restore to New
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(activeInquiry.id)}
                          className="p-2.5 bg-white text-rose-500 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors shadow-xs"
                          title="Delete Permanently"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[550px] bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-[#003366]">
                      <SearchLeadIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-2">Lead Preview</h3>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Select an inquiry record from the left list to review detailed messages and contact links.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* VIEW 2: TABLE VIEW */}
        {viewMode === "table" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-wider border-b border-slate-200 text-[10px]">
                  <tr>
                    <th className="py-4 px-6">Lead / Company</th>
                    <th className="py-4 px-6">Contact Channels</th>
                    <th className="py-4 px-6">Message Preview</th>
                    <th className="py-4 px-6">Products</th>
                    <th className="py-4 px-6">Received</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-slate-400 font-bold uppercase tracking-widest">
                        No inquiries match this criteria
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr 
                        key={inq.id}
                        onClick={() => setModalInquiry(inq)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003366] font-black flex items-center justify-center shrink-0 border border-blue-100 text-xs">
                              {inq.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-sm group-hover:text-[#003366] transition-colors">{inq.name}</p>
                              <span className="text-[10px] text-slate-400 font-medium">ID: {inq.id.slice(-6)}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6" onClick={e => e.stopPropagation()}>
                          <div className="space-y-1">
                            {inq.email && (
                              <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-slate-600 hover:text-[#003366] font-medium truncate max-w-[200px]">
                                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{inq.email}</span>
                              </a>
                            )}
                            {inq.phone && (
                              <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-[#003366] font-medium">
                                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{inq.phone}</span>
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <p className="line-clamp-2 max-w-xs text-slate-600 font-normal leading-relaxed">
                            {inq.message || "—"}
                          </p>
                        </td>

                        <td className="py-4 px-6">
                          {inq.product_ids ? (
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold">
                              {inq.product_ids.split(',').length} item(s)
                            </span>
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                          {formatShortDate(inq.created_at)}
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          {getStatusBadge(inq.status)}
                        </td>

                        <td className="py-4 px-6 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setModalInquiry(inq)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-[#003366] hover:text-white rounded-lg text-[10px] font-bold uppercase transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete permanently"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: KANBAN BOARD */}
        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["New", "Contacted", "Archived"] as const).map((columnStatus) => {
              const columnLeads = searchedInquiries.filter(i => normalizeStatus(i.status) === columnStatus)
              const colConfig = {
                New: {
                  title: "New Leads",
                  border: "border-blue-200",
                  headerBg: "bg-blue-50/80 text-[#003366]",
                  badge: "bg-blue-500 text-white"
                },
                Contacted: {
                  title: "Contacted / In Discussion",
                  border: "border-emerald-200",
                  headerBg: "bg-emerald-50/80 text-emerald-800",
                  badge: "bg-emerald-500 text-white"
                },
                Archived: {
                  title: "Archived / Closed",
                  border: "border-slate-200",
                  headerBg: "bg-slate-100 text-slate-700",
                  badge: "bg-slate-400 text-white"
                }
              }[columnStatus]

              return (
                <div 
                  key={columnStatus}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const droppedId = e.dataTransfer.getData("text/plain")
                    if (droppedId) handleStatusUpdate(droppedId, columnStatus)
                  }}
                  className={cn(
                    "bg-slate-100/70 rounded-3xl p-4 border flex flex-col min-h-[600px] transition-all",
                    colConfig.border
                  )}
                >
                  {/* Column Header */}
                  <div className={cn("p-4 rounded-2xl flex items-center justify-between mb-4 shadow-xs", colConfig.headerBg)}>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs uppercase tracking-wider">{colConfig.title}</span>
                    </div>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-black", colConfig.badge)}>
                      {columnLeads.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-1 custom-scrollbar">
                    {columnLeads.length === 0 ? (
                      <div className="py-16 text-center text-slate-400 font-bold text-xs uppercase tracking-wider border-2 border-dashed border-slate-200 rounded-2xl">
                        No leads in this stage
                      </div>
                    ) : (
                      columnLeads.map((inq) => (
                        <div
                          key={inq.id}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", inq.id)}
                          onClick={() => setModalInquiry(inq)}
                          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-black text-sm text-slate-900 group-hover:text-[#003366] transition-colors uppercase tracking-tight">
                              {inq.name}
                            </h4>
                            <span className="text-[9px] font-bold text-slate-400">
                              {formatShortDate(inq.created_at)}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                            {inq.message || "No narrative details."}
                          </p>

                          {inq.product_ids && (
                            <div className="mb-3">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-[9px] font-bold border border-amber-200">
                                <Package className="w-2.5 h-2.5" /> {inq.product_ids.split(',').length} product(s)
                              </span>
                            </div>
                          )}

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              {inq.email && (
                                <a href={`mailto:${inq.email}`} className="text-slate-400 hover:text-[#003366]" title={inq.email}>
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {inq.phone && (
                                <a href={`tel:${inq.phone}`} className="text-slate-400 hover:text-[#003366]" title={inq.phone}>
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            {/* Move stage quick actions */}
                            <div className="flex items-center gap-1">
                              {columnStatus === "New" && (
                                <button 
                                  onClick={() => handleStatusUpdate(inq.id, "Contacted")}
                                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg border border-emerald-200"
                                >
                                  → Contacted
                                </button>
                              )}
                              {columnStatus === "Contacted" && (
                                <button 
                                  onClick={() => handleStatusUpdate(inq.id, "Archived")}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-black rounded-lg"
                                >
                                  → Archive
                                </button>
                              )}
                              {columnStatus === "Archived" && (
                                <button 
                                  onClick={() => handleStatusUpdate(inq.id, "New")}
                                  className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[9px] font-black rounded-lg border border-blue-200"
                                >
                                  ↺ Reopen
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* DETAIL MODAL (Used in Table, Kanban, or inspecting directly) */}
      <AnimatePresence>
        {modalInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#003366] p-8 text-white relative">
                <button 
                  onClick={() => setModalInquiry(null)}
                  className="absolute right-6 top-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Lead Inspection</span>
                  {getStatusBadge(modalInquiry.status)}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">{modalInquiry.name}</h3>
                <p className="text-xs text-white/60 mt-1">Logged on {formatDate(modalInquiry.created_at)}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {modalInquiry.email && (
                    <a href={`mailto:${modalInquiry.email}`} className="p-3 bg-white/10 rounded-xl flex items-center gap-2.5 text-xs font-bold hover:bg-white/20 transition-colors">
                      <Mail className="w-4 h-4 text-blue-200" />
                      <span className="truncate">{modalInquiry.email}</span>
                    </a>
                  )}
                  {modalInquiry.phone && (
                    <a href={`tel:${modalInquiry.phone}`} className="p-3 bg-white/10 rounded-xl flex items-center gap-2.5 text-xs font-bold hover:bg-white/20 transition-colors">
                      <Phone className="w-4 h-4 text-blue-200" />
                      <span>{modalInquiry.phone}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto space-y-6 flex-1">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#003366] mb-3">Requirements Narrative</h4>
                  <div className="bg-slate-50 p-5 rounded-2xl text-slate-800 text-sm leading-relaxed border border-slate-100 whitespace-pre-wrap">
                    "{modalInquiry.message || "No message provided."}"
                  </div>
                </div>

                {modalInquiry.product_ids && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#003366] mb-3">Interested Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {modalInquiry.product_ids.split(',').map((pid: string) => (
                        <span key={pid} className="px-3 py-1.5 bg-blue-50 text-[#003366] rounded-xl text-xs font-bold border border-blue-100 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5" /> ID: {pid.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Move to:</span>
                  <button 
                    onClick={() => handleStatusUpdate(modalInquiry.id, "New")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors",
                      normalizeStatus(modalInquiry.status) === "New" ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    New
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(modalInquiry.id, "Contacted")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors",
                      normalizeStatus(modalInquiry.status) === "Contacted" ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    Contacted
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(modalInquiry.id, "Archived")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors",
                      normalizeStatus(modalInquiry.status) === "Archived" ? "bg-slate-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    Archived
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(modalInquiry.id)}
                    className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Trash className="w-3.5 h-3.5" /> Delete
                  </button>
                  <button
                    onClick={() => setModalInquiry(null)}
                    className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
