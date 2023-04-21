import { io } from "socket.io-client";
import { BackEndServer_BASE_URL } from "../apiconstants/apiConstants";

// "undefined" means the URL will be computed from the `window.location` object
const URL = BackEndServer_BASE_URL;

export const socket = io(URL, {
  autoConnect: true,
});
