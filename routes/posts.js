var express = require('express');
var router = express.Router();
var Post=require('../model/post');
var User=require('../model/user');
var bcrypt=require('bcryptjs');

/* GET users listing. */
router.get('/home',function (req,res,next) {
  res.render('posts/home',{title:' from cu pyay.'});
});
router.get('/postadd',function (req,res,next) {
  User.find(function(err,rtn){
    if(err) throw err;
    res.render('post/post_add',{users:rtn});
  });
});
router.post('/postadd',function (req,res,next) {
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  });
});

router.get('/postlist',function (req,res,next) {
  Post.find({}).populate('author').exec(function(err,rtn){
    if(err)throw err;
    console.log(rtn);

    res.render('post/post_list',{posts:rtn});
  });
});
router.get('/postdetail/:id',function (req,res,next) {
  console.log(req.params.id);
  Post.findById(req.params.id).populate('author').exec(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('post/post_detail',{posts:rtn});
  });
});
router.get('/postupdate/:uid',function(req,res,next){
  console.log(req.params.uid);
  Post.findById(req.params.uid,function (err,rtn) {
    if(err)throw err;
    User.find(function (err2,rtn2) {
    if(err2)throw err2;
    console.log(rtn);
    res.render('post/post_update',{post:rtn,users:rtn2});
  });
  });
});
router.post('/postupdate',function (req,res,next) {
  var update={
    title:req.body.title,
    content:req.body.content,
    author:req.body.author

  };
  Post.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');
  });
});
router.get('/postdelete/:id',function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err)throw err;
    res.redirect('/posts/postlist');
  });
});
router.post('/duemail',function (req,res) {
  Post.findOne({email:req.body.email},function (err,rtn) {
    if(err) throw err;
    (rtn != null)?res.json({status:true}):res.json({status:false});
  });
});
module.exports=router;
