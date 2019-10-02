import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useApolloClient from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import Layout from "~/components/layout";
import Routes from "./routes";
import AppContextProvider from "./contextProvider";
import Loader from "~/components/loader";

export default () => {
  const apolloClient = useApolloClient();

  if (!apolloClient) {
    return <Loader size="xs" />;
  }
  return (
    <AppContextProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </ApolloProvider>
    </AppContextProvider>
  );
};
