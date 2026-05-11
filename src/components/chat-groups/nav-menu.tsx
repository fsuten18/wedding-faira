import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useJoinGroupStore } from "@/store";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavMenu() {
  const { setIsOpen } = useJoinGroupStore();
  const searchParams = useSearchParams();
  const toParam = searchParams.get('to');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"noShadow"}
          size={"icon"}
          className="size-8"
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-40"
        align="end"
      >
        <div className="flex flex-col items-start gap-y-2">
          <Link href={toParam ? `/?to=${encodeURIComponent(toParam)}` : "/group-description"}>
            <p>Deskripsi Grup</p>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            <p>Keluar Grup</p>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
