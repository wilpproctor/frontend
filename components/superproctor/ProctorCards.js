import SuperproctorContext from "@/lib/SuperproctorContext";
import { useState, useContext, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";

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

function AlertsModal({ proctor, onClose }) {
  const { useProctorsStore } = useContext(SuperproctorContext);
  const alerts = useProctorsStore((state) => state.alerts[proctor]) ?? [];
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
    console.log("calling 👉️", proctor.split("@")[0]);
    var call = peerRef.current.call(proctor.split("@")[0], mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got proctor screen", remoteStream);
      console.log("remotescreen", remoteScreenRef);
      remoteScreenRef.current.srcObject = remoteStream;
    });

    console.log("calling 👉️", proctor.split("@")[0] + "screen");
    var call = peerRef.current.call(
      proctor.split("@")[0] + "screen",
      mediaStream
    );
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got proctor video", remoteStream);
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
                      <div className="border-2 p-2">
                        <h1>{alert.student}</h1>
                      </div>
                      <div className="border-2 p-2 ">
                        <div className="flex flex-col rounded-lg p-2 py-4 gap-2 bg-slate-300 self-end text-right align-end justify-end">
                          <time className="text-xs opacity-70">
                            {new Date(alert.message.timestamp)
                              .toTimeString()
                              .substring(0, 8)}
                          </time>
                          <p className="self-end break-words max-w-[278px] rounded-lg p-1 pr-1.5 pl-1.5 text-slate-200 bg-slate-800 ">
                            {alert.message.msg}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex">
                <video
                  className="w-1/2"
                  autoPlay={true}
                  ref={remoteScreenRef}
                />
                <video className="w-1/2" autoPlay={true} ref={remoteVideoRef} />
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
          <a
            className="px-2 py-1 font-semibold bg-rose-500 text-white"
            href={`/superproctor/takeover?id=${proctor}`}
            target="_blank"
          >
            Takeover
          </a>
        </div>
      </div>
    </div>
  );
}

function Tile({ proctor, onClick }) {
  const { useProctorsStore } = useContext(SuperproctorContext);
  const alerts = useProctorsStore((state) => state.alerts[proctor]) ?? [];
  const redStudentCount = useProctorsStore(
    (state) => state.redStudents[proctor]
  );

  return (
    <div className={`p-2 basis-1/4 ${getBackgroundColor(redStudentCount)}`}>
      <p className="p-2 pb-3 font-semibold">{proctor}</p>
      <button
        className="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800 mr-2"
        onClick={onClick}
      >
        Open
      </button>
    </div>
  );
}

export default function ProctorCards() {
  const { useProctorsStore, backend } = useContext(SuperproctorContext);
  const proctors = useProctorsStore((state) => state.proctors);
  const alerts = useProctorsStore((state) => state.alerts);
  const addAlert = useProctorsStore((state) => state.addAlert);

  const [active, setActive] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2 px-4 text-center text-white">
        <div className="order-2 flex-grow basis-full" />
        <div className="order-4 flex-grow basis-full" />
        <div className="order-6 flex-grow basis-full" />
        {proctors.map((proctor) => (
          <Tile
            key={proctor}
            proctor={proctor}
            onClick={() => setActive(proctor)}
          />
        ))}
      </div>
      {active && (
        <AlertsModal proctor={active} onClose={() => setActive(false)} />
      )}
    </>
  );
}
