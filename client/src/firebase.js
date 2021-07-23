import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhiCnSFR3413fyjR99kxPgUzRxoiktEx8",
    authDomain: "shopdigital-bcd23.firebaseapp.com",
    projectId: "shopdigital-bcd23",
    storageBucket: "shopdigital-bcd23.appspot.com",
    messagingSenderId: "563390030823",
    appId: "1:563390030823:web:48b8edb65b3d20f2f75342",
    measurementId: "G-ZZDLT3KRC1"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();