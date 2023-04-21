const BackEndServer_PORT = 5000;
const BackEndServer_HOST = "http://localhost";
export const BackEndServer_BASE_URL = `${BackEndServer_HOST}:${BackEndServer_PORT}`;

export const BACK_END_POINTS = {
  SIGN_IN: {
    CHALLENGE: `${BackEndServer_BASE_URL}/api/auth/challenge`,
    AUTHENTICATION: `${BackEndServer_BASE_URL}/api/auth/sign-in`,
    LOGOUT: `${BackEndServer_BASE_URL}/api/auth/logout`,
  },
  USER_INFO: {
    EDIT: `${BackEndServer_BASE_URL}/api/user/update-user`,
    DELETE: `${BackEndServer_BASE_URL}/api/user/delete-user`,
  },
  SPEED_TEST: {
    SAVE_RESULT: `${BackEndServer_BASE_URL}/api/speed-test/save`,
  },
  REQUESTS: {
    FETCH_ALL: `${BackEndServer_BASE_URL}/api/access-requests/fetch-all`,
  },
};
