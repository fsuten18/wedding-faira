"use client";

import { PhoneCall, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonWithBadge from "../ui/button-with-badge";
import LogoGroup from "../ui/logo-group";
import NavMenu from "./nav-menu";
import { useWritingStore } from "@/store";
import { useSearchParams } from "next/navigation";
import { SITECONFIG } from "@/lib/config";

export default function Header() {
  const router = useRouter();
  const { isWriting, currentWritingName } = useWritingStore();
  const searchParams = useSearchParams();
  const toParam = searchParams.get('to');

  return (
    <div className="flex justify-between items-center h-20 border-b-2 w-full px-4 bg-background">
      <div className="flex flex-col items-start gap-x-4">
        <div className="flex items-center gap-x-2">
          <LogoGroup className="size-8" />
          <div
            onClick={() => router.push(toParam ? `group-description/?to=${encodeURIComponent(toParam)}` : "/group-description")}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <p className="text-sm font-bold">{SITECONFIG.titleGroup}</p>
            <p className="text-xs text-white-500 truncate w-[170px]">
              {SITECONFIG.memberHeader}
            </p>
            {isWriting && (
              <div className="text-xs font-medium text-white-500">
                {currentWritingName} sedang mengetik...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <ButtonWithBadge
          Icon={<Video className="size-4" />}
          callBack={() => router.push(toParam ? `video-call/?to=${encodeURIComponent(toParam)}` : "/video-call")}
        />
        <ButtonWithBadge
          Icon={<PhoneCall className="size-4" />}
          callBack={() => router.push(toParam ? `voice-call/?to=${encodeURIComponent(toParam)}` : "/voice-call")}
        />
        <NavMenu />
      </div>
    </div>
  );
}
