import { errorPrefix } from '@firebase/util';
import React, {useState} from 'react'
import {useAuth} from '../context/AuthContext'

export default function Login() {

  const [emailAddress, setEmailAddress] = useState("")
  const[password, setPassword] = useState("")
  const[error, setErrorState] = useState(null);
  const [isUserLogginIn, setUserLoggingIn] = useState(true);

  const {login, signup, currentUser} = useAuth();


 async function onLoginInfoSubmit(){
    if(!emailAddress && !password){
      setErrorState("please enter a email and password")
      return
    }

    if(isUserLogginIn){
      try {
        await login(emailAddress, password)
      } catch(error) {
        setErrorState('incorrect email or password')
      }
      return
    }
    else {
      try{
          await signup(emailAddress, password)
        } 
      catch(error){
        if (error.code == "auth/email-already-in-use") {
          setErrorState("The email address is already in use");
          } else if (error.code == "auth/invalid-email") {
            setErrorState("The email address is not valid.");
          } else if (error.code == "auth/operation-not-allowed") {
            setErrorState("Operation not allowed.");
          } else if (error.code == "auth/weak-password") {
            setErrorState("The password is too weak.");
          }
          else {
            setErrorState(error.code.toString())
          }
      }
    return
    }

  }
  return (
    <div className='flex-1 bg-green text-xs sm:text-sm flex flex-col justify-center items-center gap-5 sm:gap-4 cursor-pointer'>
      <h1 className='font-bold text-xl sm:text-sm-4xl p-4'>{isUserLogginIn? 'Login' : 'Register'} </h1>
       {error && <div className='w-full max-w-[40ch] border-red-400 border text-center border-solid text-red-400 py-2'>{error}</div>}
        <input type='text' value={emailAddress} onChange={(e)=> setEmailAddress(e.target.value)} placeholder='Email' className='text-slate-900 p-2 w-full max-w-[30ch] monserrat-text'/>
        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='Password' className='text-font text-slate-900 p-2 w-full max-w-[30ch] monserrat-text'/>
          <button  onClick={onLoginInfoSubmit} className='w-full max-w-[15ch] border border-green border-solid uppercase p-2 monserrat-text text-slate-300 '>SUBMIT</button>
          
          <h2 onClick={()=>setUserLoggingIn(!isUserLogginIn)}>  {!isUserLogginIn ? 'Login' : 'Register'}</h2>
      </div>
  )
}
 