import React from 'react'
import loginImage from '../../assets/login.webp'
import { useState } from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const PaypaLId = () => {
    const [email,setEmail]=useState("")
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
    
        const data = await response.json();
        if (response.ok) {
          toast.success('📨 Email sent successfully!');
          navigate('/checkout')
        } else {
          toast.error(`❌ Error: ${data.message}`);
        }
      } catch (err) {
        console.error('Error sending email:', err);
        toast.error('⚠️ Something went wrong. Check the console.');
      }
    };
    
    return (
    <div className='flex'>
    <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
    <form onSubmit={handleSubmit} action="" className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
        <h2 className='text-2xl font-bold text-center mb-6'>Hey there!</h2>
        <p className='text-center mb-6'>Enter Your Email to get Paypal Id and Password</p>
        <div className='mb-4 '>
            <label htmlFor="" className='block text-sm font-semibold mb-2'>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder="Enter your email"/>
        </div>
        <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>Submit</button>
    </form>
    </div>
    <div className='hidden md:block w-1/2 bg-gray-800'>
    <div className='h-full flex flex-col justify-center items-center'>
        <img src={loginImage} alt="" className='h-[750px] w-full object-cover' />
    </div>
    </div>
</div>
)
}

export default PaypaLId
