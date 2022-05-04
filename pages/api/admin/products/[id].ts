// API - PRIVATE/ADMIN
import { NextApiRequest, NextApiResponse } from "next"
import ProductModel, { IProduct } from "../../../../models/productModel"
import deleteProduct from "../../../../controllers/deleteProduct"
import updateProduct from "../../../../controllers/updateProduct"
import { withAuth } from "../../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req

  switch (method) {
    case "GET":
      const product: IProduct = await ProductModel.findById(id)
      if (!product) {
        res.status(404)
        throw new Error("product not found!")
      }
      res.status(200).json({ success: true, data: product })
      break
    case "PUT":
      // update product
      await updateProduct(req, res)
      break
    case "DELETE":
      // delete a product
      await deleteProduct(req, res)
      break
    default:
      res.status(500)
      throw new Error("internal server error!")
  }
}

export default withAuth(handler, "admin")
