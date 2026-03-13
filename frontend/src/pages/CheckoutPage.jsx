// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const TAX_RATE = 0.16;
const DELIVERY = 5.00;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const subtotal   = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax        = +(subtotal * TAX_RATE).toFixed(2);
  const grandTotal = +(subtotal + tax + DELIVERY).toFixed(2);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    city: "",
    area: "",
    address: "",
    landmark: "",
    deliveryInstructions: "",
    paymentMethod: "cash",
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [placed,  setPlaced]  = useState(false);

  const required = ["customerName", "phone", "address", "city"];

  const validate = () => {
    const e = {};
    required.forEach((f) => { if (!form[f].trim()) e[f] = "Required"; });
    if (form.phone && !/^03\d{9}$/.test(form.phone)) e.phone = "Format: 03xx-xxxxxxx";
    return e;
  };

  const handleChange = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    const payload = {
      items: cartItems.map((i) => ({
        productId: i.id,
        name:      i.name,
        quantity:  i.qty,
        price:     i.price,
      })),
      customerName: form.customerName,
      phone:        form.phone,
      email:        form.email,
      city:         form.city,
      area:         form.area,
      address:      form.address,
      landmark:     form.landmark,
      totalPrice:   grandTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (res.ok) {
        setPlaced(true);
        clearCart?.();
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0e05 0%, #0e0704 45%, #080402 100%)" }}
      >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cinzel:wght@400;600;700&display=swap" />
        <div className="text-6xl mb-6">🔥</div>
        <h2 className="text-3xl font-bold italic mb-3" style={{ color: "#d4895a", fontFamily: "'Playfair Display', serif" }}>
          Order Placed!
        </h2>
        <p className="text-stone-500 tracking-[3px] text-xs uppercase mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
          Your smoky feast is on its way
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-red-700 text-white text-xs font-bold tracking-[4px] uppercase rounded-sm hover:bg-red-800 transition-colors cursor-pointer border-none"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const Input = ({ label, field, placeholder, required: req, half, type = "text" }) => (
    <div className={`flex flex-col gap-1.5 ${half ? "" : "col-span-2"}`}>
      <label className="text-xs tracking-[2px] uppercase text-stone-400 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
        {label}
        {req && <span className="text-red-500 text-[10px]">*Required</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full px-4 py-3 bg-stone-900/60 border rounded-sm text-sm text-stone-200
          placeholder-stone-700 outline-none transition-all duration-200
          focus:border-red-700/60 focus:bg-stone-900
          ${errors[field] ? "border-red-600" : "border-stone-800"}`}
        style={{ fontFamily: "'Lato', sans-serif" }}
      />
      {errors[field] && <p className="text-red-500 text-[10px] tracking-wide">{errors[field]}</p>}
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" />
      <div
        className="min-h-screen pt-[88px] pb-16"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0e05 0%, #0e0704 45%, #080402 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="mb-10">
            <p className="text-[11px] tracking-[5px] uppercase mb-1" style={{ color: "#c8793a", fontFamily: "'Cinzel', serif" }}>
              Final Step
            </p>
            <h1 className="text-4xl italic font-bold mb-1" style={{ color: "#d4895a", fontFamily: "'Playfair Display', serif" }}>
              Checkout 🔥
            </h1>
            <p className="text-stone-600 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
              This is a <span className="text-amber-600 font-semibold">Delivery Order</span> — just a last step, please enter your details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* LEFT: Form */}
            <div className="rounded-md border border-white/[0.06] p-6 md:p-8" style={{ background: "#160e08", boxShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
              <h3 className="text-xs font-bold tracking-[3px] uppercase text-stone-400 mb-5 pb-3 border-b border-stone-900" style={{ fontFamily: "'Cinzel', serif" }}>
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Input label="Full Name"   field="customerName"   placeholder="Full Name"      req half />
                <Input label="Mobile"      field="phone"          placeholder="03xx-xxxxxxx"   req half />
                <Input label="Alt. Mobile" field="alternatePhone" placeholder="03xx-xxxxxxx"      half />
                <Input label="Email"       field="email"          placeholder="your@email.com"    half type="email" />
              </div>

              <h3 className="text-xs font-bold tracking-[3px] uppercase text-stone-400 mb-5 pb-3 border-b border-stone-900" style={{ fontFamily: "'Cinzel', serif" }}>
                Delivery Address
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Input label="City" field="city" placeholder="City"            req half />
                <Input label="Area" field="area" placeholder="Area / District"     half />
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs tracking-[2px] uppercase text-stone-400 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    Delivery Address <span className="text-red-500 text-[10px]">*Required</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your complete address"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={`w-full px-4 py-3 bg-stone-900/60 border rounded-sm text-sm text-stone-200
                      placeholder-stone-700 outline-none transition-all focus:border-red-700/60 focus:bg-stone-900
                      ${errors.address ? "border-red-600" : "border-stone-800"}`}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  />
                  {errors.address && <p className="text-red-500 text-[10px]">{errors.address}</p>}
                </div>
                <Input label="Nearest Landmark"      field="landmark"             placeholder="Any famous place nearby"   half />
                <Input label="Delivery Instructions" field="deliveryInstructions" placeholder="Ring bell, leave at door…" half />
              </div>

              <h3 className="text-xs font-bold tracking-[3px] uppercase text-stone-400 mb-5 pb-3 border-b border-stone-900" style={{ fontFamily: "'Cinzel', serif" }}>
                Payment Method
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "cash", label: "Cash on Delivery", icon: "💵" },
                  
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleChange("paymentMethod", opt.value)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-sm border transition-all duration-200 cursor-pointer min-w-[160px]
                      ${form.paymentMethod === opt.value
                        ? "border-red-700 bg-red-950/30 text-stone-100"
                        : "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600"}`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-xs font-semibold tracking-[1px] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="flex flex-col gap-4">
              <div className="rounded-md border border-white/[0.06] p-6" style={{ background: "#160e08", boxShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
                <h3 className="text-xs font-bold tracking-[3px] uppercase text-stone-400 mb-4 pb-3 border-b border-stone-900" style={{ fontFamily: "'Cinzel', serif" }}>
                  Your Order
                </h3>
                <div className="space-y-0">
                  {cartItems.length === 0 ? (
                    <p className="text-stone-700 text-xs text-center py-4">No items in cart</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 py-3 border-b border-stone-900/60">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-bold text-red-700 flex-shrink-0" style={{ fontFamily: "'Cinzel', serif" }}>{item.qty}x</span>
                          <span className="text-sm text-stone-300 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-stone-200 flex-shrink-0" style={{ fontFamily: "'Cinzel', serif" }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { label: "Subtotal",     val: `$${subtotal.toFixed(2)}` },
                    { label: "Tax 16%",      val: `$${tax}` },
                    { label: "Delivery Fee", val: `$${DELIVERY.toFixed(2)}` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-xs text-stone-500">
                      <span className="tracking-[1px]" style={{ fontFamily: "'Cinzel', serif" }}>{label}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                  <div className="h-px bg-stone-800 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold tracking-[2px] uppercase text-stone-300" style={{ fontFamily: "'Cinzel', serif" }}>Grand Total</span>
                    <span className="text-xl font-bold" style={{ color: "#d4622a", fontFamily: "'Cinzel', serif" }}>${grandTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-4 rounded-sm text-sm font-bold tracking-[4px] uppercase
                  transition-all duration-300 cursor-pointer border-none
                  ${cartItems.length === 0
                    ? "bg-stone-800 text-stone-600 cursor-not-allowed"
                    : "bg-red-700 text-white hover:bg-red-800 hover:-translate-y-0.5"}`}
                style={{ fontFamily: "'Cinzel', serif", boxShadow: cartItems.length > 0 ? "0 4px 20px rgba(185,28,28,0.4)" : "none" }}
              >
                {loading ? "Placing Order…" : "🔥 Place Order"}
              </button>

              {/* ✅ Link — no page reload */}
              <Link
                to="/"
                className="text-center text-xs tracking-[2px] text-stone-600 uppercase no-underline hover:text-stone-400 transition-colors"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ← Continue to add more items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}