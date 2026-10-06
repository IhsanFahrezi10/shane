import { useEffect } from "react";

export default function GridBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = null;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      root.style.setProperty("--mx", `${lastX}px`);
      root.style.setProperty("--my", `${lastY}px`);
      raf = null;
    };

    const move = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Mouse glow */}
      <div className="absolute inset-0 grid-glow hidden md:block" />

      {/* Fade bawah */}
      <div className="absolute inset-0 grid-fade" />
    </div>
  );
}
