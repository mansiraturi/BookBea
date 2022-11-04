const express = require('express');
const verify = require("../middleware/verify")
const router = express.Router();
const Book = require("../models/books")
const uniqid = require("uniqid");


router.get("/" ,verify,async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  try{
    // console.log(uniqid());
    const books = await Book.find({userId : req.data.username});
    res.render("dashboard" , {username : req.data.username , book : books});
  }
  catch(e){
    res.send(e.message);
    return
  }

})


router.get("/add/:id",verify,async (req,res)=>{
  let book = await Book.findOneAndUpdate({_id : req.params.id},{shared : 1});
  res.redirect("/dashboard");
})

router.get("/remove/:id",verify,async (req,res)=>{
  let book = await Book.findOneAndUpdate({_id : req.params.id},{shared : 0});
  res.redirect("/dashboard");
})

module.exports = router
