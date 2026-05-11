"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";
import { useChatImageStore } from "@/store";
import { AnimatePresence, motion } from "motion/react";
import BlurImage from "../ui/blur-image";
import BubleChatImageFullScreen from "./bubble-chat-image-fullscreen";

interface BubbleChatProps {
  avatar?: string;
  name: string;
  message: string;
  image?: string;
  linkMap?: string;
  timestamp?: string;
  className?: string;
}

export function BubbleChat({
  avatar,
  name,
  message,
  image,
  timestamp,
  className,
  linkMap,
}: BubbleChatProps) {
  const { isOpen, setIsOpen } = useChatImageStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 1, type: "spring", ease: "easeInOut" }}
      className={cn("flex gap-3 mb-4", className)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="size-12">
          <AvatarImage
            src={avatar}
            alt={name}
          />
          <AvatarFallback className="bg-yellow-400 text-black font-bold text-lg">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Container */}
      <div className="flex flex-col max-w-[80%]">
        {/* Message Bubble */}
        <div className="relative bg-gray-100 text-black rounded-2xl px-4 py-2">
          {/* Tail */}
          <div className="absolute -left-2 top-3 size-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-gray-100 border-b-[8px] border-b-transparent" />
          <div className="mb-2">
            <span className="font-bold text-black">{name}</span>
          </div>
          {/* Message Text */}
          {message && (
            <p className="font-medium leading-relaxed break-words mb-3">
              {message}
            </p>
          )}

          {/* Image */}
          {image && (
            <div className="mb-3">
              <BlurImage
                src={image}
                alt="Chat image"
                className="max-w-full h-auto rounded-lg shadow-md"
                width={300}
                height={300}
                onClick={() => setIsOpen(true)}
                loading="lazy"
              />
            </div>
          )}

          {/* Embed Google Map */}
          {linkMap && (
            <div className="mb-3">
              <iframe
                src={linkMap}
                width={300}
                height={200}
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
                className="w-full h-40 shadow-md"
              />
            </div>
          )}

          {/* Timestamp */}
          {timestamp && (
            <div className="text-xs opacity-70 text-right">
              {formatDate(new Date(timestamp))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && image && <BubleChatImageFullScreen image={image} />}
      </AnimatePresence>
    </motion.div>
  );
}
