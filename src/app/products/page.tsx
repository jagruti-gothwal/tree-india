"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, PackageSearch, X, ShoppingCart, Info, Globe, Layers, ArrowRight, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { fetchAllProducts } from "../admin/actions";

const staticProductsFallback = [
  // Lollipops
  { 
    id: 1, name: "Baba Lovely Pop", category: "Lollipops", image: "/transparent/BABA LOVELY POP BLUEBERRY MARKUP.png", 
    specs: "24g x 24 packets", price: "Export Grade",
    variants: [
      { name: "Blueberry", image: "/transparent/BABA LOVELY POP BLUEBERRY MARKUP.png" },
      { name: "Guava", image: "/transparent/BABA LOVELY POP GUAVA MARKUP.png" },
      { name: "Mango", image: "/transparent/BABA LOVELY POP MANGO MARKUP.png" },
      { name: "Orange", image: "/transparent/BABA LOVELY POP ORANGE MARKUP.png" },
      { name: "Strawberry Icecream", image: "/transparent/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png" },
      { name: "Strawberry", image: "/transparent/BABA LOVELY POP STRAWBERRY MARKUP.png" },
      { name: "Watermelon", image: "/transparent/BABA LOVELY POP WATERMELON MARKUP.png" }
    ]
  },
  { 
    id: 2, name: "DJ Milk Pop", category: "Lollipops", image: "/transparent/DJ Milk Pop Markup.png", 
    specs: "15g x 48 pieces", price: "Export Grade" 
  },
  { 
    id: 3, name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/transparent/DJ Fruitoo lollipops markup.png", 
    specs: "10g x 100 pieces", price: "Export Grade" 
  },

  // Cookies & Biscuits
  { 
    id: 10, name: "DJ Cremo Series", category: "Cookies & Biscuits", image: "/transparent/DJ CREMO COMBINE.png", 
    specs: "24g x 24 packets", price: "Export Grade",
    variants: [
      { name: "Chocolate", image: "/transparent/DJ CREMO CHOCOLATE Markup.png" },
      { name: "Mango", image: "/transparent/DJ CREMO MANGO markup.png" },
      { name: "Orange", image: "/transparent/DJ CREMO ORANGE Markup.png" },
      { name: "Pineapple", image: "/transparent/DJ CREMO PINEAPPLE Markup.png" },
      { name: "Strawberry", image: "/transparent/DJ CREMO STRAWBERRY MARKUP.png" },
      { name: "Vanilla", image: "/transparent/DJ CREMO VANILLA Markup.png" }
    ]
  },
  { 
    id: 11, name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/transparent/DJ American Biscuits Markup Combine.png", 
    specs: "24g x 24 packets", price: "Export Grade" 
  },
  { 
    id: 12, name: "DJ Creamy Topper", category: "Cookies & Biscuits", image: "/transparent/DJ Creamy Topper Combine.png", 
    specs: "24g x 24 packets", price: "Export Grade",
    variants: [
      { name: "Chocolate", image: "/transparent/DJ Creamy topper Chocolate Markup.png" },
      { name: "Mango", image: "/transparent/DJ Creamy topper Mango Markup.png" },
      { name: "Orange", image: "/transparent/DJ Creamy topper Orange Markup.png" },
      { name: "Strawberry", image: "/transparent/DJ Creamy topper Strawberry Markup.png" }
    ]
  },
  { 
    id: 13, name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/transparent/DJ Milk Cookies.png", 
    specs: "20g x 48 packets", price: "Export Grade" 
  },
  { 
    id: 18, name: "DJ Superb Plus", category: "Cookies & Biscuits", image: "/transparent/DJ Superb Plus Cookies.png", 
    specs: "25g x 36 packets", price: "Export Grade" 
  },

  // Wafers
  { 
    id: 30, name: "Maravilha Wafers", category: "Wafers", image: "/transparent/Maravilha combine markup.png", 
    specs: "24g x 24 packets", price: "Export Grade",
    variants: [
      { name: "Chocolate", image: "/transparent/Maravila ChocolatevMarkup.png" },
      { name: "Orange", image: "/transparent/Maravila Orange Markup.png" },
      { name: "Strawberry", image: "/transparent/Maravila StrawberryMarkup.png" },
      { name: "Vanilla", image: "/transparent/Maravilha Vanilla Markup.png" }
    ]
  },

  // Candies & Toffees
  { 
    id: 40, name: "DJ Choco Eclairs", category: "Candies & Toffees", image: "/transparent/DJ Choco Eclairs Jar Markup.png", 
    specs: "150 pieces x 12 jars", price: "Export Grade" 
  },
  { 
    id: 43, name: "Tick Tick Series", category: "Candies & Toffees", image: "/transparent/TICK TICK FRUITY MILKY.png", 
    specs: "100 pieces x 50 packets", price: "Export Grade",
    variants: [
      { name: "Fruity Milky", image: "/transparent/TICK TICK FRUITY MILKY.png" },
      { name: "Lemon", image: "/transparent/TICK TICK LEMON.png" },
      { name: "Lychee", image: "/transparent/TICK TICK LYCHEE.png" },
      { name: "Menthol", image: "/transparent/TICK TICK MENTHOL.png" },
      { name: "Peanut", image: "/transparent/TICK TICK PEANUT.png" },
      { name: "Tamarind", image: "/transparent/TICK TICK TAMARIND.png" }
    ]
  },

  // Bubble Gum
  { 
    id: 60, name: "DJ Olivary Gum", category: "Bubble Gum", image: "/transparent/DJ OLIVARY Bubblegum Markup.png", 
    specs: "100 pieces per jar", price: "Export Grade" 
  },
  { 
    id: 61, name: "DJ Gum Pops", category: "Bubble Gum", image: "/transparent/DJ Gum Pops Markup.png", 
    specs: "50 pieces per packet", price: "Export Grade" 
  }
];

