import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  MapPin,
  CreditCard,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CheckCircle },
];

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    clearCart();
    setStep(3);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag size={64} className="text-gray-800 mb-4" />
        <h2 className="font-display text-2xl text-white mb-4">
          Your cart is empty
        </h2>
        <Link to="/" className="btn-gold">
          Go Shopping
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-scaleIn">
        <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="font-display text-4xl font-bold text-white mb-3">
          Order Placed!
        </h2>
        <p className="text-gray-400 mb-2">
          Thank you for shopping with Velour.
        </p>
        <p className="text-sm text-gray-600 mb-8">
          A confirmation has been sent to {form.email}
        </p>
        <div className="flex gap-3">
          <Link to="/" className="btn-gold py-3 px-8">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn-outline py-3 px-8">
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-10 animate-fadeUp">
      <h1 className="font-display text-3xl font-bold text-white mb-8">
        Checkout
      </h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
              ${
                step > s.id
                  ? "bg-green-400/10 text-green-400 border border-green-400/20"
                  : step === s.id
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                    : "bg-[#1a1a1a] text-gray-600 border border-[#222]"
              }`}
            >
              <s.icon size={13} />
              {s.label}
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight size={14} className="text-gray-700" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white mb-2">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name</label>
                  <input
                    className="input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    className="input"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="label">Street Address</label>
                <input
                  className="input"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">City</label>
                  <input
                    className="input"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="label">ZIP Code</label>
                  <input
                    className="input"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="10001"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={
                  !form.name ||
                  !form.email ||
                  !form.address ||
                  !form.city ||
                  !form.zip
                }
                className="btn-gold w-full justify-center py-3 mt-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
              >
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white mb-2">
                Payment Details
              </h2>
              <p className="text-xs text-gray-500 bg-yellow-400/5 border border-yellow-400/20 rounded-lg px-3 py-2">
                🔒 This is a demo. Don't enter real card details.
              </p>
              <div>
                <label className="label">Card Number</label>
                <input
                  className="input"
                  name="card"
                  value={form.card}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Expiry Date</label>
                  <input
                    className="input"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY"
                    maxLength={7}
                  />
                </div>
                <div>
                  <label className="label">CVV</label>
                  <input
                    className="input"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline py-3 px-5 rounded-xl"
                >
                  <ArrowLeft size={15} /> Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!form.card || !form.expiry || !form.cvv}
                  className="btn-gold flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
                >
                  Place Order <CheckCircle size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="card p-5 h-fit sticky top-24">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Order Summary
          </h3>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0 p-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 flex-1 line-clamp-2">
                  {item.title}
                </p>
                <span className="text-xs font-semibold text-white shrink-0">
                  ×{item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#222] pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-400" : ""}>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-[#222]">
              <span className="text-white">Total</span>
              <span className="text-yellow-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
