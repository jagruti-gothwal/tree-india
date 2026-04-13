"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, PackageSearch, X, ShoppingCart, Info, Globe, Layers, ArrowRight, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { staticProductsFallback } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import { fetchAllProducts } from "../admin/actions";
import WhatsAppIcon from "@/components/WhatsAppIcon";
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

        const groups: { [key: string]: any } = {};
        const suffixes = [
          "BLUEBERRY", "GUAVA", "MANGO", "ORANGE", "STRAWBERRY ICECREAM", "STRAWBERRY", "WATERMELON",
          "Chocolate", "Strawberry", "Vanilla", "Orange", "Pineapple", "Mango", "Lemon", "Lychee", "Menthol", "Peanut", "Tamarind", "Pistachio",
          "Jar", "Pouch", "Combine", "Fresh", "wheat", "Toffee", "Lollipop", "Lollipops", "Bubblegum", "Milky", "Fruity"
        ];

        const normalizationMap: { [key: string]: string } = {
          "Maravilha": "Maravila",
          "Creamy topper": "Creamy Topper",
        };

        staticProductsFallback.forEach(p => {
          let baseName = p.name;

          // Apply normalization for known typos/variations
          Object.keys(normalizationMap).forEach(key => {
            if (baseName.includes(key)) baseName = baseName.replace(key, normalizationMap[key]);
          });

          let flavor = "";
          // Sort suffixes by length descending to match longer ones first (e.g. "Strawberry Icecream" before "Strawberry")
          const sortedSuffixes = [...suffixes].sort((a, b) => b.length - a.length);

          for (const suffix of sortedSuffixes) {
            const regex = new RegExp(`\\s+${suffix}$`, 'i');
            if (regex.test(baseName)) {
              flavor = suffix;
              baseName = baseName.replace(regex, '').trim();
              break;
            }
          }

          if (!groups[baseName]) {
            groups[baseName] = {
              ...p,
              name: baseName,
              variants: []
            };
          }

          // Prioritize 'Combine' variant image for the group's main display image
          if (flavor.toLowerCase() === "combine" || p.name.toLowerCase().includes("combine")) {
            groups[baseName].image = p.image;
          }

          groups[baseName].variants.push({
            id: p.id,
            name: flavor || "Original",
            image: p.image
          });
        });

        setProducts(Object.values(groups));
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
      setActiveImage(detailProduct.image);
    } else {
      setActiveImage(null);
    }
  }, [detailProduct]);

  const categories = [
    { id: "All", label: t("categoryAll"), image: "/Category/Bicsuits and Wafers/DJ CREMO COMBINE.png" },
    { id: "Lollipops", label: t("categoryLollipops"), image: "/Category/Lollipops and Bubblegum/DJ Whistle Lollipops Markup.png" },
    { id: "Candies & Toffees", label: t("categoryCandies"), image: "/Category/Candies and toffees/DJ Choco Eclairs Jar Markup.png" },
    { id: "Cookies & Biscuits", label: t("categoryBiscuits"), image: "/Category/Bicsuits and Wafers/DJ American Biscuits Markup Combine.png" },
    { id: "Chocolates", label: t("categoryChocolates"), image: "/Category/Chocolates/DJ Cocovibe Markup.png" }
  ];

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => {
      const cat = p.category?.toLowerCase() || "";
      const active = activeCategory.toLowerCase();

      if (active === "lollipops") return cat.includes("lollipop") || cat.includes("gum");
      if (active === "cookies & biscuits") return cat.includes("biscuit") || cat.includes("cookie") || cat.includes("wafer");
      if (active === "candies & toffees") return cat.includes("candy") || cat.includes("toffee");
      if (active === "chocolates") return cat.includes("chocolate");

      return cat === active;
    });

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

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#014995] uppercase tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 heading-font drop-shadow-sm">
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

        {/* Visual Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mb-20">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const catCount = cat.id === "All" ? products.length : products.filter((p: any) => {
              const pCat = p.category?.toLowerCase() || "";
              const cTerm = cat.id.toLowerCase();
              if (cTerm === "lollipops") return pCat.includes("lollipop") || pCat.includes("gum");
              if (cTerm === "cookies & biscuits") return pCat.includes("biscuit") || pCat.includes("cookie") || pCat.includes("wafer");
              if (cTerm === "candies & toffees") return pCat.includes("candy") || pCat.includes("toffee");
              if (cTerm === "chocolates") return pCat.includes("chocolate");
              return pCat === cTerm;
            }).length;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative group flex flex-col items-center p-6 md:p-8 rounded-[3rem] transition-all border-4 overflow-hidden",
                  isActive
                    ? "bg-white border-[#ff5c8a] shadow-[0_20px_40px_rgba(255,92,138,0.15)]"
                    : "bg-white/60 border-transparent hover:border-pink-200 hover:bg-white shadow-sm"
                )}
              >
                <div className={cn(
                  "w-24 h-24 md:w-32 md:h-32 mb-6 rounded-[2rem] flex items-center justify-center p-1 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  isActive ? "bg-pink-50" : "bg-slate-50"
                )}>
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-contain filter drop-shadow-sm" />
                </div>

                <span className={cn(
                  "text-[11px] font-black uppercase tracking-widest text-center leading-tight mb-1",
                  isActive ? "text-[#ff5c8a]" : "text-slate-600 group-hover:text-[#ff5c8a]"
                )}>
                  {cat.label}
                </span>

                <span className="text-[10px] font-bold text-slate-400">
                  {catCount} {t("navProducts") || "Products"}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeCatIndicator"
                    className="absolute bottom-0 left-0 right-0 h-2 bg-[#ff5c8a]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Layers className="w-5 h-5 text-[#ff5c8a]" />
            <span className="text-sm font-black text-[#014995] uppercase tracking-widest">
              {filteredProducts.length} {t("navProducts") || "Products"} in {getTranslatedCategory(activeCategory)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const allIds = filteredProducts.map((p: any) => p.id);
                setSelectedProductIds(prev => {
                  const newIds = [...prev];
                  allIds.forEach(id => {
                    if (!newIds.includes(id)) newIds.push(id);
                  });
                  return newIds;
                });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 text-[#014995] font-black text-[11px] uppercase tracking-widest hover:border-[#ff5c8a] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Check className="w-4 h-4" />
              {t("productSelectAll") || "Select All"}
            </button>

            {selectedProductIds.length > 0 && (
              <button
                onClick={() => setSelectedProductIds([])}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-red-100 text-red-500 font-black text-[11px] uppercase tracking-widest hover:border-red-400 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <X className="w-4 h-4" />
                {t("productClearAll") || "Clear All"}
              </button>
            )}
          </div>
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
                const isSelected = product.variants.some((v: any) => selectedProductIds.includes(v.id));
                return (
                  <motion.div
                    key={product.id}
                    layout
                    className={cn(
                      "group relative bg-white border-4 rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)]",
                      isSelected
                        ? "border-[#ff5c8a] shadow-[0_30px_60px_rgba(255,92,138,0.15)] ring-4 ring-[#ff5c8a]/10"
                        : "border-transparent hover:shadow-[0_40px_60px_rgba(0,0,0,0.08)]"
                    )}
                    onClick={() => setDetailProduct(product)}
                  >
                    {/* Selection Badge */}
                    <div
                      onClick={(e) => toggleProductSelection(e, product.id)}
                      className={cn(
                        "absolute top-6 right-6 z-20 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                        isSelected
                          ? "bg-[#ff5c8a] text-white scale-110 rotate-0"
                          : "bg-white/80 backdrop-blur-md text-slate-300 hover:text-[#ff5c8a] hover:scale-110 -rotate-12 group-hover:rotate-0 group-hover:text-slate-400"
                      )}
                    >
                      {isSelected ? <Check className="w-7 h-7" strokeWidth={4} /> : <div className="w-6 h-6 border-4 border-current rounded-lg" />}
                    </div>

                    <div className="aspect-square w-full bg-white flex items-center justify-center p-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <motion.img
                        src={product.image || product.mainImage || "/TREE-INDIA-LOGO-CDR.jpg"}
                        alt={product.name}
                        className={cn(
                          "w-full h-full object-contain transition-transform duration-700",
                          isSelected ? "scale-95" : "scale-105 group-hover:scale-115"
                        )}
                      />
                    </div>

                    <div className={cn(
                      "p-6 text-center transition-colors duration-500",
                      isSelected ? "bg-pink-50/50" : "bg-gradient-to-b from-white to-slate-50 border-t border-slate-50 group-hover:bg-white"
                    )}>
                      <h3 className={cn(
                        "text-xl font-black uppercase tracking-tighter transition-colors heading-font leading-tight",
                        isSelected ? "text-[#ff5c8a]" : "text-[#014995] group-hover:text-[#ff5c8a]"
                      )}>{product.name}</h3>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {getTranslatedCategory(product.category)}
                        </p>
                        {product.variants && product.variants.length > 1 && (
                          <span className="text-[9px] font-black px-2 py-0.5 bg-pink-50 text-[#ff5c8a] rounded-full border border-pink-100 uppercase tracking-tighter">
                            {product.variants.length} {t("navFlavors") || "Flavors"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info Icon for Detail */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#014995] rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-xl">
                        <Info className="w-4 h-4" />
                        {t("productSpecs") || "View Details"}
                      </div>
                    </div>
                  </motion.div>
                );
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
              <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 via-[#f0f9ff] to-pink-50 p-6 md:p-20 flex flex-col items-center justify-center relative overflow-hidden">
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

                {detailProduct.variants && (detailProduct.variants.length > 1 || (detailProduct.variants.length === 1 && detailProduct.variants[0].name !== "Original")) && (
                  <div className="mt-12 w-full relative z-10">
                    <p className="text-[10px] font-black text-[#014995] uppercase tracking-[0.2em] mb-4 text-center">Available Flavors / Variants</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {detailProduct.variants.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveImage(v.image);
                            setDetailProduct({ ...detailProduct, id: v.id, image: v.image });
                          }}
                          className={cn(
                            "relative w-20 h-20 bg-white p-2 rounded-[1.5rem] border-2 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm overflow-hidden",
                            (activeImage === v.image || detailProduct.id === v.id) ? "border-[#ff5c8a] shadow-lg shadow-pink-500/20" : "border-slate-100 hover:border-pink-200 hover:shadow-md"
                          )}
                        >
                          <img src={v.image || "/TREE-INDIA-LOGO-CDR.jpg"} className="w-full h-full object-contain p-1" alt={v.name} />
                          <div className="absolute inset-x-0 bottom-0 bg-white/90 py-0.5 text-[8px] font-bold text-[#ff5c8a] uppercase truncate px-1">
                            {v.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Product Details */}
              <div className={cn("w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white h-full overflow-y-auto", isRTL && "text-right")}>
                <div className="mb-10">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 font-black tracking-[0.2em] text-[11px] uppercase mb-6 shadow-sm">{getTranslatedCategory(detailProduct.category)}</span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#014995] uppercase tracking-tighter leading-[0.9] md:leading-[0.85] heading-font drop-shadow-sm">{detailProduct.name}</h2>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <Link
                    href={`https://wa.me/919408436732?text=${encodeURIComponent(`Hello, I am interested in ${detailProduct.name} ${detailProduct.specs || ""}. Can you provide more details?`)}`}
                    target="_blank"
                    className="h-20 rounded-full font-black uppercase tracking-widest text-[14px] transition-all flex items-center justify-center gap-4 transform active:scale-95 bg-[#25D366] text-white hover:bg-[#128C7E] hover:scale-105 shadow-[0_20px_40px_rgba(37,211,102,0.3)]"
                  >
                    <WhatsAppIcon className="w-7 h-7" />
                    Connect on WhatsApp
                  </Link>

                  <button
                    onClick={(e) => { toggleProductSelection(e as any, detailProduct.id); setDetailProduct(null); }}
                    className={cn(
                      "h-20 rounded-full font-black uppercase tracking-widest text-[14px] transition-all flex items-center justify-center gap-4 transform active:scale-95",
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
