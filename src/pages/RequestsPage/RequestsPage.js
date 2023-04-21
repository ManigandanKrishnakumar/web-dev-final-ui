import React, { useContext, useEffect, useState } from "react";

import "./RequestsPage.scss";
import { socket } from "../../sockets/socket";
import { AppContext } from "../../state-management/app-context";
import axiosConfig from "../../axiosConfig/axios-config";
import { BACK_END_POINTS } from "../../apiconstants/apiConstants";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppError } from "../../models/AppError";
import { RequestItem } from "../../components";
import { useNavigate } from "react-router";
import { USER_ROLES } from "../../constants/appConstants";

export const RequestsPage = () => {
  const { data, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // const [requests, setRequests] = useState([]);

  const fetchAllRequests = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await fetch(BACK_END_POINTS.REQUESTS.FETCH_ALL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });

      dispatch({ type: ACTION_TYPES.SET_REQUESTS, payload: data.payload });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      dispatch({
        type: ACTION_TYPES.SET_ERROR_STATUS,
        payload: new AppError("Something went wrong", "", fetchAllRequests),
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      (data[STATES.CURRENT_USER].userRole === USER_ROLES.ADMIN &&
        data[STATES.IS_LOGGED_IN]) !== true
    ) {
      navigate("/");
    } else {
      //  fetchAllRequests();
    }
  }, []);

  //   useEffect(() => {
  //     socket.connect();

  //     socket.on("access-requested", (val) => {
  //       fetchAllRequests();
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  return (
    <div id="requests-page-container">
      <h1> Requests Page</h1>
      <div className="requests-container">
        {data[STATES.REQUESTS].map((request, index) => {
          return <RequestItem request={request} key={index} />;
        })}
      </div>
    </div>
  );
};
