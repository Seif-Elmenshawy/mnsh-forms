import { Router } from "express";
import * as form from "../controllers/formControllers"
import { authenticate } from "../utils/authUser";

const formRouter = Router()

formRouter.post("/create", authenticate ,form.createForm)
formRouter.post("/save/:id", authenticate, form.saveForm)
formRouter.get("/formData/:id", authenticate, form.getFormData)

export default formRouter