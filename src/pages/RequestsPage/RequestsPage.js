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

  //   const fetchAllRequests = async () => {
  //     try {
  //       dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null });
  //       dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
  //       const res = await fetch(BACK_END_POINTS.REQUESTS.FETCH_ALL, {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await res.json();
  //       dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });

  //       dispatch({ type: ACTION_TYPES.SET_REQUESTS, payload: data.payload });
  //     } catch (error) {
  //       dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
  //       dispatch({
  //         type: ACTION_TYPES.SET_ERROR_STATUS,
  //         payload: new AppError("Something went wrong", "", fetchAllRequests),
  //       });
  //       console.log(error);
  //     }
  //   };

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

  const deleteRequest = async (id) => {
    // console.log(id);
    try {
      dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await fetch(BACK_END_POINTS.REQUESTS.DELETE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await res.json();
      const prev = [...data[STATES.REQUESTS]];
      const newArray = prev.filter((req) => req.id !== id);
      dispatch({ type: ACTION_TYPES.SET_REQUESTS, payload: newArray });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });

      dispatch({
        type: ACTION_TYPES.SET_ERROR_STATUS,
        payload: new AppError(
          "Unable to delete the request",
          "",
          deleteRequest
        ),
      });
      console.log(error);
    }
  };

  const approveRequest = async (username, meta_data, id) => {
    console.log(meta_data);
    // console.log(id);
    try {
      dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await fetch(BACK_END_POINTS.REQUESTS.APPROVE_REQUEST, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          username: username,
          meta_data: JSON.parse(meta_data),
        }),
      });
      await res.json();
      const prev = [...data[STATES.REQUESTS]];
      const newArray = prev.filter((req) => req.id !== id);
      dispatch({ type: ACTION_TYPES.SET_REQUESTS, payload: newArray });
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });

      dispatch({
        type: ACTION_TYPES.SET_ERROR_STATUS,
        payload: new AppError(
          "Unable to approve the request",
          "",
          deleteRequest
        ),
      });
      console.log(error);
    }
  };

  return (
    <div id="requests-page-container">
      <h1> Requests Page</h1>
      <div className="requests-container">
        {data[STATES.REQUESTS].map((request, index) => {
          return (
            <RequestItem
              request={request}
              key={index}
              deleteRequest={() => {
                deleteRequest(request.id);
              }}
              approveRequest={() => {
                approveRequest(
                  request.user_name,
                  request.meta_data,
                  request.id
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
