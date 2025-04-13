import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetailsPage = () => {
    const {id}=useParams()
    const [orderDetails,setOrderDetails]=useState(null)
    useEffect(()=>{
        const mockedOrderDetails={
            _id:id,
            createdAt:new Date(),
            isPaid:true,
            paymentMethod:"PayPal",
            shippingMethod:"Standard",
            isDelivered:true,
            orderItems:[
                {
                    productId:"1",
                    name:"T-shirt",
                    price:120,
                    quantity:2,
                    image:"https://picsum.photos/200?random=1"
                },
                    {
                        productId:"2",
                        name:"T-shirt",
                        price:120,
                        quantity:1,
                        image:"https://picsum.photos/200?random=2"
                    },
            ],
            shippingAddress:{
                city:"Noida",
                country:"India",
            }
        }
        setOrderDetails(mockedOrderDetails)
    },[id])
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 '>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!orderDetails ? (<p>No order details found</p>) :
        (
            <div className='p-4 sm:p-6 rounded-lg border '>
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold '>Order ID:{orderDetails._id}</h3>
                        <p className='text-gray-600'> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.isPaid ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"} px-3 py-1 rounded-full  text-small mb-2 font-medium`}>{orderDetails.isPaid?"Paid":"Pending"}</span>
                        <span className={`${orderDetails.isDelivered ? "text-green-700 bg-yellow-100" : "text-yellow-700 bg-yellow-100"} px-3 py-1 rounded-full  text-small mb-2 font-medium`}>{orderDetails.isDelivered?"Delivered":"Pending Delivery"}</span>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold'>Payment info</h4>
                        <p className='text-gray-600'>{orderDetails.paymentMethod }</p>
                        <p>Staus:{orderDetails.isPaid ? "Paid":"Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold'>Shipping info</h4>
                        <p className='text-gray-600'>{orderDetails.shippingMethod }</p>
                        <p>Address: {` ${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}</p>
                    </div>
                </div>
                {/* product list */}
<div className='overflow-x-auto rounded-lg'>
    <h4 className='text-lg font-semibold mb-4'>Products</h4>
    <table className='min-w-full text-black mb-4 border '>
        <thead className='bg-gray-100'>
            <tr>
                <th className='py-2 px-4 text-left'>Name</th>
                <th className='py-2 px-4 text-left'>Unit Price</th>
                <th className='py-2 px-4 text-left'>Quantity</th>
                <th className='py-2 px-4 text-left'>Total</th>
            </tr>
        </thead>
        <tbody>
            {orderDetails.orderItems.map((item, index) => (
                <tr key={index} className='border-t'>
                    <td className='py-2 px-4 flex items-center gap-2'>
                        <img src={item.image} alt={item.name} className='w-10 h-10 object-cover rounded hidden md:block' />
                        {item.name}
                    </td>
                    <td className='py-2 px-4'><Link to={`/product/${item.productId}`}>{`$${item.price}`}</Link></td>

                    <td className='py-2 px-4'>{`${item.quantity}`}</td>
                    <td className='py-2 px-4'>{`$${item.price * item.quantity}`}</td>
                </tr>
            ))}
            </tbody>
            </table>
            </div>
                <Link to="/my-orders" className='text-blue-500 hover:underline'>Back to My Orders</Link>
            </div>
        )}
    </div>
  )
}

export default OrderDetailsPage
