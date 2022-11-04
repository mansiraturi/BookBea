const express = require('express');
const verify = require("../middleware/verify")
const router = express.Router();
const Book = require("../models/books")
const cloudinary = require('cloudinary');
const upload = require("../handlers/multer")

router.get("/" ,verify,(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/")
    return;
  }
  res.render("addBook" , {username : req.data.username});
})

router.post("/",verify,upload.single('image'),async(req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/")
    return
  }

  try{
    cloudinary.config({
      cloud_name : 'blog2345',
      api_key : '286469287742653',
      api_secret : 'RnF7L9Xz7Btw5x3IdN7_9dzeSBg'
    })

  const result = await cloudinary.uploader.upload(req.file.path,{quality : "auto" , fetch_format : "auto", crop : "scale"});
  const book = new Book ({
    name : req.body.name,
    author : req.body.author,
    edition : req.body.edition,
    category : req.body.category,
    rating : req.body.rating,
    userId : req.data.username,
    shared : 0,
    hold : 0,
    cloudinary_id : result.public_id,
    thumbnail : result.secure_url,

  })
  await book.save();
  res.redirect("/dashboard");
}
catch(e){
  res.send(e.message)
}
})


module.exports = router
