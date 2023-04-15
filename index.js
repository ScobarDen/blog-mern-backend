import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import {
  commentCreateValidation,
  loginValidations,
  postCreateValidation,
  registerValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js";
import * as fs from "fs";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("upload")) {
      fs.mkdirSync("upload");
    }
    cb(null, "upload");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(express.static("upload"));

app.post(
  "/auth/login",
  loginValidations,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.post(
  "/comments/:id",
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.create
);
app.get("/comments", CommentController.getLast);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
