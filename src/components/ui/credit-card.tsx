"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn, getMaskedNumber } from "@/lib/utils";

const PERSPECTIVE = 400;
const CARD_ANIMATION_DURATION = 0.5;
const INITIAL_DELAY = 0.2;

const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
} as const;

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CreditCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  cardNumber: string;
  cardHolder: string;
  bankName: string;
  variant?: "default" | "dark";
}

const CreditCard = React.forwardRef<HTMLDivElement, CreditCardProps>(
  (
    {
      className,
      cardNumber,
      cardHolder,
      bankName,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const variants = {
      default: "bg-green-300 text-black",
      dark: "bg-slate-800 text-white",
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: CARD_ANIMATION_DURATION }}
        style={{ perspective: PERSPECTIVE }}
        className={cn("relative touch-none w-full", className)}
        {...props}
      >
        <motion.div
          className={cn(
            "relative h-48 min-w-80 overflow-hidden rounded-xl p-6 border border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none active:translate-x-boxShadowX transition-all",
            variants[variant]
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: CARD_ANIMATION_DURATION }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: INITIAL_DELAY,
                duration: CARD_ANIMATION_DURATION,
              }}
            >
              {bankName}
            </motion.div>

            <motion.button
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                variant === "default" ? "bg-yellow-200" : "bg-slate-700"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, ...springTransition }}
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? "Hide card details" : "Show card details"}
            >
              {isVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </motion.button>
          </div>

          <motion.div
            className="mt-2 text-xl font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isVisible ? cardNumber : getMaskedNumber(cardNumber, 5)}
          </motion.div>

          <div className="mt-6 flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: CARD_ANIMATION_DURATION }}
            >
              <div className="text-xs opacity-80">Card Holder</div>
              <div className="font-semibold">{cardHolder}</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
CreditCard.displayName = "CreditCard";

export { CreditCard };
