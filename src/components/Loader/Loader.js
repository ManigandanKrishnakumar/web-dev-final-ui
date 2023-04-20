import React from "react";

import { GiHouseKeys } from "react-icons/gi";

import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content primary">
      <GiHouseKeys id="app-icon" />
      </div>
    </div>
  );
};
