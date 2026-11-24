import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiHome,
  FiUser,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiMail,
} from "react-icons/fi";
import { profile } from "../data/profile";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");

  const links = [
    { name: "Home", href: "#hero", icon: FiHome, id: "hero" },
    { name: "About", href: "#about", icon: FiUser, id: "about" },
    { name: "Experience", href: "#experience", icon: FiBriefcase, id: "experience" },
    { name: "Skills", href: "#skills", icon: FiCode, id: "skills" },
    { name: "Projects", href: "#projects", icon: FiFolder, id: "projects" },
    { name: "Contact", href: "#contact", icon: FiMail, id: "contact" },
  ];

  // Observasi section yang sedang aktif di viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    if (window.__lenis) {
      window.__lenis.scrollTo(href === "#hero" ? 0 : href, {
        offset: href === "#hero" ? 0 : -40,
        duration: 1.2,
      });
    } else {
      const target = href === "#hero" ? document.body : document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP FLOATING NAVBAR (MD+)
         ======================================================== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
      >
        <div className="liquid-glass rounded-2xl flex items-center justify-between px-6 py-3.5 shadow-xl border border-white/40 dark:border-white/10 backdrop-blur-2xl">
          <span className="refraction-layer" aria-hidden />

          {/* Brand Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero", "hero")}
            className="font-display text-xl tracking-tight relative z-10 flex items-center gap-0.5 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{profile.brand}</span>
            <span className="text-accent inline-block transition-transform duration-300 group-hover:scale-150">
              .
            </span>
          </motion.a>

          {/* Desktop Menu Links */}
          <div className="flex items-center gap-1 lg:gap-2 text-sm font-medium relative z-10">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <a
                  key={l.id}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href, l.id)}
                  className={`relative px-4 py-1.5 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "text-black font-semibold dark:text-black"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavActivePill"
                      className="absolute inset-0 bg-accent rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.name}
                </a>
              );
            })}
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative z-10 p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-accent hover:text-black dark:hover:bg-accent dark:hover:text-black transition-colors"
            whileTap={{ scale: 0.85, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
          >
            {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* ========================================================
          2. MOBILE TOP MINIMAL BAR (MD:HIDDEN)
         ======================================================== */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:hidden fixed top-3 left-3 right-3 z-40 flex items-center justify-between pointer-events-none"
      >
        {/* Brand Pill */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero", "hero")}
          className="pointer-events-auto liquid-glass px-4 py-2 rounded-full flex items-center gap-1 font-display text-sm tracking-tight border border-white/30 dark:border-white/10 shadow-md"
        >
          <span className="refraction-layer" aria-hidden />
          <span>{profile.brand}</span>
          <span className="text-accent font-bold">.</span>
        </a>

        {/* Theme Toggle Pill */}
        <motion.button
          onClick={toggle}
          aria-label="Toggle theme"
          className="pointer-events-auto liquid-glass p-2.5 rounded-full border border-white/30 dark:border-white/10 shadow-md flex items-center justify-center hover:bg-accent active:scale-90 transition-transform"
          whileTap={{ scale: 0.85 }}
        >
          <span className="refraction-layer" aria-hidden />
          {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
        </motion.button>
      </motion.header>

      {/* ========================================================
          3. MOBILE BOTTOM DOCK NAVIGATION (MD:HIDDEN) - LIQUID GLASS
         ======================================================== */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.75rem)] max-w-sm pointer-events-auto"
      >
        <div className="liquid-glass rounded-full px-2 py-1.5 flex items-center justify-around shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/40 dark:border-white/15 backdrop-blur-2xl">
          <span className="refraction-layer" aria-hidden />

          {links.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className="relative flex flex-col items-center justify-center p-2 rounded-full min-w-[3rem] transition-colors"
                aria-label={item.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDockBubble"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className={`flex flex-col items-center transition-colors ${
                    isActive
                      ? "text-black"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[9px] font-medium tracking-tight mt-0.5 leading-none">
                    {item.name}
                  </span>
                </motion.div>
              </a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
