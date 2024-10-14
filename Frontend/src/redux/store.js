import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './Api/authApi'
import {categoryApi} from './Api/categoryApi'

const store = configureStore({
     reducer:{
        auth:authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
     },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware),
})

export default store