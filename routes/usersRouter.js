import express from "express";
import controller from "../controllers/usersControllers";
import validateBody from "../helpers/validateBody";
import userSchema from "../schemas/userSchemas";
const router = express.Router();

router.post(
  "/register",
  validateBody(userSchema.userSchema),
  controller.registration
);

export default router;
