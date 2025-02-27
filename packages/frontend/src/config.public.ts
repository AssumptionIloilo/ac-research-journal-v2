/** Only place public configurations here. */
export const publicConfig = {
  BASE_ORIGIN: (import.meta.env.PUBLIC_BASE_ORIGIN || "http://localhost:3000") as string,
  GRAPHQL_ENDPOINT: (`${import.meta.env.PUBLIC_CMS_ENDPOINT}/api/graphql` ||
    "http://localhost:8080/api/graphql") as string,
  CMS_ENDPOINT: (import.meta.env.PUBLIC_CMS_ENDPOINT || "http://localhost:8080") as string,
};
