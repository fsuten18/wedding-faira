"use client";
import MediaPhotos from "@/components/chat-groups/media-photos";
import GroupTitleWithIcon from "@/components/group-title-with-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import CardIconTitle from "@/components/ui/card-icon-title";
import { CreditCard } from "@/components/ui/credit-card";
import LogoGroup from "@/components/ui/logo-group";
import { PreserveQueryLink } from "@/components/ui/preserve-query-link";
import { Separator } from "@/components/ui/separator";
import { GALLERY_IMAGES, SITECONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  CopyCheckIcon,
  CopyIcon,
  Images,
  MapPin,
  NotebookText,
  PhoneCall,
  SmileIcon,
  Video,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function GroupDescriptionPage() {
  const [isCopied, setIsCopied] = useState(false);
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");

  const handleCopy = () => {
    navigator.clipboard.writeText(SITECONFIG.noRekening.replace(/\s/g, ""));
    setIsCopied(true);
    toast.success("Nomor rekening berhasil disalin ✨", {
      onAutoClose: () => {
        setIsCopied(false);
      },
    });
  };

  return (
    <main className="flex flex-col gap-4 min-h-dvh w-full bg-background py-6 relative">
      <PreserveQueryLink
        href="/"
        className={cn(
          buttonVariants({ variant: "noShadow" }),
          "absolute top-4 left-4"
        )}
      >
        <ArrowLeftIcon className="size-4" />
      </PreserveQueryLink>
      {/* Group Description */}
      <div className="flex flex-col gap-4 items-center justify-center px-4">
        <LogoGroup className="size-40" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">{SITECONFIG.titleGroup}</h1>
          <p className="text-sm text-white-500 text-center">
            {SITECONFIG.subTitleGroup}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <CardIconTitle
            icon={<Video className="size-5 stroke-3" />}
            title="Video"
            link={
              toParam
                ? `video-call/?to=${encodeURIComponent(toParam)}`
                : "/video-call"
            }
            isBadge
          />
          <CardIconTitle
            icon={<PhoneCall className="size-5 stroke-3" />}
            title="Panggilan"
            link={
              toParam
                ? `voice-call/?to=${encodeURIComponent(toParam)}`
                : "/voice-call"
            }
            isBadge
          />
          <CardIconTitle
            icon={<Images className="size-5 stroke-3" />}
            title="Gallery"
            link="#media-gallery"
          />
          <CardIconTitle
            icon={<MapPin className="size-5 stroke-3" />}
            title="Lokasi"
            link={SITECONFIG.linkMap}
            openInNewTab
          />
        </div>
      </div>
      <Separator className="my-2" />
      {/* Group Info */}
      <div className="flex flex-col gap-4 px-4">
        <GroupTitleWithIcon
          icon={<NotebookText className="size-4" />}
          title={SITECONFIG.groupTitleWithIcon1}
        />
        <p className="text-white-800 text-sm font-normal">
          {SITECONFIG.descriptionGroup.split("\n\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      {/* Media Gallery */}
      <div
        id="media-gallery"
        className="flex flex-col gap-2 px-4"
      >
        <GroupTitleWithIcon
          icon={<Video className="size-4 stroke-3" />}
          title={SITECONFIG.groupTitleWithIcon2}
          isArrow
        />
        <MediaPhotos photos={GALLERY_IMAGES} />
      </div>
      {/* Donation */}
      <div className="flex flex-col items-start justify-center gap-4 px-4">
        <GroupTitleWithIcon
          icon={<SmileIcon className="size-4 stroke-3" />}
          title={SITECONFIG.groupTitleWithIcon3}
        />
        <CreditCard
          cardNumber={SITECONFIG.noRekening}
          cardHolder={SITECONFIG.namaRekening}
          bankName={SITECONFIG.bankName}
        />
        <Button
          onClick={handleCopy}
          className="w-full"
        >
          {isCopied ? (
            <CopyCheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {isCopied
            ? "Nomor rekening berhasil disalin ✨"
            : "Salin nomor rekening"}
        </Button>
      </div>
      <p className="text-xs text-center mt-4">
        Craft by{" "}
        <a
          className="hover:underline hover:text-blue-500"
        >
          Coding with Faizal
        </a>
      </p>
    </main>
  );
}
