const togglePage = (type, action) => {
    const page = document.getElementById(`${type}`);
    const body = document.querySelector("body");
    if (action === "open") {
        page.style.display = "block";
        body.style.overflow = "hidden";
    } else if(action === "close") {
        page.style.display = "none";
        body.style.overflow = "visible";
    } else {
        console.log("오픈 페이지 오류");
    };
};

const signIn = (name) => {
    const box = document.getElementById('box_user');

    box.textContent = `${name}`;
    box.classList.add('user');
};

const signUp = () => {
    const openBtn = document.querySelector('#box_user>a:last-child');
    const linkBox = document.querySelector('#signup_page>form>div');

    openBtn.addEventListener('click', () => {
        togglePage("signup_page", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            togglePage("signup_page", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            togglePage("signup_page", "close");
            togglePage("login_page", "open")
        }
    }); 

    const form = document.querySelector('#signup_page>form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = form.querySelector("input:nth-of-type(1)").value;
        const password = form.querySelector("input:nth-of-type(2)").value;
        const check = form.querySelector("input:nth-of-type(3)").value;

        const usernameAllow = /^[가-힣]{2,4}$/;
        const passwordAllow = /^.{6,}$/;
        if (!username) {
            alert("이름을 입력하세요");
            return;
        } else if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        } else if (!usernameAllow.test(username)) {
            alert("이름은 한글 2~4자여야 합니다.");
            return;
        } else if (!passwordAllow.test(password)) {
            alert("비밀번호는 6자 이상이어야 합니다.");
            return;
        } else if (password !== check) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        };

        const data = { username, password };

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                togglePage("signup_page", "close");
                signIn(username);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("서버 오류 발생");
        }
    });
};
signUp();

const login = () => {
    const openBtn = document.querySelector('#box_user>a:first-child');
    const linkBox = document.querySelector('#login_page>form>div');

    openBtn.addEventListener('click', () => {
        togglePage("login_page", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            togglePage("login_page", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            togglePage("login_page", "close");
            togglePage("signup_page", "open");
        }
    });

    const form = document.querySelector('#login_page>form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = form.querySelector("input:nth-of-type(1)").value;
        const password = form.querySelector("input:nth-of-type(2)").value;

        const data = { username, password };

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                togglePage("login_page", "close");
                signIn(username);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("서버 오류 발생");
        }
    });
};
login();

const createProblemBox = (title) => {
    const container = document.getElementById("box_problems");
    const box = document.querySelector('.container>.box').cloneNode(true);
    container.appendChild(box);
    const problems = document.querySelectorAll('#box_problems>.box');
    box.classList.add(`${problems.length}`);

    box.querySelector('li:first-child').textContent = `${problems.length}`;
    box.querySelector('li:nth-child(2)').textContent = `${title}`;
    box.querySelector('li:last-child').textContent = `-`;
};

const createProblem = () => {
    const textarea = document.querySelectorAll('#create_problem textarea');

    textarea.forEach((input) => {
        input.addEventListener('input', () => {
            if (input.scrollHeight > input.offsetHeight) {
                input.style.height = input.scrollHeight + 'px';
            }
        });
    });

    const plusIcon = document.getElementById('btn_create_problem');
    const returnIcon = document.querySelector('#create_problem>img');

    plusIcon.addEventListener('click', () => {
        togglePage("create_problem", "open");
    });

    returnIcon.addEventListener('click', () => {
        togglePage("create_problem", "close");
    });

    const form = document.querySelector('#create_problem>form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        // .value로 각 textarea 값 가져오기
        const title = form.querySelector('.title>textarea').value;
        const description = form.querySelector('.description>textarea').value;
    
        // 예제와 테스트 케이스의 값을 가져와서 , 로 합침
        let example = form.querySelectorAll('.example textarea');
        let testcase = form.querySelectorAll('.testcase textarea');
    
        // 각 textarea의 값들을 , 로 합침
        example = Array.from(example).map(textarea => textarea.value).join(',');
        testcase = Array.from(testcase).map(textarea => textarea.value).join(',');
    
        // 데이터 객체 구성
        const data = {
            title,
            description,
            example,
            testcase
        };
    
        try {
            // 서버로 POST 요청 보내기
            const response = await fetch("/create_problem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            // 서버 응답 처리
            const result = await response.json();
    
            if (response.ok) {
                togglePage("create_problem", "close");
                createProblemBox(`${result.title}`);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("서버 오류 발생");
        }
    });
};
createProblem();

const problem = () => {
    const problemBox = document.querySelectorAll('#box_problems>.box');
    const returnIcon = document.querySelector('#problem_page>img');
    const tab = document.querySelectorAll('.tab_menu>.tab');
    const content = document.querySelectorAll('.container>.content');

    for (const [index, box] of problemBox.entries()) {
        box.addEventListener("click", async () => {
            togglePage("problem_page", "open");
    
            tab.forEach((item) => item.classList.remove("on"));
            tab[0].classList.add("on");
    
            content.forEach((con) => con.classList.remove("active"));
            content[0].classList.add("active");
    
            const data = { index };
    
            try {
                const response = await fetch("/compile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    togglePage("login_page", "close");
                    signIn(username);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert("서버 오류 발생");
            }
        });
    }
    

    returnIcon.addEventListener('click', () => {
        togglePage("problem_page", "close");
    });

    // tab.forEach(async(box, index) => {
    //     box.addEventListener('click', () => {
    //         tab.forEach((item) => {
    //             item.classList.remove("on");
    //         });

    //         content.forEach((con) => {
    //             con.classList.remove("active");
    //         });

    //         tab[index].classList.add("on");
    //         content[index].classList.add("active");

    //         const data = { index };

    //         try {
    //             const response = await fetch("/compile", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(data),
    //             });
    
    //             const result = await response.json();
    
    //             if (response.ok) {
    //                 togglePage("login_page", "close");
    //                 signIn(username);
    //             } else {
    //                 alert(result.message);
    //             }
    //         } catch (error) {
    //             alert("서버 오류 발생");
    //         }
    //     });
    // });

    for (const [index, box] of tab.entries()) {
        box.addEventListener("click", async () => {
            tab.forEach((item) => item.classList.remove("on"));
            content.forEach((con) => con.classList.remove("active"));
    
            tab[index].classList.add("on");
            content[index].classList.add("active");

        });
    }

    const form = document.querySelector('#problem_page form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const date = {

        }

        try {
            const response = await fetch("/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                togglePage("login_page", "close");
                signIn(username);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("서버 오류 발생");
        }
    });
};

// problem();