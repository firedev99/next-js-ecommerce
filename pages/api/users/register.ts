// API - PUBLIC
import { NextApiRequest, NextApiResponse } from "next"
import registerUser from "../../../controllers/registerUser"
import { withError } from "../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await registerUser(req, res)
  }
}

// withError HOC for managing error
export default withError(handler)
