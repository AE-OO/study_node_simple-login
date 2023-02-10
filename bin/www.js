// 서버를 띄워주는 사항들 입력
"use strict";

const app = require("../app");
const PORT = process.env.PORT || 3000; // .env 내에 저장된 환경변수

app.listen(PORT, () => {  //1번 항 : 3000포트로 웹을 열어라 2번 항 : 콜백함수
    console.log("서버 가동");
});