import { NextApiRequest, NextApiResponse } from "next"
import { withError } from "../../../middlewares/apiHandler"
import ProductModel, { IProduct } from "../../../models/productModel"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req
  if (method === "GET") {
    const product: IProduct = await ProductModel.findById(id)
    if (!product) {
      res.status(404)
      throw new Error("product not found!")
    }

    res.status(200).json({ success: true, data: product })
  }
}

export default withError(handler)
