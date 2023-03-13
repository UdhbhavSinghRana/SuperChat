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
function Header() {
  const [user] = useAuthState(auth);
  const img = user.photoURL;
  return (
    <div className='flex '>
      <img src={img}  className="h-10 rounded-full "></img>
      <div className='px-2'>{user.displayName}</div>
      
    </div>
  )
}

function Chatroom(){
  
  const [user] = useAuthState(auth);
  const messageRef = firestore.collection("message");
  const query = messageRef.orderBy('createdAt').limit(25);
  const [formValue,setFormValue] = useState('');
  
  const sendMessage=(e) => {
    e.preventDefault();
    if(formValue === ''){
      return;
    }
    const {uid} = auth.currentUser;
  
    messageRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      image:user.photoURL
    });
  
    setFormValue('');
  }
  const [messages] = useCollectionData(query,{idField: 'id'});
  {messages && messages.map((message) => console.log(message.id))}

  return(
    <div className='bg-slate-800 h-full min-h-screen text-white '>
          <div className='flex justify-between px-4 py-4 shadow-lg'>
          <Header />
          <Signout />
          </div>
        <div className='flex flex-col items-center'>
          <div >
            {messages && messages.map(msg => <Chatmessage  key={msg.id} message={msg} /> )}
          </div>
          <div>
            <form onSubmit={sendMessage}>
              <input value={formValue} onChange={(e) => setFormValue(e.target.value)}></input>
            </form>
          </div>
        </div>
    </div>
  )
}
function Chatmessage(props){
const [user] = useAuthState(auth);
const {text ,uid,image} = props.message;

console.log(image); 
if(uid === user.uid){
  return(
    <div className='flex '>
    <img src={image}  className="h-14 rounded-full"></img>
    <p className='px-2'>send {text}</p>
    </div>
  )
}
else{
  return(
    <div className='flex '>
    <img src={image} alt="A" className="h-14 rounded-full"></img>
    <p className='px-2'>recived {text}</p>
    </div>
  )
}
} 
export default App;