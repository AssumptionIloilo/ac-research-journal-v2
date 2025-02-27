import { graphql } from "@/lib/graphql";

export const GetMainNewsDocument = graphql(`
  query GetMainNews($mainNewsTagId: JSON) {
    allNews(
      where: {
        tags: { equals: $mainNewsTagId }
        # Don't show draft articles.
        status: { equals: published }
      }
      sort: "publishedDate"
    ) {
      totalPages
      hasNextPage
      hasPrevPage
      docs {
        id
        slug
        publishedDate
        createdAt
        title
        content
        featureImage {
          url
          alt
        }
      }
    }
  }
`);

export const GetAllNewsDocument = graphql(`
  query GetAllNews($limit: Int!, $tagIds: [JSON], $page: Int) {
    allNews(
      limit: $limit
      # Starts at 1
      page: $page
      sort: "publishedDate"
      where: {
        tags: { in: $tagIds }
        # Don't show draft articles.
        status: { equals: published }
      }
    ) {
      totalPages
      hasNextPage
      hasPrevPage
      docs {
        id
        slug
        publishedDate
        createdAt
        title
        content
        featureImage {
          url
          alt
        }
      }
    }
  }
`);

export const GetNewsTagsDocument = graphql(`
  query GetNewsTags {
    NewsTags(limit: 99999) {
      docs {
        id
        name
      }
    }
  }
`);

export const AllNewsSlugsDocument = graphql(`
  query AllNewsSlugs {
    allNews(
      page: 0
      limit: 99999
      # Don't show draft articles.
      where: { status: { equals: published } }
    ) {
      docs {
        slug
      }
    }
  }
`);

export const NewsPageBySlugDocument = graphql(`
  query NewsPageBySlug($slug: String) {
    allNews(
      limit: 1
      where: {
        slug: { equals: $slug }
        # Don't show draft articles.
        status: { equals: published }
      }
    ) {
      docs {
        id
        title
        publishedDate
        updatedAt
        createdAt
        readTime
        content
        tags {
          id
          name
        }
        author {
          name
          avatarImage {
            url
          }
        }
        featureImage {
          url
          alt
        }
      }
    }
  }
`);
