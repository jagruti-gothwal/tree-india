"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, PackageSearch, X, ShoppingCart, Info, Globe, Layers, ArrowRight, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { fetchAllProducts } from "../admin/actions";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const staticProductsFallback = [
  // Lollipops & Gums (Category/Lollipops and Bubblegum)
  { id: 101, name: "BABA LOVELY POP BLUEBERRY", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP BLUEBERRY MARKUP.png" },
  { id: 102, name: "BABA LOVELY POP GUAVA", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP GUAVA MARKUP.png" },
  { id: 103, name: "BABA LOVELY POP MANGO", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP MANGO MARKUP.png" },
  { id: 104, name: "BABA LOVELY POP ORANGE", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP ORANGE MARKUP.png" },
  { id: 105, name: "BABA LOVELY POP STRAWBERRY ICECREAM", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png" },
  { id: 106, name: "BABA LOVELY POP STRAWBERRY", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP STRAWBERRY MARKUP.png" },
  { id: 107, name: "BABA LOVELY POP WATERMELON", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/BABA LOVELY POP WATERMELON MARKUP.png" },
  { id: 108, name: "DJ Bigg Boom", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Bigg Boom Markup.png" },
  { id: 109, name: "DJ Butter pop", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Butter pop markup.png" },
  { id: 110, name: "DJ Color Pop", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Color Pop Markup.png" },
  { id: 111, name: "DJ Fruitoo lollipops", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Fruitoo lollipops markup.png" },
  { id: 112, name: "DJ Gum Pops", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Gum Pops Markup.png" },
  { id: 113, name: "DJ Love Pop", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Love Pop Markup.png" },
  { id: 114, name: "DJ Milk Pop", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Milk Pop Markup.png" },
  { id: 115, name: "DJ OLIVARY Bubblegum", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ OLIVARY Bubblegum Markup.png" },
  { id: 116, name: "DJ Whistle Lollipops", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Whistle Lollipops Markup.png" },
  { id: 117, name: "DJ Yogurt Pop Lollipop", category: "Lollipops", image: "/Category/Lollipops and Bubblegum/DJ Yogurt Pop Lollipop Markup.png" },

  // Candies & Toffees (Category/Candies and toffees)
  { id: 201, name: "DJ Butter and Milk Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Butter and Milk Candy.png" },
  { id: 202, name: "DJ Choco Eclairs Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Choco Eclairs Jar Markup.png" },
  { id: 203, name: "DJ Choco Eclairs Pouch", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Choco Eclairs Markup Pouch.png" },
  { id: 204, name: "DJ Chocofull Toffee", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Chocofull Toffee Markup.png" },
  { id: 205, name: "DJ Chocolate Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Chocolate Jar Markup.png" },
  { id: 206, name: "DJ Coconut Desire Toffee", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Coconut Desire Toffee Markup.png" },
  { id: 207, name: "DJ Coconut Eclairs Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Coconut Eclairs Jar Markup.png" },
  { id: 208, name: "DJ Frubon Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Frubon Jar Markup.png" },
  { id: 209, name: "DJ Frubon Pouch", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Frubon Pouch Markup.png" },
  { id: 210, name: "DJ Fruit Shots Toffee", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Fruit Shots Toffee Markup.png" },
  { id: 211, name: "DJ Fruits Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Fruits Candy Markup.png" },
  { id: 212, name: "DJ LOL Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ LOL Candy Markup.png" },
  { id: 213, name: "DJ Milk Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Milk Candy Markup.png" },
  { id: 214, name: "DJ Milk Eclairs Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Milk Eclairs Jar Markup.png" },
  { id: 215, name: "DJ Milkshake Toffee", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Milkshake Toffee Markup.png" },
  { id: 216, name: "DJ Mint Cool Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Mint Cool Candy Markup.png" },
  { id: 217, name: "DJ My Milk Jar", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ My Milk Markup Jar.png" },
  { id: 218, name: "DJ Plutoo Candy", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ Plutoo Candy Markup.png" },
  { id: 219, name: "DJ Tamarind Blast", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ TAMARIND BLAST MARKUP.png" },
  { id: 220, name: "DJ Tangy Tamarind", category: "Candies & Toffees", image: "/Category/Candies and toffees/DJ TANGY TAMARIND Markup.png" },
  { id: 221, name: "Tick Tick Fruity Milky", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK FRUITY MILKY.png" },
  { id: 222, name: "Tick Tick Lemon", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK LEMON.png" },
  { id: 223, name: "Tick Tick Lychee", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK LYCHEE.png" },
  { id: 224, name: "Tick Tick Menthol", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK MENTHOL.png" },
  { id: 225, name: "Tick Tick Peanut", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK PEANUT.png" },
  { id: 226, name: "Tick Tick Tamarind", category: "Candies & Toffees", image: "/Category/Candies and toffees/TICK TICK TAMARIND.png" },

  // Chocolates (Category/Chocolates)
  { id: 301, name: "DJ Cocovibe", category: "Chocolates", image: "/Category/Chocolates/DJ Cocovibe Markup.png" },
  { id: 302, name: "DJ Frenzy", category: "Chocolates", image: "/Category/Chocolates/DJ Frenzy Markup.png" },
  { id: 303, name: "DJ Starvibe", category: "Chocolates", image: "/Category/Chocolates/DJ Starvibe Markup.png" },

  // Cookies & Biscuits (Category/Bicsuits and Wafers)
  { id: 401, name: "BABA MILK FRESH", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/BABA MILK FRESH Markup.png" },
  { id: 402, name: "Boost Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Boost Chocolate.png" },
  { id: 403, name: "DJ American Biscuits Combine", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ American Biscuits Markup Combine.png" },
  { id: 404, name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ American Biscuits Markup.png" },
  { id: 405, name: "DJ Boost wheat", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Boost wheat.png" },
  { id: 406, name: "DJ Butter Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Butter Cookies.png" },
  { id: 407, name: "DJ Cashew Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CASHEW COOKIES.png" },
  { id: 408, name: "DJ Chocochip Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CHOCOCHIP COOKIES.png" },
  { id: 409, name: "DJ Coconut Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ COCONUT COOKIES.png" },
  { id: 410, name: "DJ Cream Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM CHOCOLATE MARKUP.png" },
  { id: 411, name: "DJ Cream Combine", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM COMBINE.png" },
  { id: 412, name: "DJ Cream Fresh", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM FRESH MARKUP.png" },
  { id: 413, name: "DJ Cream Mango", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM MANGO MARKUP.png" },
  { id: 414, name: "DJ Cream Pineapple", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM PINEAPPLE MARKUP.png" },
  { id: 415, name: "DJ Cream Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM STRAWBERRY MARKUP.png" },
  { id: 416, name: "DJ Cream Vanilla", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREAM VANILLA MARKUP.png" },
  { id: 417, name: "DJ Cremo Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO CHOCOLATE Markup.png" },
  { id: 418, name: "DJ Cremo Combine", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO COMBINE.png" },
  { id: 419, name: "DJ Cremo Mango", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO MANGO markup.png" },
  { id: 420, name: "DJ Cremo Orange", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO ORANGE Markup.png" },
  { id: 421, name: "DJ Cremo Pineapple", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO PINEAPPLE Markup.png" },
  { id: 422, name: "DJ Cremo Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO STRAWBERRY MARKUP.png" },
  { id: 423, name: "DJ Cremo Vanilla", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ CREMO VANILLA Markup.png" },
  { id: 424, name: "DJ Conico Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Conico Chocolate.png" },
  { id: 425, name: "DJ Conico Mango", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Conico Mango.png" },
  { id: 426, name: "DJ Conico Orange", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Conico Orange.png" },
  { id: 427, name: "DJ Conico Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Conico Strawberry.png" },
  { id: 428, name: "DJ Creamy Topper Combine", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Creamy Topper Combine.png" },
  { id: 429, name: "DJ Creamy topper Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Creamy topper Chocolate Markup.png" },
  { id: 430, name: "DJ Creamy topper Mango", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Creamy topper Mango Markup.png" },
  { id: 431, name: "DJ Creamy topper Orange", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Creamy topper Orange Markup.png" },
  { id: 432, name: "DJ Creamy topper Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Creamy topper Strawberry Markup.png" },
  { id: 433, name: "DJ Finger Shortbread", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ FINGER SHORTBREAD COOKIES.png" },
  { id: 434, name: "DJ Football", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Football Markup.png" },
  { id: 435, name: "DJ Glucose", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Glucose Markup.png" },
  { id: 436, name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Milk Cookies.png" },
  { id: 437, name: "DJ Milk Plus", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Milk Plus Markup.png" },
  { id: 438, name: "DJ Nice", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Nice Markup.png" },
  { id: 439, name: "DJ Original Shortbread", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ ORIGINAL SHORTBREAD.png" },
  { id: 440, name: "DJ Pistachio Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ PISTACHIO COOKIES.png" },
  { id: 441, name: "DJ Short Bread", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ SHORT BREAD COOKIES.png" },
  { id: 442, name: "DJ Superb Cookies", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ SUPERB COOKIES.jpeg" },
  { id: 443, name: "DJ Wafers Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Wafers Chocolate.png" },
  { id: 444, name: "DJ Wafers Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Wafers Strawberry.png" },
  { id: 445, name: "DJ Wafers Vanilla", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/DJ Wafers Vanilla.png" },
  { id: 446, name: "Maravila Chocolate", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Maravila ChocolatevMarkup.png" },
  { id: 447, name: "Maravila Orange", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Maravila Orange Markup.png" },
  { id: 448, name: "Maravila Strawberry", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Maravila StrawberryMarkup.png" },
  { id: 449, name: "Maravilha Vanilla", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Maravilha Vanilla Markup.png" },
  { id: 450, name: "Maravilha Combine", category: "Cookies & Biscuits", image: "/Category/Bicsuits and Wafers/Maravilha combine markup.png" },
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
        // User requested to use ONLY products from the category folders (fallback)
        setProducts(staticProductsFallback);
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
                    "w-24 h-24 md:w-32 md:h-32 mb-6 rounded-[2rem] flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
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
  
          {/* Products Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-12 h-12 text-[#ff5c8a] animate-spin" />
                <p className="text-pink-500 font-bold uppercase tracking-widest text-xs">{t("loadingProducts") || "Fetching Product Catalog..."}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product: any) => (
                  <motion.div 
                    key={product.id}
                    layout
                    onClick={() => setDetailProduct(product)}
                    className="group relative bg-white border-2 border-transparent rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_60px_rgba(0,0,0,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                  >
                    <div className="aspect-square w-full bg-white flex items-center justify-center p-6 relative overflow-hidden">
                      <motion.img 
                        src={product.image || product.mainImage || "/TREE-INDIA-LOGO-CDR.jpg"} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center bg-gradient-to-b from-white to-slate-50 border-t border-slate-50">
                      <h3 className="text-lg font-black text-[#014995] uppercase tracking-tighter group-hover:text-[#ff5c8a] transition-colors heading-font leading-tight">{product.name}</h3>
                    </div>
                  </motion.div>
                ))}
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
                <div className={cn("w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white h-full overflow-y-auto", isRTL && "text-right")}>
                  <div className="mb-10">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 font-black tracking-[0.2em] text-[11px] uppercase mb-6 shadow-sm">{getTranslatedCategory(detailProduct.category)}</span>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#014995] uppercase tracking-tighter leading-[0.9] md:leading-[0.85] heading-font drop-shadow-sm">{detailProduct.name}</h2>
                  </div>
                  
                  <div className="flex flex-col gap-4 mt-auto">
                    <Link 
                      href={`https://wa.me/919924403330?text=${encodeURIComponent(`Hello, I am interested in ${detailProduct.name} ${detailProduct.specs || ""}. Can you provide more details?`)}`}
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
