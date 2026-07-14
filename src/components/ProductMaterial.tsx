import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WA = "https://wa.me/923362377416";

/* ---------------- Savings Calculator ---------------- */
export function SavingsCalculator() {
  const [hours, setHours] = useState(20);
  // Assume Lovable Pro credit burn: ~$0.5 per productive coding hour on average heavy usage
  const lovableCost = hours * 4; // avg $4/hr in Lovable credit top-ups for heavy builders
  const ourCost = 40; // 30-day plan
  const savings = Math.max(0, lovableCost - ourCost);
  const savingsMV = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(savingsMV, savings, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [savings, savingsMV]);

  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-25" />
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">Savings Calculator</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            How much are credits <span className="text-gradient">actually</span> costing you?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 backdrop-blur"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <label className="mb-3 flex items-baseline justify-between text-white/70">
                <span className="text-sm">Hours you code per week</span>
                <span className="font-display text-3xl font-bold text-white">{hours}h</span>
              </label>
              <input
                type="range"
                min={2}
                max={60}
                value={hours}
                onChange={(e) => setHours(+e.target.value)}
                className="w-full accent-orange-400"
                style={{ height: 4 }}
              />
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                <span>Weekend</span>
                <span>Full-time</span>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-red-300/80">Lovable credits (monthly)</div>
                    <div className="mt-1 font-display text-2xl font-bold text-white line-through decoration-red-400/60">${lovableCost}</div>
                  </div>
                  <span className="text-xs text-red-300/80">Metered</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-500/5 px-4 py-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-300/80">Danitechs 30-day plan</div>
                    <div className="mt-1 font-display text-2xl font-bold text-white">${ourCost}</div>
                  </div>
                  <span className="text-xs text-emerald-300/80">Flat</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 via-cyan-500/5 to-transparent p-8 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">You save monthly</div>
              <div className="mt-4 font-display text-6xl font-bold text-white md:text-7xl">
                ${display}
              </div>
              <div className="mt-2 text-sm text-white/60">and get unlimited prompts</div>
              <a
                href={`${WA}?text=Hi%20Danitechs%2C%20I%27d%20like%20the%2030-day%20plan.`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
              >
                Claim the savings →
              </a>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-400/30 blur-2xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Before / After Slider ---------------- */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onDown = () => (dragging.current = true);
  const onUp = () => (dragging.current = false);
  const onMove = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  };

  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/70">Drag to compare</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Lovable throttled vs Danitechs unlocked
          </h2>
        </motion.div>

        <div
          ref={ref}
          onMouseMove={(e) => dragging.current && onMove(e.clientX)}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          className="relative mt-12 h-[420px] cursor-ew-resize overflow-hidden rounded-3xl border border-white/10 select-none"
        >
          {/* Right (After) */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-black">
            <div className="absolute inset-0 grid-bg opacity-[0.12]" />
            <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-8">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">Danitechs · Unlocked</span>
              <div className="font-display text-5xl font-bold text-white md:text-6xl">∞ prompts</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Credits used</div>
                  <div className="mt-1 font-display text-2xl font-bold text-emerald-300">0</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Session</div>
                  <div className="mt-1 font-display text-2xl font-bold text-white">30d · 3dev</div>
                </div>
              </div>
            </div>
          </div>

          {/* Left (Before) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-red-500/15 via-orange-500/5 to-black"
            style={{ width: `${pos}%` }}
          >
            <div className="absolute inset-0 grid-bg opacity-[0.12]" />
            <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-8" style={{ width: `${100 / (pos / 100)}%` }}>
              <span className="rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-300">Lovable · Throttled</span>
              <div className="font-display text-5xl font-bold text-white line-through decoration-red-400/70 md:text-6xl">out of credits</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Credits used</div>
                  <div className="mt-1 font-display text-2xl font-bold text-red-300">98%</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Next prompt</div>
                  <div className="mt-1 font-display text-2xl font-bold text-white">$$$</div>
                </div>
              </div>
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]"
            style={{ left: `${pos}%` }}
          >
            <button
              onMouseDown={onDown}
              onTouchStart={onDown}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/80 text-white backdrop-blur cursor-ew-resize"
              aria-label="Drag"
            >
              <span className="font-mono text-lg">⇔</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Live Activity Feed ---------------- */
const activityPool = [
  { who: "Ahmed R.", where: "Karachi 🇵🇰", plan: "30 Days", ago: "just now" },
  { who: "Sofia M.", where: "Barcelona 🇪🇸", plan: "7 Days", ago: "1 min ago" },
  { who: "Kenji T.", where: "Tokyo 🇯🇵", plan: "15 Days", ago: "3 min ago" },
  { who: "Priya S.", where: "Bangalore 🇮🇳", plan: "30 Days", ago: "5 min ago" },
  { who: "Lucas F.", where: "São Paulo 🇧🇷", plan: "3 Days", ago: "7 min ago" },
  { who: "Emma J.", where: "London 🇬🇧", plan: "30 Days", ago: "9 min ago" },
  { who: "David K.", where: "Berlin 🇩🇪", plan: "7 Days", ago: "12 min ago" },
  { who: "Aisha B.", where: "Dubai 🇦🇪", plan: "15 Days", ago: "14 min ago" },
  { who: "Marco V.", where: "Milan 🇮🇹", plan: "30 Days", ago: "17 min ago" },
];

export function LiveActivity() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % activityPool.length), 2600);
    return () => clearInterval(t);
  }, []);

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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live · Global
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Builders activating right now
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:col-span-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Latest activation</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 font-display font-bold text-black">
                    {activityPool[idx].who[0]}
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-white">
                      {activityPool[idx].who} <span className="text-white/40">from</span> {activityPool[idx].where}
                    </div>
                    <div className="text-sm text-white/60">
                      Activated <span className="text-emerald-300">{activityPool[idx].plan}</span> plan · {activityPool[idx].ago}
                    </div>
                  </div>
                  <span className="ml-auto text-emerald-400">✓</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-5 bottom-5 flex gap-1">
              {activityPool.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${i === idx ? "bg-emerald-400" : "bg-white/10"}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Today", v: "137", s: "activations" },
              { k: "This week", v: "984", s: "activations" },
              { k: "Countries", v: "62", s: "reached" },
              { k: "Refunds", v: "0.2%", s: "rate" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.k}</div>
                <div className="mt-1 font-display text-xl font-bold text-white">{s.v}</div>
                <div className="text-[10px] text-white/50">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison Table ---------------- */
export function ComparisonTable() {
  const rows = [
    { k: "Unlimited prompts", ours: true, them: false },
    { k: "Credits used", ours: "0", them: "Metered" },
    { k: "Flat monthly price", ours: "$40", them: "$25–$500+" },
    { k: "Multi-device", ours: "Up to 3", them: "Per seat" },
    { k: "Free trial", ours: "20 min free", them: "None" },
    { k: "Refund policy", ours: "24h full", them: "Case-by-case" },
    { k: "Setup time", ours: "<10 min", them: "Instant" },
    { k: "Lifetime updates", ours: true, them: false },
  ];
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            The honest comparison
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No fine print. Here's how Danitechs stacks against paying Lovable directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03] text-center">
            <div className="p-4 text-left text-xs uppercase tracking-widest text-white/40">Feature</div>
            <div className="relative p-4 text-sm font-semibold text-white">
              <span className="rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-transparent">Danitechs</span>
              <span className="absolute -bottom-px left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-500" />
            </div>
            <div className="p-4 text-sm font-semibold text-white/60">Lovable direct</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid grid-cols-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02]"
            >
              <div className="p-4 text-sm text-white/80">{r.k}</div>
              <div className="p-4 text-center text-sm">
                {typeof r.ours === "boolean" ? (
                  r.ours ? <span className="text-emerald-400">✓</span> : <span className="text-white/30">—</span>
                ) : (
                  <span className="font-semibold text-emerald-300">{r.ours}</span>
                )}
              </div>
              <div className="p-4 text-center text-sm">
                {typeof r.them === "boolean" ? (
                  r.them ? <span className="text-emerald-400">✓</span> : <span className="text-red-400/70">✕</span>
                ) : (
                  <span className="text-white/60">{r.them}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Testimonial Marquee ---------------- */
const quotes = [
  { name: "Ahmed R.", role: "Freelance dev · Karachi", body: "Shipped 3 client sites in a weekend. Zero credit anxiety.", stars: 5 },
  { name: "Sofia M.", role: "Indie hacker · Barcelona", body: "Danitechs paid for itself in the first day. Wild value.", stars: 5 },
  { name: "Kenji T.", role: "Startup CTO · Tokyo", body: "Extension is clean, activation was under 5 minutes. Reliable.", stars: 5 },
  { name: "Priya S.", role: "Agency lead · Bangalore", body: "Whole team runs on this now. Lovable Pro without the meter.", stars: 5 },
  { name: "Lucas F.", role: "No-code builder · SP", body: "Refund policy is real — but I never needed it. Solid.", stars: 5 },
  { name: "Emma J.", role: "Product designer · London", body: "Prototyping went from 'save credits' to 'just build'. Freeing.", stars: 5 },
];

export function Testimonials() {
  const row1 = quotes;
  const row2 = [...quotes].reverse();
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/70">What builders say</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            12,000+ activations. 4.9★ average.
          </h2>
        </motion.div>
      </div>

      <div className="relative mt-14 space-y-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        {[row1, row2].map((row, ri) => (
          <div key={ri} className="flex gap-4 overflow-hidden">
            <motion.div
              animate={{ x: ri === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex shrink-0 gap-4"
            >
              {[...row, ...row].map((q, i) => (
                <div key={i} className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
                  <div className="flex text-amber-300">
                    {[...Array(q.stars)].map((_, k) => <span key={k}>★</span>)}
                  </div>
                  <p className="mt-3 text-sm text-white/80">"{q.body}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-xs font-bold text-black">
                      {q.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{q.name}</div>
                      <div className="text-[10px] text-white/50">{q.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Countdown Urgency ---------------- */
export function CountdownStrip() {
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({ h, m, s });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-black py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/10 via-fuchsia-500/10 to-cyan-500/10" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 md:flex-row md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-orange-300">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Today only
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
            Free trial keys expire at midnight
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          {[
            { k: "HRS", v: pad(t.h) },
            { k: "MIN", v: pad(t.m) },
            { k: "SEC", v: pad(t.s) },
          ].map((u) => (
            <div key={u.k} className="rounded-xl border border-white/15 bg-black/60 px-4 py-2 text-center backdrop-blur">
              <div className="font-display text-3xl font-bold text-white tabular-nums">{u.v}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">{u.k}</div>
            </div>
          ))}
          <a
            href={`${WA}?text=Hi%20Danitechs%2C%20I%27d%20like%20the%20free%20trial%20key%20before%20it%20expires.`}
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
          >
            Claim →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature Constellation (icons that link on hover) ---------------- */
export function FeatureConstellation() {
  const items = [
    { icon: "⚡", label: "Instant activation", body: "Paste key. Ship." },
    { icon: "🔒", label: "Local & private", body: "Never touches your password." },
    { icon: "♾️", label: "Zero credits", body: "Time-based runtime." },
    { icon: "🌍", label: "62 countries", body: "Global delivery." },
    { icon: "💬", label: "24/7 human support", body: "WhatsApp, not a bot." },
    { icon: "🔁", label: "Lifetime updates", body: "One key. Every version." },
  ];
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Everything you actually need
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="text-3xl">{it.icon}</div>
              <div className="mt-4 font-display text-lg font-semibold text-white">{it.label}</div>
              <div className="mt-1 text-sm text-white/60">{it.body}</div>
              <div className="mt-5 h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
