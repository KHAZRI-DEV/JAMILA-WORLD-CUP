import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n";
import { Sparkles, Flame, Award } from "lucide-react";

const SPLASH = "https://customer-assets.emergentagent.com/job_85733746-01b2-41a6-ae32-f15e344a54cc/artifacts/toue4pvu_ChatGPT%20Image%2017%20mai%202026%2C%2000_46_18.png";
const CUP = "https://customer-assets.emergentagent.com/job_85733746-01b2-41a6-ae32-f15e344a54cc/artifacts/o7ealwlk_ChatGPT%20Image%2017%20mai%202026%2C%2000_43_43.png";

export const Saveur = () => {
  const { t, locale } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const splashRot = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const icons = [Flame, Sparkles, Award];

  return (
    <section
      id="flavor"
      ref={ref}
      data-testid="saveur-section"
      className="relative py-32 md:py-44 bg-gradient-to-b from-[#0A0A0A] via-[#15050C] to-[#0A0A0A] overflow-hidden grain"
    >
      {/* Floating splash bg */}
      <motion.img
        style={{ rotate: splashRot }}
        src={SPLASH}
        alt=""
        className="absolute -right-20 top-20 w-[500px] opacity-30 pointer-events-none"
      />
      <div className="smoke-blob w-[600px] h-[600px] bg-[#D91C5C] -left-40 top-1/2 opacity-30" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left: Cup + callouts */}
        <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">
          <motion.div style={{ rotate: tilt }} className="relative">
            <div className="absolute inset-0 bg-[#D91C5C]/40 blur-[120px]" />
            <img src={CUP} alt="cup macro" className="relative w-72 md:w-96 drop-shadow-[0_40px_80px_rgba(217,28,92,0.6)]" />
          </motion.div>

          {/* Callouts */}
          <div className="absolute inset-0 pointer-events-none">
            {t.flavor.callouts.map((c, i) => {
              const Icon = icons[i];
              const positions = [
                { top: "10%", left: "5%" },
                { top: "45%", right: "5%" },
                { bottom: "10%", left: "10%" },
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
                  style={positions[i]}
                  className="absolute pointer-events-auto"
                  data-testid={`saveur-callout-${i}`}
                >
                  <div className="glass px-4 py-3 max-w-[240px]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#D91C5C] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold text-white leading-tight ${locale === "ar" ? "font-arabic" : "font-display"}`}>{c.t}</div>
                        <div className={`text-xs text-white/60 mt-1 leading-relaxed ${locale === "ar" ? "font-arabic-body" : ""}`}>{c.d}</div>
                      </div>
                    </div>
                  </div>
                  {/* Connecting dot */}
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 pulse-magenta" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.flavor.eyebrow}</div>
          <h2 className={`font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] ${locale === "ar" ? "font-arabic" : ""}`}>
            {t.flavor.title}
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <div className="flex items-end gap-6">
            <div className="font-display font-black text-7xl md:text-8xl bg-gradient-to-b from-[#D4AF37] to-[#D91C5C] bg-clip-text text-transparent leading-none">
              1966
            </div>
            <div className="pb-3 text-xs text-white/60 uppercase tracking-wider max-w-[180px]">
              {locale === "ar" ? "أكثر من ٦ عقود من الأصالة المغربية" : locale === "en" ? "Six decades of Moroccan authenticity" : "Six décennies d'authenticité marocaine"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
