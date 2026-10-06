import { motion } from "framer-motion";

export default function Marquee({ items, speed = 30 }) {
  return (
    <div className="glass overflow-hidden whitespace-nowrap w-full py-6 rounded-2xl">
      <motion.div className="inline-flex items-center gap-12" animate={{ x: ["0%", "-50%"] }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-12">
            <span className="font-display text-2xl md:text-4xl tracking-tight">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
