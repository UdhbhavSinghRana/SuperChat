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
import Google from './assets/Google.svg';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

document.body.className = "scroll-smooth overflow-clip ";

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
        if(!name) return alert("Please enter name");
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
    const Sign = (e) =>{
        if(!name) return alert("Please enter name")

        e.preventDefault();
        
        auth.
        signInWithEmailAndPassword(email,password)
        .catch(error => alert(error));
    }
    const WelDiv = useRef('');
    const accDiv = useRef('');
    const textS = useRef('');
    const textM = useRef('');
    const Uname = useRef('');
    const [Heading,SetHeading] = useState("Create Account");
    const [tf,setTf] = useState(true);
    const [first,setFirst] = useState({
        greet:"Welcome Back",
        subHeading:"Join the conversation and explore new horizons with our chat community.",
        method:"SignIn"
    });
    const textL = useRef('');
    const Change = () =>{
        if (tf){
            accDiv.current.className = "md:w-1/2  z-10  -translate-y-full md:-translate-x-full md:translate-y-0 transition-all ease-in-out duration-700 ";
            WelDiv.current.className = "md:w-1/2 h-1/2  md:h-full bg-cover bg-[url('./assets/SignIn.svg')] font-black z-20 translate-y-full md:translate-x-full   md:translate-y-0 transition-all ease-in-out duration-700";
            setTimeout(() => {
                SetHeading("SignIn")
                Uname.current.className += " hidden"
            },200);
            textL.current.className = "text-5xl transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            textS.current.className = "h-1/5 py-2 flex px-10 text-md transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            textM.current.className = "text-xl hover:text-blue-300 transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            setTimeout(() => 
            {
            textL.current.className = "text-5xl transition-all blur-none duration-500   ";
            textS.current.className = " h-1/5 py-2 flex px-10 text-md  transition-all blur-none duration-500    ";
            textM.current.className = "text-xl hover:text-blue-300 transition-all blur-none duration-500     ";
            setFirst({
                greet:"Hello, Friend",
                subHeading:"Enter your personal detailes and get started!",
                method:"Create Account"
            })
        },250)
            setTf(false);
        }
        else {
            accDiv.current.className = "md:w-1/2  z-10 translate-y-1/6 md:translate-x-1/6 md:translate-y-0 transition-all ease-in-out duration-700 ";
            WelDiv.current.className = "md:w-1/2 h-1/2  md:h-full bg-cover bg-[url('./assets/SignIn.svg')] font-black z-20 translate-y-1/6 md:-translate-x-1/6   md:translate-y-0 transition-all ease-in-out duration-700";
            setTimeout(() => {
                SetHeading("Create Account")
                Uname.current.className = "bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none"
            },200);
            textL.current.className = "text-5xl transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            textS.current.className = "h-1/5 py-2 flex px-10 text-md transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            textM.current.className = "text-xl hover:text-blue-300 transition-all blur-sm duration-200 blur-md duration-300 blur-lg duration-500 blur-3xl duration-700 ";
            setTimeout(() => 
            {
                textL.current.className = "text-5xl transition-all blur-none duration-500";
                textS.current.className = " h-1/5 py-2 flex px-10 text-md  transition-all blur-none duration-500";
                textM.current.className = "text-xl hover:text-blue-300 transition-all blur-none duration-500 ";
                setFirst({
                    greet:"Welcome Back",
                    subHeading:"Join the conversation and explore new horizons with our chat community.",
                    method:"SignIn"
                })
        },250)   
            setTf(true);
        }
    } 
        
    return (
        <>
        <div className='h-screen flex   justify-center items-center '>
            <div className='md:h-4/5 h-full md:w-2/3  w-full  md:flex    shadow-2xl'>
                <div ref={WelDiv} className='z-20 md:w-1/2 h-1/2  md:h-full bg-cover bg-[url("./assets/SignIn.svg")] font-black   ' >
                    <div className='flex flex-col justify-center items-center md:h-full h-full  text-white text-center  '>
                        <div className='text-5xl ' ref={textL}>
                            {first.greet}
                        </div>
                        <div className='h-1/5 py-2 flex px-10 text-md ' ref={textS}>
                            {first.subHeading}
                        </div>
                        <div className='text-xl hover:text-blue-300' ref={textM}>
                            <button onClick={Change}>
                                {first.method}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2  z-10' ref={accDiv}>
                    <div className='flex flex-col md:py-20 items-center h-full '>
                        <div className=' text-5xl font-black' >
                            {Heading}
                        </div>
                        <div className='py-7 flex flex-col items-center w-full'>
                            <button onClick={Login}>
                                <img src={Google} className="h-10 w-10"></img>
                            </button>
                            <div className='w-full'>
                                <form className='py-14 w-full flex flex-col justify-center items-center gap-5 h-full ' >
                                    <input className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Username' onChange={(e) => SetName(e.target.value)} ref={Uname}></input>
                                    <input type={"email"} className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Email' onChange={(e) => SetEmail(e.target.value)}></input>
                                    <input type={"Password"} className='bg-slate-200 w-3/5 rounded-xl px-3 py-2 focus:outline-none' placeholder='Password' onChange={(e) => SetPassword(e.target.value)}></input>
                                    {tf ? <button className='font-black' onClick={SignWithEmail}>SignUp</button > : <button className='font-black'>SignIn</button>}
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
    let img = user.photoURL;
    if (!img){
        img = "https://cdn-icons-png.flaticon.com/512/2318/2318080.png";
    }   
    return (
        <div className='flex px-5 '>
            <Popup trigger={<button> <img src={img} className="h-10 rounded-full"></img> </button>}>
                <div
                    className='flex flex-col justify-between  bg-slate-100 rounded-lg w-96 absolute right-1 p-4 subpixel-antialiased'>
                    <div
                        id="top-section"
                        className='h-2/3 flex flex-col justify-around p-2 border-b-2 border-slate-200/80 mb-4'>
                        <div id="user" className="flex">
                            <img className="rounded-full h-16 w-16 mr-4" src={img}/>
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
        const chnge = formValue.trim();
        if (chnge === '') {
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
            <div className='flex flex-col items-end px-20'>
                <div className='md:w-3/4 w-4/5 h-screen   scroll-smooth overflow-scroll container-snap'>
                    <div className="">
                        {messages && messages.map(msg => <Chatmessage key={msg.id} message={msg}/>)}
                    </div>
                    <div className=" w-full mb-14  " ref={titleRef}>
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
    const [user] = useAuthState(auth);
    const {text, uid, image} = props.message;
    if( !image && uid === user.uid ){
        return(
            <div className='flex my-5 justify-end items-center '>
                <div className='bg-[#1982FC] mx-4 rounded-2xl py-2 '>
                <p className='px-3'>{text}</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/2318/2318080.png" className="h-14 rounded-full"></img>
            </div>
        )
    }
    else if (!image && uid !== user.uid){
        return(
            <div className='flex my-5 items-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/2318/2318080.png" className="h-14 rounded-full"></img>
                <div className='bg-gray-800 mx-4 rounded-2xl py-2 '>
                <p className='px-3'>{text}</p>
                </div>
            </div>
        )
    }
    else if (uid === user.uid) {
        return (
            <div className='flex my-5 justify-end items-center '>
                <div  className='bg-[#1982FC] mx-4 rounded-2xl py-2 '>
                <p className='px-3'>{text}</p>
                </div>
                <img src={image} className="h-14 rounded-full"></img>
            </div>
        )
    } else {
        return (
            <div className='flex my-5 items-center'>
                <img src={image} className="h-14 rounded-full"></img>
                <div className='bg-gray-800 mx-4 rounded-2xl py-2'> 
                <p className='px-3'>{text}</p>
                </div>
            </div>
        )
    }
}
export default App;
