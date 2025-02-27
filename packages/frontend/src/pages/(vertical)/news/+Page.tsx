import { FC, useMemo, useRef, useState } from "react";

import { GetAllNewsDocument, GetMainNewsDocument, GetNewsTagsDocument } from "@/queries/news";
import { useQuery } from "urql";

import Badge from "@/components/badge";
import { pageRoutes } from "@/constants/page-routes";
import useSizeChange from "@/hooks/use-size-change";
import { container } from "@/styles/variants";
import { cn } from "@/utils/cn";
import { extractTextFromContent } from "@/utils/extract-text-from-content";
import { formatDate } from "@/utils/format-date";
import getTitle from "@/utils/get-title";
import { mediaUrl } from "@/utils/media-url";
import qs from "querystring";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function NewsOverviewPage() {
  useMetadata({
    title: getTitle("News"),
  });

  /** For searchParams (server-side compatible in Next.JS) */
  const { urlParsed } = usePageContext();

  /** Search Params in /news page. */
  const pageSearch = Number(urlParsed.search["page"]) || 1;
  const tagsSearch = useMemo(() => {
    return urlParsed.searchAll["tags"] ?? [];
  }, [urlParsed.search, urlParsed.searchAll]);

  // ===========================================================================
  // Queries
  // ===========================================================================

  const [newsQuery] = useQuery({
    query: GetAllNewsDocument,
    variables: {
      limit: 15,
      page: pageSearch,
      tagIds: tagsSearch?.length > 0 ? tagsSearch : undefined,
    },
  });

  const [newsTagsQuery] = useQuery({
    query: GetNewsTagsDocument,
  });

  /** Derived state from newsTagsQuery. (Used as input for mainNewsQuery) */
  const mainNewsTagId = useMemo(
    () => newsTagsQuery?.data?.NewsTags?.docs?.find((tag) => tag?.name === "MAIN")?.id,
    [newsTagsQuery?.data?.NewsTags?.docs]
  );
  const [mainNewsQuery] = useQuery({
    query: GetMainNewsDocument,
    variables: {
      mainNewsTagId: mainNewsTagId,
    },
    pause: !mainNewsTagId,
  });

  // ===========================================================================
  // Derived States
  // ===========================================================================

  // @ts-ignore - To easily access a single NewsData as an alias.
  type NewsDataType = NonNullable<typeof newsQuery.data.allNews.docs>[number];

  const newsToDisplay: {
    /** Will either show: Main Story or 'Latest' Story if no main stories. */
    bigCard?: NewsDataType;
    /** Will be null when there's no other 'main stories' */
    mainStories?: NewsDataType[];
    /** Will show ALL the stories. */
    otherStories?: NewsDataType[];
  } = useMemo(() => {
    // 1. If Main News exists
    if (mainNewsQuery?.data?.allNews?.docs?.length) {
      return {
        bigCard: mainNewsQuery?.data?.allNews?.docs?.at(0) ?? undefined,
        mainStories: mainNewsQuery?.data?.allNews?.docs?.slice(1) ?? undefined,
        otherStories: newsQuery?.data?.allNews?.docs ?? undefined,
      };
    }

    // 2. If Main News Doesn't exist. Fall back everything to otherNews
    return {
      bigCard: newsQuery?.data?.allNews?.docs?.at(0) ?? undefined,
      mainStories: newsQuery?.data?.allNews?.docs?.slice(1, 4),
      otherStories: newsQuery?.data?.allNews?.docs?.slice(1) ?? undefined,
    };
  }, [mainNewsQuery?.data?.allNews?.docs, newsQuery?.data?.allNews?.docs]);

  // ===========================================================================
  // Functions
  // ===========================================================================

  /** Whenever a tag button is clicked in the 'filters' */
  function handleTagClick(tagId: string) {
    // 1. Parse URL
    const oldURL = new URL(window.location.href);

    /** Get search params without the `?` */
    const oldSearchString = oldURL.search.replace("?", "");

    const oldSearchObject = qs.parse(oldSearchString);

    // Cleaning Input
    if (!Array.isArray(oldSearchObject?.tags)) {
      // When only 1 item
      if (oldSearchObject?.tags) oldSearchObject.tags = [oldSearchObject.tags];
      // When undefined
      if (!oldSearchObject?.tags) oldSearchObject.tags = [];
    }

    // 2.1. Remove
    if (oldSearchObject.tags?.includes(tagId)) {
      // @ts-ignore
      oldSearchObject.tags = oldSearchObject.tags.filter((tag: any) => tag !== tagId);
    }
    // 2.2. Add
    // @ts-ignore
    else oldSearchObject.tags.push(tagId);

    const newSearchString = qs.stringify(oldSearchObject);

    // Navigate
    // 1. If empty, remove all search queries.
    if (newSearchString === "") {
      navigate(window.location.origin + window.location.pathname, {
        keepScrollPosition: true,
        overwriteLastHistoryEntry: true,
      });
      return;
    }
    // 2. If Not empty, add the new search query
    navigate(window.location.origin + window.location.pathname + "?" + newSearchString, {
      keepScrollPosition: true,
      overwriteLastHistoryEntry: true,
    });
  }

  // ===========================================================================
  // Returns
  // ===========================================================================

  return (
    <div className={container({ class: "gap-y-10 pt-5 pb-20" })}>
      {/* ====================================================================== */}

      {newsToDisplay?.bigCard && (
        <FeaturedNewsCard
          id={newsToDisplay?.bigCard?.id}
          loading={mainNewsQuery?.fetching || newsTagsQuery?.fetching}
          href={`${pageRoutes.news}/${newsToDisplay?.bigCard?.slug}`}
          contentString={extractTextFromContent(newsToDisplay?.bigCard?.content).trim()}
          publishedDate={newsToDisplay?.bigCard?.publishedDate ?? newsToDisplay?.bigCard?.createdAt}
          image={{
            url: newsToDisplay?.bigCard?.featureImage?.url,
            alt: newsToDisplay?.bigCard?.featureImage?.alt ?? "",
          }}
          title={newsToDisplay?.bigCard?.title}
        />
      )}

      {/* ====================================================================== */}

      {newsToDisplay?.mainStories && newsToDisplay?.mainStories?.length > 0 && (
        <>
          <h2 className="text-3xl text-primary-500 font-bold">Main Stories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
            {newsToDisplay?.mainStories?.map((news: any) => (
              <NewsCard
                key={news?.id}
                href={`${pageRoutes.news}/${news?.slug}`}
                image={{
                  url: news?.featureImage?.url ?? "",
                  alt: news?.featureImage?.alt ?? "",
                }}
                title={news?.title}
                date={news?.publishedDate}
              />
            ))}
          </div>
        </>
      )}

      {/* ====================================================================== */}

      <h2 className="text-3xl text-primary-500 font-bold">All Stories</h2>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span>Filter:</span>
        <button
          onClick={() => {
            navigate(window.location.origin + window.location.pathname, {
              keepScrollPosition: true,
            });
          }}
        >
          <Badge
            className={cn(
              tagsSearch?.length === 0 ? "bg-primary-500 text-white" : "bg-gray-50 text-gray-500"
            )}
          >
            All
          </Badge>
        </button>
        {newsTagsQuery?.data?.NewsTags?.docs?.map((newsTag: any) => (
          <button
            key={newsTag?.id}
            onClick={() => {
              handleTagClick(newsTag?.id!);
            }}
          >
            <Badge
              className={cn(
                tagsSearch.includes(newsTag?.id!)
                  ? "bg-primary-500 text-white"
                  : "bg-gray-50 text-gray-500"
              )}
            >
              {newsTag?.name}
            </Badge>
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {!newsToDisplay?.otherStories ||
        (newsToDisplay?.otherStories?.length === 0 && (
          <div className="">🥲 No news data found.</div>
        ))}

      {/* EXISTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {newsToDisplay?.otherStories?.map((newsItem: any) => (
          <NewsCard
            key={newsItem?.id}
            id={newsItem?.id}
            title={newsItem?.title ?? ""}
            image={{
              url: newsItem?.featureImage?.url ?? "",
              alt: newsItem?.featureImage?.alt ?? undefined,
            }}
            href={`${pageRoutes.news}/${newsItem?.slug}`}
            date={newsItem?.publishedDate}
          />
        ))}
      </div>

      <div className="flex gap-x-2">
        <button
          className="disabled:cursor-not-allowed disabled:opacity-20 text-sm rounded-full bg-gray-200 border border-primary-500 px-5"
          disabled={!newsQuery?.data?.allNews?.hasPrevPage}
          onClick={() => {
            if (!newsQuery?.data?.allNews?.hasPrevPage) return;

            const newPageSearch = pageSearch - 1;

            const url = new URL(window.location.href);

            url.searchParams.set("page", newPageSearch.toString());

            navigate(url.toString(), { keepScrollPosition: true, overwriteLastHistoryEntry: true });
          }}
        >
          Previous
        </button>
        <span className="text-gray-500 text-sm">
          {pageSearch} / {newsQuery?.data?.allNews?.totalPages}
        </span>
        <button
          className="disabled:cursor-not-allowed disabled:opacity-20 text-sm rounded-full bg-gray-200 border border-primary-500 px-5"
          disabled={!newsQuery?.data?.allNews?.hasNextPage}
          onClick={() => {
            if (!newsQuery?.data?.allNews?.hasNextPage) return;

            const newPageSearch = pageSearch + 1;

            const url = new URL(window.location.href);

            url.searchParams.set("page", newPageSearch.toString());

            navigate(url.toString(), { keepScrollPosition: true, overwriteLastHistoryEntry: true });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// =========================
// Subcomponent (Featured News)
// =========================
type FeaturedNewsCardType = {
  id: string;
  loading?: boolean;
  title?: string;
  href: string;
  publishedDate?: string | null;
  contentString: string;
  image: {
    url?: string | null;
    alt?: string | null;
  };
};

const FeaturedNewsCard: FC<FeaturedNewsCardType> = (props) => {
  const { title, href, publishedDate, contentString, image, loading = false } = props;

  const featuredOverlayRef = useRef<HTMLDivElement>(null);
  const featuredOverlaySize = useSizeChange(featuredOverlayRef);

  /**
   * A special state for indicating that the element is hovered. The shape is
   * different so I can't just use a different way to setHoverred.
   */
  const [hovered, setHoverred] = useState<boolean>(false);

  const hoverProps = {
    onMouseEnter: () => setHoverred(true),
    onMouseLeave: () => setHoverred(false),
  };

  return (
    <div className={`${hovered ? "group " : ""}relative`}>
      <a
        href={href}
        className="relative block h-[25rem] w-full object-cover overflow-hidden rounded-md bg-primary-50"
        {...hoverProps}
        onClick={(e) => {
          e.stopPropagation(); // Stop other onClicks from intercepting
          e.preventDefault(); // Stop default <a> from redirecting.
          if (document.startViewTransition)
            document.startViewTransition(async () => {
              const promise = navigate(href);
              await promise;
            });
        }}
        // style={{ viewTransitionName: `newsimg-${id}` }}
      >
        {loading ? (
          <div className="inset-0 absolute bg-primary-100" />
        ) : (
          <>
            <img
              className="w-full h-full object-cover absolute blur-md"
              src={mediaUrl(image.url)}
              alt={image?.alt ?? ""}
            />
            <img
              aria-hidden
              className="pointer-events-none select-none relative w-full h-full object-cover md:object-contain object-top group-hover:scale-105 transition"
              src={mediaUrl(image.url)}
              alt={image?.alt ?? ""}
            />
          </>
        )}
      </a>
      <div className="flex justify-center">
        <div
          ref={featuredOverlayRef}
          className="w-11/12 p-5 absolute bg-[#F9F9FF] bottom-0 group-hover:bg-primary-500 transition"
          {...hoverProps}
        >
          <h2 className="text-dark-500 text-2xl font-bold group-hover:text-white transition">
            {loading ? "Loading..." : title}
          </h2>

          {loading ? (
            "Loading..."
          ) : (
            <p className="text-dark-400 group-hover:text-primary-200 transition line-clamp-4">
              {contentString}
            </p>
          )}
          <div className="h-8" />
          <a href={href} className="text-primary-300 font-bold text-sm flex justify-between">
            <span>{formatDate(publishedDate)}</span>
            <span className="group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 opacity-0 transition">
              Read More
            </span>
          </a>
        </div>
      </div>
      <div className="h-20" style={{ height: (featuredOverlaySize?.height ?? 2) / 2 }} />
    </div>
  );
};

// =========================
// Subcomponent (News Card)
// =========================
type NewsCardType = {
  id?: string;
  title: string;
  href: string;
  image: {
    alt?: string;
    url: string;
  };
  date: string;
};

const NewsCard: FC<NewsCardType> = (props) => {
  const { id, title, href, image } = props;

  return (
    <a
      href={href}
      className="flex flex-col gap-y-4 group"
      onClick={(e) => {
        e.stopPropagation(); // Stop other onClicks from intercepting
        e.preventDefault(); // Stop default <a> from redirecting.
        if (document.startViewTransition)
          document.startViewTransition(async () => {
            const promise = navigate(href);
            await promise;
          });
      }}
    >
      <div
        className="relative aspect-[5/4] overflow-hidden rounded-md transition bg-primary-100"
        style={{ viewTransitionName: id ? `newsimg-${id}` : undefined }}
      >
        <img
          src={mediaUrl(image.url)}
          alt={image.alt ?? title}
          className="object-cover object-center group-hover:scale-105 transition w-full h-full"
        />
      </div>
      <div>
        <p className="text-xs text-gray-400">{formatDate(props.date)}</p>
        <h3 className="text-dark-700 font-medium line-clamp-4">{title}</h3>
      </div>
    </a>
  );
};
