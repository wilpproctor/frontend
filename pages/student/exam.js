import Calculator from "../../components/calculator/Calculator";
import CalculatorPage from "../../components/calculator/Calculator";
import Compiler from "../../components/codeEditor/Compiler";
import CompilerWidget from "../../components/codeEditor/CompilerWidget";
import StudentChat from "../../components/chat/StudentChat";
import Dictaphone from "../../components/question/Dictaphone";
import "react-toastify/dist/ReactToastify.css";
import MCQ from "../../components/question/MCQ";
import ShortAnswer from "../../components/question/ShortAnswer";
import Screen from "../../components/student/Screen";
import TabDetector from "../../components/student/TabDetector";
import Webcam from "../../components/student/Webcam";
import StudentContext from "../../lib/StudentContext";
import { getUserDetails } from "../../lib/login";
import { createBackendSocket } from "../../lib/sockets";
import { create } from "zustand";
import { ToastContainer, toast } from "react-toastify";
import StudentFeed from "../../components/proctor/StudentFeed";
import FlowComponent from "../../components/flowchart/FlowComponent";
import InputViewer from "../../components/chem/InputViewer";
import Quiz from "../../components/student/mcqQuiz";

const useStreamStore = create((set, get) => ({
  frontcam: false,
  backcam: false,
  screen: false,
  setStream: (name, data) => {
    return set(() => ({ [name]: data }));
  },
  getImages: () => {
    const { frontcam, screen: screenFeed } = get();
    console.log(frontcam);
    const frontcamImage = frontcam.canvas
      .toDataURL("image/jpeg")
      .slice("data:image/jpeg;base64,".length);
    screenFeed.canvas
      .getContext("2d")
      .drawImage(screenFeed.video, 0, 0, 320, 180);
    const screenImage = screenFeed.canvas
      .toDataURL("image/jpeg")
      .slice("data:image/jpeg;base64,".length);
    return {
      frontcam: frontcamImage,
      screen: screenImage,
    };
  },
  getStreams: () => {
    const { frontcam, backcam, screen: screenFeed } = get();
    return { frontcam, backcam, screenFeed };
  },
}));

export default function ExamPage() {
  const backend = createBackendSocket("/student");
  const getImages = useStreamStore((state) => state.getImages);

  function sendAlert(reason) {
    const images = getImages();
    toast(
      <div>
        <p>
          You have been flagged for "{reason}". Please stop doing this otherwise
          BITS can take action against you.
        </p>
        <div className="flex">
          <StudentFeed feed={images.frontcam} />
          <StudentFeed feed={images.screen} />
        </div>
      </div>
    );
    backend.emit("alert", {
      reason,
      images: getImages(),
    });
  }

  return (
    <StudentContext.Provider value={{ backend, useStreamStore, sendAlert }}>
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
      <div className="flex h-screen">
        <div className="justify-center items-start grow overflow-scroll">
          {/* <ShortAnswer />
          <button onClick={() => sendAlert("Sample Reason")}>
            Send Sample Alert
          </button> */}
          {/* <ShortAnswer /> */}
          {/* <MCQ
            question={{ heading: "MCQ 1", text: "What is the best option?" }}
            options={["First", "Second", "Third", "Fourth"]}
          /> */}
          <Quiz /> 
          {/* <Dictaphone /> */}
          {/* <FlowComponent /> */}
          {/* <div className="h-[800px] w-[950x] flex items-center justify-center">
            <InputViewer />
          </div> */}
        </div>
        <div className="flex flex-col gap-3 justify-between max-w-[370px] border-l-2 p-3">
          <div>
            <Calculator />
          </div>
          <div>
            <StudentChat />
          </div>
        </div>
      </div>

      <Webcam />
      {process.env.NEXT_PUBLIC_BROWSER_LOCK == "true" && <TabDetector />}
      <Screen />
    </StudentContext.Provider>
  );
}
