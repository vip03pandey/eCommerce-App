import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllOrders=createAsyncThunk("adminOrders/fetchAllOrders",async(_,{rejectWithValue})=>{
    try{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
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


export const updateOrderStatus=createAsyncThunk("adminOrders/updateOrderStatus",async({orderId,status})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,{status},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})

export const deleteOrder=createAsyncThunk("adminOrders/deleteOrder",async({orderId},{rejectWithValue})=>{
    try{
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return orderId
}
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }

    })


    const adminOrderSlice=createSlice({
        name:"adminOrders",
        initialState:{
            orders:[],
            totalOrders:0,
            totalSales:0,
            loading:false,
            error:null
        },
        reducers:{
        },
        extraReducers:(builder)=>{
            builder
                .addCase(fetchAllOrders.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                .addCase(fetchAllOrders.fulfilled,(state,action)=>{
                    state.orders=action.payload
                    state.loading=false
                    state.totalOrders=action.payload.length

                    const totalSales=action.payload.reduce((acc,order)=>{
                        return acc+order.total
                    },0)
                    state.totalSales=totalSales
                })
                .addCase(fetchAllOrders.rejected,(state,action)=>{
                    state.error=action.error.message || "Failed to fetch orders"
                    state.loading=false
                })
                .addCase(updateOrderStatus.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                .addCase(updateOrderStatus.fulfilled,(state,action)=>{
                    const updatedOrder=action.payload
                    const index=state.orders.findIndex(order=>order._id===updatedOrder._id)
                    if(index!==-1){
                        state.orders[index]=updatedOrder
                    }
                })
                .addCase(updateOrderStatus.rejected,(state,action)=>{
                    state.error=action.error.message || "Failed to update order status"
                    state.loading=false
                })
                .addCase(deleteOrder.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                .addCase(deleteOrder.fulfilled,(state,action)=>{
                    state.orders=state.orders.filter(order=>order._id!==action.payload)
                    state.loading=false
                })
                .addCase(deleteOrder.rejected,(state,action)=>{
                    state.error=action.error.message || "Failed to delete order"
                    state.loading=false
                })
        }
    })

export const {clearOrders}=adminOrderSlice.actions  
export default adminOrderSlice.reducer