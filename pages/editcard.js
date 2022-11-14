import React from 'react'

export default function editcard(props) {

    const {children} = props

  return (
    <div className='p-2 border flex items-stretch border-yellow border-solid m-4'>
       <div className='monserrat-text flex text-white '>
           {children}     
        </div> 
     
         
    </div>
  )
}
