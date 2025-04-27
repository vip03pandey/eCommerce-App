import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserOrders=createAsyncThunk("order/fetchUserOrders",async({rejectWithValue})=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,{
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


// fetch order by id
export const fetchOrderDetails=createAsyncThunk("order/fetchOrderDetails",async({orderId,rejectWithValue})=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,{
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


const orderSlice=createSlice({
    name:"order",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{

    }
    ,
    extraReducers:(builder)=>{
        builder
            .addCase(fetchUserOrders.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(fetchUserOrders.fulfilled,(state,action)=>{
                state.orders=action.payload
                state.loading=false
            })
            .addCase(fetchUserOrders.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to fetch orders"
                state.loading=false
            })
            .addCase(fetchOrderDetails.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
                state.orderDetails=action.payload
                state.loading=false
            })
            .addCase(fetchOrderDetails.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to fetch order details"
                state.loading=false
            })
    }
})

export const {clearOrders}=orderSlice.actions
export default orderSlice.reducer