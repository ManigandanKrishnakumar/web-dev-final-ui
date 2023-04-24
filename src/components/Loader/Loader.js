import React from "react";

import { BsSpeedometer2 } from "react-icons/bs";

import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content primary">
        <BsSpeedometer2 id="app-icon" />
      </div>
    </div>
  );
};
