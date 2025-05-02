import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchUsers=createAsyncThunk("admin/fetchUsers",async({})=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})

export const addUser=createAsyncThunk("admin/addUser",async({userData})=>{
    try{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,userData,
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
    return err.response.data
}
})

export const updateUser=createAsyncThunk("admin/updateUser",async({id,name,email,role})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{name,email,role},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})


const deleteUser=createAsyncThunk("admin/deleteUser",async({id})=>{
    const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.loading=true
                // state.error=null
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.users.push(action.payload.user)
                state.loading=false
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to fetch users"
                state.loading=false
            })
            .addCase(addUser.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(addUser.fulfilled,(state,action)=>{
                state.users=action.payload
                state.loading=false
            })
            .addCase(addUser.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to add user"
                state.loading=false
            })
            .addCase(updateUser.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(updateUser.fulfilled,(state,action)=>{
                const updatedUser=action.payload
                const index=state.users.findIndex(user=>user._id===updatedUser._id)
                if(index!==-1){
                    state.users[index]=updatedUser
                }
            })
            .addCase(updateUser.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to update user"
                state.loading=false
            })
            .addCase(deleteUser.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(deleteUser.fulfilled,(state,action)=>{
                state.users=state.users.filter(user=>user._id!==action.payload._id)
                state.loading=false
            })
            .addCase(deleteUser.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to delete user"
                state.loading=false
            })
    }
})

export const {clearUsers}=adminSlice.actions
export default adminSlice.reducer