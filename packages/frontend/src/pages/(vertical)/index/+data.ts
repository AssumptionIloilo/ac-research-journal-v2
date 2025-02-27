import { client, ssrCache } from "@/lib/urql-client";
import { GetFeaturedArchiveDocument, GetHomeNewsDocument } from "@/queries/home";
import { PageContext } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;
export async function data(_: PageContext) {
  await client
    .query(
      GetHomeNewsDocument,
      { newsLimit: 3 },
      {
        requestPolicy: "network-only",
      }
    )
    .toPromise();

  await client.query(GetFeaturedArchiveDocument, {}, { requestPolicy: "network-only" }).toPromise();

  return {
    urqlState: ssrCache.extractData(),
  };
}
