import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

const userFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null

const initialGuestId=localStorage.getItem("guestId") || `guest_${new Date().getTime()}`
localStorage.setItem("guestId",initialGuestId)


// initail state
const initialState={
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null
}

// async thunk to login user
export const loginUser=createAsyncThunk('auth/loginUser',async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData)
        localStorage.setItem("userInfo",JSON.stringify(response.data.user))
        localStorage.setItem("userToken",response.data.token)
        return response.data.user
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const registerUser=createAsyncThunk('auth/registerUser',async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData)
        localStorage.setItem("userInfo",JSON.stringify(response.data.user))
        localStorage.setItem("userToken",response.data.token)
        return response.data.user
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
})


// slice
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.setItem("guestId",state.guestId)
            
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.setItem("guestId",state.guestId)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        
      builder.addCase(loginUser.fulfilled,(state,action)=>{
          state.user=action.payload
          state.loading=false
      })
      builder.addCase(loginUser.rejected,(state,action)=>{
          state.error=action.payload.message
          state.loading=false
      })
      builder.addCase(registerUser.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(registerUser.fulfilled,(state,action)=>{
        state.user=action.payload
        state.loading=false
    })
    builder.addCase(registerUser.rejected,(state,action)=>{
        state.error=action.payload.message
        state.loading=false
    })
}})

export const {logout,generateNewGuestId}=authSlice.actions
export default authSlice.reducer