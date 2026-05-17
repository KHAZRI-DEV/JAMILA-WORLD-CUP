import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useI18n } from "../i18n";

const LOGO = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/sq9r3n38_71ee3f5d-17b7-4128-867b-c73f9f495b26.png";
const VIDEO = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/9wxbn53f_animate_this_image_202605171321.mp4";

// Whitelist of names accepted for the demo
const ALLOWED = ["MOHAMED"];

const dict = {
  fr: {
    back: "Retour",
    eyebrow: "Fan Zone · Scan & Unlock",
    title: "Vibre avec Jamila",
    sub: "Entre ton prénom, scelle-le sur le maillot et fais rugir le stade. Ton nom voyage de Casablanca à l'Amérique.",
    placeholder: "Ton prénom",
    cta: "Vibrer avec Jamila",
    loading: "Connexion au stade…",
    notAllowed: "Pour cette démo, seul le prénom MOHAMED est accepté. D'autres prénoms seront ajoutés bientôt.",
    yourName: "Ton nom dans le stade",
    again: "Refaire",
    share: "Partager",
    bar: ["Authentification", "Préparation du stade", "Activation du rugissement"],
  },
  en: {
    back: "Back",
    eyebrow: "Fan Zone · Scan & Unlock",
    title: "Vibe with Jamila",
    sub: "Drop your first name, seal it on the jersey and make the stadium roar. Your name travels from Casablanca to America.",
    placeholder: "Your first name",
    cta: "Vibe with Jamila",
    loading: "Connecting to the stadium…",
    notAllowed: "For this demo, only the first name MOHAMED is accepted. More names will be added soon.",
    yourName: "Your name in the stadium",
    again: "Try again",
    share: "Share",
    bar: ["Auth", "Stadium prep", "Roar activation"],
  },
  ar: {
    back: "رجوع",
    eyebrow: "منطقة المشجعين · امسح وافتح",
    title: "اهتز مع جميلة",
    sub: "ضع اسمك، اطبعه على القميص واجعل الملعب يزأر. اسمك يسافر من الدار البيضاء إلى أمريكا.",
    placeholder: "اسمك الأول",
    cta: "اهتز مع جميلة",
    loading: "الاتصال بالملعب…",
    notAllowed: "في هذا العرض التجريبي، يُقبل اسم MOHAMED فقط. المزيد من الأسماء قريباً.",
    yourName: "اسمك في الملعب",
    again: "إعادة",
    share: "مشاركة",
    bar: ["مصادقة", "تجهيز الملعب", "تفعيل الزئير"],
  },
};

