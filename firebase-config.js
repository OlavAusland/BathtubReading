import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCwdFLahzzg04Sv3TsyHB-LFxx6Z5ckKWE",
  authDomain: "midtermproject-6463c.firebaseapp.com",
  projectId: "midtermproject-6463c",
  storageBucket: "midtermproject-6463c.appspot.com",
  messagingSenderId: "337281102234",
  appId: "1:337281102234:web:80579d48adad95d5e30a23"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);