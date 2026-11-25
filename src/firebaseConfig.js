// src/firebaseConfig.js
// Los datos del proyecto de Firebase se leen de variables de entorno (archivo .env).
// Copiá .env.example como .env y completalo. En Vercel o Netlify, cargá las mismas variables.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Falta la configuración de Firebase: completá las variables VITE_FIREBASE_* en el archivo .env');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
