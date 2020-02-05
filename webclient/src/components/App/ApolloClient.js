import cookies from 'js-cookie';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { GRAPHQL_SERVER_URI, COOKIE_TOKEN } from '../../shared/constants';

const logout = () => {
  cookies.remove(COOKIE_TOKEN);
};

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URI,
  cache,
  request: operation => {
    const token = cookies.get(COOKIE_TOKEN);
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
  },
  onError: ({ graphQLErrors, networkError }) => {
    // https://www.apollographql.com/docs/react/data/error-handling/
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (
      networkError &&
      networkError.statusCode &&
      networkError.statusCode === 401
    ) {
      logout();
    } else if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
});

export { client };
