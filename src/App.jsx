import React from 'react';
import SuperChat from './assets/SuperChat.png';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Popup from 'reactjs-popup';

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
    <div className='flex px-5'>
      <Popup trigger={<button><img src={img}  className="h-10 rounded-full" ></img> </button>}> 
        <div className='flex  bg-slate-100 rounded-lg h-52 w-96 absolute right-1'>
          <div className='w-full border-b-2 mx-2 bg-white h-2/3 '>
            <div className='flex items-center  rounded-2xl h-20'>
              <img src={user.photoURL} className="rounded-full w-16 mx-3 h-16"></img>
              <div className='text-xs flex flex-col '>
                <p className='font-semibold'>{user.displayName}</p>
                <p className='text-slate-900'>{user.email}</p>
              </div>
            </div>
            <div className='border-2 hover:bg-slate-200 w-'>
              <button className='py-2 font-semibold  w-full'>Manage your Account</button>
            </div>
            <div className='py-5 '><button className='border-2 px-2 py-2 rounded-xl hover:bg-slate-200' onClick={Signout}> <Signout /></button></div>
          </div>
        </div>
       </Popup>
    </div>
  )
}

function Chatroom(){
  
  const [user] = useAuthState(auth);
  const messageRef = firestore.collection("message");
  const query = messageRef.orderBy('createdAt');
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
    <div className='bg-slate-800 h-full min-h-screen text-white  '>
      <div className='flex justify-between shadow-lg'>
          <div className='my-4 mx-2'> 
            <img typeof='image' src={SuperChat} className="h-10"></img>
          </div>
          <div className='flex justify-end px-4 py-4 '>
              <Header />
          </div>
      </div>
        <div className='flex flex-col items-center pb-10 pt-7'>
          <div className="w-2/5">
            {messages && messages.map(msg => <Chatmessage  key={msg.id} message={msg} /> )}
          </div>
          <div className="w-1/3">
            <form onSubmit={sendMessage}>
              <input value={formValue} className="w-full p-1 bg-[#64748b] rounded-md" onChange={(e) => setFormValue(e.target.value)}></input>
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
    <div className='flex my-5 justify-end items-center'>
        <p className='px-3'>{text}</p>
        <img src={image}  className="h-14 rounded-full"></img>
    </div>
  )
}
else{
  return(
    <div className='flex my-5 items-center'>
    <img src={image} className="h-14 rounded-full"></img>
    <p className='px-3'>{text}</p>
    </div>
  )
}
} 
export default App;
