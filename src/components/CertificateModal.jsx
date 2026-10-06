import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function CertificateModal({ open, image, title, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}>
          {/* Backdrop */}
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-4xl w-full"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong flex items-center justify-between mb-4 px-4 py-3 rounded-xl">
              <h3 className="text-white font-display text-lg md:text-2xl">{title}</h3>
              <motion.button onClick={onClose} className="p-2 rounded-full bg-white/10 text-white hover:bg-accent hover:text-black transition" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} aria-label="Close">
                <FiX size={20} />
              </motion.button>
            </div>

            <motion.div
              className="glass-strong rounded-2xl overflow-hidden flex items-center justify-center min-h-[40vh] ring-2 ring-accent/50"
              initial={{ boxShadow: "0 0 0px rgba(250,204,21,0)" }}
              animate={{ boxShadow: "0 0 60px rgba(250,204,21,0.35)" }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-auto max-h-[75vh] object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = '<span style="color:#888;padding:40px;font-size:14px">[ Gambar sertifikat belum tersedia ]</span>';
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
