import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n";
import { ArrowDown, PlayCircle } from "lucide-react";

const CUP = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/9r2fj0yr_e07ae7a0-1604-4c43-8c7b-787878b869ce.png";
const BG = "/hero-generated.png";

export const Hero = () => {
  const { t, locale } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const cupRotate = useTransform(scrollYProgress, [0, 1], [-2, 12]);
  const cupScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full overflow-hidden bg-black grain"
    >
      {/* Background — Hassan II / stadium double exposure */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={BG}
          alt=""
          className="w-full h-[120%] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
      </motion.div>

      {/* Magenta smoke blobs */}
      <div className="smoke-blob w-[600px] h-[600px] bg-[#D91C5C] top-[-100px] left-[-150px]" />
      <div className="smoke-blob w-[500px] h-[500px] bg-[#006233] bottom-[-100px] right-[-100px] opacity-30" />
      <div className="smoke-blob w-[300px] h-[300px] bg-[#FF1F75] top-1/3 right-1/4 opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-20 min-h-[100vh] grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Headlines */}
        <motion.div style={{ opacity: fade }} className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-[#D4AF37]/40 bg-[#D4AF37]/5 backdrop-blur-sm"
            data-testid="hero-eyebrow"
          >
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full pulse-magenta" />
            <span className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.hero.eyebrow}</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-title-ar"
              className="font-arabic font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95]"
              dir="rtl"
            >
              {t.hero.titleAr}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              data-testid="hero-title-fr"
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter"
            >
              <span className="block text-white/40">{locale === "fr" ? "Du Maroc" : locale === "en" ? "From Morocco" : "From Morocco"}</span>
              <span className="block">
                {locale === "fr" ? "au " : locale === "en" ? "to the " : "to the "}
                <span className="bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#D4AF37] bg-clip-text text-transparent">
                  {locale === "fr" ? "Monde" : "World"}
                </span>
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            data-testid="hero-sub"
            className={`max-w-xl text-white/70 text-lg md:text-xl leading-relaxed ${locale === "ar" ? "font-arabic-body" : "font-body"}`}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#edition"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-3 bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-8 py-5 transition-all shimmer"
            >
              {t.hero.cta}
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#journey"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-3 text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span className="text-sm tracking-wide">{t.hero.secondary}</span>
            </a>
          </motion.div>

          {/* Knockout stat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-8 flex items-end gap-6"
          >
            <div className="font-display font-black text-7xl md:text-8xl lg:text-9xl leading-none knockout tracking-tighter">
              2026
            </div>
            <div className="pb-4 space-y-1">
              <div className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">FIFA</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">World Cup</div>
              <div className="text-xs text-white/40">USA · CAN · MEX</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Floating cup */}
        <motion.div
          style={{ y: cupY, rotate: cupRotate, scale: cupScale }}
          className="lg:col-span-5 relative h-[420px] sm:h-[520px] lg:h-[680px] flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#D91C5C]/40 to-[#B91C1C]/20 blur-3xl" />
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src={CUP}
            alt="Raibi Jamila World Cup 2026 cup"
            data-testid="hero-cup"
            className="relative z-10 max-h-full max-w-full object-contain float-cup drop-shadow-[0_30px_60px_rgba(217,28,92,0.5)]"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};
