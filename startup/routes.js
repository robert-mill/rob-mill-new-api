const express = require("express");
const auth = require("../routes/auth");
const home = require("../routes/home");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/home", home);
  app.use("/api/users", users);
  app.use(error);
};
