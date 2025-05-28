import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '/redux/slices/cartSlice';
const CartContents = ({cart,userId,guestId}) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = delta + quantity;
        if (newQuantity >= 0) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            );
        }
    };
    
    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(
            removeFromCart({
                productId,
                size,
                color,
                guestId,
                userId,
            })
        );
    };
    
    return (
        <div>
            {cart.map((product, index) => (
                <div key={index} className='flex items-start justify-between py-4 border-b'>
                    <div className='flex items-start'>
                        <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                        <div>
                            <h3>{product.name}</h3>
                            <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color}</p>
                            <div className='flex items-center mt-2'>
                                <button onClick={()=>handleAddToCart(product.productId,-1,product.quantity,product.size,product.color)} className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>-</button>
                                <span className='mx-4 '>{product.quantity}</span>
                                <button onClick={()=>handleAddToCart(product.productId,+1,product.quantity,product.size,product.color)} className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>+</button>
                            </div>
                        </div>
                    </div>
                    {/* Move price and delete button to a separate div aligned to the right */}
                    <div className='flex items-center'>
                        <p className='font-medium mr-4'>${product.price.toLocaleString()}</p>
                        <button onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)} className='cursor-pointer'>
                            <MdDeleteOutline className='h-6 w-6 text-red-600' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;