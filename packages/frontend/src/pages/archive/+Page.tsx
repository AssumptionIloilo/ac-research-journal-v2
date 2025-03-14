// import { useQuery } from "urql";

// import ArchiveLayout from "@/components/layouts/ArchiveLayout";

import { VerticalMobileFooterOffset } from "@/components/layouts/vertical-mobile-footer";
import useArchiveWasPrevious from "./_hooks/use-archive-was-previous";

import { pageRoutes } from "@/constants/page-routes";
import { GetArchivesDocument } from "@/queries/archive";

import { useArchiveAsideContext } from "@/components/layouts/archive-aside/archive-aside-context";
import { OpenCloseButton } from "@/components/open-close-button";
import { extractTextFromContent } from "@/utils/extract-text-from-content";
import getTitle from "@/utils/get-title";
import { mediaUrl } from "@/utils/media-url";
import { PropsWithChildren } from "react";
import { useQuery } from "urql";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function ArchiveOverviewPage() {
  useMetadata({
    title: getTitle("Transformateur"),
  });

  const { setCollapsed, isCollapsible: shouldFloat } = useArchiveAsideContext();

  const { urlParsed } = usePageContext();
  const categorySearch = urlParsed.search["category"];
  const titleSearch = urlParsed.search["title"];
  const searchExists = categorySearch || titleSearch;

  const [{ data }] = useQuery({
    query: GetArchivesDocument,
    variables: {
      limit: 10,
      page: 0,
      categories: categorySearch ? [categorySearch] : undefined,
      title: titleSearch ? titleSearch : undefined,
    },
  });

  const archives = data?.Archives?.docs;

  return (
    <div
      className="flex-1 pt-16 pb-16 px-9 bg-[#EDF1FD]"
      style={{
        backgroundImage: `url('https://arc.net/noise-light.png')`,
        backgroundRepeat: "repeat",
      }}
    >
      {shouldFloat && <OpenCloseButton onClick={() => setCollapsed(false)} points="right" />}
      <h1 className="font-medium text-3xl text-dark-600 mb-2">Transformateur</h1>
      <p className="mb-5 text-sm text-primary-500">
        A Research Journal by Assumption Iloilo 18 General Luna St., Iloilo City, Philippines 5000
      </p>
      <div className="flex gap-10 flex-wrap">
        {(archives?.length ?? 0) <= 0 && (
          <p className="text-sm text-neutral-500">{`😔 No archives found${searchExists ? " based on your search filters" : ""}.`}</p>
        )}
        {archives?.map((volume) => (
          <VolumeCard
            key={volume?.id}
            id={volume?.id!}
            title={volume?.title}
            subtitle={extractTextFromContent(volume?.about).trim()}
            volumeCoverUrl={volume?.archiveCover?.url}
            href={`${pageRoutes.archive}/${volume?.slug}`}
          />
        ))}
      </div>
      <VerticalMobileFooterOffset className="md:hidden" />
    </div>
  );
}

// =====================================================
// Subcomponents
// =====================================================
type VolumeCardProps = {
  id: string;
  volumeCoverUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  href: string;
};

const VolumeCard = (props: PropsWithChildren & VolumeCardProps) => {
  const { id, volumeCoverUrl, title, subtitle, href } = props;
  const { saveArchiveWasPrevious } = useArchiveWasPrevious();
  return (
    <a
      href={href}
      className="group relative flex flex-col gap-y-4 max-w-[242px] cursor-pointer"
      onClick={(e) => {
        e.stopPropagation(); // Stop other onClicks from intercepting.
        e.preventDefault(); // Stop default <a> from redirecting.
        saveArchiveWasPrevious();
        document.startViewTransition(async () => {
          await navigate(href);
        });
      }}
    >
      <div className="-inset-3 bg-primary-200/10 absolute rounded-lg group-hover:opacity-100 opacity-0 transition" />

      <div className="relative rounded-md overflow-hidden bg-white aspect-[9/13]">
        <img
          src={mediaUrl(volumeCoverUrl)}
          alt={title ?? ""}
          style={{ viewTransitionName: `volimg-${id}` }}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="relative">
        <h3
          className="font-medium text-dark-500 mb-1"
          style={{ viewTransitionName: `voltitle-${id}` }}
        >
          {title}
        </h3>
        <p className="font-medium text-dark-400 text-sm line-clamp-2">{subtitle}</p>
      </div>
    </a>
  );
};
