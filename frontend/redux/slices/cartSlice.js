import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const loadCartFromStorage=()=>{
    const storedCart=localStorage.getItem("cart")
    if(storedCart){
        return storedCart ? JSON.parse(storedCart) : {products : []}
    }
}


// to add cart to save to local storage
const saveCartToStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
}


// fetch cart,{}
export const fetchCart=createAsyncThunk("cart/fetchCart",async({userId,guestId},{rejectWithValue})=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            params:{
                userId,
                guestId
            }
        }
        )
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

// add product to cart
export const addToCart=createAsyncThunk("cart/addToCart",async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            size,
            color,
            userId,
            guestId
        }
        )
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

// update the quantity of product in cart
export const updateCartItemQuantity=createAsyncThunk("cart/updateCartItemQuantity",async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try{
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            size,
            color,
            userId,
            guestId
        }
        )
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

// remove product from cart
export const removeFromCart=createAsyncThunk("cart/removeFromCart",async({productId,size,color,guestId,userId},{rejectWithValue})=>{
    try{
        const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            data:{
                productId,
                size,
                color,
                userId,
                guestId
            }
        }
        )
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

// merge guest cart with user cart
export const mergeCart=createAsyncThunk("cart/mergeCart",async({guestId,userId},{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{
            guestId,
            userId
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        }
        )
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromStorage(),
        loading:false,
        error:null
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]},
            localStorage.removeItem("cart")

        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCart.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(fetchCart.fulfilled,(state,action)=>{
                state.cart=action.payload
                state.loading=false
                saveCartToStorage(action.payload)
            })
            .addCase(fetchCart.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to fetch cart"
                state.loading=false
            })

            .addCase(addToCart.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.cart=action.payload
                state.loading=false
                saveCartToStorage(action.payload)
            })
            .addCase(addToCart.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to add to cart"
                state.loading=false
            })
            .addCase(updateCartItemQuantity.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
                state.cart=action.payload
                state.loading=false
                saveCartToStorage(action.payload)
            })
            .addCase(updateCartItemQuantity.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to update item quantity"
                state.loading=false
            })
            .addCase(removeFromCart.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(removeFromCart.fulfilled,(state,action)=>{
                state.cart=action.payload
                state.loading=false
                saveCartToStorage(action.payload)
            })
            .addCase(removeFromCart.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to remove item from cart"
                state.loading=false
            })
            .addCase(mergeCart.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(mergeCart.fulfilled,(state,action)=>{
                state.cart=action.payload
                state.loading=false
                saveCartToStorage(action.payload)
            })
            .addCase(mergeCart.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to merge cart"
                state.loading=false
            })
    }


})

export const {clearCart}=cartSlice.actions
export default cartSlice.reducer