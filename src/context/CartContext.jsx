import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // --- Cart Actions ---
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item,
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });

    // toast OUTSIDE setCart so it only fires once
    toast.success("Added to cart! 🛍️");
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const clearCart = () => setCart([]);

  // --- Wishlist Actions ---
  const toggleWishlist = (product) => {
    let added = false;

    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        added = false;
        return prev.filter((item) => item.id !== product.id);
      }
      added = true;
      return [...prev, product];
    });

    // toast outside setWishlist so it only fires once
    setTimeout(() => {
      if (added) {
        toast.success("Added to wishlist ❤️");
      } else {
        toast.error("Removed from wishlist");
      }
    }, 0);
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  // --- Auth Actions ---
  const login = (userData) => {
    setUser(userData);
    toast.success(`Welcome back, ${userData.name.split(" ")[0]}! 👋`);
  };

  const signup = (userData) => {
    setUser(userData);
    toast.success(
      `Account created! Welcome, ${userData.name.split(" ")[0]}! 🎉`,
    );
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out. See you soon!");
  };

  // --- Computed Values ---
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        user,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
