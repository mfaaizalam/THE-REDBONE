// src/components/Menu.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext"; // ← read from context

const MENU_ITEMS = [
  { id: 1, name: "Pulled Pork Sandwich", description: "12-hour smoked pulled pork with tangy slaw on brioche", price: 16.99, category: "sandwiches", image: "/menu-pulled-pork.jpg", badge: "SANDWICHES" },
  { id: 2, name: "BBQ Glazed Ribs", description: "Fall-off-the-bone baby back ribs with house BBQ glaze", price: 28.99, category: "signature", image: "/menu-ribs.jpg", badge: "SIGNATURE" },
  { id: 3, name: "Smoked Whole Chicken", description: "Herb-brined whole chicken slow-smoked over hickory", price: 24.99, category: "signature", image: "/menu-chicken.jpg", badge: "SIGNATURE" },
  { id: 4, name: "Brisket Burnt Ends", description: "Caramelized beef brisket cubes with pickles & toast", price: 22.99, category: "signature", image: "/menu-brisket.jpg", badge: "SIGNATURE" },
  { id: 5, name: "Smoked Lamb Chops", description: "Premium lamb chops with rosemary and garlic", price: 34.99, category: "premium", image: "/menu-lamb.jpg", badge: "PREMIUM" },
  { id: 6, name: "Smoky Mac & Cheese", description: "Cast-iron baked mac with smoked gouda & brisket bits", price: 12.99, category: "sides", image: "/menu-mac.jpg", badge: "SIDES" },
  { id: 7, name: "Smoked Turkey Leg", description: "Giant carnival-style turkey leg, smoked low and slow", price: 18.99, category: "signature", image: "/menu-turkey.jpg", badge: "SIGNATURE" },
  { id: 8, name: "BBQ Bacon Burger", description: "Double smash patty with crispy bacon and BBQ aioli", price: 19.99, category: "sandwiches", image: "/menu-burger.jpg", badge: "SANDWICHES" },
  { id: 9, name: "Wagyu Tomahawk", description: "40oz bone-in wagyu ribeye, aged 28 days, fire-finished", price: 89.99, category: "premium", image: "/menu-wagyu.jpg", badge: "PREMIUM" },
];

const FILTERS = ["ALL", "SIGNATURE", "SANDWICHES", "PREMIUM", "SIDES"];

export default function MenuPage() {
  const { addToCart, cartItems } = useCart(); // ← no more props needed
  const [active, setActive] = useState("ALL");
  const [added,  setAdded]  = useState(null);
  const [imgErr, setImgErr] = useState({});

  const filtered = active === "ALL" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active.toLowerCase());

  const handleAdd = (item) => {
    addToCart(item);
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <>
    <section id="menu">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" />

      <div className="min-h-screen pt-[88px]" style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0e05 0%, #0e0704 45%, #080402 100%)" }}>
        <div className="max-w-[1100px] mx-auto px-8 py-16">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[5px] uppercase mb-3" style={{ color: "#c8793a", fontFamily: "'Cinzel', serif" }}>
              Crafted with Fire
            </p>
            <h1 className="text-[52px] italic font-bold leading-tight mb-3" style={{ color: "#d4895a", fontFamily: "'Playfair Display', serif" }}>
              Our Menu
            </h1>
            <div className="mx-auto h-[2px] w-12 rounded-full" style={{ background: "linear-gradient(90deg, #c0392b, #e07b2a)" }} />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-5 py-2 text-[11px] font-semibold tracking-[2.5px] uppercase border transition-all duration-200 cursor-pointer rounded-[3px]
                  ${active === f ? "text-white border-transparent" : "bg-transparent border-stone-600/50 text-stone-400 hover:border-orange-700/50 hover:text-stone-200"}`}
                style={{ fontFamily: "'Cinzel', serif", ...(active === f && { background: "linear-gradient(135deg, #d4622a, #c0392b)" }) }}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const inCart = cartItems.find((c) => c.id === item.id);
              return (
                <div key={item.id}
                  className="group flex flex-col overflow-hidden border border-white/[0.06] rounded-[6px] transition-all duration-300 hover:-translate-y-1 hover:border-red-900/30"
                  style={{ background: "#160e08", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>

                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    {!imgErr[item.id] ? (
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        onError={() => setImgErr((p) => ({ ...p, [item.id]: true }))} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#1c0c04,#2a1208,#0d0704)" }}>
                        <span className="text-6xl opacity-20">🍖</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #160e08 0%, transparent 55%)" }} />
                    <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-[2px] uppercase px-2.5 py-1 rounded-sm border"
                      style={{ fontFamily: "'Cinzel', serif", background: "rgba(10,6,3,0.72)", backdropFilter: "blur(6px)", color: "#c8a96e", borderColor: "rgba(200,169,110,0.25)" }}>
                      {item.badge}
                    </span>
                    {inCart && (
                      <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-700 text-white text-[10px] font-bold flex items-center justify-center">
                        {inCart.qty}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[16px] font-bold leading-snug text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.name}
                      </h3>
                      <span className="text-[15px] font-bold flex-shrink-0" style={{ color: "#d4622a", fontFamily: "'Cinzel', serif" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed mb-5 flex-1" style={{ color: "#6b5040", fontFamily: "'Lato', sans-serif" }}>
                      {item.description}
                    </p>

                    <button onClick={() => handleAdd(item)}
                      className={`w-full py-[11px] rounded-[3px] text-[10px] font-bold tracking-[3px] uppercase
                        border flex items-center justify-center gap-2 cursor-pointer transition-all duration-300
                        ${added === item.id ? "border-transparent text-white" : "bg-transparent text-red-600 hover:text-white hover:border-transparent"}`}
                      style={{
                        fontFamily: "'Cinzel', serif",
                        ...(added === item.id
                          ? { background: "linear-gradient(135deg,#27ae60,#2ecc71)", boxShadow: "0 4px 16px rgba(39,174,96,0.3)" }
                          : { borderColor: "rgba(192,57,43,0.4)" }),
                      }}
                      onMouseEnter={(e) => { if (added !== item.id) { e.currentTarget.style.background = "linear-gradient(135deg,#c0392b,#e07b2a)"; e.currentTarget.style.borderColor = "transparent"; }}}
                      onMouseLeave={(e) => { if (added !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.4)"; }}}
                    >
                      {added === item.id ? (
                        <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Added!</>
                      ) : (
                        <><span className="text-[16px] leading-none font-light">+</span>{inCart ? `Add More (${inCart.qty})` : "Add to Cart"}</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toast */}
        {added && (
          <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-md border"
            style={{ background: "#120c06", borderColor: "rgba(192,57,43,0.35)", boxShadow: "0 12px 40px rgba(0,0,0,0.55)" }}>
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[11px] tracking-[2px] uppercase text-stone-200" style={{ fontFamily: "'Cinzel', serif" }}>Added to cart</span>
            <span className="px-2 py-0.5 rounded text-xs font-bold text-red-400 bg-red-950/60">{totalItems}</span>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
