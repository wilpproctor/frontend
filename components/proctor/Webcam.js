import { useContext, useEffect, useRef } from "react";
import { getUserDetails } from "../../lib/login";
import { createDetectorSocket } from "../../lib/sockets";
import ProctorContext from "@/lib/ProctorContext";

export default function Webcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { backend, useStreamStore, sendAlert } = useContext(ProctorContext);
  // const detector = createDetectorSocket();

  const width = 320;
  const height = 240;

  const user = getUserDetails();
  const screenStream = useStreamStore((state) => state.getStreams);

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peerVideo = new Peer(user.email.split("@")[0], { debug: 3 });
      const peerScreen = new Peer(user.email.split("@")[0] + "screen", {
        debug: 3,
      });

      peerVideo.on("open", (id) => {
        console.log("my id:", id);
      });

      peerScreen.on("open", (id) => {
        console.log("my id:", id);
      });

      peerVideo.on("error", (error) => {
        console.log("error occured:", error);
      });

      peerVideo.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({
            video: { width, height, frameRate: 24 },
            audio: false,
          })
          .then((stream) => {
            console.log("we got a call from superproctor", stream);
            call.answer(stream);
            console.log("call picked");
          })
          .catch((err) => {
            console.log(err);
          });
      });

      peerScreen.on("call", (call) => {
        console.log(
          "screen streams here:",
          screenStream().screenFeed.video.srcObject
        );
        console.log(
          "we got a call from superproctor",
          screenStream().screenFeed.video.srcObject
        );
        call.answer(screenStream().screenFeed.video.srcObject);
        console.log("call picked");
      });
    });

    navigator.mediaDevices
      .getUserMedia({ video: { width, height, frameRate: 24 }, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.log(err);
      });

    const canvasContext = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    useStreamStore.setState({
      frontcam: {
        canvas: canvasRef.current,
      },
    });

    canvasContext.strokeStyle = "#FF69B4";
    canvasContext.lineWidth = 2;

    return () => {};
  }, []);

  return (
    <div className="fixed bottom-0 left-0">
      <video
        className="w-[150px]"
        ref={videoRef}
        width={width}
        height={height}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="hidden"
      />
    </div>
  );
}
