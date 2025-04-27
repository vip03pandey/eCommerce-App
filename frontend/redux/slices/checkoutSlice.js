import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { head } from "lodash";


export const createCheckout=createAsyncThunk("checkout/createCheckout",async({checkoutdata},{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,checkoutdata,{
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


const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{
        checkout:null,
        loading:false,
        error:null
    },
    reducers:{
        clearCheckout:(state)=>{
            state.checkout=null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createCheckout.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createCheckout.fulfilled,(state,action)=>{
                state.checkout=action.payload
                state.loading=false
            })
            .addCase(createCheckout.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to create checkout"
                state.loading=false
            })
    }
})

export const {clearCheckout}=checkoutSlice.actions
export default checkoutSlice.reducer