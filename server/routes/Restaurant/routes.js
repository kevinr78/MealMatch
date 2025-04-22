import { Router } from "express";
import { login, register } from "../../controllers/Restaurant/Auth/index.js";
const restaurantRouter = Router();

restaurantRouter.post("/register", register);
restaurantRouter.post("/login", login);

export default restaurantRouter;
