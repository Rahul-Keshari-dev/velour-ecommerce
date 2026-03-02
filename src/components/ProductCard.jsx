import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Star } from "lucide-react";

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < full ? "text-yellow-400 fill-yellow-400" : "text-gray-700"}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-white/5">
        <div className="h-52 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#0a0a0a]/80 text-gray-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#2a2a2a] backdrop-blur-sm">
          {product.category}
        </span>
        {/* Wishlist button on hover */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 p-1.5 rounded-full border transition-all duration-200
            ${wishlisted
              ? "bg-red-500/20 border-red-500/40 text-red-400"
              : "bg-[#0a0a0a]/80 border-[#2a2a2a] text-gray-500 opacity-0 group-hover:opacity-100"
            }`}
        >
          <Heart size={14} className={wishlisted ? "fill-red-400" : ""} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-200 leading-snug line-clamp-2 hover:text-yellow-400 transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating?.rate || 4} />
          <span className="text-xs text-gray-600">({product.rating?.count || 0})</span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs px-3 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}