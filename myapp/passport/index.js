const passport = require("passport");
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.user_email);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            attributes: ['id', 'user_email', 'user_nm'],
            where: {
                user_email: id,
            }
        }).then(user => {
            done(null, user);
        }).catch(err => {
            done(err);
        })
    });

    local();
    kakao();

    return passport;
};

