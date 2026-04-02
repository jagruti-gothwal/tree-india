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
    id: 1, name: "Baba Lovely Pop", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png", 
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 2, name: "DJ Milk Pop", category: "Lollipops", image: "/DJ Milk Pop Markup.png", 
    specs: "15g x 48 pieces per packet", price: "Export Grade" 
  },
  { 
    id: 3, name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/DJ Fruitoo lollipops markup.png", 
    specs: "10g x 100 pieces per jar", price: "Export Grade" 
  },
  { 
    id: 4, name: "DJ Yogurt Pop", category: "Lollipops", image: "/DJ Yogurt Pop Lollipop Markup.png", 
    specs: "12g x 50 pieces per packet", price: "Export Grade" 
  },

  // Cookies & Biscuits
  { 
    id: 10, name: "DJ Cremo Series", category: "Cookies & Biscuits", image: "/DJ CREMO COMBINE.png", 
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 11, name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup Combine.png", 
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 12, name: "DJ Creamy Topper", category: "Cookies & Biscuits", image: "/DJ Creamy Topper Combine.png", 
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 13, name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/DJ Milk Cookies.png", 
    specs: "Rich milk flavor biscuits", price: "Export Grade" 
  },
  { 
    id: 18, name: "DJ Superb Plus", category: "Cookies & Biscuits", image: "/DJ Superb Plus Cookies.png", 
    specs: "The ultimate export-quality biscuit", price: "Export Grade" 
  },

  // Wafers
  { 
    id: 30, name: "Maravilha Wafers", category: "Wafers", image: "/Maravilha combine markup.png", 
    specs: "Double cream layer wafers in 24g packets", price: "Export Grade" 
  },

  // Candies & Toffees
  { 
    id: 40, name: "DJ Choco Eclairs", category: "Candies & Toffees", image: "/DJ Choco Eclairs Jar Markup.png", 
    specs: "150 pieces per jar, 12 jars per carton", price: "Export Grade" 
  },
  { 
    id: 43, name: "Tick Tick Series", category: "Candies & Toffees", image: "/TICK TICK FRUITY MILKY.png", 
    specs: "100 pieces per packet, 50 packets per carton", price: "Export Grade" 
  },

  // Bubble Gum
  { 
    id: 60, name: "DJ Olivary Gum", category: "Bubble Gum", image: "/DJ OLIVARY Bubblegum Markup.png", 
    specs: "Long-lasting flavor bubble gum", price: "Export Grade" 
  },
  { 
    id: 61, name: "DJ Gum Pops", category: "Bubble Gum", image: "/DJ Gum Pops Markup.png", 
    specs: "Bubble gum filled centers", price: "Export Grade" 
  }
];

export default function Products() {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                      "group relative bg-white border rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl",
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
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-8 text-center bg-slate-50/50">
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">{getTranslatedCategory(product.category)}</span>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#003366] transition-colors">{product.name}</h3>
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
          <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setDetailProduct(null)}
                className={cn(
                  "absolute top-6 z-50 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900",
                  isRTL ? "left-6" : "right-6"
                )}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 bg-slate-50 p-12 flex flex-col items-center justify-center">
                <img src={detailProduct.image || detailProduct.mainImage} alt={detailProduct.name} className="max-h-full max-w-full object-contain filter drop-shadow-xl" />
                
                {detailProduct.variants && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {detailProduct.variants.map((v: any, i: number) => (
                      <img key={i} src={v.image} className="w-12 h-12 object-contain p-1 bg-white rounded-lg border border-slate-200" title={v.name} />
                    ))}
                  </div>
                )}
              </div>

              <div className={cn("w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center", isRTL && "text-right")}>
                <span className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">{getTranslatedCategory(detailProduct.category)}</span>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-[1] mb-8">{detailProduct.name}</h2>
                
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-heading">{t("productSpecs")}</h4>
                    <p className="text-lg font-bold text-[#003366]">{detailProduct.specs}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-heading">{t("productSupplyType")}</h4>
                    <p className="text-lg font-bold text-[#003366]">{t("productSupplyDesc")}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={(e) => { toggleProductSelection(e as any, detailProduct.id); setDetailProduct(null); }}
                    className={cn(
                      "flex-1 h-16 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3",
                      selectedProductIds.includes(detailProduct.id) ? "bg-amber-500 text-white" : "bg-[#003366] text-white hover:bg-[#002244]"
                    )}
                  >
                    {selectedProductIds.includes(detailProduct.id) ? t("productDeselect") : t("productAddInquiry")}
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
