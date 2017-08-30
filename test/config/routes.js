var pluginUser=require("../plugin/user");
var pluginPost=require("../plugin/post");
module.exports=function(app){
    app.use(function (req, res, next){
        var user = req.session.user;
        if(user){
            app.locals.user = user;
        }else{
            app.locals.user = user;
        };

        next();
    });
    app.get('/',function(req,res,next){
        res.render('index', { title: '首页'});
    })
    app.get('/reg',pluginUser.loginYes,pluginUser.reg.get)
    app.post('/reg',pluginUser.reg.post)
    app.get('/login',pluginUser.loginYes,pluginUser.login.get)
    app.post('/login',pluginUser.login.post)
    app.get('/exit',pluginUser.exit.get)
    app.get('/user/:_id',pluginUser.user.get)
    app.get('/add',pluginUser.loginNo,pluginPost.add.get)
    app.post('/add',pluginPost.add.post)
    app.get('/list',pluginPost.list.get)
}