// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeRbqVa7iqma66THfkNr2j8uxdFq0aQbI",
  authDomain: "workspace-9659c.firebaseapp.com",
  projectId: "workspace-9659c",
  storageBucket: "workspace-9659c.appspot.com",
  messagingSenderId: "665940004056",
  appId: "1:665940004056:web:9ea7d04377d0c351cf9bad",
  measurementId: "G-5ZRBNR0SS9",
};

// firebase.initializeApp(firebaseConfig);

if (!firebase?.apps?.length) {
  const app = firebase?.initializeApp(firebaseConfig);
  if (window) getAnalytics(app);
}

export default firebase;
export const firestore = firebase.firestore();
