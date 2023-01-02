import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import PostCard from './PostCard';

import fetchUserPosts from '../fetchinghooks/fetchPosts'

export default function UserProfile() {
  
  const { userInfo, currentUser} = useAuth()
  const {posts, loading} = fetchUserPosts()


 return (
    <div className='monserrat-text grid grid-cols-3 left-0 top-0 w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col '>
        {(userInfo && loading) && 
          (<div className='flex-1'>
            <i className="fa-solid fa-spinner animate-spin text-6xl "></i>
           </div>)}

        {(userInfo && !loading ) && 
          (   
            <>
              {/* {Object.keys(posts).map((post, i) => {
                return(
                  <PostCard key={i} >
                    {posts[post]}
                  </PostCard>
                )
              })} */}
           </>   
          )}
   </div>
  )
}
