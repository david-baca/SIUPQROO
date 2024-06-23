import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAEDbWD6LvhZEfebNwKqLjX7k_aUBD1hnQ',
  authDomain: 'proyecto-integrador-fcbb4.firebaseapp.com',
  projectId: 'proyecto-integrador-fcbb4',
  storageBucket: 'proyecto-integrador-fcbb4.appspot.com',
  messagingSenderId: '788646571354',
  appId: '1:788646571354:web:ee7c3c76f39666eb885763',
  measurementId: 'G-X9HYDCGLTM'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
