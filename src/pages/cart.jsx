import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  ArrowRight,
} from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-fadeUp">
        <ShoppingBag size={64} className="text-gray-800 mb-6" />
        <h2 className="font-display text-3xl font-bold text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/" className="btn-gold py-3 px-8 text-base">
          Start Shopping
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-10 animate-fadeUp">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-white">
          Shopping Cart
          <span className="text-gray-600 text-xl font-normal ml-3">
            ({cart.length} item{cart.length > 1 ? "s" : ""})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-xs text-red-400/70 hover:text-red-400 transition-colors border border-transparent hover:border-red-400/20 px-3 py-1.5 rounded-lg"
        >
          <Trash2 size={13} /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="card flex gap-5 p-4 sm:p-5">
              <Link
                to={`/product/${item.id}`}
                className="shrink-0 bg-white/5 rounded-xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain hover:scale-110 transition-transform"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium text-gray-200 line-clamp-2 hover:text-yellow-400 transition-colors mb-1">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-gray-600 capitalize mb-3">
                  {item.category}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Quantity control */}
                  <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-white min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-200">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-green-400" : "text-gray-200"
                  }
                >
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (8%)</span>
                <span className="text-gray-200">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#222] pt-3 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-yellow-400 text-lg">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-gray-500 bg-[#1a1a1a] rounded-lg px-3 py-2 mb-4 text-center">
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping 🚚
              </p>
            )}

            {/* Promo code */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="input py-2 text-xs rounded-lg pl-8"
                />
              </div>
              <button className="btn-outline py-2 px-3 text-xs rounded-lg">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="btn-gold w-full justify-center py-3.5 text-base rounded-xl"
            >
              Checkout <ArrowRight size={16} />
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-yellow-400 transition-colors mt-4"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
