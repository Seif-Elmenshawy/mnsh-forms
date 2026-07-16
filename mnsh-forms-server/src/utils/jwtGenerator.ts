import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()
const secret = process.env.JWT_SECRET || "super-secret-jwtSecret"

export function jwtGen(user: Object) {
  const token = jwt.sign({ user: user }, secret, { expiresIn: 365 * 24 * 60 * 60 })
  return token
}
