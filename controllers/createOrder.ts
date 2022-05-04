import { NextApiResponse } from "next"
import orderModel, { IOrder } from "../models/orderModel"
import { CustomReqWithUserBody } from "../typings/types/apiParams"

type ResData = {
  success: boolean
  data?: IOrder
  error?: any
}

export default async function createOrder(
  req: CustomReqWithUserBody<IOrder>,
  res: NextApiResponse<ResData>
) {
  const { orderItems, shippingAddress, isPaid, paymentResult } = req.body

  try {
    const order: IOrder = new orderModel({
      user: req.user?.id,
      orderItems,
      shippingAddress,
      isPaid,
      paymentResult,
    })

    // create new order
    const createdOrder = await order.save()
    return res.status(201).json({ success: true, data: createdOrder })
  } catch (error: any) {
    return res.status(400).json({ success: false, error })
  }
}
