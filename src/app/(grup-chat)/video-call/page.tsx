"use client";

import ActionsButtonCall from "@/components/actions-button-call";
import HeaderCall from "@/components/header-call";
import BlurImage from "@/components/ui/blur-image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { SITECONFIG } from "@/lib/config";

export default function VideoCallPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toParam = searchParams.get('to');

  useEffect(() => {
    const v = videoRef.current;
    if (!v || startedRef.current) return;
    startedRef.current = true;

    // Try to start playback (with sound)
    v.play().catch(() => {
      // Autoplay with sound may be blocked until user clicks something.
      // You can hook into your "Answer Call" button to call videoRef.current?.play()
    });

    return () => {
      try {
        v.pause();
        v.currentTime = 0;
      } catch { }
    };
  }, []);

  const handleEndCall = useCallback(() => {
    const path = toParam ? `/?to=${encodeURIComponent(toParam)}` : "/";
    toast.success("Panggilan video berakhir", {
      onAutoClose: () => router.push(path),
    });
  }, [router, toParam]);

  const handleEnded = useCallback(() => {
    const path = toParam ? `/?to=${encodeURIComponent(toParam)}` : "/";
    router.push(path);
  }, [router, toParam]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 items-center justify-center h-dvh w-full relative"
    >
      {/* Header */}
      <HeaderCall />

      {/* Body render video */}
      <div className="w-full h-full z-0">
        <video
          ref={videoRef}
          src={SITECONFIG.videoCall}
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={handleEnded}
        />
      </div>

      <motion.div
        drag
        dragConstraints={containerRef}
        style={{
          position: "absolute",
          x: position.x,
          y: position.y,
          bottom: "8rem",
          right: "1.25rem",
        }}
        className="w-[96px] h-auto overflow-hidden cursor-grabbing z-50"
        onDragEnd={(_, info) => {
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
        }}
      >
        <BlurImage
          src={`/assets/off-cam-image.png`}
          alt="off-cam-image"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-md"
          draggable={false}
          loading="lazy"
        />
      </motion.div>

      {/* Actions button */}
      <ActionsButtonCall onEndCall={handleEndCall} />
    </div>
  );
}
