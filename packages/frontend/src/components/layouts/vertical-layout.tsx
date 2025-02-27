import { FC } from "react";
import { usePageContext } from "vike-react/usePageContext";

import VerticalFooter from "./vertical-footer";
import VerticalMobileFooter from "./vertical-mobile-footer";
import VerticalNav from "./vertical-nav";

type LayoutProps = {
  children: React.ReactNode;
};

const VerticalLayout: FC<LayoutProps> = ({ children }) => {
  const { urlPathname } = usePageContext();

  // Per-page customizations here. Just add the route below.
  const navPosition = ["/"].includes(urlPathname) ? "fixed" : "sticky";
  const navVariant = ["/"].includes(urlPathname) ? "inverted" : "default";

  return (
    <div className="min-h-screen flex flex-col">
      <VerticalNav position={navPosition} variant={navVariant} />
      <main className="flex flex-col flex-grow gap-0">{children}</main>
      <VerticalFooter />
      <VerticalMobileFooter />
    </div>
  );
};

export default VerticalLayout;
