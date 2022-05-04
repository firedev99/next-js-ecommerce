// import { IProductOptions, IReview } from '../../models/productModel'
import { ProductColorOption, ProductReviewProps } from "../interfaces/mains"

type ProductType = {
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

export default ProductType
