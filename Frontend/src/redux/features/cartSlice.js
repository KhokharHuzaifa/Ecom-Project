import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState:{
   cart:[]
  },
  reducers: {
    addToCart: (state,action)=>{
      const existProduct = state.cart.find((p)=>p._id === action.payload._id)

      if(existProduct){
        existProduct.quantity += action.payload.quantity
      }else{
        state.cart.push({...action.payload,quantity:1})
      }
    },
    removeFromCart:(state,action)=>{
        state.cart = state.cart.filter((p)=>p._id !==action.payload._id)
        
    },
    Increament:(state,action)=>{
      const prod = state.cart.find((v)=>v._id === action.payload._id)
      prod.quantity = prod.quantity + 1
    },
    Decreament:(state,action)=>{
      const prod = state.cart.find((v)=>v._id === action.payload._id)
      if(prod && prod.quantity > 1){
        prod.quantity = prod.quantity - 1
      }
    }
  },
})

export const { addToCart , removeFromCart , Increament , Decreament} = cartSlice.actions
export default cartSlice.reducer