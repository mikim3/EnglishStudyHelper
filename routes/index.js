"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  sentenceRoutes = require("./sentenceRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

//router 설정 userRoutes안에 경로는 이제 앞에 /users가 붙음 다른 것도 마찬가지
router.use("/users", userRoutes);
router.use("/sentences", sentenceRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
