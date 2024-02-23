// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDmrjJ0kBqNOCUEh2YcxqR1ayOvdhe2Q0",
  authDomain: "projeto-miniblog-react.firebaseapp.com",
  projectId: "projeto-miniblog-react",
  storageBucket: "projeto-miniblog-react.appspot.com",
  messagingSenderId: "905874340700",
  appId: "1:905874340700:web:b904732254079bd3c45f99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);   

export { db };