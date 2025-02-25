import { FC, memo, useCallback, useEffect, useId, useMemo, useState } from "react";
import toast from "react-hot-toast";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types.js";
import Select, { type SingleValue } from "react-select";
// import { useQuery } from "urql";

// import { RichText } from "@/components/RichText"; // REPLACE WITH TAILWIND PROSE
// import { GetArchiveBySlugDocument, GetArchiveBySlugQuery } from "@/gql/graphql";
// import { client, ssrCache } from "@/lib/urqlClient";

import { pageRoutes } from "@/constants/page-routes";
import { useMediaQueryClient } from "@/hooks/use-media-query";
import useMounted from "@/hooks/use-mounted";
import { useWindowWidth } from "@/hooks/use-window-width";
import { button } from "@/styles/variants";
import { isInRange } from "@/utils/is-in-range";
import { Icon } from "@iconify/react";
import useArchiveWasPrevious from "../_hooks/use-archive-was-previous";

import getTitle from "@/utils/get-title";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

/** @vite-ignore */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  // @ts-ignore
  import.meta.url
).toString();

// =============================================================================
// Server-Side Calls from the Page.
// =============================================================================
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const { slug } = ctx.params as { slug: string };

//   const { data } = await client
//     .query(GetArchiveBySlugDocument, { slug: slug }, { requestPolicy: "network-only" })
//     .toPromise();

//   return {
//     props: {
//       slug,
//       urqlState: ssrCache.extractData(),
//     },
//   };
// }

// =============================================================================
// Archive Page (For Querying & Hydrating)
// =============================================================================
// export default function ArchivePage() {
//   const { routeParams } = usePageContext();

//   useMetadata({
//     title: getTitle("Archive <SLUG>"),
//   });

//   // const [{ data }] = useQuery({
//   //   query: GetArchiveBySlugDocument,
//   //   variables: {
//   //     slug,
//   //   },
//   // });
//   const data: any = null;

//   const volume = data?.Archives?.docs?.at(0);

//   return <ArchivePageComponent volume={volume} />;
// }

// // =============================================================================
// // ArchivePageComponent (For Rendering Data)
// // =============================================================================
// type ArchivePageComponentProps = {
//   volume?: any;
// };

