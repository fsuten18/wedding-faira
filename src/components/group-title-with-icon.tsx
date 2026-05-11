import { ChevronRightIcon } from "lucide-react";

interface GroupTitleWithIconProps {
  icon: React.ReactNode;
  title: string;
  isArrow?: boolean;
}

export default function GroupTitleWithIcon({
  icon,
  title,
  isArrow = false,
}: GroupTitleWithIconProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      {isArrow && (
        <ChevronRightIcon className="size-4 text-white-500 stroke-3" />
      )}
    </div>
  );
}
