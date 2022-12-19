import React, {useState, useEffect, useRef} from 'react'
import {doc, getDoc} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import {db} from '../firebase'

export default function fetchPosts() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [posts, setPosts] = useState({})
    const {currentUser} = useAuth()


    useEffect(()=> { 
        async function fetchData(){
        try{
            const docReference = doc(db, 'posts', currentUser.uid)
            const documentSnap = await getDoc(docReference)
            if(documentSnap.exists()){
                setPosts(documentSnap.data().posts)
            }
    
        } catch(error){
            setError('Failed to load posts')
        } finally {
            setLoading(false)
        }
    }
    fetchData()
    }, [])

  return {loading, error, posts, setPosts}
}
