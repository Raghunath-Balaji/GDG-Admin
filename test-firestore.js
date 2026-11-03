import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import fs from "fs";

if (!process.env.VITE_FIREBASE_API_KEY && fs.existsSync('.env')) {
  const envConfig = fs.readFileSync('.env', 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length) {
      process.env[key.trim()] = value.join('=').trim();
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
    console.log("Testing Firestore connection...");
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        console.log("SUCCESS! Got docs in events:", querySnapshot.size);
        process.exit(0);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
}

test();
