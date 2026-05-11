import Link from "next/link";
import { Card, CardContent } from "./card";

interface CardIconTitleProps {
  icon: React.ReactNode;
  title: string;
  link: string;
  openInNewTab?: boolean;
  isBadge?: boolean;
}

export default function CardIconTitle({
  icon,
  title,
  link,
  openInNewTab = false,
  isBadge = false,
}: CardIconTitleProps) {
  return (
    <Link
      href={link}
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      <Card className="flex items-center justify-center size-20 bg-main relative">
        {isBadge && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-4 text-xs animate-pulse" />
        )}
        <CardContent className="flex flex-col gap-2 items-center justify-center p-0">
          {icon}
          <p className="text-xs font-semibold">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
