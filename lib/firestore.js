// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMEPA9SzpUAX0Jcyw2LJ1oeXF2kY_RaCQ",
  authDomain: "wilp-proctor.firebaseapp.com",
  databaseURL: "https://wilp-proctor-default-rtdb.firebaseio.com",
  projectId: "wilp-proctor",
  storageBucket: "wilp-proctor.appspot.com",
  messagingSenderId: "636856906746",
  appId: "1:636856906746:web:60d7edb4ef3984f8e3ea43",
  measurementId: "G-Y3LWJ6HJZS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);