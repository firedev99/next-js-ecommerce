// API - PRIVATE/ADMIN

import { NextApiRequest, NextApiResponse } from "next"
import createProduct from "../../../../controllers/createProduct"
import { withAuth } from "../../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await createProduct(req, res)
  }
}

export default withAuth(handler, "admin")
