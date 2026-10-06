import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";
import CertificateModal from "./CertificateModal";

/* Card satu pengalaman dengan foto swipe + timeline zigzag */
function ExperienceCard({ item, side = "left", index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Swipe horizontal: foto bergeser dari kiri ke kanan seiring scroll
  const x = useTransform(scrollYProgress, [0, 1], side === "left" ? [-80, 80] : [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  const [modal, setModal] = useState({ open: false, image: "", title: "" });
  const openCert = (image, title) => setModal({ open: true, image, title });
  const closeCert = () => setModal({ ...modal, open: false });

  return (
    <>
      <div ref={ref} className="relative">
        <div className={`flex flex-col md:flex-row md:items-center gap-6 ${side === "right" ? "md:flex-row-reverse" : ""}`}>
          {/* Foto swipe */}
          <motion.div style={{ x, rotate, opacity }} className="relative w-full md:w-1/2 shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-2 ring-accent/40 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              {item.certImage ? (
                <img src={item.certImage} alt={item.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                  <span className="text-xs text-neutral-500">[ Foto {item.title.split("—")[0].trim()} ]</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* Year badge di foto */}
              <span className="absolute top-4 left-4 text-xs font-mono px-3 py-1 rounded-full bg-accent text-black">{item.year}</span>
            </div>
          </motion.div>

          {/* Teks */}
          <Reveal delay={index * 0.05} className="w-full md:w-1/2 md:px-8">
            <h4 className="font-display text-xl md:text-2xl lg:text-3xl mb-3 leading-tight">{item.title}</h4>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">{item.desc}</p>
            {item.certImage && (
              <motion.button
                onClick={() => openCert(item.certImage, item.title)}
                className="glass inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent hover:text-black transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Certificate <FiArrowUpRight size={14} />
              </motion.button>
            )}
          </Reveal>
        </div>
      </div>

      <CertificateModal open={modal.open} image={modal.image} title={modal.title} onClose={closeCert} />
    </>
  );
}

export default function Experience() {
  const groups = profile.experiences;
  let globalIndex = 0;

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="liquid-glass p-8 md:p-12 lg:p-16">
          <span className="refraction-layer" aria-hidden />

          <h2 className="font-display text-4xl md:text-5xl mb-16 flex items-center gap-3">
            <Reveal>
              <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            </Reveal>
            <AnimatedText text="Experiences" />
          </h2>

          <div className="space-y-24 md:space-y-32">
            {groups.map((group, gi) => (
              <div key={group.type}>
                {/* Label grup */}
                <Reveal>
                  <div className="flex items-center gap-4 mb-12 justify-center">
                    <span className="w-8 md:w-16 h-px bg-accent/60" />
                    <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-bold">{group.type}</h3>
                    <span className="w-8 md:w-16 h-px bg-accent/60" />
                  </div>
                </Reveal>

                <div className="space-y-20 md:space-y-28">
                  {group.items.map((item) => {
                    const side = globalIndex % 2 === 0 ? "left" : "right";
                    const idx = globalIndex;
                    globalIndex++;
                    return <ExperienceCard key={item.title} item={item} side={side} index={idx} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
