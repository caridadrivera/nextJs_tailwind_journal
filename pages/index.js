import Head from 'next/head'
import Login from '../components/Login'
import  UserProfile  from '../components/UserProfile'
import {useAuth} from '../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  
  const { currentUser } = useAuth()
  //console.log(currentUser, 'whos my user')

  return (
    <>  
      {!currentUser && <Login/>}
      {currentUser && <UserProfile/>}   
      
    </>
  )
}
