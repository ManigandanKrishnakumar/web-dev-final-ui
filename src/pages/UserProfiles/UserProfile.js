import { Loader, PageHeading } from "../../components";
import { UsersList } from "../../components/UsersList/UsersList";
import { ListAllUsers } from "../../services/UserDetails";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppContext } from "../../state-management/app-context";
import { BACK_END_POINTS } from "../../apiconstants/apiConstants";
import { UserPopup } from "../../components/UsersList/Userpopup";

import "./UserProfile.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const { data, dispatch } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [errStatus, setErrStatus] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [userToViewObj, setUserToViewObj] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleUsersListItemClick = (usernameToEdit) => {
    setSearchParams({ user: usernameToEdit });
    // searchParams.delete("user");
    // searchParams.append("user", usernameToEdit);
    const userObj = users.find((u) => u.user_name === usernameToEdit);
    setUserToViewObj(userObj);
    setShowPopup(true);
  };

  const ListAllUsers = async () => {
    setLoading(true);
    setErrStatus(false);
    // dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    try {
      const res = await fetch(BACK_END_POINTS.USER_INFO.LISTUSERS);
      const resJson = await res.json();
      if (resJson.isSuccess === true) {
        setUsers(resJson.payload);
        // dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      } else {
        throw resJson;
      }
      // const res = await ListAllUsers();
      // setUsers(res.payload);
      // dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    } catch (err) {
      setErrStatus(true);
      // dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (searchParams.get("user") && searchParams.get("user").length) {
      navigate("/user/" + searchParams.get("user"));
    } else {
      setTimeout(() => {
        ListAllUsers();
      }, 1000);
      // ListAllUsers();
    }
  }, []);

  if (loading) {
    return (
      <>
        <PageHeading heading="Users" />
        <Loader />
      </>
    );
  }

  return (
    <>
      <PageHeading heading="Users" />
      {users.map((user, index) => (
        <UsersList
          key={index}
          username={user.user_name}
          displayName={JSON.parse(user.meta_data).displayName}
          dp={JSON.parse(user.meta_data).dp}
          email={JSON.parse(user.meta_data).email}
          handleUsersListItemClick={handleUsersListItemClick}
        />
      ))}
      {showPopup && (
        <UserPopup
          displayName={JSON.parse(userToViewObj.meta_data).displayName}
          dp={JSON.parse(userToViewObj.meta_data).dp}
          email={JSON.parse(userToViewObj.meta_data).email}
          onClose={() => {
            setShowPopup(false);
            setSearchParams({});
          }}
        />
      )}

      {errStatus && (
        <div>
          <br />
          <p>Sorry, something went wrong. Please try again.</p>
        </div>
      )}
    </>
  );
};
