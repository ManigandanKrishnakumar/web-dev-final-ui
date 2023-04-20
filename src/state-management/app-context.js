import React, {useReducer } from "react";
import { appReducer } from "./app-reducer";
import { INITIAL_STATE } from "./constants";
export const AppContext = React.createContext();


export const AppContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(appReducer, INITIAL_STATE);  
    return (
    <AppContext.Provider value={{ data, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
