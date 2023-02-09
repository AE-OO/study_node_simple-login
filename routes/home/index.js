"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러 모듈 호출
const ctrl = require("./home.ctrl");

// 라우팅
// 경로로 이동하면 다음과 같은 기능을 실행하라
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;