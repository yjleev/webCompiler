const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createUser, getUser } = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
    }

    try {
        const user = await getUser(username);
        if (user) {
            return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
        }

        await createUser(username, password);
        res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});