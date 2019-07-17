import React, { createContext, useReducer, useContext } from 'react';
import contextReducer from './contextReducer';

const AppDataContext = createContext();
const initialState = {
  restaurantListData: {
    restaurantList: [],
    startFromOffset: 0,
    hasMoreData: true,
  },
}
const AppContextProvider = ({ children }) => {
  const contextValue = useReducer(contextReducer, initialState);

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppContext = () => {
  const appContextValue = useContext(AppDataContext);
  return appContextValue;
};

export default AppContextProvider;
