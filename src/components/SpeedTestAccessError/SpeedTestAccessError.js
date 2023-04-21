import React from "react";

export const SpeedTestAccessError = () => {
  return (
    <div className="error-message-container speed">
      <p>
        Sorry, you don't have access to do speed test. Please click the "Request
        Access" button to request access
      </p>
      <button>Request access</button>
    </div>
  );
};
