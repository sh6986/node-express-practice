const express = require('express');
const router = express.Router();

module.exports = (passport) => {
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

    return router;
};