"use client";

import ActionsButtonCall from "@/components/actions-button-call";
import AudioWaveVisualizer from "@/components/audio-wave-visualizer";
import HeaderCall from "@/components/header-call";
import LogoGroup from "@/components/ui/logo-group";
import { SITECONFIG } from "@/lib/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
const MAX_SECONDS = 60;

export default function VoiceCallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [, setDuration] = useState<number>(0); // total duration (sec)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // format helper
  const fmt = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${fmt(m)}:${fmt(s)}`;
  }, [seconds]);

  // Init audio, play, and wire time updates
  useEffect(() => {
    const a = new Audio(SITECONFIG.voiceCall);
    audioRef.current = a;
    a.preload = "auto";
    a.loop = false;

    const onLoadedMeta = () => {
      setDuration(Math.floor(a.duration || 0));
    };
    const onTimeUpdate = () => {
      setSeconds(Math.floor(a.currentTime || 0));
    };
    const onEnded = () => {
      setIsPlaying(false);
      const path = toParam ? `/?to=${encodeURIComponent(toParam)}` : "/";
      toast("Call ended, Thank you for calling", {
        onAutoClose: () => router.push(path),
      });
    };
    const onPlay = () => {
      setIsPlaying(true);
    };
    const onPause = () => {
      setIsPlaying(false);
    };

    a.addEventListener("loadedmetadata", onLoadedMeta);
    a.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("ended", onEnded);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    // Try to autoplay (silently fail if blocked)
    a.play().catch(() => {
      // If autoplay is blocked, user interaction elsewhere can call audioRef.current?.play()
      // We keep UI unchanged per your request.
    });

    return () => {
      a.removeEventListener("loadedmetadata", onLoadedMeta);
      a.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      try {
        a.pause();
      } catch {}
      audioRef.current = null;
    };
  }, [router, toParam]);

  // Optional: stop at MAX_SECONDS even if audio is longer
  useEffect(() => {
    if (seconds >= MAX_SECONDS && audioRef.current) {
      audioRef.current.pause();
      const path = toParam ? `/?to=${encodeURIComponent(toParam)}` : "/";
      toast("Call ended, Thank you for calling", {
        onAutoClose: () => router.push(path),
      });
    }
  }, [seconds, router, toParam]);

  const handleEndCall = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const path = toParam ? `/?to=${encodeURIComponent(toParam)}` : "/";
    toast.success("Panggilan suara berakhir", {
      onAutoClose: () => router.push(path),
    });
  }, [router, toParam]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-dvh w-full bg-[#55A8B6] py-20">
      {/* Header */}
      <HeaderCall />
      {/* Body */}
      <div className="w-full flex flex-col gap-y-4 items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="text-white text-xl font-bold">
            {SITECONFIG.brideName} & {SITECONFIG.groomName}
          </p>
          {/* unchanged style; only content now includes duration */}
          <p className="text-white text-2xl">{timeText}</p>
        </div>

        <LogoGroup className="size-56" />
        {/* Audio Wave Visualizer */}
        <AudioWaveVisualizer
          isPlaying={isPlaying}
          barsCount={5}
          className="h-8 mt-10"
        />
      </div>
      {/* Action button */}
      <ActionsButtonCall onEndCall={handleEndCall} />
    </div>
  );
}
