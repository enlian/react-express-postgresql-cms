var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const authenticateJWT = require('./middlewares/authenticateJWT'); 


const pool = require('./dbConfig'); // 引入数据库配置

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes = require('./routes/auth'); // 引入认证路由

var app = express();
// 配置 CORS
const corsOptions = {
  origin: 'http://localhost:5173', // 允许的源
  credentials: true, // 允许凭证（如 cookies）
};
app.use(cors(corsOptions)); // 使用配置的 CORS 中间件

app.use(express.json()); // 解析 JSON 格式的请求体
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // 解析 URL 编码格式的请求体
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', authRoutes); // 使用认证路由

// 测试连接
pool.connect((err) => {
  if (err) {
      console.error('连接数据库失败:', err.stack);
      return;
  }
  console.log('已连接到数据库');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
