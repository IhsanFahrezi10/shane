import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";

const photos = [
  { src: "/gallery/grad.png", label: "Graduation", span: "col-span-2 md:col-span-2 row-span-2" },
  { src: "/gallery/vokasi.png", label: "Vokasi", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/vokasi-crew.png", label: "Vokasi Crew", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/sidang.png", label: "Sidang", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/tea-garden.png", label: "Tea Garden", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/hangout.png", label: "Hangout", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/night.png", label: "Night Out", span: "col-span-1 md:col-span-1 row-span-2" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl mb-8 md:mb-12 flex items-center gap-3">
          <Reveal>
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
          </Reveal>
          <AnimatedText text="With My Friends" />
        </h2>

        {/* Bento grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] md:auto-rows-[160px] gap-2 md:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(photo)}
              className={`group relative ${photo.span} rounded-xl md:rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={photo.src} alt={photo.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-105" onError={(e) => (e.currentTarget.style.display = "none")} />

              {/* Overlay — selalu keliatan di mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 flex items-end justify-between">
                <span className="text-white text-[10px] md:text-sm font-semibold tracking-wide drop-shadow-lg">{photo.label}</span>
                <span className="text-accent text-xs md:text-base">✦</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[300] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setSelected(null)}>
            <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-white font-display text-base md:text-2xl">{selected.label}</h3>
                <motion.button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-accent hover:text-black active:bg-accent active:text-black transition"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX size={20} />
                </motion.button>
              </div>

              <motion.div className="rounded-2xl overflow-hidden border-2 border-accent/50" initial={{ boxShadow: "0 0 0px rgba(250,204,21,0)" }} animate={{ boxShadow: "0 0 60px rgba(250,204,21,0.35)" }}>
                <img
                  src={selected.src}
                  alt={selected.label}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = '<div style="color:#888;padding:60px;text-align:center">[ Foto belum tersedia ]</div>';
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
