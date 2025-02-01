import React, {createContext, useState} from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({children}) => {
  const [area, setArea] = useState('');
  const [timeInterval, setTimeInterval] = useState('');

  return (
    <HomeContext.Provider
      value={{area, setArea, timeInterval, setTimeInterval}}>
      {children}
    </HomeContext.Provider>
  );
};
