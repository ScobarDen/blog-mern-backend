import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 50 }),
  body("fullName").isLength({ min: 3, max: 50 }),
  body("avatarUrl").optional().isURL(),
];
