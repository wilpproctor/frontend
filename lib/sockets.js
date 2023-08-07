import { io } from "socket.io-client";
import { getUserDetails } from "./login";

export function createDetectorSocket() {
  // console.log('ai', process.env.NEXT_PUBLIC_AI_SERVER_URL);

  return io(process.env.NEXT_PUBLIC_AI_SERVER_URL, {
    transports: ["websocket"]
  });
}

<<<<<<< Updated upstream
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
=======
// Function to create WebSocket connection to the backend server
// export function createBackendSocket(namespace = "/", options) {



// //   try {
// //     // Initialize WebSocket connection to the backend server
// //     const backendSocket = io(`${backendServerUrl}${namespace}`, {
// //       auth: (cb) => {
// //         const userDetails = getUserDetails(); // Assuming getUserDetails() returns user details
// //         cb(userDetails);
// //       },
// //       transports: ["websocket"],
// //     });

// //     // Basic error handling for the backend server connection
// //     backendSocket.on("connect_error", (error) => {
// //       console.error("Error connecting to backend server:", error.message);
// //     });

// //     return backendSocket;
// //   } catch (error) {
// //     console.error("Error creating backend server connection:", error.message);
// //     return null; // Return null to indicate connection failure
// //   // }
// // }
// }
// const backendServerUrl = "ws://localhost:8081"; // Replace with your backend server URL

export async function createBackendSocket (namespace = "/", options = {}) {
  const { onOpen, onMessage } = options;

  let backendSocket;

  try {
    const userDetails = getUserDetails(); // Assuming you have a function to get the user details
    const queryParams = new URLSearchParams(userDetails).toString();
    console.log('queryparams',decodeURIComponent(queryParams));
    console.log("namespace",namespace,"options",options);
    //never returns anything
    const response= await fetch(`http://localhost:8081${namespace}?${queryParams}`);
    // response={
    //   "type": "proctor-connected"
    // }
    console.log(response,"response90");
    const data=await response.json();
    console.log("datahere",data);
  //   {
  //     "type": "proctor-connected"
  // }
    console.log('val');

    if (onOpen && typeof onOpen === 'function') {
      backendSocket.addEventListener('open', () => {
        onOpen();
        backendSocket.send(JSON.stringify({ type: 'student-feeds', image: null }));
      });
    } else {
      backendSocket.addEventListener('open', () => {
        backendSocket.send(JSON.stringify({ type: 'student-feeds', image: null }));
      });
    }

    // Attach the onMessage event handler if provided
    if (onMessage && typeof onMessage === 'function') {
      backendSocket.addEventListener('message', (event) => {
        console.log('Received message from backend:', event.data);
        onMessage(event.data);
      });
    } else {
      backendSocket.addEventListener('message', (event) => {
        console.log('Received message from backend:', event.data);
        // Handle different message types from the server as needed
      });
    }

    backendSocket.addEventListener('error', (error) => {
      console.error('Error connecting to backend server:', error.message);
    });


    // fetch(`http://localhost:8081${namespace}?${queryParams}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Received response from server:', data);
    //     backendSocket = new WebSocket(`ws://localhost:8081${namespace}`);
    //     console.log('testopop',backendSocket);
    //     // Attach the onOpen event handler if provided
    //     if (onOpen && typeof onOpen === 'function') {
    //       backendSocket.addEventListener('open', () => {
    //         onOpen();
    //         backendSocket.send(JSON.stringify({ type: 'student-feeds', image: null }));
    //       });
    //     } else {
    //       backendSocket.addEventListener('open', () => {
    //         backendSocket.send(JSON.stringify({ type: 'student-feeds', image: null }));
    //       });
    //     }

    //     // Attach the onMessage event handler if provided
    //     if (onMessage && typeof onMessage === 'function') {
    //       backendSocket.addEventListener('message', (event) => {
    //         console.log('Received message from backend:', event.data);
    //         onMessage(event.data);
    //       });
    //     } else {
    //       backendSocket.addEventListener('message', (event) => {
    //         console.log('Received message from backend:', event.data);
    //         // Handle different message types from the server as needed
    //       });
    //     }

    //     backendSocket.addEventListener('error', (error) => {
    //       console.error('Error connecting to backend server:', error.message);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error making the HTTP request:', error.message);
    //   });
      console.log('testopop1',backendSocket);
    return backendSocket;
  } catch (error) {
    console.error('Error initiating WebSocket connection:', error.message);
    console.log("testopop2");
    return null; // Return null to indicate connection failure
  }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

