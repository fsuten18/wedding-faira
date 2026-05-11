import AudioPlayer from "@/components/audio-player";
import React from "react";

export default function LayoutGroupChat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto">
      {children}
      <AudioPlayer />
    </div>
  );
}
