import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAdminProducts=createAsyncThunk("adminProducts/fetchProducts",async({})=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})

export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async ({ productData }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
          }
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return rejectWithValue(err.response?.data || "Server error");
      }
    }
  );
  

export const updateProduct=createAsyncThunk("adminProducts/updateProduct",async({id,productData})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,productData,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})


export const deleteProduct=createAsyncThunk("adminProducts/deleteProduct",async({id})=>{
    const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("adminToken")}`
            }
        }
    )
    return response.data
})


const adminProductSlice=createSlice({
    name:"adminProducts",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAdminProducts.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
                state.products=action.payload
                state.loading=false
            })
            .addCase(fetchAdminProducts.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to fetch products"
                state.loading=false
            })
            .addCase(createProduct.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.products.push(action.payload)
                state.loading=false
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to create product"
                state.loading=false
            })
            .addCase(updateProduct.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                const updatedProduct=action.payload
                const index=state.products.findIndex(product=>product._id===updatedProduct._id)
                if(index!==-1){
                    state.products[index]=updatedProduct
                }
            })
            .addCase(updateProduct.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to update product"
                state.loading=false
            })
            .addCase(deleteProduct.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.products=state.products.filter(product=>product._id!==action.payload._id)
                state.loading=false
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.error=action.error.message || "Failed to delete product"
                state.loading=false
            })
    }
})

export const {clearProducts}=adminProductSlice.actions  
export default adminProductSlice.reducer