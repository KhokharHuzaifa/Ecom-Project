import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './Api/authApi'

const store = configureStore({
     reducer:{
        auth:authReducer,
        [authApi.reducerPath]: authApi.reducer,
     },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export default store