export interface User {
  _id?: any
  email: string
  password?: string
  firstName: string
  lastName: string
  isAdmin?: boolean
  createdAt?: Date
  token?: any
}

export interface FireyErrors {
  success: boolean
  name?: string
  message: string
  status?: number
  stack?: string
}

export interface AuthState {
  user: User | null
  status: "loading" | "finished" | "idle" | "error"
  error: FireyErrors["message"] | undefined
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegistrationRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserResponse {
  success: boolean
  data: User
}

export interface ProductResponse {
  success: boolean
  data: ProductProps
}

export interface SpecificProductAsResponse {
  success: boolean
  data: ProductProps
}

export interface AllProductsResponse {
  success: boolean
  data: ProductProps[]
}

export interface ProductWithLimitResponse {
  success: boolean
  data: ProductProps[]
  productCount: number
}

export interface ProductColorOption {
  colorName: string
  imageSrc: string
}

export interface ProductFormState {
  name: string
  price: number
  vendorName?: string
  category: string
  description: string
  sizes?: string[]
  gender: string
  featuring: boolean
  countInStock: number
  features?: string[]
}

export interface ProductReviewProps {
  name: string
  rating: number
  comment: string
  user: string
}

// product related interfaces
export interface ProductProps {
  _id: string
  user?: string
  name: string
  bigName?: string
  price: number
  vendorName?: string
  imageSrc: string
  hoveringImage?: string
  category: string
  description: string
  sideImagesSrc?: string[]
  rating: number
  sizes?: string[]
  gender: string
  featuring: boolean
  colors?: ProductColorOption[]
  countInStock: number
  features?: string[]
  createdAt?: Date
  updatedAt?: Date
  reviews?: ProductReviewProps[]
  numReviews?: number
}

export interface ProductAssetProps {
  imageSrc: string
  color?: string
}

export interface MainSliderProps {
  bigText: string
  imageSrc: string
  message: string
}
