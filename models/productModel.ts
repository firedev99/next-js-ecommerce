import { Schema, Document, model, models } from "mongoose"
import { IUser } from "./userModel"

// interfaces
export interface IReview {
  name: string
  rating: number
  comment: string
  user: IUser["_id"]
}

export interface IProductOptions {
  colorName: string
  imageSrc: string
}

// main product interface
export interface IProduct extends Document {
  user: IUser["_id"]
  name: string
  bigName?: string
  category: string
  price: number
  description: string
  imageSrc: string
  hoveringImage?: string
  sideImagesSrc?: string[]
  colors?: IProductOptions[]
  sizes?: string[]
  rating: number
  gender: string
  featuring?: boolean
  reviews?: IReview[]
  numReviews?: number
  vendorName?: string
  countInStock?: number
  features?: string[]
  createdAt: Date
}

// review schema
const reviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

// color schema
const colorSchema = new Schema<IProductOptions>({
  colorName: {
    type: String,
  },
  imageSrc: {
    type: String,
  },
})

// main product schema
const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    bigName: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    hoveringImage: {
      type: String,
    },
    colors: [colorSchema],
    sideImagesSrc: [String],
    rating: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    vendorName: {
      type: String,
    },
    featuring: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      default: 1,
    },
    reviews: [reviewSchema],
    sizes: [String],
    features: [String],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

export default models.Product || model<IProduct>("Product", productSchema)
