import React, { useContext, useState } from "react";
import { socket } from "../../sockets/socket";
import { AppContext } from "../../state-management/app-context";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppError } from "../../models/AppError";

export const SpeedTestAccessError = () => {
  const { data, dispatch } = useContext(AppContext);
  const [requested, setRequested] = useState(false);

  const requestAccess = () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      socket.connect();
      socket.timeout(5000).emit("request-access", {
        timestamp: new Date().toISOString(),
        user: data[STATES.CURRENT_USER].username,
      });
      socket.disconnect();
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      setRequested(true);
    } catch (e) {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      dispatch({
        type: ACTION_TYPES.SET_ERROR_STATUS,
        payload: new AppError("Something went wrong", "", requestAccess),
      });
      console.log(e);
    }
  };

  return (
    <div className="error-message-container speed">
      <p>
        Sorry, you don't have access to do speed test. Please click the "Request
        Access" button to request access
      </p>
      <button onClick={requestAccess} disabled={requested}>
        {requested ? "Requested" : "Request Access"}
      </button>
    </div>
  );
};
