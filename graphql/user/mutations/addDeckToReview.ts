import { gql } from "apollo-boost"

export const addDeckToReview = gql`
  mutation addDeckToReview(
    $exerciseId: String!
    $deckId: String!
    $level: Float!
  ) {
    addDeckToReview(exerciseId: $exerciseId, deckId: $deckId, level: $level) {
      id
    }
  }
`
