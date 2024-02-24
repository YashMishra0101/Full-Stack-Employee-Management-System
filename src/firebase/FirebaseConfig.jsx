import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtcuMN3LZS8DjkGcx1j-yCM9GZgbUDmbc",
  authDomain: "skymentor-266a0.firebaseapp.com",
  projectId: "skymentor-266a0",
  storageBucket: "skymentor-266a0.appspot.com",
  messagingSenderId: "657553068545",
  appId: "1:657553068545:web:3f8f63f943d77c821a6600",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const fireDB = getFirestore(app);
export default fireDB;
