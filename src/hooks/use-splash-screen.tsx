import { useEffect, useState } from "react";

export const useSplashScreen = () => {
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(true);

  useEffect(() => {
    //Check if the splash screen has been shown before
    const hasShownSplashScreen = localStorage.getItem("has-shown-splash");

    if (hasShownSplashScreen === "true") {
      setIsSplashScreenOpen(false);
    } else {
      setTimeout(() => {
        setIsSplashScreenOpen(false);
        localStorage.setItem("has-shown-splash", "true");
      }, 3000);
    }
  }, []);

  return { isSplashScreenOpen };
};
