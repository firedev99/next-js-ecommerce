import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps } from "../../../typings/interfaces/mains"

interface CartProps extends ProductProps {
  quantity: number
  chosenSize: string
  chosenColor?: string
}

interface StateProps {
  cart: CartProps[]
  wishlist: ProductProps[]
  cartModal: boolean
  cartNavigator: boolean
  confirmationID: string
}

const initialState = {
  cart:
    typeof window !== "undefined" && window.localStorage.getItem("cart")
      ? JSON.parse(window.localStorage.getItem("cart") || "[]")
      : [],
  wishlist:
    typeof window !== "undefined" && window.localStorage.getItem("wishlist")
      ? JSON.parse(window.localStorage.getItem("wishlist") || "[]")
      : [],
  cartModal: false,
  cartNavigator: true,
  confirmationID: "",
} as StateProps

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProps>) {
      let product = action.payload
      const exists = state.cart.find((item) => item._id === product._id)

      // increment by 1 if the product already exists in the cart
      if (exists) {
        state.cart = state.cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        state.cart = state.cart.concat({ ...product, quantity: 1 })
      }

      if (!state.cartNavigator) state.cartNavigator = true

      typeof window !== "undefined" &&
        localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    removeFromCart(state) {
      state.cart = state.cart.filter(
        (item) => item._id !== state.confirmationID
      )

      typeof window !== "undefined" &&
        localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    setConfirmationID(state, action: PayloadAction<string>) {
      state.confirmationID = action.payload
    },

    addQuantity(state, action: PayloadAction<string>) {
      let product = action.payload

      state.cart = state.cart.map((item) =>
        item._id === product ? { ...item, quantity: item.quantity + 1 } : item
      )

      typeof window !== "undefined" &&
        localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    removeQuantity(state, action: PayloadAction<string>) {
      let product = action.payload

      state.cart = state.cart.map((item) =>
        item._id === product ? { ...item, quantity: item.quantity - 1 } : item
      )

      typeof window !== "undefined" &&
        localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    saveToWishlist(state, action: PayloadAction<ProductProps>) {
      let product = action.payload
      const exists = state.wishlist.find((item) => item._id === product._id)
      if (exists) {
        state.wishlist = state.wishlist.map((item) =>
          item._id === product._id ? item : item
        )
      } else {
        state.wishlist = state.wishlist.concat(product)
      }

      typeof window !== "undefined" &&
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
    },

    closeNavigator(state) {
      state.cartNavigator = false
    },

    openCartModal(state) {
      state.cartModal = true
      if (state.cartNavigator) state.cartNavigator = false
    },

    closeCartModal(state) {
      state.cartModal = false
      if (state.cart.length) state.cartNavigator = true
    },
  },
})

const { actions, reducer } = featureSlice

export const {
  addToCart,
  removeFromCart,
  setConfirmationID,
  addQuantity,
  removeQuantity,
  saveToWishlist,
  closeNavigator,
  openCartModal,
  closeCartModal,
} = actions

export default reducer
