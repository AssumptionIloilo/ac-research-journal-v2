import { FC, PropsWithChildren } from "react";

import { usePageContext } from "vike-react/usePageContext";
import ArchiveAside, { ArchiveAsideProps } from "./archive-aside";
import { ArchiveAsideContextProvider } from "./archive-aside/archive-aside-context";
import VerticalMobileFooter from "./vertical-mobile-footer";

type ArchiveLayoutType = PropsWithChildren & {} & ArchiveAsideProps;
/** A Horizontal Layout. */
const ArchiveLayout: FC<ArchiveLayoutType> = ({ children }) => {
  const pageContext = usePageContext();

  return (
    <ArchiveAsideContextProvider>
      <div className="h-screen max-h-screen flex">
        {!pageContext.routeParams?.slug && <ArchiveAside />}
        <main className="flex-1 overflow-auto flex flex-col">{children}</main>
        <nav className="fixed bottom-0">
          <VerticalMobileFooter />
        </nav>
      </div>
    </ArchiveAsideContextProvider>
  );
};

export default ArchiveLayout;
