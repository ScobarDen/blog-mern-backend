import express from "express";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { postCreateValidation } from "../validations.js";
import { PostController } from "../controllers/index.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(PostController.getAll)
  .post(
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
  );
router
  .route("/:id")
  .get(PostController.getOne)
  .delete(checkAuth, PostController.remove)
  .patch(
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
  );
router.get("/tags", PostController.getLastTags);

export default router;
