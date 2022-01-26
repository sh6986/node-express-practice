const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd'
    }, async (id, pwd, done) => {
        // 로그인 로직
        try {
            const user = await User.findOne({
                attributes: ['user_email', 'user_nm'],
                where: {
                    user_email: id,
                    user_pwd: pwd
                }
            });

            if (user) {      // 로그인 성공시
                done(null, user);
            } else {                // 로그인 실패시
                done(null, false, {
                    message: '아이디와 비밀번호를 확인하세요.'
                });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};