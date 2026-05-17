import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n";

const SPLIT_BG =
  "https://static.prod-images.emergentagent.com/jobs/85733746-01b2-41a6-ae32-f15e344a54cc/images/d32349be37a418db724935df0860a58e3192329cc3350fe120a5dee318551d87.png";

const CUP =
  "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/fu1pusvr_7ffd2ac4-660d-4b97-9438-11cfa6405b5f.png";

const CounterNumber = ({ target = 8000 }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let animationFrame;
    const start = 0;
    const duration = 2000;
    const t0 = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setVal(Math.floor(start + eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target]);

  return (
    <span
      data-testid="distance-counter"
      className="font-display font-black tracking-tighter leading-none"
    >
      {val.toLocaleString("en-US")}
    </span>
  );
};

export const Journey = () => {
  const { t, locale } = useI18n();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      id="journey"
      ref={ref}
      data-testid="journey-section"
      className="relative h-[280vh] bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={SPLIT_BG}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>

        {/* Title block */}
        <div className="absolute top-12 left-0 right-0 z-20 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-3">
                {t.journey.eyebrow}
              </div>

              <h2
                className={`font-display font-black text-4xl md:text-6xl tracking-tighter leading-none max-w-2xl ${
                  locale === "ar" ? "font-arabic" : ""
                }`}
              >
                {t.journey.title}
              </h2>
            </div>

            <div className="text-right">
              <div className="text-7xl md:text-9xl bg-gradient-to-r from-[#D91C5C] to-[#D4AF37] bg-clip-text text-transparent">
                <CounterNumber target={8000} />
              </div>

              <div className="text-xs tracking-[0.3em] text-white/60 uppercase mt-2">
                {t.journey.distance}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll content */}
        <motion.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 px-12 will-change-transform"
        >
          {/* Morocco panels */}
          <Panel
            label={t.journey.morocco}
            color="#D91C5C"
            city="Marrakech"
            img="https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/479dslj6_pexels-meriem-a-2149355236-30682505.jpg"
            tag="Koutoubia · golden hour"
          />

          <Panel
            label={t.journey.morocco}
            color="#D91C5C"
            city="Casablanca"
            img="https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/0ev18d1h_pexels-rahib-oussama-2147578878-29735561.jpg"
            tag="Casa-Anfa skyline"
          />

          <Panel
            label={t.journey.morocco}
            color="#D91C5C"
            city="Rabat"
            img="https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/2opv7q65_pexels-reda-captures-1210576448-30460910.jpg"
            tag="Tour Mohammed VI"
          />

          {/* Center cup */}
          <div className="flex-shrink-0 w-[400px] md:w-[520px] flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D91C5C] to-[#006233] blur-3xl opacity-50" />
              <img
                src={CUP}
                alt="cup"
                className="relative w-72 md:w-96 float-cup drop-shadow-[0_30px_60px_rgba(217,28,92,0.7)]"
              />
            </div>
          </div>

          {/* USA panels */}
          <Panel
            label={t.journey.usa}
            color="#006233"
            city="New York"
            img="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
            tag="MetLife Stadium"
          />

          <Panel
            label={t.journey.usa}
            color="#006233"
            city="Los Angeles"
            img="https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?w=800&q=80"
            tag="SoFi · floodlights"
          />

          <Panel
            label={t.journey.usa}
            color="#006233"
            city="Dallas"
            img="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80"
            tag="AT&T Stadium"
          />
        </motion.div>

        {/* Caption */}
        <div className="absolute bottom-10 left-0 right-0 text-center z-20 px-6">
          <p
            className={`text-white/70 text-base md:text-lg max-w-xl mx-auto ${
              locale === "ar"
                ? "font-arabic-body"
                : "font-editorial italic"
            }`}
          >
            "{t.journey.caption}"
          </p>
        </div>
      </div>
    </section>
  );
};

const Panel = ({ label, color, city, img, tag }) => (
  <div
    className="flex-shrink-0 w-[320px] md:w-[420px] h-[420px] md:h-[520px] relative overflow-hidden group"
    data-testid={`journey-panel-${city}`}
  >
    <img
      src={img}
      alt={city}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

    {/* Top: City name BIG + small label underneath */}
    <div className="absolute top-5 left-5 right-5">
      <div
        className="font-display font-black text-4xl md:text-5xl tracking-tighter leading-none uppercase text-white"
        style={{
          textShadow:
            "0 4px 20px rgba(0,0,0,0.85), 0 0 30px rgba(217,28,92,0.5)",
        }}
      >
        {city}
      </div>

      <div
        className="mt-2 inline-block px-2 py-1 border"
        style={{ borderColor: color, color }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold">
          {label}
        </span>
      </div>
    </div>

    {/* Bottom: caption tag */}
    <div className="absolute bottom-6 left-6 right-6">
      <div
        className="text-sm text-white font-bold uppercase tracking-[0.2em]"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
      >
        {tag}
      </div>
    </div>
  </div>
);
