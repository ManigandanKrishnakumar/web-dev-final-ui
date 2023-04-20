const AUTHENTICATOR_PORT = 4000;
const AUTHENTICATOR_HOST = "http://localhost";
const AUTHENTICATOR_BASE_URL = `${AUTHENTICATOR_HOST}:${AUTHENTICATOR_PORT}`;

export const AUTHENTICATOR_END_POINTS = {
  CHECK_ACCOUNT_AVAILABILITY: `${AUTHENTICATOR_BASE_URL}/check-account-availability`,
  CREATE_ACCOUNT_KEY_PAIR: `${AUTHENTICATOR_BASE_URL}/client-auth/signup`,
  FETCH_EXISTING_USERNAMES: `${AUTHENTICATOR_BASE_URL}/client-auth/existing-usernames`,
  GET_ENCRYPTED_SERVER_MESSAGE: `${AUTHENTICATOR_BASE_URL}/client-auth/encrypt-message`,
  FETCH_PUBLIC_KEY: `${AUTHENTICATOR_BASE_URL}/client-auth/get-key`,
  DELETE_USERNAME: `${AUTHENTICATOR_BASE_URL}/client-auth/delete-user`,
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
};

export const ERR_MESSAGES = {
  NO_USERNAME_PROVIDED: "No username provided for key generation",
};
