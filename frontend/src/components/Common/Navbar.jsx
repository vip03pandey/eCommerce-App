import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineUser,HiOutlineShoppingBag} from 'react-icons/hi'
import { TfiAlignRight } from "react-icons/tfi";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleCardDrawer=()=>{
      setDrawerOpen(!drawerOpen);
  }
  return (
   <>
   <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
    <div>
        <Link to="/" className='text-2xl font-medium'>Rabbit</Link>
    </div>
    <div className='hidden md:flex space-x-6'>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Men</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Women</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Top Wear</Link>
        <Link to="#" className='tetx-gray-700 hover:text-black text-sm font-medium uppercase'>Bottom Wear</Link>

    </div>
    <div className='flex items-center space-x-4'>
        <Link to="/profile" className='hover:text-black'><HiOutlineUser className='h-6 w-6 text-gray-700'></HiOutlineUser></Link>
        <button onClick={toggleCardDrawer} className="relative hover:text-black">
    <HiOutlineShoppingBag className="h-6 w-6" />
    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#ea200e] text-white text-xs px-2 py-1 rounded-full">
      4
    </span>
  </button>
  <div className='overflow-hidden'>

    <SearchBar/>
  </div>
  <button className='md:hidden'><TfiAlignRight className='h-6 w-6'/></button>
    </div>
   </nav>
   <CartDrawer drawerOpen={drawerOpen} toggleCardDrawer={toggleCardDrawer}/>
   </>
  )
}

export default NavBar
