import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const DEMO_ORDERS = [
  {
    id: "ORD-2847",
    date: "Feb 24, 2025",
    status: "Delivered",
    total: 129.99,
    items: ["Fjallraven Backpack", "Mens Cotton Jacket"],
  },
  {
    id: "ORD-2651",
    date: "Jan 15, 2025",
    status: "Shipped",
    total: 59.95,
    items: ["Gold Plated Earring Set"],
  },
  {
    id: "ORD-2340",
    date: "Dec 03, 2024",
    status: "Processing",
    total: 249.0,
    items: ["WD SSD Storage", "USB-C Hub"],
  },
];

const STATUS_CONFIG = {
  Delivered: {
    icon: CheckCircle,
    class: "bg-green-400/10 text-green-400 border-green-400/20",
  },
  Shipped: {
    icon: Truck,
    class: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  },
  Processing: {
    icon: Clock,
    class: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  },
  Cancelled: {
    icon: XCircle,
    class: "bg-red-400/10 text-red-400 border-red-400/20",
  },
};

export default function Orders() {
  const { user } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-fadeUp">
        <Package size={64} className="text-gray-800 mb-6" />
        <h2 className="font-display text-3xl font-bold text-white mb-2">
          Sign in to view orders
        </h2>
        <p className="text-gray-500 mb-8">
          Track your purchases and order history.
        </p>
        <Link to="/" className="btn-gold py-3 px-8">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-10 animate-fadeUp">
      <h1 className="font-display text-3xl font-bold text-white mb-2">
        My Orders
      </h1>
      <p className="text-gray-500 mb-8">{DEMO_ORDERS.length} orders found</p>

      <div className="space-y-4">
        {DEMO_ORDERS.map((order) => {
          const statusCfg = STATUS_CONFIG[order.status];
          return (
            <div key={order.id} className="card p-5 hover:border-[#2a2a2a]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="font-semibold text-white text-sm">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm text-gray-300">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="font-bold text-yellow-400">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${statusCfg.class}`}
                >
                  <statusCfg.icon size={13} />
                  {order.status}
                </span>
              </div>
              <div className="border-t border-[#1e1e1e] pt-3">
                <p className="text-xs text-gray-500 mb-2">Items</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
