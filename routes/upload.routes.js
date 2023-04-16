import express from "express";
import { checkAuth } from "../middleware/index.js";
import multer from "multer";
import fs from "fs";
const router = express.Router({ mergeParams: true });

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

router.post("/", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url:
      process.env.NODE_ENV === "development"
        ? `upload/${req.file.originalname}`
        : `/upload/${req.file.originalname}`, // TODO: refactor this
  });
});

export default router;
