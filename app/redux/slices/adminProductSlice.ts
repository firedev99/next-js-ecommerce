import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { uniqueID } from "../../../lib/generateUniqueID"
import {
  ProductResponse,
  FireyErrors,
  ProductColorOption,
  ProductFormState,
} from "../../../typings/interfaces/mains"
import ProductType from "../../../typings/types/product"
import productService from "../../services/productService"
import store from "../store"
import { setNotification } from "./notificationSlice"

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

interface ProductState {
  status: "loading" | "finished" | "idle" | "error"
  mainAsset: string
  extraAssets: string[]
  colorAssets: ProductColorOption[]
  error: FireyErrors["message"] | undefined
}

interface ProductProps extends ProductFormState {
  rating: number
}

interface DeleteProductResponse {
  success: boolean
  message: string
}

const initialState = {
  status: "idle",
  productID: "",
  error: "",
  mainAsset: "",
  extraAssets: [],
  colorAssets: [],
} as ProductState

export const createProduct = createAsyncThunk<
  ProductResponse,
  ProductProps,
  {
    state: AppState
    rejectValue: FireyErrors
  }
>(
  "admin_product/createProduct",
  async (productInfo: ProductProps, { rejectWithValue, getState }) => {
    const {
      admin_product: { mainAsset, extraAssets, colorAssets },
      auth: { user },
    } = getState()
    const product = {
      ...productInfo,
      imageSrc: mainAsset,
      sideImagesSrc: extraAssets,
      colors: colorAssets,
    } as ProductType

    const response = await productService.productAPI(product, user?.token)

    if (response.status !== 201) {
      return rejectWithValue((await response.json()) as FireyErrors)
    }

    return (await response.json()) as ProductResponse
  }
)

export const deleteProduct = createAsyncThunk<
  DeleteProductResponse,
  string,
  {
    state: AppState
    rejectValue: FireyErrors
  }
>(
  "admin_product/deleteProductByID",
  async (productID: string, { getState, rejectWithValue }) => {
    const { auth } = getState()
    const res = await productService.deleteProductByID(
      productID,
      auth.user?.token
    )

    if (res.status !== 200) {
      return rejectWithValue((await res.json()) as FireyErrors)
    }

    return (await res.json()) as DeleteProductResponse
  }
)

// export const deleteProduct = createAsyncThunk<
//   {},
//   string,
//   {
//     state: AppState
//     dispatch: AppDispatch
//     rejectValue: FireyErrors
//   }
// >(
//   "admin_product/deleteProductByID",
//   async (productID: string, { rejectWithValue, getState, dispatch }) => {
//     const {
//       auth: { user },
//     } = getState()
//     const res = await productService.deleteProductByID(productID, user?.token)

//     if (res.status !== 200) {
//       return rejectWithValue((await res.json()) as FireyErrors)
//     }

//     const response = (await res.json()) as DeleteProductsResponse
//     return dispatch(
//       setNotification({
//         id: uniqueID(),
//         message: response.message,
//       })
//     )
//   }
// )

const adminProductSlice = createSlice({
  name: "admin_product",
  initialState,
  reducers: {
    startCreatingProduct(state) {
      state.status = "loading"
    },
    getMainAsset(state, action: PayloadAction<string>) {
      state.mainAsset = action.payload
    },
    getExtraAssets(state, action: PayloadAction<string[]>) {
      state.extraAssets = action.payload
    },
    getColorAssets(state, action: PayloadAction<ProductColorOption[]>) {
      state.colorAssets = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          state.status = "finished"
        }
      )
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "finished"
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
  },
})

const { actions, reducer } = adminProductSlice

export const {
  startCreatingProduct,
  getMainAsset,
  getExtraAssets,
  getColorAssets,
} = actions

export default reducer
