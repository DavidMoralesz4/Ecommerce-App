import dotenv from 'dotenv'

dotenv.config()

export const { PASSWORD, MONGO_URI, SECRET_KEY, PORT } = process.env

