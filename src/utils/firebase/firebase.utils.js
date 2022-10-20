import { initializeApp } from "firebase/app";

// Firebase AUTH
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3Bl4Ujn0i-D7HrH1UZvLfcoe5-DzvxJI",
  authDomain: "ztm-clothing-db-cad7a.firebaseapp.com",
  projectId: "ztm-clothing-db-cad7a",
  storageBucket: "ztm-clothing-db-cad7a.appspot.com",
  messagingSenderId: "122212622075",
  appId: "1:122212622075:web:bf4f326848c6401d6dda5e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google AUTH
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Firestore setup
export const db = getFirestore();

//userAuth object getting from auth service and store in Firestore
export const createUserDocumentFromAuth = async (userAuth) => {
  // take 3 params: db - collection - identifier: uniqueID
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //if user data doesnt exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }

  //if user data exists

  return userDocRef;
};
