import { motion } from "framer-motion";

export default function FloatingBlob({ className = "", delay = 0, size = 400 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 dark:opacity-30 ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, #FACC15 0%, #EAB308 40%, transparent 70%)",
      }}
      animate={{
        x: [0, 60, -30, 0],
        y: [0, -50, 40, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
