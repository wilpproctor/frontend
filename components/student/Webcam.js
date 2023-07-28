import StudentContext from "@/lib/StudentContext";
import { useContext, useEffect, useRef } from "react";
import { getUserDetails } from "@/lib/login";
import { createDetectorSocket } from "@/lib/sockets";

function isStudentCheating(detected) {
  let peopleCount = 0;

  for (const item of detected) {
    if (item.type == "person") peopleCount += 1;
    else {
      return "Illegal Object Detected";
    }
  }

  if (peopleCount == 0) return "Student could not be found";
  else if (peopleCount > 1) return "Multiple people seen by webcam";

  return false;
}

export default function Webcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { backend, useStreamStore, sendAlert } = useContext(StudentContext);
  // const detector = createDetectorSocket();

  const width = 320;
  const height = 240;
  const frameRate = 1 / 5;

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
            console.log("we got a call from proctor", stream);
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
          "we got a call from proctor",
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
    canvasContext.lineWidth = 2

    const interval = setInterval(() => {
      canvasContext.drawImage(videoRef.current, 0, 0, width, height);
      const image = canvasRef.current
        .toDataURL("image/jpeg")
        .slice("data:image/jpeg;base64,".length);
      // detector.volatile.emit("webcam", image, (imageInfo) => {
      //   console.log(imageInfo);
      //   canvasContext.beginPath();
      //   for (const item of imageInfo.detected) {
      //     canvasContext.rect(...item.coords);
      //   }
      //   canvasContext.stroke();
        const newImage = canvasRef.current
          .toDataURL("image/jpeg")
          .slice("data:image/jpeg;base64,".length);
        backend.emit("student-feed", newImage);
        // const cheating = isStudentCheating(imageInfo.detected);

        // if (cheating) {

        //   sendAlert(cheating);
        // }
      // });
    }, 1000 / frameRate);

    return () => {
      clearInterval(interval);
    };
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
