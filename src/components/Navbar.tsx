import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Extension", href: "/extension" },
  { label: "Guide", href: "/guide" },
  { label: "FAQ", href: "/#faq" },
];

const WA = "https://wa.me/923362377416?text=Hi%20Danitects%2C%20I%20have%20a%20question%20about%20your%20Lovable%20Pro%20plans.";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.6]);
  const blur = useTransform(scrollY, [0, 200], [0, 20]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2"
    >
      <motion.div
        style={{
          background: useTransform(bgOpacity, (o) => `rgba(10,10,15,${o})`),
          backdropFilter: useTransform(blur, (b) => `blur(${b}px) saturate(160%)`),
        }}
        className="flex h-14 items-center justify-between rounded-full border border-white/10 px-4 md:px-6 bg-black/40 backdrop-blur-xl"
      >
        <Link to="/" className="flex items-center gap-2 font-display">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-orange-400 to-amber-300 shadow-[0_0_20px_rgba(251,146,60,0.5)]">
            <span className="h-3 w-3 rounded-full bg-black" />
          </span>
          <span className="text-sm font-semibold tracking-wide">
            Danitects
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          <span>WhatsApp</span>
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </motion.div>
    </motion.header>
  );
}
