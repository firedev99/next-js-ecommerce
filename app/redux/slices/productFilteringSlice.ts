import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	AllProductsResponse,
	FireyErrors,
	ProductProps,
} from '../../../typings/interfaces/mains'
import productService from '../../services/productService'
import store from '../store'

interface StateProps {
	status: 'idle' | 'loading' | 'finished' | 'error'
	products: ProductProps[]
	filteredProducts: ProductProps[]
	categories: string[]
	brands: string[]
	selectedBrands: string[]
	colors: string[]
	selectedColors: string[]
	openedModals: boolean[]
	activeModal: number
	subModal: 'main_section' | 'price_section' | 'color_section' | 'brand_section'
	error: FireyErrors['message'] | undefined
}

type AppDispatch = typeof store.dispatch

const initialState = {
	status: 'idle',
	products: [],
	filteredProducts: [],
	categories: [],
	brands: [],
	selectedBrands: [],
	colors: [],
	selectedColors: [],
	openedModals: [false, false, false, false, false],
	activeModal: 0,
	subModal: 'main_section',
	error: '',
} as StateProps

export const fetchProductDetails = createAsyncThunk<
	{},
	{},
	{
		rejectValue: FireyErrors
	}
>(
	'product_filtering/fetchAllProducts',
	async (_, { rejectWithValue, dispatch }) => {
		const res = await productService.fetchProductData()

		if (res.status !== 200) {
			return rejectWithValue((await res.json()) as FireyErrors)
		}

		const response = (await res.json()) as AllProductsResponse
		return dispatch(fetchProducts(response.data))
	}
)

const productFilteringSlice = createSlice({
	name: 'product_filtering',
	initialState,
	reducers: {
		fetchProducts(state, action: PayloadAction<ProductProps[]>) {
			let allProducts = action.payload
			// the product items itself and a clone one for filtering purposes
			state.products = state.products.concat(allProducts)
			state.filteredProducts = state.filteredProducts.concat(allProducts)

			// store all the non duplicate category names
			const allCategories = allProducts.map((product) => product.category)
			const categories = allCategories.filter(
				(category, idx) => allCategories.indexOf(category) === idx
			)
			state.categories = state.categories.concat(categories)

			// store all the non duplicate brand/vendor names
			const allBrands = allProducts.map((product) => product.vendorName)
			const brands = allBrands.filter(
				(brand, idx) => allBrands.indexOf(brand) === idx
			)
			state.brands = state.brands.concat(brands as string[])

			// store color option names from product items
			const colorOptions = [] as string[]
			allProducts.map((product) =>
				product.colors?.map((option) => colorOptions.push(option.colorName))
			)
			// return all the non duplicate color options
			const colorNames = colorOptions.filter(
				(color, idx) => colorOptions.indexOf(color) === idx
			)
			state.colors = state.colors.concat(colorNames)
		},

		filterByCategory(state, action: PayloadAction<string>) {
			let categoryName = action.payload
			state.filteredProducts = state.products.filter(
				(product) => smalify(product.category) === smalify(categoryName)
			)
		},

		filterByBrand(state, action: PayloadAction<string>) {
			let brandName = action.payload
			if (state.selectedBrands.includes(brandName)) {
				state.selectedBrands = state.selectedBrands.filter(
					(brand) => brand !== brandName
				)
			} else {
				state.selectedBrands = state.selectedBrands.concat(brandName)
			}
		},

		appyBrandFilter(state) {
			state.filteredProducts = state.selectedBrands.map((brand) => {
				return state.products.find(
					(product) => product.vendorName === brand
				) as ProductProps
			})
		},

		filterByColor(state, action: PayloadAction<string>) {
			let color = action.payload
			if (state.selectedColors.includes(color)) {
				state.selectedColors = state.selectedColors.filter(
					(colorName) => colorName !== color
				)
			} else {
				state.selectedColors = state.selectedColors.concat(color)
			}
		},

		applyColorFilter(state) {
			const selectedProducts = state.selectedColors.map((color) => {
				return state.products.find((product) =>
					product.colors?.map((colors) => colors.colorName).includes(color)
				) as ProductProps
			})
			// return all the non duplicate elements
			state.filteredProducts = selectedProducts.filter(
				(product, idx) => selectedProducts.indexOf(product) === idx
			)
		},

		filterByPrice(state, action: PayloadAction<{ min: number; max: number }>) {
			state.filteredProducts = state.products.filter(
				(product) =>
					product.price > action.payload.min &&
					product.price <= action.payload.max
			)
		},

		sortByAlphabet(state, action: PayloadAction<'ASC' | 'DESC'>) {
			let direction = action.payload
			state.filteredProducts =
				direction === 'ASC'
					? sortAsc(state.products, 'name')
					: sortDesc(state.products, 'name')
		},

		sortByPrice(state, action: PayloadAction<'ASC' | 'DESC'>) {
			let direction = action.payload
			state.filteredProducts =
				direction === 'ASC'
					? sortAsc(state.products, 'price')
					: sortDesc(state.products, 'price')
		},

		sortByTime(state) {
			state.filteredProducts = sortTime(state.products)
		},

		resetSelectedBrands(state) {
			state.selectedBrands = []
			state.filteredProducts = state.products
		},

		resetSelectedColors(state) {
			state.selectedBrands = []
			state.filteredProducts = state.products
		},

		resetFilters(state) {
			state.filteredProducts = state.products
		},

		openModal(state, action: PayloadAction<number>) {
			state.openedModals[action.payload] = true
			state.activeModal = action.payload
		},

		closeModal(state, action: PayloadAction<number>) {
			state.openedModals[action.payload] = false
			state.activeModal = 0
			state.subModal = 'main_section'
		},

		setSubModal(state, action: PayloadAction<StateProps['subModal']>) {
			state.subModal = action.payload
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchProductDetails.pending, (state) => {
				state.status = 'loading'
			})

			.addCase(fetchProductDetails.fulfilled, (state) => {
				state.status = 'finished'
			})

			.addCase(fetchProductDetails.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload?.message
			})
	},
})

function smalify(text: string) {
	return text.split(' ').join('-').toLowerCase() || text.toLowerCase()
}

function sortAsc<T>(arr: T[], field: string) {
	return arr.sort(function (a, b) {
		if (a[field as keyof T] > b[field as keyof T]) return 1
		if (b[field as keyof T] > a[field as keyof T]) return -1
		return 0
	})
}

function sortDesc<T>(arr: T[], field: string) {
	return arr.sort(function (a, b) {
		if (a[field as keyof T] > b[field as keyof T]) return -1
		if (b[field as keyof T] > a[field as keyof T]) return 1
		return 0
	})
}

function sortTime(arr: ProductProps[]) {
	return arr.sort(
		(a, b) =>
			Number(new Date(b.createdAt as Date)) -
			Number(new Date(a.createdAt as Date))
	)
}

const { actions, reducer } = productFilteringSlice

export const {
	fetchProducts,
	filterByCategory,
	filterByBrand,
	appyBrandFilter,
	resetSelectedBrands,
	filterByColor,
	applyColorFilter,
	filterByPrice,
	sortByAlphabet,
	sortByPrice,
	sortByTime,
	resetSelectedColors,
	resetFilters,
	openModal,
	closeModal,
	setSubModal,
} = actions

export default reducer
