import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MaskedText({ text, position = "top-right", fontSize = "22vw", className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Geser horizontal paralaks
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  // Opacity naik-turun selama section terlihat
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 0.18, 0.18, 0]);

  // Clip-path reveal: dari bawah ke atas, tahan, lalu ketutup ke atas
  const clipPath = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]);

  const positions = {
    "top-right": "top-0 right-0 -translate-y-1/4 translate-x-[15%]",
    "top-left": "top-0 left-0 -translate-y-1/4 -translate-x-[15%]",
    "bottom-right": "bottom-0 right-0 translate-y-1/4 translate-x-[15%]",
    "bottom-left": "bottom-0 left-0 translate-y-1/4 -translate-x-[15%]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div ref={ref} aria-hidden className={`absolute pointer-events-none select-none ${positions[position]} ${className}`}>
      <motion.div style={{ x, opacity, clipPath }}>
        <span className="font-display font-bold leading-none whitespace-nowrap text-outline" style={{ fontSize }}>
          {text}
        </span>
      </motion.div>
    </div>
  );
}
