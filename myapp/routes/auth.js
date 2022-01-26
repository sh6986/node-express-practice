const express = require('express');
const passport = require('passport');
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