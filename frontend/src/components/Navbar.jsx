// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, updateQty } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const navLinks = [
    { label: "HOME", href: "home" },
    { label: "MENU", href: "menu" },
    { label: "ABOUT", href: "about" },
   
  ];

  // ─── Cart Sidebar ─────────────────────────────
  const CartSidebar = ({ open, onClose }) => {
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = +(subtotal * 0.16).toFixed(2);
    const delivery = cartItems.length > 0 ? 5.0 : 0;
    const grand = +(subtotal + tax + delivery).toFixed(2);

    return (
      <>
        <div
          onClick={onClose}
          className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        />
        <aside
          className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col w-96 max-w-full
            bg-stone-950 border-l border-stone-800
            transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${open ? "translate-x-0" : "translate-x-full"}`}
          style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.8)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-900">
            <h2 className="text-sm font-bold tracking-[4px] text-stone-100 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Your <span className="text-red-700">Cart</span>
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-stone-800 text-stone-500 flex items-center justify-center
                transition-all duration-300 hover:border-red-700 hover:text-red-600 hover:rotate-90 bg-transparent cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-stone-600 text-center">
                <span className="text-5xl opacity-30">🔥</span>
                <p className="text-sm tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>Your cart is cold.</p>
                <p className="text-xs tracking-[3px] uppercase text-stone-700">Add something smoky</p>
              </div>
            ) : (
              <div className="space-y-0">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-stone-900">
                    {/* Image */}
                    <div className="w-14 h-14 flex-shrink-0 rounded-lg border border-stone-800 overflow-hidden bg-stone-900 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">🍖</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-stone-100 mb-0.5 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-600 mb-3 truncate">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-stone-800 rounded-md overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 bg-stone-900 text-stone-400 flex items-center justify-center text-base
                              transition-colors hover:bg-red-700 hover:text-white cursor-pointer border-none"
                          >−</button>
                          <span className="w-7 h-7 flex items-center justify-center bg-stone-950 text-stone-100 text-xs font-bold">
                            {item.qty}
                          </span>
                          <button onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 bg-stone-900 text-stone-400 flex items-center justify-center text-base
                              transition-colors hover:bg-red-700 hover:text-white cursor-pointer border-none"
                          >+</button>
                        </div>
                        <span className="text-sm font-bold text-red-600" style={{ fontFamily: "'Cinzel', serif" }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Order Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-900 px-6 pt-4 pb-6 bg-stone-950/90">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-stone-500">
                  <span className="tracking-[2px] uppercase">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span className="tracking-[2px] uppercase">Tax 16%</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span className="tracking-[2px] uppercase">Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>
                <div className="h-px bg-stone-800 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-[3px] uppercase text-stone-300" style={{ fontFamily: "'Cinzel', serif" }}>Grand Total</span>
                  <span className="text-lg font-bold text-stone-100" style={{ fontFamily: "'Cinzel', serif" }}>${grand}</span>
                </div>
              </div>

              {/* ✅ Link instead of <a> — no page reload, cart state preserved */}
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-sm bg-red-700 text-white text-xs font-bold tracking-[4px] uppercase transition-all duration-300 hover:bg-red-800 hover:-translate-y-0.5 no-underline"
                style={{ fontFamily: "'Cinzel', serif", boxShadow: "0 4px 20px rgba(185,28,28,0.4)" }}
              >
                Proceed to Checkout
              </Link>
              <button onClick={onClose} className="mt-3 w-full text-center text-xs tracking-[3px] text-stone-700 uppercase transition-colors hover:text-stone-400 bg-transparent border-none cursor-pointer">
                ← Continue browsing
              </button>
            </div>
          )}
        </aside>
      </>
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-red-900/20 transition-all duration-300
        ${scrolled ? "bg-stone-950/97 shadow-[0_2px_30px_rgba(0,0,0,0.6)]" : "bg-stone-950/90"}`}>
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
<Link to="/" className="flex items-center flex-shrink-0 no-underline">
  <img
    src="/redbone-logo.png"
    alt="The Redbone"
    className="h-28 w-auto object-contain"
  />
</Link>



          {/* Links & Cart */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
onClick={() => {
  const section = document.getElementById(link.href);

  if (section) {
    window.scrollTo({
      top: section.offsetTop - 72,
      behavior: "smooth",
    });
  } else {
    window.location.href = "/#" + link.href;
  }
}}
                  className="relative text-[11px] font-semibold tracking-[3px] text-stone-300 pb-1 transition-colors duration-300 hover:text-white no-underline bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button onClick={() => setCartOpen(true)} className="relative p-2 text-stone-300 hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;