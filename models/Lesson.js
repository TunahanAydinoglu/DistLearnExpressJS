const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const Category = require("./Category");

const LessonSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: [5, "Please provide title at least 5 characters"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 5 characters"],
  },
  instructor: {
    type: String,
    required: [true, "Please provide a instructor"],
    minlength: [5, "Please provide instructor at least 5 characters"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 5 characters"],
  },
  url: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 20 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
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
  image: {
    type: String,
    required: [true, "Please provide a image"],
    minlength: [3, "Please provide image at least 3 characters"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  questionCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  markAverage:{
    type:Number,
    min:0,
    max:5,
    default:0
  },
  episodes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Episode",
    },
  ],
  episodeCount: {
    type: Number,
    default: 0,
  },
});

// Pre Save Method
LessonSchema.pre("save", async function (next) {
  if (!this.isModified("title")) {
    next();
  } else {
    try {
      let category_id = this.category;
      const category = await Category.findById(category_id);
      category.lessons.push(this.id);
      category.lessonCount += 1;
      this.slug = this.makeSlug();
      await category.save();
      next();
    } catch (err) {
      console.log(err);
    }
  }
});

LessonSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});
LessonSchema.virtual("dislikesCount").get(function () {
  return this.dislikes.length;
});
LessonSchema.post("remove", async function () {
  const category = await Category.findById(this.category);

  category.lessons.splice(category.lessons.indexOf(this._id), 1);
  category.lessonCount -= 1;

  await category.save();
});
LessonSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Lesson", LessonSchema);
