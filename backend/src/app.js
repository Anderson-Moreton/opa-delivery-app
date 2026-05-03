require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

const indexRouter = require('./routes/index');
const menuRouter = require('./routes/menu')
const adminRouter = require('./routes/admin')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../frontend/src/public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo',
  resave: false,
  saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/admin', adminRouter); /*Anderson 30/08*/

app.use('/contato', indexRouter);
app.use('/quemsomos', indexRouter);
app.use('/entrar', indexRouter);
app.use('/carrinho', indexRouter);
app.use(cors()); /*Anderson 02/05/2026*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;