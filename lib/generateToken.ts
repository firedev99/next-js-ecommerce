import jwt from 'jsonwebtoken'

const { JWT_KEY } = process.env

export default function generateToken(id: string) {
    return jwt.sign({ id }, JWT_KEY, {
        expiresIn: '10d',
    })
}
