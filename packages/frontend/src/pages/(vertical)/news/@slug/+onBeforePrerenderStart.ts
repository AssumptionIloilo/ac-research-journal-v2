// The reason why I deprecated this is because I kind of wanted ISR for this page.
// Unfortunately, we couldn't get that because it's actually impossible right now.
// I have a few ideas, but we'll see.

import { pageRoutes } from "@/constants/page-routes";
import { client } from "@/lib/urql-client";
import { AllNewsSlugsDocument } from "@/queries/news";

export async function onBeforePrerenderStart() {
  console.log("starting to prerender");
  const { data } = await client
    .query(AllNewsSlugsDocument, {}) // no need for request-policy, this only gets called once.
    .toPromise();

  const paths: string[] = [];

  // data?.allNews?.docs?.forEach((newsItem) => {
  //   if (!newsItem?.slug) return;

  //   paths.push(`${pageRoutes.news}/${newsItem.slug}`);
  // });

  return paths;
}
