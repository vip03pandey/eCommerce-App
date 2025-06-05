import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from "../../redux/slices/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { checkout } = useSelector((state) => state.checkout)

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart())
      localStorage.removeItem('checkout')
    } else {
      navigate("/my-order")
    }
  }, [checkout, dispatch, navigate])

  const calculateEstimatedDeliveryDate = (createdAt) => {
    const date = new Date(createdAt)
    date.setDate(date.getDate() + 5)
    return date.toLocaleDateString()
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You For Your Order
      </h1>
      {checkout && (
        <div className='p-6 rounded-lg border'>
          <div className='flex md:flex-row flex-col justify-between mb-20'>
            <div>
              <h2 className='text-xl font-semibold'>Order ID: {checkout._id}</h2>
              <p className='text-gray-500'>Order date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className='text-emerald-700 text-sm'>
                Estimated Delivery Date: {calculateEstimatedDeliveryDate(checkout.createdAt)}
              </p>
            </div>
          </div>

          <div className='mb-20'>
            {checkout?.checkoutItems?.map((item) => (
              <div key={item.productId} className='flex items-center m-4'>
                <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mr-4 rounded-md' />
                <div>
                  <h4 className='text-md font-semibold'>{item.name}</h4>
                  <p className='text-gray-500'>Size: {item.size} | {item.color}</p>
                </div>
                <div className='ml-auto text-right'>
                  <p className='text-md '>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                  </p>
                  <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
            <div>
              <h4 className='text-lg font-semibold'>Payment</h4>
              <p className='text-gray-600'>PayPal</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
              <p className='text-gray-600'>{checkout?.shippingAddress?.address}</p>
              <p className='text-gray-600'>
                {checkout?.shippingAddress?.city}, {checkout?.shippingAddress?.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmation
