import { pageRoutes } from "@/constants/page-routes";
import { input } from "@/styles/variants";
import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import { AnimatePresence, motion } from "framer-motion";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import { GetArchiveCategoriesDocument } from "@/queries/archive";
import { useQuery } from "urql";

import { IconChevronLeft } from "@/assets/icons";
import { Icon } from "@iconify/react";
import Logo from "../logo";

export type ArchiveAsideProps = {
  collapsed?: boolean;
};

/** The Sidebar for the Archive Page. */
const ArchiveAside: FC<ArchiveAsideProps> = (props) => {
  const { collapsed } = props;
  const { urlParsed } = usePageContext();

  // ===========================================================================
  // States
  // ===========================================================================
  const [searchValue, setSearchValue] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);

  // ===========================================================================
  // Queries
  // ===========================================================================
  const [{ data: categoriesData }] = useQuery({
    query: GetArchiveCategoriesDocument,
  });

  // ===========================================================================
  // Derived States
  // ===========================================================================
  const categoryIdSearch = useMemo(() => urlParsed.search["category"], [urlParsed.search]);
  const titleSearch = useMemo(() => urlParsed.search["title"], [urlParsed.search]);
  const searchExists = useMemo(
    () => categoryIdSearch || titleSearch,
    [categoryIdSearch, titleSearch]
  );

  // ===========================================================================
  // Functions
  // ===========================================================================

  const handleSearchChange = useMemo(() => {
    const _handleSearchChange = (value: string) => {
      const url = new URL(window.location.href);

      if (value === "") {
        url.searchParams.delete("title");
        navigate(url.toString(), { overwriteLastHistoryEntry: true });
        return;
      }

      url.searchParams.set("title", value);
      navigate(url.toString(), { overwriteLastHistoryEntry: true });
    };

    return debounce(_handleSearchChange, 500);
  }, []);

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("category", value);
    navigate(url.toString(), { overwriteLastHistoryEntry: true });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    navigate(pageRoutes.archive, { overwriteLastHistoryEntry: true });
  };

  return (
    <aside
      className={cn("transition-[width] overflow-hidden duration-300", collapsed ? "w-0" : "w-96")}
    >
      <div className="bg-white p-16 flex flex-col w-96 flex-1 h-full">
        <a href={pageRoutes.home} className="text-xs mb-4 flex items-center text-neutral-500">
          <IconChevronLeft className="w-4 h-4" /> Home
        </a>
        <Logo color="#2E2FA5" />
        <div className="h-10" />
        <div className="flex items-center gap-x-2 border-b primary-100 py-2">
          <Icon className="text-dark-300" icon="tabler:search" />
          <input
            className={input({ class: "text-dark-500 font-medium" })}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
              handleSearchChange(e.target.value);
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="h-10" />
        <h2 className="text-dark-800 font-medium mb-2">Categories</h2>
        <div className="flex flex-col gap-y-0" onMouseLeave={() => setHovered(null)}>
          {categoriesData?.ArchiveCategories?.docs?.map((category, i: number) => (
            <CategoryListItem
              key={category?.id}
              id={category?.id ?? i.toString()}
              active={category?.id === categoryIdSearch}
              currentHoverId={hovered}
              onClick={() => {
                if (!category?.id) return;

                handleCategoryClick(category.id);
              }}
              onHover={setHovered}
            >
              {category?.name}
            </CategoryListItem>
          ))}
        </div>
        <div className="flex-1" />
        <div>
          {searchExists && (
            <button className="text-sm" onClick={handleClearSearch}>
              🗑️ Clear Filters
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ArchiveAside;

// ===========================================================================
// Subcomponents
// ===========================================================================

type CategoryListItemType = PropsWithChildren & {
  id?: string;
  active?: boolean;
  currentHoverId?: string | null;
  onClick: () => void;
  onHover?: (id: string) => void;
};

const CategoryListItem: FC<CategoryListItemType> = (props) => {
  const { id, currentHoverId, onClick, onHover, children, active } = props;

  return (
    <button
      className="relative text-sm text-left transition"
      onClick={onClick}
      onMouseOver={() => id && onHover?.(id)}
    >
      <span
        className={`${active ? "bg-primary-500 text-white" : ""} transition block px-2 py-2 rounded-md relative z-10`}
      >
        {children}
      </span>
      <AnimatePresence>
        {currentHoverId === id && (
          <motion.div
            className="inset-0 rounded-md bg-primary-100 absolute"
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            transition={{
              layout: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            layoutId="category-item"
          />
        )}
      </AnimatePresence>
    </button>
  );
};
