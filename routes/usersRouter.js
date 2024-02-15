import express from "express";
import controller from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import userSchema from "../schemas/userSchemas.js";
const router = express.Router();

router.post(
  "/register",
  validateBody(userSchema.userSchema),
  controller.registration
);

router.post("/login", validateBody(userSchema.userSchema), controller.login);
export default router;
