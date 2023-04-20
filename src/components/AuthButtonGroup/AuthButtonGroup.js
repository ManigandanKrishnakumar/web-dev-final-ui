import React, { useContext } from "react";
import { CiLogin } from "react-icons/ci";
import { RiRadioButtonLine } from "react-icons/ri";

import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";
import { SwitchUserButton } from "../SwitchUserButton/SwitchUserButton";

import "./AuthButtonGroup.scss";

export const AuthButtonGroup = () => {
  const { data } = useContext(AppContext);

  const getProps = () => {
    if (!data[STATES.IS_LOGGED_IN]) {
      return {
        label: "Log In",
        icon: <CiLogin />,
      };
    } else {
      return {
        label: "Logged In",
        icon: (
          <div style={{ color: "green" }}>
            <RiRadioButtonLine />
          </div>
        ),
      };
    }
  };

  return (
    <div className="auth-buttons-container">
      <SwitchUserButton {...getProps()} />
    </div>
  );
};
