import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import GridBackground from "./components/GridBackground";
import FloatingIcons from "./components/FloatingIcons";
import ScrollProgress from "./components/ui/ScrollProgress";
import FloatingBlob from "./components/ui/FloatingBlob";
import { profile } from "./data/profile";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <div className="min-h-screen relative pb-24 md:pb-0">
        {/* Preloader dengan animated GSAP counter */}
        <Loader
          show={loading}
          brand={profile.brand}
          onFinish={() => setLoading(false)}
        />

        {/* Adaptive Cursor */}
        <Cursor />

        {/* Reading Progress */}
        <ScrollProgress />

        {/* Layer 1: Interactive Grid */}
        <GridBackground />

        {/* Layer 2: Ambient Yellow Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <FloatingBlob className="top-[10%] -left-20" delay={0} size={500} />
          <FloatingBlob className="top-[50%] -right-32" delay={2} size={600} />
          <FloatingBlob className="bottom-[5%] left-[30%]" delay={4} size={400} />
        </div>

        {/* Layer 3: Ambient Tech Floating Icons */}
        <FloatingIcons />

        {/* Navigasi: Desktop Floating Top + Mobile Liquid Glass Bottom Dock */}
        <Navbar />

        {/* Konten Utama */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certificates />
          <Gallery />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
