import React, { useEffect, useMemo } from 'react';
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
import { IoSend } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { collection, getDocs } from 'firebase/firestore';


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



const Chatroom = () => {
    const aboutRef = useRef('');
    function Header() {
        const [user] = useAuthState(auth);
        let img = user.photoURL;
        if (!img){
            img = "https://cdn-icons-png.flaticon.com/512/2318/2318080.png";
        }   
        const PopAbout =() =>{
        aboutRef.current.className = "absolute w-1/4  h-screen translate-x-0 transition-all ease-in duration-200 bg-[#0b3b55]";
        }
        
        return (
            <div className='flex px-5 '>
                <button onClick={PopAbout}> <img src={img} className="h-10 rounded-full w-10 " ></img> </button>
            </div>
        )
    }

    const [user] = useAuthState(auth);
    const messageRef = firestore.collection("message");
    const query = messageRef.orderBy('createdAt');
    const [formValue,
        setFormValue] = useState('');
    
    const sendMessage = (e) => {
        e.preventDefault();
        // titleRef.current.scrollIntoView({behavior: "smooth"});
        const chnge = formValue.trim();
        if (chnge === '') {
            return;
        }
        const {uid} = auth.currentUser;

        messageRef.add({
            text: formValue,
            Name: user.displayName,
            createdAt: firebase
                .firestore
                .FieldValue
                .serverTimestamp(),
            uid,
            image: user.photoURL,
        });
        setFormValue('');
    }
    const [messages] = useCollectionData(query, {idField: 'id'});
    {
        messages && messages.map((message) => console.log(message.id))
    }
    const titleRef = useRef('');
    const scroll = () => {
       return titleRef.current.scrollIntoView({behavior: "instant"});
    }
    useEffect(()=>{
        scroll();
    },[]);
    useEffect(()=>{
        scroll();
    },[messages])
    const [lobbyUsers, setLobbyUsers] = useState([
        {
            id: 1,
            name: 'Dev',
            desc: "I'll be vibing shawty ;)",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.BszTAqL4i-Ls1M8wD5xLsgHaFr%26pid%3DApi&f=1&ipt=51f414dc76e316605af80b97d3bda4a2dd0f515763f3d57a082c5bf95967abce&ipo=images'
        },
        {
            id: 2,
            name: 'Udhbhav',
            desc: "What the hell!!",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.JtiDIBvREYtipRWpCW27HgHaGx%26pid%3DApi&f=1&ipt=271400cf7e802705784b4cd57e9e0bdded4f12206cdc502745951505202f5be4&ipo=images'
        },
        {
            id: 3,
            name: 'Aman',
            desc: "I'm capybara 0.0",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NkLkUzTV5UVX4OhdUcJymQHaEx%26pid%3DApi&f=1&ipt=e8395a11d58d3608ab398a2619eb3a41a29fbffde369011efb36dd2b7cc19cbc&ipo=images'
        },
        {
            id: 4,
            name: 'Mohit',
            desc: "This shit is amazing!",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.09cSFarXVQEhfUdTM9dnAgHaHa%26pid%3DApi&f=1&ipt=bf8d3e1f3efcb8b7c9019ba6121d63cc7e8ddea92b5c1911f13362936e9ef176&ipo=images'
        },
        {
            id: 5,
            name: 'Ayush',
            desc: "Pols a gai pols 0.0",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lmC0Jltzshk-inrid0QsVQAAAA%26pid%3DApi&f=1&ipt=c7b81c4b8a37853963ff818f46510db58b398453fe6fe756c750b403894849e9&ipo=images'
        },
        {
            id: 6,
            name: 'Abhay',
            desc: "Kitty kat Pitty pat!",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.LbuIhd9pXdOye-I5MOAiawAAAA%26pid%3DApi&f=1&ipt=1ccf1fa0dd41d2ba828ed0014e06b587848afda34423e7bba5a7bfa60b2b7baa&ipo=images'
        },
        {
            id: 7,
            name: 'Kamlesh',
            desc: "Soluchan gang boi!",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.gEHyJOz-Suihh_Z6Pf5fxQHaHZ%26pid%3DApi&f=1&ipt=3e0dbbdffdd9133468e5923fa0b563c31063db88ccf6d11ba7f0c2923420843f&ipo=images'
        },
        {
            id: 8,
            name: 'Virat',
            desc: "Me on melody ^^",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xR2-wDKIMYvBbslMEbOF_QHaHa%26pid%3DApi&f=1&ipt=98dc9a58e5403d396b6dbf5ef5a5cc9ea9a37c77ec30afab8c6d27512e8874c9&ipo=images'
        },
        {
            id: 9,
            name: 'Lakshay',
            desc: "Dimpression :(",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xbwOtewhbbXCNe6ob4hrvwHaFo%26pid%3DApi&f=1&ipt=660de4f9a6b573b79814604bb8d719eeba64bff81ff61c5aa28de5aed5df3c1a&ipo=images'
        },
        {
            id: 10,
            name: 'Sumit Verma',
            desc: "Jee Jee Jee",
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.LHCdtcYNgra1-3Khu8vx8gHaHy%26pid%3DApi&f=1&ipt=bcc131e142cad9d35b6be53bb59657e744f43a7fccebe1205d32e3edfc429931&ipo=images'
        },
        
    ])
    const Back =() =>{
        aboutRef.current.className = "absolute w-1/4  h-screen -translate-x-full transition-all ease-in duration-200 bg-[#0b3b55]";
    }
    let img = user.photoURL;
    if (!img){
        img = "https://cdn-icons-png.flaticon.com/512/2318/2318080.png";
    } 
    const [searchQuery, setSearchQuery] = useState('')
    const filteredUser = useMemo(() => {
        return lobbyUsers.filter(user => {
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [lobbyUsers, searchQuery])

    // Debugging search query
    useEffect(() => {
        console.log(searchQuery)
    }, [searchQuery])
    const inputRef = useRef(null);
    const edit = () => {
        inputRef.current.focus();
    }
    let x = user.displayName;
    console.log(user);
    console.log(x);
    const labelRef= useRef(null);
    const [usrname, setUsrname] = useState({ displayName: user.displayName });
    const ChangeName = (e) => {
        e.preventDefault();
        console.log(usrname);
        auth.currentUser.updateProfile({
        displayName: usrname
        });

        const db = firebase.firestore();
        const messagesRef = db.collection("message");

        // Find all messages for the current user
        messagesRef.where("uid", "==", auth.currentUser.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageRef = doc.ref;
            
            // Update the message's "Name" field to the current user's display name
            messageData.Name = usrname;
            messageRef.update(messageData);
        });
        });
    }
    const NameChng = (e) =>{
        if(e.target.value == ''){
            labelRef.current.className = 'z-10 absolute font-mono transform ease-in-out  translate-y-2 duration-200 translate-x-3 duration-200 text-slate-100 text-md ';
        }
        else{
            labelRef.current.className = 'z-10 bg-[#0b3b55]  font-mono  font-bold  text-md  text-slate-300 transform ease-in-out  absolute px-1  -translate-y-3 duration-200 translate-x-3 duration-200 w-auto text-sm';
        }
        setUsrname(e.target.value);
    }
    return (
        <div className='bg-[url("./assets/bg.svg")] bg-cover h-full  text-white '>
            <div className='w-1/4 absolute h-screen flex flex-col items-center  bg-[#0b3b55]'>
                <div className='flex justify-between shadow-xl  w-full opacity-100 sticky top-0 bg-[#092b3d] '>
                    <div className='my-4 mx-2'>
                        <img typeof='image' src={SuperChat} className="h-10"></img>
                    </div>
                    <div className='flex justify-end px-4 py-4 '>
                        <Header/>
                    </div>
                </div>
        
                <div className='search-bar w-full p-2 relative'>
                    <input
                        className='py-1 px-3 w-full h-12 rounded-xl  outline-none bg-cyan-800'
                        type='search'
                        placeholder='Search Username' 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className='lobby-users w-full flex flex-col scroll-smooth overflow-scroll container-snap'>
                        {filteredUser.map(lobbyUser => (
                            <div className='lobby-user py-4 px-3 rounded-lg flex gap-2 justify-start items-center cursor-pointer hover:bg-cyan-800' key={lobbyUser.id}>
                                <img src={lobbyUser.image} className='w-12 h-12 rounded-full' />
                                <div className='user-lobby-info flex flex-col gap-1/2'>
                                    <p className='user-lobby-name font-semibold'>{lobbyUser.name}</p>
                                    <p className='use-lobby-desc font-light text-sm'>{lobbyUser.desc}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className='absolute w-1/4 h-screen bg-[#0b3b55]' ref={aboutRef}>
                <div className='flex gap-5 items-center py-5 bg-[#092b3d] px-3'>
                   <button onClick={Back} className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                    </button>
                    Profile
                </div>
                <div className='flex flex-col w-full py-10 ' >
                    <div className='flex justify-center items-center'>
                        <div className=' absolute hover:bg-[#424749] hover:bg-opacity-60 hover:text-white hover:text hover:text-opacity-100 opacity-0 hover:opacity-100 flex justify-center items-center rounded-full    h-24 w-24'>
                            <img src='https://cdn-icons-png.flaticon.com/512/685/685655.png' className='h-7'></img>
                        </div>
                        <img src={img} className='rounded-full h-24  '></img>
                    </div>
                    <div className='flex pt-7 w-full'>
                        <form onSubmit={ChangeName} className='flex justify-center items-center w-full'>
                            <div className='relative z-0  px-2 w-full group'>
                            <label ref={labelRef} for="first_name" class="z-10 bg-[#0b3b55]  font-mono  font-bold  text-md  text-slate-300 transform ease-in-out  absolute px-1  -translate-y-3 duration-200 translate-x-3 duration-200 w-auto text-sm"> Name </label>
                                <input value={usrname.displayName}  className='rounded-lg border-slate-800 border-2 bg-transparent relative w-11/12 p-2  object   focus:outline-none' ref={inputRef} onChange={NameChng}></input>
                            </div>
                        </form>
                    </div>
                    <div className='text-slate-400 '>
                   
                        {user.email}
                    </div>
                    <div className='my-7 p-2 bg-slate-500 rounded-lg hover:bg-slate-600'>
                        <button onClick={() => {auth.signOut()}}>SignOut</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-end px-20'>
                <div className='md:w-3/4 w-4/5 h-screen  scroll-smooth overflow-scroll container-snap'>
                    <div className="">
                        {messages && messages.map(msg => <Chatmessage key={msg.id} message={msg}/>)}
                    </div>
                    <div ref={titleRef} className='h-14 '></div>
                    <div></div>
                </div>
                <div className='w-4/5 '>
                    <div  className='fixed h-16 flex justify-center items-center bg-[#092b3d]  bottom-0 w-3/4  right-0 '>
                        <form onSubmit={sendMessage} className='w-full flex justify-center items-center   '>
                            <input
                                value={formValue}
                                className="  w-2/3 py-2 px-5  bg-[#0b3b55] rounded-md focus:outline-none"
                                onChange={(e) => setFormValue(e.target.value)}>
                            </input>
                            <IoSend className='send-image relative right-10 bottom-1 cursor-pointer m-1 active:text-xl active:right-11' onClick={sendMessage} />
                        </form>
                    </div>
                </div>
                </div>
            </div>
        
    )
}

function Chatmessage(props) {
    const [user] = useAuthState(auth);
    const {Name,text, uid, image} = props.message;
    const arrowStyle = { display: 'none' };
    
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    
    const handleOpen = () => {
        setIsOpen(true);
    };
    
    const handleClose = () => {
        setIsOpen(false);
    };
    const css = useRef('');
    const handleAfterOpen = () => {
        // Get the position of the trigger element
        const triggerRect = triggerRef.current.getBoundingClientRect();
    
        // Get the height of the popup
        console.log(triggerRect);
        // Calculate the position and offset based on the trigger element's position
        if(triggerRect.bottom > 400){
            css.current.className ="-translate-x-1/3 translate-y-1/3 rounded-xl h-96 w-80 bg-slate-800 text-white flex  flex-col";
        }
        else if(triggerRect.bottom < 200){
            css.current.className ="-translate-x-1/3 -translate-y-1/3 rounded-xl h-96 w-80 bg-slate-800 text-white flex  flex-col";
        }
    
    };
    

    const popupRef = useRef(null);

    if( !image && uid === user.uid ){
        return(
            <div className='flex my-5 justify-end items-center '>
                <div className='bg-[#1982FC] mx-4 rounded-2xl py-2 '>
                <p className='px-3'>{text}</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/2318/2318080.png" className="h-10 rounded-full"></img>
            </div>
        )
    }
    else if (!image && uid !== user.uid){
        return(
            <div className='flex my-5 items-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/2318/2318080.png" className="h-10 rounded-full"></img>
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
                <img src={image} className="h-10 rounded-full"></img>
            </div>
        )
    } else {
        return (
            <div className='flex my-5 items-center'>
              <div>
                <button onClick={handleOpen} ref={triggerRef}>
                  <img src={image} className="h-10 relative rounded-full"></img>
                </button>
              </div>
              <Popup
                open={isOpen}
                onClose={handleClose}
                onOpen={handleAfterOpen}
                ref={popupRef}
              >
                <div className='-translate-x-1/3 rounded-xl h-96 w-80 bg-slate-800 text-white flex  flex-col ' ref={css}> 
                  <div className='bg-cyan-700 rounded-t-lg h-1/4 w-full'></div>
                  <div className='flex gap-20 items-center'>
                    <div className='-mt-12 px-3'><img src={image} className='rounded-full'></img></div>
                    <div className='bg-green-700 p-2 mt-2 rounded-lg hover:bg-green-900'>
                        <button>Add Friend</button>
                        
                    </div>
                  </div>
                  <div className='h-4/5 bg-slate-900 my-2 p-2 m-2 rounded-lg '>
                    <div className='pb-3 text-lg font-bold'>{Name}</div>
                    <hr></hr>
                    <div className='pt-3 font-bold'>About Me</div>
                    <div className='pt-1' >I'll be vibing shawty ;)</div>
                  </div>
                </div>
              </Popup>
              <div className='bg-gray-800 mx-4 rounded-2xl py-2'>
                <p className='px-3'>{text}</p>
              </div>
            </div>
          );
        }
    
}
export default App;
