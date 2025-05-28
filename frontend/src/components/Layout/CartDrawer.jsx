import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from "react-icons/io5";
import CartContents from '../Cart/CartContents';
import {useSelector} from 'react-redux'
const CartDrawer = ({ drawerOpen, toggleCardDrawer }) => {
  const navigate = useNavigate();
  const {user,guestId}=useSelector(state=>state.auth)
  const {cart}=useSelector(state=>state.cart)
  const userId=user?user._id :null
  const handleCheckout = () => {
    // navigate("/checkout")
    toggleCardDrawer()
    if(!user){
      navigate("/login?redirect=checkout")
    }
    else{
      navigate("/checkout")
    }
  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex justify-end p-4'>
        <button onClick={toggleCardDrawer} className='text-gray-600 hover:text-gray-800 cursor-pointer'>
          <IoCloseCircle className='h-6 w-6' />
        </button>
      </div>
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart && cart?.products?.length >0 ?  (<CartContents cart={cart.products} userId={userId} guestId={guestId} />
) : (<p className='text-center text-gray-500 text-sm'>Your cart is empty</p>)}
        
      </div>
      <div className='p-4 bg-white sticky bottom-0'>
      {cart && cart?.products?.length >0 && (
        <>
        <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer'>Chekout</button>
        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center '>
            Shipping ,taxes and discounts codes calculated at checkout
        </p>
        </>
      )}
      </div>
    </div>
  );
};

export default CartDrawer;
