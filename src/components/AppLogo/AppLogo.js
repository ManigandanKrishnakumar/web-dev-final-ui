import React from "react";

import { GiHouseKeys } from "react-icons/gi";

import "./AppLogo.scss";

export const AppLogo = () => {
  return (
    <div id="app-logo">
      <GiHouseKeys id="app-icon" />
      <p>Asym Auth App</p>
    </div>
  );
};
