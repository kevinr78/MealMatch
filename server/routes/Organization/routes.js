import { Router } from "express";
import { login, register } from "../../controllers/Organization/Auth/index.js";
const organizationRouter = Router();

organizationRouter.post("/register", register);
organizationRouter.post("/login", login);

export default organizationRouter;