export const FanScan = () => {
  const { locale } = useI18n();
  const t = dict[locale] || dict.fr;
  const navigate = useNavigate();

  const [step, setStep] = useState("input"); // input | loading | video
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (step !== "loading") return;
    setProgress(0);
    const start = Date.now();
    const total = 2200;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / total);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
      else setStep("video");
    };
    requestAnimationFrame(tick);
  }, [step]);

  const submit = (e) => {
    e.preventDefault();
    const clean = name.trim().toUpperCase();
    if (!clean) return;
    if (!ALLOWED.includes(clean)) {
      setError(t.notAllowed);
      return;
    }
    setError("");
    setName(clean);
    setStep("loading");
  };

  const reset = () => {
    setStep("input");
    setName("");
    setError("");
    setProgress(0);
  };

  const displayName = name || "MOHAMED";

  return (
    <main data-testid="fanscan-page" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient blobs */}
      <div className="smoke-blob w-[600px] h-[600px] bg-[#D91C5C] -top-32 -left-32 opacity-40" />
      <div className="smoke-blob w-[500px] h-[500px] bg-[#006233] -bottom-32 -right-32 opacity-25" />
      <div className="smoke-blob w-[400px] h-[400px] bg-[#FF1F75] top-1/3 right-1/4 opacity-25" />

      {/* Top bar */}
      <header className="relative z-30 max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          data-testid="scan-back"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm tracking-wide transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="Raibi Jamila" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_6px_20px_rgba(217,28,92,0.6)]" />
        </Link>
      </header>

      <div className="relative z-20 max-w-[1100px] mx-auto px-6 md:px-12 pb-24">
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.section
              key="input"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pt-12 md:pt-20 space-y-10"
              data-testid="scan-step-input"
            >
              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#D4AF37]/40 bg-[#D4AF37]/5">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full pulse-magenta" />
                  <span className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.eyebrow}</span>
                </div>
                <h1 className={`font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] ${locale === "ar" ? "font-arabic" : ""}`}>
                  <span className="block text-white">{t.title.split(" ")[0]}</span>
                  <span className="block bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#D4AF37] bg-clip-text text-transparent">
                    {t.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
                <p className={`text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed ${locale === "ar" ? "font-arabic-body" : ""}`}>
                  {t.sub}
                </p>
              </div>

              <form onSubmit={submit} className="max-w-2xl space-y-4" dir={locale === "ar" ? "rtl" : "ltr"}>
                <div className="flex flex-col sm:flex-row gap-3 border border-white/15 focus-within:border-[#D91C5C] transition-colors">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder={t.placeholder}
                    data-testid="scan-name-input"
                    autoFocus
                    className="flex-1 bg-transparent px-5 py-5 text-2xl md:text-3xl font-display font-black tracking-tighter text-white placeholder-white/30 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    data-testid="scan-submit"
                    className="bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-8 py-5 transition-all shimmer flex items-center justify-center gap-2"
                  >
                    {t.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-testid="scan-error"
                    className="text-sm text-[#FF1F75] border-l-2 border-[#FF1F75] pl-3"
                  >
                    {error}
                  </motion.div>
                )}
                <div className="text-xs text-white/40 tracking-wider">
                  {locale === "ar" ? "تلميح: جرب " : locale === "en" ? "Tip: try " : "Astuce : essaie "}
                  <button type="button" onClick={() => setName("MOHAMED")} className="text-[#D4AF37] hover:text-white transition-colors font-bold tracking-widest">
                    MOHAMED
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {step === "loading" && (
            <motion.section
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-[70vh] flex flex-col items-center justify-center space-y-10"
              data-testid="scan-step-loading"
            >
              <motion.img
                src={LOGO}
                alt="Jamila"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
                className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_10px_40px_rgba(217,28,92,0.7)]"
              />
              <div className="text-center space-y-3 max-w-md">
                <div className={`font-display font-black text-3xl md:text-4xl tracking-tighter ${locale === "ar" ? "font-arabic" : ""}`}>
                  {t.loading}
                </div>
                <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase">
                  {displayName} · World Cup 2026
                </div>
              </div>
              <div className="w-full max-w-md space-y-3">
                <div className="h-1 bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#D4AF37]"
                    style={{ width: `${progress * 100}%` }}
                    data-testid="loading-bar"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {t.bar.map((b, i) => (
                    <div key={i} className={`${progress > (i + 1) / 3 - 0.1 ? "text-white" : ""}`}>{b}</div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {step === "video" && (
            <motion.section
              key="video"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pt-8 space-y-8"
              data-testid="scan-step-video"
            >
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-2">{t.yourName}</div>
                  <h2 className={`font-display font-black text-5xl md:text-7xl tracking-tighter leading-none ${locale === "ar" ? "font-arabic" : ""}`}>
                    <span className="bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#D4AF37] bg-clip-text text-transparent">
                      {displayName}
                    </span>
                  </h2>
                </div>
                <button
                  onClick={reset}
                  data-testid="scan-reset"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-[#D91C5C] text-white/70 hover:text-white px-5 py-3 text-xs tracking-[0.2em] uppercase font-bold transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> {t.again}
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden border border-[#D91C5C]/30 magenta-glow bg-black">
                <video
                  ref={videoRef}
                  src={VIDEO}
                  autoPlay
                  loop
                  playsInline
                  muted={muted}
                  data-testid="scan-video"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Name overlay — animated banner on the stadium video */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-6 right-6 bottom-6 md:left-12 md:right-12 md:bottom-12 z-10 flex items-end justify-between gap-4"
                >
                  <div className="space-y-2">
                    <motion.div
                      initial={{ letterSpacing: "0.4em", opacity: 0 }}
                      animate={{ letterSpacing: "0em", opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase"
                      style={{ textShadow: "0 4px 30px rgba(217,28,92,0.8), 0 0 60px rgba(255,31,117,0.5)" }}
                    >
                      {displayName.split("").map((ch, i) => (
                        <motion.span
                          key={i}
                          initial={{ y: 80, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.0 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block bg-gradient-to-b from-white via-[#FF1F75] to-[#D4AF37] bg-clip-text text-transparent"
                        >
                          {ch}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.8 }}
                      className="text-xs md:text-sm tracking-[0.35em] text-[#D4AF37] uppercase font-bold"
                    >
                      DIMA MAGHRIB · #14 · WORLD CUP 2026
                    </motion.div>
                  </div>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={LOGO}
                    alt="Jamila"
                    className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_6px_20px_rgba(217,28,92,0.8)]"
                  />
                </motion.div>

                {/* Top overlay strip */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF1F75] rounded-full pulse-magenta" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-bold">LIVE · Fan Activation</span>
                  </div>
                  <button
                    onClick={() => setMuted((m) => !m)}
                    data-testid="scan-mute"
                    className="p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Subtle grain */}
                <div className="absolute inset-0 grain pointer-events-none" />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/"
                  data-testid="scan-home"
                  className="inline-flex items-center gap-2 bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-6 py-4 transition-all shimmer"
                >
                  {locale === "ar" ? "العودة إلى الموقع" : locale === "en" ? "Back to the experience" : "Retour à l'expérience"}
                </Link>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Raibi Jamila", text: `${displayName} vibre avec Jamila pour le World Cup 2026 🇲🇦`, url: window.location.origin });
                    }
                  }}
                  data-testid="scan-share"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-[#D4AF37] text-white px-6 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-colors"
                >
                  {t.share}
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
