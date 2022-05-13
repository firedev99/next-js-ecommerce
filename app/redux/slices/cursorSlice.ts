import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CursorProps {
  size: "regular" | "medium" | "small"
  zoomEffect: boolean
  position: {
    x: number
    y: number
  }
}

const initialState = {
  size: "small",
  zoomEffect: false,
  position: {
    x: 0,
    y: -20,
  },
} as CursorProps

const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    trackPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload
    },

    transformCursor(
      state,
      action: PayloadAction<"regular" | "medium" | "small">
    ) {
      state.size = action.payload
    },

    startZoom(state) {
      state.zoomEffect = true
    },

    stopZoom(state) {
      state.zoomEffect = false
    },
  },
})

const { actions, reducer } = cursorSlice

export const { transformCursor, trackPosition, startZoom, stopZoom } = actions

export default reducer
