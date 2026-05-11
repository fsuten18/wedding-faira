import { Avatar, AvatarImage } from "./avatar";
import { SITECONFIG } from "@/lib/config";
interface LogoGroupProps {
  className?: string;
}

export default function LogoGroup({ className }: LogoGroupProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={SITECONFIG.logoGroup}
        alt="Logo group"
      />
    </Avatar>
  );
}
