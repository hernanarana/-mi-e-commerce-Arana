import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDqnkLetbaxhhFrFKm4BL--O5CKNr7oqq4",
  authDomain: "ecomerce-arana.firebaseapp.com",
  projectId: "ecomerce-arana",
  storageBucket: "ecomerce-arana.firebasestorage.app", 
  messagingSenderId: "872293023319",
  appId: "1:872293023319:web:92ad5682de8759fc65ad12",
  measurementId: "G-XXJB0F1SMD"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


