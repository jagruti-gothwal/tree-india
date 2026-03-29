import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Factory } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#001A33] border-t-8 border-[#D4AF37] font-sans text-gray-300">
      
      {/* Top Footer Banner */}
      <div className="bg-[#003366] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
             <ShieldCheck className="w-12 h-12 text-[#D4AF37] opacity-90" strokeWidth={1.5} />
             <div>
               <h3 className="text-lg font-bold uppercase tracking-widest text-[#D4AF37]">ISO Compliant</h3>
               <p className="font-medium max-w-sm text-gray-200">International Quality Processing</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
             <Factory className="w-12 h-12 text-[#D4AF37] opacity-90" strokeWidth={1.5} />
             <div>
               <h3 className="text-lg font-bold uppercase tracking-widest text-[#D4AF37]">Bulk Export</h3>
               <p className="font-medium max-w-sm text-gray-200">Volume Scale Delivery Solutions</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
             <Globe className="w-12 h-12 text-[#D4AF37] opacity-90" strokeWidth={1.5} />
             <div>
               <h3 className="text-lg font-bold uppercase tracking-widest text-[#D4AF37]">Global Chain</h3>
               <p className="font-medium max-w-sm text-gray-200">Active Supply in 15+ Regions</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-12 pl-4">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-4">
            <div className="bg-white p-6 inline-block mb-8 border border-gray-200 shadow-md">
              <img src="/TREE-INDIA-LOGO-CDR.jpg" alt="Tree India Logo" className="h-40 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-400 font-bold leading-relaxed max-w-xs uppercase tracking-widest">
              Confectionery Manufacturer & Export House
            </p>
            <p className="mt-4 text-xs text-gray-500 font-medium leading-relaxed max-w-xs uppercase">
              Executing mass-scale B2B supply chains for biscut and candy operations worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-4 border-[#D4AF37] pl-3">Organization</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Corporate Profile</Link></li>
              <li><Link href="/export" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Global Reach</Link></li>
              <li><Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Master Catalogue</Link></li>
              <li><Link href="/contact" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Trade Inquiry</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-4 border-[#D4AF37] pl-3">Commodities</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Biscuits & Cookies</Link></li>
              <li><Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Candies & Toffees</Link></li>
              <li><Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Lollipops Series</Link></li>
              <li><Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Bubble Gum Units</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-3">
             <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-4 border-[#D4AF37] pl-3">Communications</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest leading-loose text-left">Navi Mumbai, <br />Maharashtra, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:tree.india@yahoo.com" className="text-xs font-bold text-gray-300 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">Tree.India@yahoo.com</a>
              </li>
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">www.treeindia.net</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#003366] mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">&copy; {new Date().getFullYear()} Tree India. Authorized Export Division.</p>
          <div className="flex space-x-8">
             <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Legal Notice</Link>
             <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
