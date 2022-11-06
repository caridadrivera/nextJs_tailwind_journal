import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6o-3DWUqHL-PsUWwedMP4_aIm80tL8tg",
    authDomain: "next-mindspace.firebaseapp.com",
    projectId: "next-mindspace",
    storageBucket: "next-mindspace.appspot.com",
    messagingSenderId: "557569947909",
    appId: "1:557569947909:web:d7fa6ef1b93c05de9d9f6c"
  };
  
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)