export default function ArchivePage() {
  const { routeParams } = usePageContext();

  useMetadata({
    title: getTitle("Archive <SLUG>"),
  });

  // const [{ data }] = useQuery({
  //   query: GetArchiveBySlugDocument,
  //   variables: {
  //     slug,
  //   },
  // });
  const data: any = null;

  const volume = data?.Archives?.docs?.at(0);

  // =============================================================================
  // States
  // =============================================================================
  const { archiveWasPrevious, removeArchiveWasPrevious } = useArchiveWasPrevious();

  const mounted = useMounted();

  const windowWidth = useWindowWidth(600);

  const isMobile = useMediaQueryClient("(max-width: 1224px)");

  // ===========================================================================
  // States (for the book)
  // ===========================================================================
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [pageNumbers, setPageNumbers] = useState<number>();

  const [pageSize, setPageSize] = useState<{ width: number; height: number }>();

  const [pageIsPortrait, setPageIsPortrait] = useState<boolean>(false);

  const [selectedSizeModifierOption, setSelectedSizeModifierOption] =
    useState<(typeof sizeModifierOptions)[0]>();

  const [sizeModifier, setSizeModifier] = useState<number>(1);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handlePDFLoadSuccess: OnDocumentLoadSuccess = useCallback(
    async (loadResult): Promise<void> => {
      setPageNumbers(loadResult.numPages);

      const page = await loadResult.getPage(1);
      const width = page.view[2];
      const height = page.view[3];

      setPageSize({
        width,
        height,
      });
    },
    []
  );

  const handleSizeSelectChange = (
    value: SingleValue<(typeof sizeModifierOptions)[number]>
  ): void => {
    // If Autofit was selected.
    if (value?.value === "autofit") {
      executeAutofit();
      return;
    }

    // If other numerical options were selected.
    setSizeModifier(value?.value ?? 1);
    setSelectedSizeModifierOption({
      label: value?.label ?? "",
      value: value?.value ?? 1,
    });
  };

  const handlePageFlip = useCallback((event: { data: number }) => {
    setCurrentPage(event.data);
  }, []);

  // =============================================================================
  // Variables
  // =============================================================================

  const getSizeOptionDisabled = useCallback(
    (value: number) => (value * (pageSize?.width ?? 1) * 2 >= windowWidth ? true : false),
    [pageSize?.width, windowWidth]
  );

  const sizeModifierOptions: {
    value: number | "autofit";
    label: string;
    disabled?: boolean;
  }[] = useMemo(() => {
    const options = [
      {
        label: "AutoFit",
        value: "autofit" as const, // casted with `const` to it's a 'string literal' and not 'string'.
      },
      {
        label: "100%",
        value: 1,
      },
      {
        label: "90%",
        value: 0.9,
      },
      {
        label: "80%",
        value: 0.8,
      },
      {
        label: "75%",
        value: 0.75,
      },
      {
        label: "50%",
        value: 0.5,
      },
    ];

    return options.map((option) => {
      // Never disabled for autofit.
      if (option.value === "autofit") return option;

      // For number values (disabled)
      const disabled = getSizeOptionDisabled(option.value);

      if (disabled) return { ...option, label: `${option.label} (too big 🚫)`, disabled };

      // For number values (enabled)
      return option;
    });
  }, [getSizeOptionDisabled]);

  /**
   * Returns an autofitted value number based on all possible variables in the
   * window. Remember: it's just a value, it does not actual set anything yet.
   */
  const generateAutoFitSizeModifier = useCallback(() => {
    if (!pageSize?.width) return 1;

    const padding = 45 * 2; // This is px-9 the standard padding for all pages.

    /** When portrait or mobile, fit with page Width. When landscape (book), fit two pages. */
    const pageSizeWidth = isMobile || pageIsPortrait ? pageSize.width : pageSize.width * 2;

    // Calculate c such that (c * elementWidth) is approximately equal to windowWidth
    const c = (windowWidth - padding) / pageSizeWidth;

    return c;
  }, [pageSize?.width, windowWidth, pageIsPortrait, isMobile]);

  /**
   * Function that can be called to change:
   * - Options State
   * - Page Size
   */
  const executeAutofit = useCallback(() => {
    const _sizeModifier = generateAutoFitSizeModifier();

    setSizeModifier(_sizeModifier);

    setSelectedSizeModifierOption({
      label: `${(_sizeModifier * 100).toFixed(2)}%`,
      value: _sizeModifier,
    });
  }, [generateAutoFitSizeModifier]);

  // ===========================================================================
  // Effect
  // ===========================================================================

  useEffect(() => {
    if (isMobile) {
      executeAutofit();
    }
  }, [executeAutofit, isMobile]);

  return (
    <div className="flex-1 flex flex-col py-16 bg-[EDF1FD] overflow-x-hidden">
      <div className="px-9 flex flex-col">
        {/* Back Button */}
        <a
          href={pageRoutes.archive}
          className="self-start"
          onClick={(e) => {
            // 👇 Prevents opening the link on click (middle-click will work)
            // Which is what we want.
            e.preventDefault();

            // 👇 We instead want to `replace` the route. Since Link `pushes` by
            // default.
            navigate(pageRoutes.archive, { overwriteLastHistoryEntry: true });

            if (archiveWasPrevious) window.history.back(); // replace and back.
            removeArchiveWasPrevious();
          }}
        >
          <Icon icon="uil:arrow-up" className="text-primary-500 -rotate-90" fontSize={40} />
        </a>

        {/* Header */}

        <h1 className="text-primary-500 text-3xl pt-8 pb-5 font-semibold">{volume?.title}</h1>

        <section className="flex gap-x-10 flex-col gap-y-10 md:flex-row">
          {/* Header Volume Cover */}
          <div className="relative rounded-lg overflow-hidden bg-white aspect-[9/13] flex-shrink-0 w-60 shadow border">
            <img
              src={volume?.archiveCover?.url ?? ""}
              className="object-cover object-center w-full h-full"
            />
          </div>

          {/* Header Details */}
          <div className="flex flex-col gap-y-5">
            <h2 className="font-semibold text-2xl">About the Cover</h2>
            {/* <RichText content={volume?.about} /> */}
            <a
              href={encodeURIComponent(volume?.pdf?.url ?? "404") ?? "404"}
              target="_blank"
              download={volume?.title}
              className={button({
                class: "self-start flex items-center gap-x-1 rounded-md",
              })}
              onClick={(e) => {
                // 👇 Prevents opening the link on click (middle-click will work)
                // Which is what we want.
                e.preventDefault();

                async function download() {
                  const response = await fetch(volume?.pdf?.url ?? "");
                  const blob = await response.blob();

                  const downloadLink = document.createElement("a");
                  downloadLink.href = window.URL.createObjectURL(blob);
                  downloadLink.download = volume?.title ?? "Volume PDF";
                  downloadLink.click();
                }

                toast.promise(download(), {
                  loading: "Downloading...",
                  error: "Failed to download.",
                  success: `Downloaded ${volume?.title}!`,
                });
              }}
            >
              <Icon
                icon="material-symbols:sim-card-download-outline-rounded"
                className="relative top-[1px] flex-shrink-0"
              />
              <span className="truncate">Download Volume</span>
            </a>
          </div>
        </section>
      </div>

      <div className="h-12" />

      <div className="px-9 flex gap-x-5 items-center">
        {/* Portrait Mode Changer */}
        {!isMobile && (
          <button
            className={button({
              class: "rounded-md flex items-center gap-x-2",
            })}
            onClick={() => {
              setPageIsPortrait(!pageIsPortrait);

              setTimeout(() => {
                setCurrentPage(0);
              }, 500);
            }}
          >
            {pageIsPortrait ? (
              <Icon icon="lucide:book-minus" fontSize={28} />
            ) : (
              <Icon icon="lucide:book-open" fontSize={28} />
            )}
            <span>{pageIsPortrait ? "One-Page" : "Two-Page"}</span>
          </button>
        )}

        {/* Size Changer */}
        <div className="flex gap-x-3 items-center">
          <span className="text-primary-500 font-medium">Page Size </span>
          <Select
            instanceId={useId()}
            isOptionDisabled={(option) => option.disabled ?? false}
            placeholder="Change Size"
            isSearchable={false}
            value={selectedSizeModifierOption}
            options={sizeModifierOptions}
            onChange={handleSizeSelectChange}
            className="w-44"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#E6E6FA",
                primary50: "#ABACDB",
                primary: "#2E2FA5",
                primary75: "#03047A",
              },
            })}
          />
        </div>
      </div>

      <div className="h-16" />

      {/* Do not server render this. Heavy. */}
      {mounted && (
        <Document file={volume?.pdf?.url} onLoadSuccess={handlePDFLoadSuccess}>
          <div className="relative bottom-40 flex flex-col items-center mx-auto justify-center py-40 pointer-events-none w-full overflow-hidden">
            <FlipBook
              currentPage={currentPage}
              isPortrait={isMobile ? true : pageIsPortrait}
              pageNumbers={pageNumbers}
              pageSize={pageSize}
              onPageFlip={handlePageFlip}
              sizeModifier={sizeModifier}
            />
          </div>
        </Document>
      )}
    </div>
  );
}

