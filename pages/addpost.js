import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import fetchUserPosts from '../fetchinghooks/fetchPosts'


export default function addpost() {

    const { userInfo, currentUser} = useAuth()
    const [post, setPost] = useState('')
    const {posts, loading, error, setPosts} = fetchUserPosts()
  
  

      
    async function handleAddPost(){
      if(!post){ return }
      
      const newPostKey = Object.keys(posts).length === 0 ? 1 : Math.max(...Object.keys(posts)) + 1
      setPosts({...posts, [newPostKey]: post, comment: '', mirror: 0})
      setPost('')

      const userRef = doc(db, 'users', currentUser.uid)  
      await setDoc(userRef, {
        'posts':  {
          [newPostKey]: newPostKey,
          post: post,
          comment: '', 
          mirror: 0
      } 
      }, {merge:true})

    

  }



  return (
    <div className='flex flex-col w-100'>
        <textarea className=' flex flex-wrap box-content h-32 p-10 border-4 sm:text-lg text-slate-900 ' type='text' placeholder='Add post' value={post} onChange={(e)=> setPost(e.target.value)}  />
        <button onClick={handleAddPost}  className='bg-yellow-300 text-slate-900 py-3 monserrat-text uppercase'> Add</button>
    </div>
  )
}
