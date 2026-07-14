import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import s1 from "@/assets/guide/step-1.png";
import s2 from "@/assets/guide/step-2.png";
import s3 from "@/assets/guide/step-3.png";
import s4 from "@/assets/guide/step-4.png";
import s5 from "@/assets/guide/step-5.png";
import s6 from "@/assets/guide/step-6.png";
import s7 from "@/assets/guide/step-7.png";
import s8 from "@/assets/guide/step-8.png";
import s9 from "@/assets/guide/step-9.png";
import s10 from "@/assets/guide/step-10.png";
import s11 from "@/assets/guide/step-11.png";
import s12 from "@/assets/guide/step-12.png";
import s13 from "@/assets/guide/step-13.png";
import s14 from "@/assets/guide/step-14.png";
import s15 from "@/assets/guide/step-15.png";
import s16 from "@/assets/guide/step-16.png";
import s17 from "@/assets/guide/step-17.png";
import s18 from "@/assets/guide/step-18.png";
import s19 from "@/assets/guide/step-19.png";
import s20 from "@/assets/guide/step-20.png";
import s21 from "@/assets/guide/step-21.png";
import s22 from "@/assets/guide/step-22.png";
import s23 from "@/assets/guide/step-23.png";
import s24 from "@/assets/guide/step-24.png";

const WA = "https://wa.me/923362377416?text=Hi%20Danitects%2C%20I%20need%20help%20with%20the%20setup.";

const steps: { img: string; text: string }[] = [
  { img: s1, text: "First, get the Danitects access kit by contacting us on WhatsApp." },
  { img: s2, text: "Extract the zip file into a local folder on your computer." },
  { img: s3, text: "Go to the Extensions Manager in your Chrome browser." },
  { img: s4, text: "Or open the extensions page directly by typing `chrome://extensions` in the address bar." },
  { img: s5, text: "Enable Developer mode (top right corner) if it's not already enabled." },
  { img: s6, text: "Click the 'Load unpacked' button to load the extension from the folder." },
  { img: s7, text: "Select the extension folder that you extracted earlier." },
  { img: s8, text: "The extension will now appear in your extensions page as shown." },
  { img: s9, text: "The extension pop-up will appear on the Lovable website. If not, reload the page and click the Danitects icon." },
  { img: s10, text: "Get your trial license key or the key you purchased from Danitects." },
  { img: s11, text: "Paste the key into the extension key box and activate it." },
  { img: s12, text: "Once activated correctly, you'll see the duration countdown." },
  { img: s13, text: "Click the box icon to move the extension to the sidebar for a better experience." },
  { img: s14, text: "It will now appear in the sidebar like a VS Code-style AI chatbox." },
  { img: s15, text: "Log in to your Lovable account and open a project (or create a new one — creating uses your own credit)." },
  { img: s16, text: "You'll see a green message confirming your project is synced. If not, refresh a few times until it appears." },
  { img: s17, text: "Use the extension's prompt box the same way as the native one — this is the recommended chat mode." },
  { img: s18, text: "You'll see 'prompt sent' and the message will appear in the Lovable chat and start working." },
  { img: s19, text: "Preview: the prompt was sent and the AI worked — but 0 credits were consumed." },
  { img: s20, text: "Enable Standard Chat Mode to use the native Lovable prompt box. You can even hide the extension after this." },
  { img: s21, text: "When activated correctly, you'll see the Danitects badge above the prompt box." },
  { img: s22, text: "Write any prompt and continue. For plan mode, use the extension's prompt box (approving plans from native chat costs credits)." },
  { img: s23, text: "Preview: prompts sent through native chat with the badge — 0 credits used." },
  { img: s24, text: "You can always download a local copy of your project as a backup or self-deploy it on any server." },
];

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Setup Guide — Danitects" },
      { name: "description", content: "Complete installation & usage guide for Danitects unlimited Lovable Pro access. Step-by-step screenshots and instructions." },
      { property: "og:title", content: "Setup Guide — Danitects" },
      { property: "og:description", content: "Step-by-step guide to activate unlimited Lovable Pro with Danitects." },
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
              Welcome! Follow these simple steps to install and start building with Lovable Pro using <span className="text-white">0 credits</span> through Danitects.
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
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Step-by-Step Tutorial</h2>
              <p className="mt-3 text-sm text-white/50">Detailed screenshots to get you started easily.</p>
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-[80px_1fr] md:gap-8"
              >
                <div className="flex md:justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300 font-display text-xl font-bold text-black shadow-[0_0_30px_rgba(251,146,60,0.4)]">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-white/80 md:text-lg">{step.text}</p>
                  <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-2xl">
                    <img
                      src={step.img}
                      alt={`Danitects setup step ${i + 1}`}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
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
