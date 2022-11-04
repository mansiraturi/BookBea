const express = require('express');
const verify = require("../middleware/verify");
const Book = require("../models/books");
const router = express.Router();

router.post("/",verify,async(req,res)=>{
  try{
    const items = await Book.find({name : {'$regex' : req.body.search , '$options' : 'i'},shared : 1},(err)=>{
      if(err){
        console.log(err)
      }
    }).sort({id:-1})
    res.render("search",{book  : items , userId : req.data.username})
  }
  catch(e){
    res.send(e.message)
  }
})



module.exports = router;
