import React, { useContext } from "react";
import "./Error.scss";
import { AppContext } from "../../state-management/app-context";
import { STATES, ACTION_TYPES } from "../../state-management/constants";

export const Error = ({error}) => {
  
  const {dispatch, data} = useContext(AppContext)

  const onCancel = () => {
    
    dispatch({type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
  }

  const showDeleteButton = error.errorMessage === "User does not exist";

  return (
    <div className="error-container">
      <div className="error-content primary">
      <h1>{error.errorMessage}</h1>
      <div>{showDeleteButton && (<button type="button" id="cancel-btn" onClick={() => {
  data[STATES.ASYM_AUTH].deleteUsername(error.username);
  dispatch({type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
}}>Delete</button>)}</div>
      <div>
      {error.message !== "No results found" && (  
      <button type="button" id="retry-btn" onClick={error.callback}>Retry</button> )}

      <button type="button" id="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
      </div>
    </div>
  );
};
