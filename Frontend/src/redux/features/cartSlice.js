import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState:{
   cart:[]
  },
  reducers: {
    addToCart: (state,action)=>{
        state.cart.push(action.payload)
    },
    removeFromCart:(state,action)=>{
        state.cart = state.cart.filter((p)=>p._id !==action.payload._id)
        
    },
    Increament:(state,action)=>{

    },
    Decreament:(state,action)=>{

    }
  },
})

export const { addToCart , removeFromCart , Increament , Decreament} = cartSlice.actions
export default cartSlice.reducer