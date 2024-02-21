import express from "express";
import controller from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import userSchema from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchema.userSchema),
  controller.registration
);

router.post("/login", validateBody(userSchema.userSchema), controller.login);
router.post("/logout", authenticate, controller.logout);
router.get("/current", authenticate, controller.current);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);
export default router;
