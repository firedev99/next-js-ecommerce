// API - PRIVATE/ADMIN
import { NextApiRequest, NextApiResponse } from "next"
import deleteOrder from "../../../../controllers/deleteOrder"
import updateOrder from "../../../../controllers/updateOrder"
import { withAuth } from "../../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { slug },
    method,
  } = req
  switch (slug) {
    case "update":
      if (method === "PUT") await updateOrder(req, res)
      break
    case "delete":
      if (method === "DELETE") await deleteOrder(req, res)
    default:
      res.status(500)
      throw new Error("internal server error!")
  }
}

export default withAuth(handler, "admin")
