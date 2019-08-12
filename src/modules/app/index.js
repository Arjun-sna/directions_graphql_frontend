import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from './apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import Layout from '~/components/layout';
import Routes from './routes';
import AppContextProvider from './contextProvider';

export default () => {
  
  return (
    <AppContextProvider>
      <ApolloProvider client={ApolloClient}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </ApolloProvider>
    </AppContextProvider>
  );
};
