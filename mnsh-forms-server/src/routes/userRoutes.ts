import { Router, Request, Response } from "express";
import * as user from "../controllers/userControllers"
import { authenticate } from "../utils/authUser";

const userRouter = Router()

userRouter.get("/", (req: Request, res: Response) => {
  res.send("user routes")
})
userRouter.post("/signup", user.signup)
userRouter.post("/login", user.login)
userRouter.post("/verify", authenticate, user.verifyMe)

export default userRouter
