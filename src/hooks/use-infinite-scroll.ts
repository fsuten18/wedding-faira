import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useInfiniteScroll(
  hasMore: boolean,
  loading: boolean,
  isDummyCompleted: boolean,
  hasScrolled: boolean,
  loadMoreMessages: () => void
) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "10px",
  });

  useEffect(() => {
    if (inView && hasMore && !loading && isDummyCompleted && hasScrolled) {
      const timer = setTimeout(() => {
        loadMoreMessages();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [
    inView,
    hasMore,
    loading,
    isDummyCompleted,
    hasScrolled,
    loadMoreMessages,
  ]);

  return loadMoreRef;
}
