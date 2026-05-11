"use client";

import { Camera, Mic, PhoneOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ActionsButtonCallProps {
  onEndCall?: () => void;
}

export default function ActionsButtonCall({ onEndCall }: ActionsButtonCallProps) {
  const router = useRouter();
  
  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full p-6 bg-[#55A8B6] gap-x-4 rounded-t-3xl">
      <Camera className="size-10 text-white shrink-0" />
      <Mic className="size-10 text-white shrink-0" />
      <div
        onClick={handleEndCall}
        className="p-4 bg-rose-500 rounded-full cursor-pointer"
      >
        <PhoneOff className="size-4 text-white" />
      </div>
    </div>
  );
}
