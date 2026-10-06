import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)] max-w-6xl"
      >
        <div className="glass-strong rounded-2xl flex items-center justify-between px-4 md:px-6 py-3">
          <motion.a href="#" className="font-display text-sm md:text-2xl tracking-tight"   whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {profile.brand}
            <span className="text-accent">.</span>
          </motion.a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {links.map((l, i) => (
              <motion.a key={l.name} href={l.href} className="hover:text-accent transition relative" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 + i * 0.08 }} whileHover={{ y: -2 }}>
                {l.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button onClick={toggle} aria-label="Toggle theme" className="glass p-2 rounded-full hover:bg-accent hover:text-black active:scale-90 transition" whileTap={{ scale: 0.85, rotate: 180 }} whileHover={{ scale: 1.1 }}>
              {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
            </motion.button>

            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="md:hidden glass p-2 rounded-full active:scale-90 transition">
              {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-6xl md:hidden"
          >
            <div className="glass-strong rounded-2xl p-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent hover:text-black active:bg-accent active:text-black transition">
                  {l.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
