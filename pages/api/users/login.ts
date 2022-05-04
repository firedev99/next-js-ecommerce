// API - PUBLIC
import { NextApiRequest, NextApiResponse } from "next"
import userAuth from "../../../controllers/userAuth"
import { withError } from "../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await userAuth(req, res)
  }
}

// withError HOC for managing error
export default withError(handler)
