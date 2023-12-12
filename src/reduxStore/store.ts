import { configureStore } from '@reduxjs/toolkit'
import appSliceReducer from './appSlice'
import toolboxReducer from './toolboxSlice'
// Extract the reducer from the appSlice

const store = configureStore({
    reducer: {
        app: appSliceReducer,
        toolbox: toolboxReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
