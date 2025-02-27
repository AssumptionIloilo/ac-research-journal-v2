import { FC, PropsWithChildren } from "react";

import { useMediaQueryClient } from "@/hooks/use-media-query";

import ArchiveAside, { ArchiveAsideProps } from "./archive-aside";
import VerticalMobileFooter from "./vertical-mobile-footer";

type ArchiveLayoutType = PropsWithChildren & {} & ArchiveAsideProps;
/** A Horizontal Layout. */
const ArchiveLayout: FC<ArchiveLayoutType> = ({ children, collapsed }) => {
  const isTabletOrMobile = useMediaQueryClient("(max-width: 1224px)");

  return (
    <div className="h-screen max-h-screen flex">
      <ArchiveAside collapsed={isTabletOrMobile ? true : collapsed} />
      <main className="flex-1 overflow-auto flex flex-col">{children}</main>
      <nav className="fixed bottom-0">
        <VerticalMobileFooter />
      </nav>
    </div>
  );
};

export default ArchiveLayout;
