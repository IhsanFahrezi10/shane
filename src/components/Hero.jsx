import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import Magnetic from "./ui/Magnetic";
import Marquee from "./ui/Marquee";

export default function Hero() {
  const containerRef = useRef(null);

  // Motion values untuk 3D cursor parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics untuk pergerakan halus (organik)
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Multi-depth layer translations
  // Layer 1 (Teks solid di belakang foto): gerak menjauh berlawanan arah
  const bgTextX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const bgTextY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // Layer 2 (Foto subjek): gerak searah kursor
  const photoX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const photoRotate = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);

  // Layer 3 (Teks stroke di depan foto): efek pop-out lebih agresif
  const fgTextX = useTransform(smoothX, [-0.5, 0.5], [-32, 32]);
  const fgTextY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Listener posisi kursor ternormalisasi (-0.5 sampai 0.5)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pt-24 md:pt-32 pb-0 px-4 md:px-6 relative overflow-visible"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* HEADLINE STACK WITH 3D DEPTH */}
        <div className="relative flex justify-center items-center pt-2 md:pt-3 lg:pt-4">
          {/* "my" — atas-kiri */}
          <motion.span
            className="absolute top-14 md:top-24 lg:top-28 left-2 md:left-8 lg:left-16 text-4xl md:text-7xl lg:text-8xl text-accent select-none z-30 pointer-events-none"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1,
            }}
            initial={{ opacity: 0, x: -40, y: 15 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            my
          </motion.span>

          {/* Tagline — kanan bawah */}
          <motion.span
            className="absolute bottom-2 md:bottom-6 lg:bottom-8 right-2 md:right-8 lg:right-16 text-[9px] md:text-sm lg:text-base uppercase tracking-[0.2em] md:tracking-[0.25em] font-medium text-accent select-none z-30 max-w-[8rem] md:max-w-[16rem] text-right leading-relaxed pointer-events-none"
            initial={{ opacity: 0, x: 40, y: -15 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.tagline}
          </motion.span>

          {/* Wrapper Portofolio + Foto Cutout */}
          <div className="relative grid place-items-center w-full">
            {/* LAYER 1 — Solid Typography (Di belakang) */}
            <motion.span
              style={{
                x: bgTextX,
                y: bgTextY,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
                WebkitTextStroke: "0.5px currentColor",
              }}
              className="col-start-1 row-start-1 z-0 font-headline text-[14vw] md:text-[10rem] lg:text-[13rem] uppercase text-black dark:text-white select-none whitespace-nowrap will-change-transform"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Portofolio
            </motion.span>

            {/* LAYER 2 — Cutout Foto Subjek (Tengah) */}
            <motion.div
              style={{
                x: photoX,
                y: photoY,
                rotate: photoRotate,
              }}
              className="col-start-1 row-start-1 z-20 relative w-[95vw] h-[55vh] md:w-[50rem] md:h-[95vh] lg:w-[66rem] lg:h-[105vh] flex items-end justify-center -translate-y-4 md:-translate-y-12 lg:-translate-y-16 pointer-events-none will-change-transform"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative w-full h-full flex items-end justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/profile.png"
                  alt={profile.name}
                  className="relative w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] filter brightness-105"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                  }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </motion.div>
            </motion.div>

            {/* LAYER 3 — Stroke Typography (Di depan foto menghasilkan efek tembus 3D) */}
            <motion.span
              style={{
                x: fgTextX,
                y: fgTextY,
                color: "transparent",
                WebkitTextStroke: "1.5px #facc15",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
              }}
              className="col-start-1 row-start-1 z-30 font-headline text-[14vw] md:text-[10rem] lg:text-[13rem] uppercase select-none whitespace-nowrap pointer-events-none will-change-transform"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Portofolio
            </motion.span>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 relative z-30"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Magnetic strength={0.35}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-accent dark:text-black px-6 py-3.5 rounded-full font-semibold hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] active:scale-95 transition-all text-sm md:text-base group"
            >
              <span>You need a developer</span>
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.35}>
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 glass px-6 py-3.5 rounded-full font-semibold hover:bg-accent hover:text-black hover:border-accent active:scale-95 transition-all text-sm md:text-base"
            >
              Explore Experience
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* VELOCITY KINETIC MARQUEE (SLOWMO) */}
      <motion.div
        className="mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Marquee items={profile.techStack} speed={0.45} />
      </motion.div>
    </section>
  );
}
