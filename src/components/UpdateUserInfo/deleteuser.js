import { ACTION_TYPES} from "../../state-management/constants";
import { User } from "../../models/User";
import { AppError } from "../../models/AppError";
import { DeleteUser, DeleteUserWindows, UserVerification } from "../../services/DeleteUser";

export const DeletingInfo = async (username, data) => {
  try {

  const encryptedusername = await UserVerification(username, data);
  const backendmessage = await DeleteUser(username, encryptedusername);
  const windowsappmessage = await DeleteUserWindows(username, data);
  }
  catch(error){
    throw new Error(error.message);
  }
  };
    

export const DeleteInfo = (dispatch, data) => {
  dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: new User()});
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});

  };
    
  export const ErrorDeleteInfo = (dispatch, errormessage, callback) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: new AppError(errormessage, callback) });
    };