import ProctorChat from "@/components/chat/ProctorChat";
import RandomFeed from "@/components/proctor/RandomFeed";
import StudentFeeds from "@/components/superproctor/StudentFeeds";
import ProctorContext from "@/lib/ProctorContext";
import { createBackendSocket } from "@/lib/sockets";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getUserDetails } from "@/lib/login";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    removeAlert: (id, index) => set((state) => {
      state.alerts[id].splice(index, 1);
    }),
    unread: {},
    addUnread: (id) => set((state) => {
      if (state.unread[id])
        state.unread[id]++;
      else
        state.unread[id] = 1;
    }),
    read: (id) => set((state) => {
      if (state.unread[id])
        state.unread[id] = 0;
    })
  }))
);

export default function DashboardPage() {
  const email = new URLSearchParams(window.location.search).get("id");
  sessionStorage.setItem("user", JSON.stringify({ email }))
  const backend = createBackendSocket("/proctor");
  const feeds = useStudentsStore((state) => state.feeds);
  const addFeed = useStudentsStore((state) => state.addFeed);
  const addAlert = useStudentsStore((state) => state.addAlert);
  const studentAlerts = useStudentsStore((state) => state.alerts);

  useEffect(() => {
    backend.on("student-feeds", ({ email }, image) => {
      addFeed(email, image);
    });

    backend.on("alert", ({ email }, data) => {
      addAlert(email, data);
    });
  }, []);

  const sendReplyWarning = (student) => {
    toast.warn(`Please reply to ${student}.`);
  }

  const sendReplyAction = (student, message) => {
    toast.error(`You have not replied to ${student}. Alerting superproctor...`);
    backend.emit("chat-alert", { student, message });
  }

  return (
    <ProctorContext.Provider value={{ useStudentsStore, backend, sendReplyWarning, sendReplyAction }}>
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
    </ProctorContext.Provider>
  );
}
