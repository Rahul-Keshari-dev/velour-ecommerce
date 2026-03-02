import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  LogOut,
  Package,
  Settings,
  ChevronDown,
  Zap,
} from "lucide-react";

export default function Navbar({ onLoginClick }) {
  const { cartCount, wishlist, user, logout } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 border-b border-[#1a1a1a]
      ${scrolled ? "bg-[#080808]/95 backdrop-blur-xl shadow-xl" : "bg-[#080808]/80 backdrop-blur-md"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 mr-2 group"
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
            <Zap size={16} className="text-gray-900" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-bold text-white tracking-tight">
            Velour
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search products, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] border border-[#2a2a2a] text-gray-200
              pl-10 pr-4 py-2 rounded-full text-sm outline-none
              focus:border-yellow-400/60 focus:bg-[#1e1e1e] transition-all duration-200
              placeholder-gray-600"
          />
        </form>

        {/* Icons */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors group"
            title="Wishlist"
          >
            <Heart
              size={20}
              className="text-gray-400 group-hover:text-red-400 transition-colors"
            />
            {wishlist.length > 0 && (
              <span className="badge-dot absolute -top-0.5 -right-0.5 text-[10px] min-w-4 h-4">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors group"
            title="Cart"
          >
            <ShoppingBag
              size={20}
              className="text-gray-400 group-hover:text-yellow-400 transition-colors"
            />
            {cartCount > 0 && (
              <span className="badge-dot absolute -top-0.5 -right-0.5 text-[10px] min-w-4 h-4">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <div ref={menuRef} className="relative ml-1">
            {user ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222]
                    border border-[#2a2a2a] hover:border-[#333]
                    rounded-full pl-1.5 pr-3 py-1.5 transition-all duration-200"
                >
                  <span className="w-7 h-7 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.name[0].toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-gray-200 hidden sm:block">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-[calc(100%+8px)] bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl w-52 animate-scaleIn">
                    <div className="px-4 py-3 border-b border-[#222]">
                      <p className="font-semibold text-sm text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1.5">
                      {[
                        { label: "My Orders", icon: Package, path: "/orders" },
                        { label: "Wishlist", icon: Heart, path: "/wishlist" },
                        {
                          label: "Settings",
                          icon: Settings,
                          path: "/settings",
                        },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
                        >
                          <item.icon size={15} />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors mt-1 border-t border-[#222] pt-3"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 btn-gold py-2 px-4 text-sm rounded-full"
              >
                <User size={15} /> Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
