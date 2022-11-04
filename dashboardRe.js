const express = require('express');
const verify = require("../middleware/verify")
const router = express.Router();
const User = require("../models/users");

router.get("/",verify,async(req,res)=>{
  try{
    const user = await User.findOne({username : req.data.username});
    res.render("dashboardRe",{username : req.data.username , received : user.received})
  }
  catch(e){
    res.send(e.message)
  }
})

module.exports = router;
