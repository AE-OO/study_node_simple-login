// express 대신 http를 사용하는 방법
// const http = require("http");
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});  // http로 서버를 열면 한글이 깨짐 => utf-8 로 변경
//     if(req.url === "/"){
//         res.end("여기는 로그인 화면입니다.");
//     }
// });

// app.listen(3001, () => {
//     console.log("http로 가동된 서버입니다.");
// });
"use strict";

// express 를 사용하는 방법 (express가 더 낫다.)
//모듈
const express = require("express");  // express 모듈을 찾아옴
const bodyParser = require("body-parser");  // 브라우저에서 보내는 데이터의 body 부분을 보려면 필요한 모듈
const dotenv = require("dotenv"); // dotenv 모듈을 사용해 환경변수 관리 - os 마다 환경변수를 등록하는 방법이 다른데 dotenv를 사용해 이를 통일함
dotenv.config();  // 환경변수 모듈 생성
// const morgan = require("morgan"); // 로그 관리/ 보통 winston을 많이 사용함
const app = express();

const accessLogStream = require("./config/log_morgan");

// 앱 세팅
app.set("views", "./views"); // 뷰 파일이 있는 폴더 경로 
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`)); // dirname 은 app.js의 위치를 반환함, 괄호안의 경로를 static(정적) 경로로 설정하겠다.
app.use(bodyParser.json());  // body-parser 모듈을 사용하기 위해 필요함
app.use(bodyParser.urlencoded({extended: true})); // url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
// app.use(morgan("common", {stream: accessLogStream}));  // dev는 로그 출력 형식, accessLogStream은 로그를 파일로 출력해주는 변수

// 라우팅
const home = require("./routes/home");
app.use("/", home) // use는 미들웨어를 등록해주는 메소드

module.exports = app;

// nodemon을 설치 후 nodemon으로 서버를 실행시키면 코드를 업데이트할 때마다 서버를 자동으로 내렸다 올려줌