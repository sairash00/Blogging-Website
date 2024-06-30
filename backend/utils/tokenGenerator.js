import jwt from 'jsonwebtoken'

export const generateToken = (data) => {
    return jwt.sign(data, "access_token")
}

export const decodeToken = (token) => {
    return jwt.verify(token, "access_token")
}