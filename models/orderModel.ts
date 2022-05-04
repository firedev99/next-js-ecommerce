import { Schema, Document, model, models } from "mongoose"
import { IProduct } from "./productModel"
import { IUser } from "./userModel"

export interface IOrderItem {
  name: string
  quantity: number
  imageSrc: string
  price: number
  product: IProduct["_id"]
}

export interface IShippingAddress {
  address: string
  city: string
  postalCode: number
  country: string
  number: number
  email: IUser["email"]
}

export interface IPaymentResult {
  status: string
  email: IUser["email"]
  paymentMethod: string
  totalPrice: number
  paidAt: Date
}

export interface IOrder extends Document {
  user: IUser["_id"]
  orderItems: IOrderItem[]
  shippingAddress: IShippingAddress
  paymentResult: IPaymentResult
  isPaid: boolean
  isDelivered: string
  deliveredAt: Date
  createdAt: Date
}

// item schema for order ~ cart item ~
const cartItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

// individual order schema
const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [cartItemSchema],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  paymentResult: {
    status: {
      type: String,
      required: true,
      default: "Order Accepted!",
    },
    email: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
      default: new Date(),
    },
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDelivered: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  deliveredAt: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export default models.Order || model<IOrder>("Order", orderSchema)
