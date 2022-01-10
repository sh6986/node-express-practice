const express = require('express');
const cookie = require('cookie');
const router = express.Router();

router.get('/', function(req, res, next) {
  let user = {};
  let template = ``;

  if (req.headers.cookie) {
    user = cookie.parse(req.headers.cookie);
  }
  
  template = user.id ? `<a href="/auth/logout_process">로그아웃</a>` : `<a href="/auth/login">로그인</a>`;

  res.send(`
    <p>index 페이지 | ${user.id ? user.id : `로그인해주세요`}</p>
    ${template}
  `);
});

module.exports = router;