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
    login: (req, res) => {
        const user = new User(req.body);
        const response = user.login();

        // const id = req.body.id,
        //     psword = req.body.psword;

        // 이 부분은 모델으로 옮겨줌
        // const users = UserStorage.getUsers("id", "psword");        
        // const response = {};
        // if (users.id.includes(id)) {
        //     const idx = users.id.indexOf(id);
        //     if (users.psword[idx] === psword) {
        //         // 이렇게 적어줘도 되지만
        //         // return res.json({
        //         //     success: true,
        //         // });
        //         // 좀 더 보기 좋은 것은 response를 선언해주고
        //         response.success = true;
        //         return res.json(response);
        //     }
        // }

        // // 로그인 성공과 마찬가지
        // // return res.json({
        // //     success: false,
        // //     msg: "로그인에 실패하였습니다.",
        // // });
        // response.success = false;
        // response.msg = "로그인에 실패하였습니다.";
        return res.json(response);
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};