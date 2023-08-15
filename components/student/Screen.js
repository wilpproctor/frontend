import StudentContext from "../../lib/StudentContext";
import { useContext, useEffect, useRef, useState } from "react";
export default function Screen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { useStreamStore } = useContext(StudentContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const width = 320;
  const height = (screen.height * width) / screen.width;

  const monitorDisplay = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: true
      });

      let displaySurface = stream.getVideoTracks()[0].getSettings().displaySurface;
      if (displaySurface !== "monitor") {
        alert("Choose Full screen to continue");
        // return monitorDisplay();
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      useStreamStore.setState({
        screen: {
          canvas: canvasRef.current,
          video: videoRef.current,
        },
      });

    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };
  console.log(isFullscreen,"isFullscreen");
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log("Error attempting to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    monitorDisplay();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
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
      <button onClick={toggleFullscreen}>
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
    </div>
  );
}
