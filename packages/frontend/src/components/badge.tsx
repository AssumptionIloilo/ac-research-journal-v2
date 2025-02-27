import { cn } from "@/utils/cn";
import { FC, PropsWithChildren } from "react";

type BadgeProps = {
  className?: string;
} & PropsWithChildren;

const Badge: FC<BadgeProps> = ({ className = "bg-primary-500 text-white", children }) => {
  return (
    <div className={cn("rounded-full border px-2.5 text-sm py-0.5 text-white", className)}>
      {children}
    </div>
  );
};

export default Badge;
