const db = require("./db");

module.exports = (app) => {
    const passport = require("passport");
    const LocalStrategy = require("passport-local").Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd'
    },(username, password, done) => {
        // 로그인 로직
        db.query(`
        SELECT user_id
             , user_nm
          FROM USER
         WHERE USER_id = ?
           AND user_pwd = ?
        `, [username, password], (err, user) => {

            if (err) {
                throw error;
            }

            if (user.length) {      // 로그인 성공시
                done(null, user);
            } else {                // 로그인 실패시
                done(null, false, {
                    message: '아이디와 비밀번호를 확인하세요.'
                });
            }
        });
    }));

    return passport;
};

