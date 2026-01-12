"use client";

import { motion } from "framer-motion";

export function AnimatedBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950"></div>
      
      {/* Animated mesh gradients */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.12) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute inset-0"
      />
      
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute inset-0"
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}