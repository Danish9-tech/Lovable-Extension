import { Link } from "@tanstack/react-router";

const WA = "https://wa.me/923362377416";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300">
                <span className="h-3 w-3 rounded-full bg-black" />
              </span>
              <span className="text-base font-semibold tracking-wide">Danitechs</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/50">
              Time-based Lovable Pro access. Unlimited prompts, zero credit anxiety. Activated on WhatsApp in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="/#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/#how" className="hover:text-white">How it works</a></li>
              <li><a href="/#faq" className="hover:text-white">FAQ</a></li>
              <li><Link to="/liability" className="hover:text-white">Liability & Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href={WA} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Support</a></li>
              <li><a href="#pricing" className="hover:text-white">Get a license</a></li>
              <li><a href={WA} target="_blank" rel="noreferrer" className="hover:text-white">Free 20-min trial</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Danitechs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
