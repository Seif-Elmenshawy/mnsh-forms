import { Router, Request, Response } from "express";

const userRouter = Router()

userRouter.get("/", (req: Request, res: Response) => {
  res.send("user routes")
})

export default userRouter
