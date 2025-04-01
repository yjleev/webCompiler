const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { createUser, getUser, createProblem, getProblem }= require('./database.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
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

app.post('/create_problem', async (req, res) => {
    console.log(req, res)
    const { title, description, example, testcase } = req.body;

    try {
        const subject = await getProblem(title);
        if (subject) {
            return res.status(400).json({ message: "이미 존재하는 제목입니다." });
        }

        await createProblem(title, description, example, testcase);

        res.status(201).json({ title: title });
    } catch (error) {
        console.error("서버 오류 발생:", error);
        res.status(500).json({ message: "서버 오류", error });
    }
});



app.post('/get_problem', async (req, res) => {
    const { title } = req.body;

    try {
        // getProblem 함수로 제목에 맞는 문제를 가져옴
        const problem = await getProblem(title);

        // 문제를 찾지 못한 경우 404 에러
        if (!problem) {
            return res.status(404).json({ message: "해당 문제를 찾을 수 없습니다." });
        }

        // 문제 정보와 함께 성공 메시지 반환
        res.status(200).json({ message: "문제 불러오기 완료", problem });
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error });
    }
});


// app.post('/compile', async (req, res) => {
//     const { title, description } = req.body;

//     try {
//         const subject = await getProblem(title, description);

//         try {
//             const response = await fetch("/api", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(subject),
//             });

//             if (response.ok) {
//                 return;
//             } else {
                
//             }
//         } catch (error) {
//             res.status(500).json({ message: error });
//         }

//         res.status(200).json({ message: "문제 통과" });
//     } catch (error) {
//         res.status(500).json({ message: "서버 오류", error });
//     }
// });

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});