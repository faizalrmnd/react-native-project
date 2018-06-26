import gql from "graphql-tag"

export const GET_ALL_POST_QUERY = gql`
{
  posts {
    caption
    image
  }
}
`