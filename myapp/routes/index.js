const express = require('express');
const cookie = require('cookie');
const router = express.Router();

router.get('/', function(req, res, next) {
  let template = ``;

  if (req.user) {
    template = `<a href="/auth/logout_process">로그아웃</a>`;
  } else {
    template = `<a href="/auth/login">로그인</a>`;
  }

  res.send(`
    <p>index 페이지 | ${req.user ? req.user.user_nm : `로그인해주세요`}</p>
    ${template}
  `);
});

module.exports = router;