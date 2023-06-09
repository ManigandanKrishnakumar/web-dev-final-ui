import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppContext } from "../../state-management/app-context";
import { BACK_END_POINTS } from "../../apiconstants/apiConstants";
import { UserPopup } from "../../components/UsersList/Userpopup";
import { URLS } from "../../constants/navConstants";
import { useNavigate, useParams } from "react-router-dom";

export const PublicUserInfo = () => {
  const { pathname } = useLocation();
  const { data, dispatch } = useContext(AppContext);
  const [errStatus, setErrStatus] = React.useState(false);
  const [publicInfo, setPublicInfo] = useState();
  const [showPopup, setShowPopup] = React.useState(false);
  const { username } = useParams();
  console.log("Inside Public User Info");

  const getPublicInfo = async () => {
    // var username = username;
    setErrStatus(false);
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    try {
      var result = { username: username };
      const res = await fetch(BACK_END_POINTS.USER_INFO.PUBLICINFO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const resJson = await res.json();
      if (resJson.isSuccess === true) {
        if (resJson.payload.length == 0) {
          setErrStatus(true);
          dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
        } else {
          console.log(resJson.payload);
          setPublicInfo(resJson.payload[0]);
          setShowPopup(true);
          dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
        }
      } else {
        throw resJson;
      }
    } catch (err) {
      setErrStatus(true);
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    }
  };
  useEffect(() => {
    getPublicInfo();
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      {publicInfo && showPopup && (
        <UserPopup
          displayName={JSON.parse(publicInfo.meta_data).displayName}
          dp={JSON.parse(publicInfo.meta_data).dp}
          email={JSON.parse(publicInfo.meta_data).email}
          onClose={() => {
            setShowPopup(false);
            navigate(URLS.Userdetails);
            console.log(">>>");
          }}
        />
      )}
      {errStatus && (
        <div>
          <br />
          <p>Sorry, the username does not exist</p>
        </div>
      )}
    </div>
  );
};
