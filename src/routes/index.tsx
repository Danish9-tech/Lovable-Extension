import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import proofVideo from "@/assets/Proof.mp4.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

const WA_BASE = "https://wa.me/66917219589";
const waLink = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

function LazyRender({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "600px", once: true });
  return <div ref={ref} className="w-full">{isInView ? children : <div className="h-32" />}</div>;
}

function Hero() {
  var videoRef = useRef<HTMLVideoElement>(null);
  var [videoPlaying, setVideoPlaying] = useState(false);
  var playVideo = useCallback(function () {
    if (videoRef.current) { videoRef.current.play(); videoRef.current.playbackRate = 2; setVideoPlaying(true); }
  }, []);
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020202] pt-32 pb-20 border-b border-white/5">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-900/10 blur-[120px]" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-400"
        >
          🔥 Trusted by 12,000+ builders worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Build on <span className="text-cyan-400">Lovable.dev.</span>
          <br />
          <span className="text-orange-500">Use Zero Credits.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl leading-relaxed"
        >
          Danitechs gives you full Lovable Pro access — unlimited prompts, zero credits consumed — starting at $3. Activate in 3 minutes via WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={waLink("Hi Danitechs 👋\n\nI'd like to claim the 20-minute FREE TRIAL license.")}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-600 px-8 py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] transition-transform hover:scale-[1.03]"
          >
            🆓 Try Free 20 Minutes — No Payment
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/[0.08]"
          >
            View Plans → from $3
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-[13px] font-medium text-white/50"
        >
          <span className="flex items-center gap-1.5"><span className="text-emerald-400 text-base">✅</span> Full refund if it fails</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400 text-base">✅</span> No Lovable login needed</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400 text-base">✅</span> Runs locally in your browser</span>
        </motion.div>
        
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-[0_0_80px_-20px_rgba(6,182,212,0.2)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0A0A0A] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <div className="ml-4 flex-1 rounded-md border border-white/5 bg-white/[0.02] px-3 py-1 text-center font-mono text-[11px] text-white/40">
                lovable.dev/projects/infinite
              </div>
            </div>
            <div className="relative aspect-[16/9] w-full bg-[#050505] flex items-center justify-center overflow-hidden group cursor-pointer" onClick={playVideo}>
                <img src="/hero-desktop.png" alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-80 mix-blend-screen'}`} />
                <video src={proofVideo} muted loop playsInline preload="none" ref={videoRef} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-80 mix-blend-screen' : 'opacity-0'}`} />
                
                {!videoPlaying && <div className="absolute inset-0 flex items-center justify-center z-10"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-3xl transition-transform group-hover:scale-110"><svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 ml-1"><path d="M8 5v14l11-7z"/></svg></div></div>}
                
                {/* Simulated UI Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 rounded-3xl border border-emerald-500/30 bg-black/60 px-10 py-8 backdrop-blur-xl shadow-2xl">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">
                        <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-20"></span>
                        ✨
                    </span>
                    <div className="text-center">
                        <div className="font-display font-bold text-white text-2xl tracking-tight">Pro Unlocked</div>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            0 Credits Used
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofBar() {
  return (
    <div className="border-b border-white/5 bg-[#0A0A0A] py-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="mx-auto flex w-max md:w-auto max-w-7xl items-center justify-center gap-x-8 md:gap-x-12 px-6 text-[13px] md:text-sm font-medium text-white/60">
            <span className="flex items-center gap-2">⭐⭐⭐⭐⭐ <span className="text-white">4.9 Rating</span></span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-2">🔑 <span className="text-white">12,000+ Licenses Sold</span></span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-2">⚡ <span className="text-white">3-Min Activation</span></span>
            <span className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-2">🌍 <span className="text-white">Pakistan · Nigeria · India · Philippines</span></span>
        </div>
    </div>
  );
}

function TheProblem() {
  return (
    <section className="bg-[#020202] py-24 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <LazyRender>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center font-display text-3xl font-bold text-white md:text-5xl tracking-tight"
          >
            Lovable credits were never designed<br className="hidden md:block" /> for serious builders.
          </motion.h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: "💸", title: "Credit Drain", desc: "One project can eat 150+ prompts. Design changes, bug fixes, UI polish — every prompt costs you." },
              { icon: "⛔", title: "Build Interruption", desc: "Your flow state breaks every time the credit warning appears. Momentum killed. Deadline slipping." },
              { icon: "📈", title: "Scaling Costs", desc: "5 client projects × $50 in credits each = $250/month. Before you've charged a single client." },
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="rounded-2xl border border-red-500/10 bg-gradient-to-b from-red-500/[0.03] to-transparent p-8 transition-colors hover:border-red-500/20"
              >
                <div className="text-4xl grayscale hover:grayscale-0 transition-all">{item.icon}</div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </LazyRender>
      </div>
    </section>
  );
}

function TheSolution() {
  return (
    <section className="bg-[#050505] py-24 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <LazyRender>
          <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white md:text-5xl tracking-tight">
                  Danitechs removes the credit wall. <span className="text-emerald-400">Permanently.</span>
              </h2>
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  A Chrome extension that routes your Lovable.dev prompts through our AI — consuming zero credits from your account. Full Pro access. Any plan.
              </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
              {[
                  { icon: "⚡", title: "Unlimited Prompts", desc: "No cap. Ever. Keep building." },
                  { icon: "🔒", title: "0 Credits Consumed", desc: "Your balance never moves." },
                  { icon: "⏱️", title: "3-Min Activation", desc: "License key delivered via WhatsApp." },
                  { icon: "💬", title: "24/7 WhatsApp Support", desc: "Real human support. Fast response." },
                  { icon: "🔄", title: "Full Refund Guarantee", desc: "If it fails on your setup — instant refund." },
                  { icon: "🔁", title: "Lifetime Updates", desc: "Always kept current with Lovable." },
              ].map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className="flex gap-5 items-start"
                  >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-2xl">
                          {f.icon}
                      </div>
                      <div className="pt-1">
                          <h4 className="font-bold text-lg text-white">{f.title}</h4>
                          <p className="mt-1 text-sm text-white/50">{f.desc}</p>
                      </div>
                  </motion.div>
              ))}
          </div>
        </LazyRender>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-[#020202] py-24 border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <LazyRender>
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl tracking-tight">
            From zero to unlimited builds in 3 minutes
          </h2>
          
          <div className="mt-20 grid gap-12 md:grid-cols-3 relative">
              <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-px border-t-2 border-dashed border-white/10"></div>
              {[
                  { step: "STEP 1", title: "Choose Your Plan", desc: "Select a plan that fits your project timeline." },
                  { step: "STEP 2", title: "Message on WhatsApp", desc: "Pay securely & get your license key instantly." },
                  { step: "STEP 3", title: "Paste License Key", desc: "See 'Pro Unlocked'. Build forever." },
              ].map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-black font-bold text-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] border-4 border-[#020202]">
                          {i + 1}
                      </div>
                      <div className="mt-6 text-[11px] font-bold tracking-widest text-orange-500 uppercase">{s.step}</div>
                      <h3 className="mt-2 text-xl font-bold text-white">{s.title}</h3>
                      <p className="mt-2 text-sm text-white/60 px-4">{s.desc}</p>
                  </div>
              ))}
          </div>
          
          <div className="mt-20 text-center">
              <p className="text-lg font-medium text-white italic text-white/80">"Then just build. Your credit counter stays at zero."</p>
              <div className="mt-8">
                  <a
                      href={waLink("Hi Danitechs 👋\n\nI'd like to claim the 20-minute FREE TRIAL license to test the Lovable Pro extension. Please send me a trial key.")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-col items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 px-8 py-6 transition-all hover:bg-white/[0.06] hover:border-white/20"
                  >
                      <span className="text-lg font-bold text-white flex items-center gap-2">
                        🆓 Start Your Free 20-Minute Trial
                      </span>
                      <span className="mt-2 text-sm text-white/50">No payment. Message us on WhatsApp — key arrives in minutes.</span>
                  </a>
              </div>
          </div>
        </LazyRender>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "24 Hours", price: "$3", tag: "Perfect for one project", link: "24 Hours plan ($3)" },
    { name: "3 Days", price: "$7", tag: "Weekend sprint", link: "3 Days plan ($7)" },
    { name: "7 Days", price: "$15", tag: "Full week of unlimited builds", popular: true, link: "7 Days plan ($15)" },
    { name: "15 Days", price: "$25", tag: "2-week project run", link: "15 Days plan ($25)" },
    { name: "30 Days", price: "$40", tag: "Monthly agency plan", link: "30 Days plan ($40)" },
  ];

  return (
    <section id="pricing" className="bg-[#050505] py-24 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <LazyRender>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Builder-first pricing. <br className="md:hidden" />No subscriptions. No surprises.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Start with 24 hours for $3. Scale when you're ready. Cancel anytime.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-5">
            {plans.map((p, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={p.name}
                className={`group relative flex w-[260px] flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                  p.popular
                    ? "border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-[#020202] shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]"
                    : "border-white/10 bg-[#020202] hover:border-white/20"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black flex items-center gap-1 shadow-lg">
                    ⭐ Most Popular
                  </span>
                )}
                <div className="text-center pb-5 border-b border-white/10">
                    <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                    <div className="mt-3 text-4xl font-bold text-white">{p.price}</div>
                </div>
                <div className="mt-5 flex-1 flex items-center justify-center text-center">
                    <p className="text-sm font-medium text-white/60 leading-relaxed">{p.tag}</p>
                </div>
                <a
                  href={waLink(`Hi Danitechs, I'd like to buy the ${p.link}. Please share payment details.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold transition-colors ${
                    p.popular 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {p.popular ? "Get Now ★" : "Get Now"}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm font-medium text-white/50 space-y-3">
            <p className="flex items-center justify-center gap-2">
                <span className="text-lg">🔄</span> All plans include: Unlimited prompts · Full Pro features · 24/7 support · Lifetime updates
            </p>
            <p className="flex items-center justify-center gap-2">
                <span className="text-lg">💬</span> Need a team plan? <a href={waLink("I need a custom team plan")} target="_blank" rel="noreferrer" className="text-white underline hover:text-orange-400">Message us on WhatsApp for custom pricing.</a>
            </p>
            <p className="flex items-center justify-center gap-2">
                <span className="text-lg">🛡️</span> Every plan backed by our 24-hour full refund guarantee.
            </p>
          </div>
        </LazyRender>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Monthly Cost", free: "$0", pro: "$150", us: "$40" },
    { feature: "Prompts", free: "Limited", pro: "Unlimited", us: "Unlimited" },
    { feature: "Credits Used", free: "Yes", pro: "Yes", us: "0 ✅" },
    { feature: "Custom Domain", free: "❌", pro: "✅", us: "✅" },
    { feature: "Private Projects", free: "❌", pro: "✅", us: "✅" },
    { feature: "Activation Time", free: "Instant", pro: "Instant", us: "3 minutes" },
    { feature: "Free Trial", free: "❌", pro: "❌", us: "✅ 20 minutes" },
    { feature: "Refund Guarantee", free: "❌", pro: "Standard", us: "✅ 24-hour full" },
    { feature: "Support", free: "Community", pro: "Email", us: "WhatsApp 24/7" },
  ];

  return (
    <section className="bg-[#020202] py-24 border-b border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <LazyRender>
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-white md:text-5xl tracking-tight">
                    Danitechs vs. Official Lovable Pro <br className="hidden md:block" />— The honest comparison
                </h2>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0A0A]">
                <table className="w-full min-w-[600px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02]">
                            <th className="p-5 font-semibold text-white/60">Feature</th>
                            <th className="p-5 font-semibold text-white/60">Lovable Free</th>
                            <th className="p-5 font-semibold text-white/60">Lovable Pro ($150/mo)</th>
                            <th className="p-5 font-bold text-orange-400 bg-orange-500/5">Danitechs ($40/mo)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rows.map((r, i) => (
                            <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                                <td className="p-5 font-medium text-white">{r.feature}</td>
                                <td className="p-5 text-white/50">{r.free}</td>
                                <td className="p-5 text-white/50">{r.pro}</td>
                                <td className="p-5 font-bold text-white bg-orange-500/5">{r.us}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-6 text-center text-xs text-white/40 italic">
                Danitechs is an independent Chrome extension. Not affiliated with Lovable.dev.
            </p>
        </LazyRender>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Ahmed R.", country: "Pakistan", flag: "🇵🇰", plan: "7-Day Plan", text: "Built my entire SaaS MVP in 4 days. Zero credits used. This is unreal." },
    { name: "Daniel O.", country: "Nigeria", flag: "🇳🇬", plan: "30-Day Plan", text: "Saves me $110 every month vs. official Lovable Pro. Activated in 90 seconds." },
    { name: "Priya S.", country: "India", flag: "🇮🇳", plan: "7-Day Plan", text: "Was skeptical. Free trial convinced me instantly. On my 3rd renewal now." },
  ];

  return (
    <section className="bg-[#050505] py-24 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <LazyRender>
            <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl tracking-tight">
                Real builders. Real activations. Real results.
            </h2>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
                {reviews.map((r, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-[#020202] p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-900 font-bold text-white border border-white/10">
                                {r.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-white">{r.name} {r.flag}</div>
                                <div className="text-xs text-white/50">{r.country}</div>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            <span className="text-orange-400 text-xs">⭐⭐⭐⭐⭐</span>
                            <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/70 uppercase">{r.plan}</span>
                        </div>
                        <p className="mt-4 text-sm font-medium text-white/80 leading-relaxed italic">"{r.text}"</p>
                    </div>
                ))}
            </div>
        </LazyRender>
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
        className="flex w-full items-center justify-between py-6 text-left text-white"
      >
        <span className="font-semibold pr-4">{q}</span>
        <span className={`text-xl font-light text-white/40 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-[15px] text-white/60 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: "Will my Lovable.dev account get banned?", a: "No. Danitechs runs entirely locally in your browser. It does not log into your Lovable account, does not interact with Lovable's servers in any flaggable way, and does not require your Lovable credentials at any point." },
    { q: "Does it really use zero of my Lovable credits?", a: "Yes. Your Lovable credit counter stays at its current number throughout your entire session. You can verify this yourself during the free 20-minute trial before spending a cent." },
    { q: "What happens when my plan expires?", a: "Your Danitechs access ends and Lovable returns to normal credit behavior. You can renew instantly via WhatsApp — same 3-minute process." },
    { q: "Is the WhatsApp activation safe?", a: "Completely. You never share passwords or account details. You simply receive a license key string, paste it into the extension, and you're live." },
    { q: "What if it doesn't work on my setup?", a: "We offer a full refund within 24 hours if the extension fails to activate correctly on your setup. No forms, no delays, no arguments. Message us on WhatsApp and it's done." },
    { q: "Which browsers does it work on?", a: "Currently Chrome and all Chromium-based browsers (Brave, Edge, Arc). Firefox support coming soon." },
    { q: "Can I use it on multiple devices?", a: "One license key works on one browser session at a time. For multiple devices simultaneously, contact us for a team plan." },
    { q: "Do you offer team or agency plans?", a: "Yes. Message us on WhatsApp with your team size and we'll create a custom plan. Most agency plans start at $60–$80/month for 3–5 seats." },
    { q: "How is payment made?", a: "We accept PayPal, card payments, and USDT. Message us on WhatsApp to receive payment details after choosing your plan." },
    { q: "Is the 20-minute free trial really free?", a: "100% free. No card required. No commitment. Message us on WhatsApp, we send a time-limited trial key, you test the extension live. If you like it — pick a plan. If not — no hard feelings." },
  ];

  return (
    <section id="faq" className="bg-[#020202] py-24 border-b border-white/5">
      <div className="mx-auto max-w-3xl px-6">
        <LazyRender>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Every question — answered honestly.
          </h2>
          <div className="mt-14">
            {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
          </div>
        </LazyRender>
      </div>
    </section>
  );
}

function PreFooterCTA() {
    return (
        <section className="bg-[#050505] py-24">
            <div className="mx-auto max-w-4xl px-6">
                <LazyRender>
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111] to-[#050505] p-10 md:p-16 text-center shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                        <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
                            🆓 Try Danitechs Free for 20 Minutes
                        </h2>
                        <div className="mt-6 space-y-2 text-lg text-white/60">
                            <p>No payment. No card. No commitment.</p>
                            <p>One WhatsApp message — license key arrives in minutes.</p>
                        </div>
                        <div className="mt-10">
                            <a
                                href={waLink("Hi Danitechs 👋\n\nI'd like to claim the 20-minute FREE TRIAL license.")}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105"
                            >
                                💬 Message Us on WhatsApp →
                            </a>
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-white/40">
                            <span className="flex items-center gap-2">✅ Full refund if it fails</span>
                            <span className="flex items-center gap-2">✅ 12,000+ builders trust this</span>
                        </div>
                    </div>
                </LazyRender>
            </div>
        </section>
    )
}

function Index() {
  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProofBar />
        <TheProblem />
        <TheSolution />
        <HowItWorks />
        <Pricing />
        <ComparisonTable />
        <Testimonials />
        <FAQ />
        <PreFooterCTA />
      </main>
      <Footer />
    </div>
  );
}
