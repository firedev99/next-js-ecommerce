// API - PUBLIC
import { NextApiRequest, NextApiResponse } from "next"
import { withError } from "../../../middlewares/apiHandler"
import ProductModel, { IProduct } from "../../../models/productModel"

type ResData = {
  success: boolean
  data: IProduct[]
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
  if (req.method === "GET") {
    // get all products list
    const products: IProduct[] = await ProductModel.find({
      featuring: true,
    })
    return res.status(200).json({ success: true, data: products })
  }
}

export default withError(handler)
