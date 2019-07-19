import { gql } from "apollo-boost"

export const decksQuery = gql`
  query Decks {
    decks {
      id
      title
      description
      tags
      language
      bundledExercises
      user {
        id
        uuid
      }
    }
  }
`
