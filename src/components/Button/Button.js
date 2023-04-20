import React from "react";

import "./Button.scss";

export const Button = ({
  label = "Give a label",
  onClick = () => {},
  type = "tertiary",
}) => {
  return (
    <button className={`app-button ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};
