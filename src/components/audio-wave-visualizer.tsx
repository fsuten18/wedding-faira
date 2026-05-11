"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AudioWaveVisualizerProps {
  isPlaying?: boolean;
  barsCount?: number;
  className?: string;
}

export default function AudioWaveVisualizer({
  isPlaying = true,
  barsCount = 5,
  className = "",
}: AudioWaveVisualizerProps) {
  const [bars] = useState(() =>
    Array.from({ length: barsCount }, (_, i) => ({
      id: i,
      delay: i * 0.1,
    }))
  );

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-1.5 bg-white rounded-full"
          initial={{ height: 8 }}
          animate={
            isPlaying
              ? {
                  height: [8, 32, 16, 40, 12, 28, 8],
                  opacity: [0.5, 1, 0.7, 1, 0.6, 0.9, 0.5],
                }
              : { height: 8, opacity: 0.5 }
          }
          transition={
            isPlaying
              ? {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar.delay,
                }
              : {
                  duration: 0.3,
                }
          }
        />
      ))}
    </div>
  );
}
