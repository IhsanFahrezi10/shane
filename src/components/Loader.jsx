import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function Loader({ show, brand, onFinish }) {
  const [percent, setPercent] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    // Animasi counter 0 ke 100 dengan easing custom
    tl.to(counterObj, {
      val: 100,
      duration: 1.4,
      ease: "power3.inOut",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col justify-between p-6 md:p-12 text-white select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400 font-mono">
            <span>Portfolio 2026</span>
            <span>Medan, ID</span>
          </div>

          {/* Center Brand */}
          <div className="text-center">
            <motion.div
              className="font-display text-5xl md:text-8xl tracking-tighter flex items-center justify-center gap-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{brand}</span>
              <motion.span
                className="text-accent inline-block"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                .
              </motion.span>
            </motion.div>
            <p className="mt-2 text-neutral-400 font-serif italic text-lg md:text-xl">
              Creative Web Engineer
            </p>
          </div>

          {/* Bottom Counter & Progress Bar */}
          <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex justify-between items-end font-mono text-xs text-neutral-400">
              <span>SYSTEM LOADING</span>
              <span className="text-2xl font-bold text-accent font-display">
                {String(percent).padStart(2, "0")}%
              </span>
            </div>

            {/* Glowing kinetic track */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent shadow-[0_0_12px_#facc15]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
