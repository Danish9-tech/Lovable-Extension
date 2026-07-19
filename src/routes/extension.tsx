import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const WA_TRIAL = "https://wa.me/923362377416?text=Hi%20Danitechs%20%F0%9F%91%8B%0A%0AI%27d%20like%20to%20claim%20the%20FREE%20TRIAL%20license%20to%20test%20the%20extension.%20Please%20send%20me%20a%20trial%20key.%20Thanks!";


export const Route = createFileRoute("/extension")({
  head: () => ({
    meta: [
      { title: "Download Extension — Danitechs" },
      { name: "description", content: "Download the official Danitechs Chrome extension for unlimited Lovable Pro access. Always up-to-date build with a free 30-minute trial." },
      { property: "og:title", content: "Download Extension — Danitechs" },
      { property: "og:description", content: "Official Chrome extension for unlimited Lovable Pro access." },
    ],
  }),
  component: ExtensionPage,
});

function ExtensionPage() {
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
              Danitechs Extension
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Download Extension
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg">
              Choose the version for your device. Always the official, up-to-date build.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
              ✅ Official version · always updated
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 md:p-12"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300 shadow-[0_0_40px_rgba(251,146,60,0.4)]">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-black" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 016.32 4H12a3 3 0 00-2.83 4H6.34A7 7 0 0112 5zm-7 7c0-.34.03-.67.08-1L8.5 17.24A7 7 0 015 12zm7 7c-.34 0-.67-.03-1-.08L14.5 13a3 3 0 000-2h4.42A7 7 0 0112 19zm0-5a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold md:text-3xl">Chrome Desktop</h2>
              <p className="mt-3 text-sm text-white/60">Official installer — ready to load into Chrome.</p>

              <a
                href="https://drive.google.com/drive/folders/1ARtpW0gOazUkiGNzT-5aikbgQapcD7xS?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download for Chrome
              </a>

              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
                ⚠️ The extension only works on desktop Chrome. No mobile support.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70"
          >
            <strong className="text-white">Important:</strong> The extension needs some credits in your Lovable account to work. Lovable gives 5 free credits every day, and those same credits work here too. It will <strong>not</strong> work with 0 credits in your account.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-orange-500/10 to-amber-500/10 p-10 text-center"
          >
            <h3 className="font-display text-3xl font-semibold md:text-4xl">Try it free for 30 minutes</h3>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              No strings attached. Get an instant free trial license and test the extension right now.
            </p>
            <a
              href={WA_TRIAL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Get Free Trial
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-white/50">
              Need help installing?{" "}
              <Link to="/guide" className="text-white underline underline-offset-4 hover:text-amber-300">
                Read the full setup guide →
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
