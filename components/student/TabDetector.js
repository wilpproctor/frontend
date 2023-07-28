import StudentContext from "@/lib/StudentContext";
import { goFullscreen } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

export default function TabDetector() {
  const { sendAlert } = useContext(StudentContext);
  const [isFullscreen, setFullscreen] = useState(true);
  useEffect(() => {
    // import("disable-devtool").then(({ default: DisableDevtool }) => {
    //   DisableDevtool();
    // });

    function onWindowBlur() {
      setTimeout(() => {
        sendAlert("Student tried to change tabs");
      }, 1000)
    }
    window.addEventListener("blur", onWindowBlur);

    function onFullscreenChange() {
      setFullscreen(document.fullscreenElement);

      if (!document.fullscreenElement) {
        setTimeout(() => {
          sendAlert("Student tried to exit fullscreen");
        }, 1000);
      }
    }
    document.documentElement.addEventListener(
      "fullscreenchange",
      onFullscreenChange
    );

    return () => {
      window.removeEventListener("blur", onWindowBlur);
      document.documentElement.removeEventListener(
        "fullscreenchange",
        onFullscreenChange
      );
    };
  });

  return (
    !isFullscreen && (
      <div className="fixed inset-0 bg-red-500 flex justify-center items-center">
        <div className="bg-white px-6 py-4 rounded-lg text-center">
          <p className="text-xl">Do not exit fullscreen, an alert has been sent to the Proctor.</p>
          <br />
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white"
            onClick={goFullscreen}
          >
            Return To Exam
          </button>
        </div>
      </div>
    )
  );
}
