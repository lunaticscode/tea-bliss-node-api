const likeController = require("express").Router();
const {
  getLikes,
  insertLike,
  deleteLike,
} = require("../services/like.service");
const { commonResponse } = require("../utils/responseHandler");

likeController.get("/", async (req, res) => {
  const { owner, cursor, limit = 8 } = req.query;
  if (!owner) {
    return res.status(400).json({
      ...commonResponse.error,
      message: `(!) Invalid Request ::: \nreq-query => ${JSON.stringify(
        req.query
      )}`,
    });
  }

  const result = await getLikes({ owner, cursor, limit });
  if (!result) {
    return res
      .status(500)
      .json({ ...commonResponse.error, message: `(!) Internal Server Error` });
  }

  const nextCursor = limit > result.length - 1 ? null : result.shift() || null;
  return res
    .status(200)
    .json({ ...commonResponse.success, next: nextCursor, items: result });
});

likeController.post("/", async (req, res) => {
  const { productId, owner } = req.query;
  if (!productId || !owner) {
    return res.status(400).json({
      ...commonResponse.error,
      message: `(!) Invalid Request ::: \nreq-query => ${JSON.stringify(
        req.query
      )}`,
    });
  }
  const insertResult = await insertLike({ productId, owner });
  if (!insertResult) {
    return res.json({
      ...commonResponse.error,
      message: "(!) Internal Server Error",
    });
  }
  return res.status(201).json({ ...commonResponse.success });
});

likeController.delete("/", async (req, res) => {
  const { productId, owner } = req.query;
  if (!productId || !owner) {
    return res.status(400).json({
      ...commonResponse.error,
      message: `(!) Invalid Request ::: \nreq-query => ${JSON.stringify(
        req.query
      )}`,
    });
  }
  const deleteResult = await deleteLike({ productId, owner });
  if (!deleteResult) {
    return res.json({
      ...commonResponse.error,
      message: "(!) Internal Server Error",
    });
  }
  return res.status(204).json({ ...commonResponse.success });
});

module.exports = likeController;
