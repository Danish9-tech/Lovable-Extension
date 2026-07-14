import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const OrbitCore = lazy(() => import("@/components/FuturisticShowcase").then(m => ({ default: m.OrbitCore })));
const HoloGrid = lazy(() => import("@/components/FuturisticShowcase").then(m => ({ default: m.HoloGrid })));
const TerminalStream = lazy(() => import("@/components/FuturisticShowcase").then(m => ({ default: m.TerminalStream })));

const NeuralConstellation = lazy(() => import("@/components/AdvancedFuturistic").then(m => ({ default: m.NeuralConstellation })));
const StatMatrix = lazy(() => import("@/components/AdvancedFuturistic").then(m => ({ default: m.StatMatrix })));
const CyberBeam = lazy(() => import("@/components/AdvancedFuturistic").then(m => ({ default: m.CyberBeam })));
const FeatureDeck = lazy(() => import("@/components/AdvancedFuturistic").then(m => ({ default: m.FeatureDeck })));
const MagneticCTA = lazy(() => import("@/components/AdvancedFuturistic").then(m => ({ default: m.MagneticCTA })));

const LiquidMorph = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.LiquidMorph })));
const KineticType = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.KineticType })));
const HoloPrism = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.HoloPrism })));
const GravityPlayground = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.GravityPlayground })));
const QuantumTunnel = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.QuantumTunnel })));
const DataRain = lazy(() => import("@/components/MaterialEra").then(m => ({ default: m.DataRain })));

const SavingsCalculator = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.SavingsCalculator })));
const BeforeAfter = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.BeforeAfter })));
const LiveActivity = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.LiveActivity })));
const ComparisonTable = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.ComparisonTable })));
const Testimonials = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.Testimonials })));
const CountdownStrip = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.CountdownStrip })));
const FeatureConstellation = lazy(() => import("@/components/ProductMaterial").then(m => ({ default: m.FeatureConstellation })));
import danitechsIcon from "@/assets/danitechs-icon.png.asset.json";
import wpss1 from "@/assets/wpss1.jpg.asset.json";
import wpss2 from "@/assets/wpss2.jpg.asset.json";
import wpss3 from "@/assets/wpss3.jpg.asset.json";
import wpss4 from "@/assets/wpss4.jpg.asset.json";
import wpss5 from "@/assets/wpss5.jpg.asset.json";

const chatShots = [
  { src: wpss1.url, tag: "Verified · Monthly" },
  { src: wpss2.url, tag: "Verified · Weekly" },
  { src: wpss3.url, tag: "Verified · Day Pass" },
  { src: wpss4.url, tag: "Verified · Monthly" },
  { src: wpss5.url, tag: "Verified · Monthly" },
];

export const Route = createFileRoute("/")({
  component: Index,
});

const WA_BASE = "https://wa.me/923362377416";
const waLink = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

const plans = [
  { id: "24h", name: "24 Hours", tag: "Quick try, full power", price: "$3", duration: "24 Hours", popular: false },
  { id: "3d", name: "3 Days", tag: "Weekend builds", price: "$7", duration: "3 Days", popular: false },
  { id: "7d", name: "7 Days", tag: "Sprint projects", price: "$15", duration: "7 Days", popular: true },
  { id: "15d", name: "15 Days", tag: "Two-week power user", price: "$25", duration: "15 Days", popular: false },
  { id: "30d", name: "30 Days", tag: "Best value monthly", price: "$40", duration: "30 Days", popular: false },
];

const features = [
  "Lovable unlimited prompts — 0 Credits Used",
  "Time-based AI coding access",
  "Full Pro Access",
  "Lifetime Updates",
  "24/7 Support",
];

const steps = [
  { n: "1", title: "Pick a plan", body: "Tap Buy Now on the plan you want." },
  { n: "2", title: "Pay your way", body: "Admin shares details for bKash, Card, PayPal, or USDT." },
  { n: "3", title: "Activate", body: "Paste the license key in the extension — done." },
];

const faqs = [
  { q: "How do I buy a plan?", a: "Tap any 'Buy Now' button. WhatsApp opens with your plan pre-filled. Admin replies with payment details and your license key." },
  { q: "How fast is delivery?", a: "Usually within 5–15 minutes during active hours. Worst case under 2 hours." },
  { q: "Is it safe for my Lovable account?", a: "Yes. The extension runs locally in your browser. It never asks for your Lovable password." },
  { q: "Do you offer refunds?", a: "Yes — if the extension fails to activate, we refund in full within 24 hours." },
  { q: "Multiple devices?", a: "Day Pass and Mini cover 1 device. Weekly covers 2. Monthly covers 3. Need more? Ask for a custom plan." },
];

