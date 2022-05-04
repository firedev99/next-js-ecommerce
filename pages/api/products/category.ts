import { NextApiRequest, NextApiResponse } from "next"
import { withError } from "../../../middlewares/apiHandler"
import ProductModel, { IProduct } from "../../../models/productModel"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { type, limit },
  } = req
  const _type = (type as string)
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join(" ")

  if (method === "GET") {
    const products: IProduct[] = limit
      ? await ProductModel.find({
          category: _type,
        }).limit(Number(limit))
      : await ProductModel.find({
          category: _type,
        })

    return res.status(200).json({ success: true, data: products })
  }
}

export default withError(handler)
