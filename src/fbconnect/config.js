import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase config object when you have it
const firebaseConfig = {
  apiKey: "AIzaSyDJvd_-7a5Y2JL9Sr84Sd05M54UU4EBqiU",
  authDomain: "crisislink-1b7e0.firebaseapp.com",
  databaseURL: "https://crisislink-1b7e0-default-rtdb.firebaseio.com",
  projectId: "crisislink-1b7e0",
  storageBucket: "crisislink-1b7e0.firebasestorage.app",
  messagingSenderId: "527459182647",
  appId: "1:527459182647:web:cbd4f6fe210b9752da37b2",
  measurementId: "G-P6VNW9NW9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
