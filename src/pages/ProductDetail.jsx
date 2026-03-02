import api from "../api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
} from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={
            i < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-700"
          }
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = product ? isWishlisted(product.id) : false;

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        api
          .get(`/products/category/${encodeURIComponent(res.data.category)}`)
          .then((catRes) =>
            setRelated(
              catRes.data.filter((p) => p.id !== res.data.id).slice(0, 4),
            ),
          );
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: qty });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-96 bg-[#181818] rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-[#181818] rounded w-1/4" />
            <div className="h-8 bg-[#181818] rounded w-3/4" />
            <div className="h-4 bg-[#181818] rounded w-full" />
            <div className="h-4 bg-[#181818] rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen animate-fadeUp">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="capitalize">{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-gray-400 truncate max-w-xs">
            {product.title}
          </span>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="card bg-white/5 flex items-center justify-center p-12 h-105">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-[0.15em] mb-3">
              {product.category}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <Stars rating={product.rating?.rate || 4} />
              <span className="text-sm text-gray-400">
                {product.rating?.rate}/5
              </span>
              <span className="text-xs text-gray-600 bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                {product.rating?.count} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-[#1e1e1e]">
              <span className="text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-400 ml-3 bg-green-400/10 px-2.5 py-1 rounded-full">
                ✓ In Stock
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Qty
              </label>
              <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-white min-w-10 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2.5 hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleAddToCart}
                className="btn-gold flex-1 justify-center py-3 text-base rounded-xl"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all duration-200
                  ${
                    wishlisted
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "bg-[#1a1a1a] border-[#2a2a2a] text-gray-500 hover:text-red-400 hover:border-red-400/30"
                  }`}
              >
                <Heart size={18} className={wishlisted ? "fill-red-400" : ""} />
              </button>
            </div>

            <Link
              to="/cart"
              onClick={handleAddToCart}
              className="btn-outline w-full justify-center py-3 text-base rounded-xl"
            >
              Buy Now →
            </Link>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t border-[#1e1e1e]">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "Easy Returns" },
                { icon: Shield, label: "Secure Payment" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-gray-500"
                >
                  <Icon size={13} className="text-yellow-400/60" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
