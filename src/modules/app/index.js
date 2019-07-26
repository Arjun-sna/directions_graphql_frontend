import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Layout from '~/components/layout';
import Routes from './routes';
import AppContextProvider from './contextProvider';

const apolloClient = new ApolloClient({
  uri: 'https://directions-graphql.herokuapp.com/graphql'
});

export default () => {
  
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
