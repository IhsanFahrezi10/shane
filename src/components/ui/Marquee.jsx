import { useEffect, useRef, useState } from "react";

export default function Marquee({ items, speed = 0.45 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let currentX = 0;
    let animId;

    const track = trackRef.current;
    if (!track) return;

    // Duplikasi konten untuk loop tak hingga yang mulus
    const halfWidth = track.scrollWidth / 2;

    const loop = () => {
      // Ambil velocity dari Lenis jika tersedia (momentum scroll)
      const velocity = window.__lenis?.velocity || 0;

      // Jika di-hover, perlambat ekstra (super slowmo) untuk kenyamanan baca
      const baseSpeed = isHoveredRef.current ? speed * 0.3 : speed;
      const scrollBoost = Math.abs(velocity) * 0.05;

      const delta = baseSpeed + scrollBoost;

      currentX -= delta;
      if (Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="liquid-glass overflow-hidden whitespace-nowrap w-full py-5 rounded-2xl border border-white/30 dark:border-white/10 group cursor-default"
    >
      <span className="refraction-layer" aria-hidden />
      <div
        ref={trackRef}
        className="inline-flex items-center gap-12 will-change-transform select-none"
      >
        {/* Render 4 set untuk menjamin kelancaran seamless di layar ultra-wide */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-12">
            <span className="font-display text-2xl md:text-3xl tracking-tight text-neutral-800 dark:text-neutral-200 transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#facc15] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
