// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo__0eiPt-_sCxXkX57JqpQpXUWOWtwKc",
  authDomain: "lost-and-found-client.firebaseapp.com",
  projectId: "lost-and-found-client",
  storageBucket: "lost-and-found-client.firebasestorage.app",
  messagingSenderId: "282206636596",
  appId: "1:282206636596:web:b9c0c414f59493834ad861"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);