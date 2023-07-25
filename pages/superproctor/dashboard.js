import { useEffect, useState } from "react";
import { getUserDetails } from "../../lib/login";
import { createBackendSocket } from "../../lib/sockets";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import ProctorCards from "../../components/superproctor/ProctorCards";
import SuperproctorContext from "../../lib/SuperproctorContext";

export const useProctorsStore = create(
  immer((set) => ({
    proctors: [],
    addProctor: (id) =>
      set((state) => {
        if (!state.proctors.includes(id)) {
          state.proctors.push(id);
          state.redStudents[id] = 0;
        }
      }),
    redStudents: {},
    setRedStudentCount: (id, count) =>
      set((state) => {
        state.redStudents[id] = count;
      }),
    alerts: {},
    addAlert: (id, data) =>
      set((state) => {
        if (state.alerts[id] && !state.alerts[id].includes(data)) {
          state.alerts[id].push(data);
        } else {
          state.alerts[id] = [data];
        }
      }),
  }))
);

export default function DashboardPage() {
  const user = getUserDetails();
  const backend = createBackendSocket("/superproctor");
  const addProctor = useProctorsStore((state) => state.addProctor);
  const addAlert = useProctorsStore((state) => state.addAlert);
  const setRedStudentCount = useProctorsStore(
    (state) => state.setRedStudentCount
  );
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    backend.on("proctor-connected", ({ email }) => {
      addProctor(email);
    });

    backend.on("chat-alert", (obj, data) => {
      addAlert(obj.email, data);
    });

    backend.on("red-students", ({ email }, count) => {
      console.log(email, count);
      setRedStudentCount(email, count);
    });
  }, []);

  return (
    <SuperproctorContext.Provider value={{ useProctorsStore, backend }}>
      <div className="flex flex-row min-h-screen gap-2">
        <div className="grow">
          <div className="flex justify-end">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
                Profile
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
                Messages
              </button>
              <button className="px-4 py-2 bg-red-500 rounded-r-lg text-white text-sm font-medium">
                Pause for all
              </button>
            </div>
          </div>
          <ProctorCards />
        </div>
        <div className="flex flex-col justify-between basis-[320px] border-l-2 p-2">
          <div>
            <p>Something to replace random feed</p>
          </div>
          <div>
            {/* <ProctorChat /> */}
            <p>TODO: Chat</p>
          </div>
        </div>
      </div>
    </SuperproctorContext.Provider>
  );
}
