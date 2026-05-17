import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { QrCode, Trophy } from "lucide-react";

const STADIUM_QR = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/oy8dcj13_4706d7be-a4b2-4f3e-a690-c9933aa253f6.png";
const CUP_FLOAT = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/9r2fj0yr_e07ae7a0-1604-4c43-8c7b-787878b869ce.png";
const CUP_TOP = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/fu1pusvr_7ffd2ac4-660d-4b97-9438-11cfa6405b5f.png";

export const Edition = () => {
  const { t, locale } = useI18n();
  const cups = [CUP_FLOAT, CUP_TOP, CUP_FLOAT];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % cups.length), 2400);
    return () => clearInterval(id);
  }, [paused, cups.length]);

  return (
    <section
      id="edition"
      data-testid="edition-section"
      className="relative py-32 md:py-44 bg-gradient-to-b from-black via-[#1a0510] to-black overflow-hidden grain"
    >
      <div className="absolute inset-0">
        <img src={STADIUM_QR} alt="" className="absolute right-0 top-0 h-full opacity-30 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#D4AF37]/50 bg-[#D4AF37]/5">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.edition.eyebrow}</span>
          </div>

          <h2 className={`font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] ${locale === "ar" ? "font-arabic" : ""}`}>
            <span className="block text-white">World Cup</span>
            <span className="block bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#D4AF37] bg-clip-text text-transparent">2026</span>
            <span className="block text-white/70 text-3xl md:text-4xl mt-2">Morocco Edition</span>
          </h2>

          <p className={`max-w-lg text-white/70 text-base md:text-lg ${locale === "ar" ? "font-arabic-body" : ""}`}>
            {t.edition.desc}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 max-w-md pt-4">
            {[
              { k: "Foil", v: locale === "ar" ? "ذهب لامع" : "Metallic Gold" },
              { k: "Lion", v: locale === "ar" ? "زئير الأطلس" : "Atlas Roar" },
              { k: "Pattern", v: "Zellige × 2026" },
              { k: "Drop", v: locale === "ar" ? "محدود" : "Limited" },
            ].map((s) => (
              <div key={s.k} className="border-t border-white/10 pt-3">
                <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase">{s.k}</div>
                <div className="text-sm text-white font-bold mt-1">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#footer"
              data-testid="edition-cta"
              className="inline-flex items-center gap-3 bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-8 py-5 transition-all shimmer"
            >
              <QrCode className="w-4 h-4" />
              {t.edition.cta}
            </a>
            <div className="text-xs text-white/50 max-w-[200px]">{t.edition.stock}</div>
          </div>
        </motion.div>

        {/* Rotating packshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="lg:col-span-6 relative h-[600px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-testid="rotating-packshot"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-full bg-gradient-conic from-[#D91C5C] via-[#D4AF37] to-[#006233] blur-3xl opacity-50 animate-spin-slow" style={{ animation: "spin 20s linear infinite" }} />
          </div>
          <motion.img
            key={idx}
            initial={{ opacity: 0, rotateY: 45 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={cups[idx]}
            alt="Limited cup"
            className="relative z-10 max-h-[520px] drop-shadow-[0_40px_80px_rgba(217,28,92,0.6)]"
          />
          {/* Floating badges */}
          <div className="absolute top-12 right-12 glass px-3 py-2 z-20">
            <div className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Édition · 2026</div>
          </div>
          <div className="absolute bottom-12 left-12 glass px-3 py-2 z-20">
            <div className="text-[10px] tracking-[0.25em] text-white uppercase font-bold">QR · Scan & Unlock</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
