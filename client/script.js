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
        togglePage("signup", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            togglePage("signup", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            togglePage("signup", "close");
            togglePage("login", "open")
        }
    }); 

    const form = document.getElementById('signup_page');

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
                togglePage("signup", "close");
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
        togglePage("login", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            togglePage("login", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            togglePage("login", "close");
            togglePage("signup", "open");
        }
    });

    const form = document.getElementById('login_page');

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
                togglePage("login", "close");
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

const createProblem = () => {
    const textarea = document.querySelectorAll('#create_problem textarea');

    textarea.forEach((input) => {
        input.addEventListener('input', () => {
            if (input.scrollHeight > input.offsetHeight) {
                input.style.height = input.scrollHeight + 'px';
            }
        });
    });

    
};
createProblem();