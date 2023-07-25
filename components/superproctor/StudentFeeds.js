import ProctorContext from "../lib/ProctorContext";
import StudentFeed from "../proctor/StudentFeed";
import { useContext, useState, useRef, useEffect } from "react";
import { create } from "zustand";
import { Tab } from "@headlessui/react";

export const useChatStore = create((set) => ({
  chatStudent: "",
  setChatStudent: (student) => set({ chatStudent: student }),
}));

function getBackgroundColor(alerts) {
  if (alerts >= 5) return "bg-red-500 order-1";
  else if (alerts >= 3) return "bg-orange-500 order-3";
  else if (alerts >= 1) return "bg-yellow-500 order-5";
  return "bg-green-500 order-7";
}

function getBarColor(alerts) {
  if (alerts >= 4) return "bg-red-500";
  else if (alerts >= 2) return "bg-orange-500";
  else return "bg-yellow-500";
}

const createEmptyVideoTrack = ({ width, height }) => {
  const canvas = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });
  canvas.getContext("2d").fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, { enabled: false });
};

function AlertsModal({ id, onClose }) {
  const { useStudentsStore } = useContext(ProctorContext);
  const alerts = useStudentsStore((state) => state.alerts[id]);
  const removeAlert = useStudentsStore((state) => state.removeAlert);
  const remoteVideoRef = useRef({});
  const remoteScreenRef = useRef({});
  const peerRef = useRef(null);
  const videoTrack = createEmptyVideoTrack({ width: 640, height: 480 });
  const mediaStream = new MediaStream([videoTrack]);

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer({ debug: 3 });

      peer.on("open", (id) => {
        console.log("my id:", id);
      });

      peer.on("error", (error) => {
        console.log("error occured:", error);
      });

      peerRef.current = peer;
    });
  }, []);

  const makeCall = (event) => {
    console.log("calling 👉️", id.split("@")[0]);
    var call = peerRef.current.call(id.split("@")[0], mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student screen", remoteStream);
      console.log("remotescreen", remoteScreenRef);
      remoteScreenRef.current.srcObject = remoteStream;
    });

    console.log("calling 👉️", id.split("@")[0] + "screen");
    var call = peerRef.current.call(id.split("@")[0] + "screen", mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student video", remoteStream);
      console.log("remotevideo", remoteVideoRef);
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/30 flex justify-center items-center p-6">
      <div className="bg-white max-h-full overflow-y-auto w-full max-w-6xl text-black rounded p-4">
        <Tab.Group>
          <Tab.List className="flex">
            <Tab className="grow p-2 ui-selected:bg-blue-300">Instances</Tab>
            <Tab
              className="grow p-2 ui-selected:bg-blue-300"
              onClick={makeCall}
            >
              Live
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div>
                <br />
                <div className="w-full border border-black bg-gray-200 h-2.5 relative flex">
                  {Array.from(Array(Math.min(alerts.length, 5)).keys()).map(
                    (i) => {
                      return (
                        <div
                          key={i}
                          className={`basis-1/5 border-r-2 border-black ${getBarColor(
                            i
                          )}`}
                        />
                      );
                    }
                  )}
                </div>
                <div className="flex flex-wrap justify-center text-center">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex flex-col basis-1/3 p-2">
                      <StudentFeed feed={alert.images.frontcam} />
                      <StudentFeed feed={alert.images.screen} />
                      {alert.reason}
                      <button
                        onClick={() => removeAlert(id, index)}
                        className="bg-red-500 text-white px-2 py-1 text-sm"
                      >
                        False
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex">
                <video className="w-1/2" autoPlay={true} ref={remoteVideoRef} />
                <video
                  className="w-1/2"
                  autoPlay={true}
                  ref={remoteScreenRef}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <br />
        <div className="flex justify-center gap-2">
          <button
            className="px-2 py-1 font-semibold bg-rose-500 text-white"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-2 py-1 font-semibold bg-green-500 text-white">
            Save Report
          </button>
          <button className="px-2 py-1 font-semibold bg-red-500 text-white">
            Pause Test
          </button>
          <button className="px-2 py-1 font-semibold bg-red-500 text-white">
            Terminate Test
          </button>
        </div>
      </div>
    </div>
  );
}

function Tile({ id, feed, onClick }) {
  const { chatStudent, setChatStudent } = useChatStore();
  const { useStudentsStore } = useContext(ProctorContext);
  const alerts = useStudentsStore((state) => state.alerts[id]);

  return (
    <div className={`p-2 basis-1/4 ${getBackgroundColor(alerts.length)}`}>
      <StudentFeed feed={feed} />
      <p className="pt-2 font-semibold">{id}</p>
      <button
        className="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800 mr-2"
        onClick={onClick}
      >
        Open
      </button>
      <button
        className="bg-amber-600 text-sm font-semibold text-white py-1 px-2 rounded"
        onClick={() => setChatStudent(id)}
      >
        Chat
      </button>
    </div>
  );
}

export default function StudentFeeds() {
  const { useStudentsStore } = useContext(ProctorContext);
  const feeds = useStudentsStore((state) => state.feeds);
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2 px-4 text-center text-white">
        <div className="order-2 flex-grow basis-full" />
        <div className="order-4 flex-grow basis-full" />
        <div className="order-6 flex-grow basis-full" />
        {Object.entries(feeds).map(([id, feed]) => (
          <Tile key={id} id={id} feed={feed} onClick={() => setActive(id)} />
        ))}
      </div>
      {active && <AlertsModal id={active} onClose={() => setActive(false)} />}
    </>
  );
}
