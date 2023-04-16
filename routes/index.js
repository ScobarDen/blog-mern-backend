import express from "express";
import authRoutes from "./auth.routes.js";
import commentsRoutes from "./comments.routes.js";
import postsRoutes from "./posts.routes.js";
import tagsRoutes from "./tags.routes.js";
import uploadRoutes from "./upload.routes.js";
const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/comments", commentsRoutes);
router.use("/tags", tagsRoutes);
router.use("/posts", postsRoutes);
router.use("/upload", uploadRoutes);

export default router;
