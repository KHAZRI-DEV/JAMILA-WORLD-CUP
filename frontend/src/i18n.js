// Lightweight i18n dictionary for Raibi Jamila landing
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export const dict = {
  fr: {
    dir: "ltr",
    nav: {
      journey: "Le Voyage",
      flavor: "La Saveur",
      roar: "Le Rugissement",
      edition: "Édition Limitée",
      cta: "Rejoins la fierté",
    },
    hero: {
      eyebrow: "Édition Coupe du Monde 2026",
      titleAr: "من المغرب إلى العالم",
      titleFr: "Du Maroc au Monde",
      sub: "Le goût authentique du Maroc qui accompagne les Lions de l'Atlas sur la scène mondiale.",
      cta: "Découvrir l'édition",
      secondary: "Voir l'histoire",
    },
    journey: {
      eyebrow: "Le Voyage",
      title: "Une fierté, deux continents",
      morocco: "Maroc — la racine",
      usa: "USA — la scène",
      distance: "km",
      caption: "De Casablanca à New York, le même cœur bat.",
    },
    flavor: {
      eyebrow: "La Saveur",
      title: "Authentique depuis 1966",
      callouts: [
        { t: "Lait fermenté traditionnel", d: "Procédé hérité des montagnes de l'Atlas." },
        { t: "Recette authentique", d: "Inchangée depuis 1966 — la signature de Jamila." },
        { t: "Zellige & héritage", d: "Le motif de la fierté marocaine sur chaque pot." },
      ],
    },
    roar: {
      eyebrow: "Quand les Lions rugissent",
      title: "Sens le rugissement",
      desc: "Appuie sur le bouton, autorise ton micro, et fais vibrer le pot Raibi en direct.",
      btn: "Active le rugissement",
      stop: "Arrêter",
      hint: "Crie, tape des mains — le pot réagit.",
      countLabel: "Rugissements partagés",
    },
    edition: {
      eyebrow: "Édition limitée",
      title: "World Cup 2026 Morocco Edition",
      desc: "Un design exclusif scellé d'or, un lion rugissant et un QR à scanner pour des contenus collectors.",
      cta: "Scanner & Débloquer",
      stock: "Édition limitée — disponible en magasin et chez nos partenaires US.",
    },
    footer: {
      newsletter: "Rejoins la fierté",
      placeholder: "Ton email",
      submit: "S'inscrire",
      thanks: "Merci ! Tu fais partie de la fierté.",
      stores: "Points de vente",
      social: "Le mur des supporters",
      rights: "© 2026 Raibi Jamila. Tous droits réservés.",
    },
  },
  en: {
    dir: "ltr",
    nav: {
      journey: "The Journey",
      flavor: "The Flavor",
      roar: "The Roar",
      edition: "Limited Edition",
      cta: "Join the pride",
    },
    hero: {
      eyebrow: "World Cup 2026 Edition",
      titleAr: "من المغرب إلى العالم",
      titleFr: "From Morocco to the World",
      sub: "Authentic Moroccan taste, riding with the Atlas Lions onto the global stage.",
      cta: "Discover the edition",
      secondary: "Watch the story",
    },
    journey: {
      eyebrow: "The Journey",
      title: "One pride, two continents",
      morocco: "Morocco — the roots",
      usa: "USA — the stage",
      distance: "km",
      caption: "From Casablanca to New York, one heartbeat.",
    },
    flavor: {
      eyebrow: "The Flavor",
      title: "Authentic since 1966",
      callouts: [
        { t: "Traditional fermented milk", d: "A process inherited from the Atlas mountains." },
        { t: "Original recipe", d: "Unchanged since 1966 — Jamila's signature." },
        { t: "Zellige heritage", d: "The pattern of Moroccan pride on every cup." },
      ],
    },
    roar: {
      eyebrow: "When Lions Roar",
      title: "Feel the Roar",
      desc: "Tap the button, allow your mic, and watch the Raibi cup pulse to your cheer.",
      btn: "Activate the roar",
      stop: "Stop",
      hint: "Shout, clap — the cup reacts in real time.",
      countLabel: "Roars shared",
    },
    edition: {
      eyebrow: "Limited edition",
      title: "World Cup 2026 Morocco Edition",
      desc: "An exclusive gold-foiled design, a roaring lion, and a QR to unlock collector content.",
      cta: "Scan & Unlock",
      stock: "Limited drop — at retailers across Morocco and the US.",
    },
    footer: {
      newsletter: "Join the pride",
      placeholder: "Your email",
      submit: "Subscribe",
      thanks: "Welcome! You're part of the pride.",
      stores: "Stores",
      social: "Fans wall",
      rights: "© 2026 Raibi Jamila. All rights reserved.",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      journey: "الرحلة",
      flavor: "المذاق",
      roar: "الزئير",
      edition: "إصدار محدود",
      cta: "انضم للفخر",
    },
    hero: {
      eyebrow: "إصدار كأس العالم 2026",
      titleAr: "من المغرب إلى العالم",
      titleFr: "Du Maroc au Monde",
      sub: "المذاق المغربي الأصيل يرافق أسود الأطلس إلى المسرح العالمي.",
      cta: "اكتشف الإصدار",
      secondary: "شاهد القصة",
    },
    journey: {
      eyebrow: "الرحلة",
      title: "فخر واحد، قارّتان",
      morocco: "المغرب — الجذور",
      usa: "أمريكا — المسرح",
      distance: "كم",
      caption: "من الدار البيضاء إلى نيويورك، نبض واحد.",
    },
    flavor: {
      eyebrow: "المذاق",
      title: "أصيل منذ 1966",
      callouts: [
        { t: "حليب مخمر تقليدي", d: "طريقة موروثة من جبال الأطلس." },
        { t: "وصفة أصلية", d: "لم تتغير منذ 1966 — توقيع جميلة." },
        { t: "إرث الزليج", d: "نقش الفخر المغربي على كل كوب." },
      ],
    },
    roar: {
      eyebrow: "حين تزأر الأسود",
      title: "اشعر بالزئير",
      desc: "اضغط الزر، اسمح للميكروفون، واجعل كوب رايبي ينبض مع هتافك.",
      btn: "فعّل الزئير",
      stop: "إيقاف",
      hint: "اصرخ، صفّق — الكوب يتفاعل مباشرة.",
      countLabel: "زئير مشترك",
    },
    edition: {
      eyebrow: "إصدار محدود",
      title: "إصدار كأس العالم 2026 — المغرب",
      desc: "تصميم حصري بطبعة ذهبية، أسد يزأر، ورمز QR لمحتوى حصري.",
      cta: "امسح وافتح",
      stock: "إصدار محدود — متوفر في المغرب والولايات المتحدة.",
    },
    footer: {
      newsletter: "انضم للفخر",
      placeholder: "بريدك الإلكتروني",
      submit: "اشترك",
      thanks: "أهلاً بك في عائلة الفخر.",
      stores: "نقاط البيع",
      social: "جدار المشجعين",
      rights: "© 2026 رايبي جميلة. جميع الحقوق محفوظة.",
    },
  },
};

const I18nContext = createContext({ locale: "fr", t: dict.fr, setLocale: () => {} });

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => localStorage.getItem("rj_locale") || "fr");

  useEffect(() => {
    localStorage.setItem("rj_locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dict[locale].dir;
  }, [locale]);

  const value = useMemo(() => ({ locale, t: dict[locale], setLocale }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
