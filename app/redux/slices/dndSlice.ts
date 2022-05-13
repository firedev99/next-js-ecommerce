import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ColorOptions {
  colorName: string
  optionPreview: string
}

interface DNDSlice {
  overSingleDropZone: boolean
  overMultipleDropZone: boolean
  overColorDropZone: boolean
  singlePreview: string
  multiplePreview: string[]
  colorPreview: string
  colorOptions: ColorOptions[]
}

const initialState = {
  overSingleDropZone: false,
  overMultipleDropZone: false,
  overColorDropZone: false,
  singlePreview: "",
  colorPreview: "",
  multiplePreview: [],
  colorOptions: [],
} as DNDSlice

const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    overSingleDropbox(state) {
      state.overSingleDropZone = true
    },

    overMultipleDropbox(state) {
      state.overMultipleDropZone = true
    },

    overColorDropbox(state) {
      state.overColorDropZone = true
    },

    handleSinglePreview(state, action: PayloadAction<string>) {
      state.overSingleDropZone = false
      state.singlePreview = action.payload
    },

    handleMultiplePreview(state, action: PayloadAction<string>) {
      state.overMultipleDropZone = false
      state.multiplePreview = state.multiplePreview.concat(action.payload)
    },

    handleColorPreview(state, action: PayloadAction<string>) {
      state.overColorDropZone = false
      state.colorPreview = action.payload
    },

    addColorOption(state, action: PayloadAction<ColorOptions>) {
      state.colorOptions = state.colorOptions.concat(action.payload)
    },

    deleteSinglePreview(state) {
      state.overSingleDropZone = false
      state.singlePreview = ""
    },

    deleteMultiplePreview(state, action: PayloadAction<number>) {
      state.multiplePreview = state.multiplePreview.filter(
        (_, index) => index !== action.payload
      )
    },

    deleteColorPreview(state) {
      state.colorPreview = ""
    },

    deleteColorPreviewOption(state, action: PayloadAction<number>) {
      state.colorOptions = state.colorOptions.filter(
        (_, index) => index !== action.payload
      )
    },

    handleMultipleLeave(state) {
      state.overMultipleDropZone = false
    },

    handleColorDropboxLeave(state) {
      state.overColorDropZone = false
    },
  },
})

const { actions, reducer } = dndSlice

export const {
  overSingleDropbox,
  overMultipleDropbox,
  overColorDropbox,
  handleSinglePreview,
  handleMultiplePreview,
  handleColorPreview,
  addColorOption,
  deleteSinglePreview,
  deleteMultiplePreview,
  deleteColorPreview,
  deleteColorPreviewOption,
  handleMultipleLeave,
  handleColorDropboxLeave,
} = actions

export default reducer
