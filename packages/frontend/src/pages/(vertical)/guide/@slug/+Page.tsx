// import { useQuery } from 'urql';

// import { RichText } from '@/components/rich-text'; ?/ REPLACE WITH RICH TEXT FROM TAILWIND PROSE

// import { GetGuidelineDocument, GetGuidelinesDocument } from '@/gql/graphql';
// import { client, ssrCache } from '@/lib/urqlClient';

import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format-date";
import getTitle from "@/utils/get-title";
import { useMetadata } from "vike-metadata-react";
import { usePageContext } from "vike-react/usePageContext";

// =============================================================================
// Server-Side Calls from the Page.
// =============================================================================
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const { slug } = ctx.params as { slug: string };

//   const { data: guidelinesData } = await client
//     .query(
//       GetGuidelinesDocument,
//       { limit: 0 },
//       { requestPolicy: 'network-only' },
//     )
//     .toPromise();

//   const { data: guidelineData } = await client
//     .query(
//       GetGuidelineDocument,
//       { slug: slug },
//       { requestPolicy: 'network-only' },
//     )
//     .toPromise();

//   return {
//     props: {
//       slug,
//       urqlState: ssrCache.extractData(),
//     },
//   };
// }

export default function GuidelinesPage() {
  useMetadata({
    title: getTitle("Guidelines"),
  });

  const { routeParams } = usePageContext();

  // const [{ data: guidelineData }] = useQuery({
  //   query: GetGuidelineDocument,
  //   variables: {
  //     slug: routeParams.slug,
  //   },
  // });
  const guidelineData: any = null;

  const guideline = guidelineData?.Guidelines?.docs?.at(0);

  return (
    <>
      <div className={cn("flex flex-col flex-1 mt-16", "md:mt-0")}>
        <h1 className="text-3xl font-bold mb-3">{guideline?.title}</h1>
        <span className="text-dark-200 text-sm">
          Last Updated: {formatDate(guideline?.updatedAt)}
        </span>

        <div className="h-10" />

        {/* <RichText content={guideline?.content} /> */}
      </div>
    </>
  );
}
