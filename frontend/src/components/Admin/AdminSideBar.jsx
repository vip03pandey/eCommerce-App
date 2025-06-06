import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '/Users/vipulpandey/Ecommerce/frontend/redux/slices/authSlice.js'
import { clearCart } from '../../../redux/slices/cartSlice'
const AdminSideBar = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleLogout=()=>{
        dispatch(logout())
        dispatch(clearCart())
        navigate('/');
    }
  return (
    <div className='p-6'>
        <div className='mb-6'>
            <Link to='/admin' className='text-2xl font-medium'>Rabbit</Link>
        </div>
        <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-2'>
            <NavLink to='/admin/users' className={({isActive})=>isActive?'text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 ':' hover:bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2'}><FaUser></FaUser> <span>Users</span></NavLink>
            <NavLink to='/admin/products' className={({isActive})=>isActive?'text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 ':' hover:bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2'}><FaBoxOpen></FaBoxOpen> <span>Products</span></NavLink>
            <NavLink to='/admin/orders' className={({isActive})=>isActive?'text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 ':' hover:bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2'}><FaClipboardList></FaClipboardList> <span>Orders</span></NavLink>
            <NavLink to='/admin/shop' className={({isActive})=>isActive?'text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 ':' hover:bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2'}><FaStore></FaStore> <span>Shop</span></NavLink>

        </nav>
        <div className='mt-6 '>
            <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center space-x-2 cursor-pointer'><FaSignOutAlt></FaSignOutAlt> <span>Logout</span></button>
        </div>
    </div>
  )
}

export default AdminSideBar
