import { NextApiResponse } from "next"
import productModel, { IProduct } from "../models/productModel"
import { CustomReqWithUserBody } from "../typings/types/apiParams"

type ResData = {
  success: boolean
  data?: IProduct
  error?: any
}

export default async function createProduct(
  req: CustomReqWithUserBody<IProduct>,
  res: NextApiResponse<ResData>
) {
  const {
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
  } = req.body

  try {
    // cretate new product using new method
    const product: IProduct = new productModel({
      user: req.user?._id,
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
    })

    const createdProduct = await product.save()
    return res.status(201).json({ success: true, data: createdProduct })
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error?.errors })
  }
}
