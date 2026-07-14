import { motion, useMotionValue, useSpring, useTransform, useScroll, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------------- Liquid Morph Blob ---------------- */
export function LiquidMorph() {
  const [d, setD] = useState("");
  useEffect(() => {
    let raf = 0;
    const N = 8;
    const R = 140;
    const cx = 200, cy = 200;
    const phases = Array.from({ length: N }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: N }, () => 0.6 + Math.random() * 0.9);
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const pts: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const wob = Math.sin(t * speeds[i] + phases[i]) * 22 + Math.cos(t * 0.7 + i) * 10;
        const r = R + wob;
        pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
      }
      let path = "";
      for (let i = 0; i < N; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % N];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        if (i === 0) path += `M ${mx} ${my} `;
        path += `Q ${x2} ${y2} ${(x2 + pts[(i + 2) % N][0]) / 2} ${(y2 + pts[(i + 2) % N][1]) / 2} `;
      }
      path += "Z";
      setD(path);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/70">Liquid Compute</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Prompts that flow like mercury
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            Our runtime bends around Lovable's throttles the way mercury bends around glass — no seams, no stalls, no credits.
          </p>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <defs>
              <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <filter id="lm-blur">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="lm-goo">
                <feGaussianBlur stdDeviation="3" />
                <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
              </filter>
            </defs>
            <g filter="url(#lm-goo)">
              <path d={d} fill="url(#lm-g)" opacity="0.9" />
            </g>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" filter="url(#lm-blur)" />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-white/20 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
              Flow · ∞ tps
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kinetic Split Text on Scroll ---------------- */
export function KineticType() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const words = ["BUILD", "SHIP", "REPEAT", "∞"];

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" />
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-cyan-300/70">Kinetic Manifesto</p>
        <div className="mt-8 space-y-2 md:space-y-4" style={{ perspective: 1000 }}>
          {words.map((w, i) => {
            const start = i * 0.15;
            const end = start + 0.6;
            const x = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -300 : 300, 0]);
            const rot = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -25 : 25, 0]);
            const op = useTransform(scrollYProgress, [start, start + 0.2, end - 0.1, end], [0, 1, 1, 0.4]);
            return (
              <motion.div
                key={w + i}
                style={{ x, rotateY: rot, opacity: op }}
                className="text-center font-display text-[15vw] font-bold leading-[0.85] tracking-tighter text-transparent md:text-[10rem]"
              >
                <span
                  style={{
                    background: i === words.length - 1
                      ? "linear-gradient(90deg,#22d3ee,#a78bfa,#f97316)"
                      : "linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.3))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: i === words.length - 1 ? "0" : "1px rgba(255,255,255,0.15)",
                  }}
                >
                  {w}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Holographic Prism ---------------- */
export function HoloPrism() {
  const faces = [
    { label: "01 · License", body: "DNTX signed", grad: "from-cyan-500/40 to-cyan-500/5" },
    { label: "02 · Runtime", body: "Injected", grad: "from-fuchsia-500/40 to-fuchsia-500/5" },
    { label: "03 · Meter", body: "Bypassed", grad: "from-orange-500/40 to-orange-500/5" },
    { label: "04 · Session", body: "30d · 3dev", grad: "from-emerald-500/40 to-emerald-500/5" },
  ];
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/70">Holographic Prism</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Four faces. One infinite key.
        </h2>

        <div className="mx-auto mt-20" style={{ perspective: 1400 }}>
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="relative mx-auto h-64 w-64"
            style={{ transformStyle: "preserve-3d" }}
          >
            {faces.map((f, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br ${f.grad} backdrop-blur-sm`}
                style={{
                  transform: `rotateY(${i * 90}deg) translateZ(128px)`,
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">{f.label}</div>
                <div className="mt-2 font-display text-2xl font-bold text-white">{f.body}</div>
                <div className="mt-4 flex gap-1">
                  {[...Array(3)].map((_, k) => (
                    <span key={k} className="h-1 w-6 rounded-full bg-white/40" />
                  ))}
                </div>
              </div>
            ))}
            {/* top/bottom caps */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-black/40"
              style={{ transform: "rotateX(90deg) translateZ(128px)" }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-black/40"
              style={{ transform: "rotateX(-90deg) translateZ(128px)" }}
            />
          </motion.div>
        </div>
        <p className="mt-16 text-sm text-white/50">Rotates continuously · Every face verified in real time</p>
      </div>
    </section>
  );
}

/* ---------------- Gravity Playground ---------------- */
export function GravityPlayground() {
  const orbs = [
    { color: "#22d3ee", label: "∞", size: 96, x: 20, y: 40 },
    { color: "#a78bfa", label: "⚡", size: 72, x: 55, y: 20 },
    { color: "#f97316", label: "◆", size: 84, x: 70, y: 60 },
    { color: "#34d399", label: "✓", size: 60, x: 35, y: 70 },
    { color: "#f472b6", label: "◉", size: 68, x: 85, y: 35 },
  ];
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/70">Interactive Playground</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Drag the physics. Build the universe.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Every orb obeys spring physics. Fling them, stack them, feel the runtime.
          </p>
        </motion.div>

        <div className="relative mt-14 h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.1]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-[100px]" />
          {orbs.map((o, i) => (
            <motion.div
              key={i}
              drag
              dragElastic={0.4}
              dragTransition={{ bounceStiffness: 180, bounceDamping: 12 }}
              whileTap={{ scale: 1.15, cursor: "grabbing" }}
              whileHover={{ scale: 1.05 }}
              className="absolute flex cursor-grab items-center justify-center rounded-full font-display font-bold text-white select-none"
              style={{
                width: o.size,
                height: o.size,
                left: `${o.x}%`,
                top: `${o.y}%`,
                background: `radial-gradient(circle at 30% 30%, ${o.color}, ${o.color}80 60%, transparent 90%)`,
                boxShadow: `0 0 40px ${o.color}80, inset 0 0 20px rgba(255,255,255,0.3)`,
                fontSize: o.size / 3,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {o.label}
            </motion.div>
          ))}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
            ↕ Drag any orb · Physics enabled
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Quantum Tunnel ---------------- */
export function QuantumTunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rings = 14;

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora-bg opacity-20" />
        <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: 900 }}>
          <div className="relative h-[600px] w-[600px]" style={{ transformStyle: "preserve-3d" }}>
            {[...Array(rings)].map((_, i) => {
              const depth = i / rings;
              const z = useTransform(scrollYProgress, [0, 1], [-400 + i * 60, -1200 + i * 60]);
              const op = useTransform(scrollYProgress, [0, 0.5, 1], [1 - depth * 0.7, 1, 0.2]);
              const rot = useTransform(scrollYProgress, [0, 1], [i * 15, i * 15 + 180]);
              const hue = i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#f97316";
              return (
                <motion.div
                  key={i}
                  style={{
                    z,
                    opacity: op,
                    rotate: rot,
                    borderColor: hue,
                    boxShadow: `0 0 40px ${hue}60, inset 0 0 40px ${hue}30`,
                  }}
                  className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[30%] border-2"
                />
              );
            })}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">
                Entering the tunnel
              </p>
              <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
                <span className="text-gradient">Scroll into infinity</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/60">
                A wormhole through Lovable's credit wall. Come out the other side unlimited.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Data Rain Ticker ---------------- */
export function DataRain() {
  const cols = 24;
  const chars = "01ΔΣΩ∞◆▲●";
  // Deterministic streams — same on server and client (no Math.random at render)
  const streams = Array.from({ length: cols }, (_, c) =>
    Array.from({ length: 18 }, (_, i) => chars[(c * 7 + i * 3) % chars.length])
  );
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative h-56 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="flex h-full">
          {[...Array(cols)].map((_, c) => {
            const delay = (c * 0.4) % 5;
            const dur = 4 + (c % 5);
            const stream = streams[c];
            return (
              <motion.div
                key={c}
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
                className="flex flex-1 flex-col items-center font-mono text-xs leading-[1.1]"
              >
                {stream.map((ch, i) => (
                  <span
                    key={i}
                    style={{
                      color: i === 0 ? "#fff" : `rgba(34,211,238,${1 - i / stream.length})`,
                      textShadow: i === 0 ? "0 0 8px #22d3ee" : "none",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </motion.div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="rounded-full border border-cyan-400/30 bg-black/60 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300 backdrop-blur">
            Streaming · Uncapped · Live
          </div>
        </div>
      </div>
    </section>
  );
}
