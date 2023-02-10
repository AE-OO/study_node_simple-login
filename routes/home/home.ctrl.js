"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");

// 컨트롤러 함수를 만들고 이를 외부에서 사용함
// 화면 출력하는 애들
const output = {
    home: (req, res) => { 
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    }
};

// 브라우저로부터 받은 데이터 처리하는 애들
const process = {
    login: async (req, res) => {   // async 는 함수 앞에서 사용해줘야 함
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};