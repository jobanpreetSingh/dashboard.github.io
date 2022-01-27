// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7b1HIxLHAIJ6721wjz4fndz19VnOx-iY",
  authDomain: "dashboard-ddb0f.firebaseapp.com",
  projectId: "dashboard-ddb0f",
  storageBucket: "dashboard-ddb0f.appspot.com",
  messagingSenderId: "978268932174",
  appId: "1:978268932174:web:4b2794331331de8be2db1f",
  measurementId: "G-GTFR7C4YFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
