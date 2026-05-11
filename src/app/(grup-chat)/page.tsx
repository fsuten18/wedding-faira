"use client";
import { useEffect } from "react";
import ChatGroup from "@/components/sections/chat-group";
import IntroSection from "@/components/sections/intro-section";
import SplashScreen from "@/components/sections/splash-screen";
import { useSplashScreen } from "@/hooks/use-splash-screen";
import { useJoinGroupStore } from "@/store";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const { isOpen } = useJoinGroupStore();
  const { isSplashScreenOpen } = useSplashScreen();

  // Update the back navigation to include the 'to' parameter
  useEffect(() => {
    const handleBackNavigation = () => {
      if (toParam) {
        const newUrl = `/?to=${encodeURIComponent(toParam)}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    };

    window.addEventListener("popstate", handleBackNavigation);
    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [toParam]);

  return (
    <main className="flex flex-col items-center justify-center relative">
      <AnimatePresence
        key={
          isSplashScreenOpen
            ? "splash-screen"
            : isOpen
            ? "chat-group"
            : "intro-section"
        }
      >
        {isSplashScreenOpen ? (
          <SplashScreen />
        ) : !isOpen ? (
          <IntroSection />
        ) : (
          <ChatGroup />
        )}
      </AnimatePresence>
    </main>
  );
}
