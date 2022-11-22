import React from 'react'
import Link from 'next/link'

export default function NavBar(props) {
  return (
 props.currentUser !== null && 
  <ul className="flex">
    <Link href="/" className="mr-6">
        <i className="monserrat-text font-bold text-yellow-600 hover:text-blue-800">Profile</i>
    </Link>
     <Link  href="/addpost" className="mr-6">
        <i className="monserrat-text text-yellow-600 hover:text-blue-800">Add Post</i>
     </Link>           
    </ul>
  )
}
