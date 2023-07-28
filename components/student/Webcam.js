import StudentContext from "../../lib/StudentContext";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { getUserDetails } from "../../lib/login";
import { createDetectorSocket } from "../../lib/sockets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const CameraRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const { backend, useStreamStore, sendAlert } = useContext(StudentContext);
  const detector = createDetectorSocket();

  const width = 320;
  const height = 240;
  const frameRate = 1 / 5;

  const user = getUserDetails();
  const screenStream = useStreamStore((state) => state.getStreams);



  const [currentProctor, setCurrentProctor] = useState(null);

  const [devices, setDevices] = useState([]);
  const [callStatus, setCallStatus] = useState("Call Proctor")

  const call1Ref = useRef(null)
  const call2Ref = useRef(null)
  const call3Ref = useRef(null)

  const handleDevices =  useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
     console.log(devices)
    },
    [handleDevices]
  );

  useEffect(() => {
    
    const canvasContext = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    if (backend) {
      backend.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "proctor-connected") {
          const { email } = data;
          console.log("Proctor logged in", email);
          setCurrentProctor(email); // Assuming setCurrentProctor is a state setter function
        }
      });
    }


    console.log("we got cameras", devices)
    
    console.log("1", devices[0])
    console.log("2", devices[1])
    navigator.mediaDevices
      .getUserMedia({ video: { width, height, frameRate: 24 }, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        useStreamStore.setState({
        frontcam: {
          video: videoRef.current,
          canvas: canvasRef.current,

        },
    });
      })
      .catch((err) => {
        console.log(err);
      });
    
     navigator.mediaDevices
      .getUserMedia({ video: { width, height, frameRate: 24, deviceId: devices[1]?.deviceId }, audio: true })
      .then((stream) => {
        CameraRef.current.srcObject = stream;
        CameraRef.current.play();
        useStreamStore.setState({
          backcam: {
            video: CameraRef.current,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    canvasContext.strokeStyle = "#FF69B4";
    canvasContext.lineWidth = 2

    const interval = setInterval(() => {
      canvasContext.drawImage(videoRef.current, 0, 0, width, height);
      const image = canvasRef.current
        .toDataURL("image/jpeg")
        .slice("data:image/jpeg;base64,".length);
      detector.volatile.emit("webcam", image, (imageInfo) => {
        console.log(imageInfo);
        canvasContext.beginPath();
        for (const item of imageInfo.detected) {
          canvasContext.rect(...item.coords);
        }
        canvasContext.stroke();
        const newImage = canvasRef.current
          .toDataURL("image/jpeg")
          .slice("data:image/jpeg;base64,".length);
        console.log("images emiting: ", newImage)
        console.log("images backend: ", backend)
        if (backend){backend.send(JSON.stringify({ type: "student-feed", image: newImage }));}
        console.log("images emitted: ", newImage)
        const cheating = isStudentCheating(imageInfo.detected);

        if (cheating) {

          sendAlert(cheating);
        }
      });
    }, 1000 / frameRate);

    return () => {
      clearInterval(interval);
    };
  }, [devices]);

  useEffect(() => {
    let peerVideo;
    let peerScreen;
    let peerWeb;
    import("peerjs").then(({ default: Peer }) => {
      peerVideo = new Peer(user.email.split("@")[0], { debug: 3 });
      peerScreen = new Peer(user.email.split("@")[0] + "screen", {
        debug: 3,
      });
      peerWeb = new Peer(user.email.split("@")[0] + "web", {
        debug: 3,
      });


      peerVideo.on("open", (id) => {
        console.log("my id:", id);
      });

      peerScreen.on("open", (id) => {
        console.log("my id:", id);
      });

      peerWeb.on("open", (id) => {
        console.log("my id:", id);
      });

      peerVideo.on("error", (error) => {
        console.log("error occured:", error);
      });
       
      peerVideo.on("call", (call) => {
        call.answer(screenStream().frontcam.video.srcObject);
        call1Ref.current = call
        call.on("stream", (remoteStream) => {
          // var videoTrack = remoteStream.getVideoTracks()
          // if (videoTrack.length >0) {
          //   remoteStream.removeTrack(videoTrack[0])
          // }
          if (remoteStream.getAudioTracks()[0]) {
            console.log("status check", callStatus)
            if (callStatus === "Call Proctor") {
              toast("Proctor connected") 
            }
            setCallStatus("Disconnect")
          }
          console.log("we got proctor audio", remoteStream);
          audioRef.current.srcObject = remoteStream
        });
      });

      peerWeb.on("call", (call) => {
         call2Ref.current = call
        call.answer(screenStream().backcam.video.srcObject);
      });

      peerScreen.on("call", (call) => {
         call3Ref.current = call
        call.answer(screenStream().screenFeed.video.srcObject);
      });

    });

    if (backend) {
      backend.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "proctor-connected") {
          const { email } = data;
          console.log("Proctor logged in", email);
          setCurrentProctor(email); // Assuming setCurrentProctor is a state setter function
        } else if (data.type === "disconnect-proctor") {
          const { email } = data;
          console.log("Call disconnected from proctor", email);
          // Assuming you have access to the 'toast' function for displaying toast messages
          toast(`Call disconnected from proctor - ${email}`);
          // Assuming you have access to the 'setCallStatus' function for updating the call status
          setCallStatus("Call Proctor");
        }
      });
    }

    return () => {
      peerScreen.destroy();
      peerVideo.destroy();
      peerWeb.destroy();
    };
  }, [])

  const makeCall = (event) => {
    event.preventDefault()
    if (callStatus === "Disconnect") {
      call1Ref.current?.close()
      call2Ref.current?.close()
      call3Ref.current?.close()
      setCallStatus("Call Proctor")
      const message = "call disconnected by student";
  const data = JSON.stringify({
    type: "disconnect-student",
    message: message,
  });
  backend.send(data);
    } else {
      if (currentProctor) {
        console.log("My proctor is" ,currentProctor)
        const data = JSON.stringify({
          type: "call",
          message: "call made by student",
        });
        backend.send(data);
        setCallStatus("Connecting ...")
    } else {
      console.log("No proctor available" ,currentProctor)
    }
    }
  }

  const changeClassName = () => {
    if (callStatus == "Disconnect") 
    {return "w-[150px]"} 
    else 
   { return "hidden"}
  }

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
      <div className="fixed bottom-0 left-0 flex">
        <video
          className="w-[150px]"
          ref={videoRef}
          width={width}
          height={height}
          muted={true}
        />
        <video
          className="w-[150px]"
          ref={CameraRef}
          width={width}
          height={height}
          muted={true}
        />
      <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="hidden"
        />
      </div>
      <div className="fixed bottom-0 right-0">
        <video
          className={changeClassName()}
          id="audio"
          ref={audioRef}
          width={width}
          height={height}
          autoPlay={true}
        />
        <div className="flex flex-col flex-grow">
        {/* <button className="bg-green-700 text-white rounded-lg p-2" onClick={makeCall}>
            {callStatus}
        </button> */}
      </div>
      </div>
    </>
  );
}
