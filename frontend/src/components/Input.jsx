// src/components/Input.jsx
import React from "react";

export default function Input({ label, field, placeholder, required: req, half, type = "text", form, handleChange, errors }) {
  return (
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

      {errors[field] && (
        <p className="text-red-500 text-[10px] tracking-wide">{errors[field]}</p>
      )}
    </div>
  );
}