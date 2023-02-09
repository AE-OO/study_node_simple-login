"use strict";
// ejs에서 js를 호출할 때 defer(or async) 라는 것을 작성해주었는데
// defer는 브라우저가 스크립트를 만났을 때 스크립트를 다운하는 동시에 문서 파싱을 수행함 
// -> 문서 파싱을 완료할 때까지 파싱을 멈추지 않음 (스크립트 태그를 body 태그 윗줄에 작성하는 것과 비슷한 효과)
// async는 문서 파싱 중 스크립트를 만나면 파싱과 함꼐 스크립트를 다운받고 다운이 완료되면 즉시 스크립트를 실행 
// -> 다운 완료 후 스크립트를 실행하는 동안은 문서 파싱이 멈춤

const id = document.querySelector("#id"), 
    psword = document.querySelector("#password"), 
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", () => {
    const req = {
        id: id.value,
        psword: psword.value,
    };
    
    fetch("/login", {  // fetch는 브라우저의 데이터를 서버로 보내주는 애
        method: "POST",
        headers: {
            "Content-Type": "application/json"  // 내가 보내는 데이터의 타입 명시
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())   // Promise 타입의 데이터를 반환함 (데이터가 모두 받아진 상태가 아님)
    .then((res) => {   // 한번 더 then을 호출해서 서버로부터 받은 데이터를 출력함
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    });  
});