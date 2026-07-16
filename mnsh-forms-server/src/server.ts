import express, { Request, Response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import pool from "./config/db"
import userRouter from "./routes/userRoutes"

dotenv.config()
const app = express()
app.use(morgan("dev"))
app.use(express.json())
const port = process.env.PORT || 3000

pool.connect()
  .then(() => console.log("DB connected scucessfully"))
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`)
    })
  })
  .catch((error: Error) => console.error(error))

app.get("/", (req: Request, res: Response) => {
  res.send("mnsh is greeting")
})

//routes
app.use("/user", userRouter)
