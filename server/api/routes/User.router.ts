import express from "express";

import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", AuthMiddleware.authorize, UserController.getUsers);
router.get("/:id", AuthMiddleware.authorize, UserController.getUserById);
router.put("/:id", AuthMiddleware.authorize, UserController.updateUser);
router.delete("/:id", AuthMiddleware.authorize, UserController.deleteUser);

export default router;
