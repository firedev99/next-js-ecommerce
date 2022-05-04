import { NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
// API types with custom param
import { CustomReqWithUser } from '../typings/types/apiParams'
// model
import UserModel from '../models/userModel'

const { JWT_KEY } = process.env

// interface for jwt token response (decoded object id...)
interface IDecoded {
    id: string
    iat: number
    exp: number
}

export default async function authHandler(
    req: CustomReqWithUser,
    res: NextApiResponse
) {
    let token

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
            const decoded = <IDecoded>jwt.verify(token, JWT_KEY)
            req.user = await UserModel.findById(decoded.id).select('-password')
        }

        // if no token found
        if (!token) {
            res.status(401)
            throw new Error('not authorized!')
        }
    } catch (error: any) {
        res.status(401)
        throw new Error('not authorized!')
    }
}
