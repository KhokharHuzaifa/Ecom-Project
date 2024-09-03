import { createSlice } from '@reduxjs/toolkit'

const {actions, reducer} = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    isAuthenticated:false
  },
  reducers: {
    setUserInfo(state,action){
        state.user = action.payload
    },
    setIsAuthenticated(state,action){
        state.isAuthenticated = action.payload
    }
  },
})

export const { setUserInfo , setIsAuthenticated} = actions
export default reducer