import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import Magnetic from "./ui/Magnetic";
import Marquee from "./ui/Marquee";

export default function Hero() {
  return (
    <section className="pt-32 pb-0 px-6 relative overflow-visible">
      <div className="max-w-6xl mx-auto text-center">
        {/* HEADLINE STACK: my + portofolio + foto */}
        <div className="relative flex justify-center items-center pt-2 md:pt-3 lg:pt-4">
          {/* "my" — atas-kiri, font serif italic */}
          <motion.span
            className="absolute top-28 md:top-30 lg:top-32 left-2 md:left-8 lg:left-16 text-5xl md:text-7xl lg:text-8xl text-accent select-none z-30"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            my
          </motion.span>

          {/* Wrapper tengah: portofolio solid + foto + portofolio stroke */}
          <div className="relative grid place-items-center">
            {/* LAYER 1 — PORTOFOLIO solid */}
            <motion.span
              className="col-start-1 row-start-1 z-0 font-headline text-[16vw] md:text-[10rem] lg:text-[13rem] uppercase text-black dark:text-white select-none whitespace-nowrap"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
                WebkitTextStroke: "0.5px currentColor",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Portofolio
            </motion.span>

            {/* LAYER 2 — FOTO */}
            <motion.div
              className="col-start-1 row-start-1 z-20 relative w-[130vw] h-[85vh] md:w-[50rem] md:h-[95vh] lg:w-[66rem] lg:h-[105vh] flex items-end justify-center -translate-y-8 md:-translate-y-12 lg:-translate-y-16 pointer-events-none"
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative w-full h-full flex items-end justify-center"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-neutral-500 text-center px-2">
                    [ Foto cutout lo ]<br />
                    <code className="text-[10px]">public/profile.png</code>
                  </span>
                </div>
                <img
                  src="/profile.png"
                  alt={profile.name}
                  className="relative w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                  }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </motion.div>
            </motion.div>

            {/* LAYER 3 — PORTOFOLIO stroke (depan foto) */}
            <motion.span
              className="col-start-1 row-start-1 z-30 font-headline text-[16vw] md:text-[10rem] lg:text-[13rem] uppercase select-none whitespace-nowrap pointer-events-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #facc15",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Portofolio
            </motion.span>
          </div>
          <motion.span
            className="absolute bottom-2 md:bottom-4 lg:bottom-6 right-2 md:right-8 lg:right-16 text-sm md:text-lg lg:text-2xl uppercase tracking-[0.25em] font-medium text-accent select-none z-30 max-w-[14rem] md:max-w-[20rem] lg:max-w-[28rem] text-right leading-relaxed"
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 2.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.tagline}
          </motion.span>
        </div>

        {/* CTA */}
        <motion.div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.6 }}>
          <Magnetic strength={0.4}>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-accent dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              You need a developer <FiArrowUpRight />
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a href="#experience" className="inline-flex items-center justify-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-black hover:border-accent transition">
              Build something with me
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div className="mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1, duration: 0.8 }}>
        <Marquee items={profile.techStack} speed={28} />
      </motion.div>
    </section>
  );
}
