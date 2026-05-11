import { motion } from "motion/react";
import Header from "../chat-groups/header";
import InputMessage from "../chat-groups/input-message";
import MainChat from "../chat-groups/main-chat";

export default function ChatGroup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      key="chat-group"
      className="flex flex-col items-center h-dvh w-full bg-[#55A8B6]"
    >
      {/* Header */}
      <Header />
      {/* Chat Group */}
      <MainChat />
      {/* Input Message */}
      <InputMessage />
    </motion.div>
  );
}
