import { gql } from "apollo-boost"

export const myDecksToReviewQuery = gql`
  query myDecksToReview {
    myDecksToReview {
      id
      deckToReviewId
      deck {
        title
        description
        language
        tags
        id
      }
      exercisesToReview {
        id
        exerciseId
        nextInterval
        lastAttempt
        exercise {
          id
          title
          description
          code
          solution
          tests
        }
      }
    }
  }
`
