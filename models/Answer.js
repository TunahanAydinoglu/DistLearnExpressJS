const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./Question");

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 5 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  sumCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  dislikeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});
AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      const question = await Question.findById(this.question);

      question.answers.push(this.id);
      question.answerCount += 1;
      await question.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

AnswerSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});
AnswerSchema.virtual("dislikesCount").get(function () {
  return this.dislikes.length;
});

AnswerSchema.post("remove", async function () {
  const question = await Question.findById(this.question);

  question.answers.splice(question.answers.indexOf(this._id), 1);
  question.answerCount -= 1;

  await question.save();
});
module.exports = mongoose.model("Answer", AnswerSchema);
