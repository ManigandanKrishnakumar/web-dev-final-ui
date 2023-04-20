import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import useAuthentication from '../../custom-hooks/SignIn';
import { SignIn, Retry } from "./SignIn";
import { deleteToken } from "../../services/SignIn"; 
import "./SwitchUserButton.scss";

import { AiFillCaretDown } from "react-icons/ai";
import { AppContext } from "../../state-management/app-context";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { User } from "../../models/User";


export const SwitchUserButton = ({ label, icon }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="switch-user-button-container action"
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      {icon}
      <p> {label} </p>
      <AiFillCaretDown className="icon" />
      {clicked && <UsersList />}
    </div>
  );
};

const UsersList = () => {
  const { data, dispatch } = useContext(AppContext);
  const [authenticate] = useAuthentication();
  const navigate = useNavigate();

  const switchUserClick = async (username) => {
    data[STATES.ASYM_AUTH].setCurrentUsername(username);
    dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    const user = new User();
    user.username = username;

    try {
    const userInfo = await authenticate(user.username, data[STATES.ASYM_AUTH]);
    dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
    SignIn(dispatch,userInfo);
    
    }catch(error){
      Retry(dispatch, error.message, user.username,  () => {
        Promise.resolve(authenticate(user.username)).then(userInfo => {
          SignIn(dispatch, userInfo);
        }).catch(error => {
          //console.log(error);
        });
      });
    }
  
  };

  const newUser = () => {
    //console.log("Sign Up as new User");
    navigate("/signup");
  };

  const signOut = () => {
    deleteToken();
    dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: false });
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: new User() });
    //console.log("Sign Out");
  };
  
  return (
    <div className="users-list secondary">
      <div className="username">
        <button className="tertiary" onClick={(e) => e.preventDefault()}>
          <span> Switch User </span>
        </button>
      </div>
      {data[STATES.ASYM_AUTH].getExistingUsernames().map((username, index) => {
        return (
          <div key={index.toString()} className="username">
            <button
              className="secondary"
              onClick={() => {
                switchUserClick(username);
              }}
            >
              {username}
            </button>
          </div>
        );
      })}

      <div className="username">
        <button className="secondary" onClick={newUser}>
          <AiOutlineUserAdd />
          <span> New User</span>
        </button>
      </div>
      {data[STATES.IS_LOGGED_IN] && (
        <div className="username">
          <button className="action" onClick={signOut}>
            <CiLogout />
            <span> Sign Out </span>
          </button>
        </div>
      )}
    </div>
  );
};
