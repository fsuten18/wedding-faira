"use client";

import { AnimatePresence, motion } from "motion/react";
import { BubbleChat } from "./bubble-chat";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { dummyMessages } from "@/lib/config";

interface GuestMessagesProps {
  messages: Array<{
    id: string;
    name: string;
    message: string;
    created_at: string;
  }>;
}

interface FloatingScrollToBottomButtonProps {
  newMessagesCount: number;
  scrollToBottom: () => void;
}

export function DummyMessages({
  messages,
}: {
  messages: typeof dummyMessages;
}) {
  return (
    <>
      {/* Bubble Chat Messages */}
      {messages.map((message) => (
        <AnimatePresence key={message.id}>
          <BubbleChat
            avatar={message.avatar}
            name={message.name}
            message={message.message}
            image={message.image}
            timestamp={message.timestamp}
            linkMap={message.linkMap}
          />
        </AnimatePresence>
      ))}
    </>
  );
}

export function GuestMessages({ messages }: GuestMessagesProps) {
  return (
    <>
      {messages &&
        messages.map((msg) => (
          <AnimatePresence key={msg.id}>
            <BubbleChat
              name={msg.name}
              message={msg.message}
              timestamp={msg.created_at}
            />
          </AnimatePresence>
        ))}
    </>
  );
}

export function LoadingMessages() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: 100,
          opacity: 0,
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center size-10 bg-white rounded-full"
      >
        <Loader2 className="size-6 animate-spin text-blue-500" />
      </motion.div>
    </AnimatePresence>
  );
}

export function FloatingScrollToBottomButton({
  newMessagesCount,
  scrollToBottom,
}: FloatingScrollToBottomButtonProps) {
  const MotionButton = motion.create(Button);

  return (
    <AnimatePresence mode="wait">
      <MotionButton
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        exit={{
          opacity: 0,
        }}
        onClick={scrollToBottom}
        className="fixed bottom-28 right-4 md:right-72 z-50 size-12"
        size="icon"
      >
        {/* Count new messages */}
        {newMessagesCount > 0 && (
          <Badge className="absolute -top-2 -right-2 size-5">
            {newMessagesCount}
          </Badge>
        )}
        <ChevronDown className="size-6" />
      </MotionButton>
    </AnimatePresence>
  );
}
