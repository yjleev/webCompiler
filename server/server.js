const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { createUser, getUser } = require('./database.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS에서는 true로 설정
}));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/me', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "로그인이 필요합니다." });
    }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUser(username);
        if (user) {
            return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
        }

        await createUser(username, password);

        req.session.user = { id: user.id, username: user.username, role: user.role };
        res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(400).json({ message: "아이디가 존재하지 않습니다." });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        req.session.user = { id: user.id, username: user.username, role: user.role };

        res.status(200).json({ message: "로그인 성공"});
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});