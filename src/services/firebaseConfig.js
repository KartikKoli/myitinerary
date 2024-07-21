// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY,
  authDomain: "my-itinerary-e3edf.firebaseapp.com",
  projectId: "my-itinerary-e3edf",
  storageBucket: "my-itinerary-e3edf.appspot.com",
  messagingSenderId: "198015535464",
  appId: "1:198015535464:web:9c2149931f123f06d4eedd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);