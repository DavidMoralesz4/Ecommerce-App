import 'dotenv/config'

export const { PORT = 3001 } = process.env
export const MONGO_URI = process.env.MONGO_URI
export const SECRET_KEY = process.env.SECRET_KEY || 'defaultkeyverysecurityandlong'
