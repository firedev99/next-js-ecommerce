// API - PRIVATE / USER
import { NextApiResponse } from "next"
import { updateProfile } from "../../../controllers/updateProfile"
import { withAuth } from "../../../middlewares/apiHandler"
import UserModel, { IUser } from "../../../models/userModel"
import { CustomReqWithUser } from "../../../typings/types/apiParams"
import UserType from "../../../typings/types/user"

type ResData = {
  success: boolean
  data: UserType
}

async function handler(req: CustomReqWithUser, res: NextApiResponse<ResData>) {
  const {
    method,
    query: { id },
  } = req

  switch (method) {
    case "GET":
      try {
        const user: IUser = await UserModel.findById(id)
        if (req.user?.id !== id) {
          res.status(401)
          throw new Error("your're not allowed to visit this api!")
        }

        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(401)
        throw new Error("you're not allowed to visit this api!")
      }
      break
    case "PUT":
      await updateProfile(req, res)
      break
    default:
      res.status(500)
      throw new Error("internal server error!")
  }
}

export default withAuth(handler)
