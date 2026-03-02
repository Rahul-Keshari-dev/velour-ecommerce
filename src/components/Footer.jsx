import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
                <Zap size={14} className="text-gray-900" fill="currentColor" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Velour
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your destination for premium products at unbeatable prices.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 rounded-lg bg-[#181818] border border-[#222] text-gray-600 hover:text-white hover:border-[#333] transition-colors"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Shop
            </p>
            <div className="space-y-2.5">
              {[
                "All Products",
                "Electronics",
                "Jewelry",
                "Men's Clothing",
                "Women's Clothing",
              ].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="block text-sm text-gray-600 hover:text-yellow-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Account
            </p>
            <div className="space-y-2.5">
              {[
                { label: "My Cart", path: "/cart" },
                { label: "Wishlist", path: "/wishlist" },
                { label: "My Orders", path: "/orders" },
                { label: "Checkout", path: "/checkout" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm text-gray-600 hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Support
            </p>
            <div className="space-y-2.5">
              {[
                "FAQ",
                "Shipping Policy",
                "Returns",
                "Contact Us",
                "Privacy Policy",
              ].map((item) => (
                <span
                  key={item}
                  className="block text-sm text-gray-600 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            © 2026 Velour. Built with React + Tailwind CSS by Rahul.
          </p>
          <div className="flex gap-5">
            {[
              { icon: Shield, label: "Secure Payments" },
              { icon: Truck, label: "Fast Shipping" },
              { icon: RotateCcw, label: "Easy Returns" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-gray-700"
              >
                <Icon size={20} className="text-yellow-400/60" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
