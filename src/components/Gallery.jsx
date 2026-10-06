import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";

/* Bento layout — span disesuaikan sama rasio foto */
const photos = [
  { src: "/gallery/grad.png", label: "Grad", span: "col-span-2 md:col-span-4 row-span-2" },
  { src: "/gallery/sesi-2.png", label: "Sesi-2", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/sesi-1.png", label: "Sesi-1", span: "col-span-1 md:col-span-2 row-span-2" },
  { src: "/gallery/sidankk.png", label: "Sidankk", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/trip.png", label: "Smoll Trip", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/photoshoot.png", label: "Photoshoot", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/gallery/bukber.png", label: "Bukeberr", span: "col-span-1 md:col-span-2 row-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl mb-12 flex items-center gap-3">
          <Reveal>
            <span className="w-3 h-3 rounded-full bg-accent inline-block" />
          </Reveal>
          <AnimatedText text="Me and THE Boiss" />
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`group relative ${photo.span} rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/10 cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <img src={photo.src} alt={photo.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => (e.currentTarget.style.display = "none")} />

              {/* Overlay gradient + label pas hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-xs md:text-sm font-semibold tracking-wide">{photo.label}</span>
                <span className="text-accent text-base">✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
