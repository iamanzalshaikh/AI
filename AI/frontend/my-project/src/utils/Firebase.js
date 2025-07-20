// src/utils/Firebase.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

    authDomain: "login-68c15.firebaseapp.com",
    projectId: "login-68c15",
    storageBucket: "login-68c15.firebasestorage.app", // keep this if console shows it
    messagingSenderId: "72350881456",
    appId: "1:72350881456:web:456f8b1885d42e3c0ccd75"
};

// ❗ Fix: initialize only if app not already created
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ Initialize auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
