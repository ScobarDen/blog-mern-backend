import express from "express";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { commentCreateValidation } from "../validations.js";
import { CommentController } from "../controllers/index.js";
const router = express.Router({ mergeParams: true });

router.post(
  "/:id",
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.create
);
router.get("/", CommentController.getLast);

export default router;
