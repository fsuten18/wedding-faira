import { useGuestMessages } from "@/hooks/use-guest-messages";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useScrollTracking } from "@/hooks/use-scroll-tracking";
import { useDummyMessages } from "@/hooks/useDummyMessages";
import { useEffect, useRef, useState } from "react";
import {
  DummyMessages,
  FloatingScrollToBottomButton,
  GuestMessages,
  LoadingMessages,
} from "./messages";

export default function MainChat() {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesCountRef = useRef<number>(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { visibleMessages, isCompleted, dummyMessages } = useDummyMessages();
  const hasScrolled = useScrollTracking(chatContainerRef);
  const { messages, loading, hasMore, loadMoreMessages, newMessagesCount, resetNewMessagesCount } =
    useGuestMessages();
  const loadMoreRef = useInfiniteScroll(
    hasMore,
    loading,
    isCompleted,
    hasScrolled,
    loadMoreMessages
  );

  useEffect(() => {
    if (chatContainerRef.current && !isCompleted) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isCompleted, visibleMessages]);

  // Track new guest messages or and show scroll button
  useEffect(() => {
    if (isCompleted && messages.length > prevMessagesCountRef.current) {
      // New message arrived - show scroll button
      setShowScrollButton(true);
    }
    prevMessagesCountRef.current = messages.length;
  }, [messages.length, isCompleted]);

  // Hide scroll button when user scrolls to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

        if (isAtBottom) {
          setShowScrollButton(false);
          // Reset new messages count when user scrolls to bottom
          resetNewMessagesCount();
        }
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [resetNewMessagesCount]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowScrollButton(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto px-4 pb-14 pt-2 relative"
      style={{
        backgroundImage: `url(${"/assets/bg-chat.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      ref={chatContainerRef}
    >
      {/* Dummy Messages */}
      <DummyMessages messages={dummyMessages} />

      {/* Guest Messages */}
      {isCompleted && <GuestMessages messages={messages} />}

      {/* Loading */}
      {loading && <LoadingMessages />}

      {/* Intersection Observer for infinite scroll */}
      {isCompleted && hasMore && (
        <div
          ref={loadMoreRef}
          className="h-4"
        />
      )}

      {/* Floating Scroll to Bottom Button */}
      {showScrollButton && (
        <FloatingScrollToBottomButton
          newMessagesCount={newMessagesCount}
          scrollToBottom={scrollToBottom}
        />
      )}
    </div>
  );
}
