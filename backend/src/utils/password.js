import bcrypt from 'bcrypt'

export const encrypt = async (password) => {
    const hashed = await bcrypt.hash(password,10)
    return hashed
}

export const compare = async (password, hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}