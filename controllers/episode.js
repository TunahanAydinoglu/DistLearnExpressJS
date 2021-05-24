const Episode = require("../models/Episode");

const errorWrapper = require("../helpers/error/errorWrapper");
const Lesson = require("../models/Lesson");

const getAllEpisodes = errorWrapper(async (req, res, next) => {
  const { lesson_id } = req.params;
  const lesson = await Lesson.findById(lesson_id).populate("episodes");

  const episodes = await lesson.episodes.sort(function (a, b) {
    return a.ranking - b.ranking;
  });

  res.status(200).json({
    success: true,
    // episodeCount: episodes.length,
    data: episodes,
  });
});
const addNewEpisodeToLesson = errorWrapper(async (req, res, next) => {
  const user_id = req.user.id;
  const lesson_id = req.param.id || req.params.lesson_id;
  const information = req.body;

  const episode = await Episode.create({
    ...information,
    lesson: lesson_id,
    user: user_id,
  });
  res.status(200).json({
    success: true,
    data: episode,
  });
});

const getSingleEpisode = errorWrapper(async (req, res, next) => {
  const episode = req.myEpisode;
  res.status(200).json({
    success: true,
    data: episode,
  });
});

const editEpisode = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { ranking, title, url } = req.body;
  let episode = await Episode.findById(id);

  episode.ranking = ranking;
  episode.title = title;
  episode.url = url;

  episode = await episode.save();

  res.status(200).json({
    success: true,
    data: episode,
  });
});
const deleteEpisode = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Episode.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  addNewEpisodeToLesson,
  getAllEpisodes,
  getSingleEpisode,
  editEpisode,
  deleteEpisode,
};
