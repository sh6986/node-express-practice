const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({
                attributes: ['user_email', 'user_nm'],
                where: {
                    sns_id: profile.id,
                    provider: 'kakao'
                },
            });

            if (user) {
                done(null, user);
            } else {
                const newUser = await User.create({
                    user_email: profile._json && profile._json.kakao_account.email,
                    user_nm: profile.displayName,
                    sns_id: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }

        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};