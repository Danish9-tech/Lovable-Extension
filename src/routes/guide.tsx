import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import guideVideo from "@/assets/Guide.webm";

const WA = "https://wa.me/66917219589?text=Hi%20Danitechs%2C%20I%20need%20help%20with%20the%20setup.";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Setup Guide — Danitechs" },
      { name: "description", content: "Complete installation & usage guide for Danitechs unlimited Lovable Pro access. Step-by-step screenshots and instructions." },
      { property: "og:title", content: "Setup Guide — Danitechs" },
      { property: "og:description", content: "Step-by-step guide to activate unlimited Lovable Pro with Danitechs." },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0 aurora-bg opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              Complete Setup Guide
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Installation & Usage Guide
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg">
              Welcome! Follow these simple steps to install and start building with Lovable Pro using <span className="text-white">0 credits</span> through Danitechs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5 text-sm text-amber-100/90"
          >
            <strong className="text-amber-300">Important:</strong> The extension needs some credits in your Lovable account to work. Lovable gives 5 free credits every day, and those same credits work here too. It will <strong>not</strong> work with 0 credits in your account.
          </motion.div>

          <div className="mt-20 space-y-16">
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Video Tutorial</h2>
              <p className="mt-3 text-sm text-white/50">Watch our detailed video guide to get you started easily.</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-2xl"
            >
              <video 
                src={guideVideo} 
                controls 
                className="w-full"
                poster="/hero-desktop.png"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 text-center"
          >
            <h3 className="font-display text-3xl font-semibold">You're all set! 🎉</h3>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              That's all the steps! For any issues or support, contact us directly on WhatsApp for a fast response.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                WhatsApp Support
              </a>
              <Link
                to="/"
                hash="pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore all plans
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
