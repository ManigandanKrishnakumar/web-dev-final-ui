import { ContentProvider, SideBar } from "./components";
import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { AppContextProvider } from "./state-management/app-context";
import { STATES } from "./state-management/constants";
import { appReducer } from "./state-management/app-reducer";
import { INITIAL_STATE } from "./state-management/constants";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [data, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    async function Checklogin() {
      try {
        const result = await fetch("http://localhost:3000/api/user/logged-in", {
          method: "GET",
          credentials: "include",
        });
        if (!result.ok) {
          throw new Error("not logged In");
        }
        const userInfo = await result.json();
        data[STATES.IS_LOGGED_IN] = true;
        data[STATES.CURRENT_USER] = userInfo;
        setUser(userInfo);
      } catch (error) {
        data[STATES.IS_LOGGED_IN] = false;
        navigate("/");
        //console.error(error);
      }
    }
    if (user !== null) {
    } else {
      Checklogin();
    }
  }, [user]);

  return (
    <AppContextProvider value={{ data, dispatch }}>
      <div className="App">
        <SideBar />
        <ContentProvider />
      </div>
    </AppContextProvider>
  );
}

export default App;
