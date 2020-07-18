const express = require('express');
const router = express.Router();


const User = require("../models/User");const Category = require("../models/Category");
const Post = require("../models/Post");

router.get("/test",(req,res) => {
    res.json({message:"Post Route Working Properly"})
})


router.get("/categories", (req, res) => {
    Category.find()
      .then((categories) => {
        res.json({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get('/mypostTest',(req,res)=>{
    Category.find()
    .populate("user",  ["name","_id"])
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
  })
  
  router.get("/category-num", (req, res) => {
    Category.count({})
      .then((categories) => {
        res.json({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/new-category", (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      res.json({ err: "All fields are required" });
    }
  
    const category = new Category({
      name,
    });
  
    category
      .save()
      .then(() => {
        res.json({ msg: "Category Created",category });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  module.exports = router;