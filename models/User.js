"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    login() {
        const body = this.body;
        const {id, psword} = UserStorage.getUserInfo(body.id);
        
        if (id){
            if(id === body.id && psword === body.psword) {
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return {success: false, msg: "아이디가 존재하지 않습니다."};
    }

    register() {
        const body = this.body;
        const {id} = UserStorage.getUserInfo(body.id);

        if(id) {
            return {success: false, msg: "이미 존재하는 아이디입니다."};
        } else {
            UserStorage.addUserInfo(body);
            return {success: true, msg:"회원가입 성공"};
        }
    }
}

module.exports = User;