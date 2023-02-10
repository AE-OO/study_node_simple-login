"use strict";

const User = require("../../models/User");
const logger = require("../../config/log_winston");

const printLog = (response, url) => {
    if (response.err){
        logger.error(`${url.method} ${url.path} ${url.status} Response: "success: ${response.success}, msg: ${response.err}`)
    }else 
        logger.info(`${url.method} ${url.path} ${url.status} Response: "success: ${response.success}, msg: ${response.msg}`);
}

// 컨트롤러 함수를 만들고 이를 외부에서 사용함
// 화면 출력하는 애들
const output = {
    home: (req, res) => { 
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },

    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
};

// 브라우저로부터 받은 데이터 처리하는 애들
const process = {
    login: async (req, res) => {   // async 는 함수 앞에서 사용해줘야 함
        const user = new User(req.body);
        const response = await user.login();
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        }
        printLog(response, url);
        return res.status(url.status).json(response);
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201,
        }
        printLog(response, url);
        return res.status(url.status).json(response);
    }
};

module.exports = {
    output,
    process,
};