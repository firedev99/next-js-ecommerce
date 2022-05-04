// API - PUBLIC
import { Query } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { withError } from "../../../middlewares/apiHandler"
import productModel from "../../../models/productModel"
import ProductModel from "../../../models/productModel"
import { ProductProps } from "../../../typings/interfaces/mains"

type ResData = {
  success: boolean
  data: ProductProps[]
  productCount: number
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
  if (req.method === "GET") {
    const {
      query: { turn },
    } = req

    // number of items to be displayed
    const ITEMS_PER_PAGE = 20
    // number of items to be skiped
    const skip = (Number(turn) - 1) * ITEMS_PER_PAGE

    // number of total documents
    const productCountPromise = ProductModel.estimatedDocumentCount({})

    // get all product items list
    const dataPromise = turn
      ? (ProductModel.find({}).limit(ITEMS_PER_PAGE).skip(skip) as Query<
          ProductProps[],
          any,
          {},
          any
        >)
      : productModel.find({})

    const [productCount, products] = await Promise.all([
      productCountPromise,
      dataPromise,
    ])

    return res.status(200).json({ success: true, data: products, productCount })
  }
}

export default withError(handler)
