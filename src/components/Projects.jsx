import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";
import CertificateModal from "./CertificateModal";

export default function Projects() {
  const [modal, setModal] = useState({ open: false, image: "", title: "" });

  const openPreview = (image, title) => setModal({ open: true, image, title });
  const closePreview = () => setModal({ ...modal, open: false });

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="liquid-glass p-8 md:p-12 lg:p-16">
          <span className="refraction-layer" aria-hidden />

          <h2 className="font-display text-4xl md:text-5xl mb-12 flex items-center gap-3">
            <Reveal>
              <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            </Reveal>
            <AnimatedText text="Projects" />
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {profile.projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <motion.div
                  className="glass group rounded-2xl overflow-hidden h-full flex flex-col"
                  whileHover={{
                    y: -6,
                    borderColor: "#FACC15",
                    boxShadow: "0 20px 50px -15px rgba(250,204,21,0.4), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  {/* Thumbnail */}
                  <button onClick={() => openPreview(project.image, project.title)} className="relative aspect-video w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => (e.currentTarget.style.display = "none")} />
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Year badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded-full bg-accent text-black z-10">{project.year}</span>
                  </button>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl md:text-2xl mb-2 leading-tight">{project.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-1">{project.desc}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {project.link && project.link !== "#" && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-accent hover:text-black transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Live <FiExternalLink size={12} />
                        </motion.a>
                      )}
                      <motion.button
                        onClick={() => openPreview(project.image, project.title)}
                        className="glass inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-accent hover:text-black transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Preview <FiArrowUpRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal open={modal.open} image={modal.image} title={modal.title} onClose={closePreview} />
    </section>
  );
}
