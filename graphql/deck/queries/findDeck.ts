import { gql } from "apollo-boost"

export const findDeckByTitleQuery = gql`
  query FindDeckByTitle($user: String!, $title: String!) {
    findDeckByTitle(user: $user, title: $title) {
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

export const findDeckByIdAndUserQuery = gql`
  query FindDeckByIdAndUser($user: String!, $deckId: String!) {
    findDeckByIdAndUser(user: $user, deckId: $deckId) {
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

export const findDeckByIdQuery = gql`
  query FindDeckById($deckId: String!) {
    findDeckById(deckId: $deckId) {
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

export const findDecksByLanguage = gql`
  query FindDecksByLanguage($language: String!) {
    findDecksByLanguage(language: $language) {
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
