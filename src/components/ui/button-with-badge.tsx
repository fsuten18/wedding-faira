import { Button } from "./button";

interface ButtonWithBadgeProps {
  Icon: React.ReactNode;
  callBack?: () => void;
}

export default function ButtonWithBadge({
  Icon,
  callBack,
}: ButtonWithBadgeProps) {
  return (
    <div className="relative hover:-translate-y-1 transition-all duration-300">
      <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full size-3 text-xs animate-pulse" />
      <Button
        variant={"noShadow"}
        size={"icon"}
        className="size-8"
        onClick={callBack}
      >
        {Icon}
      </Button>
    </div>
  );
}
