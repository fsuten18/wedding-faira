import { useEffect, useState } from "react";

export function useScrollTracking(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop } = containerRef.current;

        if (scrollTop > 100) {
          setHasScrolled(true);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef]);

  return hasScrolled;
}
