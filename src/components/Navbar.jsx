import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { profile } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import Magnetic from "./ui/Magnetic";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const links = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 1.8, ease: [0.22, 1, 0.36, 1] }} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <div className="glass-strong rounded-2xl flex items-center justify-between px-4 md:px-6 py-3">
        <motion.a href="#" className="font-display text-xl md:text-2xl tracking-tight" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {profile.brand}
          <span className="text-accent">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l, i) => (
            <motion.a key={l.name} href={l.href} className="hover:text-accent transition relative" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 + i * 0.08 }} whileHover={{ y: -2 }}>
              {l.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <motion.button onClick={toggle} aria-label="Toggle theme" className="glass p-2 rounded-full hover:bg-accent hover:text-black transition" whileTap={{ scale: 0.85, rotate: 180 }} whileHover={{ scale: 1.1 }}>
            {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
