import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------------- Neural Constellation ---------------- */
export function NeuralConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 46;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
    }));
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => (mouse.x = mouse.y = -9999));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          const max = 140 * dpr;
          if (d < max) {
            const a = 1 - d / max;
            ctx.strokeStyle = `rgba(34,211,238,${a * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        const mmax = 180 * dpr;
        if (md < mmax) {
          const a = 1 - md / mmax;
          ctx.strokeStyle = `rgba(167,139,250,${a * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.6 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Neural Mesh</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A network that thinks with you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Hover the mesh. Every node is a prompt, every line a token — flowing free of credits.
          </p>
        </motion.div>

        <div className="relative mt-12 h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-cyan-500/[0.06] via-transparent to-fuchsia-500/[0.06]">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          {/* HUD corners */}
          {[
            "left-4 top-4",
            "right-4 top-4",
            "left-4 bottom-4",
            "right-4 bottom-4",
          ].map((pos, i) => (
            <div key={i} className={`pointer-events-none absolute ${pos} h-6 w-6 border-cyan-400/60`}>
              <div className={`absolute inset-0 ${i === 0 ? "border-l border-t" : i === 1 ? "border-r border-t" : i === 2 ? "border-l border-b" : "border-r border-b"} border-cyan-400/60`} />
            </div>
          ))}
          <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60 backdrop-blur">
            ◉ mesh.live · 46 nodes · streaming
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Radial Stat Rings ---------------- */
function Ring({ value, label, color }: { value: number; label: string; color: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setV(value);
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  const C = 2 * Math.PI * 54;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - v / 100) }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={v}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-3xl font-bold text-white"
          >
            {v}%
          </motion.span>
          <span className="mt-1 text-[10px] uppercase tracking-widest text-white/50">Realtime</span>
        </div>
      </div>
      <div className="mt-4 text-sm text-white/70">{label}</div>
    </div>
  );
}

export function StatMatrix() {
  return (
    <section className="relative bg-black py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Performance, telemetered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Metrics captured across 12,000+ activations. This is what unlimited actually looks like.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Ring value={99} label="Activation success" color="#22d3ee" />
          <Ring value={94} label="Delivered < 10 min" color="#a78bfa" />
          <Ring value={98} label="Buyer satisfaction" color="#f97316" />
          <Ring value={100} label="Credits used" color="#34d399" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cyber Beam Divider ---------------- */
export function CyberBeam() {
  return (
    <div className="relative h-24 overflow-hidden bg-black">
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      <motion.div
        initial={{ x: "-40%" }}
        animate={{ x: "140%" }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 h-px w-1/3 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
      />
      <motion.div
        initial={{ x: "140%" }}
        animate={{ x: "-40%" }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 mt-3 h-px w-1/4 -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"
        style={{ filter: "drop-shadow(0 0 8px #a78bfa)" }}
      />
    </div>
  );
}

/* ---------------- Parallax Feature Deck ---------------- */
export function FeatureDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-25" />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/70">Command Deck</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Every layer under your control
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            License, runtime, and telemetry — orchestrated in a single translucent stack. Scroll to see the deck breathe.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { k: "LIC-01", v: "License handshake ok" },
              { k: "RTM-02", v: "Runtime injected" },
              { k: "MTR-03", v: "Metering bypassed" },
            ].map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs"
              >
                <span className="text-cyan-300">{r.k}</span>
                <span className="text-white/70">{r.v}</span>
                <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-md" style={{ perspective: 1400 }}>
          <motion.div
            style={{ y: y3, rotate: rot }}
            className="absolute inset-x-6 top-6 h-56 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-transparent backdrop-blur-md"
          >
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">LAYER · 03</div>
              <div className="mt-2 font-display text-lg font-semibold text-white">Telemetry stream</div>
              <div className="mt-4 grid grid-cols-8 gap-1">
                {[...Array(24)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [6, 22, 6] }}
                    transition={{ duration: 1.2 + (i % 4) * 0.2, repeat: Infinity, delay: i * 0.05 }}
                    className="block w-full rounded-sm bg-cyan-300/70"
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute inset-x-2 top-24 h-56 rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/20 to-transparent backdrop-blur-md"
          >
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-300/80">LAYER · 02</div>
              <div className="mt-2 font-display text-lg font-semibold text-white">Runtime bridge</div>
              <div className="mt-4 space-y-2 font-mono text-[11px] text-white/70">
                <div>▸ pid 9421 attached</div>
                <div>▸ hook `credit_check` → noop</div>
                <div>▸ session ttl = 30d</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-x-10 top-40 h-56 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-orange-500/25 to-transparent backdrop-blur-md shadow-[0_30px_80px_-20px_rgba(249,115,22,0.5)]"
          >
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-orange-300/90">LAYER · 01</div>
              <div className="mt-2 font-display text-lg font-semibold text-white">License core</div>
              <div className="mt-4 rounded-md border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-orange-200">
                DNTX-8F3A-PRO-∞
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Signed · verified · active
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Magnetic CTA ---------------- */
export function MagneticCTA({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <section className="relative overflow-hidden bg-black py-28">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl"
        >
          Ready to <span className="text-gradient">go infinite?</span>
        </motion.h2>
        <p className="mx-auto mt-5 max-w-lg text-white/60">
          Skip the credit meter. Grab a plan and be building inside 10 minutes.
        </p>
        <motion.a
          ref={ref}
          href={href}
          target="_blank"
          rel="noreferrer"
          onMouseMove={onMove}
          onMouseLeave={reset}
          style={{ x: sx, y: sy }}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {label}
          <span className="text-lg">→</span>
        </motion.a>
      </div>
    </section>
  );
}
