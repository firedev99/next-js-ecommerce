import { NextApiResponse } from 'next'
import UserModel, { IUser } from '../models/userModel'
import { CustomReqWithProps } from '../typings/types/apiParams'

type ResData = {
    success: boolean
    data: IUser
}

export default async function updateUser(
    req: CustomReqWithProps<IUser>,
    res: NextApiResponse<ResData>
) {
    const {
        body: { email, firstName, lastName, isAdmin },
        query: { id },
    } = req

    // check if the user exists
    const user: IUser = await UserModel.findById(id)
    if (!user) {
        res.status(404)
        throw new Error('user not found!')
    }
    user.email = email || user.email
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.isAdmin = isAdmin

    // save updated information
    const updatedUser = await user.save()
    return res.status(201).json({ success: true, data: updatedUser })
}
