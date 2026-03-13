import { useState, useEffect } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');

        /* Keyframe animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes smokeRise {
          0%   { opacity: 0; transform: translateY(0) scaleX(1); }
          50%  { opacity: 0.06; }
          100% { opacity: 0; transform: translateY(-120px) scaleX(1.6); }
        }

        .hero-bg {
          animation: scaleIn 1.8s ease forwards;
        }

        .hero-eyebrow {
          animation: fadeUp 0.8s ease 0.3s both;
        }
        .hero-title {
          animation: fadeUp 0.9s ease 0.55s both;
        }
        .hero-tagline {
          animation: fadeUp 0.8s ease 0.8s both;
        }
        .hero-buttons {
          animation: fadeUp 0.8s ease 1.05s both;
        }
        .hero-stats {
          animation: fadeUp 0.8s ease 1.25s both;
        }
        .hero-scroll {
          animation: fadeIn 1s ease 1.6s both;
        }

        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #c8a96e 0%,
            #f0d090 40%,
            #e8b84b 60%,
            #c8a96e 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .smoke-particle {
          position: absolute;
          width: 120px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%);
          filter: blur(20px);
          animation: smokeRise 6s ease-in infinite;
          pointer-events: none;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e07b2a, #c0392b);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(192,57,43,0.55); }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-secondary {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-secondary:hover {
          background: rgba(200,169,110,0.12);
          border-color: #c8a96e;
          transform: translateY(-2px);
        }

        .scroll-indicator {
          animation: scrollBounce 2s ease-in-out infinite;
        }

        .cursor-blink::after {
          content: '|';
          animation: cursorBlink 1s step-end infinite;
          color: #c8a96e;
          margin-left: 2px;
        }

        .stat-divider {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.4), transparent);
        }
      `}</style>

      <section className="relative w-full h-screen min-h-[600px] flex flex-col overflow-hidden bg-stone-950">

        {/* ── Background image ── */}
        <div className="hero-bg absolute inset-0">
          <img
            src="/hero-meat.jpg"
            alt="Premium smoked meat"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer darkening overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/40" />
          {/* Vignette */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
          />
        </div>

        {/* ── Smoke particles ── */}
        <div className="smoke-particle" style={{ left: "45%", bottom: "35%", animationDelay: "0s" }} />
        <div className="smoke-particle" style={{ left: "52%", bottom: "30%", animationDelay: "2s", width: 80 }} />
        <div className="smoke-particle" style={{ left: "48%", bottom: "40%", animationDelay: "4s", width: 60 }} />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center pt-20">

          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-600/70" />
            <p
              className="text-xs font-semibold tracking-[5px] uppercase text-amber-500/90"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Premium Baked Meat Restaurant
            </p>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-600/70" />
          </div>

          {/* Main title */}
          <h1
            className="hero-title mb-4 leading-none select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
<span
  className="block text-[clamp(3.5rem,12vw,9rem)] font-black tracking-tight bg-gradient-to-r from-orange-500 to-red-700 bg-clip-text text-transparent"
>
  THE REDBONE
</span>

          </h1>

          {/* Tagline */}
          <p
            className="hero-tagline cursor-blink text-[clamp(1.2rem,3vw,2rem)] text-stone-200/90 mb-10 font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Fire-Kissed Perfection.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-wrap items-center justify-center gap-4 mb-14">

    <button
    className="btn-primary bg-gradient-to-br from-orange-500 to-red-700 text-white px-8 py-4 rounded-sm"
    style={{ fontFamily: "'Cinzel', serif" }}
    onClick={() => {
      const aboutSection = document.getElementById('menu');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  >
    <span className="text-xs font-semibold tracking-[4px] uppercase">
      View Our Menu
    </span>
  </button>

<div>
  <button
    className="btn-secondary border border-stone-400/40 text-stone-300 px-8 py-4 rounded-sm"
    style={{ fontFamily: "'Cinzel', serif" }}
    onClick={() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  >
    <span className="text-xs font-semibold tracking-[4px] uppercase">
      Our Story
    </span>
  </button>
</div>
          </div>

          {/* Stats */}
          <div className="hero-stats flex items-center gap-8">
            {[
              { num: "12+", label: "Hrs Slow Smoked" },
              { num: "100%", label: "Premium Cuts" },
              { num: "5★", label: "Rated Experience" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className="text-xl font-bold text-amber-400 leading-none mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-[10px] tracking-[2px] uppercase text-stone-500"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                    {stat.label}
                  </p>
                </div>
                {i < 2 && <div className="stat-divider" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="hero-scroll relative z-10 flex flex-col items-center pb-8 gap-2">
          <div className="scroll-indicator w-6 h-9 rounded-full border border-stone-500/50 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-amber-500/80" />
          </div>
          <p className="text-[9px] tracking-[3px] text-stone-600 uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Scroll
          </p>
        </div>

        {/* ── Bottom decorative line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-800/40 to-transparent" />
      </section>
    </>
  );
}