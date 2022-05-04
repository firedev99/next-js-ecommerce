import { NextApiRequest, NextApiResponse } from "next"
import UserModel, { IUser } from "../models/userModel"

type ResData = {
  success: boolean
  message: string
}

export default async function deleteUsers(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { ids } = req.query

  // if query param has multiple ids, delete multiple users
  if (ids.includes(",")) {
    const _ids = (ids as string).split(",")
    // check if all of the users exists
    const users: IUser[] = await UserModel.find({ _id: _ids })
    if (users) {
      // delete users
      await UserModel.deleteMany({ _id: _ids })
      return res.status(200).json({ success: true, message: "users deleted!" })
    }
  }

  // check if user exists
  const user: IUser = await UserModel.findById(ids)
  if (!user) {
    res.status(404)
    throw new Error("user not found!")
  }
  // remove user
  await user.remove()
  return res.status(200).json({ success: true, message: "user deleted!" })
}
