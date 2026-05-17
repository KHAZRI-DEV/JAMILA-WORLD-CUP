import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { Calendar } from "lucide-react";

// Target: Morocco's next match — June 14, 2026 at 18:00 UTC
const TARGET = new Date("2026-06-14T18:00:00Z").getTime();

const labelMap = {
  fr: { title: "Prochain match du Maroc dans", date: "14 juin 2026 · Coup d'envoi", d: "Jours", h: "Heures", m: "Minutes", s: "Secondes", cta: "Découvrir l'expérience" },
  en: { title: "Next Morocco match in", date: "June 14, 2026 · Kickoff", d: "Days", h: "Hours", m: "Minutes", s: "Seconds", cta: "Discover the experience" },
  ar: { title: "مباراة المغرب القادمة في", date: "14 يونيو 2026 · صافرة البداية", d: "أيام", h: "ساعات", m: "دقائق", s: "ثوان", cta: "اكتشف التجربة" },
};

export const Countdown = () => {
  const { locale } = useI18n();
  const L = labelMap[locale] || labelMap.fr;
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const parts = [
    { n: days, l: L.d },
    { n: hours, l: L.h },
    { n: mins, l: L.m },
    { n: secs, l: L.s },
  ];

  return (
    <section data-testid="countdown-section" className="relative py-24 bg-gradient-to-b from-black via-[#13050a] to-black overflow-hidden grain">
      <div className="smoke-blob w-[500px] h-[500px] bg-[#D91C5C] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-30 rounded-md" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#D4AF37]/40 bg-[#D4AF37]/5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">Match Day</span>
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tighter leading-tight ${locale === "ar" ? "font-arabic" : ""}`}>
            {L.title}
          </h2>
          <div className="text-sm md:text-base tracking-[0.2em] text-white/50 uppercase pt-1">{L.date}</div>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto" dir="ltr">
          {parts.map((p, i) => (
            <motion.div
              key={p.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative border border-white/10 bg-white/5 backdrop-blur-md px-2 md:px-6 py-6 md:py-8"
              data-testid={`countdown-${p.l}`}
            >
              <div className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter bg-gradient-to-b from-white to-[#FF1F75] bg-clip-text text-transparent leading-none">
                {String(p.n).padStart(2, "0")}
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-white/60 uppercase mt-3">{p.l}</div>
            </motion.div>
          ))}
        </div>

        <a
          href="#edition"
          data-testid="countdown-cta"
          className="inline-flex items-center gap-3 bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-8 py-5 transition-all shimmer rounded-md"
        >
          {L.cta}
        </a>
      </div>
    </section>
  );
};
