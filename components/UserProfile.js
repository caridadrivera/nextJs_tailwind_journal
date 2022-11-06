import React, {useState} from 'react'
import {useAuth} from '../context/AuthContext'
import PostCard from './PostCard';
import {doc, setDoc, setIndexConfiguration} from 'firebase/firestore'
import {db} from '../firebase'
import fetchUserPosts from '../fetchinghooks/fetchPosts'

export default function UserProfile() {


  const { userInfo, currentUser} = useAuth()
  const [addPost, setAddPost] = useState(false);
  const [post, setPost] = useState('')
  const [edit, setEdit] = useState(false)
  
  const {posts, loading, error, setPosts} = fetchUserPosts()
  
  //console.log(posts, 'postsssss')

  async function handleAddPost(){
      if(!post){ return }
      
      const newPostKey = Object.keys(posts).length === 0 ? 1 : Math.max(...Object.keys(posts)) + 1
      setPosts({...posts, [newPostKey]: post})
      setPost('')
      const userRef = doc(db, 'users', currentUser.uid)  
      await setDoc(userRef, {
        'posts': {
          [newPostKey]: post
        }
      }, {merge:true})

  }

 return (
    <div className='monserrat-text left-0 top-0 w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col '>
       <input className=' flex flex-wrap box-content h-32 p-10 border-4 sm:text-lg text-slate-900 ' type='text' placeholder='Add post' value={post} onChange={(e)=> setPost(e.target.value)}  />
          <button onClick={handleAddPost}  className='bg-yellow-300 text-slate-900 py-3 monserrat-text uppercase'> Add</button>
   
          {(userInfo && loading) && (<div className='flex-1'>
            <i className="fa-solid fa-spinner animate-spin text-6xl "></i>
          </div>)}


          {(userInfo && !loading) && (
            <>
              {Object.keys(posts).map((post, i) => {
                return(
                  <PostCard key={i} setEdit={setEdit} edit={edit} index={i}>
                    {posts[post]}
                  </PostCard>
                )
              })}
            </>
          )}

   </div>
  )
}
