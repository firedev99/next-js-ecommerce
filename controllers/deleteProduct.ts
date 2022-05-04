import { NextApiRequest, NextApiResponse } from "next"
import ProductModel, { IProduct } from "../models/productModel"

type ResData = {
  success: boolean
  message: string
}

export default async function deleteProduct(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { id } = req.query

  // check if the product exists
  const product: IProduct = await ProductModel.findById(id)
  if (product) {
    // remove product
    await product.remove()
    return res.status(200).json({ success: true, message: "product deleted!" })
  } else {
    res.status(404)
    throw new Error("product not found!")
  }
}
