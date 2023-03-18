import React, { useEffect } from 'react';
import SuperChat from './assets/SuperChat.png';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Popup from 'reactjs-popup';
import {useRef} from 'react';
import { IconButton } from '@material-ui/core';
import Google from './assets/Google.svg';
import { Password } from '@mui/icons-material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

document.body.className = "scroll-smooth overflow-clip ";

firebase.initializeApp({
    apiKey: `${import.meta.env.VITE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_APP_ID}`,
    measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}` 
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    
    const [user] = useAuthState(auth);
    return (
        <div>
            {user
                ? <Chatroom/>
                : <Signin/>}
        </div>
    )
}

function Signin() {
    const [name,SetName] = useState('');
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const Login = () => {
        const provider = new firebase
            .auth
            .GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const SignWithEmail = (e) => {
        if(!name) return alert("Please enter name")
        e.preventDefault();
        auth.
        createUserWithEmailAndPassword(email,password).
        then((userAuth) => {
            console.log(userAuth);
            userAuth.user.
            updateProfile({
                displayName:name,
            })
        })
        
    }
    return (
        <>
        <div className='h-screen flex justify-center items-center '>
            <div className='h-4/5 w-2/3 flex shadow-2xl'>
                <div className='w-1/2 bg-[url("./assets/SignIn.svg")] font-black'>
                    <div className='flex flex-col justify-center items-center h-full  text-white text-center'>
                        <div className='text-5xl'>
                            Welcome Back
                        </div>
                        <div className='h-1/5 py-2 flex px-10 text-md'>
                            Join the conversation and explore new horizons with our chat community.
                        </div>
                        <div className='text-xl hover:text-blue-300'>
                            <button>
                                SignIn
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-1/2  '>
                    <div className='flex flex-col py-20 items-center h-full'>
                        <div className=' text-5xl font-black'>
                            Create Account
                        </div>
                        <div className='py-7 flex flex-col items-center w-full'>
                            <button onClick={Login}>
                                <img src={Google} className="h-10 w-10"></img>
                            </button>
                            <div className='w-full'>
                                <form className='py-14 w-full flex flex-col justify-center items-center gap-5' >
                                    <input className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Username' onChange={(e) => SetName(e.target.value)}></input>
                                    <input type={"email"} className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Email' onChange={(e) => SetEmail(e.target.value)}></input>
                                    <input type={"Password"} className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Password' onChange={(e) => SetPassword(e.target.value)}></input>
                                    <button onClick={SignWithEmail}>SignUp</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}

function Header() {
    const [user] = useAuthState(auth);
    const img = user.photoURL;
    return (
        <div className='flex px-5 '>
            <Popup trigger={<button> <img src={img} className="h-10 rounded-full"></img> </button>}>
                <div
                    className='flex flex-col justify-between  bg-slate-100 rounded-lg w-96 absolute right-1 p-4 subpixel-antialiased'>
                    <div
                        id="top-section"
                        className='h-2/3 flex flex-col justify-around p-2 border-b-2 border-slate-200/80 mb-4'>
                        <div id="user" className="flex">
                            <img className="rounded-full h-16 w-16 mr-4" src={user.photoURL}/>
                            <div id="user-info-div" className="flex items-center">
                                <div id="user-info">
                                    <div id="user-info-name" className="font-semibold">{user.displayName}</div>
                                    <div id="user-info-email" className="font-light text-sm">{user.email}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="manage-account"
                            className="flex justify-center items-center py-2 border-2 border-gray-300 rounded-full mt-4 mb-2 hover:bg-gray-300 hover:cursor-pointer">
                            Manage account
                        </div>
                    </div>
                    <div id="bottom-section" className='h-1/3 flex items-center'>
                        <button
                            className="border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-300 "
                            onClick={() => auth.signOut()}>SignOut</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

const Chatroom = () => {

    const [user] = useAuthState(auth);
    const messageRef = firestore.collection("message");
    const query = messageRef.orderBy('createdAt');
    const [formValue,
        setFormValue] = useState('');
    const sendMessage = (e) => {
        e.preventDefault();
        titleRef.current.scrollIntoView({behavior: "smooth"});
        if (formValue === '') {
            return;
        }
        const {uid} = auth.currentUser;

        messageRef.add({
            text: formValue,
            createdAt: firebase
                .firestore
                .FieldValue
                .serverTimestamp(),
            uid,
            image: user.photoURL
        });
        setFormValue('');
    }
    const [messages] = useCollectionData(query, {idField: 'id'});
    {
        messages && messages.map((message) => console.log(message.id))
    }
    const titleRef = useRef('');
    
    return (
        <div className='bg-[url("./assets/bg.svg")] bg-cover h-full  text-white '>
            <div className='flex justify-between shadow-lg  w-full opacity-100 sticky top-0 bg-[url("./assets/bg.svg")]'>
                <div className='my-4 mx-2'>
                    <img typeof='image' src={SuperChat} className="h-10"></img>
                </div>
                <div className='flex justify-end px-4 py-4 '>
                    <Header/>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='md:w-2/5 w-4/5 h-screen   scroll-smooth overflow-scroll container-snap'>
                    <div className="">
                        {messages && messages.map(msg => <Chatmessage key={msg.id} message={msg}/>)}
                    </div>
                    <div className=" w-full mb-14 " ref={titleRef}>
                        <form onSubmit={sendMessage}>
                            <input
                                value={formValue}
                                className="w-full py-2 px-5 mt-3 mb-5 bg-[#051e2b] rounded-md focus:outline-none"
                                onChange={(e) => setFormValue(e.target.value)}></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Chatmessage(props) {
    const [nullphoto,SetNullPhoto] = useState('');
    const [user] = useAuthState(auth);
    const {text, uid, image} = props.message;
    if (!image){
        SetNullPhoto('https://cdn-icons-png.flaticon.com/512/2318/2318080.png');
        image = nullphoto;
    }
    console.log(image)
    if (uid === user.uid) {
        return (
            <div className='flex my-5 justify-end items-center '>
                <p className='px-3'>{text}</p>
                <img src={image} className="h-14 rounded-full"></img>
            </div>
        )
    } else {
        return (
            <div className='flex my-5 items-center'>
                <img src={image} className="h-14 rounded-full"></img>
                <p className='px-3'>{text}</p>
            </div>
        )
    }
}
export default App;
