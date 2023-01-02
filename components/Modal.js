
import React, {useState, useEffect}from 'react'
import { signout, useAuth } from '../context/AuthContext'
import ReactDom from 'react-dom'

export default function Modal(props) {
    const {setOpenModal} = props
    const [_document, set_document] = useState(null)
    const {logout} = useAuth();
    
    useEffect(() =>{
        set_document(document)
      },[])
    
    
    if(!_document){return null}
    

 

  return ReactDom.createPortal  (
    <div className='fixed inset-0 bg-white text-slate-900 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
         <h1 className='monserrat-text'>Menu</h1>   
         <i onClick={()=> setOpenModal(false)} className='fa-solid fa-xmark'></i>      
        </div>

        <div className='p-4 flex flex-col gap-3 '>
            <h2 onClick={()=> {
                logout()
                setOpenModal(false)
            }}>Logout</h2>
        </div>
    </div>, 
    _document.getElementById('portal')
  )
}
