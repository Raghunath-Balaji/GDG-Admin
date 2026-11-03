import { collection, doc, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "./config";

// -- AUTH SERVICES -- //
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return { success: true, user: result.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const logoutUser = async () => {
    await signOut(auth);
};

// -- DATABASE SERVICES -- //

// Generic function to get all documents from a collection
export const getCollectionData = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    return data;
};

// Example function to add a document to a collection (auto-ID)
export const addDocument = async (collectionName, data) => {
    const { id, ...dataWithoutId } = data || {};
    const docRef = await addDoc(collection(db, collectionName), dataWithoutId);
    return docRef.id;
};

// Function to set a document with a specific ID
export const setDocument = async (collectionName, docId, data) => {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
};

// Example function to update a document
export const updateDocument = async (collectionName, docId, data) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
};

// Example function to delete a document
export const deleteDocument = async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
};

// -- STORAGE SERVICES -- //
export const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const deleteImageFromStorage = async (urlOrPath) => {
    if (!urlOrPath) return;
    try {
        if (typeof urlOrPath === 'string' && (urlOrPath.includes('firebasestorage.googleapis.com') || urlOrPath.startsWith('gallery/'))) {
            const storageRef = ref(storage, urlOrPath);
            await deleteObject(storageRef);
            console.log("✅ [Services] Deleted image from Firebase Storage:", urlOrPath);
        }
    } catch (err) {
        console.warn("⚠️ [Services] Could not delete image from Storage:", err.message);
    }
};
