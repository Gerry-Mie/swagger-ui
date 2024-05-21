import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const env = import.meta.env

const firebaseConfig = {
    apiKey: env.VITE_APIKEY,
    authDomain: env.VITE_AUTHDOMAIN,
    projectId: env.VITE_PROJECTID,
    storageBucket: env.VITE_STORAGEBUCKET,
    messagingSenderId: env.VITE_MESSAGINGSENDERID,
    appId:  env.VITE_APPID,
    measurementId: env.VITE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const fireStore = getFirestore(app)