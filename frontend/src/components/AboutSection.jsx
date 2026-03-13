import { useState } from "react";

export default function AboutSection() {
  const [imgErr, setImgErr] = useState(false);

  const features = [
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      title: "Open Flame Cooking",
      desc:  "Every cut kissed by real fire for unmatched flavor",
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      ),
      title: "12-Hour Slow Smoke",
      desc:  "Patience is our secret ingredient — low and slow",
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Award Winning",
      desc:  "Recognized by food critics and meat lovers alike",
    },
  ];

  return (
    <section id="about">
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" />

      <section
        className="w-full py-20 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0e05 0%, #0e0704 45%, #080402 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Image with badge ── */}
          <div className="relative flex-shrink-0">
            {/* Main image */}
            <div className="relative rounded-lg overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.7)" }}>
              {!imgErr ? (
                <img
                  src="/about-restaurant.jpg"
                  alt="The Redbone restaurant interior"
                  className="w-full h-[420px] object-cover"
                  onError={() => setImgErr(true)}
                />
              ) : (
                /* Fallback placeholder */
                <div
                  className="w-full h-[420px] flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #2a1208, #1a0c06, #0d0704)" }}
                >
                  <span className="text-8xl opacity-20">🍖</span>
                </div>
              )}
              {/* Subtle dark overlay on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* "15+ Years of Fire" badge — bottom right */}
            <div
              className="absolute bottom-6 right-6 px-6 py-4 rounded-md text-white text-center"
              style={{ background: "linear-gradient(135deg, #d4622a, #c0392b)", boxShadow: "0 8px 32px rgba(192,57,43,0.5)" }}
            >
              <p
                className="text-3xl font-black leading-none mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                15<span className="text-xl align-top mt-1 inline-block">+</span>
              </p>
              <p
                className="text-[10px] font-bold tracking-[3px] uppercase opacity-90"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Years of Fire
              </p>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <p
              className="text-[11px] font-semibold tracking-[5px] uppercase"
              style={{ color: "#c8793a", fontFamily: "'Cinzel', serif" }}
            >
              Our Story
            </p>

            {/* Heading */}
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#e8e0d0" }}
            >
              Born From{" "}
              <span style={{ color: "#d4622a", fontStyle: "italic" }}>Fire &amp; Passion</span>
            </h2>

            {/* Body text */}
            <div className="space-y-4">
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#8a7a6a", fontFamily: "'Lato', sans-serif" }}
              >
                The Redbone started as a dream around a backyard smoker in 2009. What began as
                weekend cookouts for friends and family grew into a full-blown obsession with
                perfecting the art of slow-smoked, fire-kissed meats. Every cut is hand-selected,
                dry-rubbed with our signature blend of 14 spices, and smoked over a mix of hickory
                and oak for up to 16 hours.
              </p>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#8a7a6a", fontFamily: "'Lato', sans-serif" }}
              >
                We believe great BBQ is more than food — it's a gathering, a tradition, a
                soul-warming experience. At The Redbone, we honor that tradition every single day.
              </p>
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-4 mt-2">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  {/* Icon box */}
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-md flex items-center justify-center"
                    style={{ background: "#1e1008", border: "1px solid rgba(212,98,42,0.25)", color: "#d4622a" }}
                  >
                    {f.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <p
                      className="text-[15px] font-bold text-stone-100 mb-0.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {f.title}
                    </p>
                    <p
                      className="text-[13px]"
                      style={{ color: "#6b5e4e", fontFamily: "'Lato', sans-serif" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
    </section>
  );
  
}