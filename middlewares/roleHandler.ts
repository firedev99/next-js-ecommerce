import { NextApiResponse } from 'next'
import { CustomReqWithUser } from '../typings/types/apiParams'

export default async function roleHandler(
    req: CustomReqWithUser,
    res: NextApiResponse
) {
    // check if the logged in user is an admin
    const isAdmin = req.user && req.user.isAdmin
    // user is not admin
    if (!isAdmin) {
        res.status(401)
        throw new Error('not authorized as admin!')
    }
}
