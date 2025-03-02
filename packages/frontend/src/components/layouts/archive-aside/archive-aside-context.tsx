import { useMediaQueryClient } from "@/hooks/use-media-query";
import { createContext, Dispatch, FC, PropsWithChildren, useContext, useState } from "react";

// ===========================================================================
// Context
// ===========================================================================

export type ArchiveAsideContextValue = {
  collapsed: boolean;
  setCollapsed: Dispatch<React.SetStateAction<boolean>>;
  isCollapsible: boolean;
};

const ArchiveAsideContext = createContext<ArchiveAsideContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  isCollapsible: false,
});

// ===========================================================================
// Hook
// ===========================================================================
export const useArchiveAsideContext = () => useContext(ArchiveAsideContext);

// ===========================================================================
// Provider
// ===========================================================================
export const ArchiveAsideContextProvider: FC<PropsWithChildren> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const isTabletOrMobile = useMediaQueryClient("(max-width: 1224px)");

  return (
    <ArchiveAsideContext.Provider
      value={{
        collapsed: isTabletOrMobile && collapsed, // Collapse should only work on Tablet or Mobile. Never on bigger screens.
        setCollapsed,
        isCollapsible: isTabletOrMobile,
      }}
    >
      {props.children}
    </ArchiveAsideContext.Provider>
  );
};
