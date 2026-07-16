import { Router, Request, Response } from "express";
import { signup, login } from "../controllers/userControllers"

const userRouter = Router()

userRouter.get("/", (req: Request, res: Response) => {
  res.send("user routes")
})
userRouter.post("/signup", signup)
userRouter.post("/login", login)

export default userRouter
