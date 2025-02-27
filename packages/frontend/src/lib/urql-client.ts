import { publicConfig } from "@/config.public";
import { cacheExchange, Client, fetchExchange, ssrExchange } from "urql";

// FOR URQL SSR to be possible.

const isServerSide = typeof window === "undefined";

/** ssrCache must restore state at Layout. Make sure to add this there. */
export const ssrCache = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
});

/** Client can be used in Layout for client-side stuff and also as a server-side fetch client. */
export const client = new Client({
  url: publicConfig.GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    return { headers: {} };
  },
});
