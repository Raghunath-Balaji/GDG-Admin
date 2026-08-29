import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function migrateData() {
    console.log("Starting Migration...");

    try {
        // Migrate Events
        const eventsPath = path.join(__dirname, 'public', 'content', 'events.json');
        if (fs.existsSync(eventsPath)) {
            const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
            console.log(`Found ${eventsData.length} events to migrate.`);
            for (const event of eventsData) {
                // Remove the id from the object itself if needed, or keep it.
                // It's safer to keep it for frontend consistency.
                const docId = event.id;
                await setDoc(doc(db, 'events', docId), event);
                console.log(`✅ Migrated event: ${docId}`);
            }
        }

        // Migrate Core Team
        const teamPath = path.join(__dirname, 'public', 'content', 'team.json');
        if (fs.existsSync(teamPath)) {
            const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
            console.log(`Found ${teamData.length} team members to migrate.`);
            for (const member of teamData) {
                const docId = member.id;
                await setDoc(doc(db, 'core_members', docId), member);
                console.log(`✅ Migrated core member: ${docId}`);
            }
        }

        console.log("🎉 Migration completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}

migrateData();
