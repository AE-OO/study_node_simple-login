// User는 DB에서 받은 데이터를 검증/조작하는 역할
"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const body = this.body;
        // Promise { <pending> } => 데이터 전부를 읽어오지 못했음을 의미 -> 비동기로 동작하는데 getUserInfo가 반환되기 전에 콘솔로 출력하려고 하니까 pending이라고 뜨는 거
        // getUserInfo가 모두 반환되기를 기다리게 하려고 await을 사용함
        // await(async 안에서만 사용가능)은 promise를 반환하는 애한테만 쓸 수 있음
        try {
            const {id, psword} = await UserStorage.getUserInfo(body.id);   
            
            // getUserInfo는 동작이 느린 애니까 login() 함수 자체가 느리게 동작하는 애로 생각할 수 있음
            // -> login() 메소드를 실행시키는 home.ctrl.js 파일에서도 await 처리를 해줘야함
            if (id){
                if(id === body.id && psword === body.psword) {
                    return {success: true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다."};
            }
            return {success: false, msg: "아이디가 존재하지 않습니다."};
        }catch (err){
            return {success: false, err};
        };
    }

    async register() {
        const body = this.body;
        // UserStorage.js 에서 이미 존재하는 아이디일때 던지는 오류 캐치
        try {
            const response = await UserStorage.addUserInfo(body);
            return response;
        } catch (err) {
            return {success: false, err};
        }
    }
}

module.exports = User;