import ProctorChat from "../../components/chat/ProctorChat";
import RandomFeed from "../../components/proctor/RandomFeed";
import StudentFeeds from "../../components/proctor/StudentFeeds";
import ProctorContext from "../../lib/ProctorContext";
import { createBackendSocket } from "../../lib/sockets";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getUserDetails } from "../../lib/login";
import Webcam from "../../components/proctor/Webcam";
import Screen from "../../components/proctor/Screen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStudentsStore = create(
  immer((set) => ({
    feeds: {},
    addFeed: (id, feed) =>
      set((state) => {
        state.feeds[id] = feed;
        if (!state.alerts[id]) state.alerts[id] = [];
      }),
    alerts: {},
    addAlert: (id, data) =>
      set((state) => {
        if (state.alerts[id]) {
          state.alerts[id].push(data);
        } else {
          state.alerts[id] = [data];
        }
      }),
    removeAlert: (id, index) =>
      set((state) => {
        state.alerts[id].splice(index, 1);
      }),
    unread: {},
    setUnread: (id) =>
      set((state) => {
        state.unread[id] = true;
      }),
    setRead: (id) =>
      set((state) => {
        state.unread[id] = false;
      }),
  }))
);

const useStreamStore = create((set, get) => ({
  frontcam: false,
  screen: false,
  setStream: (name, data) => {
    return set(() => ({ [name]: data }));
  },
  getImages: () => {
    const { frontcam, screen: screenFeed } = get();
    const frontcamImage = frontcam.canvas
      .toDataURL("image/jpeg")
      .slice("data:image/jpeg;base64,".length);
    screenFeed.canvas
      .getContext("2d")
      .drawImage(screenFeed.video, 0, 0, 320, 180);
    const screenImage = screenFeed.canvas
      .toDataURL("image/jpeg")
      .slice("data:image/jpeg;base64,".length);
    return {
      frontcam: frontcamImage,
      screen: screenImage,
    };
  },
  getStreams: () => {
    const { frontcam, screen: screenFeed } = get();
    return { frontcam, screenFeed };
  },
}));

export default function DashboardPage() {
  const backend = createBackendSocket("/proctor");
  const feeds = useStudentsStore((state) => state.feeds);
  const addFeed = useStudentsStore((state) => state.addFeed);
  const addAlert = useStudentsStore((state) => state.addAlert);
  const studentAlerts = useStudentsStore((state) => state.alerts);

  useEffect(() => {
    console.log("function called for student feeds fetch")
    if (backend) {
      backend.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "proctor-connected") {
          const { email } = data;
          console.log("Proctor logged in", email);
          setCurrentProctor(email); // Assuming setCurrentProctor is a state setter function
        } else if (data.type === "student-feeds") {
          const { email, image } = data;
          console.log("email: ", email, ", image: ", image);
          // Assuming you have an "addFeed" function to handle adding the feed to your state
          addFeed(email, image);
        }
      });
      backend.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "proctor-connected") {
          const { email } = data;
          console.log("Proctor logged in", email);
          setCurrentProctor(email); // Assuming setCurrentProctor is a state setter function
        } else if (data.type === "alert") {
          const { email, data: alertData } = data;
          // Assuming you have an "addAlert" function to handle adding the alert to your state
          addAlert(email, alertData);
        }
      });
    }
    
    
  }, []);

  useEffect(() => {
    const count = Object.values(studentAlerts).filter((x) => x.length >= 5).length;
    if (count > 0) {
      const data = JSON.stringify({
        type: "red-students",
        count: count,
      });
      if (backend.readyState == 1){
        console.log("Are you there");
        backend.send(data);
      }
    }

  }, [studentAlerts])

  const sendReplyWarning = (student) => {
    toast.warn(`Please reply to ${student}.`);
  };

  const sendReplyAction = (student, message) => {
    toast.error(`You have not replied to ${student}. Alerting superproctor...`);
    const data = JSON.stringify({
      type: "chat-alert",
      student: student,
      message: message,
    });
    backend.send(data);
  };

  return (
    <ProctorContext.Provider
      value={{
        useStudentsStore,
        backend,
        sendReplyWarning,
        sendReplyAction,
        useStreamStore,
      }}
    >
      <div className="flex min-h-screen gap-2">
        <ToastContainer />
        <div className="grow">
          <StudentFeeds />
        </div>
        <div className="flex flex-col justify-between basis-[320px] border-l-2 p-2">
          <div>
            {Object.keys(feeds).length > 0 ? (
              <RandomFeed />
            ) : (
              <p>No students connected...</p>
            )}
          </div>
          <div>
            <ProctorChat />
          </div>
        </div>
      </div>
      <Webcam />
      <Screen />
    </ProctorContext.Provider>
  );
}
