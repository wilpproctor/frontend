import ProctorContext from "../../lib/ProctorContext";
import StudentFeed from "./StudentFeed";
import { useContext, useState, useRef, useEffect } from "react";
import { create } from "zustand";
import { Tab } from "@headlessui/react";
import { createBackendSocket } from "../../lib/sockets";
import { ToastContainer, toast } from "react-toastify";
import { Page, Text, View, Image, Document, usePDF } from "@react-pdf/renderer";
import "react-toastify/dist/ReactToastify.css";
import { createTw } from "react-pdf-tailwind";

export const useChatStore = create((set) => ({
  chatStudent: "",
  setChatStudent: (student) => set({ chatStudent: student }),
}));

const tw = createTw({
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
});

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
  const remoteVideoWebRef = useRef({});
  const peerRef = useRef(null);
  const videoTrack = createEmptyVideoTrack({ width: 640, height: 480 });
  const mediaStream = new MediaStream([videoTrack]);

  useEffect(() => {
    let peer = null;
    import("peerjs").then(({ default: Peer }) => {
      peer = new Peer({ debug: 3 });

      peer.on("open", (id) => {
        console.log("my id:", id);
      });

      peer.on("error", (error) => {
        console.log("error occured:", error);
      });

      peerRef.current = peer;
    });

    return () => {
      peer.destroy();
    };
  }, []);
  function handlePause() {
    console.log("pausing test for id", id );
    backend.emit("pause-test", ({ id }));
  }

  const makeCall = (event) => {
    console.log("calling 👉️", id.split("@")[0]);
    var call = peerRef.current?.call(id.split("@")[0], mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student video", remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
      console.log("remoteVideoRef", remoteVideoRef.current.srcObject);
    });

    console.log("calling 👉️", id.split("@")[0] + "web");
    var call = peerRef.current?.call(id.split("@")[0] + "web", mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student Web", remoteStream);
      remoteVideoWebRef.current.srcObject = remoteStream;
      console.log("remoteVideoWebRef", remoteVideoWebRef.current.srcObject);
    });

    console.log("calling 👉️", id.split("@")[0] + "screen");
    var call = peerRef.current?.call(id.split("@")[0] + "screen", mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student screen", remoteStream);
      remoteScreenRef.current.srcObject = remoteStream;
      console.log("remoteScreenRef", remoteScreenRef.current.srcObject);
    });
  };

  // Create Document Component
  const MyDoc = (
    <Document>
      <Page size="A4">
        <View />
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: MyDoc });

  useEffect(() => {
    updateInstance(
      <Document>
        <Page
          size="A4"
          style={tw("flex flex-row justify-around flex-wrap m-2 p-2")}
        >
          {alerts.map((alert, index) => (
            <View
              style={tw(
                "flex flex-col w-52 py-4 px-4 justify-center text-center"
              )}
            >
              <Image
                style={tw("h-36 w-48")}
                src={`data:image/jpeg;base64,${alert.images.frontcam}`}
              />
              <Image
                style={tw("h-36 w-48")}
                src={`data:image/jpeg;base64,${alert.images.screen}`}
              />
              <Text>{alert.reason}</Text>
              <br />
            </View>
          ))}
        </Page>
      </Document>
    );
  }, [alerts]);


  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {error}</div>;

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
                <video
                  id="0"
                  className="w-1/3"
                  autoPlay={true}
                  ref={remoteVideoRef}
                />
                <video
                  id="1"
                  className="w-1/3"
                  autoPlay={true}
                  ref={remoteVideoWebRef}
                />
                <video
                  id="2"
                  className="w-1/3"
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
          <button className="px-2 py-1 font-semibold bg-blue-500 text-white">
            Forward to Super Proctor
          </button>
          <button className="px-2 py-1 font-semibold bg-green-500 text-white">
            <a href={instance.url} download="alerts.pdf">
              Download
            </a>
          </button>
          <button className="px-2 py-1 font-semibold bg-red-500 text-white" onClick={handlePause}>
            Pause Test
          </button>
        </div>
      </div>
    </div>
  );
}

