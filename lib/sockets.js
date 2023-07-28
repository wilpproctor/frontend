import { getUserDetails } from "./login";
import { io } from "socket.io-client";

// Check if the environment variables are set, or provide default URLs
const aiServerUrl = process.env.NEXT_PUBLIC_AI_SERVER_URL || "http://localhost:4000";
const backendServerUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// Function to create WebSocket connection to the AI server
export function createDetectorSocket() {
  try {
    // Initialize WebSocket connection to the AI server
    const detectorSocket = io(aiServerUrl, {
      transports: ["websocket"],
    });

    // Basic error handling for the AI server connection
    detectorSocket.on("connect_error", (error) => {
      console.error("Error connecting to AI server:", error.message);
    });

    return detectorSocket;
  } catch (error) {
    console.error("Error creating AI server connection:", error.message);
    return null; // Return null to indicate connection failure
  }
}

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

export function createBackendSocket(namespace = "/", options) {
  console.log("I am options: ", options);
  // try {
  //   // Initialize WebSocket connection to the backend server
  //   const backendSocket = new WebSocket(`ws://localhost:8081`);

  //   // Attach the auth event handler to send user details on connection
  //   backendSocket.addEventListener("open", () => {
  //     const userDetails = getUserDetails(); // Assuming getUserDetails() returns user details
  //     backendSocket.send(JSON.stringify({ type: "authenticate", userDetails }));
  //   });

  //   // Handle incoming messages from the backend server
  //   backendSocket.addEventListener("message", (event) => {
  //     console.log("Got an event from backend: ", event)
  //     const data = JSON.parse(event.data);
  //     console.log("Received message from backend:", data);
  //     // Handle different message types from the server as needed
  //   });

  //   // Basic error handling for the backend server connection
  //   backendSocket.addEventListener("error", (error) => {
  //     console.error("Error connecting to backend server:", error.message);
  //   });

  //   return backendSocket;
  // } catch (error) {
  //   console.error("Error creating backend server connection:", error.message);
  //   return null; // Return null to indicate connection failure
  // }
  let backendSocket;

  try {
    // Step 1: Make an HTTP GET request to the /student endpoint
    const userDetails = getUserDetails(); // Assuming you have a function to get the user details
    const queryParams = new URLSearchParams(userDetails).toString();
    fetch(`http://localhost:8081${namespace}?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received response from server:', data);
        backendSocket = new WebSocket(`ws://localhost:8081`);
        backendSocket.addEventListener('open', () => {
          backendSocket.send(JSON.stringify({ type: 'student-feed', image: null }));
        });
        backendSocket.addEventListener('message', (event) => {
          console.log('Received message from backend:', event.data);
          // Handle different message types from the server as needed
        });
        backendSocket.addEventListener('error', (error) => {
          console.error('Error connecting to backend server:', error.message);
        });
        // Step 2: If the response contains the type 'student-connected', initiate the WebSocket connection
        // if (data.type === 'student-connected') {
        //   backendSocket = new WebSocket(`ws://localhost:8081`);
        //   backendSocket.addEventListener('open', () => {
        //     backendSocket.send(JSON.stringify({ type: 'authenticate', userDetails }));
        //   });
        //   backendSocket.addEventListener('message', (event) => {
        //     console.log('Received message from backend:', event.data);
        //     // Handle different message types from the server as needed
        //   });
        //   backendSocket.addEventListener('error', (error) => {
        //     console.error('Error connecting to backend server:', error.message);
        //   });
        // }
        // else if(data.type === 'proctor-connected') {
        //   backendSocket = new WebSocket(`ws://localhost:8081`);
        //   backendSocket.addEventListener('open', () => {
        //     backendSocket.send(JSON.stringify({ type: 'authenticate', userDetails }));
        //   });
        //   backendSocket.addEventListener('message', (event) => {
        //     console.log('Received message from backend:', event.data);
        //     // Handle different message types from the server as needed
        //   });
        //   backendSocket.addEventListener('error', (error) => {
        //     console.error('Error connecting to backend server:', error.message);
        //   });
        // }
        
      })
      .catch((error) => {
        console.error('Error making the HTTP request:', error.message);
      });return backendSocket;
  } catch (error) {
    console.error('Error initiating WebSocket connection:', error.message);
  }
  
  return backendSocket;  
}
