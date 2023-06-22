// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
//import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";


//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
//import { getFirestore, collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyDhErPtwd7QVD2XsTynl9LFOLacjT1Hy10",
  authDomain: "prospeccion-candidatos.firebaseapp.com",
  projectId: "prospeccion-candidatos",
  storageBucket: "prospeccion-candidatos.appspot.com",
  messagingSenderId: "920347591855",
  appId: "1:920347591855:web:4fba53177c8f462d19405a",
  measurementId: "G-P842K9SGTG"
});

// Initialize Firebase

var db = firebase.firestore();

const auth = firebase.auth();

