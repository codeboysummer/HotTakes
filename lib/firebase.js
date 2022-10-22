import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBAL5aKp9LM5ivivXjrxK4VaRDa1BlEHxk",
  authDomain: "hottakes-f81e8.firebaseapp.com",
  projectId: "hottakes-f81e8",
  storageBucket: "hottakes-f81e8.appspot.com",
  messagingSenderId: "824970094484",
  appId: "1:824970094484:web:e50eb74e040da46a7a9181",
  measurementId: "G-53YNZPVJPT"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db =getFirestore(app)
export const googleAuthProvider = new GoogleAuthProvider();
