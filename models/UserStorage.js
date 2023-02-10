// UserStorage 는 DB를 CRUD 해주는 역할만 수행
"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        // fs는 프로미스를 가지고 있지만 mysql은 프로미스를 가지고 있지 않기 때문에 새로 프로미스를 생성해 줌
        // 중괄호 안의 코드가 성공하면 resolve를, 실패하면 reject 실행
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);  // 받아온 data는 배열안에 담겨있기 때문에 id를 꺼내려면 0번째에 담겨있는 값을 호출해야 함
            });
        });
    }

    static async addUserInfo(body) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users(id, name, psword) VALUES (?, ?, ?)" ,[body.id, body.name, body.psword], (err) => {
                if (err) reject(`${err}`); // err를 문자열로 출력하지 않으면 alert에 에러메세지 대신 [Object object] 이렇게 출력됨
                resolve({success: true});
            });
        });
    }
};


module.exports = UserStorage;