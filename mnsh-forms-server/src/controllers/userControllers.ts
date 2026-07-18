import pool from "../config/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { jwtGen } from "../utils/jwtGenerator";

export const signup = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body

  try {
    const isUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if (isUser.rowCount != 0) {
      return res.status(401).json({ message: "User Already Exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 7)
    const user = await pool.query("INSERT INTO users (userName, email, password) VALUES($1,$2,$3) RETURNING *", [userName, email, hashedPassword])

    const token = jwtGen(user.rows[0])

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure:true,
      maxAge: 365 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: "User Created Successfully", data: user.rows[0] })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const getUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if (getUser.rowCount == 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, getUser.rows[0].password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" })
    }
    const token = jwtGen(getUser.rows[0])
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure:true,
      maxAge: 365 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: "User Logged in successfully", data: getUser.rows[0], token })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const verifyMe = async (req: Request, res: Response) => {
  const user = req.user?.user
  return res.status(200).json({ message: "User Authenticated Successfully", user })
}