function CountUp({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const t = setTimeout(() => mv.set(to), 300);
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    });
    return () => { clearTimeout(t); unsub(); };
  }, [mv, spring, to, prefix, suffix, decimals]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-32 pb-20">
      {/* Static background - no scroll-linked animation */}
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-40 h-[380px] w-[380px] rounded-full bg-fuchsia-500/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 top-80 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs text-white/80"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          No more running out of credits ⚡️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Stop struggling with
          <br />
          <span className="text-gradient">Lovable credit limits.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg"
        >
          Get instant time-based access to Lovable Pro with Danitechs. The ultimate AI web app builder for freelancers and no-code developers. Build without limits and zero credit anxiety. Activate on WhatsApp in under 3 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#pricing"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition-transform hover:scale-[1.04]"
          >
            View Plans →
          </a>
          <a
            href={waLink("Hi Danitechs, I have a question about your Lovable Pro plans.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/90 transition-transform hover:scale-[1.04] hover:bg-white/[0.08]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Mock browser - no parallax, no scanline overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_40px_100px_-20px_rgba(251,146,60,0.4)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <div className="ml-4 flex-1 rounded-md border border-white/10 bg-black/50 px-3 py-1 text-left font-mono text-[11px] text-white/50">
                lovable.dev — Pro unlocked
              </div>
            </div>
            <img src="/hero-desktop.png" alt="Danitechs activating unlimited prompts on Lovable Pro" className="w-full" loading="eager" width="1200" height="750" />
          </div>

          <div className="absolute -right-4 -top-4 hidden md:flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/80 px-3 py-1.5 text-xs font-semibold text-emerald-300 animate-float">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            0 Credits Used
          </div>
          <div className="absolute -left-4 bottom-8 hidden md:flex items-center gap-2 rounded-full border border-orange-400/40 bg-black/80 px-3 py-1.5 text-xs font-semibold text-orange-300 animate-float" style={{ animationDelay: "1.5s" }}>
            ⚡ Unlimited Prompts
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8"
        >
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              <CountUp to={12} suffix="k+" />
            </div>
            <div className="mt-1 text-xs text-white/50">Licenses sold</div>
          </div>
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              <CountUp to={4.9} decimals={1} />
            </div>
            <div className="mt-1 text-xs text-white/50">Buyer rating</div>
          </div>
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              &lt; <CountUp to={10} suffix="m" />
            </div>
            <div className="mt-1 text-xs text-white/50">Avg delivery</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function Marquee() {
  const items = ["⚡ Unlimited Prompts", "✓ 0 Credits Used", "🔒 Safe & Local", "🚀 Instant Delivery", "💬 24/7 Support", "🌍 Global Buyers", "♾ Full Pro Access", "🎯 Lifetime Updates"];
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-6">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-sm font-medium tracking-wide text-white/50">
            {t} <span className="ml-10 text-orange-400/60">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Trial() {
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-fuchsia-500/5 to-transparent p-10 text-center backdrop-blur"
        >
          <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
            20-Minute Free Trial
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Try the extension free for 20 minutes
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No payment required. Message us on WhatsApp and get a free trial license key instantly to test this AI builder extension before you buy. Build without credit anxiety.
          </p>
          <a
            href={waLink("Hi Danitechs 👋\n\nI'd like to claim the 20-minute FREE TRIAL license to test the Lovable Pro extension. Please send me a trial key. Thanks!")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Get Free Trial →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Pick your plan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Get time-based AI coding access with our Lovable extension. Unlimited prompts. Zero credits used — the perfect Lovable credit limit alternative.
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
            No credit limits · Lovable unlimited prompts on every plan
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
                p.popular
                  ? "border-orange-400/40 bg-gradient-to-b from-orange-500/10 to-transparent shadow-[0_0_60px_-15px_rgba(251,146,60,0.5)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-white/50">{p.tag}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-white">{p.price}</span>
                <span className="text-xs text-white/50">/ {p.duration}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 text-xs text-white/70">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`Hi Danitechs, I'd like to buy the ${p.name} plan (${p.price}). Please share payment details.`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-transform hover:scale-[1.03] ${
                  p.popular ? "bg-white text-black" : "border border-white/15 bg-white/[0.05] text-white"
                }`}
              >
                Buy Now
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          Need a custom or team plan?{" "}
          <a href={WA_BASE} target="_blank" rel="noreferrer" className="text-white underline hover:text-orange-300">
            Message us →
          </a>
        </p>
      </div>
    </section>
  );
}

function Customers() {
  return (
    <section id="customers" className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-white/40">Real chat screenshots</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Meet our recent customers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            See why builders love this freelancer web development AI tool. Actual chat screenshots from buyers on WhatsApp, Messenger & Instagram. Tap any image to zoom.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {chatShots.map((c, i) => (
            <motion.a
              key={i}
              href={c.src}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-emerald-500/10 to-black/50"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={c.src}
                  alt={`WhatsApp chat proof — ${c.tag}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white/90 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  WhatsApp
                </div>
              </div>
              <div className="border-t border-white/10 px-3 py-2 text-[10px] uppercase tracking-widest text-white/60">{c.tag}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section id="how" className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            How to use this Lovable developers tool
          </h2>
          <p className="mt-4 text-white/60">Three steps. Usually done in under 10 minutes.</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-fuchsia-500 font-display text-lg font-bold text-black">
                {s.n}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
          {["bKash", "Nagad", "USDT", "BTC", "ETH", "Wise", "Payoneer", "Card", "PayPal"].map((m) => (
            <span key={m} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-white"
      >
        <span className="font-medium">{q}</span>
        <span className={`text-2xl text-white/60 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-white/60">{a}</p>
      </motion.div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative bg-black py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-4xl font-semibold tracking-tight text-white md:text-5xl"
        >
          AI app builder subscription FAQ
        </motion.h2>
        <div className="mt-12">
          {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-black" />}>
          <LiveActivity />
          <KineticType />
          <OrbitCore />
          <BeforeAfter />
          <NeuralConstellation />
          <LiquidMorph />
          <FeatureConstellation />
        </Suspense>
        <Trial />
        <Pricing />
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-black" />}>
          <SavingsCalculator />
          <ComparisonTable />
          <StatMatrix />
          <CyberBeam />
          <HoloGrid />
          <HoloPrism />
          <FeatureDeck />
          <QuantumTunnel />
          <TerminalStream />
          <DataRain />
          <Testimonials />
        </Suspense>
        <Customers />
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-black" />}>
          <GravityPlayground />
        </Suspense>
        <How />
        <FAQ />
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-black" />}>
          <CountdownStrip />
          <MagneticCTA
            href="https://wa.me/923362377416?text=Hi%20Danitechs%2C%20I%27m%20ready%20to%20go%20infinite%20%E2%80%94%20share%20the%20plans."
            label="Activate Infinite Mode"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
