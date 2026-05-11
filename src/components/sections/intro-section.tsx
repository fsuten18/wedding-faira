"use client";

import { useSearchParams } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useJoinGroupStore } from "@/store";
import LogoGroup from "../ui/logo-group";
import { motion } from "motion/react";
import { SITECONFIG } from "@/lib/config";

export default function IntroSection() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");
  const { setIsOpen } = useJoinGroupStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col gap-6 items-center justify-center bg-background h-dvh w-full px-4"
      key="intro-section"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <LogoGroup className="size-40" />
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-white-900">
            {SITECONFIG.titleGroup}
          </h1>
          <p className="font-normal text-white-700">
            Created by{" "}
            <span className="font-bold">
              {SITECONFIG.groomName} dan {SITECONFIG.brideName}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {SITECONFIG.introAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            className="size-14 -ml-4"
          >
            <AvatarImage
              src={avatar}
              alt={`Logo avatar - ${index + 1}`}
            />
          </Avatar>
        ))}
        <div className="flex flex-col items-center justify-center size-14 rounded-full border-2 bg-gray-500 -ml-4 z-10">
          <p className="text-xs font-semibold text-white">+100</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center min-w-full">
        {guestName && (
          <div className="space-y-1 text-center">
            <p className="text-sm text-white-700">
              Halo, <span className="font-bold">{guestName}</span> 👋
            </p>
            <p className="text-xs font-normal text-white-700">
              Kamu telah diundang untuk menghadiri pernikahan kami.
            </p>
          </div>
        )}

        <Button
          className="w-full"
          size={"lg"}
          onClick={() => setIsOpen(true)}
        >
          <span className="font-semibold">{SITECONFIG.introTxtBtn}</span>
        </Button>
      </div>

      <p className="text-xs">
        Craft by{" "}
        <a
          className="hover:underline hover:text-blue-500"
        >
          Coding with Faizal
        </a>
      </p>
    </motion.div>
  );
}
