import { FC } from "react";

import { navLinks, pageRoutes } from "@/constants/page-routes";
import { button } from "@/styles/variants";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { usePageContext } from "vike-react/usePageContext";

export const VERTICAL_MOBILE_FOOTER_HEIGHT = 92;

export function VerticalMobileFooterOffset(props: { className?: string }) {
  return <div className={props.className} style={{ height: VERTICAL_MOBILE_FOOTER_HEIGHT }} />;
}

type VerticalMobileFooterProps = {};

/** This is the mobile navigation placed on the footer. */
const VerticalMobileFooter: FC<VerticalMobileFooterProps> = (_props) => {
  const { urlPathname: pathname } = usePageContext();

  return (
    <nav
      className="relative top-0 left-0 right-0 z-[999998] w-full md:hidden"
      style={{ height: VERTICAL_MOBILE_FOOTER_HEIGHT }}
    >
      <div className="relative max-w-7xl w-full mx-auto flex items-center justify-between md:hidden">
        <ul className="fixed bottom-0 bg-white w-full justify-evenly items-center flex border-t border-primary-400">
          {navLinks.map((navLink) => (
            <a
              key={navLink.url}
              className={`flex-1 py-4 flex flex-col gap-y-3 items-center ${
                navLink.label === "Journal" ? "block" : ""
              }`}
              href={navLink.url}
            >
              <Icon
                icon={
                  pathname?.split("/")[1] === navLink.url.split("/")[1]
                    ? navLink.activeIcon
                    : navLink.icon
                }
                className={cn(
                  "text-2xl block md:hidden",
                  pathname?.split("/")[1] === navLink.url.split("/")[1]
                    ? "text-primary-600"
                    : "text-primary-300"
                )}
              />
              <span className="text-primary-300 md:text-[#2B2B43]">{navLink.label}</span>
            </a>
          ))}
        </ul>

        <a href={pageRoutes.archive} className={button({ class: "hidden md:block z-10" })}>
          Read Archives
        </a>
      </div>
    </nav>
  );
};

export default VerticalMobileFooter;
