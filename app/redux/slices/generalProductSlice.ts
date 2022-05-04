import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AllProductsResponse,
  FireyErrors,
  ProductProps,
  ProductWithLimitResponse,
  SpecificProductAsResponse,
} from "../../../typings/interfaces/mains"
import productService from "../../services/productService"

interface StateProps {
  status: "loading" | "finished" | "idle" | "error"
  products: ProductProps[]
  featuringProducts: ProductProps[]
  newInProducts: ProductProps[]
  menWearsProducts: ProductProps[]
  womenWearsProducts: ProductProps[]
  error: FireyErrors["message"] | undefined
}

const initialState = {
  status: "idle",
  products: [],
  featuringProducts: [],
  newInProducts: [],
  menWearsProducts: [],
  womenWearsProducts: [],
  currentProduct: null,
  error: "",
} as StateProps

// export const fetchProductDetails = createAsyncThunk<
// 	{},
// 	{},
// 	{
// 		rejectValue: FireyErrors
// 	}
// >(
// 	'general_product/fetchAllProducts',
// 	async (_, { rejectWithValue, dispatch }) => {
// 		const res = await productService.fetchProductData()

// 		if (res.status !== 200) {
// 			return rejectWithValue((await res.json()) as FireyErrors)
// 		}

// 		const response = (await res.json()) as AllProductsResponse
// 		return dispatch(fetchProducts(response.data))
// 	}
// )

// fetch product details based on pagination query
export const fetchProductDetails = createAsyncThunk<
  ProductWithLimitResponse,
  string,
  {
    rejectValue: FireyErrors
  }
>("general_product/fetchAllProducts", async (turn, { rejectWithValue }) => {
  const res = await productService.fetchProductData(turn) //turn number

  if (res.status !== 200) {
    return rejectWithValue((await res.json()) as FireyErrors)
  }

  return (await res.json()) as ProductWithLimitResponse
})

// fetch home page details ~ createAsyncThunk type - <{resParams}, {reqParams}, {reduxParams}>
export const fetchHomePageDetails = createAsyncThunk<
  {
    newInProducts: ProductProps[]
    menWearsProducts: ProductProps[]
    womenWearsProducts: ProductProps[]
    featuringProducts: ProductProps[]
  },
  {},
  { rejectValue: FireyErrors }
>("general_product/fetchHomePageDetails", async (_, { rejectWithValue }) => {
  // new-in, men-wears, women-wears fetching promises
  const newInProductsPromise = productService.fetchProductByCategory(
    "new-in",
    4
  )
  const menWearsProductsPromise = productService.fetchProductByCategory(
    "men-wears",
    4
  )
  const womenWearsProductsPromise = productService.fetchProductByCategory(
    "women-wears",
    4
  )

  // fetch first 20 feturing products promise
  const featuringProductsPromise = productService.fetchAllFeaturingProducts(20)

  // fetch all data
  const [
    newInResponse,
    menWearsResponse,
    womenWearsResponse,
    featuringProductsResponse,
  ] = await Promise.all([
    newInProductsPromise,
    menWearsProductsPromise,
    womenWearsProductsPromise,
    featuringProductsPromise,
  ])

  // responses with errors
  if (newInResponse.status !== 200) {
    return rejectWithValue((await newInResponse.json()) as FireyErrors)
  }

  if (menWearsResponse.status !== 200) {
    return rejectWithValue((await menWearsResponse.json()) as FireyErrors)
  }

  if (womenWearsResponse.status !== 200) {
    return rejectWithValue((await womenWearsResponse.json()) as FireyErrors)
  }

  if (featuringProductsResponse.status !== 200) {
    return rejectWithValue(
      (await featuringProductsResponse.json()) as FireyErrors
    )
  }

  // specific products from specific categories
  const newInProducts = (await newInResponse.json()) as AllProductsResponse
  const menWearsProducts =
    (await menWearsResponse.json()) as AllProductsResponse
  const womenWearsProducts =
    (await womenWearsResponse.json()) as AllProductsResponse

  // fearturing Products
  const featuringProducts =
    (await featuringProductsResponse.json()) as AllProductsResponse

  // structure of returing response
  const data = {
    newInProducts: newInProducts.data,
    menWearsProducts: menWearsProducts.data,
    womenWearsProducts: womenWearsProducts.data,
    featuringProducts: featuringProducts.data,
  }

  return data
})

export const fetchFeaturingProducts = createAsyncThunk<
  {},
  {},
  {
    rejectValue: FireyErrors
  }
>(
  "general_product/fetchAllFeaturingProducts",
  async (_, { rejectWithValue, dispatch }) => {
    const res = await productService.fetchAllFeaturingProducts()

    if (res.status !== 200) {
      return rejectWithValue((await res.json()) as FireyErrors)
    }

    const response = (await res.json()) as AllProductsResponse
    return dispatch(fetchFeaturing(response.data))
  }
)

