import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ show, brand }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center" initial={{ opacity: 1 }} exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div className="font-display text-6xl md:text-8xl text-white flex items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {brand}
            <motion.span className="text-accent" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 200 }}>
              .
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
