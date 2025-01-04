import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";

const config = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
};

const App = initializeApp(firebaseConfig);
const Auth = getAuth(App);

const firestoreDB = getFirestore();

export const user = uid => doc(firestoreDB,`users/${uid}`);


export { firestoreDB };

export { Auth };