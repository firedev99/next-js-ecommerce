import { NextApiResponse } from 'next'
import { CustomError } from '../typings/types/extendedTypes'

const { NODE_ENV } = process.env

export default function errorHandler(error: CustomError, res: NextApiResponse) {
    const errorProps: CustomError = {
        success: false,
        name: error.name,
        message: error.message,
        status: res.statusCode === 200 ? 500 : res.statusCode,
        stack: NODE_ENV === 'production' ? '' : error.stack,
    }
    return res.status(errorProps.status).json(errorProps)
}
