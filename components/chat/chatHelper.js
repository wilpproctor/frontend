import { getDoc, setDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firestore.js';

export const connect = async (proctor, student) => {
    try {
        const connectionName = proctor + "," + student;
        const connection = doc(db, 'chat', connectionName);
        const check = await getDoc(connection);
        console.log("check: ", check)
        if (!check.exists())
            await setDoc(connection, {
                'student': student,
                'proctor': proctor,
                'messages': [],
            }, { merge: true });
        return connection;
    } catch (e) {
        console.error(e);
    }
}

export const sendMessage = async (from, docName, message) => {
    console.log("Sending chat message: ", message, docName)
    const newMessage = {
        'from': from,
        'timestamp': Date.now(),
        'msg': message,
    };
    try {
        await setDoc(doc(db, "chat", docName), {
            messages: arrayUnion(newMessage)
        }, { merge: true });
        return newMessage;
    } catch (e) {
        console.error(e);
    }
}

export const readMessages = async (connection) => {
    try {
        console.log("Will be Reading chat message: ")
        const messages = await getDoc(doc(db, "chat", connection));
        console.log("Reading chat message: ",messages)
        return messages;
    } catch (e) {
        console.error(e);
    }
}