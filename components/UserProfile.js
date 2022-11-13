import React, {useState} from 'react'
import {useAuth} from '../context/AuthContext'
import PostCard from './PostCard';
import {doc, setDoc, setIndexConfiguration} from 'firebase/firestore'
import {db} from '../firebase'
import fetchUserPosts from '../fetchinghooks/fetchPosts'

export default function UserProfile() {


  const { userInfo, currentUser} = useAuth()
  const [post, setPost] = useState('')
  const [topic, setPostTopic] = useState('')
  const [edit, setEdit] = useState(false)
  const [mirror, setMirror] = useState(0)
  
  const {posts, loading, error, setPosts} = fetchUserPosts()
  
  //console.log(posts, 'postsssss')

  async function handleAddPost(){
      if(!post){ return }
      
      const newPostKey = Object.keys(posts).length === 0 ? 1 : Math.max(...Object.keys(posts)) + 1
      setPosts({...posts, [newPostKey]: post})
      setPost('')
      setPostTopic('')

      const userRef = doc(db, 'users', currentUser.uid)  
      await setDoc(userRef, {
        'posts': {
          [newPostKey]: post, 
          topic: topic, 
          mirror: mirror
        }
      }, {merge:true})




  }

 return (
    <div className='monserrat-text left-0 top-0 w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col '>
       <textarea className=' flex flex-wrap box-content h-10  border-4 sm:text-lg text-slate-900 ' type='text' placeholder='Topic' value={topic} onChange={(e)=>setPostTopic(e.target.value)}  />
       <textarea className=' flex flex-wrap h-48  border-4  sm:text-lg text-slate-900 ' type='text' placeholder='Add post' value={post} onChange={(e)=> setPost(e.target.value)}  />
          <button onClick={handleAddPost}  className='bg-yellow-300 text-slate-900 py-3 monserrat-text uppercase'> Add</button>
   
          {(userInfo && loading) && (<div className='flex-1'>
            <i className="fa-solid fa-spinner animate-spin text-6xl "></i>
          </div>)}


          {(userInfo && !loading) && (
            <>
              {Object.keys(posts).map((post, i) => {
                return(
                  <PostCard key={i}>
                    {posts[post]}
                  </PostCard>
                )
              })}
            </>
          )}

   </div>
  )
}
