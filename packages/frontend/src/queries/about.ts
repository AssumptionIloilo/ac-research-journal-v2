import { graphql } from "@/lib/graphql";

export const GetEditorialBoardDocument = graphql(`
  query GetEditorialBoard {
    EditorialBoard {
      boardGroups {
        id
        heading
        members {
          id
          profileImage {
            url
          }
          name
          subtitle
        }
      }
    }
  }
`);
