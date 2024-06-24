const authMiddleware = require("../middlewares/auth.middleware");
const couponController = require("./coupon.controller");
const likeController = require("./like.controller");

const apiController = require("express").Router();

apiController.use("/coupon", authMiddleware, couponController);
apiController.use("/like", authMiddleware, likeController);
module.exports = apiController;
