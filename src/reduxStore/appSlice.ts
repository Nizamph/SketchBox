import { createSlice } from '@reduxjs/toolkit'
import { iconOptions } from '@/constants/Constants'
const appSlice = createSlice({
    name: 'app',
    initialState: {
        visibilityOfColorOptions: true,
        currentNavbarTool: 'pencil',
    },
    reducers: {
        changeColorOptionVisibility: (state, action) => {
            action.payload === 'hideColorOptions'
                ? (state.visibilityOfColorOptions = false)
                : (state.visibilityOfColorOptions = true)
        },
        setCurrentNavbarTool: (state, action) => {
            state.currentNavbarTool = action.payload.iconName
            console.log(state.currentNavbarTool)
        },
    },
})

export const { changeColorOptionVisibility, setCurrentNavbarTool } =
    appSlice.actions

export default appSlice.reducer
