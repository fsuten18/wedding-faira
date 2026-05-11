import { useChatImageStore } from "@/store";
import { motion } from "motion/react";
import BlurImage from "../ui/blur-image";

export default function BubleChatImageFullScreen({ image }: { image: string }) {
  const { setIsOpen } = useChatImageStore();

  const MotionImage = motion.create(BlurImage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <MotionImage
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        src={image}
        alt="Chat image"
        className="max-w-full h-auto border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-sm"
        width={1000}
        height={1000}
        loading="lazy"
      />
    </motion.div>
  );
}
