import StudentContext from "@/lib/StudentContext";
import { useContext, useEffect, useRef } from "react";

export default function Screen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { useStreamStore } = useContext(StudentContext);
  const width = 320;
  const height = (screen.height * width) / screen.width;
  useEffect(() => {
    const monitorDisplay = () => {
      navigator.mediaDevices
        .getDisplayMedia({
          preferCurrentTab: true,
          audio: false,
          video: {
            cursor: "always",
            displaySurface: "monitor",
          },
        })
        .then((stream) => {
          let displaySurface = stream
            .getVideoTracks()[0]
            .getSettings().displaySurface;
          if (displaySurface !== "monitor") {
            alert("Choose Full screen to continue");
            return monitorDisplay();
          }
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          return;
        });
    };
    monitorDisplay();
    useStreamStore.setState({
      screen: {
        canvas: canvasRef.current,
        video: videoRef.current,
      },
    });
  }, []);
  return (
    <div className="hidden">
      <video
        className="w-[150px]"
        ref={videoRef}
        width={width}
        height={height}
      />
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
