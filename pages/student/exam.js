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
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import StudyMaterial from "./material";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

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
  const router = useRouter();
  const examId = useSelector((state) => state.examId);
  // const { examId } = router.query;
  const backend = createBackendSocket("/student");
  const getImages = useStreamStore((state) => state.getImages);
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

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

  const handleQuizSubmit = ()=>{
    router.push({
      pathname: `/student/result`,
      //query: { returnUrl: router.asPath },
    });
  } 

  return (
    <StudentContext.Provider value={{ backend, useStreamStore, sendAlert }}>
      <Header countertimer={true}/>
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
          {/* <Quiz examId={examId}/> */}
          <Quiz handleQuizSubmit={handleQuizSubmit}/>
          <StudyMaterial /> {/* Place the StudyMaterial component here */}
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
          <div style={{ /* Inline styling for card container */
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%" /* Make the card span the entire width */
        }}>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Click 'Start Recording' to begin"
            style={{
              border: "none",
              width: "100%", /* Make the textarea span the entire width */
              flexGrow: 1,
              resize: "vertical",
              padding: "10px"
            }}
          />
          <Dictaphone outputUpdater={setText} answer="" />
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
