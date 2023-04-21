import { AsymAuth } from "../asym-auth-client-sdk";
import { User } from "../models/User";

export const STATES = {
  IS_LOGGED_IN: "isLoggedIn",
  ASYM_AUTH: "asymAuth",
  CURRENT_USER: "currentUser",
  IS_LOADING: "isLoading",
  IS_ERROR: "isError",
  REQUESTS: "requests",
};

export const INITIAL_STATE = {
  [STATES.IS_LOGGED_IN]: false,
  [STATES.ASYM_AUTH]: new AsymAuth(),
  [STATES.CURRENT_USER]: new User(),
  [STATES.IS_LOADING]: false,
  [STATES.IS_ERROR]: null,
  [STATES.REQUESTS]: [],
};

export const ACTION_TYPES = {
  SET_LOGIN_STATUS: "setLoginStatus",
  SET_CURRENT_USER: "setCurrentUser",
  SET_LOADING_STATUS: "setLoadingStatus",
  SET_ERROR_STATUS: "setErrorStatus",
  SET_REQUESTS: "setRequests",
};
