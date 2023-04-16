import express from "express";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { loginValidations, registerValidation } from "../validations.js";
import { UserController } from "../controllers/index.js";
const router = express.Router({ mergeParams: true });

router.post(
  "/login",
  loginValidations,
  handleValidationErrors,
  UserController.login
);
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.get("/me", checkAuth, UserController.getMe);

export default router;
