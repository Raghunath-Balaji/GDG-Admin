import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
    console.log("Testing Firestore connection...");
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        console.log("SUCCESS! Got docs:", querySnapshot.size);
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
}

test();
