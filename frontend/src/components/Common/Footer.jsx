import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io5'
import {RiTwitterXLine} from 'react-icons/ri'
import {FiPhoneCall} from 'react-icons/fi'
function Footer() {
  return (
   <footer className='border-t py-12'>
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div className=''>
            <h3 className='text-lg text-gray-800 mb-4 '>NewsLetter</h3>
            <p className='text-gray-500 mb-4'>Be the first to know about our latest updates</p>
            <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off on your first purchase</p>
            <form className='flex '>
                <input type="email" placeholder='Enter your email' className=' p-3 w-full tetx-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required/>
                <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-8-- transition-all'> Subscribe</button>
            </form>
        </div>

        <div>
            <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
            <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="/collections/all?gender=Men&category=Top Wear" className='hover:text-gray-500 transition-colors'>Men's Top Wear</Link>
                </li>
                <li>
                    <Link to="/collections/all?gender=Women&category=Top Wear" className='hover:text-gray-500 transition-colors'>Women's Top Wear</Link>
                </li>
                <li>
                    <Link to="/collections/all?gender=Women&category=Bottom Wear" className='hover:text-gray-500 transition-colors'>Men's Botton Wear</Link>
                </li>
                <li>
                    <Link to="/collections/all?gender=Women&category=Bottom Wear" className='hover:text-gray-500 transition-colors'>Women's Botton Wear</Link>
                </li>
            </ul>
        </div>

        <div>
            <h3 className='text-lg text-gray-800 mb-4 '>Support</h3>
            <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors'>Contact Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors'>About Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors'>FAQ</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors'>Features</Link>
                </li>
            </ul>
        </div>

       <div>
        <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
        <div className='flex items-center space-x-4 mb-6'>
            <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black transition-colors'>
                <TbBrandMeta className='h-5 w-5'/>
            </a>
            <a href="https://instagram.com" target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black transition-colors'>
                <IoLogoInstagram className='h-5 w-5'/>
            </a>
            <a href="https://twitter.com" target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black transition-colors'>
                <RiTwitterXLine className='h-4 w-4'/>
            </a>
            
        </div>
        <p className='text-gray-500 '>Call Us</p>
        <p><FiPhoneCall className='h-4 w-4 inline-block mr-2'/>
        +11 (234) 567-89</p>
       </div>

    </div>
    <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tight text-center'>© 2022 StyleNest. All rights reserved</p>
    </div>
   </footer>
  )
}

export default Footer
