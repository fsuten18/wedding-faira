"use client";

import { SITECONFIG } from "@/lib/config";
import { useJoinGroupStore } from "@/store";
import { CirclePause, Disc3 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isOpen } = useJoinGroupStore();
  const pathname = usePathname();

  // Check if we're on a call page
  const isOnCallPage = pathname === "/video-call" || pathname === "/voice-call";

  // Auto-play when user joins group
  useEffect(() => {
    if (isOpen && !userPaused && !isOnCallPage) {
      setIsPlaying(true);
    }
  }, [isOpen, userPaused, isOnCallPage]);

  // Pause when on call pages
  useEffect(() => {
    if (isOnCallPage) {
      setIsPlaying(false);
    } else if (isOpen && !userPaused) {
      // Resume when leaving call page (if user hasn't manually paused)
      setIsPlaying(true);
    }
  }, [isOnCallPage, isOpen, userPaused]);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        try {
          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                audioRef.current!.volume = 0.3;
              })
              .catch((error) => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
              });
          }
        } catch (error) {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    setUserPaused(!newPlayingState);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
      />
      <AnimatePresence mode="wait">
        <motion.div
          drag
          dragConstraints={containerRef}
          style={{
            position: "fixed",
            x: position.x,
            y: position.y,
            right: "0.5rem",
            bottom: "25%",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isOpen && !isOnCallPage ? { opacity: 1, y: 0 } : undefined}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="z-50 flex justify-center items-center cursor-grab active:cursor-grabbing"
          onDragEnd={(_, info) => {
            setPosition({
              x: position.x + info.offset.x,
              y: position.y + info.offset.y,
            });
          }}
        >
          <audio
            ref={audioRef}
            src={SITECONFIG.bgMusic}
            loop
            controls
            style={{ display: "none" }}
          />

          <Button
            variant={"noShadow"}
            size={"icon"}
            onClick={togglePlay}
            className="rounded-full bg-secondary-background pointer-events-auto"
          >
            {isPlaying ? (
              <Disc3 className="size-10 animate-spin" />
            ) : (
              <CirclePause className="size-10" />
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
