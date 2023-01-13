import CommentModel from "../models/Comment";
import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const { id } = req.params.id;
    const doc = new CommentModel({
      text: req.body.text,
      user: req.userId,
    });
    const comment = await doc.save();

    try {
      await PostModel.findByIdAndUpdate(id, {
        $push: { comments: comment._id },
      })
    } catch (error) {
      res.status(500).json({
        message: "Не удалось создать комментарий",
      });
      console.log(error)
    }

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find().exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комменты",
    });
  }
};


