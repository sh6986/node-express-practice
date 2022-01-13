const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const {sequelize} = require('./models');
const app = express();

/**
 * app 관련 설정
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
sequelize.sync({force: false})
    .then(() => {
      console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
      console.error(err);
    });

/**
 * 공통 미들웨어
 */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ // req 객체에 세션 객체를 만든다.
  secret: 'abcdef',
  resave: false,
  saveUninitialized: true,
  store: new FileStore() // 사용자가 sessionId를 가지고 서버에 요청하면
                // 세션미들웨어가 sessionId값으로 세션스토어에 대응되는 값을 읽고 req객체에 세션 객체를 추가한다.
                // 도중에 세션스토어의 데이터 값이 바꿔면 요청이 끝난 후 세션미들웨어가 세션스토어에 값을 반영 후 작업을 끝낸다.
                // 세션스토어없이 세션을 사용하면 세션의 데이터값은 메모리에 저장되어 서버가 꺼지면 휘발되므로 이를 방지하기 위해 세션스토어를 사용한다.
}));
const passport = require('./lib/passport')(app);

/**
 * 라우터
 */
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')(passport);
const todoRouter = require('./routes/todo');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);


/**
 * 에러 핸들러(미들웨어)
 */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
