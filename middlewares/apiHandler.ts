import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../lib/dbConnect'
import { CustomReqWithUser } from '../typings/types/apiParams'
import authHandler from './authHandler'
import errorHandler from './errorHandler'
import roleHandler from './roleHandler'

type TRole = 'general' | 'admin'

export function withAuth(handler: NextApiHandler, role: TRole = 'general') {
    return async (req: CustomReqWithUser, res: NextApiResponse) => {
        try {
            await dbConnect()
            await authHandler(req, res)
            if (role !== 'general') {
                await roleHandler(req, res)
            }
            await handler(req, res)
        } catch (error: any) {
            errorHandler(error, res)
        }
    }
}

export function withError(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await dbConnect()
            await handler(req, res)
        } catch (error: any) {
            errorHandler(error, res)
        }
    }
}