// fetch details of a specific product
export const fetchSpecificProductDetails = createAsyncThunk<
  {
    product: ProductProps
    recommendedProducts: ProductProps[]
    featuringProducts: ProductProps[]
  },
  string,
  { rejectValue: FireyErrors }
>(
  "general_product/fetchSpecificProductDetails",
  async (productID, { rejectWithValue }) => {
    const productResult = await productService.fetchProductByID(productID)

    if (productResult.status !== 200) {
      return rejectWithValue(await productResult.json())
    }

    const product = (await productResult.json()) as SpecificProductAsResponse
    const category = product.data.category

    const recommendationPromise = productService.fetchProductByCategory(
      category,
      20
    )

    const featuringProductsPromise =
      productService.fetchAllFeaturingProducts(20)

    const [recommendationResult, featuringProductsResult] = await Promise.all([
      recommendationPromise,
      featuringProductsPromise,
    ])

    if (recommendationResult.status !== 200) {
      return rejectWithValue(await recommendationResult.json())
    }

    const recommendedProducts =
      (await recommendationResult.json()) as AllProductsResponse

    const featuringProducts =
      (await featuringProductsResult.json()) as AllProductsResponse

    // remove all the recommendations that matches with featuring product or the product iteself that has been called
    const newRecommendedProducts = recommendedProducts.data.filter(
      (rProduct) => {
        return (
          !featuringProducts.data.find(
            (fProduct) => fProduct._id === rProduct._id
          ) && rProduct._id !== productID
        )
      }
    )

    // remove the product that has been called from featuring products
    const newFeaturingProducts = featuringProducts.data.filter(
      (item) => item._id !== productID
    )

    const data = {
      product: product.data,
      recommendedProducts: newRecommendedProducts,
      featuringProducts: newFeaturingProducts,
    }

    return data
  }
)

export const fetchProductByID = createAsyncThunk<
  SpecificProductAsResponse,
  string,
  {
    rejectValue: FireyErrors
  }
>(
  "general_product/fetchProductByID",
  async (productID: string, { rejectWithValue }) => {
    const res = await productService.fetchProductByID(productID)

    if (res.status !== 200) {
      return rejectWithValue((await res.json()) as FireyErrors)
    }

    return (await res.json()) as SpecificProductAsResponse
  }
)

export const fetchProductByCategory = createAsyncThunk<
  AllProductsResponse,
  {
    category: string
    limit?: number
  },
  {
    rejectValue: FireyErrors
  }
>(
  "general_product/fetchProductByCategory",
  async ({ category, limit }, { rejectWithValue }) => {
    const res = limit
      ? await productService.fetchProductByCategory(category, limit)
      : await productService.fetchProductByCategory(category)

    if (res.status !== 200) {
      return rejectWithValue((await res.json()) as FireyErrors)
    }

    return (await res.json()) as AllProductsResponse
  }
)

const generalProductSlice = createSlice({
  name: "general_product",
  initialState,
  reducers: {
    fetchProducts(state, action: PayloadAction<ProductProps[]>) {
      state.products = state.products.concat(action.payload)
    },

    fetchFeaturing(state, action: PayloadAction<ProductProps[]>) {
      state.featuringProducts = state.featuringProducts.concat(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchFeaturingProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductByID.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchHomePageDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSpecificProductDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductDetails.fulfilled, (state) => {
        state.status = "finished"
      })
      .addCase(fetchFeaturingProducts.fulfilled, (state) => {
        state.status = "finished"
      })
      .addCase(fetchProductByID.fulfilled, (state) => {
        state.status = "finished"
      })
      .addCase(fetchProductByCategory.fulfilled, (state) => {
        state.status = "finished"
      })
      .addCase(fetchHomePageDetails.fulfilled, (state, action) => {
        state.status = "finished"
        state.newInProducts = action.payload.newInProducts
        state.menWearsProducts = action.payload.menWearsProducts
        state.womenWearsProducts = action.payload.womenWearsProducts
        state.featuringProducts = action.payload.featuringProducts
      })
      .addCase(fetchSpecificProductDetails.fulfilled, (state, action) => {
        state.status = "finished"
        state.featuringProducts = action.payload.featuringProducts
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
      .addCase(fetchFeaturingProducts.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
      .addCase(fetchProductByID.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
      .addCase(fetchHomePageDetails.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
      .addCase(fetchSpecificProductDetails.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload?.message
      })
  },
})

const { actions, reducer } = generalProductSlice

export const { fetchProducts, fetchFeaturing } = actions

export default reducer
