import { ACTION_TYPES, STATES } from "./constants";

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_STATUS: {
      return {
        ...state,
        [STATES.IS_LOGGED_IN]: action.payload,
      };
    }

    case ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        [STATES.CURRENT_USER]: action.payload,
      };
    }

    case ACTION_TYPES.SET_LOADING_STATUS: {
      return {
        ...state,
        [STATES.IS_LOADING]: action.payload,
      };
    }

    case ACTION_TYPES.SET_ERROR_STATUS: {
      return {
        ...state,
        [STATES.IS_ERROR]: action.payload,
      };
    }

    case ACTION_TYPES.SET_REQUESTS: {
      return {
        ...state,
        [STATES.REQUESTS]: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
