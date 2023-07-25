import { io } from "socket.io-client";
import { getUserDetails } from "./login";

export function createDetectorSocket() {
  // console.log('ai', process.env.NEXT_PUBLIC_AI_SERVER_URL);

  return io(process.env.NEXT_PUBLIC_AI_SERVER_URL, {
    transports: ["websocket"]
  });
}

/**
 *
 * @param {string} [namespace="/"] The namespace of the client.
 */
export function createBackendSocket(namespace = "/", options) {
  // console.log('backend', process.env.NEXT_PUBLIC_BACKEND_URL);

  return io(`${process.env.NEXT_PUBLIC_BACKEND_URL}${namespace}`, {
    auth: (cb) => {
      cb(getUserDetails());
    },
    transports: ["websocket"]
  });
}

