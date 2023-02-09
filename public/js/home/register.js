"use restrict";

const id = document.querySelector("#id"), 
        name = document.querySelector("#name"),
        psword = document.querySelector("#password"), 
        confirmPsword = document.querySelector("#confirm-password"),
        registerBtn = document.querySelector("button");

registerBtn.addEventListener("click", () => {
    const info = {
        id : id.value,
        psword : psword.value,
        name : name.value,
    };

    // 내가 짠 코드
    // if (psword.value === confirmPsword.value){
    //     fetch("/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify(info),
    //     }).then((res) => res.json())
    //     .then((res) => {
    //         if (res.success) {
    //             location.href = "/login";
    //         } else {
    //             alert(res.msg);
    //         }
    //     })
    //     .catch((err) => {
    //         console.error(new Error("회원가입 중 에러 발생"));
    //     });
    // } else {
    //     alert("비밀번호가 일치하지 않습니다.");
    // }

    if (!id.value || !psword.value || !name.value) {return alert("모든 항목을 입력해 주세요")};
    if (psword.value !== confirmPsword.value) {return alert("비밀번호가 일치하지 않습니다.")};
    
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(info),
    }).then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/login";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });

});
    
