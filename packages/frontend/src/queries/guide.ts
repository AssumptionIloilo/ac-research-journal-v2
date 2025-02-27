import { graphql } from "@/lib/graphql";

export const GetGuidelinesDocument = graphql(`
  query GetGuidelines($limit: Int = 99999) {
    Guidelines(limit: $limit, sort: "orderNumber") {
      docs {
        id
        title
        orderNumber
        slug
        updatedAt
      }
    }
  }
`);

export const GetGuidelineDocument = graphql(`
  query GetGuideline($slug: String) {
    Guidelines(limit: 1, where: { slug: { equals: $slug } }) {
      docs {
        id
        title
        orderNumber
        slug
        updatedAt
        content
      }
    }
  }
`);
