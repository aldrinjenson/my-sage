import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "dotenv/config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  // measurementId: process.env.MEASUREMENTID,
};

// firebase.initializeApp(firebaseConfig);

if (!firebase?.apps?.length) {
  const app = firebase?.initializeApp(firebaseConfig);
  if (app) getAnalytics(app);
}

export default firebase;
export const firestore = firebase.firestore();
