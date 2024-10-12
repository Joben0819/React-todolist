// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth' 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9267tbBwn783q0Sxv0EcD01m8iIdBPSk",
  authDomain: "todolist-6d0fb.firebaseapp.com",
  projectId: "todolist-6d0fb",
  storageBucket: "todolist-6d0fb.appspot.com",
  messagingSenderId: "66808431203",
  appId: "1:66808431203:web:0a33bdde2e653cea876e56",
  measurementId: "G-XWB2SPWQEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

const auth = getAuth(app)

export{app, auth, db};

