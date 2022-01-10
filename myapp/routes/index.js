const express = require('express');
const cookie = require('cookie');
const router = express.Router();

router.get('/', function(req, res, next) {
  let template = ``;

  if (req.session.is_logined) {
    template = `<a href="/auth/logout_process">로그아웃</a>`;
  } else {
    template = `<a href="/auth/login">로그인</a>`;
  }

  res.send(`
    <p>index 페이지 | ${req.session.is_logined ? req.session.user_id : `로그인해주세요`}</p>
    ${template}
  `);
});

module.exports = router;