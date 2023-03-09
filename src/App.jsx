import React from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


firebase.initializeApp({
  apiKey: "AIzaSyAGphO1Py7e8WRhvNGh8--6IZe0jTZpG8w",
  authDomain: "superchat-15642.firebaseapp.com",
  projectId: "superchat-15642",
  storageBucket: "superchat-15642.appspot.com",
  messagingSenderId: "880959806508",
  appId: "1:880959806508:web:7ebda4f65f6de4b0144589",
  measurementId: "G-VY0Y2SJDRY"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
const [user] = useAuthState(auth);
  return (
    <div>
      {user ? <Chatroom /> : <Signin />}
    </div>
  )
}

function Signin() {
    const Login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
  return (
    
    <div className=''>
        <button onClick={Login}>Signin</button>
    </div>
  )
}


export default App;