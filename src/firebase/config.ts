import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBruRYocr8HLs90433fULNIRzBmqEgLlBo",
  authDomain: "taskify-ea843.firebaseapp.com",
  projectId: "taskify-ea843",
  storageBucket: "taskify-ea843.appspot.com",
  messagingSenderId: "45595105634",
  appId: "1:45595105634:web:27e7b556cecf8c3946f43b",
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//intialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
