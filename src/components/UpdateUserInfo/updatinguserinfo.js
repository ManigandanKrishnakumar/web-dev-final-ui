import { ACTION_TYPES} from "../../state-management/constants";

export const updatingUserInfo = (dispatch, data, userInfo) => {
  const user_info = JSON.parse(userInfo[0].meta_data);

  const user = {
    username: data.username,
    displayName: user_info.displayName,
    email: user_info.email,
    dp: user_info.dp,
    userRole: data.userRole,
  }
  
  dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: user});
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });

  };
    
  export const ErrorupdatingUserInfo = (dispatch) => {
    //const navigate = useNavigate();
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    //console.log('Error in updating user info. Try again');
  
    };