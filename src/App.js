import { ContentProvider, SideBar } from "./components";
import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { AppContextProvider } from "./state-management/app-context";
import { ACTION_TYPES, STATES } from "./state-management/constants";
import { appReducer } from "./state-management/app-reducer";
import { INITIAL_STATE } from "./state-management/constants";
import { useNavigate } from "react-router-dom";
import { BACK_END_POINTS } from "./apiconstants/apiConstants";
import { AppError } from "./models/AppError";
import { socket } from "./sockets/socket";

function App() {
  const [user, setUser] = useState(null);
  const [data, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const navigate = useNavigate();

  const fetchAllRequests = async () => {
    try {
      console.log("App.js fetch requests");
      dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await fetch(BACK_END_POINTS.REQUESTS.FETCH_ALL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataR = await res.json();
      console.log(data.payload);
      data[STATES.REQUESTS] = dataR.payload;
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      dispatch({
        type: ACTION_TYPES.SET_REQUESTS,
        payload: [...dataR.payload],
      });

      console.log(data[STATES.REQUESTS]);
    } catch (error) {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      dispatch({
        type: ACTION_TYPES.SET_ERROR_STATUS,
        payload: new AppError(
          "Unable to fetch requests !",
          "",
          fetchAllRequests
        ),
      });
      console.log(error);
    }
  };

  const listenforNewRequest = () => {
    socket.connect();
    socket.on("access-requested", (val) => {
      fetchAllRequests();
    });
  };

  useEffect(() => {
    async function Checklogin() {
      try {
        const result = await fetch("http://localhost:5000/api/user/logged-in", {
          method: "GET",
          credentials: "include",
        });
        if (!result.ok) {
          throw new Error("not logged In");
        }
        const userInfo = await result.json();
        data[STATES.IS_LOGGED_IN] = true;
        data[STATES.CURRENT_USER] = userInfo;
        console.log(">>>", userInfo);
        setUser(userInfo);
        await fetchAllRequests();

        listenforNewRequest();
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

    return () => {
      // socket.disconnect();
    };
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
