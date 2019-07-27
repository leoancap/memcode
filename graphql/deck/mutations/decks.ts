import { gql } from "apollo-boost"

export const createDeckMutation = gql`
  mutation CreateDeck($data: DeckInput!) {
    createDeck(data: $data) {
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
export const createExerciseMutation = gql`
  mutation CreateExercise($data: ExerciseInput!) {
    createExercise(data: $data) {
      id
    }
  }
`

export const deleteDeck = gql`
  mutation deleteDeck($deckId: String!) {
    deleteDeck(deckId: $deckId) {
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

export const deleteExercise = gql`
  mutation deleteExercise($deckId: String!, $exerciseId: String!) {
    deleteExercise(deckId: $deckId, exerciseId: $exerciseId) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`
