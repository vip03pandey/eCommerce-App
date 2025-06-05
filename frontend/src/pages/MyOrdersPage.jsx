import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchUserOrders } from "/Users/vipulpandey/Ecommerce/frontend/redux/slices/orderSlice";
const MyOrdersPage = () => {
  const dispatch=useDispatch()
  const {orders,loading,error}=useSelector(state=>state.order)
  useEffect(()=>{
    dispatch(fetchUserOrders())
  },[dispatch])

  const navigate=useNavigate()
  const rowClick=(orderid)=>{
    navigate(`/order/${orderid}`)
  }
  if(loading)return <p>Loading...</p>
  if(error)return <p>Error</p>
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>
        My Orders
      </h2>
      <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
        <table className='min-w-full text-left text-gray-500 '>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3 '>Image</th>
              <th className='py-2 px-4 sm:py-3 '>Order id</th>
              <th className='py-2 px-4 sm:py-3 '>Created</th>
              <th className='py-2 px-4 sm:py-3 '>Shipping </th>
              <th className='py-2 px-4 sm:py-3 '>Items</th>
              <th className='py-2 px-4 sm:py-3 '>Price</th>
              <th className='py-2 px-4 sm:py-3 '>Status</th>
            </tr>
          </thead>
          <tbody>
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order._id} onClick={()=>rowClick(order._id)} className='border-b hover:border-gray-50 cursor-pointer'>
        <td className='py-2 px-2 sm:py-4 sm:px-4'>
          <img
            src={order.orderItems[0].image}
            alt={order.orderItems[0].name}
            className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
          />
        </td>
        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
        <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.orderItems.length}</td>
        <td className='py-2 px-2 sm:py-4 sm:px-4'>${order.totalPrice.toFixed(2)}</td>
        <td className='py-2 px-2 sm:py-4 sm:px-4'>
          {order.isPaid ? (
            <span className='text-green-600 px-2 py-1 rounded-full text-xs sm:text-sm font-medium'>Paid</span>
          ) : (
            <span className='text-red-600 px-2 py-1 rounded-full text-xs sm:text-sm font-medium'>Pending</span>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
        You have no orders
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  )
}

export default MyOrdersPage
