import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express"

dotenv.config()

const secret = process.env.JWT_SECRET || "Super secret JWT_SECRET"

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Token is expired" })
  }

  try {
    const decoded = jwt.verify(token, secret)
    req.user = decoded as {
      user: {
        id: string
        userName: string
        email: string
        password: string
        created_at: string
        updated_at: string
      }
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}
