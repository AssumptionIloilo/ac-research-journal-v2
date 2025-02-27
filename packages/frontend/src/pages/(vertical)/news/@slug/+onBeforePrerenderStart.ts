import { pageRoutes } from "@/constants/page-routes";
import { client } from "@/lib/urql-client";
import { AllNewsSlugsDocument } from "@/queries/news";

export async function onBeforePrerenderStart() {
  const { data } = await client
    .query(AllNewsSlugsDocument, {}) // no need for request-policy, this only gets called once.
    .toPromise();

  const paths: string[] = [];

  data?.allNews?.docs?.forEach((newsItem) => {
    if (!newsItem?.slug) return;

    paths.push(`${pageRoutes.news}/${newsItem.slug}`);
  });

  return paths;
}
