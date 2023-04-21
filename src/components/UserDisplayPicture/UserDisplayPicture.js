import React from "react";
import "./UserDisplayPicture.scss";

export const UserDisplayPicture = ({ source }) => {
  return (
    <div className="dp-container">
      <img className="dp-image" src={source} alt="dp" />
    </div>
  );
};
