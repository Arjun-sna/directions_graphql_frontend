import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '~/components/layout';
import Routes from './routes';
import AppContextProvider from './contextProvider';

export default () => {
  
  return (
    <AppContextProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </AppContextProvider>
  );
};
