import { gql } from "apollo-boost"

export const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      uuid
      email
    }
  }
`
