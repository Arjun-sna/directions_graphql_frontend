import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation ($userIdentifier: String!, $password: String!) {
    signIn(userIdentifier: $userIdentifier, password: $password) {
      token
    }
  }
`

export const SIGN_UP = gql`
  mutation ($userIdentifier: String!, $username: String!, $password: String!) {
    signUp(email: $userIdentifier, username: $username, password: $password) {
      id
    }
  }
`