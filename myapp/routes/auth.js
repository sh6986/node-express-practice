const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 로그인화면
router.get('/login', (req, res) => {
   res.send(`
        <form action="/auth/login_process" method="post">
            <input type="text" name="id">
            <input type="text" name="pwd">
            <button type="submit">로그인</button>
        </form>
    `);
});

// 로그인
router.post('/login_process', (req, res) => {
    const loginUser = req.body;

    db.query(`
        SELECT user_id
             , user_nm
          FROM USER
         WHERE USER_id = ? 
           AND user_pwd = ?
        `, [loginUser.id, loginUser.pwd], (err, user) => {

        if (err) {
            throw error;
        }

        if (user.length) {    // 로그인 성공시
            res.writeHead(302, {
                'Set-Cookie': [
                    `id=${user[0].user_id}; Path=/`,
                ],
                location: '/'
            });
            res.end();
            
        } else {    // 로그인 실패시
            res.send('아이디와 비밀번호를 확인하세요.');
        }
    });
});

// 로그아웃
router.get('/logout_process', (req, res) => {
    res.writeHead(302, {
        'Set-Cookie': [
            `id=; Max-Age=0; Path=/`
        ],
        location: '/'
    });
    res.end();
});

module.exports = router;