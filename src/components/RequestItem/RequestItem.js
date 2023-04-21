import React from "react";

import "./RequestItem.scss";
import { UserDisplayPicture } from "../UserDisplayPicture/UserDisplayPicture";

export const RequestItem = ({ request, approveRequest, deleteRequest }) => {
  const meta_data = JSON.parse(request.meta_data);

  return (
    <div className="request-item">
      <div className="id-section">
        <p className="label">Id</p>
        <p className="value">{request.id}</p>
      </div>

      <div className="dp-sec">
        <UserDisplayPicture source={meta_data.dp} />
      </div>

      <div className="user-info-sec">
        <p className="display-name">{meta_data.displayName}</p>
        <p className="username">{"@" + request.user_name}</p>
      </div>

      <div className="timestamp-sec">
        <p className="label">Timestamp</p>
        <p className="value">{new Date(request.time_stamp).toLocaleString()}</p>
      </div>

      <div className="actions-sec">
        <button
          onClick={() => approveRequest(request.user_name, request.meta_data)}
        >
          Approve
        </button>
        <button className="delete" onClick={() => deleteRequest(request.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
