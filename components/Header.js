import React, {useState} from 'react'
import Modal from './Modal'
import {useAuth} from '../context/AuthContext'


export default function Header() {
  const [openModal, setOpenModal] = useState(false);  
  const {currentUser} = useAuth();

  console.log(currentUser, 'is there a current user')

  //if the state changes to true, return modal and update the state to true

  return (
    <>

    {openModal && <Modal setOpenModal={setOpenModal}/>}

       <div className='sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-yellow-400'>
          <h1 className='text-3xl sm:text-6xl'> Journal Entries </h1>

          {currentUser !== null &&  
          <i onClick={() => setOpenModal(true)} className='fa-solid fa-user text-xl sm:text-3xl'></i>}
       </div>
    </>
 
  )
}
