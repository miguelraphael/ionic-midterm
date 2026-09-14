import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeAmoSMEb2oZsTEUrLBBFowBawO4XFBA0",
  authDomain: "ionic-daily-task.firebaseapp.com",
  projectId: "ionic-daily-task",
  storageBucket: "ionic-daily-task.firebasestorage.app",
  messagingSenderId: "854295620851",
  appId: "1:854295620851:web:3bcd6af180a2c078f01b86",
  measurementId: "G-T147T38B0Q"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
