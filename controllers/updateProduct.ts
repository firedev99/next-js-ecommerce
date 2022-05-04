import { NextApiResponse } from "next"
import ProductModel, { IProduct } from "../models/productModel"
import { CustomReqWithProps } from "../typings/types/apiParams"

type ResData = {
  success: boolean
  data: IProduct
}

export default async function updateProduct(
  req: CustomReqWithProps<IProduct>,
  res: NextApiResponse<ResData>
) {
  const {
    body: {
      name,
      price,
      category,
      description,
      imageSrc,
      sideImagesSrc,
      colors,
      sizes,
      rating,
      featuring,
      features,
      gender,
      countInStock,
      vendorName,
    },
    query: { id },
  } = req

  try {
    // check if the product exists
    const product: IProduct = await ProductModel.findById(id)
    if (product) {
      product._id = id
      product.name = name
      product.price = price
      product.category = category
      product.description = description
      product.imageSrc = imageSrc
      product.sideImagesSrc = sideImagesSrc
      product.colors = colors
      product.sizes = sizes
      product.rating = rating
      product.featuring = featuring
      product.features = features
      product.gender = gender
      product.countInStock = countInStock
      product.vendorName = vendorName

      // save product update if changed
      const updatedProduct = await product.save()
      return res.status(201).json({ success: true, data: updatedProduct })
    }
  } catch (error) {
    res.status(404)
    throw new Error("product not found!")
  }
}
