var modelPost=require("../models/post");
module.exports.add={
    get:function(req,res,next){
        res.render('add', { title:'发表微博' });
        console.log(req.session.user._id);
    },
    post:function(req,res,next){
        var postData={
            author:req.session.user._id,
            tittle:req.body.tittle,
            content:req.body.content
        }
        modelPost.create(postData,function(err,data){
            if(err){
                res.send(err);
            }
            res.render("views",{title:data.tittle,content:data.content});
        })
    }
}
module.exports.list={
    get:function(req,res,next){
        var slist=modelPost.find({},null,{sort:{_id:-1}}).populate("author");
        slist.exec(function(err,data){
            if(err){
                res.send(err);
            }
            res.render('list', { title:'微博列表',views:data});
        })
    }
}