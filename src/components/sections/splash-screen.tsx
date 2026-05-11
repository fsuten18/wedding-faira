"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SITECONFIG } from "@/lib/config";

export default function SplashScreen() {
  const MotionImage = motion.create(Image);

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full bg-background">
      <MotionImage
        key="splash-screen-image"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        src={SITECONFIG.logoSplashScreen}
        alt="logo"
        width={1000}
        height={1000}
        className="w-[500px] h-auto object-cover"
      />
    </div>
  );
}
