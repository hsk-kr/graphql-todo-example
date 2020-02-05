import gql from 'graphql-tag';

export const SIGNIN_WITH_GOOGLE = gql`
  mutation GoogleSignIn($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
      token
    }
  }
`;
