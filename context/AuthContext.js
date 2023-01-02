import React, { useContext, useState, useEffect, useRef } from "react";
import {auth, db} from '../firebase'
import {doc, setDoc, setIndexConfiguration} from 'firebase/firestore'


import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, AuthError } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const userInfo =  useRef()


    function signup(email, password){
        createUserWithEmailAndPassword(auth, email, password) 
        .then((result)=>{
            console.log(result.user.uid, 'im resulting bc the other was a promise')
            setDoc(doc(db, 'users', result.user.uid),
            {email:email, password:password} , {merge:true})
        })
        .catch((error)=> {
            console.log(error, 'oops')
        })    
        
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

   useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async user=> {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value ={
        currentUser, 
        login, 
        signup,
        logout,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}