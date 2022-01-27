const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {User} = require('../models');
const router = express.Router();

// 로그인화면
router.get('/login', (req, res) => {
    res.send(`
        <form action="/auth/login_process" method="post">
            <input type="text" name="id">
            <input type="text" name="pwd">
            <button type="submit">로그인</button>
            <a href="/auth/kakao">카카오로그인</a>
        </form>
    `);
});

// 로그인
router.post('/login_process',
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
    }), (req, res) => {
        req.session.save(() => {
            res.redirect('/');
        });
    });

// 회원가입 화면
router.get('/join', (req, res) => {
    res.send(`
        <form action="/auth/join_process" method="post">
            이메일:<input type="text" name="user_email">
            닉네임:<input type="text" name="user_nm">
            비밀번호:<input type="text" name="user_pwd">
            <button type="submit">가입</button>
        </form>
    `);
});

// 회원가입
router.post('/join_process', async (req, res, next) => {
    console.log(req.body);
    const {user_email, user_nm, user_pwd} = req.body;

    try {
        // 존재여부 확인
        const exUser = await User.findOne({
            where: {
                user_email
            }
        });

        if (exUser) {
            return res.redirect('/join?error=exist');
        }

        const hash = await bcrypt.hash(user_pwd, 12);

        await User.create({
            user_email,
            user_nm,
            user_pwd: hash
        });

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }

});

// 로그아웃
router.get('/logout_process', (req, res) => {
    req.logout();
    req.session.save(() => {
        res.redirect('/');
    });
});

// 카카오 로그인화면(카카오 로그인하기 누를시)
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    req.session.save(() => {
        res.redirect('/');
    });
});

module.exports = router;