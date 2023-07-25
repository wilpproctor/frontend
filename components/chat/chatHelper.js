import { getDoc, setDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firestore.js';

export const connect = async (proctor, student) => {
    try {
        const connectionName = proctor + "," + student;
        const connection = doc(db, 'chat', connectionName);
        const check = await getDoc(connection);
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
        const messages = await getDoc(connection);
        return messages.data();
    } catch (e) {
        console.error(e);
    }
}