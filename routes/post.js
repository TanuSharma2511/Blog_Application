const express = require('express');
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys")


const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");

const validateCreatePost = require("../validation/createPost");

//FOR TESTING PURPOSE
router.get("/test",(req,res) => {
    res.json({message:"Post Route Working Properly"})
})

 //LIKE POST
 router.post('/like/:postId',passport.authenticate("jwt" , {session:false }),(req,res)=>{
  console.log(req.params.postId)
  console.log("like");
  Post.findByIdAndUpdate(req.params.postId,{
      $push:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})

//UNLIKE POST
router.post('/unlike/:postId',passport.authenticate("jwt" , {session:false }),(req,res)=>{
  console.log(req.params.postId)
  console.log("UNlike");
  Post.findByIdAndUpdate(req.params.postId,{
      $pull:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})


//CREATE NEW POST
router.post("/new-post",passport.authenticate("jwt" , {session:false}), (req, res) => {

  const { errors,isValid } = validateCreatePost(req.body);
  console.log(errors);
  //Check Validation
  if(!isValid){
    return res.status(400).json(errors);
  }

    const {
      title,
      description,
      imgUrl,
      category,
      isFeatured,
    } = req.body;
  
    if (
      !title ||
      !description ||
      !imgUrl ||
      !category ||
      !isFeatured
    ) {
      res.json({ err: "All fields are required" });
    }
  
    Category.findOne({ _id: category })
      .then((cat) => {
        const post = new Post({
          title,
          description,
          imgUrl,
          isFeatured,
          category: cat,
          postedBy:req.user
        });
  
        post
          .save()
          .then(() => {
            res.json({ msg: "Post Created" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //ALL POSTS
  router.get("/posts", (req, res) => {
    Post.find()
       .populate("category", "_id name")
       .populate("postedBy", "_id name")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //MY POSTS
  router.get('/mypost',passport.authenticate("jwt" , {session:false }),(req,res)=>{
    Post.find({postedBy:req.user})
    .populate("postedBy",["name","_id"])
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

//INDIVIDUAL POST
  router.get("/post/:id", (req, res) => {
    Post.find({ _id: req.params.id })
    .populate("postedBy","_id name")
      .populate("category", "_id name")
      .then(post => {
        res.json(post);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //CATEGORY WISE POSTS
  router.get("/posts/category/:catId", (req, res) => {
    Post.find({ category: { _id: req.params.catId } })
    .populate("postedBy","_id name")
      .populate("category", "_id name")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //FEATURED POST
  router.get("/featured-posts", (req, res) => {
    Post.find({ isFeatured: true })
    .limit(2)
    .populate("postedBy","_id name")
      .populate("category", "_id name")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //TRENDING POST
  router.get("/trending-posts", (req, res) => {
    Post.find()
      .sort({ likes: -1 })
      .limit(6)
      .populate("category", "_id name")
      .populate("postedBy","_id name")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //FRESH STORIES
  router.get("/fresh-stories", (req, res) => {
    Post.find()
      .sort({ _id: -1 })
      .limit(3)
      .populate("postedBy","_id name")
      .populate("category", "_id name")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //DELETE POSTS
  router.delete('/deletepost/:postId',passport.authenticate("jwt" , {session:false }),(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
});

  module.exports = router;