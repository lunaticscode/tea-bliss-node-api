const { getCoupon, getCouponCount } = require("../services/coupon.service");
const { commonResponse } = require("../utils/responseHandler");

const couponController = require("express").Router();

couponController.get("/", async (req, res) => {
  const { used: isUse, page, limit } = req.query;
  if (isNaN(isUse) || !page) {
    return res.status(400).json({
      ...commonResponse.error,
      message: `(!) Invalid Request ::: \n${JSON.stringify({
        used: isUse,
        page,
        limit,
      })}`,
    });
  }
  const [couponCount, coupons] = await Promise.all([
    getCouponCount({ isUse }),
    getCoupon({ isUse, page, limit }),
  ]);

  if (!coupons) {
    return res.status(500).json({
      ...commonResponse.error,
      message: "(!) Internal Server Error, ::: coupon.service.js",
    });
  }

  const isLastPage = limit > coupons.length;
  return res.status(200).json({
    ...commonResponse.success,
    data: coupons,
    totalItems: couponCount,
    isLastPage,
  });
});

module.exports = couponController;
