import React from 'react'

export default function PostCard(props) {

    const {children, setEdit, edit, edittedPost, setEdittedPost} = props

  return (
    <div className='p-2 border flex items-stretch border-yellow border-solid m-4'>
       <div className='monserrat-text flex-1 text-white '>
           {children}     
        </div> 

        <div className='flex items-center text-yellow'>
            <i onClick={()=>  setEdit(true)} className='fa-solid fa-pencil px-2 cursor-pointer'></i>
            <i className='fa-solid fa-trash-can px-2 cursor-pointer'></i>          
        </div>     
    </div>
  )
}
