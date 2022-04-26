// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqZQOhj0w-iK7bzf20DMLOyUvCbCKcZmU",
  authDomain: "property-listing-541db.firebaseapp.com",
  projectId: "property-listing-541db",
  storageBucket: "property-listing-541db.appspot.com",
  messagingSenderId: "1081928750722",
  appId: "1:1081928750722:web:07caf2ad19b42a9b78069b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();