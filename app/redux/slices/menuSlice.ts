import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface StateProps {
  scale: number
  rotationPosition: number
}

const initialState = {
  scale: 0.8,
  rotationPosition: 0,
} as StateProps

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeScale(state, action: PayloadAction<number>) {
      state.scale = action.payload
    },

    changeRotation(state, action: PayloadAction<number>) {
      state.rotationPosition = action.payload
    },
  },
})

const { actions, reducer } = menuSlice

export const { changeScale, changeRotation } = actions

export default reducer
