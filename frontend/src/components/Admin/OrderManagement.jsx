import _ from 'lodash'
import React from 'react'

const OrderManagement = () => {
    const orders=[
        {
            _id:123,
            user:{
                name:"Vipul Pandey",
            },
            totalPrice:100,
            status:"Processing",
        }
    ]
    const handleChange=(id,status)=>{
        console.log({_id:id,status:status})
    }
    const handleStatusChange=(id,status)=>{
        if(window.confirm("Are you sure you want to change status of this order?")){
            console.log("change status",{_id:id,status:status})
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-3 px-4'>OrderID</th>
                        <th className='py-3 px-4'>Customer</th>
                        <th className='py-3 px-4'>Total Price</th>
                        <th className='py-3 px-4'>Status</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length>0 ? (
                        orders.map((order,index)=>(
                            <tr key={order._id} className='border-b hover:bg-gray-60 cursor-pointer'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                                <td className='p-4 '>{order.user.name}</td>
                                <td className='p-4 '>${order.totalPrice}</td>
                                <td className='p-4 '><select value={order.status} onChange={(e)=>handleChange(order._id,e.target.value)} className='p-2.5 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 border-blue-500 block border rounded'>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select></td>
                                <td className='p-4 '><button onClick={()=>handleStatusChange(order._id,"Delivered")} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Mark as delivered</button></td>
                            </tr>
                        ))
                    ) : (<tr>
                        <td colSpan={4} className='p-4 text-center text-gray-500'>No Orders Found</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement
