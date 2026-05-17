import React, { useState, useEffect } from "react";
import { useI18n } from "../i18n";
import { motion } from "framer-motion";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
];

export const Header = () => {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-header"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-2xl bg-black/60 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" data-testid="logo" className="flex items-center gap-3 group">
          <img
            src="https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/sq9r3n38_71ee3f5d-17b7-4128-867b-c73f9f495b26.png"
            alt="Raibi Jamila"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_6px_20px_rgba(217,28,92,0.7)] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="leading-none">
            <div className="font-display font-black text-white text-base tracking-tight">Raibi Jamila</div>
            <div className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase">World Cup 2026</div>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: "journey", k: "journey" },
            { id: "flavor", k: "flavor" },
            { id: "roar", k: "roar" },
            { id: "edition", k: "edition" },
          ].map((it) => (
            <a
              key={it.id}
              data-testid={`nav-${it.id}`}
              href={`#${it.id}`}
              className="text-sm tracking-wide text-white/70 hover:text-white transition-colors uppercase font-medium"
            >
              {t.nav[it.k]}
            </a>
          ))}
        </nav>

        {/* Lang switcher + CTA */}
        <div className="flex items-center gap-4">
          <div data-testid="lang-switcher" className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                data-testid={`lang-${l.code}`}
                onClick={() => setLocale(l.code)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  locale === l.code ? "bg-[#D91C5C] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            href="#footer"
            data-testid="header-cta"
            className="hidden sm:inline-block bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-xs tracking-[0.15em] uppercase px-5 py-3 transition-colors shimmer"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </motion.header>
  );
};
