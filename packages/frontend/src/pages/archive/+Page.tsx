// import { useQuery } from "urql";

// import ArchiveLayout from "@/components/layouts/ArchiveLayout";

import useArchiveWasPrevious from "./_hooks/use-archive-was-previous";

import { pageRoutes } from "@/constants/page-routes";

// import { client, ssrCache } from "@/lib/urqlClient";
// import { NextPageWithLayout } from "@/pages/_app";
import { extractTextFromContent } from "@/utils/extract-text-from-content";
import getTitle from "@/utils/get-title";
import { PropsWithChildren } from "react";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const params = ctx?.params as { page?: number; limit?: number } | undefined;

//   const { data } = await client
//     .query(
//       GetArchivesDocument,
//       { limit: params?.limit, page: params?.page },
//       { requestPolicy: "network-only" }
//     )
//     .toPromise();

//   return {
//     props: {
//       pageInfo: {
//         limit: params?.limit ?? null,
//         page: params?.page ?? null,
//       },
//       urqlState: ssrCache.extractData(),
//     },
//   };
// }

export default function ArchiveOverviewPage() {
  useMetadata({
    title: getTitle("Archive"),
  });

  const { urlParsed } = usePageContext();
  const categorySearch = urlParsed.search["category"];
  const titleSearch = urlParsed.search["title"];
  const searchExists = categorySearch || titleSearch;

  // const [{ data }] = useQuery({
  //   query: GetArchivesDocument,
  //   variables: {
  //     limit: props?.pageInfo?.limit,
  //     page: props?.pageInfo?.page,
  //     categories: categorySearch ? [categorySearch] : undefined,
  //     title: titleSearch ? titleSearch : undefined,
  //   },
  // });
  const data: any = null;

  const archives = data?.Archives?.docs;

  return (
    <div className="flex-1 pt-16 px-9 bg-[#EDF1FD]">
      <h1 className="font-medium text-3xl text-dark-600 mb-7">Archives</h1>
      <div>
        {(archives?.length ?? 0) <= 0 && (
          <p>{`😔 No archives found${searchExists ? " based on your search filters" : ""}.`}</p>
        )}
        {archives?.map((volume: any) => (
          <VolumeCard
            key={volume?.id}
            title={volume?.title}
            subtitle={extractTextFromContent(volume?.about)?.at(0)?.slice(1, 45) + "..."}
            volumeCoverUrl={volume?.archiveCover?.url}
            href={`${pageRoutes.archive}/${volume?.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

// =====================================================
// Subcomponents
// =====================================================
type VolumeCardProps = {
  volumeCoverUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  href: string;
};

const VolumeCard = (props: PropsWithChildren & VolumeCardProps) => {
  const { volumeCoverUrl, title, subtitle, href } = props;
  const { saveArchiveWasPrevious } = useArchiveWasPrevious();
  return (
    <a
      href={href}
      className="group relative flex flex-col gap-y-4 max-w-[242px]"
      onClick={() => saveArchiveWasPrevious()}
    >
      <div className="-inset-3 bg-primary-200/10 absolute rounded-lg group-hover:opacity-100 opacity-0 transition" />

      <div className="relative rounded-md overflow-hidden bg-white aspect-[9/13]">
        <img
          src={volumeCoverUrl ?? ""}
          alt={title ?? ""}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="relative">
        <h3 className="font-medium text-dark-500 mb-1">{title}</h3>
        <p className="font-medium text-dark-400">{subtitle}</p>
      </div>
    </a>
  );
};
