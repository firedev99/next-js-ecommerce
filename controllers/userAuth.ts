import { NextApiRequest, NextApiResponse } from "next"
import generateToken from "../lib/generateToken"
// user model
import UserModel, { IUser } from "../models/userModel"
import UserType from "../typings/types/user"

interface CustomRequest<T> extends NextApiRequest {
  body: T
}

type ResData = {
  success: boolean
  data: UserType & {
    token: any
  }
}

export default async function userAuth(
  req: CustomRequest<IUser>,
  res: NextApiResponse<ResData>
): Promise<void> {
  const { email, password } = req.body
  const user: IUser = await UserModel.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    })
  } else {
    res.status(401)
    throw new Error("invalid email or password!")
  }
}
