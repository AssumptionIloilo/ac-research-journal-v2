import { client, ssrCache } from "@/lib/urql-client";
import { NewsPageBySlugDocument } from "@/queries/news";
import { PageContext } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const slug = pageContext.routeParams.slug;

  await client
    .query(NewsPageBySlugDocument, { slug: slug }, { requestPolicy: "network-only" })
    .toPromise();

  return {
    urqlState: ssrCache.extractData(),
  };
}
