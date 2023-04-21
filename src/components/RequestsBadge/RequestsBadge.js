import React, { useContext } from "react";

import "./RequestsBadge.scss";
import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";

export const RequestsBadge = () => {
  const { data } = useContext(AppContext);
  return (
    <div className="requests-badge-container">
      <span>{data[STATES.REQUESTS].length}</span>
    </div>
  );
};
