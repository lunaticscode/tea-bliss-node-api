const dbConnection = require("../utils/db_init");

const getCouponCount = async ({ isUse: isUseQuery }) =>
  await new Promise((resolve) => {
    const isUse = Number(isUseQuery);
    dbConnection.query(
      "select count(*) as cnt from coupons where used = ?",
      [isUse],
      (err, result) => {
        console.log(err, result);
        if (err) {
          return resolve(null);
        }
        return resolve(result[0].cnt);
      }
    );
  });

const getCoupon = async ({ isUse: isUseQuery, page = 1, limit = 10 }) => {
  return await new Promise((resolve) => {
    const isUse = Number(isUseQuery);
    dbConnection.query(
      "select * from coupons where used = ? limit ? offset ?",
      [isUse, Number(limit), Number((page - 1) * limit)],
      (err, result) => {
        console.log(err, result);
        if (err) {
          return resolve(null);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = {
  getCoupon,
  getCouponCount,
};
