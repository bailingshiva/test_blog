var modelUser=require("../models/user");
module.exports.login={
    get:function(req,res,next){
        res.render('login', { title: '登陆' })
    },
    post:function(req,res,next){
        // res.render('login', { title: '登陆' });
        var postData={
            name:req.body.name
        }
        modelUser.findOne(postData,function(err,data){
            if(err){
                res.send(err);
            }
            if(data){
                if(data.password==req.body.password){
                    //res.send("登陆成功！");
                    req.session.user=data;
                    res.redirect("/");
                }
                else{
                    res.send("密码错误！");
                }
            }
            else{
                res.send("没有此用户！");
            }
        })
    }
}
module.exports.reg={
    get:function(req,res,next){
        res.render('reg', { title: '注册' });
    },
    post:function(req,res,next){
        var postData={
            name:req.body.name,
            password:req.body.password
        }
        modelUser.findOne({name:req.body.name},function(err,data) {
            if (err) {
                res.send(err);
            }
            if (data) {
                res.send("此用户已存在！");
            }
            else {
                modelUser.create(postData, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    // res.send(data);
                    req.session.user = data;
                    res.redirect("/");
                })

            }
        })
        // res.send("注册成功！");
    }
}
module.exports.user={
    get:function(req,res,next){
        var postData={
            _id:req.param("_id")
        }
        if(postData._id){
            modelUser.findById(postData,function(err,data){
                if(err){
                    res.send("用户不存在！");
                }
                res.render('home', { title:data.name+ '主页',views:data });
            })
        }else{
            res.send("用户不存在！");
        }

    }
}
module.exports.exit={
    get:function(req,res,next){
        req.session.user=null;
        res.redirect("/");
    }
}
module.exports.loginNo=function(req,res,next){
    var user=req.session.user;
    if(!user){
        res.redirect('/login');
    }else{
        next();
    }
}
module.exports.loginYes=function(req,res,next){
    var user=req.session.user;
    if(user){
        res.redirect('/user/' + user._id);
    }else{
        next();
    }
}