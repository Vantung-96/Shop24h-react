import firebase from "firebase";
import "firebase/auth";


const firebaseConfig ={
    apiKey: "AIzaSyB-R1LkcLgHmb8jfNCvTfP8J8ysdj_LzKs",
  authDomain: "task2410.firebaseapp.com",
  projectId: "task2410",
  storageBucket: "task2410.appspot.com",
  messagingSenderId: "679461292352",
  appId: "1:679461292352:web:9f115274da1b5d9a7e92a5"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();