import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const API_KEY = import.meta.env.VITE_Firebase_API_KEY;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "employee-management-syst-a6460.firebaseapp.com",
  projectId: "employee-management-syst-a6460",
  storageBucket: "employee-management-syst-a6460.appspot.com",
  messagingSenderId: "143925916119",
  appId: "1:143925916119:web:58e9a681ecd6444d8cdb92"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const fireDB = getFirestore(app);
export default fireDB;
