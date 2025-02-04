import { FC } from "react";

import { pageRoutes } from "@/constants/page-routes";
import { cn } from "@/utils/cn";

type LogoType = {
  color: "#2E2FA5" | string;
  className?: string;
};

const Logo: FC<LogoType> = (props) => {
  const { color, className } = props;
  return (
    <a
      style={{ color: color }}
      className={cn("font-mixOldGirl text-3xl flex-shrink-0 transition", className)}
      href={pageRoutes.home}
    >
      AC Publications
    </a>
  );
};

export default Logo;
