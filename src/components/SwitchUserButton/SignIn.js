import { ACTION_TYPES} from "../../state-management/constants";
//import { useNavigate } from 'react-router-dom';
import { AppError } from "../../models/AppError";


export const SignIn = (dispatch, userInfo) => {
  dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: true });
  dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: userInfo.payload });
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
  };
    

export const Retry = (dispatch, errormessage, username, callback) => {
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false});
  dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: new AppError(errormessage, username, callback) });
};

