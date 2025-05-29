import { create, first, set } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createCheckout } from '../../../redux/slices/checkoutSlice';
const Checkout = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {cart,loading,error}=useSelector(state=>state.cart)
    const {user}=useSelector(state=>state.auth)

    const [shippingAddress,setShippingAddress]=useState({
        firstName:'',
        lastName:'',
        address:'',
        city:'',
        postalCode:'',
        country:'',
        phone:''
    })
    const [checkoutId,setCheckoutId]=useState(null)
    useEffect(()=>{
        if (!cart || cart.products.length === 0)            {
            navigate('/')
        }
    },[cart,navigate])
      
    const handleCreateCheckout=async(e)=>{
        e.preventDefault()
        if(cart && cart.products.length>0){
            const response=await dispatch(createCheckout({checkoutItems:cart.products,shippingAddress,paymentMethod:"Paypal",totalPrice:cart.totalPrice}))
            if (response.payload && response.payload._id) {
                setCheckoutId(response.payload._id);
              }
        }
    }
    const handlePaymentSuccess=async(details)=>{
        try {
            const res=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/pay`,{paymentStatus:"paid",paymentDetails:details},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("userToken")}`
                }
            })
            if(res.status===200){
                await handleFinalizeCheckout(checkoutId)
            }
            else{
                console.error("Payment",res)
            }
        }
        catch(err){
            console.error("Payment Success",err)
        }
        navigate('/order-confirmation')
    }
    const handleFinalizeCheckout=async(checkoutId)=>{
        try {
            const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,{
            },{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("userToken")}`
                }
            })
            if(res.status===200){
                navigate('/order-confirmation')
            }
            else{
                console.error("Finalize Checkout",res)
            }
        }
        catch(err){
            console.error("Finalize Checkout",err)
        }
    }
    if(loading){
        return <div className='flex justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700'></div>
        </div>
    }
    if(error){
        return <div className='flex justify-center items-center'>
            <div className='text-red-500'>{error}</div>
        </div>
    }
    if(!cart || !cart.products.length===0){
        return <div className='flex justify-center items-center'>
            <div className='text-red-500'>Cart is empty</div>
        </div>
    }
    console.log("Checkout Payload", {
        checkoutItems: cart.products,
        shippingAddress:cart.shippingAddress,
        totalPrice:cart.totalPrice
      });
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking tighter'>
        <div className='bg-white rounded-lg p-6 '>
            <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
            <form onSubmit={handleCreateCheckout} action="">
                <h3 className='text-lg mb-4 '>Contact Details</h3>
                <div className='mb-4'>
                    <label className='block gray-700 '>Email</label>
                    <input 
                    type="email" 
                    value={user?.email}
                    className='w-full p-2 border rounded' 
                    disabled/>
                </div>
                <h3 className='text-lg mb-4'>Delivery</h3>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div>

                    <label className="block text-gray-700">First Name</label>
                    <input type="text" value={shippingAddress.firstName} onChange={(e)=>setShippingAddress({...shippingAddress,firstName:e.target.value})} className='w-full p-2 border rounded' required />
                </div>
                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input type="text" value={shippingAddress.lastName} onChange={(e)=>setShippingAddress({...shippingAddress,lastName:e.target.value})} className='w-full p-2 border rounded' required />
                </div>

                </div>
                <div className='mb-4 '>
                    <label className="block text-gray-700">Address</label>
                    <input type="text" value={shippingAddress.address} onChange={(e)=>setShippingAddress({...shippingAddress,address:e.target.value})} className='w-full p-2 border rounded' required />
                </div>
                <div className='mb-4 grid grid-cols-2 gap-4'>

                <div>
                    <label className="block text-gray-700">City</label>
                    <input type="text" value={shippingAddress.city} onChange={(e)=>setShippingAddress({...shippingAddress,city:e.target.value})} className='w-full p-2 border rounded' required />
                    </div>
                    <div>
                    <label className="block text-gray-700">Postal Code</label>
                    <input type="text" value={shippingAddress.postalCode} onChange={(e)=>setShippingAddress({...shippingAddress,postalCode:e.target.value})} className='w-full p-2 border rounded' required />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Country</label>
                    <input type="text" value={shippingAddress.country} onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})} className='w-full p-2 border rounded' required />
                    </div>
                    <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input type="text" value={shippingAddress.phone} onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})} className='w-full p-2 border rounded' required />
                    </div>
                <div className='mt-6'>{!checkoutId ? (<button type='submit' className='w-full bg-black text-white py-3 rounded'> Continue To Payment</button>) : (
                    <div>
                        <h3 className='text-lg mb-4 '>Pay With Paypal</h3>
                        <PaypalButton amount={cart.totalPrice} 
                        onSuccess={handlePaymentSuccess} 
                        onError={(err)=>{
                            console.error("PayPal Checkout onError", err);
                            alert("Payment Failed")}
                            } />
                    </div>
                ) }</div>
            </form>
        </div>
        <div className='bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg mb-4'>Order Summary</h3>
            <div className='border-t py-4 mb-4'>
                {cart.products.map((product,index)=>(
                    <div key={index} className='flex items-start justify-between py-2 border-b'>
                        <div className='flex items-start'>
                            <img src={product.image} alt={product.name} className='w-full h-24  object-cover mr-4' />
                            <div>
                                <h3 className='text-md'>{product.name}</h3>
                                <p className='text-gray-500'>Size:{product.size}</p>
                                <p className='text-gray-500'>Size:{product.color}</p>
                                <p className='text-xl'>${product.price?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center text-lg mb-4 '>
                <p>Subtotal</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className='flex justify-between items-center text-lg'>
                <p>Shipping</p>
                <p>Free</p>
            </div>
            <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                <p>Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default Checkout
