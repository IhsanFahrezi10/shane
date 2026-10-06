import { motion } from "framer-motion";
import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      {/* Wrapper full-width, gak ada margin */}
      <div className="relative w-full bg-black dark:bg-accent overflow-hidden shadow-[0_24px_80px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_24px_80px_-20px_rgba(250,204,21,0.35)]">
        {/* Inner highlight tepi */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 dark:ring-black/10" />

        {/* Sheen halus */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent dark:from-black/[0.06] pointer-events-none" />

        {/* Konten */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl mb-12 flex items-center gap-3 text-white dark:text-black">
              <Reveal>
                <span className="w-3 h-3 rounded-full bg-accent dark:bg-black inline-block" />
              </Reveal>
              <AnimatedText text="Skill & Tech Stack" />
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Keahlian */}
              <div>
                <Reveal>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-accent dark:text-black/70">Keahlian</h3>
                </Reveal>
                <ul className="space-y-2">
                  {profile.skills.map((s, i) => (
                    <Reveal key={s} delay={i * 0.1}>
                      <motion.li className="skill-item text-lg font-medium text-white dark:text-black cursor-default" whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                        — {s}
                      </motion.li>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <Reveal>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-accent dark:text-black/70">Tech Stack</h3>
                </Reveal>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.06,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [-2, 2, 0],
                      }}
                      className="px-3.5 py-2 text-sm rounded-full border border-white/20 dark:border-black/20 text-white dark:text-black cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
