import { Loader2, SendIcon } from "lucide-react";
import { useRouter,useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import PopoverEmojiPicker from "./popover-emoji-picker";
import { isSpamMessage } from "@/lib/utils";

export default function InputMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestName = searchParams.get("to") || "Tamu Undangan";

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleClickEmoji = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleSendMessage = async () => {
    if (isSending) return;

    if (message.trim().length === 0) {
      toast.error("Pesan tidak boleh kosong");
      return;
    }

    if (message.length > 200) {
      toast.error("Pesan tidak boleh lebih dari 200 karakter");
      return;
    }

    if (isSpamMessage(message)) {
      toast.error(
        "Pesan terdeteksi sebagai spam atau tidak bermakna. Silakan coba lagi."
      );
      return;
    }

    try {
      setIsSending(true);
      const response = await fetch("/api/message/send", {
        method: "POST",
        body: JSON.stringify({
          name: guestName,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal mengirim pesan");
      }

      toast.success("Pesan telah terkirim, terima kasih!");
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Gagal mengirim pesan");
    } finally {
      setMessage("");
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-xl flex items-center justify-center gap-x-2 px-4 py-2 bg-background">
      <Textarea
        placeholder="Message..."
        className="w-full resize-none !min-h-10"
        maxHeight={100}
        minHeight={10}
        value={message}
        maxLength={200}
        onChange={(e) => setMessage(e.target.value)}
      />
      <PopoverEmojiPicker onEmojiClick={handleClickEmoji} />
      <Button
        variant={"noShadow"}
        size={"sm"}
        className="h-10 w-14"
        disabled={isSending || message.trim().length === 0}
        onClick={handleSendMessage}
      >
        {isSending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <SendIcon className="size-4" />
        )}
      </Button>
    </div>
    
  );
}
