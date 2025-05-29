import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import { clearCart } from '../../redux/slices/cartSlice'

const Profile = () => {
  const {user}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const dispath=useDispatch()
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user,navigate])
  const hanldeLogout=()=>{
    dispath(logout())
    dispath(clearCart())
    navigate("/login")
  }
  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex-grow container mx-auto p-4 md:p-6'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                <h1 className='text-2xl font-bold mb-4'>{user?.name}</h1>
                <p className='text-lg text-gray-600 mb-4 break-words'>{user?.email}</p>
                <button onClick={hanldeLogout} className='w-full bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600 '>Logout</button>
                </div>
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyOrdersPage/>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