export default function Products() {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetchAllProducts();
        if (res.success && res.products && res.products.length > 0) {
          setProducts(res.products);
        } else {
          // If DB is empty OR fetch fails, use static fallback
          setProducts(staticProductsFallback);
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts(staticProductsFallback);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (detailProduct) {
      setActiveImage(detailProduct.image || detailProduct.mainImage);
    } else {
      setActiveImage(null);
    }
  }, [detailProduct]);

  const categories = [
    { id: "All", label: t("categoryAll") },
    { id: "Cookies & Biscuits", label: t("categoryBiscuits") },
    { id: "Wafers", label: t("categoryWafers") },
    { id: "Candies & Toffees", label: t("categoryCandies") },
    { id: "Lollipops", label: t("categoryLollipops") },
    { id: "Bubble Gum", label: t("categoryGum") }
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const toggleProductSelection = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedProductIds((prev) => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const getTranslatedCategory = (catId: string) => {
    return categories.find(c => c.id === catId)?.label || catId;
  };

  return (
    <div className="pt-40 pb-40 min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff5f0] to-[#fffdec]" dir={isRTL ? "rtl" : "ltr"}>
        
        {/* Candy Aesthetic Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-300/10 rounded-full blur-[150px] pointer-events-none"></div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 relative">
            <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-pink-200 bg-pink-50 shadow-sm mb-8 group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5c8a]"></span>
              </span>
              <span className="text-[#ff5c8a] font-black text-[11px] tracking-[0.3em] uppercase">{t("productCategoryLabel")}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#014995] uppercase tracking-tighter leading-[0.85] mb-8 heading-font drop-shadow-sm">
              {t("productsTitle1")} <br className="md:hidden" /><span className="text-[#ff5c8a]">{t("productsTitle2")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-wider">
              {t("productsHeaderDesc")}
            </p>
  
            <Link
              href="/Tree%20India%20Catalogue%20Compressed.pdf"
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#014995] text-white hover:bg-[#3b0764] hover:scale-105 active:scale-95 px-10 py-5 rounded-full font-black text-[13px] uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(1,73,149,0.3)]"
            >
              <Download className="w-5 h-5" />
              {t("navDownload")}
            </Link>
          </div>
  
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => {
               const isActive = activeCategory === cat.id;
               const catCount = cat.id === "All" ? products.length : products.filter((p: any) => p.category === cat.id).length;

               return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-8 py-4 text-[11px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-3 border-2 border-transparent",
                    isActive 
                      ? "bg-[#ff5c8a] text-white shadow-[0_15px_30px_rgba(255,92,138,0.4)] scale-105" 
                      : "bg-white text-slate-500 hover:border-pink-200 hover:text-[#ff5c8a] shadow-sm hover:shadow-md"
                  )}
                >
                  {cat.label}
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
                    isActive ? "bg-white text-[#ff5c8a]" : "bg-slate-100 text-slate-400 group-hover:bg-pink-100 group-hover:text-[#ff5c8a]"
                  )}>
                    {catCount}
                  </span>
                </button>
               )
            })}
          </div>
  
          {/* Products Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-12 h-12 text-[#ff5c8a] animate-spin" />
                <p className="text-pink-500 font-bold uppercase tracking-widest text-xs">{t("loadingProducts") || "Fetching Product Catalog..."}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product: any) => {
                  const isSelected = selectedProductIds.includes(product.id);
  
                  return (
                    <motion.div 
                      key={product.id}
                      layout
                      onClick={() => setDetailProduct(product)}
                      className={cn(
                        "group relative bg-white border-2 rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_60px_rgba(0,0,0,0.08)]",
                        isSelected ? "border-[#ff5c8a] ring-4 ring-[#ff5c8a]/10" : "border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      )}
                    >
                      {/* Select Button */}
                      <button 
                        onClick={(e) => toggleProductSelection(e, product.id)}
                        className={cn(
                          "absolute top-6 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all border-2",
                          isRTL ? "left-6" : "right-6",
                          isSelected ? "bg-[#ff5c8a] border-[#ff5c8a] text-white shadow-lg shadow-pink-500/40" : "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-300 hover:border-[#ff5c8a] hover:text-[#ff5c8a]"
                        )}
                      >
                        <Check className="w-5 h-5" strokeWidth={4} />
                      </button>
                      
                      <div className="aspect-square w-full bg-white flex items-center justify-center p-8 relative overflow-hidden">
                        <motion.img 
                          src={product.image || product.mainImage || "/TREE-INDIA-LOGO-CDR.jpg"} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-xl"
                        />
                      </div>
                      
                      <div className="p-8 text-center bg-gradient-to-b from-white to-slate-50 flex flex-col items-center">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-3 block">{getTranslatedCategory(product.category)}</span>
                        <h3 className="text-2xl font-black text-[#014995] uppercase tracking-tighter group-hover:text-[#ff5c8a] transition-colors mb-5 heading-font leading-tight">{product.name}</h3>
                        
                        <div className="inline-flex items-center gap-2 bg-white border-2 border-slate-100 px-4 py-2 rounded-full shadow-sm group-hover:border-blue-100 transition-colors">
                           <Layers className="w-4 h-4 text-[#ff5c8a]" />
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{product.specs || "Standard Unit"}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-32">
                 <PackageSearch className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
  
        {/* Product Detail Modal */}
        <AnimatePresence>
          {detailProduct && (
            <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDetailProduct(null)}
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-6xl max-h-full md:h-[85vh] rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border-[10px] border-white/50 bg-clip-padding"
              >
                <button 
                  onClick={() => setDetailProduct(null)}
                  className={cn(
                    "absolute top-6 z-50 w-14 h-14 bg-white shadow-xl shadow-slate-200/50 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-[#ff5c8a] hover:scale-110 active:scale-95 transition-all text-xl",
                    isRTL ? "left-6" : "right-6"
                  )}
                >
                  <X className="w-7 h-7" strokeWidth={3} />
                </button>
  
                {/* Left Side: Product Image & Vibrancy */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 via-[#f0f9ff] to-pink-50 p-10 md:p-20 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-[#ff5c8a]/10 to-transparent -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      src={activeImage || "/TREE-INDIA-LOGO-CDR.jpg"} 
                      alt={detailProduct.name} 
                      className="max-h-[300px] md:max-h-[450px] w-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-10 hover:scale-105 transition-transform duration-500" 
                    />
                  </AnimatePresence>
                  
                  {detailProduct.variants && (
                    <div className="mt-12 w-full relative z-10">
                      <p className="text-[10px] font-black text-[#014995] uppercase tracking-[0.2em] mb-4 text-center">Available Flavors / Variants</p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {detailProduct.variants.map((v: any, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => setActiveImage(v.image)}
                            className={cn(
                              "relative w-20 h-20 bg-white p-2 rounded-[1.5rem] border-2 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm overflow-hidden",
                              activeImage === v.image ? "border-[#ff5c8a] shadow-lg shadow-pink-500/20" : "border-slate-100 hover:border-pink-200 hover:shadow-md"
                            )}
                          >
                            <img src={v.image || "/TREE-INDIA-LOGO-CDR.jpg"} className="w-full h-full object-contain p-1" alt={v.name} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
  
                {/* Right Side: Product Details */}
                <div className={cn("w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white h-full overflow-y-auto", isRTL && "text-right")}>
                  <div className="mb-10">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 font-black tracking-[0.2em] text-[11px] uppercase mb-6 shadow-sm">{getTranslatedCategory(detailProduct.category)}</span>
                    <h2 className="text-5xl md:text-7xl font-black text-[#014995] uppercase tracking-tighter leading-[0.85] heading-font drop-shadow-sm">{detailProduct.name}</h2>
                  </div>
                  
                  <div className="space-y-8 mb-12">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#ff5c8a]">
                           <Layers className="w-5 h-5" />
                         </div>
                         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("productSpecs")}</h4>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-[#334155] bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 shadow-none uppercase">{detailProduct.specs}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#014995]">
                           <Globe className="w-5 h-5" />
                         </div>
                         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("productSupplyType")}</h4>
                      </div>
                      <p className="text-lg font-bold text-slate-600 bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 uppercase">{t("productSupplyDesc")}</p>
                    </div>
                  </div>
  
                  <div className="flex gap-4 mt-auto">
                    <button 
                      onClick={(e) => { toggleProductSelection(e as any, detailProduct.id); setDetailProduct(null); }}
                      className={cn(
                        "flex-1 h-20 rounded-full font-black uppercase tracking-widest text-[14px] transition-all flex items-center justify-center gap-4 transform active:scale-95",
                        selectedProductIds.includes(detailProduct.id) ? "bg-[#014995] text-white shadow-[0_20px_40px_rgba(1,73,149,0.3)] hover:scale-105" : "bg-[#ff5c8a] text-white hover:bg-[#e11d48] hover:scale-105 shadow-[0_20px_40px_rgba(255,92,138,0.3)]"
                      )}
                    >
                      {selectedProductIds.includes(detailProduct.id) ? t("productDeselect") : t("productAddInquiry")}
                      <ArrowRight className="w-6 h-6" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* Inquiry Floating Bar */}
      <AnimatePresence>
         {selectedProductIds.length > 0 && (
            <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 100 }}
               className="fixed bottom-10 left-0 right-0 z-[5000] flex justify-center px-4"
            >
               <div className="bg-[#ff5c8a] rounded-full shadow-[0_20px_40px_rgba(255,92,138,0.4)] p-2.5 flex items-center gap-6 md:gap-10 px-8 border-4 border-white/20">
                  <div className="flex items-center gap-4">
                     <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#ff5c8a] font-black text-sm shadow-inner">
                        {selectedProductIds.length}
                     </span>
                     <span className="text-white font-black text-[12px] tracking-[0.2em] uppercase hidden sm:block drop-shadow-sm">
                        {t("productSelectedCount")}
                     </span>
                  </div>
                  
                  <Link
                     href={`/contact?items=${selectedProductIds.join(",")}`}
                     className="bg-white text-[#014995] hover:bg-slate-50 hover:scale-105 active:scale-95 px-8 sm:px-12 h-14 flex items-center gap-3 rounded-full font-black uppercase text-[12px] tracking-widest transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                  >
                     {t("productBulkInquiryBtn")} <ArrowRight className={cn("w-5 h-5 ml-2", isRTL && "rotate-180")} strokeWidth={3} />
                  </Link>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
