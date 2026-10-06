import { useState } from "react";
import { motion } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";
import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";
import CertificateModal from "./CertificateModal";

export default function Certificates() {
  const [modal, setModal] = useState({ open: false, image: "", title: "" });

  const openCert = (image, title) => setModal({ open: true, image, title });
  const closeCert = () => setModal({ ...modal, open: false });

  return (
    <section id="certificates" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="liquid-glass p-8 md:p-12 lg:p-16">
          <span className="refraction-layer" aria-hidden />

          <h2 className="font-display text-4xl md:text-5xl mb-4 flex items-center gap-3">
            <Reveal>
              <span className="w-3 h-3 rounded-full bg-accent inline-block" />
            </Reveal>
            <AnimatedText text="Certificates" />
          </h2>
          <Reveal delay={0.1}></Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {profile.certificates.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.05}>
                <motion.button
                  onClick={() => openCert(cert.image, cert.title)}
                  className="glass group relative w-full aspect-[4/3] rounded-xl overflow-hidden text-left"
                  whileHover={{
                    y: -6,
                    borderColor: "#FACC15",
                    boxShadow: "0 20px 40px -15px rgba(250,204,21,0.45), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => (e.currentTarget.style.display = "none")} />
                  {/* Overlay gradient + info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-20 md:mb-24 max-w-xl">{cert.title}</p>
                    <p className="text-accent text-[10px] md:text-xs uppercase tracking-wider">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>

                  {/* Icon expand */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiMaximize2 size={12} />
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal open={modal.open} image={modal.image} title={modal.title} onClose={closeCert} />
    </section>
  );
}
