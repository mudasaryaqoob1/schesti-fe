
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import clientSlice from './clientSlice'

export const store = () => {
    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            clientData: clientSlice
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat([authApi.middleware]),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']