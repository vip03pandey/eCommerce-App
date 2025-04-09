import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io5'
import {RiTwitterXLine} from 'react-icons/ri'
import TypingEffect from '../Common/TypingEffect'
function Topbar() {
  return (
    <div className='bg-[#ea2e0e] text-white'>
        <div className='container mx-auto flex justify-between items-center py-3 px-4'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href="#" className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4'/>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <TypingEffect text='We ship world wide-Fast and Reliable Shipping' delay="150"/>
            </div>
            <div className='text-sm hidden md:block'>
                <a href="tel:+123456789" className='hover:text-gray-300'>+11 (234) 567-89</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar
