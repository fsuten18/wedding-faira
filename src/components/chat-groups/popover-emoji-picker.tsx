import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { SmileIcon } from "lucide-react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

export default function PopoverEmojiPicker({
  onEmojiClick,
}: {
  onEmojiClick: (emoji: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"noShadow"}
          size={"sm"}
          className="h-10"
        >
          <SmileIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 flex items-center justify-center"
        align="end"
        side="top"
      >
        <EmojiPicker
          onEmojiClick={(emoji) => onEmojiClick(emoji.emoji)}
          autoFocusSearch={false}
          searchDisabled
          emojiStyle={EmojiStyle.APPLE}
          width={286}
          height={300}
          previewConfig={{
            showPreview: false,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
