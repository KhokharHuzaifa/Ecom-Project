import { createSlice } from '@reduxjs/toolkit'

const {actions, reducer} = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    tk:null
  },
  reducers: {
    login(state,action){
        state.user = action.payload.user
    },
    registerUser(state,action){
        state.user = action.payload.user
    }
  },
})

export const { login , registerUser } = actions
export default reducer