function CallModal({ id, onClose }) {
  const { useStudentsStore } = useContext(ProctorContext);
  const remoteVideoRef = useRef({});
  const remoteScreenRef = useRef({});
  const remoteVideoWebRef = useRef({});
  const peerRef = useRef(null);
  const videoTrack = createEmptyVideoTrack({ width: 640, height: 480 });

  useEffect(() => {
    let peer;
    import("peerjs").then(({ default: Peer }) => {
      peer = new Peer({ debug: 3 });

      peer.on("open", (id) => {
        console.log("my id:", id);
      });

      peer.on("error", (error) => {
        console.log("error occured:", error);
      });

      peerRef.current = peer;
    });

    return () => peer.destroy();
  }, []);

  const makeCall = (event) => {
    event.preventDefault();
    console.log("calling 👉️", id.split("@")[0]);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // const audioTrack = stream.getAudioTracks()[0]
        // const mediaStream = new MediaStream([videoTrack, audioTrack]);
        var call = peerRef.current?.call(id.split("@")[0], stream);
        console.log("making call", call, mediaStream);
        call.on("stream", (remoteStream) => {
          console.log("we got student video", remoteStream.getAudioTracks()[0]);
          remoteScreenRef.current.srcObject = remoteStream;
          remoteScreenRef.current.play();
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("calling 👉️", id.split("@")[0] + "web");
    const mediaStream = new MediaStream([videoTrack]);
    var call = peerRef.current?.call(id.split("@")[0] + "web", mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student Web", remoteStream);
      remoteVideoWebRef.current.srcObject = remoteStream;
      console.log("remoteVideoWebRef", remoteVideoWebRef.current.srcObject);
    });

    console.log("calling 👉️", id.split("@")[0] + "screen");
    var call = peerRef.current?.call(id.split("@")[0] + "screen", mediaStream);
    console.log("making call", call);
    call.on("stream", (remoteStream) => {
      console.log("we got student screen", remoteStream.getAudioTracks()[0]);
      console.log("remotevideo", remoteVideoRef);
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/30 flex justify-center items-center p-6">
      <div className="bg-white max-h-full overflow-y-auto w-full max-w-6xl text-black rounded p-4">
        <Tab.Group>
          <button
            className="px-2 py-1 font-semibold bg-green-500 text-white"
            onClick={makeCall}
          >
            Connect
          </button>
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex">
                <video
                  id="0"
                  className="w-1/3"
                  autoPlay={true}
                  ref={remoteVideoRef}
                />
                <video
                  id="1"
                  className="w-1/3"
                  autoPlay={true}
                  ref={remoteVideoWebRef}
                />
                <video
                  id="2"
                  className="w-1/3"
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
        </div>
      </div>
    </div>
  );
}

function Tile({ id, feed, onClick, onAnswer, calls }) {
  const { chatStudent, setChatStudent } = useChatStore();
  const { useStudentsStore } = useContext(ProctorContext);
  const alerts = useStudentsStore((state) => state.alerts[id]);

  const getText = () => {
    if (calls.has(id)) {
      return "Answer";
    } else {
      return "Call";
    }
  };

  const getClass = () => {
    if (calls.has(id)) {
      return "bg-yellow-600 text-sm font-semibold text-white py-1 px-2 rounded";
    } else {
      return "bg-green-600 text-sm font-semibold text-white py-1 px-2 rounded";
    }
  };

  const unread = useStudentsStore((state) => state.unread[id]);

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

      <button className={getClass()} onClick={() => onAnswer(id)}>
        {getText()}
      </button>

      {unread && (
        <button className="bg-blue-800 py-1 px-2 rounded-xl m-2">
          &nbsp;&nbsp;
        </button>
      )}
    </div>
  );
}

export default function StudentFeeds() {
  const { useStudentsStore, backend} = useContext(ProctorContext);
  const feeds = useStudentsStore((state) => state.feeds);
  const [active, setActive] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [calls, setCalls] = useState(new Set());
  
  useEffect(() => {
    backend.on("call", ({ email }) => {
      let temp = new Set(calls);
      temp.add(email);
      console.log(temp, calls);
      setCalls(temp);
      console.log("we got a call from student via call", email);
      toast(`We got a call from student via call from ${email}`);
    });

    backend.on("disconnect-student", ({ email }) => {
      console.log("call disconnect from student side", email);
      toast(`Call disconnected from ${email}`);
      let temp = new Set(calls);
      temp.delete(email);
      console.log(temp, calls);
      setCalls(temp);
      setAnswer(false);
    });

    return () => {
      backend.removeAllListeners()
    }
  }, []);
  const handleAnswer = (id) => {
    console.log("handle answer", calls, id);
    setAnswer(id);
  };

  const handleClose = () => {
    console.log("closing");
    backend.emit("disconnect-proctor", "Closing from proctor side");
    setAnswer(false);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-wrap gap-2 px-4 text-center text-white">
        <div className="order-2 flex-grow basis-full" />
        <div className="order-4 flex-grow basis-full" />
        <div className="order-6 flex-grow basis-full" />
        {Object.entries(feeds).map(([id, feed]) => (
          <Tile
            key={id}
            id={id}
            feed={feed}
            onClick={() => setActive(id)}
            onAnswer={handleAnswer}
            calls={calls}
          />
        ))}
      </div>
      {active && <AlertsModal id={active} onClose={() => setActive(false)} />}
      {answer && <CallModal id={answer} onClose={handleClose} />}
    </>
  );
}
