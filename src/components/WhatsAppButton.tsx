import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello Tree India. I'm interested in your products.");
  const phone = "919408436732"; // Official Tree India Commercial Number

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform transform hover:-translate-y-1 hover:scale-110 shadow-green-500/30"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white fill-current" />
      </Link>
    </div>
  );
}
