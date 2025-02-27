import { graphql } from "@/lib/graphql";

export const GetArchivesDocument = graphql(`
  query GetArchives($limit: Int = 10, $page: Int = 1, $categories: [JSON], $title: String) {
    Archives(
      limit: $limit
      page: $page
      sort: "publishedDate"
      where: { categories: { in: $categories }, title: { like: $title } }
    ) {
      docs {
        id
        title
        archiveCover {
          alt
          url
        }
        slug
        about(depth: 1)
        publishedDate
      }
    }
  }
`);

export const GetArchiveCategoriesDocument = graphql(`
  query GetArchiveCategories {
    ArchiveCategories(limit: 100000) {
      docs {
        id
        name
      }
    }
  }
`);

export const GetArchiveBySlugDocument = graphql(`
  query GetArchiveBySlug($slug: String) {
    Archives(limit: 1, where: { slug: { equals: $slug } }) {
      docs {
        id
        slug
        title
        pdf {
          url
          alt
        }
        archiveCover {
          alt
          url
        }
        about
        publishedDate
      }
    }
  }
`);
