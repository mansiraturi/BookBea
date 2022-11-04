const express = require('express');
const verify = require("../middleware/verify");
const router = express.Router();
const Book = require("../models/books");


router.get("/",verify,async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  try{
    let books = await Book.find({shared : 1}).sort({_id : -1}).limit(8);
    res.render("home",{book : books , userId : req.data.username});
  }
  catch(e){
    res.send(e.message)
  }
})


module.exports = router;
