import { GuestMessage } from "@/types/message";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const PAGE_SIZE = 5;

export function useGuestMessages() {
  const supabase = createClient();

  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const lastFetched = useRef<string | null>(null);

  //Track new messages
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  // Reset new messages count
  const resetNewMessagesCount = useCallback(() => {
    setNewMessagesCount(0);
  }, []);

  //Fetch initial and older messages (with Infinite scroll)
  const fetchMessages = useCallback(
    async (isInitialLoad = false) => {
      if (loading || (!isInitialLoad && !hasMore)) return;
      setLoading(true);

      try {
        let query = supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(PAGE_SIZE);

        if (lastFetched.current) {
          query = query.gt("created_at", lastFetched.current);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching messages:", error);
          setHasMore(false);
          return;
        }

        if (data && data.length > 0) {
          setMessages((prev) => [...prev, ...data]);
          lastFetched.current = data[data.length - 1].created_at;
          if (data.length < PAGE_SIZE) setHasMore(false);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      }
    },
    [hasMore, loading, supabase]
  );

  //Real-time Subscription supabase
  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as GuestMessage]);
          setNewMessagesCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Initial fetch on mount
  useEffect(() => {
    fetchMessages(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Load more messages
  const loadMoreMessages = useCallback(() => {
    if (isInitialLoad) {
      //First time loading
      fetchMessages(true);
    } else {
      //Subsequent loading for infinite scroll
      fetchMessages(false);
    }
  }, [fetchMessages, isInitialLoad]);

  return {
    messages,
    loading,
    hasMore,
    loadMoreMessages,
    isInitialLoad,
    newMessagesCount,
    resetNewMessagesCount,
  };
}
