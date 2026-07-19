import { Router } from "express";
import * as form from "../controllers/formControllers"
import { authenticate } from "../utils/authUser";

const formRouter = Router()

formRouter.post("/create", authenticate ,form.createForm)
formRouter.post("/edit/:id", authenticate, form.editForm)
formRouter.get("/get-forms", authenticate, form.fetchForms)

export default formRouter