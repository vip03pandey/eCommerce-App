import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineUser,HiOutlineShoppingBag} from 'react-icons/hi'
import { TfiAlignRight } from "react-icons/tfi";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoCloseCircle } from "react-icons/io5";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const toggleCardDrawer=()=>{
      setDrawerOpen(!drawerOpen);
  }
  const toggleNavDrawer=()=>{
    setNavDrawerOpen(!navDrawerOpen);
  }
  return (
   <>
   <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
    <div>
        <Link to="/" className='text-2xl font-medium'>Rabbit</Link>
    </div>
    <div className='hidden md:flex space-x-6'>
        <Link to="/collections/all" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Men</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Women</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Top Wear</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Bottom Wear</Link>

    </div>
    <div className='flex items-center space-x-4'>
        <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
        <Link to="/profile" className='hover:text-black'><HiOutlineUser className='h-6 w-6 text-gray-700'></HiOutlineUser></Link>
        <button onClick={toggleCardDrawer} className="relative hover:text-black cursor-pointer">
    <HiOutlineShoppingBag className="h-6 w-6" />
    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#ea200e] text-white text-xs px-2 py-1 rounded-full">
      4
    </span>
  </button>
  <div className='overflow-hidden '>

    <SearchBar/>
  </div>
  <button onClick={toggleNavDrawer} className='md:hidden cursor-pointer'><TfiAlignRight className='h-6 w-6'/></button>
    </div>
   </nav>
   <CartDrawer drawerOpen={drawerOpen} toggleCardDrawer={toggleCardDrawer}/>
   <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${navDrawerOpen?"translate-x-0":"-translate-x-full"}`}>
   <div className='flex  justify-end p-4 '>
    <button onClick={toggleNavDrawer} className='text-gray-600 hover:text-gray-800 cursor-pointer'>
        <IoCloseCircle className='h-6 w-6 text-gray-600'/>
    </button>
   </div>
   <div className='p-4'>
    <h2 className='text-xl font-semibold mb-4 '>Menu</h2>
    <nav className='space-y-4'>
      <Link to='#' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-lack'>Men</Link>
      <Link to='#' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-lack'>Women</Link>
      <Link to='#' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-lack'>Top Wear</Link>
      <Link to='#' onClick={toggleNavDrawer} className='block text-gray-600 hover:text-lack'>Bottom Wear</Link>
    </nav>
   </div>
   </div>
   </>
  )
}

export default NavBar
