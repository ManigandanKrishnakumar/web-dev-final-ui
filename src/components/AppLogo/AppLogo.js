import React from "react";

import { BsSpeedometer2 } from "react-icons/bs";

import "./AppLogo.scss";

export const AppLogo = () => {
  return (
    <div id="app-logo">
      <BsSpeedometer2 id="app-icon" />
      <p>Speed Test</p>
    </div>
  );
};
