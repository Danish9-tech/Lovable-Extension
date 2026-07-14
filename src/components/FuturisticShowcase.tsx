import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------------- Orbit Core ---------------- */
export function OrbitCore() {
  return (
    <section className="relative overflow-hidden bg-black py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.15]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live Engine
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            An engine built for <span className="text-gradient">infinite prompts</span>
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            While Lovable throttles credits, our extension keeps ticking. Time-based access, no metering, no anxiety — just build.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {[
              { k: "Uptime", v: "99.98%" },
              { k: "Latency", v: "<40ms" },
              { k: "Devices", v: "1–3" },
              { k: "Refunds", v: "24h" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.k}</div>
                <div className="mt-1 font-display text-xl font-semibold text-white">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orbits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* Rings */}
          {[320, 260, 200, 140].map((size, i) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
              style={{
                width: size,
                height: size,
                transform: "translate(-50%,-50%)",
                boxShadow: `inset 0 0 40px rgba(255,255,255,0.02)`,
              }}
            >
              <motion.div
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
                className="relative h-full w-full"
              >
                <span
                  className={`absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full ${
                    i === 0 ? "bg-cyan-400" : i === 1 ? "bg-fuchsia-400" : i === 2 ? "bg-orange-400" : "bg-emerald-400"
                  }`}
                  style={{
                    boxShadow: `0 0 20px currentColor`,
                  }}
                />
              </motion.div>
            </div>
          ))}

          {/* Core */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 blur-xl opacity-70"
          />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-white">∞</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Holographic Card Row ---------------- */
function TiltCard({
  title,
  body,
  icon,
  hue,
}: {
  title: string;
  body: string;
  icon: string;
  hue: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 15 });
  const sry = useSpring(ry, { stiffness: 180, damping: 15 });
  const gx = useTransform(sry, (v) => `${50 + v * 3}%`);
  const gy = useTransform(srx, (v) => `${50 - v * 3}%`);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6"
    >
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(300px circle at ${gx.get()} ${gy.get()}, ${hue}, transparent 60%)`,
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">
        <div
          className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg"
          style={{ boxShadow: `inset 0 0 30px ${hue}` }}
        >
          {icon}
        </div>
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/60">{body}</p>
        <div className="mt-5 flex items-center gap-1.5">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden"
            >
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: `${40 + Math.random() * 60}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.06 }}
                className="block h-full rounded-full"
                style={{ background: hue }}
              />
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HoloGrid() {
  const items = [
    { title: "Zero-credit runtime", body: "Time-based sessions replace credit metering entirely.", icon: "⚡", hue: "rgba(34,211,238,0.35)" },
    { title: "Local & sandboxed", body: "Runs inside your browser. Never sees your password.", icon: "🛡️", hue: "rgba(167,139,250,0.35)" },
    { title: "Instant activation", body: "License key → paste → building. Under 3 minutes.", icon: "🚀", hue: "rgba(249,115,22,0.35)" },
    { title: "Lifetime updates", body: "New features and patches ship on the same key.", icon: "♾️", hue: "rgba(52,211,153,0.35)" },
  ];
  return (
    <section className="relative bg-black py-24">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Interfaces from the future</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Move your cursor. Feel the depth.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1200 }}>
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <TiltCard {...it} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Terminal Stream ---------------- */
export function TerminalStream() {
  const lines = [
    "$ danitechs --activate --key=DNTX-****-PRO",
    "→ Verifying license signature… ok",
    "→ Injecting runtime into lovable.dev…",
    "→ Credits limiter: DISABLED",
    "→ Session window: 30 days · 3 devices",
    "✓ Ready. Prompts remaining: ∞",
  ];
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 550);
    return () => clearTimeout(t);
  }, [started, shown, lines.length]);

  return (
    <section ref={ref} className="relative bg-black py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent shadow-[0_40px_80px_-30px_rgba(34,211,238,0.35)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-mono text-[11px] text-white/40">~/danitechs — zsh</span>
          </div>
          <div className="relative min-h-[240px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)] px-6 py-6 font-mono text-[13px] leading-relaxed text-white/80">
            {lines.slice(0, shown).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={
                  l.startsWith("$")
                    ? "text-cyan-300"
                    : l.startsWith("✓")
                      ? "text-emerald-300"
                      : "text-white/70"
                }
              >
                {l}
              </motion.div>
            ))}
            {shown < lines.length && (
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan-400" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
