import express from "express";
import { PostController } from "../controllers/index.js";
const router = express.Router({ mergeParams: true });

router.get("/", PostController.getLastTags);

export default router;
