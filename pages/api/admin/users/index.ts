// API - PRIVATE/ADMIN
import { NextApiRequest, NextApiResponse } from "next"
import { withAuth } from "../../../../middlewares/apiHandler"
import UserModel, { IUser } from "../../../../models/userModel"
import UserType from "../../../../typings/types/user"

type ResData = {
  success: boolean
  data: UserType[]
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
  if (req.method === "GET") {
    const users: IUser[] = await UserModel.find({})
    return res.status(200).json({ success: true, data: users })
  }
}

export default withAuth(handler, "admin")
