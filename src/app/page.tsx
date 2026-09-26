"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Fingerprint } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Single Unified Video Ref for scrubbing
  const mainVidRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Perfectly tuned spring for butter-smooth scrubbing without lag or rubber-banding
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, 
    damping: 25,
    mass: 0.1,
    restDelta: 0.0005
  });

  // =========================
  // ANIMATION CHOREOGRAPHY
  // =========================
  // Stage 0 -> 1.00: Scrub 'untitled_design.mp4' from 0 to 100%
  // Stage 0.00 -> 0.20: Glistening sweep effect
  // Stage 0.55 -> 0.75: Drop statement for S-Curve
  // Stage 0.85 -> 0.95: Fade in CTA panel

  // Glistening Effect
  const glistenX = useTransform(smoothProgress, [0, 0.2], ["-100%", "200%"]);
  const glistenOpacity = useTransform(smoothProgress, [0, 0.1, 0.2], [0, 1, 0]);

  // S-Curve Drop Statement
  const statementY = useTransform(smoothProgress, [0.70, 0.75], [-100, 0]);
  const statementOpacity = useTransform(smoothProgress, [0.70, 0.75, 0.85, 0.90], [0, 1, 1, 0]);

  // CTA Panel
  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.95], [50, 0]);

  // Video Scrubbing Logic
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const latest = smoothProgress.get();

      if (mainVidRef.current) {
        // Scrub over the entire 0.00 to 1.00 scroll progress, stopping just shy of the very end to avoid black frames
        if (Number.isFinite(mainVidRef.current.duration) && mainVidRef.current.duration > 0) {
          mainVidRef.current.currentTime = latest * (mainVidRef.current.duration - 0.1);
        }
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothProgress]);

  return (
    <main className="bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-8 bg-transparent">
        {/* Left: Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <Fingerprint className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <span className="text-lg md:text-xl font-bold tracking-wider uppercase drop-shadow-md">IDStream</span>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/login" className="text-xs md:text-sm font-medium px-3 md:px-4 py-2 text-white/80 hover:text-white transition-colors duration-300 drop-shadow-md">
            Log In
          </Link>
          <Link href="/signup" className="text-xs md:text-sm font-medium px-4 md:px-5 py-2 md:py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Scrollytelling Container */}
      <div ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
          
          {/* Main Unified Video Layer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <video 
              ref={mainVidRef}
              src="/untitled_design.mp4" 
              className="w-full h-full object-contain md:object-cover max-w-7xl" 
              muted playsInline preload="auto"
            />
            {/* Watermark Concealer for baked-in video logo */}
            <div className="absolute top-0 right-0 w-[40%] h-[20%] bg-gradient-to-bl from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-[40%] h-[20%] bg-gradient-to-br from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
          </div>

          {/* Glistening Sweep Effect */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
            style={{ opacity: glistenOpacity }}
          >
            <motion.div 
              className="w-full h-full"
              style={{ 
                x: glistenX,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                transform: "skewX(-20deg)"
              }}
            />
          </motion.div>

          {/* S-Curve Drop Statement */}
          <motion.div 
            className="absolute top-1/4 w-full z-30 flex items-center justify-center pointer-events-none"
            style={{ y: statementY, opacity: statementOpacity }}
          >
            <div className="bg-[#050505]/70 backdrop-blur-md px-12 py-6 rounded-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-white/90 uppercase drop-shadow-2xl">
                Seamless Secure Expansion
              </h2>
            </div>
          </motion.div>

          {/* CTA Overlay (Responsive for Mobile and Desktop) */}
          <motion.div 
            className="absolute right-0 bottom-0 md:top-0 w-full md:w-[450px] h-2/5 md:h-full z-50 flex flex-col items-center md:items-start justify-center p-8 md:p-12 bg-gradient-to-t md:bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-center md:text-left uppercase">Generate</h2>
            <p className="text-base md:text-xl text-white/60 font-light mb-6 md:mb-10 text-center md:text-left uppercase text-xs tracking-widest">
              Create your digital student identity.
            </p>
            <Link href="/login" className="px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full md:w-auto text-center text-sm md:text-base pointer-events-auto">
              Start Generate Image
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full py-8 md:py-12 bg-[#050505] border-t border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Fingerprint className="w-6 h-6 text-white/40" />
            <span className="text-sm font-bold tracking-wider text-white/40 uppercase">IDStream</span>
          </div>
          <p className="text-sm text-white/40 font-medium uppercase tracking-widest">
            &copy; 2024 IDStream. Demo Project.
          </p>
        </div>
      </footer>
    </main>
  );
}
