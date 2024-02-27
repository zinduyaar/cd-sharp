// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuF3lZ88sHSLg-TMuRH64npantlAVH0rg",
  authDomain: "cdplus-poc.firebaseapp.com",
  projectId: "cdplus-poc",
  storageBucket: "cdplus-poc.appspot.com",
  messagingSenderId: "1044917445619",
  appId: "1:1044917445619:web:7f03758c240bd63b5ce886",
  measurementId: "G-DLGTYV4QKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
