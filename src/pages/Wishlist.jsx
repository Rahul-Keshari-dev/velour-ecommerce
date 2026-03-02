import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-fadeUp">
        <Heart size={64} className="text-gray-800 mb-6" />
        <h2 className="font-display text-3xl font-bold text-white mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Save items you love to buy them later.
        </p>
        <Link to="/" className="btn-gold py-3 px-8 text-base">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-10 animate-fadeUp">
      <h1 className="font-display text-3xl font-bold text-white mb-2">
        My Wishlist
      </h1>
      <p className="text-gray-500 mb-8">
        {wishlist.length} saved item{wishlist.length > 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
