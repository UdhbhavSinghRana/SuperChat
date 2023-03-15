  import React from 'react';
  import SuperChat from './assets/SuperChat.png';
  import firebase from 'firebase/compat/app'; 
  import 'firebase/compat/firestore';
  import 'firebase/compat/auth';  
  import { useState } from 'react';
  import { useAuthState } from 'react-firebase-hooks/auth';
  import { useCollectionData } from "react-firebase-hooks/firestore";
  import Popup from 'reactjs-popup';
  import { useRef } from 'react';

  document.body.className="overflow-hidden";

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

function Header() {
  const [user] = useAuthState(auth);
  const img = user.photoURL;
  return (
    <div className='flex px-5'>
      <Popup trigger={<button><img src={img}  className="h-10 rounded-full" ></img> </button>}> 
        <div className='flex flex-col justify-between bg-slate-100 rounded-lg w-96 absolute right-1 p-4 subpixel-antialiased'>
          <div id="top-section" className='h-2/3 flex flex-col justify-around p-2 border-b-2 border-slate-200/80 mb-4'>
            <div id="user" className="flex">
              <img className="rounded-full h-16 w-16 mr-4" src={user.photoURL} />
              <div id="user-info-div" className="flex items-center">
                <div id="user-info">
                  <div id="user-info-name" className="font-semibold">{user.displayName}</div>
                  <div id="user-info-email" className="font-light text-sm">{user.email}</div>
                </div>
              </div>
            </div>
            <div id="manage-account" className="flex justify-center items-center py-2 border-2 border-gray-300 rounded-full mt-4 mb-2 hover:bg-gray-300 hover:cursor-pointer">
              Manage account
            </div>
          </div>
          <div id="bottom-section" className='h-1/3 flex items-center'>
            <button className="border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-300 " onClick={() => auth.signOut()}>SignOut</button>
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
      titleRef.current.scrollIntoView({ behavior: "smooth" });
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
    const titleRef = useRef();

    return(
      <div className='bg-[url("./assets/bg.svg")] bg-cover h-full  text-white '>
        <div className='flex justify-between shadow-lg  w-full opacity-100 '>
            <div className='my-4 mx-2'> 
              <img typeof='image' src={SuperChat} className="h-10"></img>
            </div>
            <div className='flex justify-end px-4 py-4 '>
                <Header />
            </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='w-2/5 overflow-scroll h-screen scroll-smooth container-snap'>
            <div className="" >
              {messages && messages.map(msg => <Chatmessage  key={msg.id} message={msg} /> )}
            </div>
            <div className="w-full mt-5 mb-24" ref={titleRef} >
              <form onSubmit={sendMessage}>
                <input value={formValue} className="w-full p-1 bg-[#051e2b] rounded-md" onChange={(e) => setFormValue(e.target.value)}></input>
              </form>
            </div>
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
      <div className='flex my-5 justify-end items-center '>
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
