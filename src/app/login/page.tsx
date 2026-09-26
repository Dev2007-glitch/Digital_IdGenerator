"use client";

import Link from "next/link";
import { Fingerprint, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050505] text-white flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain opacity-60 scale-[0.85] md:scale-[0.95]"
        src="/login.mp4"
      />
      
      {/* Watermark Concealer (Hides baked-in logo at top right with precise small mask) */}
      <div className="absolute top-[8%] right-[8%] w-48 h-16 bg-[#050505] blur-md z-10 pointer-events-none rounded-full" />

      {/* Navigation Overlay */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-8 bg-transparent">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Fingerprint className="w-8 h-8 text-white" />
          <span className="text-xl font-bold tracking-wider">IDStream</span>
        </Link>
        <Link href="/" className="text-sm font-medium px-5 py-2 text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full transition-all duration-300">
          Back to experience
        </Link>
      </nav>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[22rem] p-6 bg-transparent backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Fingerprint className="w-12 h-12 text-white mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-white/60 mt-2">Sign in to your IDStream account.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                placeholder="university@student.edu"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>
            <div className="flex justify-end pt-1">
              <Link href="#" className="text-xs text-white/50 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <Link
            href="/generate"
            className="w-full group flex items-center justify-center space-x-2 bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <div className="mt-8 text-center text-sm text-white/50">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline transition-all">
            Sign up now
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
