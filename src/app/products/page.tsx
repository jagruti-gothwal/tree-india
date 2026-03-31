"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, PackageSearch, X, ShoppingCart, Info, Globe, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["All", "Cookies & Biscuits", "Wafers", "Candies & Toffees", "Lollipops", "Bubble Gum"];

const productsData = [
  // Lollipops
  { 
    id: 1, name: "Baba Lovely Pop", category: "Lollipops", mainImage: "/BABA LOVELY POP BLUEBERRY MARKUP.png", 
    variants: [
      { name: "Blueberry", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png" },
      { name: "Guava", image: "/BABA LOVELY POP GUAVA MARKUP.png" },
      { name: "Mango", image: "/BABA LOVELY POP MANGO MARKUP.png" },
      { name: "Orange", image: "/BABA LOVELY POP ORANGE MARKUP.png" },
      { name: "Watermelon", image: "/BABA LOVELY POP WATERMELON MARKUP.png" },
      { name: "Strawberry", image: "/BABA LOVELY POP STRAWBERRY MARKUP.png" }
    ],
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 2, name: "DJ Milk Pop", category: "Lollipops", mainImage: "/DJ Milk Pop Markup.png", 
    specs: "15g x 48 pieces per packet", price: "Export Grade" 
  },
  { 
    id: 3, name: "DJ Fruitoo Lollipops", category: "Lollipops", mainImage: "/DJ Fruitoo lollipops markup.png", 
    specs: "10g x 100 pieces per jar", price: "Export Grade" 
  },
  { 
    id: 4, name: "DJ Yogurt Pop", category: "Lollipops", mainImage: "/DJ Yogurt Pop Lollipop Markup.png", 
    specs: "12g x 50 pieces per packet", price: "Export Grade" 
  },

  // Cookies & Biscuits
  { 
    id: 10, name: "DJ Cremo Series", category: "Cookies & Biscuits", mainImage: "/DJ CREMO COMBINE.png", 
    variants: [
      { name: "Chocolate", image: "/DJ CREMO CHOCOLATE Markup.png" },
      { name: "Mango", image: "/DJ CREMO MANGO markup.png" },
      { name: "Orange", image: "/DJ CREMO ORANGE Markup.png" },
      { name: "Pineapple", image: "/DJ CREMO PINEAPPLE Markup.png" },
      { name: "Strawberry", image: "/DJ CREMO STRAWBERRY MARKUP.png" },
      { name: "Vanilla", image: "/DJ CREMO VANILLA Markup.png" }
    ],
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 11, name: "DJ American Biscuits", category: "Cookies & Biscuits", mainImage: "/DJ American Biscuits Markup Combine.png", 
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 12, name: "DJ Creamy Topper", category: "Cookies & Biscuits", mainImage: "/DJ Creamy Topper Combine.png", 
    variants: [
      { name: "Chocolate", image: "/DJ Creamy topper Chocolate Markup.png" },
      { name: "Mango", image: "/DJ Creamy topper Mango Markup.png" },
      { name: "Orange", image: "/DJ Creamy topper Orange Markup.png" },
      { name: "Strawberry", image: "/DJ Creamy topper Strawberry Markup.png" }
    ],
    specs: "24g x 24 packets per carton", price: "Export Grade" 
  },
  { 
    id: 13, name: "DJ Milk Cookies", category: "Cookies & Biscuits", mainImage: "/DJ Milk Cookies.png", 
    specs: "Rich milk flavor biscuits", price: "Export Grade" 
  },
  { 
    id: 18, name: "DJ Superb Plus", category: "Cookies & Biscuits", mainImage: "/DJ Superb Plus Cookies.png", 
    specs: "The ultimate export-quality biscuit", price: "Export Grade" 
  },

  // Wafers
  { 
    id: 30, name: "Maravilha Wafers", category: "Wafers", mainImage: "/Maravilha combine markup.png", 
    variants: [
      { name: "Chocolate", image: "/Maravila ChocolatevMarkup.png" },
      { name: "Orange", image: "/Maravila Orange Markup.png" },
      { name: "Strawberry", image: "/Maravila StrawberryMarkup.png" },
      { name: "Vanilla", image: "/Maravilha Vanilla Markup.png" }
    ],
    specs: "Double cream layer wafers in 24g packets", price: "Export Grade" 
  },

  // Candies & Toffees
  { 
    id: 40, name: "DJ Choco Eclairs", category: "Candies & Toffees", mainImage: "/DJ Choco Eclairs Jar Markup.png", 
    specs: "150 pieces per jar, 12 jars per carton", price: "Export Grade" 
  },
  { 
    id: 43, name: "Tick Tick Series", category: "Candies & Toffees", mainImage: "/TICK TICK FRUITY MILKY.png", 
    variants: [
      { name: "Fruity Milky", image: "/TICK TICK FRUITY MILKY.png" },
      { name: "Lemon", image: "/TICK TICK LEMON.png" },
      { name: "Lychee", image: "/TICK TICK LYCHEE.png" },
      { name: "Menthol", image: "/TICK TICK MENTHOL.png" },
      { name: "Peanut", image: "/TICK TICK PEANUT.png" },
      { name: "Tamarind", image: "/TICK TICK TAMARIND.png" }
    ],
    specs: "100 pieces per packet, 50 packets per carton", price: "Export Grade" 
  },

  // Bubble Gum
  { 
    id: 60, name: "DJ Olivary Gum", category: "Bubble Gum", mainImage: "/DJ OLIVARY Bubblegum Markup.png", 
    specs: "Long-lasting flavor bubble gum", price: "Export Grade" 
  },
  { 
    id: 61, name: "DJ Gum Pops", category: "Bubble Gum", mainImage: "/DJ Gum Pops Markup.png", 
    specs: "Bubble gum filled centers", price: "Export Grade" 
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [detailProduct, setDetailProduct] = useState<any>(null);

  const filteredProducts = activeCategory === "All" 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  const toggleProductSelection = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedProductIds((prev) => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-40 pb-40 bg-[#f8fafc] min-h-screen relative overflow-hidden">
      
      {/* Background Shapes (Bakewell Style) */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-white rounded-full -translate-y-1/2 translate-x-1/4 shadow-[0_0_100px_rgba(0,0,0,0.02)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-[#003366] font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">World Class Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-10">
            Export <span className="text-[#003366]">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto">
            Explore our curated catalog of confectionery items manufactured for international markets.
          </p>
        </div>

        {/* Categories (Dukes style pills) */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map((cat) => {
             const isActive = activeCategory === cat;
             return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border",
                  isActive ? "bg-[#003366] text-white border-[#003366] shadow-xl" : "bg-white text-slate-500 border-slate-200 hover:border-[#003366] hover:text-[#003366]"
                )}
              >
                {cat}
              </button>
             )
          })}
        </div>

        {/* Products Grid (Bakewell clean white on light gray) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
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
                    "absolute top-4 right-4 w-8 h-8 rounded-full border flex items-center justify-center z-20 transition-all",
                    isSelected ? "bg-[#003366] border-[#003366] text-white" : "bg-white border-slate-200 text-slate-300 hover:border-[#003366] hover:text-[#003366]"
                  )}
                >
                  <Check className="w-4 h-4" strokeWidth={4} />
                </button>
                
                <div className="aspect-square w-full bg-white flex items-center justify-center p-8 relative overflow-hidden">
                  <motion.img 
                    src={product.mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-8 text-center bg-slate-50/50">
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#003366] transition-colors">{product.name}</h3>
                </div>
              </motion.div>
            )
          })}
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
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 bg-slate-50 p-12 flex flex-col items-center justify-center">
                <img src={detailProduct.mainImage} alt={detailProduct.name} className="max-h-full max-w-full object-contain filter drop-shadow-xl" />
                
                {detailProduct.variants && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {detailProduct.variants.map((v: any, i: number) => (
                      <img key={i} src={v.image} className="w-12 h-12 object-contain p-1 bg-white rounded-lg border border-slate-200" title={v.name} />
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <span className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">{detailProduct.category}</span>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-[1] mb-8">{detailProduct.name}</h2>
                
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-heading">Specifications</h4>
                    <p className="text-lg font-bold text-[#003366]">{detailProduct.specs}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-heading">Supply Type</h4>
                    <p className="text-lg font-bold text-[#003366]">Bulk Export / Retail Packaging</p>
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
                    {selectedProductIds.includes(detailProduct.id) ? "Deselect Product" : "Add to Multi-Inquiry"}
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
               <div className="bg-[#003366] rounded-full shadow-2xl p-2 pl-8 flex items-center gap-8">
                  <div className="flex items-center gap-4">
                     <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#003366] font-black text-xs">
                        {selectedProductIds.length}
                     </span>
                     <span className="text-white font-bold text-[10px] tracking-widest uppercase hidden sm:block">
                        Products Selected
                     </span>
                  </div>
                  
                  <Link
                     href={`/contact?items=${selectedProductIds.join(",")}`}
                     className="bg-amber-500 text-white hover:bg-amber-600 px-10 h-14 flex items-center gap-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all"
                  >
                     Bulk Export Inquiry <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
