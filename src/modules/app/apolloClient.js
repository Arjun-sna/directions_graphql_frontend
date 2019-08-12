import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import introspectionQueryResultData from './introspection.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});
const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'x-token': token || '',
    }
  }
});
const cache = new InMemoryCache({ fragmentMatcher });
const initialState = {
  token: null,
  user: null
}
cache.writeData({ data: initialState });
const client = new ApolloClient({
  link: ApolloLink.from([
    errorHandler,
    authLink,
    httpLink,
  ]),
  cache,
});
client.onResetStore(() => cache.writeData({ data: initialState }))

export default client;