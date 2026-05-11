import { dummyMessages } from "@/lib/config";
import { useWritingStore } from "@/store";
import { useEffect, useState } from "react";

export function useDummyMessages() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const { isWriting, setIsWriting, setCurrentWritingName } = useWritingStore();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Dummy Messages
  useEffect(() => {
    if (visibleMessages < dummyMessages.length) {
      setIsWriting(true);
      const writingDelay = dummyMessages[visibleMessages].writingDelay || 1200;
      const timer = setTimeout(() => {
        setIsWriting(false);
        setCurrentWritingName(dummyMessages[visibleMessages].name);
        setVisibleMessages((prev) => prev + 1);
      }, writingDelay);

      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, [setCurrentWritingName, setIsWriting, visibleMessages]);

  return {
    visibleMessages,
    isWriting,
    isCompleted,
    dummyMessages: dummyMessages.slice(0, visibleMessages),
  };
}
