import { initializeApp } from "firebase/app";

// Firebase AUTH
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ###############################################

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

// ##########################################

// Google AUTH
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// ###############################################

//Firestore setup
export const db = getFirestore();

//userAuth object getting from auth service and store in Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // để protect our code, nếu như kh có tham số userAuth được truyền vào thì return luôn
  if (!userAuth) return;
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }

  //if user data exists

  return userDocRef;
};

// ##########################################

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
