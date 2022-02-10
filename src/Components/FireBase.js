import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Config from "../config";

const {API_KEY,AUTHDOMAIN,PROJECTID,STORAGEBUCKET,MESSAGINGSENDERID,APPID}=Config

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
export default getFirestore();
export const auth = getAuth(app);
