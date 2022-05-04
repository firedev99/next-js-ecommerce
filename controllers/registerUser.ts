import { NextApiResponse } from "next"
import generateToken from "../lib/generateToken"
import UserModel, { IUser } from "../models/userModel"
import { CustomReqWithProps } from "../typings/types/apiParams"
import UserType from "../typings/types/user"

type ResData = {
  success: boolean
  data: UserType & {
    token: any
  }
}

export default async function registerUser(
  req: CustomReqWithProps<IUser>,
  res: NextApiResponse<ResData>
): Promise<void> {
  const { email, password, firstName, lastName } = req.body
  // check if the user already exists
  const userExists: IUser = await UserModel.findOne({ email })

  // if user already exists, throw an error!
  if (userExists) {
    res.status(400)
    throw new Error("user already exists!")
  }

  // if any property is empty, throw an error!
  if (!email || !password || !firstName || !lastName) {
    res.status(400)
    throw new Error("invalid information")
  }

  // create a new user
  const user: IUser = await UserModel.create({
    email,
    password,
    firstName,
    lastName,
  })

  // if user is created, send back user data as response
  if (user) {
    return res.status(201).json({
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
  }
}
