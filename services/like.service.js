const dbConnection = require("../utils/db_init");
const { v4: uuid } = require("uuid");
const getLikes = async ({ owner, cursor = "", limit = 8 }) => {
  return await new Promise((resolve) => {
    let baseQuery = ``;
    const suffixQuery = "owner = ? order by createdAt DESC limit ?";
    if (cursor) {
      baseQuery =
        "select * from likes where createdAt > (select createdAt from likes where id = ?) and";
    } else {
      baseQuery = "select * from likes where";
    }
    console.log(`${baseQuery} ${suffixQuery}`);
    dbConnection.query(
      `${baseQuery} ${suffixQuery}`,
      cursor ? [cursor, owner, Number(limit) + 1] : [owner, Number(limit) + 1],
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          return resolve(null);
        }
        return resolve(result);
      }
    );
  });
};

const insertLike = async ({ productId, owner }) => {
  return await new Promise((resolve) => {
    dbConnection.query(
      "insert into likes (id, productId, owner, createdAt) values (?, ?, ?, ?)",
      [uuid(), productId, owner, new Date()],
      (err) => {
        if (err) {
          console.log(err);
          return resolve(null);
        }
        return resolve(true);
      }
    );
  });
};

const deleteLike = async ({ productId, owner }) => {
  return await new Promise((resolve) => {
    dbConnection.query(
      "delete from likes where productId = ? and owner = ?",
      [productId, owner],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        }
        console.log(result);
        return resolve(true);
      }
    );
  });
};

module.exports = {
  getLikes,
  insertLike,
  deleteLike,
};