// =============================================================================
// Subcomponent: (Flipbook)
// =============================================================================
type FlipBookType = {
  onPageFlip?: (event: { data: any }) => void;
  pageSize?: {
    width: number;
    height: number;
  };
  pageNumbers?: number;
  /** perecent size modifier */
  sizeModifier?: number;

  /** @defaultValue `false` */
  isPortrait?: boolean;

  /** Number */
  currentPage: number;
};

const FlipBook: FC<FlipBookType> = memo((props) => {
  const {
    pageSize,
    pageNumbers,
    onPageFlip,
    sizeModifier,
    isPortrait = false,
    currentPage,
  } = props;

  const applySizeModification = useCallback((size?: number, modifier?: number) => {
    if (!size) return undefined;

    if (!modifier) return size;

    return size * modifier;
  }, []);

  const height = useMemo(
    () => applySizeModification(pageSize?.height, sizeModifier),
    [applySizeModification, pageSize?.height, sizeModifier]
  );

  const width = useMemo(
    () => applySizeModification(pageSize?.width, sizeModifier),
    [applySizeModification, pageSize?.width, sizeModifier]
  );

  const renderedPages = useMemo(() => {
    if (!pageNumbers) return null;

    return [...Array(pageNumbers).keys()].map((pageNumber) => {
      if (!isInRange(pageNumber, currentPage - 2, currentPage + 3)) {
        return <div className="w-full h-full bg-gray-50" key={`${pageNumber}`}></div>;
      }

      return (
        <div className="w-full h-full bg-gray-50" key={`${pageNumber}`}>
          <Page key={pageNumber} pageNumber={pageNumber + 1} height={height} width={width} />
        </div>
      );
    });
  }, [pageNumbers, height, width, currentPage]);

  const containerWidth = useMemo(() => (isPortrait ? width : width! * 2), [width, isPortrait]);

  return (
    <>
      {!!(pageNumbers && pageSize) && (
        <div className="border-2 border-primary-400">
          <div
            style={{ width: containerWidth, height: height }}
            className="relative bg-primary-100 pointer-events-auto border-l border-transparent"
          >
            {isPortrait ? (
              <div className="absolute inset-0 flex items-center">
                <Icon
                  icon="uil:arrow-left"
                  className="left-0 absolute text-primary-300 mx-5"
                  fontSize={80}
                />
                <Icon
                  icon="uil:arrow-right"
                  className="right-0 absolute text-primary-300 mx-5"
                  fontSize={80}
                />
              </div>
            ) : (
              <div className="absolute grid grid-cols-2 inset-0">
                <div className="grid place-items-center w-full h-full text-primary-500 text-center p-8">
                  Click on the Cover to start reading! 👉
                </div>
                <div className="grid place-items-center w-full h-full text-primary-500 text-center p-8">
                  Done! 🎉
                </div>
              </div>
            )}

            {/* @ts-ignore */}
            <HTMLFlipBook
              key={`${width}-${height}-${isPortrait}`}
              style={{
                minHeight: 0,
                height: height,
              }}
              usePortrait={isPortrait}
              width={width!}
              height={height!}
              maxShadowOpacity={0.2}
              showCover
              onFlip={onPageFlip}
              flippingTime={500}
            >
              {renderedPages}
            </HTMLFlipBook>
          </div>
        </div>
      )}
    </>
  );
});
