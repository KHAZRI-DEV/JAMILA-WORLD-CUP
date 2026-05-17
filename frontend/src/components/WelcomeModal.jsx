import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, QrCode } from "lucide-react";
import { useI18n } from "../i18n";

const content = {
  fr: {
    subject: "Bienvenue dans le rugissement Raibi Jamila 🇲🇦",
    body: "Merci d'avoir rejoint la Fan Zone Raibi Jamila World Cup 2026. Prépare-toi à vivre l'expérience ultime : scanne ton Raibi, entre dans le stade, réveille le Lion et soutiens le Maroc jusqu'au coup d'envoi.",
    cta: "Découvrir l'expérience",
    from: "Raibi Jamila Fan Zone",
    label: "Email de bienvenue",
    to: "Pour",
  },
  en: {
    subject: "Welcome to the Raibi Jamila roar 🇲🇦",
    body: "Thanks for joining the Raibi Jamila World Cup 2026 Fan Zone. Get ready for the ultimate experience: scan your Raibi, step into the stadium, wake the Lion and back Morocco all the way to kickoff.",
    cta: "Discover the experience",
    from: "Raibi Jamila Fan Zone",
    label: "Welcome email",
    to: "To",
  },
  ar: {
    subject: "مرحبا بك في زئير رايبي جميلة 🇲🇦",
    body: "شكرا لانضمامك إلى منطقة المشجعين رايبي جميلة كأس العالم 2026. استعد لتجربة لا تنسى: امسح كوب رايبي، ادخل الملعب، أيقظ الأسد وادعم المغرب حتى صافرة البداية.",
    cta: "اكتشف التجربة",
    from: "منطقة المشجعين رايبي جميلة",
    label: "بريد الترحيب",
    to: "إلى",
  },
};

export const WelcomeModal = ({ open, email, onClose }) => {
  const { locale } = useI18n();
  const c = content[locale] || content.fr;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          data-testid="welcome-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#0a0a0a] border border-[#D91C5C]/40 shadow-[0_30px_80px_-20px_rgba(217,28,92,0.6)] overflow-hidden"
          >
            {/* Header strip */}
            <div className="bg-gradient-to-r from-[#D91C5C] via-[#FF1F75] to-[#B91C1C] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4" />
                <span className="text-xs tracking-[0.25em] uppercase font-bold">{c.label}</span>
              </div>
              <button onClick={onClose} data-testid="welcome-close" className="text-white/90 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-3">
                <div><span className="text-white/40">From: </span><span className="text-white/80">{c.from}</span></div>
                <div className="truncate ml-3"><span className="text-white/40">{c.to}: </span><span className="text-white/80">{email}</span></div>
              </div>

              <h3 className={`font-display font-black text-2xl md:text-3xl leading-tight ${locale === "ar" ? "font-arabic" : ""}`}>
                {c.subject}
              </h3>

              <p className={`text-white/75 leading-relaxed text-sm md:text-base ${locale === "ar" ? "font-arabic-body" : ""}`}>
                {c.body}
              </p>

              <div className="pt-2">
                <a
                  href="#edition"
                  onClick={onClose}
                  data-testid="welcome-cta"
                  className="inline-flex items-center gap-3 bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-sm tracking-[0.2em] uppercase px-6 py-4 transition-all shimmer"
                >
                  <QrCode className="w-4 h-4" />
                  {c.cta}
                </a>
              </div>

              <div className="border-t border-white/10 pt-4 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                Raibi Jamila · World Cup 2026 Morocco Edition
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
