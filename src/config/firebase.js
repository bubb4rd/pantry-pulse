import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, GoogleAuthProvider, browserPopupRedirectResolver, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

const firebase = {
    apiKey: "AIzaSyDM2QbzMGSRM4GgQnJc3yTud1PET4UdKgQ",
    authDomain: "pantrypulse-22e13.firebaseapp.com",
    projectId: "pantrypulse-22e13",
    storageBucket: "pantrypulse-22e13.appspot.com",
    messagingSenderId: "948874317762",
    appId: "1:948874317762:web:0a2f375480c03de02f905b",
    measurementId: "G-VKEV76JHZH"
};

const app = initializeApp(firebase);
export const auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);