import React from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore"


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
        <button onClick={Login}>Signin With Google</button>
    </div>
  )
}
function Signout(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

function Chatroom(){
  
  const messageRef = firestore.collection("message");
  const query = messageRef.orderBy('createdAt').limit(25);
  const [formValue,setFormValue] = useState('');
  const sendMessage=(e) => {
    e.preventDefault();
    const {uid} = auth.currentUser;
  
    messageRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
  
    setFormValue('');
  }
  const [messages] = useCollectionData(query,{idField: 'id'});
  {messages && messages.map((message) => console.log(message.id))}

  return(
    <div className=''>
      <Signout />
      <div>
        {messages && messages.map(msg => <Chatmessage  key={msg.id} message={msg} /> )}
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}></input>
        </form>
      </div>
    </div>
  )
}
function Chatmessage(props){
const [user] = useAuthState(auth);
const {text ,uid} = props.message;
console.log(uid);
console.log(user.uid);

if(uid === user.uid){
  return(
    <p>send {text}</p>
  )
}
else{
  return(
    <p>received {text}</p>
  )
}
} 
export default App;