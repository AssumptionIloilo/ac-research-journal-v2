import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";

export function OpenCloseButton(props: {
  points: "left" | "right";
  className?: string;
  onClick: () => void;
}) {
  const points = props.points ?? "left";
  return (
    <button
      className={cn(
        "rounded-md bg-gray-200 p-1 transition-[transform] active:scale-95 text-gray-500",
        points === "left" ? "rotate-180" : "right-0",
        props.className
      )}
      onClick={props.onClick}
    >
      <Icon icon="lucide:chevron-last" />
    </button>
  );
}
