import React from 'react'
import Footer from './Footer';
import Header from './Header'

export default function Layout(props) {
  const {children} = props;
  return (
    <div className='bg-white-300'>
        <Header/>
        <main className=''>
            {children}
        </main>
        <Footer/>
    </div>
  )
}
