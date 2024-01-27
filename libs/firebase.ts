// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHSvsoGYyR2vvmVh1En2unmXrrkFihyeA',
  authDomain: 'smart-shop-vid.firebaseapp.com',
  projectId: 'smart-shop-vid',
  storageBucket: 'smart-shop-vid.appspot.com',
  messagingSenderId: '840205212566',
  appId: '1:840205212566:web:7bd1675eecdd424c231bb7',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
