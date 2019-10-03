import { useState, useEffect } from "react";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { persistCache } from "apollo-cache-persist";
import introspectionQueryResultData from "./introspection.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT
});
let authToken = null;
const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError && networkError.statusCode === 401) {
    authToken = null;
    console.log(`[Network error]: ${networkError}`);
  }
});
const authLink = setContext((_, { headers }) => {
  if (!authToken) {
    authToken = localStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      "x-token": authToken || ""
    }
  };
});
const cache = new InMemoryCache({ fragmentMatcher });
const initialState = {
  token: null,
  user: null
};
cache.writeData({ data: initialState });

function useApolloClient() {
  const [apolloClient, setApolloClient] = useState(null);
  useEffect(() => {
    async function setUpClient() {
      await persistCache({
        cache,
        storage: window.localStorage
      });
      const client = new ApolloClient({
        link: ApolloLink.from([errorHandler, authLink, httpLink]),
        cache
      });
      client.onResetStore(() => cache.writeData({ data: initialState }));
      setApolloClient(client);
    }

    setUpClient();
  }, []);

  return apolloClient;
}

export default useApolloClient;
