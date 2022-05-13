import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"
import authReducer from "./slices/authSlice"
import cursorReducer from "./slices/cursorSlice"
import dndReducer from "./slices/dndSlice"
import adminProductReducer from "./slices/adminProductSlice"
import notificationReducer from "./slices/notificationSlice"
import generalProductReducer from "./slices/generalProductSlice"
import productFilteringSlice from "./slices/productFilteringSlice"
import featureReducer from "./slices/featureSlice"

// store configuration
const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    cursor: cursorReducer,
    notication: notificationReducer,
    dnd: dndReducer,
    features: featureReducer,
    admin_product: adminProductReducer,
    general_product: generalProductReducer,
    product_filtering: productFilteringSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
