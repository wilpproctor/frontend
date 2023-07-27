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
    backend.on("student-feeds", ({ email }, image) => {
      console.log("email: ", email, ", image: ", image)
      addFeed(email, image);
    });

    backend.on("alert", ({ email }, data) => {
      addAlert(email, data);
    });
  }, []);

  useEffect(() => {
    const count = Object.values(studentAlerts).filter((x) => x.length >= 5).length;
    if (count > 0) {
      backend.emit("red-students", count);
    }

  }, [studentAlerts])

  const sendReplyWarning = (student) => {
    toast.warn(`Please reply to ${student}.`);
  };

  const sendReplyAction = (student, message) => {
    toast.error(`You have not replied to ${student}. Alerting superproctor...`);
    backend.emit("chat-alert", { student, message });
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
