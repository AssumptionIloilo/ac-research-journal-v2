import { graphql } from "@/lib/graphql";

export const GetHomeNewsDocument = graphql(`
  query GetHomeNews($newsLimit: Int!) {
    news: allNews(
      limit: $newsLimit
      sort: "publishedDate"
      # Don't show draft articles
      where: { status: { equals: published } }
    ) {
      docs {
        id
        title
        publishedDate
        readTime
        slug
        featureImage {
          alt
          url
        }
      }
    }
  }
`);

export const GetFeaturedArchiveDocument = graphql(`
  query GetFeaturedArchive {
    featuredArchive: Archives(limit: 1, sort: "publishedDate") {
      docs {
        id
        title
        about
        slug
        pdf {
          url
          alt
        }
        archiveCover {
          alt
          url
        }
        publishedDate
      }
    }
  }
`);
