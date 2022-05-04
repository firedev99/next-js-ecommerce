import { NextApiResponse } from 'next'
import generateToken from '../lib/generateToken'
import UserModel, { IUser } from '../models/userModel'
import { CustomReqWithProps } from '../typings/types/apiParams'
import UserType from '../typings/types/user'

type ResData = {
    success: boolean
    data: UserType & {
        token: any
    }
}

export async function updateProfile(
    req: CustomReqWithProps<IUser>,
    res: NextApiResponse<ResData>
) {
    const {
        body: { email, password, firstName, lastName },
        query: { id },
    } = req

    // check if the user exists
    const user: IUser = await UserModel.findById(id)
    if (user) {
        user.email = email || user.email
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        // if password has changed update password
        if (password) user.password = password

        // save updated informations of the user
        const updatedUser = await user.save()
        return res.status(201).json({
            success: true,
            data: {
                _id: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                token: generateToken(updatedUser.id),
            },
        })
    } else {
        res.status(404)
        throw new Error('user not found!')
    }
}
