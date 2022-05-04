// API - PRIVATE/ADMIN

import { NextApiRequest, NextApiResponse } from "next"
import createOrder from "../../../../controllers/createOrder"
import { withAuth } from "../../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await createOrder(req, res)
  }
}

export default withAuth(handler, "admin")
