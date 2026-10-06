import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";

export default function Footer() {
  return (
    <footer className="relative w-full mt-20">
      <div className="w-full bg-black dark:bg-accent rounded-t-[2rem] md:rounded-t-[4rem] px-6 py-12 md:py-16 relative overflow-hidden">
        {/* Sheen halus */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent dark:from-black/[0.06] pointer-events-none" />

        {/* Inner highlight tepi atas */}
        <div className="absolute top-0 left-10% right-10% h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-black/40" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl text-white dark:text-black mb-4">
              {profile.brand}
              <span className="text-accent dark:text-black">.</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm text-white/60 dark:text-black/60 mb-8">
              © {new Date().getFullYear()} {profile.brand}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-accent dark:text-black/70">
              <span className="w-8 h-px bg-accent/60 dark:bg-black/30" />
              <span>Righty Tighty, Lefty Loosey</span>
              <span className="w-8 h-px bg-accent/60 dark:bg-black/30" />
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
