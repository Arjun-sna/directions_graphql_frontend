import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '~/components/layout';
import LocationPicker from '~/components/locationPicker';
import Routes from './routes';
import AppContextProvider from './contextProvider';

export default () => {
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSideBar(true);
    }, 500);
  }, []);

  return (
    <AppContextProvider>
      <Router>
        <Layout setShowSideBar={setShowSideBar}>
          <Routes />
        </Layout>
      </Router>
    </AppContextProvider>
  );
};
