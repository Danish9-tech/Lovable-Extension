import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/liability")({
  head: () => ({
    meta: [
      { title: "Liability & Warranty — Danitechs" },
      { name: "description", content: "Important notice and liability information for Danitechs users." },
    ],
  }),
  component: LiabilityPage,
});

function LiabilityPage() {
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
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Liability & Warranty
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg">
              Important Notice for Danitechs Users
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 md:p-12 text-white/80"
          >
            <p>
              Danitechs is a third-party, custom extension and is NOT affiliated with, endorsed by, or officially connected to Lovable.
            </p>
            <p>
              This extension allows users to utilize Lovable Pro features and unlimited prompts without credit limits or subscriptions. While Lovable currently does not ban or suspend accounts for using such tools, we cannot guarantee future actions or policy changes by Lovable.
            </p>
            
            <div className="mt-8">
              <h2 className="mb-6 font-display text-2xl font-semibold text-white">Recommendations for Users</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-display text-sm font-bold text-emerald-400">
                    1
                  </div>
                  <p className="pt-1">
                    For your safety, we strongly recommend using a secondary Lovable account to work with this extension. This helps avoid any potential interruptions or loss of work if an account is suspended.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-display text-sm font-bold text-emerald-400">
                    2
                  </div>
                  <p className="pt-1">
                    You should always download your projects locally as a .zip file or transfer them to a safe location after completing your work.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200 leading-relaxed">
              <strong>Disclaimer:</strong> If you do not follow these recommendations, Danitechs and its creators accept NO LIABILITY for any account bans, suspensions, or data loss, although such events are currently unlikely.
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
