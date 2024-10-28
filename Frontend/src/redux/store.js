import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from './features/authSlice'
import cartReducer from './features/cartSlice'
import { authApi } from './Api/authApi'
import {categoryApi} from './Api/categoryApi'
import { productApi } from './Api/productApi'

const persistConfig = {
   key: "root",
   blacklist: [authApi.reducerPath, 'auth'],
   storage,
 };

 const rootReducer = combineReducers({
   auth: authReducer,
   cart:cartReducer,
   [authApi.reducerPath]: authApi.reducer,
   [categoryApi.reducerPath]: categoryApi.reducer,
   [productApi.reducerPath]: productApi.reducer,
 });

 const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//      reducer:{
//         auth:authReducer,
//         cart:cartReducer,
//         [authApi.reducerPath]: authApi.reducer,
//         [categoryApi.reducerPath]: categoryApi.reducer,
//         [productApi.reducerPath]: productApi.reducer,
//      },
//     // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
//      middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware,productApi.middleware),
// })

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware,productApi.middleware),
})

export const persistor = persistStore(store);