import { useState, useEffect, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect, sendMessage, readMessages } from "./chatHelper";
import { getUserDetails } from "../../lib/login";
import { onSnapshot } from "firebase/firestore";
import { useChatStore } from "../proctor/StudentFeeds";
import { db } from "../../lib/firestore";
import { query, collection, where } from "firebase/firestore";
import ProctorContext from "../../lib/ProctorContext";

export default function ProctorChat() {
  const currentUser = getUserDetails();
  const { backend, sendReplyWarning, sendReplyAction, useStudentsStore } =
    useContext(ProctorContext);
  const currentStudent = useChatStore((state) => state.chatStudent);
  const setUnread = useStudentsStore((state) => state.setUnread);
  const setRead = useStudentsStore((state) => state.setRead);
  const [chatMessages, setChatMessages] = useState([]);
  const [isWindowOpen, setWindowOpen] = useState(true);
  const [lastMessages, setLastMessages] = useState({});
  const warnReplyTime = 10 * 1000;
  const maxReplyTime = 20 * 1000;
  const warnTimerRef = useRef(null);
  const maxTimerRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log("I am outside unsub: ", obj)
      backend.on("student-feeds", (obj) => {
        connect(currentUser.email, obj.email);
      });
      const q = query(
        collection(db, "chat"),
        where("proctor", "==", currentUser.email)
      );
      
      const unsub = onSnapshot(q, (querySnapshot) => {
        console.log("I am in unsub: ", querySnapshot)
        querySnapshot.forEach((doc) => {
          if (doc.id == currentUser.email + "," + currentStudent)
            setChatMessages(doc.data().messages);
          if (doc.data().messages.length === 0) return;
          const lastMessage =
            doc.data().messages[doc.data().messages.length - 1];
          if (lastMessage !== (lastMessages[doc.id] ?? {})) {
            if (lastMessage.from != currentUser.email)
              setUnread(lastMessage.from);
            else setRead(lastMessage.to);
          }
          clearTimeout(warnTimerRef.current);
          clearTimeout(maxTimerRef.current);
          if (
            lastMessage.from != currentUser.email &&
            lastMessage !== (lastMessages[doc.id] ?? {})
          ) {
            warnTimerRef.current = setTimeout(
              () => sendReplyWarning(doc.data().student),
              warnReplyTime
            );
            maxTimerRef.current = setTimeout(
              () => sendReplyAction(doc.data().student, lastMessage),
              maxReplyTime
            );
            let temp = lastMessages;
            temp[doc.id] = lastMessage;
            setLastMessages(temp);
          }
        });
      });
    })();
  }, [currentStudent]);

  const newMessage = async (msg) => {
    if (!msg) return;
    console.log("msg: ", msg)
    document.getElementById("message-box").value = "";
    await sendMessage(
      currentUser.email,
      currentUser.email + "," + currentStudent,
      msg
    );
  };

  return (
    <div>
      {isWindowOpen && (
        <div className="flex flex-col justify-between h-96 w-[300px] mb-2 p-2 bg-slate-300 rounded-lg">
          <div className="bg-slate-400 rounded-lg p-2">
            <h1 className="text-lg font-semibold text-center ">
              {currentStudent || "Select student..."}
            </h1>
          </div>
          <div className="flex flex-col-reverse grow mt-1 mb-1.5 overflow-auto">
            {chatMessages
              .map((obj, i) => (
                <div
                  key={i}
                  className={`${
                    obj.from == currentUser.email
                      ? "self-end text-right mr-1.5"
                      : "self-start text-left"
                  }`}
                >
                  <time className="text-xs opacity-70">
                    {new Date(obj.timestamp).toTimeString().substring(0, 8)}
                  </time>
                  <p
                    className={`break-words max-w-[278px] rounded-lg p-1 pr-1.5 pl-1.5 text-slate-200 ${
                      obj.from == currentUser.email
                        ? "bg-green-700"
                        : "bg-slate-800"
                    }`}
                  >
                    {obj.msg}
                  </p>
                </div>
              ))
              .reverse()}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              newMessage(document.getElementById("message-box").value);
            }}
          >
            <div className="flex flex-row gap-1 mt-1 justify-self-end">
              <input
                className="bg-slate-400 p-1 rounded-lg"
                id="message-box"
                name="message-box"
              />
              <button
                className="bg-slate-400 rounded-lg p-2"
                onClick={() =>
                  newMessage(document.getElementById("message-box").value)
                }
                type="submit"
              >
                {" "}
                {">"}{" "}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <button
          className="bg-indigo-700 text-white rounded-lg p-2"
          onClick={() => setWindowOpen(!isWindowOpen)}
        >
          {isWindowOpen ? "Close Chat" : "Open Chat"}
        </button>
      </div>
    </div>
  );

  // return (
  //     <div className="grid grid-cols-2 gap-4 justify-items-center p-10">
  //         <div className="flex flex-col flex-wrap content-start gap-5">
  //             <h1 className="text-xl font-bold">Students: </h1>
  //             {students.map((obj, i) => (
  //                 <button key={i} onClick={() => connectToStudent(obj)} className="bg-slate-500 text-white p-2">{obj}</button>
  //             ))}
  //         </div>

  //         {connection && (
  //             <div className="flex flex-col flex-wrap content-start gap-2">
  //                 <h1 className="text-xl font-bold">Chat:</h1>
  //                 <i>Connected with {currentStudent}</i>
  //                 {chatMessages.map((obj, i) => (
  //                     <div className={`flex ${obj.from == currentUser.email ? "justify-end" : "justify-start"}`}>
  //                         <p key={i} className={`w-fit border rounded-lg p-1 ${obj.from == currentUser.email ? "bg-green-300" : "bg-gray-200"} `} >[{new Date(obj.timestamp).toTimeString().substring(0, 8)}] : {obj.msg}</p>
  //                     </div>
  //                 ))}
  //                 <div className="justify-self-end">
  //                     <input className="bg-neutral-200 p-2 mt-5" id="message-box" name="message-box" />
  //                     <button className="bg-slate-500 text-white p-2" onClick={() => newMessage(document.getElementById("message-box").value)} >Send</button>
  //                 </div>
  //             </div >
  //         )}
  //     </div >
  // );
}
