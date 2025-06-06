import React from 'react'
import Topbar from '../Layout/Topbar'
import NavBar from './Navbar'

function Header() {
  return (
    <header className='border-b border-gray-200'>
      <Topbar/>
      <NavBar/>
    </header>
  )
}

export default Header
