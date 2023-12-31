import { useState, useEffect, useContext } from "react";
import { connect, sendMessage, readMessages } from "./chatHelper";
import { getUserDetails } from "../../lib/login";
import { onSnapshot, getDoc, doc, getDocs } from "firebase/firestore";
import { query, collection, where } from "firebase/firestore";
import StudentContext from "../../lib/StudentContext";
import { db } from "../../lib/firestore";

export default function StudentChat() {
    const currentUser = getUserDetails();
    const [currentProctor, setCurrentProctor] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [isWindowOpen, setWindowOpen] = useState(true);
    const { backend } = useContext(StudentContext);

    useEffect(() => {
        backend.on("proctor-connected", ({ email }) => {
            console.log(email);
            setCurrentProctor(email);
        })
    }, []);

    useEffect(() => {
        (async () => {
            console.log("chat messages =", chatMessages);
            if (currentProctor) {
                try {
                    const connection = `${currentProctor},${currentUser.email}`
                    const docRef = doc(db, 'chat', connection);
                    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            setChatMessages(docSnapshot.data().messages);
                          } else {
                            console.log('No messages data found');
                          }
                    })
                    // const messagesData = await readMessages(connection);
                    // console.log("messages data =", messagesData.data());
    
                    // if (messagesData.data()) {
                    //     console.log("Fetched messages =", messagesData.data().messages);
                    //     setChatMessages(messagesData.data().messages);
                    // } else {
                    //     console.log("No messages data found.");
                    // }
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        })();
    }, [currentProctor ]);
    

    const newMessage = async (msg) => {
        if (!msg) return;
        document.getElementById("message-box").value = "";
        await sendMessage(
            currentUser.email,
            currentProctor + "," + currentUser.email,
            msg
        );
    };

    return (
        <div>
            {isWindowOpen && (
                <div className="flex flex-col justify-between h-80 mb-2 p-2 bg-slate-300 rounded-lg">
                    <div className="bg-slate-400 rounded-lg p-2">
                        <h1 className="text-lg font-semibold text-center">{currentProctor || "Waiting for proctor..."}</h1>
                    </div>
                    <div className="flex flex-col-reverse grow mt-1 mb-1.5 overflow-auto">
                        {chatMessages.map((obj, i) => (
                            <div key={i} className={`${obj.from == currentUser.email ? "self-end text-right mr-1.5" : "self-start text-left"}`}>
                                <time className="text-xs opacity-70">{new Date(obj.timestamp).toTimeString().substring(0, 8)}</time>
                                <p className={`break-words max-w-[278px] rounded-lg p-1 pr-1.5 pl-1.5 text-slate-200 ${obj.from == currentUser.email ? "bg-green-700" : "bg-slate-800"}`}>{obj.msg}</p>
                            </div>
                        )).reverse()}
                    </div>
                    <form className="flex flex-row justify-between gap-1 mt-1 justify-self-end" onSubmit={(e) => { e.preventDefault(); newMessage(document.getElementById("message-box").value); }}>
                        <input type="text" required className="bg-slate-400 p-1 grow rounded-lg" id="message-box" name="message-box" />
                        <button className="bg-slate-400 rounded-lg p-2" type="submit"> {">"} </button>
                    </form>
                </div>
            )}
            <div className="flex flex-col flex-grow">
                <button className="bg-indigo-700 text-white rounded-lg p-2" onClick={() => setWindowOpen(!isWindowOpen)}>
                    {isWindowOpen ? "Close Chat" : "Open Chat"}
                </button>
            </div>
        </div>
    );

    // return (
    //     <div className="grid grid-cols-2 gap-4 justify-items-center p-10">
    //         <div className="flex flex-col flex-wrap content-start gap-5">
    //             <h1 className="text-xl font-bold">Connect to proctor: (temp)</h1>
    //             <div>
    //                 <input className="bg-neutral-200 p-2 mt-5" id="proctor-input" name="proctor-input" />
    //                 <button className="bg-slate-500 text-white p-2" onClick={() => connectToProctor(document.getElementById("proctor-input").value)}>Connect</button>
    //             </div>
    //         </div>
    //         {connection && (
    //             <div className="flex flex-col flex-wrap content-start gap-2">
    //                 <h1 className="text-xl font-bold">Chat:</h1>
    //                 <i>Connected with {currentProctor}</i>
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
    //     </div>
    // );
}
