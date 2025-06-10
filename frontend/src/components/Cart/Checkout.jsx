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
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token || !user) {
            console.log("No valid authentication found");
            navigate('/login');
        }
    }, [user, navigate]);
    const [checkoutId,setCheckoutId]=useState(null)
    useEffect(()=>{
        if (!cart || cart.products.length === 0)            {
            navigate('/')
        }
    },[cart,navigate])
      
    const handleCreateCheckout = async(e) => {
        e.preventDefault()
        
        const token = localStorage.getItem("userToken");
        if (!token) {
            alert("Please log in again");
            navigate('/login');
            return;
        }
        
        if(cart && cart.products.length > 0) {
            // Remove the checkoutdata wrapper
            const response = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.totalPrice
            }))
            
            if (response.payload && response.payload._id) {
                setCheckoutId(response.payload._id);
            }
        }
    }
    // const decodeToken = () => {
    //     const token = localStorage.getItem("userToken");
    //     if (token) {
    //         try {
    //             // This will show you the token structure (don't do this in production)
    //             const payload = JSON.parse(atob(token.split('.')[1]));
    //             console.log('Token payload:', payload);
    //         } catch (e) {
    //             console.log('Could not decode token:', e);
    //         }
    //     }
    // };
    
    // // Call this function to see your token structure
    // decodeToken();
const handlePaymentSuccess = async(details) => {
    try {
        const res = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, // Use checkoutId here
            {
                paymentStatus: "paid",
                paymentDetails: details
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
            await handleFinalizeCheckout(checkoutId)
    } catch(err) {
        console.error("Payment Success", err)
    }
}
const handleFinalizeCheckout = async (checkoutId) => {
    const token = localStorage.getItem("userToken"); // ✅ Fix: Use correct token key
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      navigate("/order-confirmation"); 
      return res.data; 
    } catch (err) {
      console.error("Finalize Checkout", err);
      throw err; 
    }
};
  
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
    const handlePaypalTogetId=()=>{
        navigate('/paypal-check')
    }
    const [isRed, setIsRed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRed(prev => !prev);
    }, 1000); // Toggle every 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div >
        <div className='flex justify-center my-4'>
        
        <button
      onClick={handlePaypalTogetId}
      className={`text-white p-3 rounded-2xl cursor-pointer transition-colors duration-500 ${
        isRed ? 'bg-red-600' : 'bg-gray-600'
      }`}
    >
      Click here to get your PayPal Id
    </button>
        </div>
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
                            <img src={product.image} alt={product.name} className='w-30 h-30  object-cover mr-4' />
                            <div>
                                <h3 className='text-md'>{product.name}</h3>
                                <p className='text-gray-500'>Size:{product.size}</p>
                                <p className='text-gray-500'>Size:{product.color}</p>
                                <p className='text-xl'>${product.price?.toLocaleString()}</p>
                                <p className='text-gray-500'>Quantity:{product.quantity}</p>
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
    </div>
  )
}

export default Checkout
