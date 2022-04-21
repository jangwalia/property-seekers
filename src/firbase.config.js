// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgbkd7wLr1MHa2WBhFyeo3Pl2hVz8NP1s",
  authDomain: "click-list-8ac18.firebaseapp.com",
  projectId: "click-list-8ac18",
  storageBucket: "click-list-8ac18.appspot.com",
  messagingSenderId: "445414004157",
  appId: "1:445414004157:web:44dd873cf2fea48910aed4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()