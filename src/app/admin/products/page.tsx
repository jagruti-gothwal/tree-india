"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash, Edit, Check, X, RefreshCw, UploadCloud, Search, Tag, Image as ImageIcon, Box, LockKeyhole, Eye, EyeOff, Paperclip } from "lucide-react"
import { fetchAllProducts, addProduct, updateProduct, deleteProduct, checkAdminPassword, seedInitialProducts } from "../actions"

const seedData = [
  // Lollipops
  { name: "Baba Lovely Pop Blueberry", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Guava", category: "Lollipops", image: "/BABA LOVELY POP GUAVA MARKUP.png" },
  { name: "Baba Lovely Pop Mango", category: "Lollipops", image: "/BABA LOVELY POP MANGO MARKUP.png" },
  { name: "Baba Lovely Pop Orange", category: "Lollipops", image: "/BABA LOVELY POP ORANGE MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry Icecream", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Watermelon", category: "Lollipops", image: "/BABA LOVELY POP WATERMELON MARKUP.png" },
  { name: "DJ Butter Pop", category: "Lollipops", image: "/DJ Butter pop markup.png" },
  { name: "DJ Color Pop", category: "Lollipops", image: "/DJ Color Pop Markup.png" },
  { name: "DJ Love Pop", category: "Lollipops", image: "/DJ Love Pop Markup.png" },
  { name: "DJ Milk Pop", category: "Lollipops", image: "/DJ Milk Pop Markup.png" },
  { name: "DJ Whistle Lollipops", category: "Lollipops", image: "/DJ Whistle Lollipops Markup.png" },
  { name: "DJ Yogurt Pop Lollipop", category: "Lollipops", image: "/DJ Yogurt Pop Lollipop Markup.png" },
  { name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/DJ Fruitoo lollipops markup.png" },

  // Cookies & Biscuits
  { name: "DJ American Biscuits Combine", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup Combine.png" },
  { name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup.png" },
  { name: "DJ Butter Cookies", category: "Cookies & Biscuits", image: "/DJ Butter Cookies.png" },
  { name: "DJ Cashew Cookie Display", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIE DISPLAY.png" },
  { name: "DJ Cashew Cookies", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIES.png" },
  { name: "DJ Chocochip Cookies", category: "Cookies & Biscuits", image: "/DJ CHOCOCHIP COOKIES.png" },
  { name: "DJ Chocochip Cookie Display", category: "Cookies & Biscuits", image: "/DJ CHOCOHIP COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookie Display", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookies", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIES.png" },
  { name: "DJ Finger Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Finger Shortbread Cookies", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES.png" },
  { name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/DJ Milk Cookies.png" },
  { name: "DJ Original Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Original Shortbread", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD.png" },
  { name: "DJ Pistachio Cookies Display", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES DISPLAY.png" },
  { name: "DJ Pistachio Cookies", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES.png" },
  { name: "DJ Short Bread Cookies", category: "Cookies & Biscuits", image: "/DJ SHORT BREAD COOKIES.png" },
  { name: "DJ Shortbread Delicious Cookies Display", category: "Cookies & Biscuits", image: "/DJ SHORTBREAD DELICIOUS COOKIES DISPLAY.png" },
  { name: "DJ Superb Plus Cookies", category: "Cookies & Biscuits", image: "/DJ Superb Plus Cookies.png" },
  { name: "DJ Creamy Topper Chocolate", category: "Cookies & Biscuits", image: "/DJ Creamy topper Chocolate Markup.png" },
  { name: "DJ Creamy Topper Mango", category: "Cookies & Biscuits", image: "/DJ Creamy topper Mango Markup.png" },
  { name: "DJ Creamy Topper Orange", category: "Cookies & Biscuits", image: "/DJ Creamy topper Orange Markup.png" },
  { name: "DJ Creamy Topper Strawberry", category: "Cookies & Biscuits", image: "/DJ Creamy topper Strawberry Markup.png" },
  { name: "DJ Creamy Topper Combine", category: "Cookies & Biscuits", image: "/DJ Creamy Topper Combine.png" },
  
  // New moved from candies
  { name: "Boost Chocolate Biscuit", category: "Cookies & Biscuits", image: "/Boost Chocolate.png" },
  { name: "DJ Boost Wheat Biscuit", category: "Cookies & Biscuits", image: "/DJ Boost wheat.png" },
  { name: "DJ Glucose Biscuit", category: "Cookies & Biscuits", image: "/DJ Glucose Markup.png" },
  { name: "DJ Nice Biscuit", category: "Cookies & Biscuits", image: "/DJ Nice Markup.png" },
  { name: "DJ Cream Chocolate", category: "Cookies & Biscuits", image: "/DJ CREAM CHOCOLATE MARKUP.png" },
  { name: "DJ Cream Combine", category: "Cookies & Biscuits", image: "/DJ CREAM COMBINE.png" },
  { name: "DJ Cream Fresh", category: "Cookies & Biscuits", image: "/DJ CREAM FRESH MARKUP.png" },
  { name: "DJ Cream Mango", category: "Cookies & Biscuits", image: "/DJ CREAM MANGO MARKUP.png" },
  { name: "DJ Cream Pineapple", category: "Cookies & Biscuits", image: "/DJ CREAM PINEAPPLE MARKUP.png" },
  { name: "DJ Cream Strawberry", category: "Cookies & Biscuits", image: "/DJ CREAM STRAWBERRY MARKUP.png" },
  { name: "DJ Cream Vanilla", category: "Cookies & Biscuits", image: "/DJ CREAM VANILLA MARKUP.png" },
  { name: "DJ Cremo Chocolate", category: "Cookies & Biscuits", image: "/DJ CREMO CHOCOLATE Markup.png" },
  { name: "DJ Cremo Combine", category: "Cookies & Biscuits", image: "/DJ CREMO COMBINE.png" },
  { name: "DJ Cremo Mango", category: "Cookies & Biscuits", image: "/DJ CREMO MANGO markup.png" },
  { name: "DJ Cremo Orange", category: "Cookies & Biscuits", image: "/DJ CREMO ORANGE Markup.png" },
  { name: "DJ Cremo Pineapple", category: "Cookies & Biscuits", image: "/DJ CREMO PINEAPPLE Markup.png" },
  { name: "DJ Cremo Strawberry", category: "Cookies & Biscuits", image: "/DJ CREMO STRAWBERRY MARKUP.png" },
  { name: "DJ Cremo Vanilla", category: "Cookies & Biscuits", image: "/DJ CREMO VANILLA Markup.png" },
  { name: "DJ Conico Chocolate", category: "Cookies & Biscuits", image: "/DJ Conico Chocolate.png" },
  { name: "DJ Conico Mango", category: "Cookies & Biscuits", image: "/DJ Conico Mango.png" },
  { name: "DJ Conico Orange", category: "Cookies & Biscuits", image: "/DJ Conico Orange.png" },
  { name: "DJ Conico Strawberry", category: "Cookies & Biscuits", image: "/DJ Conico Strawberry.png" },

  // Wafers
  { name: "DJ Wafers Chocolate", category: "Wafers", image: "/DJ Wafers Chocolate.png" },
  { name: "DJ Wafers Strawberry", category: "Wafers", image: "/DJ Wafers Strawberry.png" },
  { name: "DJ Wafers Vanilla", category: "Wafers", image: "/DJ Wafers Vanilla.png" },
  { name: "Maravilha Chocolate", category: "Wafers", image: "/Maravila ChocolatevMarkup.png" },
  { name: "Maravilha Orange", category: "Wafers", image: "/Maravila Orange Markup.png" },
  { name: "Maravilha Strawberry", category: "Wafers", image: "/Maravila StrawberryMarkup.png" },
  { name: "Maravilha Vanilla", category: "Wafers", image: "/Maravilha Vanilla Markup.png" },
  { name: "Maravilha Combine", category: "Wafers", image: "/Maravilha combine markup.png" },

  // Candies & Toffees
  { name: "Baba Milk Fresh", category: "Cookies & Biscuits", image: "/BABA MILK FRESH Markup.png" },
  { name: "DJ Bigg Boom", category: "Candies & Toffees", image: "/DJ Bigg Boom Markup.png" },
  { name: "DJ Butter and Milk Candy", category: "Candies & Toffees", image: "/DJ Butter and Milk Candy.png" },
  { name: "DJ Cocovibe AI", category: "Candies & Toffees", image: "/DJ COCOVIBE AI.png" },
  { name: "DJ Cocovibe", category: "Candies & Toffees", image: "/DJ Cocovibe Markup.png" },
  { name: "DJ Choco Eclairs Jar", category: "Candies & Toffees", image: "/DJ Choco Eclairs Jar Markup.png" },
  { name: "DJ Choco Eclairs Pouch", category: "Candies & Toffees", image: "/DJ Choco Eclairs Markup Pouch.png" },
  { name: "DJ Chocofull Toffee", category: "Candies & Toffees", image: "/DJ Chocofull Toffee Markup.png" },
  { name: "DJ Chocolate Jar", category: "Candies & Toffees", image: "/DJ Chocolate Jar Markup.png" },
  { name: "DJ Coconut Desire Toffee", category: "Candies & Toffees", image: "/DJ Coconut Desire Toffee Markup.png" },
  { name: "DJ Coconut Eclairs Jar", category: "Candies & Toffees", image: "/DJ Coconut Eclairs Jar Markup.png" },
  { name: "DJ Coconut Jar", category: "Candies & Toffees", image: "/DJ Coconut Jar Markup.png" },
  { name: "DJ Frenzy AI", category: "Candies & Toffees", image: "/DJ FRENZY AI.png" },
  { name: "DJ Frenzy", category: "Candies & Toffees", image: "/DJ Frenzy Markup.png" },
  { name: "DJ Football", category: "Cookies & Biscuits", image: "/DJ Football Markup.png" },
  { name: "DJ Frubon Jar", category: "Candies & Toffees", image: "/DJ Frubon Jar Markup.png" },
  { name: "DJ Frubon Pouch", category: "Candies & Toffees", image: "/DJ Frubon Pouch Markup.png" },
  { name: "DJ Fruit Shots Toffee", category: "Candies & Toffees", image: "/DJ Fruit Shots Toffee Markup.png" },
  { name: "DJ Fruits Candy", category: "Candies & Toffees", image: "/DJ Fruits Candy Markup.png" },
  { name: "DJ LOL Candy", category: "Candies & Toffees", image: "/DJ LOL Candy Markup.png" },
  { name: "DJ Milk Candy", category: "Candies & Toffees", image: "/DJ Milk Candy Markup.png" },
  { name: "DJ Milk Eclairs Jar", category: "Candies & Toffees", image: "/DJ Milk Eclairs Jar Markup.png" },
  { name: "DJ Milk Plus", category: "Cookies & Biscuits", image: "/DJ Milk Plus Markup.png" },
  { name: "DJ Milkshake Toffee", category: "Candies & Toffees", image: "/DJ Milkshake Toffee Markup.png" },
  { name: "DJ Mint Cool Candy", category: "Candies & Toffees", image: "/DJ Mint Cool Candy Markup.png" },
  { name: "DJ My Milk Jar", category: "Candies & Toffees", image: "/DJ My Milk Markup Jar.png" },
  { name: "DJ Plutoo Candy", category: "Candies & Toffees", image: "/DJ Plutoo Candy Markup.png" },
  { name: "DJ Starvibe AI", category: "Candies & Toffees", image: "/DJ STARVIBE AI.png" },
  { name: "DJ Starvibe", category: "Candies & Toffees", image: "/DJ Starvibe Markup.png" },
  { name: "DJ Tamarind Blast", category: "Candies & Toffees", image: "/DJ TAMARIND BLAST MARKUP.png" },
  { name: "DJ Tangy Tamarind", category: "Candies & Toffees", image: "/DJ TANGY TAMARIND Markup.png" },
  { name: "Tick Tick Fruity Milky", category: "Candies & Toffees", image: "/TICK TICK FRUITY MILKY.png" },
  { name: "Tick Tick Lemon", category: "Candies & Toffees", image: "/TICK TICK LEMON.png" },
  { name: "Tick Tick Lychee", category: "Candies & Toffees", image: "/TICK TICK LYCHEE.png" },
  { name: "Tick Tick Menthol", category: "Candies & Toffees", image: "/TICK TICK MENTHOL.png" },
  { name: "Tick Tick Peanut", category: "Candies & Toffees", image: "/TICK TICK PEANUT.png" },
  { name: "Tick Tick Tamarind", category: "Candies & Toffees", image: "/TICK TICK TAMARIND.png" },
  { name: "DJ Olivary Bubblegum", category: "Bubble Gum", image: "/DJ OLIVARY Bubblegum Markup.png" },
  { name: "DJ Gum Pops", category: "Bubble Gum", image: "/DJ Gum Pops Markup.png" }
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  
  const [editForm, setEditForm] = useState({ name: "", category: "", image: "", price: "" })
  const [newForm, setNewForm] = useState({ name: "", category: "Candies & Toffees", image: "", price: "Export Grade" })
  const [showAddForm, setShowAddForm] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit' = 'new') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 800
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)
          
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7)
          if (type === 'new') {
            setNewForm({ ...newForm, image: compressedBase64 })
          } else {
            setEditForm({ ...editForm, image: compressedBase64 })
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const valid = await checkAdminPassword(password)
    if (valid) {
      setIsAuthenticated(true)
      loadProducts()
    } else {
      alert("Invalid default admin password. Try 'TreeIndia2026!'")
    }
    setLoading(false)
  }

  const loadProducts = async () => {
    setLoading(true)
    const res = await fetchAllProducts()
    if (res.success) setProducts(res.products!)
    else console.error(res.error)
    setLoading(false)
  }

  const handleCreate = async () => {
    if (!newForm.name || !newForm.image) return alert("Name and Image URL are required")
    setLoading(true)
    const res = await addProduct(newForm.name, newForm.category, newForm.image, newForm.price)
    if (res.success) {
      setNewForm({ name: "", category: "Candies & Toffees", image: "", price: "Export Grade" })
      setShowAddForm(false)
      await loadProducts()
      alert("Product published successfully!")
    } else {
      console.error("Supabase Error:", res.error)
      alert(`Error! Could not add to database: ${res.error}`)
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product permanently?")) return
    const res = await deleteProduct(id)
    if (res.success) loadProducts()
    else alert(res.error)
  }

  const startEdit = (product: any) => {
    setIsEditing(product.id)
    setEditForm({ name: product.name, category: product.category, image: product.image, price: product.price || "Export Grade" })
  }

  const saveEdit = async (id: number) => {
    const res = await updateProduct(id, editForm.name, editForm.category, editForm.image, editForm.price)
    if (res.success) {
      setIsEditing(null)
      loadProducts()
    } else alert(res.error)
  }

  const handleSeed = async () => {
    if (!confirm("Push all static products to the live database?")) return
    setLoading(true)
    const res = await seedInitialProducts(seedData)
    if (res.success) loadProducts()
    else alert(res.error)
    setLoading(false)
  }

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCat = filterCategory === "All" || p.category === filterCategory
    return matchSearch && matchCat
  })

  // ---------------------------------------------------------------------------
  // LOGIN SCREEN (Aceternity Style)
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Aceternity Grid Background */}
        <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="relative z-10 bg-white p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] w-full max-w-md border border-slate-100"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 mx-auto text-[#003366]">
            <LockKeyhole size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-center text-slate-900 mb-2 uppercase tracking-widest">Admin Portal</h2>
          <p className="textAlign text-sm text-slate-500 text-center font-medium mb-8">Authenticate to manage your product database.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Admin Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#003366] transition-all text-center tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#003366] text-white py-4 font-black rounded-2xl hover:bg-slate-900 transition-colors uppercase tracking-widest text-sm shadow-xl shadow-blue-900/10">
              {loading ? "Verifying..." : "Authorize"}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="pt-24 pb-32 bg-slate-50 min-h-screen relative">
      <div className="absolute inset-0 z-0 h-[400px] w-full bg-slate-100 opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Setup */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pb-6 border-b border-slate-200/60">
           <div>
             <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase mb-2 block">
                Database Interface
             </span>
             <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Products Admin</h1>
           </div>
           
           <div className="flex items-center gap-3">
             <button onClick={loadProducts} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-[#003366] hover:border-[#003366] transition-all text-xs font-black uppercase tracking-widest shadow-sm">
               <RefreshCw className="w-4 h-4" /> Refresh
             </button>
             {products.length === 0 && (
               <button onClick={handleSeed} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 rounded-full text-slate-900 transition-all text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95">
                 <UploadCloud className="w-4 h-4" /> Seed Live DB
               </button>
             )}
             <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 px-5 py-2.5 bg-[#003366] rounded-full text-white transition-all text-xs font-black uppercase tracking-widest shadow-[0_5px_15px_rgba(0,51,102,0.2)] hover:scale-105 active:scale-95">
               {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
               {showAddForm ? "Close" : "New Item"}
             </button>
           </div>
        </div>

        {/* Filters Top Bar */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white/70 backdrop-blur-xl border border-slate-200 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row gap-4"
        >
           <div className="flex-1 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search product names..." 
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#003366]/20 transition-all"
               disabled={products.length === 0}
             />
           </div>
           <div className="w-full md:w-64 relative">
             <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
             <select 
               value={filterCategory} 
               onChange={e => setFilterCategory(e.target.value)}
               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#003366]/20 transition-all appearance-none"
               disabled={products.length === 0}
             >
               <option value="All">All Categories</option>
               {Array.from(new Set(products.map(p => p.category))).map(cat => (
                 <option key={cat as string} value={cat as string}>{cat as string}</option>
               ))}
             </select>
           </div>
        </motion.div>

        {/* Add Product Inline Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white p-8 rounded-3xl border-2 border-[#003366] shadow-[0_20px_50px_rgba(0,51,102,0.1)] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Box className="w-5 h-5 text-[#003366]" /> Publish New Item
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Title</label>
                    <input type="text" value={newForm.name} onChange={e=>setNewForm({...newForm, name: e.target.value})} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#003366]" placeholder="e.g. Magic Pop" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Category</label>
                    <select value={newForm.category} onChange={e=>setNewForm({...newForm, category: e.target.value})} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#003366] appearance-none">
                        <option value="Cookies & Biscuits">Cookies & Biscuits</option>
                        <option value="Wafers">Wafers</option>
                        <option value="Candies & Toffees">Candies & Toffees</option>
                        <option value="Lollipops">Lollipops</option>
                        <option value="Bubble Gum">Bubble Gum</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                      <input type="text" value={newForm.image} onChange={e=>setNewForm({...newForm, image: e.target.value})} className="w-full pl-12 pr-12 p-4 border border-slate-200 rounded-2xl bg-slate-50 font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#003366]" placeholder="/image.png" />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] transition-colors"
                        title="Upload Image File"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => handleImageUpload(e, 'new')} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <button onClick={handleCreate} disabled={loading} className="px-8 py-4 bg-amber-500 text-slate-900 font-black tracking-widest uppercase text-[11px] rounded-full hover:bg-amber-600 transition-all hover:scale-105 active:scale-95 shadow-[0_5px_20px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                     {loading ? "Publishing..." : "Confirm & Publish"}
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------- */}
        {/* Products Data Grid   */}
        {/* -------------------- */}
        {loading && products.length === 0 ? (
           <div className="flex flex-col items-center justify-center p-32 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
             <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-[#003366] animate-spin mb-4"></div>
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Syncing Database...</p>
           </div>
        ) : products.length === 0 ? (
           <div className="text-center p-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Box className="w-8 h-8 text-slate-300" />
             </div>
             <p className="text-slate-900 font-black uppercase text-xl tracking-widest mb-4">Database is Empty</p>
             <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">Click the Seed button in the navigation to instantly populate your dashboard with your existing static data.</p>
             <button onClick={handleSeed} className="px-8 py-4 bg-[#003366] rounded-full font-black text-xs uppercase tracking-widest text-white hover:bg-slate-900 shadow-xl shadow-blue-900/10 transition-transform hover:-translate-y-1">
               Push Static Data Now
             </button>
           </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden relative">
            
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100/60">
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ref ID</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-20">Media</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] min-w-[300px]">Product Name</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                   <AnimatePresence>
                     {filteredProducts.map((p, idx) => (
                       <motion.tr 
                         layout
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.4) }}
                         key={p.id} 
                         className="hover:bg-slate-50/50 transition-colors group"
                       >
                         <td className="p-5 font-bold text-slate-400 text-xs">#{String(p.id).padStart(4, '0')}</td>
                         
                         <td className="p-5">
                           <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-white group-hover:shadow-sm transition-all overflow-hidden border border-transparent group-hover:border-slate-100">
                             <img src={p.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" alt="img" />
                           </div>
                         </td>
                         
                         {isEditing === p.id ? (
                            <>
                              <td className="p-5">
                                <div className="space-y-2">
                                  <input type="text" value={editForm.name} onChange={e=>setEditForm({...editForm, name: e.target.value})} className="w-full p-3 bg-white border border-blue-500 rounded-xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm" />
                                  <div className="relative">
                                    <input type="text" value={editForm.image} onChange={e=>setEditForm({...editForm, image: e.target.value})} className="w-full p-2 pl-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none" placeholder="Image URL" />
                                    <button 
                                      type="button"
                                      onClick={() => editFileInputRef.current?.click()}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366]"
                                    >
                                      <Paperclip className="w-4 h-4" />
                                    </button>
                                    <input type="file" ref={editFileInputRef} onChange={(e) => handleImageUpload(e, 'edit')} accept="image/*" className="hidden" />
                                  </div>
                                </div>
                              </td>
                              <td className="p-5">
                                <select value={editForm.category} onChange={e=>setEditForm({...editForm, category: e.target.value})} className="w-full p-3 bg-white border border-blue-500 rounded-xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm appearance-none">
                                  <option value="Cookies & Biscuits">Cookies & Biscuits</option>
                                  <option value="Wafers">Wafers</option>
                                  <option value="Candies & Toffees">Candies & Toffees</option>
                                  <option value="Lollipops">Lollipops</option>
                                  <option value="Bubble Gum">Bubble Gum</option>
                                </select>
                              </td>
                              <td className="p-5 flex items-center justify-end gap-2">
                                <button onClick={() => saveEdit(p.id)} className="flex items-center gap-2 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-black text-[10px] uppercase tracking-widest shadow-sm">
                                   <Check className="w-4 h-4" /> Save
                                </button>
                                <button onClick={() => setIsEditing(null)} className="flex items-center gap-2 p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-black text-[10px] uppercase tracking-widest">
                                   <X className="w-4 h-4" /> Cancel
                                </button>
                              </td>
                            </>
                         ) : (
                            <>
                              <td className="p-5 font-black text-slate-800 text-sm tracking-tight">{p.name}</td>
                              <td className="p-5">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-black text-[10px] uppercase tracking-widest border border-amber-200/50">
                                   {p.category}
                                </span>
                              </td>
                              <td className="p-5">
                                <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => startEdit(p)} className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:border-[#003366] hover:text-[#003366] hover:shadow-sm transition-all">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm transition-all">
                                    <Trash className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                         )}
                       </motion.tr>
                     ))}
                   </AnimatePresence>
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                 <div className="p-16 text-center text-slate-400 font-medium flex flex-col items-center">
                    <Search className="w-8 h-8 opacity-50 mb-4" />
                    No products matched your search.
                 </div>
              )}
            </div>
            
            <div className="bg-slate-50/80 p-4 border-t border-slate-100 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
               {filteredProducts.length} Results Rendered
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
