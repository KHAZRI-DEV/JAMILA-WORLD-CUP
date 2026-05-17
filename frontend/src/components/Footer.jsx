import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { MapPin, Heart, Instagram, Twitter, Music } from "lucide-react";
import { toast, Toaster } from "sonner";
import { WelcomeModal } from "./WelcomeModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Footer = () => {
  const { t, locale } = useI18n();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [posts, setPosts] = useState([]);
  const [country, setCountry] = useState("all");
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [welcomeEmail, setWelcomeEmail] = useState("");

  useEffect(() => {
    axios.get(`${API}/social/feed`).then((r) => setPosts(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const q = country === "all" ? "" : `?country=${country}`;
    axios.get(`${API}/stores${q}`).then((r) => setStores(r.data)).catch(() => {});
  }, [country]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email, locale });
      toast.success(t.footer.thanks);
      setWelcomeEmail(email);
      setWelcomeOpen(true);
      setEmail("");
    } catch (err) {
      toast.error("Invalid email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" data-testid="site-footer" className="relative bg-black overflow-hidden">
      <Toaster theme="dark" position="top-center" />
      <WelcomeModal open={welcomeOpen} email={welcomeEmail} onClose={() => setWelcomeOpen(false)} />
      <div className="zellige-divider" />

      {/* Social wall */}
      <section data-testid="social-wall" className="py-24 bg-gradient-to-b from-black via-[#0f0509] to-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-2">#MoroccoUSA2026</div>
              <h2 className={`font-display font-black text-4xl md:text-6xl tracking-tighter ${locale === "ar" ? "font-arabic" : ""}`}>
                {t.footer.social}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <a href="#" data-testid="social-instagram" className="p-3 border border-white/10 hover:border-[#D91C5C] hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" data-testid="social-twitter" className="p-3 border border-white/10 hover:border-[#D91C5C] hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" data-testid="social-tiktok" className="p-3 border border-white/10 hover:border-[#D91C5C] hover:text-white transition-colors"><Music className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`social-post-${p.id}`}
                className="group glass p-6 hover:border-[#D91C5C]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={p.avatar} alt="" className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{p.author}</div>
                    <div className="text-xs text-white/50">{p.handle} · {p.timestamp}</div>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-4">{p.content}</p>
                {p.image && (
                  <div className="relative h-40 mb-4 overflow-hidden">
                    <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#D91C5C]" />{p.likes.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="ticket-tear" />

      {/* Store locator + newsletter */}
      <section className="py-24 bg-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
          {/* Newsletter */}
          <div className="lg:col-span-5 space-y-6" data-testid="newsletter-block">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.footer.newsletter}</div>
            <h3 className={`font-display font-black text-4xl md:text-5xl tracking-tighter leading-none ${locale === "ar" ? "font-arabic" : ""}`}>
              {locale === "ar" ? "ابق على اتصال" : locale === "en" ? "Stay close to the pride" : "Reste près de la fierté"}
            </h3>
            <p className="text-white/60 max-w-md">
              {locale === "ar" ? "احصل على الأخبار، عروض الإصدار المحدود، ومحتوى حصري." : locale === "en" ? "Get drops, news, and exclusive Atlas Lions content." : "Reçois les drops, news, et contenu exclusif des Lions de l'Atlas."}
            </p>
            <form onSubmit={submit} className="flex max-w-md border border-white/15 focus-within:border-[#D91C5C] transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.placeholder}
                data-testid="newsletter-email"
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-white/40 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit"
                className="bg-[#D91C5C] hover:bg-[#FF1F75] text-white font-bold text-xs tracking-[0.2em] uppercase px-6 transition-colors disabled:opacity-60"
              >
                {loading ? "..." : t.footer.submit}
              </button>
            </form>
          </div>

          {/* Stores */}
          <div className="lg:col-span-7 space-y-6" data-testid="stores-block">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.footer.stores}</div>
                <h3 className={`font-display font-black text-4xl md:text-5xl tracking-tighter leading-none mt-2 ${locale === "ar" ? "font-arabic" : ""}`}>
                  Maroc · USA
                </h3>
              </div>
              <div className="flex items-center bg-white/5 border border-white/10 p-1">
                {[
                  { v: "all", l: "All" },
                  { v: "MA", l: "MA" },
                  { v: "US", l: "US" },
                ].map((c) => (
                  <button
                    key={c.v}
                    data-testid={`store-filter-${c.v}`}
                    onClick={() => setCountry(c.v)}
                    className={`px-4 py-2 text-xs font-bold transition-all ${
                      country === c.v ? "bg-[#D91C5C] text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {c.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto no-scrollbar pr-2">
              {stores.map((s) => (
                <div key={s.id} data-testid={`store-${s.id}`} className="border border-white/10 hover:border-[#D91C5C]/50 p-4 transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-white text-sm">{s.name}</div>
                      <div className="text-xs text-white/50 mt-1">{s.address}</div>
                      <div className="text-xs text-white/70 mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {s.city}, {s.country}
                      </div>
                    </div>
                    <div className={`text-[10px] font-bold tracking-wider px-2 py-1 ${s.country === "MA" ? "bg-[#D91C5C]/20 text-[#FF1F75]" : "bg-[#006233]/20 text-[#00A050]"}`}>
                      {s.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-t border-white/10 py-8 overflow-hidden">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {["DIMA MAGHRIB", "ATLAS LIONS", "WORLD CUP 2026", "من المغرب إلى العالم", "JAMILA · 1966", "LIMITED EDITION"].map((s, j) => (
                <span key={j} className="font-display font-black text-3xl md:text-5xl text-white/10 tracking-tighter whitespace-nowrap">
                  {s} <span className="text-[#D91C5C]">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-6 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
