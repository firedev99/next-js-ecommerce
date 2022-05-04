import { NextApiResponse } from "next"
import orderModel, { IOrder } from "../models/orderModel"
import { CustomReqWithProps } from "../typings/types/apiParams"

type ResData = {
  success: boolean
  data: IOrder
}

export default async function updateOrder(
  req: CustomReqWithProps<IOrder>,
  res: NextApiResponse<ResData>
) {
  const {
    body: { orderItems, shippingAddress, paymentResult, isPaid, isDelivered },
    query: { id },
  } = req

  try {
    const orderInformation: IOrder = await orderModel.findById(id)

    if (!orderInformation) {
      res.status(404)
      throw new Error("order not found!")
    }

    orderInformation.orderItems = orderItems
    orderInformation.shippingAddress = shippingAddress
    orderInformation.paymentResult = paymentResult
    orderInformation.isPaid = isPaid
    orderInformation.isDelivered = isDelivered

    const updatedOrderInformation = await orderInformation.save()
    return res
      .status(201)
      .json({ success: true, data: updatedOrderInformation })
  } catch (error) {
    res.status(401)
    throw new Error(String(error))
  }
}
