// API - PRIVATE/ADMIN

import { NextApiRequest, NextApiResponse } from "next"
import { withAuth } from "../../../../middlewares/apiHandler"
import orderModel, { IOrder } from "../../../../models/orderModel"

type ResData = {
  success: boolean
  data: IOrder[]
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
  if (req.method === "GET") {
    const orderList: IOrder[] = await orderModel.find({})
    return res.status(200).status(200).json({ success: true, data: orderList })
  }
}

export default withAuth(handler, "admin")
