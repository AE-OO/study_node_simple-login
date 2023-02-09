"use strict";

const fs = require("fs").promises; // promises가 수행하는 동작이 끝남과 동시에 상태를 알려줌 (비동기 처리에 효과적)

class UserStorage {
    // user 데이터를 파일로 관리하기 위해 users.json 파일로 옮김
    // 클래스 안에서 변수를 선언할 때는 선언자(const)가 필요없음
    // static #users = {   // static 은 외부 파일에서 이 변수에 접근하기 위함/ 변수명 앞의 #는 private를 의미함 
    //     // (원래 외부 파일에서 데이터에 직접적으로 접근하지 못하도록 하는게 맞으니까)
    //     id: ["woorimIT", "나개발", "김팀장"],
    //     psword: ["1234", "1234", "123456"],
    //     name: ["우리밋", "나개발", "김팀장"],
    // };

    // getUserInfo 메소드 내에 있던 내용을 가독성을 위해 밖으로 빼줌
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        },{});

        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        // reduce의 첫번째 파라미터 newUsers는 fields의 초기값이 들어가고 field에는 다음 변수들이 순회해서 들어감
        const users = JSON.parse(data);  // data 는 버퍼 데이터니까 json으로 파싱해 줌
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    // 그래서 변수는 private으로 선언해서 직접적인 접근을 막는 대신 게터를 선언해 줌
    static getUsers(isAll, ...fields) {          
        return fs
            .readFile("./databases/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }

    static getUserInfo(id) {
        // 파일로 부터 users 데이터를 가져옴
        return fs.readFile("./databases/users.json")  //promise 반환
            .then(data => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static async addUserInfo(body) {
        // const users = this.#users;
        // 이런식으로 구현하면 서버를 재구동 될 때 데이터가 사라짐 -> 로컬에 저장하기 위해서는 파일에 데이터를 저장함
        // users.id.push(body.id);
        // users.psword.push(body.psword);
        // users.name.push(body.name);

        // 파일에 저장하는 법
        // 기존의 json 파일을 먼저 읽어온 후 저장하고자 하는 데이터를 넣어줌 (안그러면 덮어쓰기됨)
        //const users = await this.getUsers("id", "psword", "name"); // getUsers의 파라미터를 매번 이렇게 적기 번거로우니까 변수를 하나 두고 파라미터가 true일 때 모든 값을 가져오게 처리
        const users = await this.getUsers(true);
        if(users.id.includes(body.id)) {
            throw "이미 존재하는 아이디 입니다.";
        }
        users.id.push(body.id);
        users.psword.push(body.psword);
        users.name.push(body.name);
        fs.writeFile("./databases/users.json", JSON.stringify(users));
        return {success: true};
    }
};


module.exports = UserStorage;