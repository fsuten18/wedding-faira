import { ArrowLeftIcon, CircleUserRound } from "lucide-react";
import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HeaderCall() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get('to');

  return (
    <div className="fixed top-0 flex items-center justify-between w-full h-16 px-4 my-2 z-10">
      <Link
        href={toParam ? `/?to=${encodeURIComponent(toParam)}` : "/"}
        className={cn(
          buttonVariants({
            variant: "noShadow",
            size: "icon",
          }),
          "bg-white"
        )}
      >
        <ArrowLeftIcon className="size-4" />
      </Link>
      <p className="font-normal text-white">End to end encrypted</p>
      <CircleUserRound className="size-8 text-white" />
    </div>
  );
}
