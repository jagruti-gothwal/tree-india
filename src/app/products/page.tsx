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
    <div className="pt-40 pb-40 bg-[#f8fafc] min-h-screen relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        
        {/* Background Shapes */}
        <div className={cn(
          "absolute top-0 w-[40vw] h-[40vw] bg-white rounded-full -translate-y-1/2 shadow-[0_0_100px_rgba(0,0,0,0.02)]",
          isRTL ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"
        )}></div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[#003366] font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">{t("productCategoryLabel")}</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-10">
              {t("productsTitle1")} <span className="text-[#003366]">{t("productsTitle2")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto mb-10">
              {t("productsHeaderDesc")}
            </p>
  
            <Link
              href="/Tree%20India%20Catalogue%20Compressed.pdf"
              target="_blank"
              className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 text-slate-700 hover:border-[#003366] hover:text-[#003366] px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-sm hover:shadow-md"
            >
              <Download className="w-5 h-5" />
              {t("navDownload")}
            </Link>
          </div>
  
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            {categories.map((cat) => {
               const isActive = activeCategory === cat.id;
               return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border",
                    isActive ? "bg-[#003366] text-white border-[#003366] shadow-xl" : "bg-white text-slate-500 border-slate-200 hover:border-[#003366] hover:text-[#003366]"
                  )}
                >
                  {cat.label}
                </button>
               )
            })}
          </div>
  
          {/* Products Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-12 h-12 text-[#003366] animate-spin" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t("loadingProducts") || "Fetching Product Catalog..."}</p>
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
                        "group relative bg-white border rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
                        isSelected ? "border-[#003366] ring-2 ring-[#003366]/5" : "border-slate-100"
                      )}
                    >
                      {/* Select Button */}
                      <button 
                        onClick={(e) => toggleProductSelection(e, product.id)}
                        className={cn(
                          "absolute top-4 w-8 h-8 rounded-full border flex items-center justify-center z-20 transition-all",
                          isRTL ? "left-4" : "right-4",
                          isSelected ? "bg-[#003366] border-[#003366] text-white" : "bg-white border-slate-200 text-slate-300 hover:border-[#003366] hover:text-[#003366]"
                        )}
                      >
                        <Check className="w-4 h-4" strokeWidth={4} />
                      </button>
                      
                      <div className="aspect-square w-full bg-white flex items-center justify-center p-8 relative overflow-hidden">
                        <motion.img 
                          src={product.image || product.mainImage} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-xl"
                        />
                      </div>
                      
                      <div className="p-8 text-center bg-slate-50/50">
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">{getTranslatedCategory(product.category)}</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#003366] transition-colors">{product.name}</h3>
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
                className="relative bg-white w-full max-w-5xl max-h-full rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
              >
                <button 
                  onClick={() => setDetailProduct(null)}
                  className={cn(
                    "absolute top-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm",
                    isRTL ? "left-6" : "right-6"
                  )}
                >
                  <X className="w-6 h-6" />
                </button>
  
                <div className="w-full md:w-1/2 bg-slate-50 p-10 md:p-20 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50 pointer-events-none"></div>
                  
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      src={activeImage || ""} 
                      alt={detailProduct.name} 
                      className="max-h-[300px] md:max-h-[450px] w-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10" 
                    />
                  </AnimatePresence>
                  
                  {detailProduct.variants && (
                    <div className="mt-12 w-full relative z-10">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Available Flavors / Variants</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {detailProduct.variants.map((v: any, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => setActiveImage(v.image)}
                            className={cn(
                              "w-16 h-16 p-2 rounded-2xl border transition-all hover:scale-110",
                              activeImage === v.image ? "bg-white border-[#003366] ring-4 ring-[#003366]/5 shadow-lg shadow-[#003366]/10" : "bg-white/50 border-slate-200 hover:border-slate-300"
                            )}
                          >
                            <img src={v.image} className="w-full h-full object-contain" alt={v.name} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
  
                <div className={cn("w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white", isRTL && "text-right")}>
                  <span className="text-amber-500 font-black tracking-[0.4em] text-[11px] uppercase mb-6 block">{getTranslatedCategory(detailProduct.category)}</span>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.95] mb-10">{detailProduct.name}</h2>
                  
                  <div className="space-y-10 mb-14">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#003366]">
                           <Layers className="w-4 h-4" />
                         </div>
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("productSpecs")}</h4>
                      </div>
                      <p className="text-2xl font-black text-[#64748b] bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm">{detailProduct.specs}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                           <Globe className="w-4 h-4" />
                         </div>
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("productSupplyType")}</h4>
                      </div>
                      <p className="text-xl font-bold text-slate-600 px-6">{t("productSupplyDesc")}</p>
                    </div>
                  </div>
  
                  <div className="flex gap-4">
                    <button 
                      onClick={(e) => { toggleProductSelection(e as any, detailProduct.id); setDetailProduct(null); }}
                      className={cn(
                        "flex-1 h-20 rounded-full font-black uppercase tracking-[0.2em] text-[12px] transition-all flex items-center justify-center gap-4 shadow-2xl",
                        selectedProductIds.includes(detailProduct.id) ? "bg-amber-500 text-white shadow-amber-500/30" : "bg-[#003366] text-white hover:bg-[#002244] shadow-[#003366]/30"
                      )}
                    >
                      {selectedProductIds.includes(detailProduct.id) ? t("productDeselect") : t("productAddInquiry")}
                      <ArrowRight className="w-5 h-5" />
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
               <div className="bg-[#003366] rounded-full shadow-2xl p-2 flex items-center gap-8 px-8">
                  <div className="flex items-center gap-4">
                     <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#003366] font-black text-xs">
                        {selectedProductIds.length}
                     </span>
                     <span className="text-white font-bold text-[10px] tracking-widest uppercase hidden sm:block">
                        {t("productSelectedCount")}
                     </span>
                  </div>
                  
                  <Link
                     href={`/contact?items=${selectedProductIds.join(",")}`}
                     className="bg-amber-500 text-white hover:bg-amber-600 px-10 h-14 flex items-center gap-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all"
                  >
                     {t("productBulkInquiryBtn")} <ArrowRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                  </Link>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
