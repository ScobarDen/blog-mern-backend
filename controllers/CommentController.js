import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = new CommentModel({
      text: req.body.text,
      user: req.userId,
      post: postId,
    });
    const comment = await doc.save();

    PostModel.findByIdAndUpdate(
      postId,
      {
        $inc: { commentsCount: 1 },
        $push: { comments: comment._id },
      },
      async (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось получить статью",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }
        await comment.populate('user');
        res.json(comment);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

export const getLast = async (req, res) => {
  try {
    const comments = await CommentModel.find().limit(5).populate('user').exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комменты",
    });
  }
};
