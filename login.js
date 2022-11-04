
const express = require('express');
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/users')
const verify = require("../middleware/verify")
const router = express.Router();
const key = "Secrettt";

router.get("/" ,verify,(req,res)=>{
  if(req.auth == "valid"){
    res.redirect("/home")
    return;
  }
  res.render("login");
})

router.post("/login",async(req,res)=>{
  try{
  const {username,password} = req.body;
  const user = await User.findOne({username : username});
  if(!user){
    res.json({message : "Invalid Creds"})
    return
  }
  const compared = await bycrypt.compare(password,user.password)
  if(!compared){
    res.json({message : "Invalid Creds"})
    return
  }
  const payload = {
    username : username
  }

  const token = await jwt.sign(payload,key,{algorithm : 'HS256'})
  res.cookie("token",token,{httpOnly : true});
  res.redirect("/")
}
catch(e){
  res.send(e.message)
}
})

module.exports = router;
