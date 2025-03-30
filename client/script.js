const toggleSign = (type, action) => {
    const page = document.getElementById(`${type}_page`);
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

const signUp = () => {
    const openBtn = document.querySelector('#box_user>a:last-child');
    const linkBox = document.querySelector('#signup_page>form>div');

    openBtn.addEventListener('click', () => {
        toggleSign("signup", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            toggleSign("signup", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            toggleSign("signup", "close");
            toggleSign("login", "open")
        }
    }); 

};
signUp();

const login = () => {
    const openBtn = document.querySelector('#box_user>a:first-child');
    const linkBox = document.querySelector('#login_page>form>div');

    openBtn.addEventListener('click', () => {
        toggleSign("login", "open");
    });

    linkBox.addEventListener('click', (event) => {
        if (event.target === linkBox.querySelector('a:first-child')) {
            toggleSign("login", "close");
        } else if (event.target === linkBox.querySelector('a:last-child')) {
            toggleSign("login", "close");
            toggleSign("signup", "open");
        }
    });
};
login();