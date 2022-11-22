import React from 'react'
import Link from 'next/link'

export default function PostCard(props) {

    const {children} = props
console.log(children, 'what posts looks like')
  return (
    <div className='p-2 border flex items-stretch border-yellow border-solid'>
       <div className='monserrat-text flex text-black '>
           {children}     
        </div> 
        <div className='flex items-center text-yellow'>
            <i className='fa-solid fa-pencil px-2 cursor-pointer'> </i>
            <i className='fa-solid fa-trash-can px-2 cursor-pointer'></i>  
            <i className="fa-thin fa-moon-over-sun"></i>      
        </div>    
         
    </div>
  )
}
