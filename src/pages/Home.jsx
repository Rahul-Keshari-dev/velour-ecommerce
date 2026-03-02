import api from "../api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

// Hero image cards — uses real products passed from parent
function HeroShowcase({ products }) {
  // wait until we have at least 3 products from the API
  if (!products || products.length < 3) {
    return (
      <div className="relative hidden lg:flex items-center justify-center h-full">
        <div className="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="flex flex-col gap-3 z-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-3 flex items-center gap-3 w-52 animate-pulse"
            >
              <div className="w-12 h-12 bg-[#222] rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-2 bg-[#222] rounded w-1/2" />
                <div className="h-3 bg-[#222] rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // pick 3 specific products that look good — jacket, bracelet, shirt
  const showcaseItems = [
    { product: products[3], tag: "Trending", tagColor: "text-yellow-400" },
    { product: products[11], tag: "Luxury", tagColor: "text-yellow-400" },
    { product: products[1], tag: "New", tagColor: "text-green-400" },
  ];

  return (
    <div className="relative hidden lg:flex items-center justify-center h-full">
      {/* Glow blob behind cards */}
      <div className="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

      {/* Three floating cards */}
      <div className="relative flex flex-col gap-3 z-10">
        {/* Top card — offset left */}
        <div
          className="self-start ml-4 bg-[#161616] border border-[#2a2a2a] rounded-2xl p-3 flex items-center gap-3 w-62 shadow-2xl"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <div className="w-15 h-15 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5">
            <img
              src={showcaseItems[0].product.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${showcaseItems[0].tagColor}`}
            >
              {showcaseItems[0].tag}
            </span>
            <p className="text-xs text-white font-medium leading-tight truncate">
              {showcaseItems[0].product.title.slice(0, 22)}...
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              ${showcaseItems[0].product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Middle card — larger, centered */}
        <div
          className="bg-[#161616] border border-yellow-400/20 rounded-2xl p-4 flex items-center gap-4 w-70 shadow-2xl"
          style={{ animation: "float 4s ease-in-out infinite 0.8s" }}
        >
          <div className="w-15 h-15 bg-white rounded-xl flex items-center justify-center shrink-0 p-2">
            <img
              src={showcaseItems[1].product.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${showcaseItems[1].tagColor}`}
            >
              {showcaseItems[1].tag}
            </span>
            <p className="text-xs text-white font-medium leading-tight truncate">
              {showcaseItems[1].product.title.slice(0, 22)}...
            </p>
            <p className="text-sm font-bold text-yellow-400 mt-0.5">
              ${showcaseItems[1].product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Bottom card — offset right */}
        <div
          className="self-end mr-4 bg-[#161616] border border-[#2a2a2a] rounded-2xl p-3 flex items-center gap-3 w-62 shadow-2xl"
          style={{ animation: "float 4s ease-in-out infinite 1.6s" }}
        >
          <div className="w-15 h-15 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5">
            <img
              src={showcaseItems[2].product.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${showcaseItems[2].tagColor}`}
            >
              {showcaseItems[2].tag}
            </span>
            <p className="text-xs text-white font-medium leading-tight truncate">
              {showcaseItems[2].product.title.slice(0, 22)}...
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              ${showcaseItems[2].product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Stats pill */}
        <div
          className="self-center bg-[#0f0f0f] border border-[#222] rounded-full px-4 py-2 flex items-center gap-3"
          style={{ animation: "float 4s ease-in-out infinite 0.6s" }}
        >
          <div className="flex -space-x-2">
            {["#f87171", "#fb923c", "#facc15"].map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0f0f0f]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">
            <span className="text-white font-semibold">12k+</span> happy
            customers
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating")
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      return 0;
    });

  return (
    <div className="min-h-screen animate-fadeUp">
      {/*  Hero Banner  */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#111] via-[#0d0d0d] to-[#080808] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-105">
          {/* Left — text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-3 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.15em]">
                New Season Arrivals
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5">
              Discover Your{" "}
              <span className="text-yellow-400 relative">
                Perfect
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400/30 rounded-full" />
              </span>{" "}
              Style
            </h1>

            <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
              Shop the latest trends in electronics, fashion, and jewelry.
              Premium quality, unbeatable prices.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => setActiveCategory("All")}
                className="btn-gold text-base py-3 px-7"
              >
                Shop Now
              </button>
              <button
                onClick={() => setActiveCategory("electronics")}
                className="btn-outline text-base py-3 px-7"
              >
                Electronics →
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: "500+", label: "Products" },
                { value: "12k+", label: "Customers" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating product cards using real API data */}
          <HeroShowcase products={products} />
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-yellow-400/4 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-75 h-75 bg-yellow-400/3 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* ── Category + Sort bar ── */}
      <section className="sticky top-16 z-30 bg-[#080808]/90 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto">
          <SlidersHorizontal size={15} className="text-gray-600 shrink-0" />
          <div className="flex items-center gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
                  uppercase tracking-wider transition-all duration-200
                  ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-[#1a1a1a] text-gray-500 hover:text-gray-200 border border-[#2a2a2a] hover:border-[#333]"
                  }`}
              >
                {cat === "All" ? "All Products" : cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400
                text-xs rounded-lg pl-3 pr-7 py-2 outline-none cursor-pointer
                hover:border-yellow-400/40 transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {searchQuery && (
          <p className="text-gray-500 text-sm mb-6">
            Results for{" "}
            <span className="text-yellow-400 font-semibold">
              "{searchQuery}"
            </span>{" "}
            — {filteredProducts.length} found
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-52 bg-[#1e1e1e]" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-[#1e1e1e] rounded w-3/4" />
                  <div className="h-3 bg-[#1e1e1e] rounded w-1/2" />
                  <div className="h-8 bg-[#1e1e1e] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="font-display text-2xl text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try a different search or category
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="btn-gold"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                style={{ animationDelay: `${i * 40}ms` }}
                className="animate-fadeUp"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
