import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { Mic, MicOff, Volume2 } from "lucide-react";
import axios from "axios";

const CUP = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/fu1pusvr_7ffd2ac4-660d-4b97-9438-11cfa6405b5f.png";
const FANS = "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/n13snhxw_ChatGPT%20Image%2017%20mai%202026%2C%2000_19_16.png";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const LionsRoar = () => {
  const { t, locale } = useI18n();
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [totalRoars, setTotalRoars] = useState(0);
  const lastLogged = useRef(0);

  useEffect(() => {
    axios.get(`${API}/roar/stats`).then((r) => setTotalRoars(r.data.total_roars || 0)).catch(() => {});
  }, []);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      audioCtxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      analyserRef.current = analyser;
      setActive(true);
      loop();
    } catch (e) {
      // Fallback: simulate "fake" roar for users who deny mic
      setActive(true);
      fakeLoop();
    }
  };

  const stop = () => {
    setActive(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    streamRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
    setIntensity(0);
  };

  const draw = (data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const N = data.length;
    // Compute avg intensity
    let sum = 0;
    for (let i = 0; i < N; i++) sum += data[i];
    const avg = sum / N / 255;
    setIntensity(avg);

    // Confetti trigger
    if (avg > 0.55 && Date.now() - lastLogged.current > 1200) {
      lastLogged.current = Date.now();
      burst();
      axios.post(`${API}/roar`, { intensity: avg, locale }).then((r) => setTotalRoars(r.data.total_roars)).catch(() => {});
    }

    // Draw waveform (mirrored) — magenta + green
    const cx = w / 2;
    const cy = h / 2;
    const baseR = Math.min(w, h) * 0.28;
    for (let layer = 0; layer < 2; layer++) {
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const v = data[i] / 255;
        const r = baseR + v * 80 * (layer === 0 ? 1 : 0.7);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.lineWidth = layer === 0 ? 3 : 2;
      ctx.strokeStyle = layer === 0 ? "#FF1F75" : "#00A050";
      ctx.shadowBlur = 30;
      ctx.shadowColor = layer === 0 ? "#D91C5C" : "#006233";
      ctx.stroke();
    }
    // Inner glow
    const grd = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseR);
    grd.addColorStop(0, `rgba(255,31,117,${0.4 + avg * 0.4})`);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
  };

  const loop = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    draw(data);
    rafRef.current = requestAnimationFrame(loop);
  };

  const fakeLoop = () => {
    // Animated noise fallback
    const N = 64;
    const data = new Uint8Array(N);
    let t = 0;
    const f = () => {
      t += 0.05;
      for (let i = 0; i < N; i++) {
        data[i] = 80 + Math.sin(t + i * 0.3) * 60 + Math.random() * 40;
      }
      draw(data);
      rafRef.current = requestAnimationFrame(f);
    };
    f();
  };

  const burst = () => {
    const pieces = Array.from({ length: 22 }).map(() => ({
      id: Math.random().toString(36).slice(2),
      x: 0,
      y: 0,
      tx: (Math.random() - 0.5) * 480,
      ty: -200 - Math.random() * 220,
      r: Math.random() * 360,
      c: Math.random() > 0.5 ? "#D91C5C" : Math.random() > 0.5 ? "#00A050" : "#D4AF37",
    }));
    setConfetti((c) => [...c, ...pieces]);
    setTimeout(() => setConfetti((c) => c.filter((p) => !pieces.find((q) => q.id === p.id))), 2200);
  };

  useEffect(() => () => stop(), []);

  return (
    <section
      id="roar"
      data-testid="roar-section"
      className="relative min-h-screen py-32 bg-black overflow-hidden grain"
    >
      <img src={FANS} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      <div className="smoke-blob w-[700px] h-[700px] bg-[#D91C5C] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 rounded-md" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">{t.roar.eyebrow}</div>
          <h2 className={`font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] ${locale === "ar" ? "font-arabic" : ""}`}>
            {t.roar.title}
          </h2>
          <p className={`max-w-2xl mx-auto text-white/70 text-base md:text-lg ${locale === "ar" ? "font-arabic-body" : ""}`}>
            {t.roar.desc}
          </p>
        </motion.div>

        {/* Visualizer */}
        <div className="relative mx-auto w-full max-w-[520px] aspect-square flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={520}
            height={520}
            className="absolute inset-0 w-full h-full"
            data-testid="roar-canvas"
          />
          <motion.img
            animate={{ scale: 1 + intensity * 0.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            src={CUP}
            alt="reactive cup"
            className="relative w-56 md:w-72 z-10 drop-shadow-[0_30px_60px_rgba(217,28,92,0.6)]"
          />
          {/* Confetti */}
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.tx, y: p.ty, opacity: 0, rotate: p.r }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 w-2 h-3 z-20"
              style={{ backgroundColor: p.c }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <button
            data-testid="roar-toggle"
            onClick={active ? stop : start}
            className={`group inline-flex items-center gap-3 font-bold text-sm tracking-[0.2em] uppercase px-8 py-5 transition-all ${
              active ? "bg-white text-black hover:bg-white/90" : "bg-[#D91C5C] hover:bg-[#FF1F75] text-white shimmer pulse-magenta"
            } rounded-md`}
          >
            {active ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {active ? t.roar.stop : t.roar.btn}
          </button>
          <div className="flex items-center gap-2 text-xs text-white/50 uppercase tracking-wider">
            <Volume2 className="w-3 h-3" />
            {t.roar.hint}
          </div>
          <div className="pt-6 flex items-center gap-3">
            <div className="font-display font-black text-3xl md:text-4xl bg-gradient-to-r from-[#D91C5C] to-[#D4AF37] bg-clip-text text-transparent" data-testid="total-roars">
              {totalRoars.toLocaleString("en-US")}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-widest max-w-[120px] text-left">
              {t.roar.countLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
