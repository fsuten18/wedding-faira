"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import BlurImage from "../ui/blur-image";

interface MediaPhotosProps {
  photos: string[];
}

export default function MediaPhotos({ photos }: MediaPhotosProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex flex-row gap-2 pb-3">
        {photos.map((photo, index) => (
          <PhotoItemWithFullScreen
            key={index}
            photo={photo}
            index={index}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function PhotoItemWithFullScreen({
  photo,
  index,
}: {
  photo: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="flex-shrink-0 cursor-pointer group h-60"
        onClick={() => setIsOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View photo ${index + 1} fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <div className="relative overflow-hidden rounded-lg w-32 h-60">
          <BlurImage
            src={photo}
            alt={`Media Photo ${index + 1}`}
            width={200}
            height={280}
            className="object-cover h-full w-fit transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} in fullscreen view`}
        >
          <div
            onClick={() => setIsOpen(false)}
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          >
            <BlurImage
              src={photo}
              alt={`Media Photo ${index + 1} Fullscreen`}
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              width={800}
              height={600}
              onClick={() => setIsOpen(false)}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
