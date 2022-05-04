import { NextApiResponse } from "next"
import { withAuth } from "../../../../middlewares/apiHandler"
import OrderModel, { IOrder } from "../../../../models/orderModel"
import { CustomReqWithUser } from "../../../../typings/types/apiParams"

type ResData = {
  success: boolean
  data?: IOrder
}

async function handler(req: CustomReqWithUser, res: NextApiResponse<ResData>) {
  const {
    method,
    query: { id },
  } = req

  if (method === "GET") {
    const orderInformation: IOrder = await OrderModel.findById(id)

    if (!orderInformation) {
      res.status(404)
      throw new Error("no order with this id was found!")
    }

    // check if the user and the order creater are same or not
    if (String(orderInformation.user) !== String(req.user?._id)) {
      res.status(403)
      throw new Error("you're not allowed to view this content!")
    }

    res.status(200).json({ success: true, data: orderInformation })
  }
}

export default withAuth(handler)
