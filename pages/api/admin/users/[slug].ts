// API - PRIVATE/ADMIN
import { NextApiRequest, NextApiResponse } from "next"
import deleteUsers from "../../../../controllers/deleteUsers"
import updateUser from "../../../../controllers/updateUser"
import { withAuth } from "../../../../middlewares/apiHandler"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { slug },
    method,
  } = req

  switch (slug) {
    case "update":
      // update user information
      if (method === "PUT") await updateUser(req, res)
      break
    case "delete":
      // delete single or multiple users
      if (method === "DELETE") await deleteUsers(req, res)
      break
    default:
      res.status(500)
      throw new Error("internal server error!")
  }
}

export default withAuth(handler, "admin")
