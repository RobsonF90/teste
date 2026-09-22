import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Flash {
  id: number;
  x: number; // 10% - 90%
  y: number; // 10% - 85%
  size: number; // in pixels
  color: 'white' | 'gold' | 'cyan';
  flareScale: number;
}

export default function CameraFlashEffect() {
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const [ambientIntensity, setAmbientIntensity] = useState<number>(0);
  const flashIdRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const triggerFlashBurst = () => {
      if (!isMountedRef.current) return;

      // 1 to 3 flashes in a burst (mimicking paparazzi / strobe bursts)
      const count = Math.random() > 0.65 ? (Math.random() > 0.5 ? 3 : 2) : 1;
      const colors: ('white' | 'gold' | 'cyan')[] = ['white', 'gold', 'white', 'white', 'cyan'];

      for (let i = 0; i < count; i++) {
        const delay = i * (80 + Math.random() * 90);

        setTimeout(() => {
          if (!isMountedRef.current) return;

          const newFlash: Flash = {
            id: ++flashIdRef.current,
            x: 10 + Math.random() * 80,
            y: 12 + Math.random() * 70,
            size: 100 + Math.random() * 120,
            color: colors[Math.floor(Math.random() * colors.length)],
            flareScale: 0.8 + Math.random() * 0.6,
          };

          setFlashes((prev) => [...prev.slice(-6), newFlash]);

          // Ambient atmospheric room illumination spike
          setAmbientIntensity(0.18 + Math.random() * 0.18);
          setTimeout(() => {
            if (isMountedRef.current) {
              setAmbientIntensity(0);
            }
          }, 110);

          // Clean up this flash after animation finishes
          setTimeout(() => {
            if (isMountedRef.current) {
              setFlashes((prev) => prev.filter((f) => f.id !== newFlash.id));
            }
          }, 320);
        }, delay);
      }

      // Schedule next burst after a dynamic interval (quick bursts interspersed with pauses)
      const nextInterval = Math.random() > 0.4 ? (600 + Math.random() * 1200) : (1800 + Math.random() * 1800);
      timeoutId = setTimeout(triggerFlashBurst, nextInterval);
    };

    // Initial trigger
    timeoutId = setTimeout(triggerFlashBurst, 900);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Ambient background flash lighting that highlights the hero image */}
      <div
        className="absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-100 ease-out pointer-events-none"
        style={{ opacity: ambientIntensity }}
      />
      <div
        className="absolute inset-0 bg-amber-100/30 mix-blend-screen transition-opacity duration-100 ease-out pointer-events-none"
        style={{ opacity: ambientIntensity * 0.8 }}
      />

      {/* Paparazzi & Stage Point Flashes */}
      <AnimatePresence>
        {flashes.map((flash) => {
          const isGold = flash.color === 'gold';
          const isCyan = flash.color === 'cyan';
          const flareColor = isGold
            ? 'rgba(234, 214, 140, 0.9)'
            : isCyan
            ? 'rgba(180, 240, 255, 0.9)'
            : 'rgba(255, 255, 255, 0.95)';

          return (
            <div
              key={flash.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none"
              style={{
                left: `${flash.x}%`,
                top: `${flash.y}%`,
                width: `${flash.size}px`,
                height: `${flash.size}px`,
              }}
            >
              {/* Radial Glow Halo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 0.95, 0],
                  scale: [0.3, 1.4, 1.8],
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full mix-blend-screen"
                style={{
                  background: `radial-gradient(circle, ${flareColor} 0%, rgba(255, 255, 255, 0.7) 20%, rgba(197, 160, 40, 0.25) 50%, transparent 75%)`,
                }}
              />

              {/* Brilliant White Core */}
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.2, 0.8],
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-4 h-4 bg-white rounded-full shadow-[0_0_24px_8px_rgba(255,255,255,1)]"
              />

              {/* Anamorphic Horizontal Lens Flare Ray */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scaleX: [0.1, 1.5 * flash.flareScale, 2 * flash.flareScale],
                }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className="absolute w-36 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mix-blend-screen"
              />

              {/* Anamorphic Vertical Lens Flare Ray */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleY: [0.1, 1.3 * flash.flareScale, 1.8 * flash.flareScale],
                }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="absolute h-28 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent mix-blend-screen"
              />

              {/* Diagonal 4-Point Star Rays */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{
                  opacity: [0, 0.75, 0],
                  scale: [0.2, 1.1, 1.4],
                  rotate: 45,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mix-blend-screen"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{
                  opacity: [0, 0.75, 0],
                  scale: [0.2, 1.1, 1.4],
                  rotate: -45,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mix-blend-screen"
              />
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
