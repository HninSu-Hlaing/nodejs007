var express = require('express');
var router = express.Router();
var User=require('../../model/user');
var Post=require('../../model/post');
var bcrypt=require('bcryptjs');
var checkAuth=require('../middleware/check-auth.js');

router.get('/list',checkAuth,function(req,res){
  Post.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      });
    }else {
      res.status(200).json({
        post:rtn
      });
    }
  })
});

router.post('/add',checkAuth,function(req,res){
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internl Server Error",
        error:err
      });
    }else {
      res.status(201).json({
        message:"Post Added!",
        post:rtn
      });
    }
  })
})

router.patch('/:id',function(req,res){
  var update={};
  for(var opt of req.body){
    update[opt.proName]=opt.proValue
  }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"internal server error",
        err:error
      })
    }else{
      res.status(200).json({
        message:"Post updated!"
      })
    }
  })
})

router.get('/:id',function(req,res){
  Post.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internl Server Error",
        error:err
      });
    }else {
      res.status(200).json({
        post:rtn
      });
    }

  })
})

router.delete('/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"Post deleted"
      })
    }
  })
})
module.exports = router;
