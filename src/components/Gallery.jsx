import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";

const photos = [
  { src: "/gallery/grad.png", label: "Grad", span: "col-span-2 md:col-span-2 row-span-2" },
  { src: "/gallery/sesi-1.png", label: "Sesi I", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/sesi-2.png", label: "Sesi II", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/sidankk.png", label: "Sidankk", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/trip.png", label: "Smoll Trip", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/photoshoot.png", label: "Photoshoot", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/bukber.png", label: "Bukeberr", span: "col-span-1 md:col-span-1 row-span-2" },
];

function PhotoCard({ photo, index, activeIndex, setActiveIndex }) {
  const isActive = activeIndex === index;

  return (
    <motion.div
      className={`group relative ${photo.span} rounded-xl md:rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 cursor-pointer`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setActiveIndex(isActive ? null : index)}
    >
      {/* Cuma foto yang membesar pas aktif */}
      <motion.img
        src={photo.src}
        alt={photo.label}
        className="w-full h-full object-cover"
        animate={{ scale: isActive ? 1.15 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Overlay label — selalu keliatan */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 flex items-end justify-between pointer-events-none">
        <span className="text-white text-[10px] md:text-sm font-semibold tracking-wide drop-shadow-lg">{photo.label}</span>
        <span className="text-accent text-xs md:text-base">✦</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="gallery" className="py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl mb-8 md:mb-12 flex items-center gap-3">
          <Reveal>
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
          </Reveal>
          <AnimatedText text="Me n THE Boiss" />
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] md:auto-rows-[160px] gap-2 md:gap-4">
          {photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
