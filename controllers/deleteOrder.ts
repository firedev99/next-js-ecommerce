import { NextApiRequest, NextApiResponse } from "next"
import OrderModel, { IOrder } from "../models/orderModel"

type ResData = {
  success: boolean
  message: string
}

export default async function deleteOrder(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { ids } = req.query

  // if query param has multiple ids, delete multiple orders
  if (ids.includes(",")) {
    const _ids = (ids as string).split(",")
    // check if all of the orders exists
    const orders: IOrder[] = await OrderModel.find({ _id: _ids })
    if (orders) {
      // delete users
      await OrderModel.deleteMany({ _id: _ids })
      return res
        .status(200)
        .json({ success: true, message: "orders has been deleted!" })
    }
  }

  // check if the query param with a single id exits
  const order: IOrder = await OrderModel.findById(ids)
  if (!order) {
    res.status(404)
    throw new Error("order with this id was not found!")
  }

  // remove the order
  await order.remove()
  return res
    .status(200)
    .json({ success: true, message: "order has been deleted!" })
}
