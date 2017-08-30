var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*重新定义路由*/
var routes = require('./config/routes');
var config = require('./config/config');
/*添加mongoose*/
var mongoose=require("mongoose");
/*定义session中间件*/
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
/*var routes = require('./routes');
var users = require('./routes/user');*/
var app = express();
//app.use(cookieParser());
/*mongoose链接数据库*/
mongoose.connect("mongodb://localhost/blog");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//使用cookie中间件
app.use(express.cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

/*session中间件创建*/
app.use(session({
    secret: "45454",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        cookieSecret: 'jdghjf',
        db: 'blog',
        url: 'mongodb://localhost/blog'
    })
}));
/*给新建路由设app*/
routes(app);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(app.router);
module.exports = app;
