import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
