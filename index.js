const { APP_PORT } = require("./consts/config");
const express = require("express");
const apiController = require("./controllers");
const { commonResponse } = require("./utils/responseHandler");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/api", apiController);

app.use("*", (req, res, next) => {
  const invalidUrl = req.url;
  return res.status(404).json({
    ...commonResponse.error,
    message: `(!) Invalid API Path ::: \nreq-url => ${invalidUrl}`,
  });
});

// app.listen(APP_PORT, () => {
//   console.log(`Express Running on ${APP_PORT}.`);
// });

module.exports = app;
